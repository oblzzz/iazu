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

const images = document.querySelectorAll('.gallery-track img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

images.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    lightboxImg.src = img.src;
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});