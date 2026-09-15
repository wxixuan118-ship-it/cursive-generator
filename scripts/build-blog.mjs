// Render the blog from scripts/blog/posts/*.json + *.html into blog/<slug>/index.html
// and the /blog/ hub, then keep sitemap.xml, sitemap.html, indexnow-urls.txt and the
// blog list in assets/navigation.js in sync. Everything is mirrored to public/.
//
// Publishing cadence: a post whose `date` is in the future is skipped (not rendered,
// not listed), so all posts for the week can sit in the repo while the site releases
// one per day — run this script and push each day. `--all` renders everything
// regardless of date; `--date YYYY-MM-DD` pretends today is that date.
//
//   node scripts/build-blog.mjs
//   node scripts/build-blog.mjs --all
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const SITE = 'https://www.cursive-text-generator.net';
const POSTS_DIR = path.join(root, 'scripts/blog/posts');
const NAV_VERSION = (fs.readFileSync(path.join(root, 'index.html'), 'utf8').match(/navigation\.js\?v=([0-9a-z]+)/) || [, '20260915'])[1];

const args = process.argv.slice(2);
const all = args.includes('--all');
const dateArg = args[args.indexOf('--date') + 1];
const today = args.includes('--date') ? dateArg : new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const ld = (o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`;
const write = (rel, content) => {
  for (const base of [root, path.join(root, 'public')]) {
    const file = path.join(base, rel);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  }
};

// ── load ──────────────────────────────────────────────────────────────────
const posts = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.json')).map((f) => {
  const meta = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
  meta.body = fs.readFileSync(path.join(POSTS_DIR, f.replace(/\.json$/, '.html')), 'utf8').trim();
  meta.url = `${SITE}/blog/${meta.slug}/`;
  meta.path = `/blog/${meta.slug}/`;
  for (const k of ['slug', 'title', 'seoTitle', 'description', 'excerpt', 'tag', 'date', 'readMinutes', 'lede', 'related', 'faq', 'navLabel']) {
    if (meta[k] === undefined) throw new Error(`${f}: missing "${k}"`);
  }
  if (meta.faq.length < 3) throw new Error(`${f}: needs at least 3 FAQ entries`);
  if (meta.seoTitle.length > 70) console.warn(`${f}: seoTitle is ${meta.seoTitle.length} chars`);
  if (meta.description.length < 120 || meta.description.length > 160) console.warn(`${f}: description is ${meta.description.length} chars`);
  return meta;
}).sort((a, b) => a.date.localeCompare(b.date) || (a.order || 0) - (b.order || 0) || a.slug.localeCompare(b.slug));

const live = posts.filter((p) => all || p.date <= today);
const held = posts.filter((p) => !live.includes(p));

// ── shared chrome ────────────────────────────────────────────────────────
const head = (p) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-L34V5ZL59H"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-L34V5ZL59H');</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6697313643773879" crossorigin="anonymous"></script>
  <script>window.addEventListener('load',function(){setTimeout(function(){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xtizgdek92");},2000);});</script>
  <title>${esc(p.seoTitle)} | Cursive Text Generator</title>
  <meta name="description" content="${esc(p.description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${p.url}">
  <meta property="og:title" content="${esc(p.seoTitle)}">
  <meta property="og:description" content="${esc(p.excerpt)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${p.url}">
  <meta property="og:image" content="${SITE}/assets/cursive-generator-hero.png">
  <meta property="og:site_name" content="Cursive Text Generator">
  <meta name="twitter:card" content="summary_large_image">
  <meta property="article:published_time" content="${p.date}">
  <meta property="article:modified_time" content="${p.modified || p.date}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <link rel="preload" href="/assets/styles.css?v=20260913" as="style">
  <link rel="stylesheet" href="/assets/styles.css?v=20260913">
  <link rel="stylesheet" href="/assets/blog.css?v=20260913">
  ${ld({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
    { '@type': 'ListItem', position: 3, name: p.title, item: p.url }] })}
  ${ld({ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description, url: p.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': p.url }, datePublished: p.date, dateModified: p.modified || p.date, inLanguage: 'en',
    image: `${SITE}/assets/cursive-generator-hero.png`,
    author: { '@type': 'Organization', name: 'Cursive Text Generator', url: `${SITE}/about.html` },
    publisher: { '@type': 'Organization', name: 'Cursive Text Generator', url: `${SITE}/`, logo: { '@type': 'ImageObject', url: `${SITE}/assets/android-chrome-512x512.png` } },
    isPartOf: { '@type': 'Blog', name: 'Cursive Text Generator Blog', url: `${SITE}/blog/` } })}
  ${ld({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}
</head>`;

const chrome = (crumb) => `<body>
  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="/"><span class="brand-mark">C</span><span>Cursive Generator</span></a>
      <div class="nav-links">
        <a href="/">Generator</a>
        <a href="/cursive-fonts.html">Fonts</a>
        <a href="/cursive-name-generator.html">Names</a>
        <a href="/aesthetic-fonts.html">Styles</a>
        <a href="/super-bowl-2027-font-generator.html">Themes</a>
        <a href="/blog/" class="active" aria-current="page">Blog</a>
      </div>
      <button class="nav-burger" aria-label="Open menu" aria-expanded="false" onclick="toggleNav(this)"><span></span><span></span><span></span></button>
    </nav>
  </header>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="wrap">
      <ol class="breadcrumb-list">
        <li><a href="/">Home</a></li>
        ${crumb}
      </ol>
    </div>
  </nav>
  <nav class="nav-mobile-drawer" id="nav-drawer" aria-label="Mobile navigation">
    <div class="nav-mobile-section">
      <div class="nav-mobile-label">Explore</div>
      <a href="/">Generator</a>
        <a href="/cursive-fonts.html">Fonts</a>
        <a href="/cursive-name-generator.html">Names</a>
        <a href="/aesthetic-fonts.html">Styles</a>
        <a href="/super-bowl-2027-font-generator.html">Themes</a>
        <a href="/blog/" class="active" aria-current="page">Blog</a>
    </div></nav>
`;

const footer = `
  <footer class="site-footer">
    <div class="footer-inner">
      <span>Cursive Text Generator</span>
      <span class="footer-links">
        <a href="/about.html">About</a>
        <a href="/contact.html">Contact</a>
        <a href="/blog/">Blog</a>
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/terms.html">Terms</a>
        <a href="/canva-signature-logo-templates.html">Templates</a>
        <a href="/partners.html">Partners</a>
        <a href="/cursive-compatibility.html">Compatibility</a>
        <a href="/more-tools.html">More Tools</a>
      </span>
    </div>
  </footer>
  <script>
    function toggleNav(btn){
      var d=document.getElementById('nav-drawer');
      var open=d.classList.toggle('open');
      btn.classList.toggle('open',open);
      btn.setAttribute('aria-expanded',open);
      document.body.style.overflow=open?'hidden':'';
    }
  </script>
  <script src="/assets/navigation.js?v=${NAV_VERSION}" defer></script>
</body>
</html>
`;

// ── post ────────────────────────────────────────────────────────────────
const renderPost = (p, i) => {
  const prev = live[i - 1];
  const next = live[i + 1];
  const others = live.map((o) => `        <a href="${o.path}"${o === p ? ' aria-current="page"' : ''}>${escText(o.title)}</a>`).join('\n');
  return `${head(p)}
${chrome(`<li><a href="/blog/">Blog</a></li>
        <li aria-current="page">${escText(p.title)}</li>`)}
  <main class="page">
    <section class="post-section">
      <div class="wrap post-layout">
        <article class="post-article">
          <header class="post-header">
            <span class="eyebrow">${escText(p.tag)}</span>
            <h1>${escText(p.title)}</h1>
            <p class="post-lede">${p.lede}</p>
            <div class="post-meta">
              <span>By <b>Cursive Text Generator</b></span>
              <span>Published <time datetime="${p.date}">${p.date}</time></span>
              <span>${p.readMinutes} min read</span>
            </div>
          </header>

          <div class="post-body">
${p.body}

            <section class="post-faq" aria-labelledby="faq-heading">
              <h2 id="faq-heading">Frequently asked questions</h2>
${p.faq.map((f) => `      <details>
        <summary>${esc(f.q)}</summary>
        <p>${escText(f.a)}</p>
      </details>`).join('\n')}
            </section>

            <aside class="post-cta">
              <h2>${p.cta?.title || 'Try it yourself'}</h2>
              <p>${p.cta?.text || 'Type any text and copy it in cursive, bold script and dozens of other Unicode styles. Free, no sign-up.'}</p>
              <a class="btn" href="${p.cta?.href || '/'}">${p.cta?.label || 'Open the cursive text generator'}</a>
            </aside>
          </div>
      <nav class="post-nav" aria-label="More posts">
        ${prev ? `<a href="${prev.path}">&larr; ${escText(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a href="${next.path}">${escText(next.title)} &rarr;</a>` : '<span></span>'}
      </nav>
        </article>

        <aside class="post-aside">
          <div class="aside-card">
            <h2>Related tools</h2>
${p.related.map(([label, href]) => `        <a href="${href}">${escText(label)}</a>`).join('\n')}
          </div>
          <div class="aside-card">
            <h2>More from the blog</h2>
${others}
          </div>
        </aside>
      </div>
    </section>
  </main>
${footer}`;
};

// ── hub ─────────────────────────────────────────────────────────────────
const renderHub = () => {
  const newest = [...live].reverse();
  const cards = newest.map((p) => `        <li class="blog-card">
          <div class="blog-card-meta"><span class="blog-card-tag">${escText(p.tag)}</span><time datetime="${p.date}">${p.date}</time><span>${p.readMinutes} min read</span></div>
          <h2><a href="${p.path}">${escText(p.title)}</a></h2>
          <p>${escText(p.excerpt)}</p>
          <a class="blog-card-more" href="${p.path}" aria-label="Read: ${esc(p.title)}">Read the guide &rarr;</a>
        </li>`).join('\n');
  const hubPost = {
    seoTitle: 'Blog: Cursive Text Guides, Tips and Fixes',
    description: 'Practical guides on cursive text: how to use it on Instagram and Discord, Unicode cursive vs cursive fonts, fixing boxes and question marks, signatures and handwriting practice.',
    excerpt: 'Guides on using cursive text across apps, how Unicode cursive works, fixing display problems, signature styles and cursive handwriting practice.',
  };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-L34V5ZL59H"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-L34V5ZL59H');</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6697313643773879" crossorigin="anonymous"></script>
  <script>window.addEventListener('load',function(){setTimeout(function(){(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","xtizgdek92");},2000);});</script>
  <title>${hubPost.seoTitle} | Cursive Text Generator</title>
  <meta name="description" content="${hubPost.description}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${SITE}/blog/">
  <meta property="og:title" content="Cursive Text Generator Blog">
  <meta property="og:description" content="${hubPost.excerpt}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE}/blog/">
  <meta property="og:image" content="${SITE}/assets/cursive-generator-hero.png">
  <meta property="og:site_name" content="Cursive Text Generator">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
  <link rel="preload" href="/assets/styles.css?v=20260913" as="style">
  <link rel="stylesheet" href="/assets/styles.css?v=20260913">
  <link rel="stylesheet" href="/assets/blog.css?v=20260913">
  ${ld({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` }] })}
  ${ld({ '@context': 'https://schema.org', '@type': 'Blog', name: 'Cursive Text Generator Blog', url: `${SITE}/blog/`,
    description: 'Guides on cursive text, Unicode fonts, platform compatibility, signatures and handwriting practice from Cursive Text Generator.',
    publisher: { '@type': 'Organization', name: 'Cursive Text Generator', url: `${SITE}/` },
    blogPost: newest.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: p.url, datePublished: p.date })) })}
</head>
${chrome('<li aria-current="page">Blog</li>')}
  <main class="page">
    <section class="blog-hero">
      <div class="wrap">
        <span class="eyebrow">Blog</span>
        <h1>Cursive Text Guides, Tips and Fixes</h1>
        <p>Short, practical articles on how cursive text works, where it displays correctly, and how to get the most out of the generator. New guides are added every week.</p>
      </div>
    </section>

    <section class="blog-list">
      <div class="wrap">
        <ul class="blog-grid">
${cards}
        </ul>
      </div>
    </section>
  </main>
${footer}`;
};

// ── site registries ─────────────────────────────────────────────────────
const syncSitemapXml = () => {
  const file = path.join(root, 'sitemap.xml');
  let xml = fs.readFileSync(file, 'utf8');
  xml = xml.replace(/  <url>\n    <loc>https:\/\/www\.cursive-text-generator\.net\/blog\/[^<]*<\/loc>\n[\s\S]*?<\/url>\n/g, '');
  const newest = live.map((p) => p.modified || p.date).sort().pop() || today;
  const entry = (loc, lastmod) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>\n`;
  const block = entry(`${SITE}/blog/`, newest) + live.map((p) => entry(p.url, p.modified || p.date)).join('');
  xml = xml.replace('</urlset>', block + '</urlset>');
  write('sitemap.xml', xml);
};

const syncSitemapHtml = () => {
  const file = path.join(root, 'sitemap.html');
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/ *<li><a href="\/blog\/[^"]*">[^<]*<\/a><\/li>\n/g, '');
  const block = [`            <li><a href="/blog/">Blog</a></li>`, ...live.map((p) => `            <li><a href="${p.path}">${escText(p.navLabel)}</a></li>`)].join('\n') + '\n';
  html = html.replace(/( *<li><a href="\/terms\.html">[^<]*<\/a><\/li>\n)/, `$1${block}`);
  write('sitemap.html', html);
};

const syncIndexNow = () => {
  const file = path.join(root, 'indexnow-urls.txt');
  const lines = fs.readFileSync(file, 'utf8').split('\n').filter((l) => l && !l.startsWith(`${SITE}/blog/`));
  lines.push(`${SITE}/blog/`, ...live.map((p) => p.url));
  write('indexnow-urls.txt', lines.join('\n') + '\n');
};

const syncNav = () => {
  const file = path.join(root, 'assets/navigation.js');
  let js = fs.readFileSync(file, 'utf8');
  // Sub-nav and footer column list the newest five; the hub carries the rest.
  const recent = [...live].reverse().slice(0, 5);
  const list = [`      ["All Posts", "/blog/"]`, ...recent.map((p) => `      ["${p.navLabel.replace(/"/g, '\\"')}", "${p.path}"]`)].join(',\n');
  const next = js.replace(/    blog: \[\n[\s\S]*?\n    \],/, `    blog: [\n${list}\n    ],`);
  if (next === js) return;
  write('assets/navigation.js', next);
  // navigation.js is served immutable, so every page's ?v= must roll forward too.
  const version = today.replace(/-/g, '');
  const r = spawnSync('node', ['scripts/ensure-site-chrome.mjs', '--nav-version', version], { cwd: root, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(r.stderr || 'ensure-site-chrome failed');
  console.log(`navigation.js changed → cache-buster bumped to ${version} on ${(r.stdout.match(/(\d+) file\(s\) updated/) || [])[1]} pages`);
};

// ── run ─────────────────────────────────────────────────────────────────
live.forEach((p, i) => write(`blog/${p.slug}/index.html`, renderPost(p, i)));
write('blog/index.html', renderHub());
syncSitemapXml();
syncSitemapHtml();
syncIndexNow();
syncNav();

console.log(`rendered ${live.length} post(s) + hub (today = ${today})`);
for (const p of live) console.log(`  live  ${p.date}  ${p.path}  ${p.body.split(/\s+/).length} words`);
for (const p of held) console.log(`  held  ${p.date}  ${p.path}  (future — run on/after that date)`);
