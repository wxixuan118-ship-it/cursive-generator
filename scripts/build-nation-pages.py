#!/usr/bin/env python3
"""Build the "<nation> in cursive" pages from scripts/nation-pages-content/*.py.

For every entry it writes:

  <slug>-in-cursive/index.html      the page
  <slug>-in-cursive.html            noindex redirect stub

and then rewrites the hub card grid, the sitemaps, the IndexNow URL list, and
mirrors every touched file into public/. Layout comes from
scripts/nation-page-layout.html.

Run from the repo root:  python3 scripts/build-nation-pages.py
"""

import glob
import html
import importlib.util
import json
import os
import re
import shutil
import sys
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://www.cursive-text-generator.net"
LAYOUT = os.path.join(ROOT, "scripts", "nation-page-layout.html")
CONTENT_DIR = os.path.join(ROOT, "scripts", "nation-pages-content")
TODAY = date.today().isoformat()

GROUPS = [
    ("americas", "The Americas", "Country names from North, Central, and South America."),
    ("europe", "Europe", "European country names, including the ones that gave cursive its history."),
    ("asia", "Asia and the Pacific", "Country names from Asia, the Middle East, and Oceania."),
    ("africa", "Africa", "Country names from the African continent."),
    ("languages", "Languages and Nationalities", "The word itself in Latin cursive, plus how that language's own script handles cursive writing."),
]


def load_pages():
    pages = []
    for path in sorted(glob.glob(os.path.join(CONTENT_DIR, "*.py"))):
        spec = importlib.util.spec_from_file_location(os.path.basename(path)[:-3], path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        pages.extend(mod.PAGES)
    slugs = [p["slug"] for p in pages]
    dupes = {s for s in slugs if slugs.count(s) > 1}
    if dupes:
        sys.exit(f"duplicate slugs: {sorted(dupes)}")
    return pages


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def mirror(rel):
    src = os.path.join(ROOT, rel)
    dst = os.path.join(ROOT, "public", rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copyfile(src, dst)


def slice_between(text, start, end, include_start=True):
    i = text.index(start)
    j = text.index(end, i)
    return text[i if include_start else i + len(start):j]


def load_layout():
    t = read(LAYOUT)
    parts = re.split(r"<!-- @@(STYLE|HEADER|FOOTER) -->\n", t)
    # parts: [preamble, "STYLE", style, "HEADER", header, "FOOTER", footer]
    d = {parts[i]: parts[i + 1].rstrip("\n") for i in range(1, len(parts) - 1, 2)}
    return dict(style=d["STYLE"], header=d["HEADER"], footer=d["FOOTER"])


def name_of(slug):
    return PAGE_BY_SLUG[slug]["name"]


def link(slug, lower=True):
    n = name_of(slug)
    label = f"{n} in cursive" if lower else f"{n} in Cursive"
    return f'<a href="/{slug}-in-cursive/">{label}</a>'


def render_page(p, layout):
    slug = p["slug"]
    name = p["name"]
    url = f"{SITE}/{slug}-in-cursive/"
    title = f"{name} in Cursive – Copy & Paste Cursive Text"
    desc = p["description"]
    is_lang = p["group"] == "languages"

    faq_ld = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in p["faq"]
        ],
    }
    app_ld = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": f"{name} in Cursive Generator",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Any",
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
        "url": url,
        "description": desc,
    }
    crumb_ld = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{SITE}/"},
            {"@type": "ListItem", "position": 2, "name": "Nation in Cursive", "item": f"{SITE}/nation-in-cursive/"},
            {"@type": "ListItem", "position": 3, "name": f"{name} in Cursive", "item": url},
        ],
    }

    def ld(obj):
        return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False, separators=(",", ":")) + "</script>"

    e = html.escape
    head = f"""<!doctype html><html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{e(title)}</title>
  <meta name="description" content="{e(desc, quote=True)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="{url}">
  <meta property="og:type" content="website"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc, quote=True)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{SITE}/assets/cursive-generator-hero.png">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{e(title)}"><meta name="twitter:description" content="{e(desc, quote=True)}">
  <link rel="icon" href="/favicon.ico" sizes="any"><link rel="stylesheet" href="/assets/styles.css?v=20260904-nations">
  {ld(app_ld)}
  {ld(crumb_ld)}
  {ld(faq_ld)}
  {layout['style']}
</head><body>"""

    aside_title = "Related pages" if is_lang else "Other nations"
    aside_links = "".join(link(s) for s in p["related"]) + '<a href="/nation-in-cursive/">All nations</a><a href="/">Cursive text generator</a>'

    faq_html = "".join(f"<h3>{e(q)}</h3><p>{e(a)}</p>" for q, a in p["faq"])
    phrases = "".join(f"<li>{e(x)}</li>" for x in p["phrases"])
    angle_h2, angle_body = p["angle"]
    uses_h2, uses_body = p["uses"]
    explore_h2 = "Explore More Languages and Nations" if is_lang else "Explore More Nation Names"

    body = f"""<main class="page"><section class="tool-section"><div class="wrap"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/nation-in-cursive/">Nation in Cursive</a> › <span>{e(name)} in Cursive</span></nav><div class="tool-intro"><div><h1>{e(name)} in Cursive</h1></div></div><div class="panel input-panel"><label for="nation-input">Enter text</label><textarea id="nation-input" data-nation-input maxlength="120">{e(name)}</textarea></div><div class="nation-styles"><div class="nation-style"><strong>Elegant Cursive</strong><span class="nation-output" data-style="script"></span><button class="nation-copy" type="button" data-copy-style="script">Copy</button></div><div class="nation-style"><strong>Bold Cursive</strong><span class="nation-output" data-style="bold"></span><button class="nation-copy" type="button" data-copy-style="bold">Copy</button></div><div class="nation-style"><strong>Decorative Script</strong><span class="nation-output" data-style="fraktur"></span><button class="nation-copy" type="button" data-copy-style="fraktur">Copy</button></div></div><p class="meta-note">Tip: preview copied text in the target app, since Unicode styling varies.</p></div></section><section class="seo-section"><div class="wrap seo-layout"><aside class="seo-aside"><h2>{aside_title}</h2><div class="keyword-list">{aside_links}</div></aside><article class="seo-copy"><p class="nation-lead">{p['intro']}</p><h2>How to Write {e(name)} in Cursive</h2>{''.join(p['howto'])}<h2>{e(angle_h2)}</h2>{''.join(angle_body)}<h2>{e(uses_h2)}</h2>{''.join(uses_body)}<h3>{e(name)} cursive phrase ideas</h3><ul>{phrases}</ul><h2>{e(name)} in Cursive FAQ</h2>{faq_html}<h2>{explore_h2}</h2>{p['explore']}</article></div></section></main>"""

    return head + layout["header"] + body + layout["footer"]


def render_stub(p):
    slug, name = p["slug"], p["name"]
    short = html.escape(f"Write {name} in cursive with free copy-and-paste styles.", quote=True)
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0;url=/{slug}-in-cursive/">
  <script>location.replace('/{slug}-in-cursive/');</script>
  <title>{html.escape(name)} in Cursive</title>
  <meta name="description" content="{short}">
  <meta name="robots" content="noindex,follow">
  <link rel="canonical" href="{SITE}/{slug}-in-cursive/">
  <link rel="icon" href="/favicon.ico" sizes="any">
</head>
<body>
  <p>This page has moved to <a href="/{slug}-in-cursive/">{html.escape(name)} in Cursive</a>.</p>
</body>
</html>
"""


def update_hub(pages):
    rel = "nation-in-cursive/index.html"
    path = os.path.join(ROOT, rel)
    t = read(path)
    entries = {p["slug"]: dict(name=p["name"], group=p["group"], card=p["card"]) for p in pages}

    sections = []
    for key, title, blurb in GROUPS:
        items = sorted((s for s, v in entries.items() if v["group"] == key), key=lambda s: entries[s]["name"])
        if not items:
            continue
        cards = "".join(
            f'<article class="nation-card"><h3>{html.escape(entries[s]["name"])} in Cursive</h3><p>{html.escape(entries[s]["card"])}</p><a href="/{s}-in-cursive/">Open {html.escape(entries[s]["name"])} generator →</a></article>'
            for s in items
        )
        sections.append(f'<h2 class="nation-group-title">{title}</h2><p class="nation-group-blurb">{blurb}</p><div class="nation-grid">{cards}</div>')
    grid_html = "".join(sections)

    # Replace everything from the first group title (or, on a hub that has
    # never been grouped, the first card grid) to the close of the tool
    # section's .wrap, so re-running the build is idempotent.
    start = t.find('<h2 class="nation-group-title">')
    if start < 0:
        start = t.index('<div class="nation-grid">')
    end = t.index("</div></section>", start)
    t = t[:start] + grid_html + t[end:]

    count = len(entries)
    t = t.replace(
        "<p>Choose a nation to generate its name in elegant, bold, and decorative cursive styles. Each result is free to copy and paste.</p>",
        f"<p>Choose one of {count} country, language, and nationality names to generate it in elegant, bold, and decorative cursive styles. Each page also explains how to handwrite that particular word, letter by letter. Every result is free to copy and paste.</p>",
    )
    if ".nation-group-title" not in t:
        t = t.replace("</style>", ".nation-group-title{margin:28px 0 4px}.nation-group-blurb{margin:0 0 14px;color:var(--muted)}</style>", 1)
    write(path, t)
    mirror(rel)


def update_sitemap(pages):
    for rel in ("sitemap.xml",):
        path = os.path.join(ROOT, rel)
        t = read(path)
        anchor = f"    <loc>{SITE}/ireland-in-cursive/</loc>\n"
        i = t.index(anchor)
        j = t.index("</url>", i) + len("</url>\n")
        new = "".join(
            f"  <url>\n    <loc>{SITE}/{p['slug']}-in-cursive/</loc>\n    <lastmod>{TODAY}</lastmod>\n  </url>\n"
            for p in pages
            if f"/{p['slug']}-in-cursive/</loc>" not in t
        )
        t = t[:j] + new + t[j:]
        t = re.sub(
            rf"(<loc>{re.escape(SITE)}/nation-in-cursive/</loc>\n    <lastmod>)[^<]+",
            rf"\g<1>{TODAY}",
            t,
        )
        write(path, t)
        mirror(rel)


def update_indexnow(pages):
    rel = "indexnow-urls.txt"
    path = os.path.join(ROOT, rel)
    lines = read(path).splitlines()
    anchor = f"{SITE}/ireland-in-cursive/"
    i = lines.index(anchor) + 1
    new = [f"{SITE}/{p['slug']}-in-cursive/" for p in pages if f"{SITE}/{p['slug']}-in-cursive/" not in lines]
    lines[i:i] = new
    write(path, "\n".join(lines) + "\n")
    mirror(rel)


def update_html_sitemap(pages):
    """sitemap.html carries a <li> list of nation pages; extend it after Ireland."""
    rel = "sitemap.html"
    path = os.path.join(ROOT, rel)
    t = read(path)
    anchor = '<li><a href="/ireland-in-cursive/">Ireland in Cursive</a></li>\n'
    i = t.index(anchor) + len(anchor)
    indent = re.search(r"([ \t]*)" + re.escape(anchor.strip()), t).group(1)
    new = "".join(
        f'{indent}<li><a href="/{p["slug"]}-in-cursive/">{html.escape(p["name"])} in Cursive</a></li>\n'
        for p in pages
        if f'href="/{p["slug"]}-in-cursive/"' not in t
    )
    write(path, t[:i] + new + t[i:])
    mirror(rel)


def main():
    global PAGE_BY_SLUG
    pages = load_pages()
    PAGE_BY_SLUG = {p["slug"]: p for p in pages}
    known = set(PAGE_BY_SLUG)
    for p in pages:
        bad = [s for s in p["related"] if s not in known]
        if bad:
            sys.exit(f"{p['slug']}: unknown related slugs {bad}")
        for m in re.findall(r'href="/([a-z-]+)-in-cursive/"', "".join(p["howto"]) + "".join(p["angle"][1]) + "".join(p["uses"][1]) + p["explore"]):
            if m not in known and m != "nation":
                sys.exit(f"{p['slug']}: body links to unknown page {m}")

    layout = load_layout()
    for p in pages:
        page_rel = f"{p['slug']}-in-cursive/index.html"
        stub_rel = f"{p['slug']}-in-cursive.html"
        write(os.path.join(ROOT, page_rel), render_page(p, layout))
        write(os.path.join(ROOT, stub_rel), render_stub(p))
        mirror(page_rel)
        mirror(stub_rel)

    update_hub(pages)
    update_sitemap(pages)
    update_indexnow(pages)
    update_html_sitemap(pages)
    print(f"built {len(pages)} pages")


if __name__ == "__main__":
    main()
