/* ══════════════════════════════════════════════════════════════
   Alfredo · Vibe Coder — lógica de la página

   👉  PARA AÑADIR UN PROYECTO NUEVO:
       copia un bloque de PROJECTS, cámbiale los datos y listo.
       Campos: name, kicker, url, category, description, tags,
               status ('live' | 'wip'), mark, colors [c1, c2]
   ══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    name: 'Specteria',
    kicker: 'Casa de software · Corporativo',
    url: 'https://specteria.com/',
    category: 'corporate',
    description:
      'Sitio corporativo de la casa de software. Presenta las verticales LegalTech, FinTech y SaaS, el stack técnico y el proceso de implementación de punta a punta.',
    tags: ['Landing', 'Diseño', 'Marca', 'Responsive'],
    status: 'live',
    mark: 'Sp',
    colors: ['#5b9bff', '#1e3a8a'],
  },
  {
    name: 'Specter',
    kicker: 'LegalTech · Insolvencia',
    url: 'https://specteria.com/specter.html',
    category: 'legaltech',
    description:
      'Plataforma que opera el régimen de insolvencia colombiano de principio a fin: del radicado al acuerdo de pago, sin papel suelto. Ley 1116 y Ley 1564.',
    tags: ['Producto', 'Ley 1116', 'Firma electrónica', 'Trazabilidad'],
    status: 'live',
    mark: 'Sr',
    colors: ['#22d3ee', '#0f766e'],
  },
  {
    name: 'ElectIA',
    kicker: 'CivicTech · Auditoría electoral',
    url: 'https://electia.co/preconteo/login?next=%2F',
    category: 'civictech',
    description:
      'Sistema de preconteo y auditoría electoral con acceso autenticado. Consolida resultados en tiempo real y deja rastro verificable de cada registro.',
    tags: ['App web', 'Auth', 'Preconteo', 'Tiempo real'],
    status: 'live',
    mark: 'El',
    colors: ['#a78bfa', '#5b21b6'],
  },
];

const STACK = [
  'HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind',
  'Node.js', 'Python', 'PostgreSQL', 'Supabase', 'Netlify', 'Vercel',
  'Claude', 'n8n', 'Git',
];

/* ── Render de proyectos ────────────────────────────────── */
const ICON_ARROW =
  '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function prettyUrl(url) {
  try {
    const u = new URL(url);
    return (u.hostname + u.pathname).replace(/\/$/, '');
  } catch {
    return url;
  }
}

function cardHTML(p, i) {
  const badge =
    p.status === 'wip'
      ? '<span class="card__badge card__badge--wip"><i></i> En desarrollo</span>'
      : '<span class="card__badge"><i></i> En vivo</span>';

  return `
  <article class="card reveal" data-category="${p.category}" style="--d:${i}">
    <a class="card__link" href="${p.url}" target="_blank" rel="noopener"
       aria-label="Abrir ${p.name} en una pestaña nueva"></a>

    <div class="card__visual">
      <div class="card__blob" style="background:
           radial-gradient(circle at 28% 32%, ${p.colors[0]} 0%, transparent 55%),
           radial-gradient(circle at 74% 70%, ${p.colors[1]} 0%, transparent 58%)"></div>
      ${badge}
      <div class="card__logo"><span>${p.mark}</span></div>
    </div>

    <div class="card__body">
      <p class="card__kicker">${p.kicker}</p>
      <h3 class="card__title">${p.name} ${ICON_ARROW}</h3>
      <p class="card__desc">${p.description}</p>
      <div class="card__tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="card__foot">
        <span class="card__url">${prettyUrl(p.url)}</span>
        <span class="card__go">Visitar ${ICON_ARROW}</span>
      </div>
    </div>
  </article>`;
}

const grid = document.getElementById('projects');
if (grid) grid.innerHTML = PROJECTS.map(cardHTML).join('');

/* ── Marquee de stack (duplicado para loop continuo) ─────── */
const marquee = document.getElementById('marquee');
if (marquee) {
  const items = STACK.map((s) => `<span class="marquee__item"><i></i>${s}</span>`).join('');
  marquee.innerHTML = items + items;
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

    document.querySelectorAll('.card').forEach((card) => {
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
