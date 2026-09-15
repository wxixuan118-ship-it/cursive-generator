// Ensure every indexable page carries the site-wide chrome AdSense reviewers
// and crawlers expect, without touching page copy:
//   1. the footer bottom bar links About / Contact / Blog / Privacy Policy / Terms
//      (static HTML, so it does not depend on navigation.js running)
//   2. the AdSense loader tag in <head>
//   3. the current navigation.js cache-buster
// Every edit is mirrored to public/. Safe to re-run; it only rewrites files
// that actually change. Run from the site root:
//   node scripts/ensure-site-chrome.mjs                      # footer links + ads tag
//   node scripts/ensure-site-chrome.mjs --nav-version 20260916   # also bump nav cache-buster
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
// Cache-buster for /assets/navigation.js (served immutable). Defaults to whatever the
// homepage already uses, so a plain run never bumps it; pass --nav-version YYYYMMDD
// after editing navigation.js to roll every page forward.
const argv = process.argv.slice(2);
const NAV_VERSION = argv[argv.indexOf('--nav-version') + 1] && argv.includes('--nav-version')
  ? argv[argv.indexOf('--nav-version') + 1]
  : (fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/navigation\.js\?v=([0-9a-z]+)/) || [, '20260915'])[1];
const ADS_TAG = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6697313643773879" crossorigin="anonymous"></script>';
const LEGAL = [
  ['/about.html', 'About'],
  ['/contact.html', 'Contact'],
  ['/blog/', 'Blog'],
  ['/privacy.html', 'Privacy Policy'],
  ['/terms.html', 'Terms'],
];
const SKIP_DIRS = new Set(['public', 'scripts', 'assets', 'node_modules', '.git', '.venv', 'extension', 'font-release', 'font-source', 'fonts', 'free-fonts']);
const SKIP_FILES = /^(startupranking|yandex_|google)/;

function* walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      yield* walk(path.join(dir, ent.name));
    } else if (ent.name.endsWith('.html') && !SKIP_FILES.test(ent.name)) {
      yield path.join(dir, ent.name);
    }
  }
}

const hrefKey = (h) => h.replace(/^\//, '').replace(/^blog$/, 'blog/');

function fixFooterLinks(html) {
  const m = html.match(/<span class="footer-links">([\s\S]*?)<\/span>/);
  if (!m) return { html, changed: false };
  const inner = m[1];
  const anchors = [...inner.matchAll(/<a [^>]*href="([^"]+)"[^>]*>[\s\S]*?<\/a>/g)];
  const have = new Map(anchors.map((a) => [hrefKey(a[1]), a[0]]));
  const legalKeys = new Set(LEGAL.map(([h]) => hrefKey(h)));
  const rest = anchors.filter((a) => !legalKeys.has(hrefKey(a[1]))).map((a) => a[0]);
  const legal = LEGAL.map(([h, label]) => `<a href="${h}">${label}</a>`);
  const multiline = inner.includes('\n');
  const sep = multiline ? '\n        ' : '';
  const rebuilt = multiline
    ? `\n        ${[...legal, ...rest].join(sep)}\n      `
    : [...legal, ...rest].join('');
  // Only rewrite when a legal link is missing or labelled differently.
  const missing = LEGAL.some(([h, label]) => have.get(hrefKey(h)) !== `<a href="${h}">${label}</a>`);
  if (!missing) return { html, changed: false };
  return { html: html.replace(m[0], `<span class="footer-links">${rebuilt}</span>`), changed: true };
}

function fixAds(html) {
  if (html.includes('adsbygoogle.js')) return { html, changed: false };
  if (/name="robots"[^>]*noindex/.test(html)) return { html, changed: false };
  const i = html.indexOf('</head>');
  if (i < 0) return { html, changed: false };
  const indent = html.slice(0, i).match(/\n([ \t]*)[^\n]*$/)?.[1] ?? '  ';
  return { html: html.slice(0, i) + `${ADS_TAG}\n${indent}`.replace(/^/, '') + html.slice(i), changed: true };
}

function fixNavVersion(html) {
  const next = html.replace(/navigation\.js\?v=[0-9a-z]+/g, `navigation.js?v=${NAV_VERSION}`);
  return { html: next, changed: next !== html };
}

let touched = 0;
for (const file of walk(root)) {
  const original = fs.readFileSync(file, 'utf8');
  if (/name="robots"[^>]*noindex/.test(original)) continue;
  let html = original;
  let changed = false;
  for (const fix of [fixFooterLinks, fixAds, fixNavVersion]) {
    const r = fix(html);
    html = r.html;
    changed ||= r.changed;
  }
  if (!changed) continue;
  const rel = path.relative(root, file);
  fs.writeFileSync(file, html);
  const mirror = path.join(root, 'public', rel);
  fs.mkdirSync(path.dirname(mirror), { recursive: true });
  fs.writeFileSync(mirror, html);
  touched++;
  console.log('updated', rel);
}
console.log(`${touched} file(s) updated`);
