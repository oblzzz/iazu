const track = document.querySelector('.gallery-track');
const imagesOriginal = [...track.querySelectorAll('img')];

let currentIndex = 0;

// ==============================
// LOOP INFINITO SIMPLES (CORRETO)
// ==============================

// duplica só UMA vez
imagesOriginal.forEach(img => {
  track.appendChild(img.cloneNode(true));
});

// reposiciona no início correto
track.scrollLeft = 0;

// loop automático ao chegar no fim
track.addEventListener('scroll', () => {
  if (track.scrollLeft >= track.scrollWidth / 2) {
    track.scrollLeft = 0;
  }
});

// ==============================
// DRAG FUNCIONANDO (DESKTOP)
// ==============================
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = track.scrollLeft;
  track.classList.add('dragging');
});

track.addEventListener('mouseleave', () => isDown = false);
track.addEventListener('mouseup', () => isDown = false);

track.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  e.preventDefault(); // ESSENCIAL PRA FUNCIONAR NO PC

  const walk = (e.pageX - startX) * 1.5;
  track.scrollLeft = scrollLeft - walk;
});

// ==============================
// BOTÕES
// ==============================
document.querySelector('.gallery-next').onclick = () => {
  track.scrollBy({ left: 250, behavior: 'smooth' });
};

document.querySelector('.gallery-prev').onclick = () => {
  track.scrollBy({ left: -250, behavior: 'smooth' });
};