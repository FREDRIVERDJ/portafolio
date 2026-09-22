# Alfredo · Vibe Coder — Índice de proyectos

Página estática (sin build, sin dependencias) que reúne todos los sitios y
plataformas que he puesto en producción. Pensada para desplegar en Netlify.

## Estructura

```
.
├── index.html          # toda la estructura de la página (tarjetas ya escritas)
├── netlify.toml        # configuración de despliegue, cabeceras y caché
├── robots.txt
├── tools/
│   └── build.js        # escribe las tarjetas de projects.js dentro de index.html
└── assets/
    ├── styles.css      # sistema de diseño completo
    ├── projects.js     # DATOS: PROJECTS (proyectos) y STACK (herramientas por grupo)
    ├── app.js          # interacciones (filtros, animaciones, contadores)
    ├── favicon.svg
    ├── og.svg          # imagen para compartir en redes
    └── logos/          # logos de marca de cada proyecto
        ├── specteria.png
        ├── specter.png
        ├── electia.svg
        ├── uncorazoncontigo.svg
        ├── winclus.png
        ├── bukkia.png
        ├── hukpay.png
        ├── siutra.png
        └── gestratega.png
```

## Añadir un proyecto nuevo

Todo vive en un solo lugar: el array `PROJECTS` al inicio de `assets/projects.js`.
Copia un bloque, cambia los datos, guarda y corre:

```bash
node tools/build.js
```

Eso escribe los destacados, todas las tarjetas, el build log, el stack y los contadores dentro de
`index.html`, para que Google, LinkedIn y cualquier previsualización las vean
sin ejecutar JavaScript. Si olvidas correrlo, `app.js` las dibuja igual en el
navegador, pero los buscadores verían la versión anterior.

```js
{
  name: 'Nombre del proyecto',
  kicker: 'Categoría · Subtítulo corto',
  url: 'https://mi-sitio.com/',
  category: 'legaltech',        // legaltech | civictech | govtech | fintech | edtech | social | corporate
  description: 'Una o dos frases sobre qué hace.',
  tags: ['App web', 'Auth', 'API'],
  status: 'live',                       // 'live' → "En vivo" (verde) | 'wip' → "Próximamente" (ámbar)
  featured: true,                       // opcional: lo muestra en "Destacados" (máx. 5 recomendado)
  ship: '2026-04',                      // mes de lanzamiento para el Build log ('2026' si no sabes el mes)
  logo: '/assets/logos/mi-logo.png',    // opcional: png o svg
  mark: 'Np',                           // 2 letras de respaldo si no hay logo
  colors: ['#5b9bff', '#1e3a8a'],       // degradado de la portada
}
```

Los logos van en `assets/logos/` y se muestran sobre una placa clara —
así se leen bien tanto los que llevan tinta oscura (ElectIA) como los de
color pleno. Toma los dos `colors` de la propia marca para que la portada
combine. Si el archivo no carga, la tarjeta cae automáticamente a `mark`.

Si usas una categoría nueva, agrega también su chip en `index.html`:

```html
<button class="chip" data-filter="mi-categoria" role="tab" aria-selected="false">Mi categoría</button>
```

## Ver en local

Cualquier servidor estático sirve. Por ejemplo:

```bash
npx serve .
# o
python -m http.server 8000
```

> Abre `http://localhost:8000`. No abras el archivo con `file://`: las rutas
> absolutas de `/assets/` no resolverían.

## Desplegar en Netlify

**Opción A — desde GitHub (recomendado)**

```bash
git init
git add .
git commit -m "Índice de proyectos"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Luego en Netlify: *Add new site → Import an existing project → GitHub → elige el
repo*. Build command vacío, publish directory `.` (ya viene en `netlify.toml`).
Cada `git push` redespliega solo.

**Opción B — arrastrar y soltar**

Entra a [app.netlify.com/drop](https://app.netlify.com/drop) y suelta la carpeta
completa. Queda en línea en segundos.

**Opción C — CLI**

```bash
npm i -g netlify-cli
netlify deploy --prod
```

## Detalles técnicos

- 100 % vanilla: sin frameworks, sin bundler, sin `node_modules`.
- Fondo con auroras animadas, grano y rejilla técnica en CSS puro.
- Tarjetas con spotlight que sigue al cursor e inclinación 3D sutil.
- Filtros por categoría, contadores animados y reveal al hacer scroll.
- Respeta `prefers-reduced-motion` y desactiva los efectos de puntero en táctil.
- Cabeceras de seguridad y caché inmutable para `/assets/*` vía `netlify.toml`.
