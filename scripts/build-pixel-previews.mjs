// build-pixel-previews.mjs — 1200x630 social/article previews for the pixel pages.
//
// These are drawn by the same engine the page uses, so the preview cannot drift
// away from what a visitor actually sees. Rows of adjacent pixels are emitted as
// a single <rect>, which keeps the files small enough to inline comfortably.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'assets', 'pixel-engine.js'), 'utf8'), sandbox);
const PF = sandbox.window.PixelFont;

const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function rects(grid, ox, oy, scale, fill) {
  const out = [];
  for (let y = 0; y < grid.h; y++) {
    const row = grid.rows[y];
    let x = 0;
    while (x < grid.w) {
      if (!row[x]) { x++; continue; }
      let run = 1;
      while (x + run < grid.w && row[x + run]) run++;
      out.push(`<rect x="${(ox + x) * scale}" y="${(oy + y) * scale}" width="${run * scale}" height="${scale}" fill="${fill}"/>`);
      x += run;
    }
  }
  return out.join('');
}

function pixelBlock(text, theme, { scale, cx, cy, gradientId }) {
  const grid = PF.layout(text, { tracking: 1, lineGap: 2, uppercase: !!theme.uppercase, align: theme.align === 'left' ? 'left' : 'center' });
  const ox = Math.round(cx / scale - grid.w / 2);
  const oy = Math.round(cy / scale - grid.h / 2);
  const grow = Math.max(theme.outlineW || 0, theme.glow ? theme.glow.r : 0);
  const thick = grow ? PF.dilate(grid, grow) : grid;
  let out = '';
  if (theme.glow) out += rects(PF.dilate(grid, theme.glow.r), ox - theme.glow.r, oy - theme.glow.r, scale, theme.glow.color);
  if (theme.shadow) out += rects(thick, ox - grow + theme.shadow.dx, oy - grow + theme.shadow.dy, scale, theme.shadow.color);
  if (theme.extrude) {
    for (let e = theme.extrude.n; e >= 1; e--) out += rects(thick, ox - grow + e, oy - grow + e, scale, theme.extrude.color);
  }
  if (theme.outlineW) out += rects(PF.dilate(grid, theme.outlineW), ox - theme.outlineW, oy - theme.outlineW, scale, theme.outline);
  const fill = Array.isArray(theme.fg) ? `url(#${gradientId})` : theme.fg;
  out += rects(grid, ox, oy, scale, fill);
  const defs = Array.isArray(theme.fg)
    ? `<defs><linearGradient id="${gradientId}" x1="0" y1="${oy * scale}" x2="0" y2="${(oy + grid.h) * scale}" gradientUnits="userSpaceOnUse">${
        theme.fg.map((stop, i) => `<stop offset="${theme.fg.length === 1 ? 0 : i / (theme.fg.length - 1)}" stop-color="${stop}"/>`).join('')
      }</linearGradient></defs>`
    : '';
  return defs + out;
}

const SANS = 'Inter, Segoe UI, system-ui, sans-serif';

const jobs = [
  {
    file: 'mario-font-generator.svg',
    theme: 'mario-classic',
    text: 'SUPER STAR',
    scale: 11,
    label: 'MARIO FONT GENERATOR',
    labelFill: '#ffffff',
    footer: 'PIXEL · 3D OUTLINE · PNG DOWNLOAD',
    alt: 'The words "SUPER STAR" drawn as chunky gold and red pixel letters with a black outline and 3D edge on a sky-blue background',
  },
  {
    file: 'undertale-font-generator.svg',
    theme: 'dialogue-box',
    text: '* You feel\n* determined.',
    scale: 11,
    label: 'UNDERTALE FONT GENERATOR',
    labelFill: '#ffffff',
    footer: 'DIALOGUE BOX · PIXEL TEXT · PNG DOWNLOAD',
    alt: 'The line "You feel determined." shown as white pixel letters inside a black dialogue box with a thin white border',
  },
];

for (const job of jobs) {
  const theme = PF.theme(job.theme);
  const bg = theme.bg || '#101010';
  const frame = theme.frame
    ? `<rect x="34" y="34" width="1132" height="562" fill="none" stroke="${theme.frame.color}" stroke-width="${theme.frame.w * 8}"/>`
    : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="${esc(job.alt)}">
<rect width="1200" height="630" fill="${bg}"/>${frame}
<text x="80" y="112" font-family="${SANS}" font-size="26" font-weight="700" letter-spacing="4" fill="${job.labelFill}">${esc(job.label)}</text>
${pixelBlock(job.text, theme, { scale: job.scale, cx: 600, cy: 330, gradientId: 'g-' + job.theme })}
<text x="80" y="546" font-family="${SANS}" font-size="24" font-weight="700" letter-spacing="4" fill="${job.labelFill}" opacity="0.75">${esc(job.footer)}</text>
<text x="80" y="586" font-family="${SANS}" font-size="22" fill="${job.labelFill}" opacity="0.6">cursive-text-generator.net</text>
</svg>
`;
  for (const dir of [path.join(root, 'assets', 'previews'), path.join(root, 'public', 'assets', 'previews')]) {
    fs.writeFileSync(path.join(dir, job.file), svg);
  }
  console.log(`${job.file} — ${(svg.length / 1024).toFixed(1)} KB`);
}
