// cluster-template.mjs — shared page template for the Unicode style clusters.
//
// One HTML shell + one runtime (styles.css, aesthetic-cluster.css,
// style-engine.js, aesthetic-cluster.js, navigation.js) is reused by every
// cluster page. A page is a *config object*, not a copied HTML file:
//
//   FontGenerator (style-engine.js)
//     └── StylePageConfig  →  renderClusterPage()  →  one SEO landing page
//
// Every field below that reads as page copy is per-page; everything structural
// is shared. Defaults reproduce the original aesthetic-cluster output exactly,
// so adding fields never rewrites an existing page.

export const DOMAIN = 'https://www.cursive-text-generator.net';

export function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function renderClusterPage(p, domain = DOMAIN) {
  const url = `${domain}/${p.file}`;
  const sample = p.sample || 'Your Text';
  const maxlength = p.maxlength || 160;
  const appName = p.appName || `${p.label} Font Generator`;
  const crumb = p.crumb || `${p.label} Fonts`;

  const copyHeading = p.copyHeading || `${p.label} Fonts Copy and Paste`;
  const copyBody = p.copyBody ||
    'Type your text once, compare the live styles above, and press Copy beside the result you want. The letters and decorations are Unicode characters, so the styling usually stays with the text when you paste it. This is different from a CSS font preview, which would revert when copied.';
  const popularTitle = p.popularTitle || `Popular ${p.label} Font Styles`;
  const howToTitle = p.howToTitle || `How to Use the ${p.label} Font Generator`;
  const steps = p.steps || [
    ['1. Enter your text', `Replace “${sample}” with a name, bio, caption, or short phrase.`],
    ['2. Choose a style', 'Compare the Unicode letters and decorative symbol combinations.'],
    ['3. Copy and paste', 'Use the Copy button, then paste the result into your chosen app.'],
  ];
  const socialTitle = p.socialTitle || `${p.label} Fonts for Social Media`;
  const limitNote = p.limitNote ||
    'decorative Unicode is widely supported, but exact glyphs and allowed characters vary by app and device.';
  const examplesTitle = p.examplesTitle || `${p.label} Font Examples`;
  const examplesIntro = p.examplesIntro ||
    'Try the sample ideas below in the generator, then adjust the wording and decoration to fit your profile.';
  const linksTitle = p.linksTitle || 'Explore Related Font Styles';
  const faqTitle = p.faqTitle || `${p.label} Fonts FAQ`;

  const chips = p.chips
    .map(([id, label], i) =>
      `<button class="cluster-chip${i ? '' : ' active'}" type="button" data-cat="${id}" aria-pressed="${i ? 'false' : 'true'}">${label}</button>`)
    .join('');
  const examples = p.examples
    .map(([text, note]) => `<div class="cluster-example"><code>${esc(text)}</code><span>${esc(note)}</span></div>`)
    .join('');
  const links = p.links
    .map(([name, href, note]) => `<a class="cluster-link" href="${href}"><strong>${esc(name)}</strong><span>${esc(note)}</span></a>`)
    .join('');
  const stepHtml = steps
    .map(([head, body]) => `<li class="cluster-step"><strong>${esc(head)}</strong>${esc(body)}</li>`)
    .join('');
  const faqHtml = p.faqs
    .map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`)
    .join('');
  const faqJson = p.faqs.map(([q, a]) => ({
    '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
  }));

  // Optional extra section for the page's own search intent (section order:
  // intent section sits between the how-to and the second example block).
  const uniqueSection = p.uniqueH2
    ? `\n<section class="cluster-section"><div class="wrap"><h2>${esc(p.uniqueH2)}</h2>${
        (Array.isArray(p.uniqueBody) ? p.uniqueBody : [p.uniqueBody])
          .map((para) => `<p>${esc(para)}</p>`).join('')
      }</div></section>`
    : '';

  const sampleAttr = p.sample ? ` data-sample="${esc(p.sample)}"` : '';

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(p.title)}</title><meta name="description" content="${esc(p.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:url" content="${url}"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:image" content="${domain}/assets/cursive-generator-hero.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(p.title)}"><meta name="twitter:description" content="${esc(p.description)}"><meta name="twitter:image" content="${domain}/assets/cursive-generator-hero.png">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="stylesheet" href="/assets/styles.css?v=20260904b"><link rel="stylesheet" href="/assets/aesthetic-cluster.css?v=20260908"><style>.cluster-hero .tool-intro p{display:block}</style>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: appName, url, applicationCategory: 'DesignApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: p.description })}</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Cursive Text Generator', item: `${domain}/` }, { '@type': 'ListItem', position: 2, name: crumb, item: url }] })}</script>
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqJson })}</script></head>
<body><header class="site-header"></header><nav class="nav-mobile-drawer" id="nav-drawer" aria-label="Mobile navigation"></nav><main>
<section class="hero cluster-hero"><div class="wrap"><div class="tool-intro"><p class="cluster-kicker">${esc(p.kicker)}</p><h1>${esc(p.h1)}</h1><p>${esc(p.intro)}</p></div></div></section>
<section class="tool-section"><div class="wrap cluster-shell"><div class="generator-card" data-cluster-generator data-style-ids="${p.ids}"${sampleAttr}><div class="cluster-input-panel"><label for="cluster-text"><strong>Enter your text</strong></label><textarea id="cluster-text" class="cluster-input" maxlength="${maxlength}">${esc(sample)}</textarea><div class="cluster-input-row"><button class="button secondary cluster-reset" type="button">Reset</button><span class="cluster-note">Free · no sign-up · live Unicode preview</span></div><div class="cluster-chips" aria-label="Filter styles">${chips}</div><div class="cluster-count" aria-live="polite"></div></div><div class="cluster-grid"></div></div></div></section>
<section class="cluster-section"><div class="wrap"><h2>${esc(copyHeading)}</h2><p>${esc(copyBody)}</p></div></section>
<section class="cluster-section alt"><div class="wrap"><h2>${esc(popularTitle)}</h2><p>${esc(p.popular)}</p><div class="cluster-examples">${examples}</div></div></section>
<section class="cluster-section"><div class="wrap"><h2>${esc(howToTitle)}</h2><ol class="cluster-steps">${stepHtml}</ol></div></section>
<section class="cluster-section alt"><div class="wrap"><h2>${esc(socialTitle)}</h2><p>${esc(p.social)}</p><p class="cluster-limit"><strong>Good to know:</strong> ${esc(limitNote)}</p></div></section>
<section class="cluster-section"><div class="wrap"><h2>${esc(p.specificTitle)}</h2><p>${esc(p.specific)}</p></div></section>${uniqueSection}
<section class="cluster-section alt"><div class="wrap"><h2>${esc(examplesTitle)}</h2><p>${esc(examplesIntro)}</p><div class="cluster-examples">${examples}</div></div></section>
<section class="cluster-section"><div class="wrap"><h2>${esc(linksTitle)}</h2><div class="cluster-links">${links}</div></div></section>
<section class="cluster-section alt"><div class="wrap cluster-faq"><h2>${esc(faqTitle)}</h2>${faqHtml}</div></section></main>
<footer class="site-footer"><div class="footer-inner"><span>Cursive Text Generator</span><span class="footer-links"><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/privacy.html">Privacy</a><a href="/sitemap.html">Sitemap</a></span></div></footer>
<script src="/assets/navigation.js?v=20260908b"></script><script src="/assets/style-engine.js?v=20260908b"></script><script src="/assets/aesthetic-cluster.js?v=20260908b"></script></body></html>`;
}
