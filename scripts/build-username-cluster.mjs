// build-username-cluster.mjs — lint, illustrate and render the username generator pages.
//
//   node scripts/build-username-cluster.mjs scripts/page-configs/cute-username-generator.json [--lint-only] [--force]
//   node scripts/build-username-cluster.mjs --all          # every page-config with "type":"username"
//
// The username pages are config objects rendered through
// scripts/lib/username-template.mjs on top of the shared engine
// assets/username-generator.js. This script:
//
//   1. lints the config against the on-page rules the audit checks for real
//      (title/description/H1/intro lengths and keyword placement, links that
//      resolve, ≥5 FAQs, vocabulary that the engine can actually use);
//   2. runs the real engine in a sandbox with a seeded RNG to pre-render the
//      first batch of results, so the page has server-side text and the
//      sample cards are stable between builds;
//   3. draws the 1200x630 preview SVG from the page's own example usernames
//      (assets/previews/<slug>.svg) and fills figure.src/width/height;
//   4. renders the HTML into the site root and the public/ mirror.
//
// Audit, backlinks and sitemap registration are the same commands as the font
// pipeline: scripts/new-page/{audit,inject-backlinks,register}.mjs.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { renderUsernamePage, esc, plain } from './lib/username-template.mjs';
import { root, CONFIG_DIR, readConfig, writeMirrored, stripTags, countWords, phraseCount, contentTokens, variants, slugify } from './new-page/lib.mjs';

const args = process.argv.slice(2);
const lintOnly = args.includes('--lint-only');
const force = args.includes('--force');
const targets = args.includes('--all')
  ? fs.readdirSync(CONFIG_DIR).filter((f) => f.endsWith('.json') && !f.endsWith('.audit.json'))
      .map((f) => path.join(CONFIG_DIR, f)).filter((f) => JSON.parse(fs.readFileSync(f, 'utf8')).type === 'username')
  : args.filter((a) => !a.startsWith('--'));
if (!targets.length) { console.error('usage: build-username-cluster.mjs <config.json> [--lint-only] [--force] | --all'); process.exit(2); }

/** assets/username-generator.js in a sandbox whose Math.random is seeded, so sample cards are reproducible. */
function loadEngine(seed) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(`(function(){ var s = ${seed >>> 0} || 1; Math.random = function(){ s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; })();`, sandbox);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets', 'username-generator.js'), 'utf8'), sandbox);
  return sandbox.window.UsernameGenerator;
}

function previewSvg(cfg) {
  const fig = cfg.figure || {};
  const examples = (fig.examples || cfg.ideas.groups.flatMap((g) => g.examples.slice(0, 2))).slice(0, 6);
  const kicker = (cfg.h1 || cfg.keyword).toUpperCase();
  const word = fig.sample || cfg.sampleWord;
  const alt = fig.alt || `${cfg.keyword} example: “${word}” turned into ${examples.slice(0, 3).join(', ')} and other username ideas`;
  const col = (i) => (i % 2 ? 640 : 80);
  const row = (i) => 330 + Math.floor(i / 2) * 90;
  const lines = examples.map((t, i) => {
    const size = Math.max(34, Math.min(56, Math.round(760 / Math.max(8, [...t].length))));
    return `  <text x="${col(i)}" y="${row(i)}" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="${size}" font-weight="600" fill="#17201b">${esc(t)}</text>`;
  }).join('\n');
  const tagline = fig.tagline || '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="${esc(alt)}">
  <rect width="1200" height="630" fill="#fbfaf7"/>
  <rect x="16" y="16" width="1168" height="598" rx="20" fill="#ffffff" stroke="#dfe6df" stroke-width="2"/>
  <text x="80" y="110" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="28" font-weight="700" letter-spacing="2" fill="#2f6b4f">${esc(kicker)}</text>
  <text x="80" y="210" font-family="Georgia, Times New Roman, serif" font-size="64" fill="#5d6a63">${esc(word)}</text>
  <text x="${80 + Math.round([...word].length * 34) + 30}" y="205" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="44" fill="#c96f59">&#8594;</text>
${lines}
  <text x="80" y="590" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="22" font-weight="700" letter-spacing="4" fill="#c96f59">${esc(tagline)}</text>
  <text x="1120" y="590" text-anchor="end" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="22" fill="#5d6a63">cursive-text-generator.net</text>
</svg>
`;
  const slug = cfg.file.replace(/\.html$/, '');
  const rel = `assets/previews/${slug}.svg`;
  writeMirrored(rel, svg);
  cfg.figure = { ...fig, examples, sample: word, src: `/${rel}`, width: 1200, height: 630, alt,
    caption: fig.caption || `Example ${cfg.keyword} results for “${word}”` };
  return rel;
}

function lint(cfg) {
  const kw = cfg.keyword.trim();
  const kwLower = kw.toLowerCase();
  const kwWords = contentTokens(kw);
  const problems = [];
  const warn = (field, msg) => problems.push({ field, msg });
  const hasPhrase = (s) => phraseCount(plain(s || ''), kw) > 0;
  const hasAllWords = (s) => { const t = new Set(contentTokens(plain(s || '')).flatMap((x) => [...variants(x)])); return kwWords.every((w) => t.has(w) || [...variants(w)].some((v) => t.has(v))); };
  const onTopic = (h) => contentTokens(h).some((t) => kwWords.some((w) => variants(w).has(t) || variants(t).has(w)));

  if (cfg.type !== 'username') warn('type', 'must be "username"');
  if (!cfg.title) warn('title', 'missing');
  else {
    if (cfg.title.length < 25 || cfg.title.length > 60) warn('title', `${cfg.title.length} chars — needs 25–60`);
    if (!hasPhrase(cfg.title)) warn('title', 'must contain the exact keyword phrase');
    else if (cfg.title.toLowerCase().indexOf(kwLower) > 30) warn('title', 'keyword should start within the first 30 characters');
  }
  if (!cfg.description) warn('description', 'missing');
  else {
    if (cfg.description.length < 120 || cfg.description.length > 160) warn('description', `${cfg.description.length} chars — needs 120–160`);
    if (!hasPhrase(cfg.description)) warn('description', 'use the exact keyword phrase once');
  }
  if (!cfg.h1 || !hasPhrase(cfg.h1)) warn('h1', 'must contain the exact keyword phrase');
  if (!cfg.file.includes(slugify(kw))) warn('file', `slug should contain "${slugify(kw)}"`);
  if (countWords(cfg.kicker || '') >= 15) warn('kicker', 'keep under 15 words');
  if (countWords(cfg.sub || '') >= 15) warn('sub', 'keep under 15 words or it becomes the audited opening paragraph');
  if (!hasPhrase(cfg.intro)) warn('intro', 'must contain the exact keyword phrase (audited opening paragraph)');
  if (countWords(plain(cfg.intro || '')) < 40) warn('intro', 'aim for 40–70 words');
  if (cfg.sampleWord == null) warn('sampleWord', 'missing — the pre-rendered batch needs a word ("" is allowed for anonymous mode)');

  // headings
  const h2s = [cfg.resultsTitle, cfg.howTo?.title, cfg.ideas?.title, cfg.platforms?.title, cfg.formulas?.title, cfg.symbols?.title, cfg.guide?.title, cfg.uniqueH2, cfg.faqTitle, cfg.related?.title || 'More Username Generators', 'Related tools'].filter(Boolean);
  if (!h2s.some(hasAllWords)) warn('h2', 'at least one H2 must carry the keyword (or all its words)');
  const off = h2s.filter((h) => !onTopic(h));
  if (off.length > 3) warn('h2', `${off.length} H2s share no word with the keyword: ${off.map((h) => `"${h}"`).join(', ')}`);

  // vocabulary the engine can use
  const styles = cfg.styles || {};
  const keys = Object.keys(styles);
  if (keys.length < 4) warn('styles', `${keys.length} styles — give the page at least 4`);
  for (const k of keys) {
    const st = styles[k];
    for (const f of ['adjectives', 'nouns']) if (!Array.isArray(st[f]) || st[f].length < 6) warn(`styles.${k}.${f}`, 'needs 6+ words');
    if (!st.label) warn(`styles.${k}.label`, 'missing');
    if (!Array.isArray(st.symbols) || !st.symbols.length) warn(`styles.${k}.symbols`, 'needs at least one symbol (the engine picks from it on Mix)');
  }
  if (!cfg.common?.prefixes?.length || !cfg.common?.suffixes?.length) warn('common', 'prefixes[] and suffixes[] are required');
  if (cfg.defaults?.style && cfg.defaults.style !== 'all' && !styles[cfg.defaults.style]) warn('defaults.style', `unknown style "${cfg.defaults.style}"`);
  for (const g of cfg.ideas?.groups || []) if (g.key && !styles[g.key]) warn('ideas.groups', `group "${g.title}" points at unknown style "${g.key}"`);
  for (const c of cfg.platforms?.cards || []) if (c.preset?.style && c.preset.style !== 'all' && !styles[c.preset.style]) warn('platforms.cards', `"${c.title}" preset uses unknown style "${c.preset.style}"`);
  for (const [f] of cfg.filters || []) if (f.startsWith('style:') && !styles[f.slice(6)]) warn('filters', `unknown style filter "${f}"`);
  for (const sec of ['howTo', 'ideas', 'platforms', 'formulas', 'guide']) if (!cfg[sec]) warn(sec, 'section is required');

  // links
  const GENERIC = new Set(['click here', 'here', 'read more', 'learn more', 'more', 'link', 'this page']);
  const links = cfg.links || [];
  if (links.length < 5) warn('links', `${links.length} related-tool cards — need 5+`);
  const checkHref = (field, name, href) => {
    if (href === '/' || href.startsWith('#')) return;
    if (!href.startsWith('/') || !fs.existsSync(path.join(root, href.replace(/^\//, '').replace(/\/$/, '/index.html')))) warn(field, `"${href}" does not resolve to a file in the site root`);
    if (GENERIC.has((name || '').toLowerCase())) warn(field, `anchor "${name}" is generic`);
  };
  for (const [name, href] of links) checkHref('links', name, href);
  for (const [name, href] of cfg.asideLinks || []) checkHref('asideLinks', name, href);
  for (const [, href] of cfg.cta?.links || []) checkHref('cta.links', 'x', href);
  for (const c of cfg.platforms?.cards || []) if (c.link) checkHref('platforms.cards', c.link[0], c.link[1]);
  const mdLinks = JSON.stringify(cfg).match(/\]\((\/[^)\s"]*)\)/g) || [];
  for (const m of mdLinks) checkHref('inline link', 'x', m.slice(2, -1));
  if (!cfg.source || !/^https:\/\//.test(cfg.source.href || '')) warn('source', 'add one outbound citation { before, name, href (https), after }');
  if (!cfg.faqs || cfg.faqs.length < 5) warn('faqs', 'need 5–8 questions');
  if (cfg.figure && !hasAllWords(cfg.figure.alt || '')) warn('figure.alt', 'alt text should include the keyword');
  return problems;
}

let failed = 0;
for (const target of targets) {
  const cfg = readConfig(target);
  const { _configPath } = cfg;
  const problems = lint(cfg);

  // pre-rendered batch
  let samples = [];
  if (cfg.sampleWord != null && !problems.some((p) => p.field.startsWith('styles') || p.field === 'common')) {
    const engine = loadEngine(cfg.seed || 1);
    const d = { style: 'all', length: 'any', numbers: 'auto', symbols: 'auto', separator: 'auto', letters: 'lower', ...(cfg.defaults || {}) };
    const engineCfg = { batchSize: cfg.batchSize || 24, maxLength: cfg.maxLength, common: cfg.common, styles: cfg.styles };
    try { samples = engine.generate(engineCfg, { word: cfg.sampleWord, ...d }, []).results; }
    catch (e) { problems.push({ field: 'sampleWord', msg: e.message }); }
    if (samples.length < (cfg.batchSize || 24)) problems.push({ field: 'styles', msg: `engine produced only ${samples.length} sample results — vocabulary too thin for the defaults` });
  }

  if (!lintOnly && !problems.length) previewSvg(cfg);
  else if (!lintOnly && force && !cfg.figure?.src) previewSvg(cfg);

  let html = '';
  try { html = renderUsernamePage(cfg, samples); } catch (e) { problems.push({ field: 'render', msg: e.message }); }
  let stats = null;
  if (html) {
    const main = stripTags(html.match(/<main[\s\S]*?<\/main>/i)?.[0] || '');
    const wc = countWords(main);
    const hits = phraseCount(main, cfg.keyword);
    const density = wc ? (100 * hits * Math.max(1, cfg.keyword.split(/\s+/).length)) / wc : 0;
    if (wc < 650) problems.push({ field: 'body', msg: `${wc} words in <main> — need 650+` });
    if (hits < 4) problems.push({ field: 'body', msg: `exact keyword phrase appears ${hits}× in <main> — need 4+` });
    if (density > 2.8) problems.push({ field: 'body', msg: `keyword density ${density.toFixed(2)}% — over 3% is penalised` });
    if (density < 0.6) problems.push({ field: 'body', msg: `keyword density ${density.toFixed(2)}% — under 0.5% is penalised` });
    const internal = (html.match(/<main[\s\S]*?<\/main>/i)?.[0].match(/href="\/[^"]*"/g) || []).length;
    stats = { words: wc, keywordHits: hits, density: Number(density.toFixed(2)), h2s: (html.match(/<h2/g) || []).length, internalLinks: internal, samples: samples.length };
  }

  const report = { file: cfg.file, ok: problems.length === 0, stats, problems };
  if (!report.ok && !force) { failed++; console.log(JSON.stringify(report, null, 2)); console.error(`\n${cfg.file}: ${problems.length} problem(s). Fix the config, or pass --force to render anyway.`); continue; }
  if (lintOnly) { console.log(JSON.stringify(report, null, 2)); continue; }

  // persist the figure block the preview step filled in
  const { _configPath: _, _stats, ...toSave } = cfg;
  fs.writeFileSync(_configPath, JSON.stringify(toSave, null, 2) + '\n');
  writeMirrored(cfg.file, html);
  report.written = [cfg.file, `public/${cfg.file}`, cfg.figure?.src];
  console.log(JSON.stringify(report, null, 2));
}
process.exit(failed ? 1 : 0);
