const track = document.querySelector('.gallery-track');
let images = [];

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

let currentIndex = 0;

// DUPLICAR PARA LOOP
const originalItems = [...track.children];

originalItems.forEach(item => {
  const clone = item.cloneNode(true);
  track.appendChild(clone);
});

function updateImages() {
  images = [...track.querySelectorAll('img')];
}

updateImages();

// CLICK
track.addEventListener('click', (e) => {
  if (isDown) return;

  const img = e.target.closest('img');
  if (!img) return;

  currentIndex = images.indexOf(img);
  showImage();
  lightbox.classList.add('active');
});

// TRANSIÇÃO SUAVE
function showImage() {
  lightboxImg.style.opacity = 0;

  setTimeout(() => {
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.style.opacity = 1;
  }, 150);
}

// NAV
nextBtn.onclick = (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
};

prevBtn.onclick = (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
};

// FECHAR
lightbox.onclick = () => {
  lightbox.classList.remove('active');
};

// DRAG
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = track.scrollLeft;
  track.classList.add('dragging');
});

track.addEventListener('mouseup', () => {
  isDown = false;
  track.classList.remove('dragging');
});

track.addEventListener('mouseleave', () => {
  isDown = false;
  track.classList.remove('dragging');
});

track.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  e.preventDefault();

  const walk = (e.pageX - startX) * 1.5;
  track.scrollLeft = scrollLeft - walk;
});

// LOOP INFINITO
track.addEventListener('scroll', () => {
  const half = track.scrollWidth / 2;

  if (track.scrollLeft >= half) {
    track.scrollLeft -= half;
  }

  if (track.scrollLeft <= 0) {
    track.scrollLeft += half;
  }
});

// BOTÕES
document.querySelector('.gallery-next').onclick = () => {
  track.scrollBy({ left: 200, behavior: 'smooth' });
};

document.querySelector('.gallery-prev').onclick = () => {
  track.scrollBy({ left: -200, behavior: 'smooth' });
};