const btn = document.querySelector('.btn');

if (btn) {
  setInterval(() => {
    btn.style.opacity = btn.style.opacity === '0.7' ? '1' : '0.7';
  }, 1200);
}

function scrambleText(elementId, text, interval = 50) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
  const el = document.getElementById(elementId);
  if (!el) return;
  el.classList.add('scramble-loading');
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    heroCard.classList.add('is-queued');
  }
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

    iteration += 1 / 3;

    if (iteration >= text.length) {
      clearInterval(scrambleInterval);
      el.textContent = text;
      el.classList.remove('scramble-loading');
      if (heroCard) {
        heroCard.classList.remove('is-queued');
        heroCard.classList.add('is-revealed');
      }
    }
  }, interval);
}

scrambleText('scramble-name', 'Bonjour, je suis Djani', 30);

const menuToggle = document.querySelector('.menu-toggle');
const headerNav = document.querySelector('.header-nav');
const siteHeader = document.querySelector('.site-header');

if (menuToggle && headerNav) {
  menuToggle.addEventListener('click', () => {
    headerNav.classList.toggle('show');
  });

  headerNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      headerNav.classList.remove('show');
    });
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!headerNav.contains(target) && !menuToggle.contains(target)) {
      headerNav.classList.remove('show');
    }
  });
}

if (siteHeader) {
  let lastScroll = 0;
  const threshold = 80;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (Math.abs(currentScroll - lastScroll) < 10) return;

    if (currentScroll > lastScroll && currentScroll > threshold) {
      siteHeader.classList.add('is-hidden');
    } else {
      siteHeader.classList.remove('is-hidden');
    }

    lastScroll = currentScroll;
  });
}

const revealItems = document.querySelectorAll(
  '.section, .card, .project, .hero-text'
);

revealItems.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add('in'));
}
