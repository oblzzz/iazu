const track = document.querySelector('.gallery-track');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

const btnNext = document.querySelector('.gallery-next');
const btnPrev = document.querySelector('.gallery-prev');

let images = [];
let currentIndex = 0;

// ==============================
// 🔁 LOOP INFINITO (CORRETO)
// ==============================
const originalItems = [...track.children];

// cria 3 blocos (antes / original / depois)
originalItems.forEach(item => {
  track.appendChild(item.cloneNode(true));
});
originalItems.forEach(item => {
  track.insertBefore(item.cloneNode(true), track.firstChild);
});

function updateImages() {
  images = [...track.querySelectorAll('img')];
}

updateImages();

// começa no meio
requestAnimationFrame(() => {
  track.scrollLeft = track.scrollWidth / 3;
});

// loop invisível
track.addEventListener('scroll', () => {
  const third = track.scrollWidth / 3;

  if (track.scrollLeft <= 0) {
    track.scrollLeft += third;
  } else if (track.scrollLeft >= third * 2) {
    track.scrollLeft -= third;
  }
});

// ==============================
// 🖱️ DRAG
// ==============================
let isDown = false;
let startX = 0;
let scrollLeft = 0;
let moved = false;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  moved = false;
  startX = e.pageX;
  scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseup', () => isDown = false);
track.addEventListener('mouseleave', () => isDown = false);

track.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  moved = true;

  const walk = (e.pageX - startX) * 1.2;
  track.scrollLeft = scrollLeft - walk;
});

// ==============================
// 🖼️ LIGHTBOX
// ==============================
track.addEventListener('click', (e) => {
  if (moved) return;

  const img = e.target.closest('img');
  if (!img) return;

  currentIndex = images.indexOf(img);
  showImage();
  lightbox.classList.add('active');
});

function showImage() {
  lightboxImg.style.opacity = 0;

  setTimeout(() => {
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.style.opacity = 1;
  }, 200);
}

// botões desktop
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

// fechar
lightbox.onclick = () => {
  lightbox.classList.remove('active');
};

// ==============================
// 👉 SWIPE NO LIGHTBOX (MOBILE)
// ==============================
let touchStartX = 0;

lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
  let touchEndX = e.changedTouches[0].clientX;
  let diff = touchStartX - touchEndX;

  if (diff > 50) {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  } else if (diff < -50) {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  }
});

// ==============================
// ⬅️➡️ BOTÕES CARROSSEL
// ==============================
btnNext.onclick = () => {
  track.scrollBy({ left: 300, behavior: 'smooth' });
};

btnPrev.onclick = () => {
  track.scrollBy({ left: -300, behavior: 'smooth' });
};