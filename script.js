// Animation simple : bouton qui pulse doucement

const btn = document.querySelector('.btn');

if (btn) {
  setInterval(() => {
    btn.style.opacity = btn.style.opacity === '0.7' ? '1' : '0.7';
  }, 1000);
}
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});
function scrambleText(elementId, text, interval = 50) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
  const el = document.getElementById(elementId);
  let iteration = 0;

  const scrambleInterval = setInterval(() => {
    let displayedText = '';

    for (let i = 0; i < text.length; i++) {
      if (i < iteration) {
        displayedText += text[i];
      } else {
        displayedText += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    el.textContent = displayedText;

    iteration += 1 / 3; // vitesse d'apparition des bonnes lettres

    if (iteration >= text.length) {
      clearInterval(scrambleInterval);
      el.textContent = text; // afficher le texte final
    }
  }, interval);
}

// Appelle la fonction avec ton prénom
scrambleText('scramble-name', 'Djani', 40);
