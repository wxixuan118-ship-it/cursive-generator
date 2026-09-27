import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const slugs = [
  'cursive-signature-styles',
  'cursive-text-instagram',
  'cursive-text-shows-boxes',
  'unicode-cursive-vs-cursive-fonts',
];
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z0-9#]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const count = (s, re) => (s.match(re) || []).length;
const one = (s, re) => (s.match(re) || [])[1] || '';

let failed = false;
for (const slug of slugs) {
  const file = path.join(root, 'blog', slug, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const main = one(html, /<div class="post-body">([\s\S]*?)<section class="post-faq"/);
  const title = strip(one(html, /<title>([\s\S]*?)<\/title>/));
  const description = one(html, /<meta name="description" content="([^"]+)">/);
  const internal = [...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);
  const broken = [...new Set(internal)].filter((href) => {
    const rel = href.replace(/^\//, '').replace(/[?#].*$/, '');
    const candidates = rel.endsWith('/') ? [path.join(root, rel, 'index.html')] : [path.join(root, rel), path.join(root, `${rel}.html`)];
    return !candidates.some((candidate) => fs.existsSync(candidate));
  });
  const checks = [
    ['2,500+ article words', strip(main).split(/\s+/).filter(Boolean).length >= 2500, 20],
    ['title length 30–60', title.length >= 30 && title.length <= 60, 8],
    ['description length 120–160', description.length >= 120 && description.length <= 160, 8],
    ['one H1', count(html, /<h1[ >]/g) === 1, 5],
    ['six or more H2s', count(main, /<h2[ >]/g) >= 6, 5],
    ['canonical URL', count(html, /<link rel="canonical"/g) === 1, 5],
    ['indexable robots', /name="robots" content="index,follow/.test(html), 4],
    ['Open Graph metadata', /property="og:title"/.test(html) && /property="og:image"/.test(html), 4],
    ['Twitter card', /name="twitter:card"/.test(html), 3],
    ['BlogPosting schema', /"@type":"BlogPosting"/.test(html), 5],
    ['Breadcrumb schema', /"@type":"BreadcrumbList"/.test(html), 4],
    ['FAQ schema and visible FAQ', /"@type":"FAQPage"/.test(html) && /class="post-faq"/.test(html), 5],
    ['visible author and updated date', /By <b>Cursive Text Generator<\/b>/.test(html) && /article:modified_time/.test(html), 4],
    ['table of contents', /class="post-toc"/.test(html), 5],
    ['descriptive image alt', /<img[^>]+alt="[^"]{20,}"/.test(html), 4],
    ['eight or more internal links', new Set(internal).size >= 8, 6],
    ['no empty links', !/href="\s*"/.test(html), 2],
    ['responsive viewport', /name="viewport"/.test(html), 2],
    ['no broken internal links', broken.length === 0, 1],
  ];
  const score = checks.reduce((sum, [, pass, weight]) => sum + (pass ? weight : 0), 0);
  const wordCount = strip(main).split(/\s+/).filter(Boolean).length;
  console.log(`${slug}: ${score}/100, ${wordCount} words, ${new Set(internal).size} internal links`);
  for (const [label, pass] of checks) if (!pass) console.log(`  FAIL ${label}`);
  if (broken.length) console.log(`  BROKEN ${broken.join(', ')}`);
  if (score < 95 || wordCount < 2500) failed = true;
}
if (failed) process.exitCode = 1;
