// signature-template.mjs — shared page shell for the cursive signature cluster.
//
// One HTML shell + one runtime (styles.css, signature-cluster.css,
// signature-engine.js, signature-app.js, navigation.js) is reused by every
// style page. A page is a *config object* built in build-signature-cluster.mjs:
//
//   SigEngine (signature-engine.js)
//     └── page config  →  renderSignaturePage()  →  one SEO landing page
//
// Everything that reads as copy, presets or examples is per page; the tool
// markup, social mock-ups, footer and schema are shared. Static examples and
// the "browse by style" cards are pre-rendered here with the same engine the
// browser runs, so crawlers see real signatures without executing JS.

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const Engine = require('../../assets/signature-engine.js');

export const DOMAIN = 'https://www.cursive-text-generator.net';
export const HUB = '/copy-and-paste-cursive-signature.html';
export const ASSET_V = '20260912';

export function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export const render = (text, preset) => Engine.render(text, preset);

// Inline markup allowed in copy: <strong>, <em>, <a href>, <br>, <code>.
// Copy is authored, not user input, so it is emitted as written.
const p = (html) => (/^\s*<(div|figure|ul|ol)\b/.test(html) ? html : `<p>${html}</p>`);
const paras = (arr) => (Array.isArray(arr) ? arr : [arr]).map(p).join('\n          ');

function liveAttrs(preset) {
  const a = [`data-sig-live`, `data-sig-style="${esc(preset.style || 'boldScript')}"`];
  if (preset.pre) a.push(`data-sig-pre="${esc(preset.pre)}"`);
  if (preset.post) a.push(`data-sig-post="${esc(preset.post)}"`);
  if (preset.mode) a.push(`data-sig-mode="${esc(preset.mode)}"`);
  if (preset.sep) a.push(`data-sig-sep="${esc(preset.sep)}"`);
  return a.join(' ');
}

export function browseCards(pages, currentKey, sample) {
  return pages
    .filter((pg) => pg.key !== currentKey)
    .map((pg) => {
      const sig = render(pg.heroSample || sample || pg.sample, pg.hero);
      return `<a class="style-card" href="/${pg.file}">
            <span class="style-card-sig">${esc(sig)}</span>
            <strong>${esc(pg.cardTitle || pg.h1)}</strong>
            <em>${esc(pg.cardNote)}</em>
          </a>`;
    })
    .join('\n          ');
}

export function footer(pages) {
  const styleLinks = pages.map((pg) => `<a href="/${pg.file}">${esc(pg.footerLabel || pg.label)}</a>`).join('\n        ');
  return `<footer class="site-footer">
    <div class="footer-body">
      <div class="footer-col">
        <strong class="footer-col-title">Signature Styles</strong>
        <a href="${HUB}">All Signature Styles</a>
        ${styleLinks}
      </div>
      <div class="footer-col">
        <strong class="footer-col-title">Copy &amp; Paste</strong>
        <a href="/copy-and-paste-cursive-font.html">Cursive Font</a>
        <a href="/copy-and-paste-cursive-writing.html">Cursive Writing</a>
        <a href="/">Cursive Generator</a>
      </div>
      <div class="footer-col">
        <strong class="footer-col-title">Name Tools</strong>
        <a href="/cursive-name-generator.html">Cursive Name Generator</a>
        <a href="/cursive-name-tracing-generator.html">Name Tracing</a>
        <a href="/cursive-name-practice-generator.html">Name Practice</a>
      </div>
      <div class="footer-col">
        <strong class="footer-col-title">Resources</strong>
        <a href="/cursive-letters-a-z.html">Cursive Alphabet</a>
        <a href="/cursive-fonts.html">Cursive Fonts</a>
        <a href="/free-fonts/ctg-signature-script.html">Free Signature Font</a>
        <a href="/cursive-compatibility.html">Compatibility</a>
      </div>
      <div class="footer-col">
        <strong class="footer-col-title">Theme Fonts</strong>
        <a href="/super-bowl-2027-font-generator.html">Super Bowl 2027</a>
        <a href="/stranger-things-font-generator.html">Stranger Things</a>
        <a href="/harry-potter-font-generator.html">Harry Potter</a>
        <a href="/barbie-font-generator.html">Barbie</a>
      </div>
    </div>
    <div class="footer-inner">
      <span>Cursive Text Generator</span>
      <span class="footer-links">
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact</a>
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/terms.html">Terms</a>
        <a href="/sitemap.html">Sitemap</a>
      </span>
    </div>
  </footer>`;
}

export function socialMocks(sample, style, bio = {}) {
  const sig = render(sample, { style });
  const ig = bio.ig || '✨ Living life one day at a time<br>📍 New York · she/her';
  const tk = bio.tk || '👋 Welcome to my page<br>✨ New videos every week';
  const dc = bio.dc || '✨ Coffee lover · bookworm · adventure seeker';
  const handle = sample.toLowerCase().replace(/\s+/g, '_');
  return `<div class="social-tabs" id="social-tabs">
          <button class="social-tab active" type="button" data-platform="instagram">Instagram</button>
          <button class="social-tab" type="button" data-platform="tiktok">TikTok</button>
          <button class="social-tab" type="button" data-platform="discord">Discord</button>
          <button class="social-tab" type="button" data-platform="whatsapp">WhatsApp</button>
          <button class="social-tab" type="button" data-platform="x">X / Twitter</button>
        </div>
        <div class="social-mock visible" id="mock-instagram">
          <div class="ig-header"><div class="ig-avatar"></div><div class="ig-meta"><div class="ig-username" id="ig-username">${esc(handle)}</div></div></div>
          <div class="ig-sig" id="ig-sig">${esc(sig)}</div>
          <div class="ig-bio">${ig}<br>🔗 linktr.ee/${esc(handle)}</div>
        </div>
        <div class="social-mock" id="mock-tiktok">
          <div class="tk-wrap"><div class="tk-avatar"></div><div class="tk-sig" id="tk-sig">${esc(sig)}</div><div class="tk-handle">@${esc(handle)}</div><div class="tk-bio">${tk}</div></div>
        </div>
        <div class="social-mock" id="mock-discord">
          <div class="dc-wrap"><div class="dc-avatar"></div><div class="dc-body"><div class="dc-sig" id="dc-sig">${esc(sig)}</div><div class="dc-tag">@${esc(handle)} · <span style="color:var(--sage)">● Online</span></div><div class="dc-about">About Me: ${dc}</div></div></div>
        </div>
        <div class="social-mock" id="mock-whatsapp">
          <div class="wa-about"><div class="wa-avatar"></div><div class="wa-text"><div class="wa-label">About</div><div class="wa-sig" id="wa-sig">${esc(sig)}</div></div></div>
        </div>
        <div class="social-mock" id="mock-x">
          <div class="x-header"><div class="x-avatar"></div><div><div class="x-sig" id="x-sig">${esc(sig)}</div><div class="x-handle" id="x-handle">@${esc(handle)}</div></div></div>
        </div>`;
}

// 1200×630 preview card for a style page: three presets of the page's own
// sample name. Used as the article figure (so every page has a real, alt-texted
// image) — the raster hero stays as the og:image.
export function previewSvg(pg) {
  const picks = [pg.hero, ...(pg.previewPresets || pg.presets.filter((x) => x.unique).slice(0, 2))].slice(0, 3);
  const rows = picks.map((pr, i) => `<text x="80" y="${250 + i * 118}" font-family="Georgia, 'Times New Roman', serif" font-size="${i ? 64 : 84}" fill="${i ? '#3d4a43' : '#17201b'}">${esc(render(pg.sample, pr))}</text>`).join('\n  ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="${esc(pg.previewAlt)}">
  <rect width="1200" height="630" fill="#fbfaf7"/>
  <rect x="16" y="16" width="1168" height="598" rx="20" fill="#ffffff" stroke="#dfe6df" stroke-width="2"/>
  <text x="80" y="120" font-family="Inter, 'Segoe UI', system-ui, sans-serif" font-size="28" font-weight="700" letter-spacing="2" fill="#2f6b4f">${esc(pg.h1.toUpperCase())}</text>
  ${rows}
  <rect x="82" y="520" width="170" height="6" rx="3" fill="#c96f59"/>
  <text x="80" y="576" font-family="Inter, 'Segoe UI', system-ui, sans-serif" font-size="24" fill="#5d6a63">cursive-text-generator.net</text>
</svg>
`;
}

export const previewPath = (pg) => `assets/previews/${pg.file.replace(/\.html$/, '')}.svg`;

function examplesGrid(examples, sample) {
  if (!examples || !examples.length) return '';
  return `<div class="sig-examples">
            ${examples.map(([preset, note, text]) => `<div class="sig-example"><div class="sig-example-sig">${esc(render(text || sample, preset))}</div><span>${esc(note)}</span></div>`).join('\n            ')}
          </div>`;
}

export function renderSignaturePage(pg, pages) {
  const url = `${DOMAIN}/${pg.file}`;
  const sample = pg.sample;
  const eyebrow = (pg.eyebrow || '').replace('{n}', String(pg.presets.length));
  pg.previewAlt = pg.previewAlt || `“${pg.sample}” written as a ${pg.label.toLowerCase()} cursive signature in three styles — preview from the ${pg.h1} generator`;
  const ogDescription = pg.ogDescription || pg.description;
  const crumbs = pg.crumbs || [['Home', '/'], ['Cursive Signature Generator', HUB], [pg.crumb, null]];
  const crumbLd = (pg.breadcrumbLd || [
    { name: 'Home', item: '/' },
    { name: 'Cursive Signature Generator', item: HUB },
    { name: pg.crumb, item: `/${pg.file}` },
  ]).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${DOMAIN}${c.item === '/' ? '/' : c.item}` }));
  const webApp = { '@context': 'https://schema.org', '@type': 'WebApplication', name: pg.appName || pg.h1, applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, url, description: pg.description };
  if (!pg.isHub) webApp.isPartOf = { '@type': 'WebApplication', name: 'Cursive Signature Generator', url: `${DOMAIN}${HUB}` };
  const crumbHtml = crumbs.map(([name, href]) => href ? `<a href="${href}">${esc(name)}</a>` : esc(name)).join(' ›\n      ');
  const asideBox = pg.asideBox || `<strong style="display:block;font-size:13px;margin-bottom:.5rem">Want every style in one place?</strong>
            <a href="${HUB}" style="font-size:13px;color:var(--sage)">All cursive signature styles →</a>
            <br>
            <a href="/cursive-name-generator.html" style="font-size:13px;color:var(--sage);margin-top:.25rem;display:inline-block">Cursive Name Generator →</a>`;
  const heroBlock = pg.figure || `<figure class="page-preview" style="margin:20px 0 24px;max-width:560px;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--paper)">
          <img src="/${previewPath(pg)}" width="1200" height="630" loading="lazy" decoding="async" style="display:block;width:100%;height:auto" alt="${esc(pg.previewAlt)}">
          <figcaption style="font-size:13px;color:var(--muted);padding:8px 14px">${esc(pg.previewCaption || `“${pg.sample}” in three ${pg.label.toLowerCase()} signature styles from this page`)}</figcaption>
          </figure>
          <div class="sig-examples" style="max-width:560px">
            <div class="sig-example"><div class="sig-example-sig" ${liveAttrs(pg.hero)}>${esc(render(sample, pg.hero))}</div><span>${esc(pg.heroNote)}</span></div>
          </div>`;
  const browseSection = `<!-- ── BROWSE BY STYLE ── -->
    <section class="related-tools" id="styles">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">Browse by style</span>
          <h2>${pg.isHub ? 'Cursive Signature Styles' : 'More Cursive Signature Styles'}</h2>
          <p>${pg.browseP || 'Each style page has its own preset set — the ones marked “only here” do not appear anywhere else on the site.'}</p>
        </div>
        <div class="style-browse">
          ${pg.isHub ? '' : `<a class="style-card" href="${HUB}">
            <span class="style-card-sig">${esc(render(sample, { style: 'boldScript' }))}</span>
            <strong>All Signature Styles</strong>
            <em>The full hub: every category side by side, with the signature builder.</em>
          </a>`}
          ${browseCards(pages, pg.key, sample)}
        </div>
      </div>
    </section>`;
  const socialStyle = pg.socialStyle || 'boldScript';

  const tabs = pg.tabs
    .map(([id, label]) => {
      const on = id === (pg.defaultCat || 'all');
      return `<button class="cat-tab${on ? ' active' : ''}" type="button" data-cat="${id}" role="tab" aria-selected="${on}">${esc(label)}</button>`;
    })
    .join('\n            ');

  // Server-rendered result grid: crawlers and no-JS visitors see the full set
  // for the default tab; the runtime replaces it as soon as it boots.
  const defaultList = (pg.defaultCat && pg.defaultCat !== 'all')
    ? pg.presets.filter((x) => x.cat === pg.defaultCat) : pg.presets;
  const staticGrid = defaultList
    .map((pr) => `<div class="sig-card"><div class="sig-card-label">${esc(pr.name)}${pr.unique ? '<span class="sig-badge">only here</span>' : ''}</div><div class="sig-card-preview">${esc(render(sample, pr))}</div><button class="sig-card-btn" type="button">Copy</button></div>`)
    .join('\n            ');

  const builderStyles = (pg.builderStyles || [['boldScript', 'Bold Cursive'], ['script', 'Cursive Script'], ['boldItalic', 'Bold Italic'], ['fraktur', 'Old Style Script'], ['double', 'Double-Struck'], ['boldFraktur', 'Bold Gothic']])
    .map(([v, l], i) => `<option value="${v}"${i === 0 ? ' selected' : ''}>${esc(l)}</option>`).join('');
  const builderStyle = (pg.builderStyles || [['boldScript']])[0][0];
  const symbols = pg.symbols || [['♡ ', ' ♡', '♡'], ['✧ ', ' ✧', '✧'], ['★ ', ' ★', '★'], ['꧁', '꧂', '꧁꧂'], ['꒰ ', ' ꒱', '꒰꒱'], ['✿ ', ' ✿', '✿'], ['⊱ ', ' ⊰', '⊱⊰']];
  const symLeft = symbols.map(([l, , lab]) => `<button class="sym-btn" type="button" data-val="${esc(l)}">${esc(l.trim() || lab)}</button>`).join('');
  const symRight = symbols.map(([, r, lab]) => `<button class="sym-btn" type="button" data-val="${esc(r)}">${esc(r.trim() || lab)}</button>`).join('');

  const keywords = (pg.keywords || [])
    .map((k) => Array.isArray(k) ? `<a href="${k[1]}">${esc(k[0])}</a>` : `<span>${esc(k)}</span>`).join('\n            ');

  const sections = pg.sections.map((s) => {
    const tag = s.h3 ? 'h3' : 'h2';
    const head = s.h3 || s.h2;
    return `<${tag}>${esc(head)}</${tag}>
          ${paras(s.paras)}${s.examples ? '\n          ' + examplesGrid(s.examples, s.sample || sample) : ''}${s.list ? `\n          <ul>${s.list.map((li) => `<li>${li}</li>`).join('')}</ul>` : ''}`;
  }).join('\n\n          ');

  const faqHtml = pg.faqs.map(([q, a]) => `<h3>${esc(q)}</h3>\n          <p>${a}</p>`).join('\n          ');
  const faqJson = pg.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/<[^>]+>/g, '') } }));

  const related = pg.related.map(([name, href, note, icon]) => `<a class="tool-card" href="${href}">
            <span>${icon || '✍'}</span>
            <strong>${esc(name)}</strong>
            <em>${esc(note)}</em>
          </a>`).join('\n          ');

  const config = {
    presets: pg.presets, names: pg.names, sample, defaultCat: pg.defaultCat || 'all',
    socialStyle, nameStyle: pg.nameStyle || socialStyle, builderStyle,
  };

  const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-L34V5ZL59H"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-L34V5ZL59H');</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6697313643773879" crossorigin="anonymous"></script>
  <script>window.addEventListener('load',function(){setTimeout(function(){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xtizgdek92");},2000);});</script>
  <title>${esc(pg.title)}</title>
  <meta name="description" content="${esc(pg.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(pg.title)}">
  <meta property="og:description" content="${esc(ogDescription)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${DOMAIN}/assets/cursive-generator-hero.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(pg.title)}">
  <meta name="twitter:description" content="${esc(ogDescription)}">
  <meta name="twitter:image" content="${DOMAIN}/assets/cursive-generator-hero.png">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <link rel="preload" href="/assets/styles.css?v=20260827" as="style">
  <link rel="stylesheet" href="/assets/styles.css?v=20260827">
  <link rel="stylesheet" href="/assets/signature-cluster.css?v=${ASSET_V}">
  ${ld({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbLd })}
  ${ld(webApp)}
  ${ld({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqJson })}
</head>
<body>
  <header class="site-header"></header>
  <nav class="nav-mobile-drawer" id="nav-drawer" aria-label="Mobile navigation"></nav>
  <main class="page">
    <nav aria-label="Breadcrumb" class="sig-crumbs">
      ${crumbHtml}
    </nav>

    <!-- ── MAIN TOOL ── -->
    <section class="tool-section" id="tool">
      <div class="wrap">
        <div class="tool-intro">
          <div>
            <span class="eyebrow">${esc(eyebrow)}</span>
            <h1>${esc(pg.h1)}</h1>
            <p>${pg.intro}</p>
          </div>
        </div>
        <div class="sig-tool">
          <div class="sig-input-row">
            <label for="sig-input">Your name or text</label>
            <input type="text" id="sig-input" class="sig-input" value="${esc(sample)}" placeholder="Enter your name…" autocomplete="off" spellcheck="false" maxlength="60">
          </div>
          <div class="cat-tabs" id="cat-tabs" role="tablist">
            ${tabs}
          </div>
          <div class="sig-grid" id="sig-grid">
            ${staticGrid}
          </div>
        </div>

        <!-- ── SIGNATURE BUILDER ── -->
        <div class="builder-section" style="margin-top:2rem">
          <div class="builder-h">${esc(pg.builderTitle || `Customize Your ${pg.label} Signature`)}</div>
          <div class="builder-controls">
            <div class="bc-group">
              <label for="b-style">Signature Style</label>
              <select class="bc-select" id="b-style">${builderStyles}</select>
            </div>
            <div style="display:contents"></div>
            <div class="bc-group">
              <label>Left Symbol</label>
              <div class="sym-grid" id="b-left" data-side="left"><button class="sym-btn active" type="button" data-val="">None</button>${symLeft}</div>
            </div>
            <div class="bc-group">
              <label>Right Symbol</label>
              <div class="sym-grid" id="b-right" data-side="right"><button class="sym-btn active" type="button" data-val="">None</button>${symRight}</div>
            </div>
          </div>
          <div class="builder-preview-wrap">
            <div class="builder-preview" id="b-preview">${esc(render(sample, { style: builderStyle }))}</div>
          </div>
          <button class="builder-copy-btn" id="b-copy" type="button">Copy Signature</button>
        </div>
      </div>
    </section>

    ${pg.isHub ? browseSection : ''}

    <!-- ── SOCIAL PREVIEW ── -->
    <section class="social-section">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">See it in context</span>
          <h2>${esc(pg.socialH2)}</h2>
          <p>${pg.socialP}</p>
        </div>
        ${socialMocks(sample, socialStyle, pg.socialBio)}
      </div>
    </section>

    <!-- ── POPULAR NAMES ── -->
    <section class="names-section">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">Try a name</span>
          <h2>${esc(pg.namesH2)}</h2>
          <p>${pg.namesP || 'Click a name to load it into the generator above.'}</p>
        </div>
        <div class="names-grid" id="names-grid"></div>
      </div>
    </section>

    <!-- ── SEO CONTENT ── -->
    <section class="seo-section">
      <div class="wrap seo-layout">
        <aside class="seo-aside">
          <h2>Popular Searches</h2>
          <div class="keyword-list">
            ${keywords}
          </div>
          <div style="margin-top:1.5rem;padding:1rem 1.25rem;background:var(--soft);border-radius:10px;border:1.5px solid var(--line)">
            ${asideBox}
          </div>
        </aside>
        <article class="seo-copy">
          <h2>${esc(pg.articleH2)}</h2>
          ${paras(pg.articleIntro)}
          ${heroBlock}

          ${sections}

          <h2>Frequently Asked Questions</h2>
          ${faqHtml}
        </article>
      </div>
    </section>

    ${pg.isHub ? '' : browseSection}

    <!-- ── RELATED TOOLS ── -->
    <section class="related-tools">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">More tools</span>
          <h2>${esc(pg.relatedH2 || 'Related Cursive Tools')}</h2>
        </div>
        <div class="tool-grid">
          ${related}
        </div>
      </div>
    </section>
  </main>

  ${footer(pages)}

  <div class="sig-toast" id="sig-toast"></div>
  <script>window.SIG_CONFIG=${JSON.stringify(config)};</script>
  <script src="/assets/signature-engine.js?v=${ASSET_V}"></script>
  <script src="/assets/signature-app.js?v=${ASSET_V}"></script>
  <script src="/assets/navigation.js?v=20260912" defer></script>
</body>
</html>
`;
}
