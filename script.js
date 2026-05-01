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