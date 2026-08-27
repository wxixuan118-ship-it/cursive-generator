import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if ([".git", ".npm-cache", "node_modules", "extension"].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await htmlFiles(fullPath));
    else if (entry.name.endsWith(".html") && !entry.name.startsWith("yandex_")) files.push(fullPath);
  }
  return files;
}

function textContent(value) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&ndash;|&mdash;/g, "–")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function pageLabel(html, file) {
  const heading = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (heading) return textContent(heading);
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (title) return textContent(title).split(/\s+[–—|-]\s+/)[0];
  return path.basename(file, ".html").replace(/[-_]+/g, " ");
}

function escapeHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

let visibleAdded = 0;
let jsonLdAdded = 0;

for (const file of await htmlFiles(root)) {
  const relative = path.relative(root, file);
  if (relative === "index.html" || relative === path.join("public", "index.html")) continue;

  let html = await readFile(file, "utf8");
  if (!html.includes('class="site-header"')) continue;

  const label = pageLabel(html, file);
  let changed = false;

  if (!html.includes('aria-label="Breadcrumb"')) {
    const breadcrumb = `
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <div class="wrap">
      <ol class="breadcrumb-list">
        <li><a href="/">Home</a></li>
        <li aria-current="page">${escapeHtml(label)}</li>
      </ol>
    </div>
  </nav>`;
    html = html.replace(/<\/header>/i, `</header>${breadcrumb}`);
    visibleAdded += 1;
    changed = true;
  }

  if (!/"@type"\s*:\s*"BreadcrumbList"/.test(html)) {
    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1]
      ?? `https://www.cursive-text-generator.net/${relative.replace(/^public\//, "")}`;
    const jsonLd = `
  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cursive-text-generator.net/" },
      { "@type": "ListItem", position: 2, name: label, item: canonical }
    ]
  })}
  </script>`;
    html = html.replace(/<\/head>/i, `${jsonLd}\n</head>`);
    jsonLdAdded += 1;
    changed = true;
  }

  if (changed) await writeFile(file, html);
}

console.log(`Added ${visibleAdded} visible breadcrumbs and ${jsonLdAdded} BreadcrumbList blocks.`);
