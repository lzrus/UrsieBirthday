// Carrousel automatique et navigation
const images = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let current = 0;
let carouselInterval;

function showImage(idx) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === idx);
  });
}

function nextImage() {
  current = (current + 1) % images.length;
  showImage(current);
}

function prevImage() {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
}

function startCarousel() {
  carouselInterval = setInterval(nextImage, 3500);
}
function stopCarousel() {
  clearInterval(carouselInterval);
}

nextBtn.addEventListener('click', () => {
  stopCarousel();
  nextImage();
  startCarousel();
});
prevBtn.addEventListener('click', () => {
  stopCarousel();
  prevImage();
  startCarousel();
});

showImage(current);
startCarousel();

// Animation du bouton surprise et message
const surpriseBtn = document.querySelector('.surprise-btn');
const surpriseMsg = document.querySelector('.surprise-message');
let surpriseShown = false;

surpriseBtn.addEventListener('click', () => {
  if (!surpriseShown) {
    surpriseMsg.classList.add('visible');
    surpriseMsg.classList.remove('hidden');
    launchHearts();
    surpriseShown = true;
  }
});

// Animation de cœurs qui tombent
function launchHearts() {
  for (let i = 0; i < 25; i++) {
    setTimeout(() => createHeart(), i * 120);
  }
}

function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = '❤';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 18 + 18) + 'px';
  heart.style.top = '-40px';
  heart.style.color = `hsl(${Math.random()*30+330}, 70%, 80%)`;
  document.body.appendChild(heart);
  animateHeart(heart);
}

function animateHeart(heart) {
  const duration = Math.random() * 1.5 + 2.5;
  heart.animate([
    { transform: `translateY(0)`, opacity: 1 },
    { transform: `translateY(${window.innerHeight + 60}px)`, opacity: 0.7 }
  ], {
    duration: duration * 1000,
    easing: 'ease-in',
    fill: 'forwards'
  });
  setTimeout(() => heart.remove(), duration * 1000);
}

// Musique douce Play/Pause
const musicBtn = document.querySelector('.music-toggle');
const audio = document.getElementById('bg-music');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    musicBtn.textContent = '🎵 Play / Pause';
  } else {
    audio.play();
    musicBtn.textContent = '⏸ Pause';
  }
  isPlaying = !isPlaying;
});

audio.addEventListener('ended', () => {
  isPlaying = false;
  musicBtn.textContent = '🎵 Play / Pause';
});

// Fade-in général au chargement
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = 0;
  setTimeout(() => {
    document.body.style.transition = 'opacity 1.5s';
    document.body.style.opacity = 1;
  }, 100);
});

// --- Cartes citations interactives ---
// Effet machine à écrire + révélation message secret

document.querySelectorAll('.interactive-inspiration-card').forEach((card, idx) => {
  const quoteElem = card.querySelector('.interactive-quote');
  const quoteText = quoteElem.getAttribute('data-quote');
  const revealBtn = card.querySelector('.reveal-btn');
  let revealed = false;

  // Effet machine à écrire
  let i = 0;
  function typeWriter() {
    if (i < quoteText.length) {
      quoteElem.textContent += quoteText.charAt(i);
      i++;
      setTimeout(typeWriter, 18 + Math.random() * 30);
    }
  }
  quoteElem.textContent = '';
  setTimeout(typeWriter, 300 + idx * 400); // Décalage pour effet progressif

  // Révélation du message secret
  function revealSecret() {
    if (!revealed) {
      card.classList.add('revealed');
      revealBtn.style.display = 'none';
      revealed = true;
    }
  }
  card.addEventListener('click', (e) => {
    // Ne pas déclencher si clic sur le bouton déjà caché
    if (!revealed && (e.target === card || e.target === quoteElem)) {
      revealSecret();
    }
  });
  revealBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    revealSecret();
  });
}); 