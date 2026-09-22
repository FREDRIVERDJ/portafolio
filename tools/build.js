/* ══════════════════════════════════════════════════════════════
   Escribe los destacados, todas las tarjetas, el build log, el
   stack y los contadores dentro de index.html a partir de
   assets/projects.js, para que buscadores y previsualizaciones
   los vean sin JavaScript.

   Uso:  node tools/build.js
   ══════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const file = path.join(root, 'index.html');
const { PROJECTS, cardHTML, featuredHTML, logHTML, stackHTML, statsData } =
  require(path.join(root, 'assets', 'projects.js'));

let html = fs.readFileSync(file, 'utf8');

function replaceBlock(name, inner) {
  const re = new RegExp(`(<!-- ${name}:start -->)[^]*?(<!-- ${name}:end -->)`);
  if (!re.test(html)) throw new Error(`No encontré los marcadores <!-- ${name}:start/end --> en index.html`);
  html = html.replace(re, () => `$1\n${inner}\n      $2`.replace('$1', `<!-- ${name}:start -->`).replace('$2', `<!-- ${name}:end -->`));
}

replaceBlock('featured', featuredHTML());
replaceBlock('projects', PROJECTS.map(cardHTML).join('\n'));
replaceBlock('log', logHTML());
replaceBlock('stack', stackHTML());

const s = statsData();
const setStat = (id, value) => {
  const re = new RegExp(`(<dd id="${id}" data-count=")[^"]*(">)[^<]*(</dd>)`);
  if (!re.test(html)) throw new Error(`No encontré el contador #${id}`);
  html = html.replace(re, `$1${value}$2${value}$3`);
};
setStat('statLive', s.live);
setStat('statWip', s.wip);
setStat('statSectors', s.sectors);

fs.writeFileSync(file, html);
const feat = PROJECTS.filter((p) => p.featured).length;
console.log(`✔ index.html actualizado: ${PROJECTS.length} proyectos (${feat} destacados, ${s.live} en vivo, ${s.wip} próximos), ${s.sectors} sectores.`);
