/* =============================================
   script.js — Portfolio Interactions
   ============================================= */

// ─── NAVBAR: Scrolled state ───────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── HAMBURGER MENU ───────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── SMOOTH SCROLL for all nav links ─────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── SCROLL REVEAL ───────────────────────────
const revealElements = document.querySelectorAll(
  '.service-card, .skill-item, .project-card, .pricing-card, .about__text, .about__visual, .contact__info, .contact__form'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// Stagger delays on grids
document.querySelectorAll('.services__grid .service-card').forEach((el, i) => {
  el.dataset.delay = i * 80;
});
document.querySelectorAll('.projects__grid .project-card').forEach((el, i) => {
  el.dataset.delay = i * 100;
});
document.querySelectorAll('.pricing__grid .pricing-card').forEach((el, i) => {
  el.dataset.delay = i * 100;
});
document.querySelectorAll('.skills__grid .skill-item').forEach((el, i) => {
  el.dataset.delay = i * 60;
});

revealElements.forEach(el => revealObserver.observe(el));

// ─── SKILL BARS ───────────────────────────────
const skillFills = document.querySelectorAll('.skill-bar__fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.dataset.width;
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ─── COUNTER ANIMATION ────────────────────────
const counters = document.querySelectorAll('.stat__num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

function animateCounter(el, target) {
  let current = 0;
  const duration = 1200;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// ─── CONTACT FORM ─────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  setTimeout(() => {
    formSuccess.classList.add('show');
    contactForm.reset();
    btn.textContent = 'Send Message ✦';
    btn.disabled = false;

    setTimeout(() => formSuccess.classList.remove('show'), 4000);
  }, 1200);
});

// ─── ACTIVE NAV LINK (scroll spy) ─────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = '#fff';
        }
      });
    }
  });
});

// ─── HERO PARALLAX (subtle) ───────────────────
const heroBgText = document.querySelector('.hero__bg-text');

window.addEventListener('scroll', () => {
  if (heroBgText) {
    heroBgText.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.3}px))`;
  }
});

// ─── CURSOR GLOW (desktop only) ───────────────
if (window.innerWidth > 768) {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(124, 92, 252, 0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

console.log('🚀 Portfolio by Abhinav Aby — loaded!');
