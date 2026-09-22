/* ══════════════════════════════════════════════════════════════
   Alfredo Ríos · AI Product Builder — DATOS de proyectos y stack

   👉  PARA AÑADIR UN PROYECTO NUEVO:
       copia un bloque de PROJECTS, cámbiale los datos y luego corre
       `node tools/build.js` para escribir las tarjetas dentro de
       index.html (así Google y las previsualizaciones las ven sin JS).
       Si olvidas correrlo, app.js las dibuja igual en el navegador.

       Campos: name, kicker, url, category, description, tags,
               status ('live' | 'wip'), logo, mark, colors [c1, c2],
               featured (true = aparece en "Destacados"),
               ship ('AAAA-MM' del lanzamiento; 'AAAA' si no sabes el mes)

       category → legaltech | civictech | govtech | fintech | edtech |
                  social | corporate  (cada una tiene su chip en index.html)
       status   → 'live' muestra "En vivo"; 'wip' muestra "Próximamente".
       logo     → ruta al archivo en /assets/logos/ (png o svg).
       mark     → 2 letras de respaldo si no hay logo o si no carga.
       colors   → degradado de fondo de la tarjeta (tomado de la marca).
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
    logo: '/assets/logos/specteria.png',
    mark: 'Sp',
    colors: ['#2f6bf5', '#7c3aed'],
    ship: '2026',
  },
  {
    name: 'Specter',
    kicker: 'LegalTech · Insolvencia',
    url: 'https://specteria.com/specter.html',
    category: 'legaltech',
    description:
      'Plataforma que opera el régimen de insolvencia colombiano de principio a fin: del radicado al acuerdo de pago, sin papel suelto. Ley 1116 y Ley 2445, con IA jurídica y trazabilidad probatoria.',
    tags: ['Producto', 'Ley 1116', 'IA jurídica', 'Firma electrónica'],
    status: 'live',
    logo: '/assets/logos/specter.png',
    mark: 'Sr',
    colors: ['#29abe2', '#1668a8'],
    featured: true,
    ship: '2026-04',
  },
  {
    name: 'ElectIA',
    kicker: 'CivicTech · Auditoría electoral',
    url: 'https://electia.co/preconteo/login?next=%2F',
    category: 'civictech',
    description:
      'Verificador E-14: los testigos suben fotos de los formularios desde el celular y la IA con visión por computadora extrae los datos del acta. Dashboard con sala de crisis, mapa GPS de testigos y preconteo en tiempo real.',
    tags: ['App web', 'Visión por computadora', 'Preconteo', 'Tiempo real'],
    status: 'live',
    logo: '/assets/logos/electia.svg',
    mark: 'El',
    colors: ['#03a39f', '#121e30'],
    featured: true,
    ship: '2026',
  },
  {
    name: 'Un Corazón Contigo',
    kicker: 'Impacto social · Voluntariado profesional',
    url: 'https://uncorazoncontigo.com/',
    category: 'social',
    description:
      'Conecta a personas que necesitan apoyo con profesionales voluntarios de psicología, medicina, asesoría jurídica y trabajo social. Agenda, oficina virtual y muro de acompañamiento. Gratis, confidencial y sin lista de espera.',
    tags: ['Plataforma', 'Citas en línea', 'Salud mental', 'Accesibilidad'],
    status: 'live',
    logo: '/assets/logos/uncorazoncontigo.svg',
    mark: 'Uc',
    colors: ['#e63032', '#022e5b'],
    featured: true,
    ship: '2026-08',
  },
  {
    name: 'Winclus',
    kicker: 'Impacto social · Accesibilidad digital',
    url: 'https://www.winclus.com/',
    category: 'social',
    description:
      'Programa gratuito para Windows que mueve el puntero con la cabeza o los ojos y hace clic con un gesto. Solo necesita una cámara web; todo se procesa en el equipo, sin internet. Código abierto bajo Apache 2.0.',
    tags: ['App Windows', 'Visión por computadora', 'Open source', 'Sin internet'],
    status: 'live',
    logo: '/assets/logos/winclus.png',
    mark: 'Wi',
    colors: ['#2743b4', '#34c26b'],
    featured: true,
    ship: '2026-09',
  },
  {
    name: 'Bukkia',
    kicker: 'EdTech · Libros escolares digitales',
    url: 'https://www.bukkia.com/',
    category: 'edtech',
    description:
      'Plataforma educativa para colegios de Colombia: los libros de primero a once alineados con los DBA del Ministerio y las pruebas Saber, en el teléfono que el estudiante ya tiene. El docente asigna y califica; la familia sigue el avance.',
    tags: ['Plataforma', 'Colegios', 'Pruebas Saber', 'Offline'],
    status: 'wip',
    logo: '/assets/logos/bukkia.png',
    mark: 'Bk',
    colors: ['#1e50c8', '#e2b23c'],
    ship: '2026',
  },
  {
    name: 'Hukpay',
    kicker: 'FinTech · Pasarela de pagos',
    url: 'https://hukpay.com/',
    category: 'fintech',
    description:
      'Pasarela de pagos para comercios de Colombia: tarjetas con cuotas, PSE, Nequi, Daviplata y Bre-B en una sola integración. Checkout embebido, links de pago, API y SDK, antifraude propio y tokenización.',
    tags: ['Pagos', 'API + SDK', 'Bre-B', 'Antifraude'],
    status: 'wip',
    logo: '/assets/logos/hukpay.png',
    mark: 'Hk',
    colors: ['#7a00c8', '#ff3df0'],
    ship: '2026',
  },
  {
    name: 'SIUTRA',
    kicker: 'GovTech · Trámites de tránsito',
    url: 'https://www.siutra.com/',
    category: 'govtech',
    description:
      'Sistema Único de Trámites de tránsito para Colombia. Interconecta a los organismos de tránsito en un solo canal, verifica contra RUNT y SIMIT antes de cobrar y deja cada trámite en un expediente electrónico sellado.',
    tags: ['Plataforma', 'RUNT · SIMIT', 'Firma digital', 'Trazabilidad'],
    status: 'wip',
    logo: '/assets/logos/siutra.png',
    mark: 'Si',
    colors: ['#0b2d4a', '#2bb673'],
    featured: true,
    ship: '2026',
  },
  {
    name: 'Gestratega',
    kicker: 'CivicTech · Campañas políticas',
    url: 'https://www.gestratega.com/',
    category: 'civictech',
    description:
      'El sistema operativo de una campaña política: estructura de líderes, voto declarado frente a voto efectivo, mapa de calor por barrio, simulador electoral y un War Room que el día de la elección muestra el conteo mesa por mesa.',
    tags: ['Plataforma', 'Simulador', 'War Room', 'Multi-perfil'],
    status: 'wip',
    logo: '/assets/logos/gestratega.png',
    mark: 'Gs',
    colors: ['#002256', '#c8102e'],
    ship: '2026',
  },
];

/* Herramientas reales, agrupadas. Claude Code es el centro del flujo. */
const STACK = [
  { group: 'IA', items: ['Claude Code', 'Claude', 'ChatGPT'] },
  { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Next.js'] },
  { group: 'Backend y datos', items: ['Node.js', 'Python', 'PostgreSQL', 'Supabase'] },
  { group: 'Automatización', items: ['n8n', 'APIs y webhooks'] },
  { group: 'Infra', items: ['Vercel', 'Netlify', 'Git', 'GitHub'] },
];

/* ── Render ─────────────────────────────────────────────────── */
const ICON_ARROW =
  '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

function prettyUrl(url) {
  try {
    const u = new URL(url);
    return (u.hostname + u.pathname).replace(/\/$/, '');
  } catch {
    return url;
  }
}

function badgeHTML(p) {
  return p.status === 'wip'
    ? '<span class="card__badge card__badge--wip"><i></i> Próximamente</span>'
    : '<span class="card__badge"><i></i> En vivo</span>';
}

function emblemHTML(p) {
  // Si hay logo se muestra sobre una placa clara; si falla, cae a las iniciales.
  return p.logo
    ? `<div class="card__plate">
         <img src="${p.logo}" alt="Logo de ${p.name}" width="120" height="120"
              loading="lazy" decoding="async"
              onerror="this.closest('.card__plate').classList.add('is-fallback')" />
         <span class="card__fallback">${p.mark}</span>
       </div>`
    : `<span class="card__mark">${p.mark}</span>`;
}

function visualHTML(p) {
  return `<div class="card__visual">
      <div class="card__blob" style="background:
           radial-gradient(circle at 28% 32%, ${p.colors[0]} 0%, transparent 55%),
           radial-gradient(circle at 74% 70%, ${p.colors[1]} 0%, transparent 58%)"></div>
      ${badgeHTML(p)}
      <div class="card__logo">${emblemHTML(p)}</div>
    </div>`;
}

function cardHTML(p, i) {
  return `
  <article class="card reveal" data-category="${p.category}" style="--d:${i}">
    <a class="card__link" href="${p.url}" target="_blank" rel="noopener"
       aria-label="Abrir ${p.name} en una pestaña nueva"></a>
    ${visualHTML(p)}
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

function featuredHTML() {
  return PROJECTS.filter((p) => p.featured).map((p, i) => `
  <article class="card card--feat reveal" style="--d:${i}">
    <a class="card__link" href="${p.url}" target="_blank" rel="noopener"
       aria-label="Abrir ${p.name} en una pestaña nueva"></a>
    ${visualHTML(p)}
    <div class="card__body">
      <p class="card__kicker"><span class="card__num mono">0${i + 1}</span> ${p.kicker}</p>
      <h3 class="card__title">${p.name} ${ICON_ARROW}</h3>
      <p class="card__desc">${p.description}</p>
      <div class="card__tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="card__foot">
        <span class="card__url">${prettyUrl(p.url)}</span>
        <span class="card__go">Visitar ${ICON_ARROW}</span>
      </div>
    </div>
  </article>`).join('\n');
}

function shipLabel(ship) {
  const [y, m] = String(ship || '').split('-');
  return m ? `${y} · ${MONTHS[parseInt(m, 10) - 1]}` : `${y} · —`;
}

function logHTML() {
  const rows = [...PROJECTS].sort((a, b) => {
    // Primero los que tienen mes conocido (más reciente arriba), luego el resto en su orden.
    const am = /-/.test(a.ship || ''), bm = /-/.test(b.ship || '');
    if (am && bm) return b.ship.localeCompare(a.ship);
    if (am !== bm) return am ? -1 : 1;
    return 0;
  });
  return rows.map((p, i) => `
  <li class="log__row reveal" style="--d:${i}">
    <span class="log__date mono">${shipLabel(p.ship)}</span>
    <span class="log__line" aria-hidden="true"></span>
    <a class="log__name" href="${p.url}" target="_blank" rel="noopener">${p.name} ${ICON_ARROW}</a>
    <span class="log__kicker">${p.kicker}</span>
    <span class="log__status log__status--${p.status}">${p.status === 'live' ? 'shipped' : 'building'}</span>
  </li>`).join('\n');
}

function stackHTML() {
  return STACK.map((g, i) => `
  <div class="tool reveal" style="--d:${i}">
    <h3 class="tool__group mono">${g.group}</h3>
    <ul class="tool__items">${g.items.map((t) => `<li>${t}</li>`).join('')}</ul>
  </div>`).join('\n');
}

function statsData() {
  return {
    live: PROJECTS.filter((p) => p.status === 'live').length,
    wip: PROJECTS.filter((p) => p.status === 'wip').length,
    sectors: new Set(PROJECTS.map((p) => p.category)).size,
  };
}

/* Node (tools/build.js) lo importa; el navegador usa las globales. */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROJECTS, STACK, cardHTML, featuredHTML, logHTML, stackHTML, statsData };
}
