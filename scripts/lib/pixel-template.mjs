// pixel-template.mjs — shared page shell for the pixel / retro-game cluster.
//
// Same idea as cluster-template.mjs, different runtime. A page is a config
// object; the bitmaps, themes and canvas drawing all live in the shared
// engine, so adding a page never means copying HTML or duplicating a renderer:
//
//   PixelFont (assets/pixel-engine.js)   ← glyphs + themes + canvas painter
//     └── PixelPageConfig → renderPixelPage() → one SEO landing page
//        (assets/pixel-cluster.js wires the controls)
//
// Every field that reads as page copy is per-page. Everything structural is
// shared, including the FAQ list, which is the single source for both the
// visible <details> blocks and the FAQPage JSON-LD so the two cannot drift.

export const DOMAIN = 'https://www.cursive-text-generator.net';

export function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

const p_ = (t) => `<p>${esc(t)}</p>`;
const paras = (v) => (Array.isArray(v) ? v : [v]).map(p_).join('');

export function renderPixelPage(p, domain = DOMAIN) {
  const url = `${domain}/${p.file}`;
  const slug = p.file.replace(/\.html$/, '');
  const sample = p.sample || 'PIXEL';
  const maxlength = p.maxlength || 48;
  const appName = p.appName || `${p.label} Font Generator`;
  const crumb = p.crumb || `${p.label} Fonts`;
  const preview = p.preview || `assets/previews/${slug}.svg`;

  const chips = p.chips
    .map(([id, label], i) =>
      `<button class="px-chip${i ? '' : ' active'}" type="button" data-cat="${id}" aria-pressed="${i ? 'false' : 'true'}">${esc(label)}</button>`)
    .join('');
  const steps = p.steps
    .map(([head, body]) => `<li class="px-step"><strong>${esc(head)}</strong>${esc(body)}</li>`)
    .join('');
  const examples = p.examples
    .map(([text, note]) => `<div class="px-example"><code>${esc(text)}</code><span>${esc(note)}</span></div>`)
    .join('');
  const links = p.links
    .map(([name, href, note]) => `<a class="px-link" href="${href}"><strong>${esc(name)}</strong><span>${esc(note)}</span></a>`)
    .join('');
  const styleList = p.styleNotes
    .map(([name, note]) => `<li><strong>${esc(name)}</strong> — ${esc(note)}</li>`)
    .join('');
  const faqHtml = p.faqs
    .map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`)
    .join('');
  const faqJson = p.faqs.map(([q, a]) => ({
    '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
  }));

  const webApp = {
    '@context': 'https://schema.org', '@type': 'WebApplication', name: appName, url,
    applicationCategory: 'DesignApplication', operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: p.description,
    featureList: ['Live pixel text preview', 'Adjustable pixel size', 'Custom text and background colours', 'PNG download', 'Copy-and-paste block text art'],
  };
  const crumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Cursive Text Generator', item: `${domain}/` },
      { '@type': 'ListItem', position: 2, name: crumb, item: url },
    ],
  };

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(p.title)}</title><meta name="description" content="${esc(p.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:url" content="${url}"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:image" content="${domain}/${preview}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(p.title)}"><meta name="twitter:description" content="${esc(p.description)}"><meta name="twitter:image" content="${domain}/${preview}">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="stylesheet" href="/assets/styles.css?v=20260904b"><link rel="stylesheet" href="/assets/pixel.css?v=20260909">
<script async src="https://www.googletagmanager.com/gtag/js?id=G-L34V5ZL59H"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-L34V5ZL59H');</script>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6697313643773879" crossorigin="anonymous"></script>
<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xtizgdek92");</script>
<script type="application/ld+json">${JSON.stringify(webApp)}</script>
<script type="application/ld+json">${JSON.stringify(crumbs)}</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqJson })}</script></head>
<body><header class="site-header"></header><nav class="nav-mobile-drawer" id="nav-drawer" aria-label="Mobile navigation"></nav>
<nav class="breadcrumb" aria-label="Breadcrumb"><div class="wrap"><ol class="breadcrumb-list"><li><a href="/">Home</a></li><li aria-current="page">${esc(p.h1)}</li></ol></div></nav>
<main>
<section class="hero px-hero"><div class="wrap"><div class="tool-intro"><p class="px-kicker">${esc(p.kicker)}</p><h1>${esc(p.h1)}</h1><p>${esc(p.intro)}</p></div></div></section>

<section class="tool-section"><div class="wrap px-shell">
<div class="generator-card px-panel" data-pixel-generator data-themes="${p.themes}" data-slug="${slug}" data-sample="${esc(sample)}">
  <label for="px-text"><strong>Enter your text</strong></label>
  <textarea id="px-text" class="px-input" maxlength="${maxlength}" spellcheck="false">${esc(sample)}</textarea>
  <div class="px-controls">
    <span class="px-control"><strong><label for="px-size">Pixel size</label></strong><input id="px-size" type="range" min="3" max="14" step="1" value="7"><span class="px-size-out" id="px-size-out">7×</span></span>
    <span class="px-control"><input id="px-custom" type="checkbox"><label for="px-custom">Custom colours</label></span>
    <span class="px-control"><label for="px-fg">Text</label><input id="px-fg" type="color" value="#ffffff"></span>
    <span class="px-control"><label for="px-bg">Background</label><input id="px-bg" type="color" value="#000000"></span>
    <span class="px-control"><input id="px-clear-bg" type="checkbox"><label for="px-clear-bg">Transparent background</label></span>
    <span class="px-control"><input id="px-upper" type="checkbox"><label for="px-upper">All caps</label></span>
    <button class="button secondary px-reset" type="button">Reset</button>
  </div>
  <p class="px-note">Free · no sign-up · renders in your browser · nothing is uploaded</p>
  <div class="px-chips" aria-label="Filter pixel styles">${chips}</div>
  <div class="px-count" aria-live="polite"></div>
  <div class="px-grid"></div>
</div>
</div></section>

<section class="px-section"><div class="wrap"><h2>${esc(p.aboutTitle)}</h2>${paras(p.about)}
<figure class="px-figure"><img src="/${preview}" width="1200" height="630" loading="lazy" decoding="async" alt="${esc(p.previewAlt)}"><figcaption>${esc(p.previewCaption)}</figcaption></figure>
</div></section>

<section class="px-section alt"><div class="wrap"><h2>${esc(p.howToTitle)}</h2><ol class="px-steps">${steps}</ol></div></section>

<section class="px-section"><div class="wrap"><h2>${esc(p.stylesTitle)}</h2>${paras(p.stylesIntro)}<ul class="px-style-list">${styleList}</ul></div></section>

<section class="px-section alt"><div class="wrap"><h2>${esc(p.outputTitle)}</h2>${paras(p.output)}
<p class="px-limit"><strong>Good to know:</strong> ${esc(p.limitNote)}</p></div></section>

<section class="px-section"><div class="wrap"><h2>${esc(p.uniqueH2)}</h2>${paras(p.uniqueBody)}</div></section>

<section class="px-section alt"><div class="wrap"><h2>${esc(p.whereTitle)}</h2>${paras(p.where)}</div></section>

<section class="px-section"><div class="wrap"><h2>${esc(p.examplesTitle)}</h2>${paras(p.examplesIntro)}<div class="px-examples">${examples}</div></div></section>

<section class="px-section alt"><div class="wrap"><h2>${esc(p.legalTitle)}</h2>${paras(p.legal)}</div></section>

<section class="px-section"><div class="wrap"><h2>${esc(p.linksTitle)}</h2><div class="px-links">${links}</div></div></section>

<section class="px-section alt"><div class="wrap px-faq"><h2>${esc(p.faqTitle)}</h2>${faqHtml}</div></section>
</main>
<div class="px-toast" data-toast role="status" aria-live="polite"></div>
<footer class="site-footer"><div class="footer-inner"><span>Cursive Text Generator</span><span class="footer-links"><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/privacy.html">Privacy</a><a href="/sitemap.html">Sitemap</a></span></div></footer>
<script src="/assets/navigation.js?v=20260909"></script><script src="/assets/pixel-engine.js?v=20260909"></script><script src="/assets/pixel-cluster.js?v=20260909"></script></body></html>`;
}
