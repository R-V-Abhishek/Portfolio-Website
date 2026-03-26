/**
 * Generates public/og-image.png (1200x630) for Open Graph meta tags.
 * Run once:  node scripts/gen-og.mjs
 * Requires:  sharp (already in dependencies)
 */

import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../public/og-image.png');

const W = 1200;
const H = 630;

/* ── colours ──────────────────────────────────────────────────── */
const BG        = '#07071a';
const PRIMARY   = '#6366f1';
const SECONDARY = '#22d3ee';
const ACCENT    = '#f472b6';
const TEXT      = '#e2e8f0';
const MUTED     = '#94a3b8';

/* ── grid dots helper ─────────────────────────────────────────── */
function gridDots(cols, rows, spacing, r, color, opacity) {
  let dots = '';
  for (let c = 0; c <= cols; c++) {
    for (let row = 0; row <= rows; row++) {
      dots += `<circle cx="${c * spacing}" cy="${row * spacing}" r="${r}" fill="${color}" opacity="${opacity}"/>`;
    }
  }
  return `<g transform="translate(40,40)">${dots}</g>`;
}

/* ── pill badge helper ────────────────────────────────────────── */
function pill(text, x, y, color) {
  const pw = text.length * 9.5 + 28;
  return `
    <rect x="${x}" y="${y}" width="${pw}" height="32" rx="16"
          fill="${color}18" stroke="${color}" stroke-width="1.2" stroke-opacity="0.45"/>
    <text x="${x + pw / 2}" y="${y + 21}" text-anchor="middle"
          font-family="'Courier New',Courier,monospace" font-size="14" font-weight="600"
          fill="${color}" fill-opacity="0.9">${text}</text>`;
}

/* ── pill row ─────────────────────────────────────────────────── */
const pills = [
  { t: 'Python',     c: SECONDARY },
  { t: 'React',      c: PRIMARY   },
  { t: 'Node.js',    c: SECONDARY },
  { t: 'TypeScript', c: ACCENT    },
  { t: 'Astro',      c: PRIMARY   },
  { t: 'ML / LLMs',  c: ACCENT    },
];

let pillRow = '';
let px = 0;
const pillY = 448;
pills.forEach(({ t, c }) => {
  const pw = t.length * 9.5 + 28;
  pillRow += pill(t, px, pillY, c);
  px += pw + 12;
});
// centre the row
const rowW = px - 12;
const pillOffsetX = (W - rowW) / 2;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
     xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- radial glow top-centre -->
    <radialGradient id="glow" cx="50%" cy="0%" r="70%">
      <stop offset="0%"   stop-color="${PRIMARY}"   stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${BG}"         stop-opacity="0"/>
    </radialGradient>
    <!-- name gradient -->
    <linearGradient id="nameGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${PRIMARY}"/>
      <stop offset="55%"  stop-color="${SECONDARY}"/>
      <stop offset="100%" stop-color="${ACCENT}"/>
    </linearGradient>
    <!-- subtle bottom fade -->
    <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${BG}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${PRIMARY}" stop-opacity="0.08"/>
    </linearGradient>
  </defs>

  <!-- background -->
  <rect width="${W}" height="${H}" fill="${BG}"/>

  <!-- dot grid -->
  ${gridDots(28, 14, 40, 1.4, PRIMARY, 0.12)}

  <!-- ambient glow -->
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#bottomFade)"/>

  <!-- outer border -->
  <rect x="20" y="20" width="${W - 40}" height="${H - 40}" rx="20"
        fill="none" stroke="${PRIMARY}" stroke-width="1.5" stroke-opacity="0.28"/>

  <!-- corner brackets TL -->
  <path d="M 40 80 L 40 40 L 80 40" fill="none" stroke="${SECONDARY}" stroke-width="2.5" stroke-linecap="round"/>
  <!-- corner brackets TR -->
  <path d="M ${W-80} 40 L ${W-40} 40 L ${W-40} 80" fill="none" stroke="${SECONDARY}" stroke-width="2.5" stroke-linecap="round"/>
  <!-- corner brackets BL -->
  <path d="M 40 ${H-80} L 40 ${H-40} L 80 ${H-40}" fill="none" stroke="${SECONDARY}" stroke-width="2.5" stroke-linecap="round"/>
  <!-- corner brackets BR -->
  <path d="M ${W-80} ${H-40} L ${W-40} ${H-40} L ${W-40} ${H-80}" fill="none" stroke="${SECONDARY}" stroke-width="2.5" stroke-linecap="round"/>

  <!-- eyebrow -->
  <text x="${W / 2}" y="168" text-anchor="middle"
        font-family="'Courier New',Courier,monospace"
        font-size="17" font-weight="600" letter-spacing="5"
        fill="${PRIMARY}" fill-opacity="0.85">[ ◈  PORTFOLIO ]</text>

  <!-- name -->
  <text x="${W / 2}" y="278" text-anchor="middle"
        font-family="'Courier New',Courier,monospace"
        font-size="82" font-weight="700" letter-spacing="-1"
        fill="url(#nameGrad)">R V Abhishek</text>

  <!-- divider -->
  <line x1="${W/2 - 220}" y1="308" x2="${W/2 + 220}" y2="308"
        stroke="${SECONDARY}" stroke-width="1" stroke-opacity="0.35"/>

  <!-- role -->
  <text x="${W / 2}" y="358" text-anchor="middle"
        font-family="'Courier New',Courier,monospace"
        font-size="24" font-weight="500"
        fill="${TEXT}" fill-opacity="0.72">AI/ML Engineer  ·  Full-Stack Developer</text>

  <!-- college -->
  <text x="${W / 2}" y="400" text-anchor="middle"
        font-family="'Courier New',Courier,monospace"
        font-size="16"
        fill="${MUTED}" fill-opacity="0.6">BMS College of Engineering, Bengaluru</text>

  <!-- pill badges -->
  <g transform="translate(${pillOffsetX}, 0)">${pillRow}</g>

  <!-- domain footer -->
  <text x="${W / 2}" y="565" text-anchor="middle"
        font-family="'Courier New',Courier,monospace"
        font-size="17" fill="${PRIMARY}" fill-opacity="0.55">
    rvabhishek.dev  ·  Open to internships &amp; research roles
  </text>

  <!-- availability dot -->
  <circle cx="${W/2 - 192}" cy="560" r="5" fill="#4ade80" fill-opacity="0.85"/>
</svg>`.trim();

const buf = Buffer.from(svg, 'utf-8');

try {
  await sharp(buf, { density: 144 })
    .resize(W, H)
    .png({ compressionLevel: 8 })
    .toFile(OUT);
  console.log(`✓  og-image.png written → ${OUT}`);
} catch (err) {
  // sharp on Windows may not support SVG input in all builds.
  // Fall back: write the SVG so you can convert manually.
  const svgOut = OUT.replace('.png', '.svg');
  writeFileSync(svgOut, svg, 'utf-8');
  console.warn(`⚠  sharp couldn't render SVG directly (${err.message})`);
  console.warn(`   SVG saved to ${svgOut}`);
  console.warn(`   Open it in a browser → screenshot at 1200×630 → save as og-image.png`);
}
