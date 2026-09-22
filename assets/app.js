/* ══════════════════════════════════════════════════════════════
   Alfredo · Vibe Coder — interacciones de la página
   Los datos viven en assets/projects.js. Las tarjetas ya vienen
   escritas en index.html (tools/build.js); aquí solo se redibujan
   si el HTML quedó desactualizado respecto a PROJECTS.
   ══════════════════════════════════════════════════════════════ */

/* ── Render de respaldo ─────────────────────────────────────── */
const fill = (id, expected, html) => {
  const el = document.getElementById(id);
  if (el && el.children.length !== expected) el.innerHTML = html();
};
fill('featured', PROJECTS.filter((p) => p.featured).length, featuredHTML);
fill('projects', PROJECTS.length, () => PROJECTS.map(cardHTML).join(''));
fill('toolbox', STACK.length, stackHTML);
{
  const log = document.querySelector('.log');
  if (log && log.children.length !== PROJECTS.length) log.innerHTML = logHTML();
}
{
  const s = statsData();
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.dataset.count = String(v); };
  set('statLive', s.live); set('statWip', s.wip); set('statSectors', s.sectors);
}

/* ── Filtros ─────────────────────────────────────────────── */
const chips = document.querySelectorAll('.chip');
const emptyState = document.getElementById('emptyState');

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => {
      c.classList.toggle('is-active', c === chip);
      c.setAttribute('aria-selected', String(c === chip));
    });

    const filter = chip.dataset.filter;
    let visible = 0;

    document.querySelectorAll('#projects .card').forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });

    if (emptyState) emptyState.hidden = visible > 0;
  });
});

/* ── Reveal al hacer scroll ──────────────────────────────── */
const reveals = document.querySelectorAll('.reveal');

const show = (el) => {
  if (el.dataset.delay) el.style.setProperty('--d', el.dataset.delay);
  el.classList.add('is-in');
};

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px' }
  );
  reveals.forEach((el) => io.observe(el));

  // Red de seguridad: si algo quedó sin revelar (scroll programático,
  // navegación por anclas, observer que no dispara), se muestra igual.
  const sweep = () => {
    reveals.forEach((el) => {
      if (el.classList.contains('is-in')) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) { show(el); io.unobserve(el); }
    });
  };
  window.addEventListener('load', sweep);
  window.addEventListener('scroll', sweep, { passive: true });
  window.addEventListener('resize', sweep, { passive: true });
} else {
  reveals.forEach(show);
}

/* ── Nav pegajosa ────────────────────────────────────────── */
const nav = document.getElementById('nav');
const onScroll = () => nav?.classList.toggle('is-stuck', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Spotlight en tarjetas + halo del cursor ─────────────── */
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (fine && !reduced) {
  const glow = document.querySelector('.cursor-glow');
  let gx = 0, gy = 0, cx = 0, cy = 0, raf = null;

  const loop = () => {
    cx += (gx - cx) * 0.12;
    cy += (gy - cy) * 0.12;
    if (glow) glow.style.transform = `translate(${cx}px, ${cy}px)`;
    raf = Math.abs(gx - cx) > 0.4 || Math.abs(gy - cy) > 0.4 ? requestAnimationFrame(loop) : null;
  };

  window.addEventListener('mousemove', (e) => {
    gx = e.clientX; gy = e.clientY;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });

  // Spotlight + inclinación sutil en cada tarjeta
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      const rx = ((y / r.height) - 0.5) * -4;
      const ry = ((x / r.width) - 0.5) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  // Botones magnéticos
  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.32;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* ── Contadores animados ─────────────────────────────────── */
const counters = document.querySelectorAll('[data-count]');
counters.forEach((el) => { el.textContent = '0' + (el.dataset.suffix || ''); });
const cio = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1500;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    cio.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach((c) => cio.observe(c));

/* ── Año en el footer ────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
