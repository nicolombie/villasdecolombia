// Header on scroll
const header = document.querySelector('.site-header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile nav (full-screen overlay)
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
const closeNav = () => document.body.classList.remove('nav-open');
if (burger) {
  burger.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', document.body.classList.contains('nav-open'));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 680) closeNav(); });
}

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Lightbox gallery
const links = [...document.querySelectorAll('.gallery a')];
if (links.length) {
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = '<button class="x" aria-label="Cerrar">✕</button><button class="prev" aria-label="Anterior">‹</button><img alt=""><div class="cap"></div><button class="next" aria-label="Siguiente">›</button>';
  document.body.appendChild(lb);
  const img = lb.querySelector('img'), cap = lb.querySelector('.cap');
  let i = 0;
  const show = n => {
    i = (n + links.length) % links.length;
    img.src = links[i].href;
    cap.textContent = links[i].dataset.cap || '';
    img.alt = links[i].dataset.cap || '';
  };
  links.forEach((a, n) => a.addEventListener('click', e => { e.preventDefault(); show(n); lb.classList.add('open'); }));
  lb.querySelector('.x').addEventListener('click', () => lb.classList.remove('open'));
  lb.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); show(i - 1); });
  lb.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); show(i + 1); });
  lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') lb.classList.remove('open');
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
}
