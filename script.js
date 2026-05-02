const track = document.querySelector('.gallery-track');
const images = document.querySelectorAll('.gallery-track img');

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

let currentIndex = 0;

// CLICK (abrir imagem)
track.addEventListener('click', (e) => {
  if (isDown) return;

  const img = e.target.closest('img');
  if (!img) return;

  currentIndex = [...images].indexOf(img);
  showImage();
  lightbox.classList.add('active');
});

function showImage() {
  lightboxImg.style.opacity = 0;

  setTimeout(() => {
    lightboxImg.src = images[currentIndex].src;
    lightboxImg.style.opacity = 1;
  }, 150);
}

// navegação
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

// fechar
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

// teclado
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

// DRAG

let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  track.classList.add('dragging');
});

track.addEventListener('mouseleave', () => {
  isDown = false;
});

track.addEventListener('mouseup', () => {
  isDown = false;
});

track.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  e.preventDefault();

  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 2;
  track.scrollLeft = scrollLeft - walk;
});

document.addEventListener('mouseup', () => {
  isDown = false;
});

// BOTÕES GALERIA

const gPrev = document.querySelector('.gallery-prev');
const gNext = document.querySelector('.gallery-next');

gNext.addEventListener('click', () => {
  track.scrollBy({ left: 300, behavior: 'smooth' });
});

gPrev.addEventListener('click', () => {
  track.scrollBy({ left: -300, behavior: 'smooth' });
});