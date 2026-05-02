const track = document.querySelector('.gallery-track');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

const btnNext = document.querySelector('.gallery-next');
const btnPrev = document.querySelector('.gallery-prev');

const btnNextLight = document.querySelector('.lightbox .next');
const btnPrevLight = document.querySelector('.lightbox .prev');

// ==============================
// IMAGENS ORIGINAIS (FONTE REAL)
// ==============================
const imagesOriginal = Array.from(track.querySelectorAll('img')).map(img => img.src);

let currentIndex = 0;

// ==============================
// LOOP INFINITO (DUPLICA)
// ==============================
imagesOriginal.forEach(src => {
  const clone = document.createElement('img');
  clone.src = src;
  track.appendChild(clone);
});

const half = track.scrollWidth / 2;

track.addEventListener('scroll', () => {
  if (track.scrollLeft >= half) {
    track.scrollLeft -= half;
  }
});

// ==============================
// DRAG (DESKTOP FUNCIONANDO)
// ==============================
let isDown = false;
let startX;
let scrollLeft;
let moved = false;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  moved = false;
  startX = e.pageX;
  scrollLeft = track.scrollLeft;
  track.classList.add('dragging');
});

track.addEventListener('mouseleave', () => {
  isDown = false;
  track.classList.remove('dragging');
});

track.addEventListener('mouseup', () => {
  isDown = false;
  track.classList.remove('dragging');
});

track.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  const walk = e.pageX - startX;

  if (Math.abs(walk) > 5) moved = true;

  track.scrollLeft = scrollLeft - walk;
});

// ==============================
// ABRIR LIGHTBOX
// ==============================
track.addEventListener('click', (e) => {
  if (moved) return;

  const img = e.target;
  if (img.tagName !== 'IMG') return;

  const index = imagesOriginal.indexOf(img.src);
  if (index === -1) return;

  showImage(index);
  lightbox.classList.add('active');
});

// ==============================
// TROCAR IMAGEM (COM FADE)
// ==============================
function showImage(index) {
  currentIndex = (index + imagesOriginal.length) % imagesOriginal.length;

  lightboxImg.style.opacity = 0;

  setTimeout(() => {
    lightboxImg.src = imagesOriginal[currentIndex];
    lightboxImg.style.opacity = 1;
  }, 150);
}

// ==============================
// BOTÕES DO LIGHTBOX
// ==============================
btnNextLight.onclick = (e) => {
  e.stopPropagation();
  showImage(currentIndex + 1);
};

btnPrevLight.onclick = (e) => {
  e.stopPropagation();
  showImage(currentIndex - 1);
};

// ==============================
// FECHAR LIGHTBOX (SEM BUG)
// ==============================
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
  }
});

// ==============================
// TECLADO
// ==============================
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

// ==============================
// BOTÕES DO CARROSSEL
// ==============================
btnNext.onclick = () => {
  track.scrollBy({ left: 250, behavior: 'smooth' });
};

btnPrev.onclick = () => {
  track.scrollBy({ left: -250, behavior: 'smooth' });
};