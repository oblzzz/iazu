// ==============================
// SETUP INICIAL
// ==============================
const track = document.querySelector('.gallery-track');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');
const btnNext = document.querySelector('.gallery-next');
const btnPrev = document.querySelector('.gallery-prev');

const imagesOriginal = [...track.querySelectorAll('img')];
let currentIndex = 0;

// ==============================
// LOOP INFINITO — clona antes e depois
// ==============================
imagesOriginal.forEach(img => {
  track.insertBefore(img.cloneNode(true), track.firstChild);
});
imagesOriginal.forEach(img => {
  track.appendChild(img.cloneNode(true));
});

let allImgs = [...track.querySelectorAll('img')];
const total = imagesOriginal.length;

function getItemWidth() {
  const img = allImgs[0];
  const style = getComputedStyle(track);
  const gap = parseFloat(style.gap) || 16;
  return img.offsetWidth + gap;
}

function jumpToMiddle() {
  track.style.scrollBehavior = 'auto';
  track.scrollLeft = getItemWidth() * total;
  track.style.scrollBehavior = '';
}

window.addEventListener('load', jumpToMiddle);

// ==============================
// LOOP — reposicionamento silencioso
// ==============================
track.addEventListener('scroll', () => {
  const itemW = getItemWidth();
  const min = itemW * total;
  const max = itemW * (total * 2);

  if (track.scrollLeft >= max) {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft -= itemW * total;
    track.style.scrollBehavior = '';
  } else if (track.scrollLeft < min) {
    track.style.scrollBehavior = 'auto';
    track.scrollLeft += itemW * total;
    track.style.scrollBehavior = '';
  }
});

// ==============================
// DRAG DESKTOP
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
  e.preventDefault();
});

document.addEventListener('mouseup', () => {
  isDown = false;
  track.classList.remove('dragging');
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  const walk = e.pageX - startX;
  if (Math.abs(walk) > 5) moved = true;
  track.scrollLeft = scrollStart - walk * 1.2;
});

// ==============================
// BOTÕES DO CARROSSEL
// ==============================
btnNext.addEventListener('click', (e) => {
  e.stopPropagation();
  track.scrollBy({ left: getItemWidth() * 3, behavior: 'smooth' });
});
btnPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  track.scrollBy({ left: -getItemWidth() * 3, behavior: 'smooth' });
});

// ==============================
// LIGHTBOX — fechar (função unificada)
// ==============================
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

// ==============================
// LIGHTBOX — abre ao clicar na imagem
// ==============================
track.addEventListener('click', (e) => {
  if (moved) return;
  const img = e.target.closest('img');
  if (!img) return;

  const src = img.src;
  const origIdx = imagesOriginal.findIndex(i => i.src === src);
  if (origIdx === -1) return;
  currentIndex = origIdx;

  showLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
});

// ==============================
// LIGHTBOX — exibir imagem
// ==============================
function showLightboxImage() {
  lightboxImg.style.opacity = 0;
  setTimeout(() => {
    lightboxImg.src = imagesOriginal[currentIndex].src;
    lightboxImg.style.opacity = 1;
  }, 200);
}

nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % total;
  showLightboxImage();
});

prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + total) % total;
  showLightboxImage();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % total; showLightboxImage(); }
  if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + total) % total; showLightboxImage(); }
  if (e.key === 'Escape') closeLightbox();
});

lightbox.addEventListener('click', closeLightbox);

// ==============================
// SWIPE MOBILE (LIGHTBOX)
// ==============================
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
lightbox.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (diff > 50)       { currentIndex = (currentIndex + 1) % total; showLightboxImage(); }
  else if (diff < -50) { currentIndex = (currentIndex - 1 + total) % total; showLightboxImage(); }
});

// ==============================
// BURGER MENU
// ==============================
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
const overlay = document.getElementById('overlay');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  nav.classList.remove('active');
  overlay.classList.remove('active');
});