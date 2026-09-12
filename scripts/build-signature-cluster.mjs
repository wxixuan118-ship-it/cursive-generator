// build-signature-cluster.mjs — the cursive signature hub and its style pages.
//
// Nine pages, one shared runtime. Nothing here renders text: the Unicode maps
// live in assets/signature-engine.js and the tool UI in assets/signature-app.js.
// A page is a config object in scripts/signature-pages/*.mjs, so the presets,
// tabs, copy, examples and FAQs are what differ — never the engine.
//
// Build-time checks (a failure aborts the build):
//   • every preset style exists in the engine
//   • every preset `cat` matches one of the page's tabs, and every tab (except
//     "all") has at least one preset
//   • a preset flagged `unique` renders identically on no other page — so the
//     "only here" badge is true, and the pages stay materially different
//   • no two pages share a title, H1 or description
//
// Usage: node scripts/build-signature-cluster.mjs
//   Writes each page to the repo root and to public/ (the deploy mirror), then
//   prints the URLs to add to sitemap.xml / indexnow-urls.txt if missing.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { renderSignaturePage, previewSvg, previewPath, DOMAIN } from './lib/signature-template.mjs';

import hub from './signature-pages/hub.mjs';
import elegant from './signature-pages/elegant.mjs';
import fancy from './signature-pages/fancy.mjs';
import simple from './signature-pages/simple.mjs';
import bold from './signature-pages/bold.mjs';
import cute from './signature-pages/cute.mjs';
import heart from './signature-pages/heart.mjs';
import aesthetic from './signature-pages/aesthetic.mjs';
import fonts from './signature-pages/fonts.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const Engine = require('../assets/signature-engine.js');

// Order here is the order of the footer column and the browse grid.
const styles = [elegant, fancy, simple, bold, cute, heart, aesthetic, fonts];
const pages = [hub, ...styles];

// ── validation ────────────────────────────────────────────────────────────
const errors = [];
const sig = (p) => [p.style, p.pre || '', p.post || '', p.mode || '', p.sep || ''].join('');

const seen = new Map(); // preset signature -> [page keys]
for (const pg of pages) {
  const tabIds = new Set(pg.tabs.map(([id]) => id));
  const used = new Set();
  for (const p of pg.presets) {
    if (!Engine.ALPHA[p.style]) errors.push(`${pg.key}: unknown style "${p.style}" in preset "${p.name}"`);
    if (!tabIds.has(p.cat)) errors.push(`${pg.key}: preset "${p.name}" has cat "${p.cat}" with no matching tab`);
    used.add(p.cat);
    const k = sig(p);
    if (!seen.has(k)) seen.set(k, []);
    seen.get(k).push(pg.key);
  }
  for (const id of tabIds) if (id !== 'all' && !used.has(id)) errors.push(`${pg.key}: tab "${id}" has no presets`);
  const dupNames = pg.presets.map((p) => p.name).filter((n, i, a) => a.indexOf(n) !== i);
  if (dupNames.length) errors.push(`${pg.key}: duplicate preset names ${[...new Set(dupNames)].join(', ')}`);
}
for (const pg of pages) {
  for (const p of pg.presets) {
    if (!p.unique) continue;
    const owners = [...new Set(seen.get(sig(p)))];
    if (owners.length > 1 || owners[0] !== pg.key) errors.push(`${pg.key}: "${p.name}" is flagged unique but also appears on ${owners.filter((o) => o !== pg.key).join(', ')}`);
  }
}
for (const field of ['title', 'h1', 'description', 'file']) {
  const vals = pages.map((pg) => pg[field]);
  vals.forEach((v, i) => { if (vals.indexOf(v) !== i) errors.push(`duplicate ${field}: ${v}`); });
}
for (const pg of pages) {
  if (pg.title.length > 65) errors.push(`${pg.key}: title is ${pg.title.length} chars (max 65)`);
  if (pg.description.length > 165) errors.push(`${pg.key}: description is ${pg.description.length} chars (max 165)`);
}
if (errors.length) {
  console.error('build-signature-cluster: validation failed\n  ' + errors.join('\n  '));
  process.exit(1);
}

// ── render ────────────────────────────────────────────────────────────────
const wordCount = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, ' ')
  .split(/\s+/).filter((w) => /[a-z]/i.test(w)).length;

for (const pg of pages) {
  if (!pg.isHub) {
    const svg = previewSvg(pg);
    fs.writeFileSync(path.join(root, previewPath(pg)), svg);
    fs.writeFileSync(path.join(root, 'public', previewPath(pg)), svg);
  }
  const html = renderSignaturePage(pg, styles);
  fs.writeFileSync(path.join(root, pg.file), html);
  fs.writeFileSync(path.join(root, 'public', pg.file), html);
  const uniq = pg.presets.filter((p) => p.unique).length;
  console.log(`wrote ${pg.file.padEnd(38)} presets=${String(pg.presets.length).padStart(2)} unique=${String(uniq).padStart(2)} words≈${wordCount(html)}`);
}

// ── sitemap / indexnow reminders ──────────────────────────────────────────
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const indexnow = fs.readFileSync(path.join(root, 'indexnow-urls.txt'), 'utf8');
const missing = pages.map((pg) => `${DOMAIN}/${pg.file}`).filter((u) => !sitemap.includes(`<loc>${u}</loc>`));
const missingNow = pages.map((pg) => `${DOMAIN}/${pg.file}`).filter((u) => !indexnow.includes(u));
if (missing.length) console.log('\nnot in sitemap.xml:\n  ' + missing.join('\n  '));
if (missingNow.length) console.log('\nnot in indexnow-urls.txt:\n  ' + missingNow.join('\n  '));
