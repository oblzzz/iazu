const track = document.querySelector('.gallery-track');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

const btnNext = document.querySelector('.gallery-next');
const btnPrev = document.querySelector('.gallery-prev');

// ==============================
// IMAGENS
// ==============================
const imagesOriginal = [...track.querySelectorAll('img')];
let images = [];
let currentIndex = 0;

// duplica para loop infinito
imagesOriginal.forEach(img => {
  track.appendChild(img.cloneNode(true));
});

function updateImages() {
  images = [...track.querySelectorAll('img')];
}

updateImages();

// ==============================
// LOOP INFINITO
// ==============================
const half = track.scrollWidth / 2;

track.addEventListener('scroll', () => {
  if (track.scrollLeft >= half) {
    track.scrollLeft -= half;
  }
  if (track.scrollLeft <= 0) {
    track.scrollLeft += half;
  }
});

// ==============================
// DRAG (IGUAL MOBILE)
// ==============================
let isDown = false;
let startX;
let scrollStart;
let moved = false;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  moved = false;
  startX = e.pageX;
  scrollStart = track.scrollLeft;
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
  moved = true;

  const walk = (e.pageX - startX) * 1.2;
  track.scrollLeft = scrollStart - walk;
});

// ==============================
// BOTÕES DO CARROSSEL
// ==============================
btnNext.addEventListener('click', (e) => {
  e.stopPropagation();
  track.scrollBy({ left: 300, behavior: 'smooth' });
});

btnPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  track.scrollBy({ left: -300, behavior: 'smooth' });
});

// ==============================
// LIGHTBOX (CLIQUE NA IMAGEM)
// ==============================
track.addEventListener('click', (e) => {
  if (moved) return;

  const img = e.target.closest('img');
  if (!img) return;

  currentIndex = images.indexOf(img);
  showImage();
  lightbox.classList.add('active');
});

// ==============================
// MOSTRAR IMAGEM (COM TRANSIÇÃO)
// ==============================
function showImage() {
  lightboxImg.style.opacity = 0;

  setTimeout(() => {
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.style.opacity = 1;
  }, 200);
}

// ==============================
// SETAS DO LIGHTBOX
// ==============================
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

// ==============================
// TECLADO
// ==============================
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'ArrowRight') {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  }

  if (e.key === 'ArrowLeft') {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  }

  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});

// ==============================
// FECHAR LIGHTBOX
// ==============================
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// ==============================
// SWIPE MOBILE (LIGHTBOX)
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