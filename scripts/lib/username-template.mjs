// username-template.mjs — shared page template for the username generator cluster.
//
// One HTML shell + one runtime (styles.css, username-cluster.css,
// username-generator.js, navigation.js) is reused by every username page.
// A page is a *config object* (scripts/page-configs/<slug>.json with
// "type":"username"), not a copied HTML file:
//
//   UsernameGenerator (assets/username-generator.js)
//     └── UsernamePageConfig  →  renderUsernamePage()  →  one SEO landing page
//
// The markup mirrors aesthetic-username-generator.html (the hand-written
// original) so the engine's data-ug-* hooks line up; only the copy, the
// vocabulary and the links are per page. Paragraph fields accept a tiny
// markdown subset — **bold**, *em*, [text](/href) — everything else is escaped.
//
// Differentiation (added 2026-09-19 after a site-wide similarity audit found
// 29–50% of each username page's long paragraphs twinned on a sibling page):
//   • `#vocabulary` — a section rendered FROM the page's own style word lists
//     (counts, sample adjectives/nouns/endings per style). It is unique per page
//     by construction because no two configs share a vocabulary. Set
//     `"vocab": false` to drop it, or `"vocab": {title, intro, per}` to override.
//   • `platformName` — the service this page targets ("TikTok", "Riot's servers");
//     the availability note, favorites hint and empty state are phrased around it
//     (and around `maxLength` when set) instead of one sentence shared by 27 pages.

export const DOMAIN = 'https://www.cursive-text-generator.net';

export function esc(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/** Inline markdown subset → HTML. Escapes first, so config copy cannot inject markup. */
export function md(s) {
  return esc(s || '')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, h) => `<a href="${h}">${t}</a>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

/** Plain text of a markdown paragraph — for JSON-LD, where the FAQ text must match the visible copy. */
export function plain(s) {
  return String(s || '')
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1');
}

const attr = (o) => esc(JSON.stringify(o));
const chip = (name, value, label, checked, icon) =>
  `<label class="ug-chip"><input type="radio" name="${name}" value="${esc(value)}"${checked ? ' checked' : ''}><span>${icon ? `<i>${esc(icon)}</i>` : ''}${esc(label)}</span></label>`;
const copyChip = (t) => `<li><button type="button" data-ug-copy="${esc(t)}">${esc(t)}</button></li>`;

const OPTION_GROUPS = [
  ['length', 'Username length', [['any', 'Any'], ['short', 'Short'], ['medium', 'Medium'], ['long', 'Long']]],
  ['numbers', 'Add numbers', [['auto', 'Mix'], ['none', 'None'], ['random', 'Random'], ['birth', 'Birth-year style'], ['lucky', 'Lucky numbers']]],
  ['symbols', 'Add symbols', [['auto', 'Mix'], ['none', 'None'], ['minimal', 'Minimal'], ['cute', 'Cute'], ['hearts', 'Hearts'], ['stars', 'Stars'], ['sparkles', 'Sparkles']]],
  ['separator', 'Separator', [['auto', 'Mix'], ['none', 'None'], ['underscore', 'underscore _'], ['period', 'period .']]],
  ['letters', 'Letter style', [['lower', 'lowercase'], ['upper', 'UPPERCASE'], ['mixed', 'Mixed']]],
];

/**
 * @param p   page config (see scripts/page-configs/*.json with "type":"username")
 * @param samples  pre-rendered result cards [{text, style, hasSymbols, length}] from the engine
 */
export function renderUsernamePage(p, samples = [], domain = DOMAIN) {
  const url = `${domain}/${p.file}`;
  const label = p.label || '';
  const appName = p.appName || p.h1;
  const defaults = { style: 'all', length: 'any', numbers: 'auto', symbols: 'auto', separator: 'auto', letters: 'lower', ...(p.defaults || {}) };
  const styleKeys = Object.keys(p.styles);
  const crumb = p.crumb || ['Username Generator', '/username-generator.html'];
  const ogImage = p.figure?.src ? `${domain}${p.figure.src}` : `${domain}/assets/cursive-generator-hero.png`;
  const storageKey = p.storageKey || `ctg-${p.file.replace(/\.html$/, '')}-favs`;

  // ---- tool: style chips, customize options, filters, sample cards
  const styleChips = [chip('style', 'all', p.allLabel || 'All Styles', defaults.style === 'all', '✳')]
    .concat(styleKeys.map((k) => chip('style', k, p.styles[k].label, defaults.style === k, p.styles[k].icon)))
    .join('\n                ');
  const optionHtml = OPTION_GROUPS.map(([name, legend, opts]) =>
    `<fieldset class="ug-fs"><legend>${legend}</legend><div class="ug-chips">${opts.map(([v, l]) => chip(name, v, l, defaults[name] === v)).join('')}</div></fieldset>`).join('\n                ');
  const filters = p.filters || [
    ...styleKeys.slice(0, 4).map((k) => [`style:${k}`, p.styles[k].label]),
    ['short', 'Short'], ['symbols', 'With Symbols'], ['nosymbols', 'No Symbols'],
  ];
  const countFor = (f) => samples.filter((r) =>
    f === 'all' ? true : f.startsWith('style:') ? r.style === f.slice(6) : f === 'short' ? r.length <= 8 : f === 'symbols' ? r.hasSymbols : f === 'nosymbols' ? !r.hasSymbols : true).length;
  const filterHtml = [['all', 'All'], ...filters].map(([f, l], i) =>
    `<li><button type="button" data-ug-filter="${esc(f)}" aria-pressed="${i ? 'false' : 'true'}">${esc(l)} <i data-ug-filter-count>${countFor(f)}</i></button></li>`).join('\n                ');
  const cardHtml = samples.map((r) =>
    `<li class="ug-card" data-style="${esc(r.style)}" data-symbols="${r.hasSymbols ? 1 : 0}" data-len="${r.length}"><span class="ug-name">${esc(r.text)}</span><span class="ug-actions"><button type="button" class="ug-copy" data-ug-copy="${esc(r.text)}" aria-label="Copy ${esc(r.text)}">Copy</button><button type="button" class="ug-fav" data-ug-fav="${esc(r.text)}" aria-pressed="false" aria-label="Save ${esc(r.text)} to favorites">♡</button></span></li>`).join('\n              ');

  // ---- content sections
  const perks = (p.perks || ['Works with or without a name', 'Symbols, numbers & separators optional', 'Favorites saved in your browser', 'No account needed'])
    .map((t) => `<li>✓ ${esc(t)}</li>`).join('');
  const cta = p.cta || { title: 'Style Your Username', text: 'Found a username you like? Turn it into cursive, cute, bold or aesthetic text before adding it to your bio or profile.', links: [['Cursive Text Generator', '/cursive-text-generator.html'], ['Fancy & cute fonts', '/fancy-text-generator.html']] };
  const ctaHtml = cta.links.map(([t, h], i) => `<a class="ug-btn${i ? '' : ' primary'}" href="${h}">${esc(t)}</a>`).join('');

  const howTo = p.howTo;
  const stepsHtml = howTo.steps.map(([h, t], i) => `<li><span>0${i + 1}</span><div><h3>${esc(h)}</h3><p>${md(t)}</p></div></li>`).join('\n            ');

  const ideas = p.ideas;
  const ideaHtml = ideas.groups.map((g) => {
    const st = p.styles[g.key] || {};
    const shortcut = g.key && p.styles[g.key] ? `<button type="button" data-ug-style="${esc(g.key)}">Generate ${esc((g.cta || st.label || g.key).toLowerCase())} usernames <span>↑</span></button>` : '';
    return `<article><div class="ug-idea-head"><span class="ug-idea-icon">${esc(g.icon || st.icon || '✦')}</span><h3>${esc(g.title)}</h3></div><p>${md(g.blurb)}</p><ul class="ug-examples">${g.examples.map(copyChip).join('')}</ul>${shortcut}</article>`;
  }).join('\n          ');

  const figureHtml = p.figure?.src
    ? `<figure class="ug-figure"><img src="${esc(p.figure.src)}" width="${p.figure.width || 1200}" height="${p.figure.height || 630}" loading="lazy" decoding="async" alt="${esc(p.figure.alt)}">${p.figure.caption ? `<figcaption>${esc(p.figure.caption)}</figcaption>` : ''}</figure>`
    : '';

  const platforms = p.platforms;
  const platformHtml = platforms.cards.map((c) =>
    `<article><span class="ug-idea-icon">${esc(c.icon || '◎')}</span><h3>${esc(c.title)}</h3><p>${md(c.text)}</p><code>${esc(c.examples.join(' · '))}</code><div class="ug-platform-foot">${c.preset ? `<button type="button" data-ug-preset='${attr(c.preset)}'>${esc(c.button || 'Generate ↑')}</button>` : ''}${c.link ? `<a href="${c.link[1]}">${esc(c.link[0])} →</a>` : ''}</div></article>`).join('\n          ');

  const formulas = p.formulas;
  const formulaHtml = formulas.rows.map(([name, how, examples]) =>
    `<div class="ug-formula"><strong>${esc(name)}</strong><span>${md(how)}</span><ul class="ug-examples">${examples.map(copyChip).join('')}</ul></div>`).join('\n          ');

  const symbols = p.symbols;
  const symbolsHtml = symbols
    ? `
    <section class="font-section" id="symbols">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">${esc(symbols.eyebrow || 'Copy a symbol')}</span>
          <h2>${esc(symbols.title)}</h2>
          <p>${md(symbols.intro)}</p>
        </div>
        <div class="ug-symbols" aria-label="Symbols">
          ${symbols.items.map(([s, a]) => `<button type="button" data-ug-copy="${esc(s)}" aria-label="Copy ${esc(a)}">${esc(s)}</button>`).join('\n          ')}
        </div>
        ${symbols.combos?.length ? `<div class="ug-symbols ug-symbol-combos" aria-label="Symbol combinations">${symbols.combos.map((s) => `<button type="button" data-ug-copy="${esc(s)}">${esc(s)}</button>`).join('')}</div>` : ''}
        <p class="ug-symbols-note">${md(symbols.note)}</p>
      </div>
    </section>` : '';

  // ---- vocabulary section: built from the page's own word lists, so it differs on every page
  const platformName = p.platformName || label || 'the platform';
  const vocab = p.vocab === false ? null : (p.vocab || {});
  const per = vocab ? Math.max(3, Math.min(8, vocab.per || 5)) : 0;
  const uniq = (a) => [...new Set((a || []).map((w) => String(w).trim()).filter(Boolean))];
  const totals = styleKeys.reduce((t, k) => {
    const st = p.styles[k];
    t.adj += uniq(st.adjectives).length; t.noun += uniq(st.nouns).length; t.suf += uniq(st.suffixes).length; return t;
  }, { adj: 0, noun: 0, suf: 0 });
  const sharedPre = uniq(p.common?.prefixes), sharedSuf = uniq(p.common?.suffixes);
  const vocabTotal = totals.adj + totals.noun + totals.suf + sharedPre.length + sharedSuf.length;
  const firstStyle = p.styles[styleKeys[0]]?.label || '', lastStyle = p.styles[styleKeys[styleKeys.length - 1]]?.label || '';
  const an = (w) => (/^[aeiou]/i.test(w) ? 'an' : 'a') + ' ' + w;
  // "a cute username" but "a TikTok username": only generic adjectives lose their capital
  const GENERIC_LABELS = new Set(['cool', 'cute', 'emo', 'fantasy', 'gaming', 'rare', 'short', 'summoner', 'email', 'nickname']);
  const lc = label ? (GENERIC_LABELS.has(label.toLowerCase()) ? label.toLowerCase() : label) + ' ' : '';
  const vocabTitle = vocab?.title || `${appName} Vocabulary`;
  const vocabIntro = vocab?.intro || `Every ${lc}username on this page is assembled from **${vocabTotal} hand-picked words** — ${totals.adj} adjectives, ${totals.noun} nouns and ${totals.suf} style endings spread over ${styleKeys.length} styles, plus ${sharedPre.length} prefixes and ${sharedSuf.length} endings every style can borrow. The lists were written for this page, which is why ${an(firstStyle)} result never sounds like ${an(lastStyle)} one${p.maxLength ? `, and why nothing runs past ${platformName}'s ${p.maxLength}-character limit` : ''}.`;
  const vocabRows = styleKeys.map((k) => {
    const st = p.styles[k];
    const adj = uniq(st.adjectives), nouns = uniq(st.nouns), suf = uniq(st.suffixes), sym = uniq(st.symbols);
    const meta = `${adj.length} adjectives · ${nouns.length} nouns · ${suf.length} endings${sym.length ? ` · ${sym.slice(0, 4).join(' ')}` : ''}`;
    const sample = uniq([...adj.slice(0, per), ...nouns.slice(0, per), ...suf.slice(0, Math.max(2, per - 2))]);
    return `<div class="ug-formula ug-vocab-row"><strong>${st.icon ? `<i aria-hidden="true">${esc(st.icon)}</i> ` : ''}${esc(st.label)}</strong><span>${esc(meta)}</span><ul class="ug-examples" aria-label="${esc(st.label)} sample words">${sample.map(copyChip).join('')}</ul></div>`;
  }).join('\n          ');
  const vocabNote = vocab?.note || `Shared prefixes: ${sharedPre.slice(0, 8).join(', ')}${sharedPre.length > 8 ? '…' : ''}. Shared endings: ${sharedSuf.slice(0, 8).join(', ')}${sharedSuf.length > 8 ? '…' : ''}. Click any word to copy it and build your own ${lc}username by hand.`;
  const vocabHtml = vocab ? `
    <section class="font-section" id="vocabulary">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">${esc(vocab.eyebrow || 'What you will get')}</span>
          <h2>${esc(vocabTitle)}</h2>
          <p>${md(vocabIntro)}</p>
        </div>
        <div class="ug-formulas ug-vocab">
          ${vocabRows}
        </div>
        <p class="ug-formula-note">${md(vocabNote)}</p>
      </div>
    </section>` : '';

  // ---- UI copy phrased around this page's platform, not one sentence shared by every page
  const availability = p.availabilityNote || (p.maxLength
    ? `Availability changes by the minute and this page never contacts ${platformName}. Copy a ${lc}name you like, keep it inside the ${p.maxLength}-character limit, and check it in ${platformName}'s own name field before you settle on it.`
    : `Nothing here talks to ${platformName}, so a ${lc}username that looks free may already be taken. Copy the ones you like and test them in ${platformName}'s username field — the rejection there is instant, and this list refreshes as often as you press Generate.`);
  const favEmpty = p.favEmpty || `Heart a ${lc}username and it lands here. Favorites live in this browser only — nothing is uploaded.`;
  const emptyMsg = p.emptyMessage || `No ${lc}usernames fit this filter yet — press Generate More, or switch to a different filter.`;

  const guide = p.guide;
  const guideHtml = `<h2>${esc(guide.title)}</h2>${(guide.intro ? [guide.intro] : []).map((t) => `<p>${md(t)}</p>`).join('')}${guide.bullets?.length ? `<ul>${guide.bullets.map(([s, t]) => `<li><strong>${esc(s)}</strong> ${md(t)}</li>`).join('')}</ul>` : ''}${(guide.outro || []).map((t) => `<p>${md(t)}</p>`).join('')}`;
  const uniqueHtml = p.uniqueH2 ? `<h2>${esc(p.uniqueH2)}</h2>${(Array.isArray(p.uniqueBody) ? p.uniqueBody : [p.uniqueBody]).map((t) => `<p>${md(t)}</p>`).join('')}` : '';
  const sourceHtml = p.source ? `<p class="ug-source">${esc(p.source.before || '')}<a href="${esc(p.source.href)}" target="_blank" rel="noopener">${esc(p.source.name)}</a>${esc(p.source.after || '')}</p>` : '';

  const faqHtml = p.faqs.map(([q, a]) => `<div class="faq-item"><h3>${esc(q)}</h3><p>${md(a)}</p></div>`).join('\n            ');
  const faqJson = p.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: plain(a) } }));

  const asideLinks = (p.asideLinks || p.links.map(([n, h]) => [n, h])).map(([n, h]) => `<a href="${h}">${esc(n)}</a>`).join('\n            ');
  const related = p.related || { title: 'More Username Generators', intro: 'Every page below runs on the same engine with its own vocabulary.' };
  const cardsHtml = p.links.map(([name, href, note, icon]) =>
    `<a class="tool-card" href="${href}"><span>${esc(icon || '✦')}</span><strong>${esc(name)}</strong><em>${esc(note)}</em></a>`).join('\n          ');

  const footerCols = (p.footer || [
    ['Username Generators', [['Username Generator', '/username-generator.html'], ['Aesthetic Usernames', '/aesthetic-username-generator.html'], ['Cute Usernames', '/cute-username-generator.html'], ['Cool Usernames', '/cool-username-generator.html'], ['Instagram Usernames', '/instagram-username-generator.html'], ['Gaming Usernames', '/gaming-username-generator.html']]],
    ['Cursive Tools', [['Cursive Generator', '/'], ['Font Generator', '/cursive-font-generator.html'], ['Name Generator', '/cursive-name-generator.html'], ['Fancy Text', '/fancy-text-generator.html']]],
  ]).map(([t, items]) => `<div class="footer-col"><strong class="footer-col-title">${esc(t)}</strong>${items.map(([n, h]) => `<a href="${h}">${esc(n)}</a>`).join('')}</div>`).join('\n      ');

  const engineCfg = { root: '#ug', storageKey, batchSize: p.batchSize || 24, maxResults: p.maxResults || 120, ...(p.maxLength ? { maxLength: p.maxLength } : {}), common: p.common, styles: Object.fromEntries(styleKeys.map((k) => { const { icon, ...rest } = p.styles[k]; return [k, rest]; })) };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-L34V5ZL59H"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-L34V5ZL59H');
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6697313643773879" crossorigin="anonymous"></script>
  <script>
    window.addEventListener('load',function(){setTimeout(function(){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xtizgdek92");},3000);});
  </script>

  <title>${esc(p.title)}</title>
  <meta name="description" content="${esc(p.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(p.title)}">
  <meta property="og:description" content="${esc(p.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${ogImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(p.title)}">
  <meta name="twitter:description" content="${esc(p.description)}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <link rel="preload" href="/assets/styles.css?v=20260913" as="style">
  <link rel="stylesheet" href="/assets/styles.css?v=20260913">
  <link rel="stylesheet" href="/assets/username-cluster.css?v=20260919">

  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebApplication', name: appName, url, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', browserRequirements: 'Requires JavaScript for generation', isAccessibleForFree: true, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, description: p.description })}</script>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${domain}/` }, { '@type': 'ListItem', position: 2, name: crumb[0], item: `${domain}${crumb[1]}` }, { '@type': 'ListItem', position: 3, name: appName, item: url }] })}</script>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqJson })}</script>
</head>
<body>
  <header class="site-header"></header>
  <nav class="nav-mobile-drawer" id="nav-drawer" aria-label="Mobile navigation"></nav>

  <main class="page">

    <section class="tool-section" id="tool">
      <div class="wrap">
        <nav aria-label="Breadcrumb" style="font-size:13px;color:var(--muted);margin-bottom:14px">
          <a href="/" style="color:var(--muted)">Home</a>
          <span style="margin:0 6px">&rsaquo;</span>
          <a href="${crumb[1]}" style="color:var(--muted)">${esc(crumb[0])}</a>
          <span style="margin:0 6px">&rsaquo;</span>
          <span>${esc(appName)}</span>
        </nav>

        <div class="tool-intro">
          <div>
            <span class="eyebrow">${esc(p.kicker)}</span>
            <h1>${esc(p.h1)}</h1>
            <p class="ug-intro-sub">${esc(p.sub)}</p>
            <p>${md(p.intro)}</p>
            <ul class="ug-perks">${perks}</ul>
          </div>
        </div>

        <div class="ug-shell" id="ug" aria-label="${esc(appName)}">
          <form class="ug-controls" data-ug-form autocomplete="off">
            <div class="ug-input-row">
              <div>
                <label class="ug-label" for="ug-word">${esc(p.inputLabel || 'Enter a name or word')} <small>optional — leave blank for random ideas</small></label>
                <input class="ug-word" id="ug-word" type="text" data-ug-word placeholder="${esc(p.placeholder || 'luna, emma, moon, angel, cherry…')}" maxlength="16" spellcheck="false" aria-describedby="ug-word-hint">
                <span id="ug-word-hint" hidden>Letters and numbers only. Up to 16 characters.</span>
              </div>
              <button class="ug-generate" type="submit"><span aria-hidden="true">✦</span> ${esc(p.button || 'Generate usernames')}</button>
            </div>

            <fieldset class="ug-fs ug-styles">
              <legend>${esc(p.stylesLegend || 'Choose a style')}</legend>
              <div class="ug-chips">
                ${styleChips}
              </div>
            </fieldset>

            <details class="ug-customize">
              <summary>Customize <small>length, numbers, symbols, separator, letter style</small></summary>
              <div class="ug-options">
                ${optionHtml}
              </div>
            </details>
          </form>

          <div class="ug-results">
            <div class="ug-results-top">
              <div>
                <div class="ug-eyebrow-small">Your ideas</div>
                <h2>${esc(p.resultsTitle || `${label} username ideas`)}</h2>
                <p class="ug-status" data-ug-status aria-live="polite">${p.sampleWord ? `Sample ideas for “${esc(p.sampleWord)}”` : 'Sample ideas with no word'} · ${defaults.style === 'all' ? 'All styles' : esc(p.styles[defaults.style].label)} — ${p.sampleWord ? 'type your own word and generate' : 'generate for a fresh batch, or type a word'}.</p>
              </div>
              <span class="ug-count" data-ug-count>${samples.length} usernames</span>
            </div>

            <div class="ug-toolbar">
              <ul class="ug-filters" aria-label="Filter results">
                ${filterHtml}
              </ul>
              <div class="ug-batch-actions">
                <button type="button" class="ug-btn" data-ug-copy-all>Copy All Usernames</button>
                <button type="button" class="ug-btn primary" data-ug-more>Generate More</button>
                <button type="button" class="ug-btn" data-ug-clear>Clear</button>
              </div>
            </div>

            <ul class="ug-grid" data-ug-results aria-label="Generated usernames">
              ${cardHtml}
            </ul>
            <p class="ug-empty" data-ug-empty hidden>${esc(emptyMsg)}</p>
            <div class="ug-foot"><span>Copy one, heart the ones you like, or copy the whole list.</span><span>Generate More adds another batch of unique ideas without reloading.</span></div>

            <div class="ug-availability"><span aria-hidden="true">ⓘ</span><p>${md(availability)}</p></div>

            <div class="ug-cta">
              <div>
                <strong>${esc(cta.title)}</strong>
                <p>${md(cta.text)}</p>
              </div>
              <div class="ug-cta-links">${ctaHtml}</div>
            </div>
            <noscript><p class="ug-noscript">Enable JavaScript to generate new batches, copy and save favorites. You can still select and copy the sample usernames above.</p></noscript>
          </div>

          <div class="ug-favorites" id="favorites">
            <div class="ug-fav-head">
              <h3>My Favorites <span data-ug-fav-count></span></h3>
              <div class="ug-batch-actions">
                <button type="button" class="ug-btn" data-ug-fav-action="copy" disabled>Copy favorites</button>
                <button type="button" class="ug-btn" data-ug-fav-action="clear" disabled>Clear favorites</button>
              </div>
            </div>
            <p class="ug-fav-empty" data-ug-favs-empty>${esc(favEmpty)}</p>
            <ul class="ug-fav-list" data-ug-favs aria-label="Favorite usernames"></ul>
          </div>
        </div>
      </div>
    </section>

    <section class="font-section" id="how-to-use">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">${esc(howTo.eyebrow || 'Three steps')}</span>
          <h2>${esc(howTo.title)}</h2>
        </div>
        <div class="ug-steps">
          <div class="ug-steps-lead">
            ${howTo.lead.map((t) => `<p>${md(t)}</p>`).join('\n            ')}
          </div>
          <ol>
            ${stepsHtml}
          </ol>
        </div>
      </div>
    </section>

    <section class="style-showcase" id="ideas">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">${esc(ideas.eyebrow || 'Browse by vibe')}</span>
          <h2>${esc(ideas.title)}</h2>
          <p>${md(ideas.intro)}</p>
        </div>
        <div class="ug-idea-grid">
          ${ideaHtml}
        </div>
        ${figureHtml}
      </div>
    </section>

    <section class="font-section" id="platforms">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">${esc(platforms.eyebrow || 'Where will you use it?')}</span>
          <h2>${esc(platforms.title)}</h2>
          <p>${md(platforms.intro)}</p>
        </div>
        <div class="ug-platform-grid">
          ${platformHtml}
        </div>
      </div>
    </section>

    <section class="style-showcase" id="formulas">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">${esc(formulas.eyebrow || 'Do it by hand')}</span>
          <h2>${esc(formulas.title)}</h2>
          <p>${md(formulas.intro)}</p>
        </div>
        <div class="ug-formulas">
          ${formulaHtml}
        </div>
        <p class="ug-formula-note">${md(formulas.note)}</p>
      </div>
    </section>
${vocabHtml}${symbolsHtml}
    <section class="seo-section" id="guide">
      <div class="wrap seo-layout">
        <aside class="seo-aside">
          <h2>Related tools</h2>
          <div class="keyword-list">
            ${asideLinks}
          </div>
        </aside>
        <article class="seo-copy">
          ${guideHtml}
          ${uniqueHtml}
          ${sourceHtml}

          <h2>${esc(p.faqTitle || 'Frequently Asked Questions')}</h2>
          <div class="faq-list">
            ${faqHtml}
          </div>
        </article>
      </div>
    </section>

    <section class="related-tools">
      <div class="wrap">
        <div class="section-heading">
          <span class="eyebrow">Keep going</span>
          <h2>${esc(related.title)}</h2>
          <p>${md(related.intro)}</p>
        </div>
        <div class="tool-grid">
          ${cardsHtml}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-body">
      ${footerCols}
    </div>
    <div class="footer-inner">
      <span>Cursive Text Generator</span>
      <span class="footer-links">
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact</a>
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/terms.html">Terms</a>
        <a href="/sitemap.html">Sitemap</a>
        <a href="/more-tools.html">More Tools</a>
      </span>
    </div>
  </footer>

  <div class="toast" data-toast role="status" aria-live="polite"></div>

  <script src="/assets/username-generator.js?v=20260916"></script>
  <script>
  /* Page config: vocabulary for this page. The engine is shared; only the words change. */
  var USERNAME_CONFIG = ${JSON.stringify(engineCfg)};
  if (window.UsernameGenerator) UsernameGenerator.mount(USERNAME_CONFIG);
  </script>
  <script src="/assets/navigation.js?v=20260919" defer></script>
</body>
</html>
`;
}
