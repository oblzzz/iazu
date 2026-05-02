const hamburger = document.getElementById('burger');
const nav = document.querySelector('.nav');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  nav.classList.remove('active');
  overlay.classList.remove('active');
});

// GALERIA 

// const images = document.querySelectorAll('.gallery-track img');
// const lightbox = document.getElementById('lightbox');
// const lightboxImg = lightbox.querySelector('img');

// images.forEach(img => {
//   img.addEventListener('click', () => {
//     lightbox.classList.add('active');
//     lightboxImg.src = img.src;
//   });
// });

// lightbox.addEventListener('click', () => {
//   lightbox.classList.remove('active');
// });


const images = document.querySelectorAll('.gallery-track img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');

let currentIndex = 0;

// abrir
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    currentIndex = index;
    showImage();
    lightbox.classList.add('active');
  });
});

function showImage() {
  lightboxImg.src = images[currentIndex].src;
}

// próximo
nextBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

// anterior
prevBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

// fechar
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') lightbox.classList.remove('active');
});

