#!/usr/bin/env python3
"""Build the "<nation> in cursive" pages from scripts/nation-pages-content/*.py.

For every entry it writes:

  <slug>-in-cursive/index.html      the page
  <slug>-in-cursive.html            noindex redirect stub

and then prunes retired slugs (retired.json), updates the sitemaps and the
IndexNow URL list, and mirrors every touched file into public/. The
/nation-in-cursive/ hub was removed 2026-09-19; the six kept pages hang off
cursive-letters-a-z.html instead. Layout comes from
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
HOOKS = os.path.join(CONTENT_DIR, "hooks.json")
RETIRED = os.path.join(CONTENT_DIR, "retired.json")  # slugs taken down (404); see the file's comment
CSS_VERSION = "20260913-nations"
TODAY = date.today().isoformat()

# Per-page illustration: the name (and one phrase) set in the site's own
# cursive font, so every page carries an image no other page has. Rendered
# with Pillow; the font joins on fixed baseline entry/exit points, so it needs
# no OpenType shaping. Requires Pillow (pip install pillow).
FONT_SCRIPT = os.path.join(ROOT, "assets", "fonts", "ctg-everly-script", "CTGEverlyScript.otf")
FONT_LABEL = "/System/Library/Fonts/Supplemental/Arial.ttf"
IMG_DIR = "assets/nations"
IMG_W, IMG_H = 1200, 630

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
    with open(RETIRED, encoding="utf-8") as f:
        retired = set(json.load(f)["slugs"])
    pages = [p for p in pages if p["slug"] not in retired]
    slugs = [p["slug"] for p in pages]
    with open(HOOKS, encoding="utf-8") as f:
        hooks = json.load(f)
    missing = [s for s in slugs if s not in hooks]
    if missing:
        sys.exit(f"hooks.json has no entry for {missing} — every page needs title/howto/uses/image hooks")
    kept = set(slugs) | {"nation"}
    dead = re.compile(r'<a href="/(?!(?:' + "|".join(re.escape(k) for k in kept if k != "nation") + r')-in-cursive/)[a-z-]+-in-cursive/">([^<]*)</a>')
    for p in pages:
        p["hooks"] = hooks[p["slug"]]
        p["related"] = [r for r in p["related"] if r in kept and r != "nation"]
        # links to retired pages (and the removed hub) become plain text
        p["explore"] = hooks[p["slug"]].get("explore") or dead.sub(r"\1", p["explore"])
        p["howto"] = [dead.sub(r"\1", x) for x in p["howto"]]
        p["angle"] = (p["angle"][0], [dead.sub(r"\1", x) for x in p["angle"][1]])
        p["uses"] = (p["uses"][0], [dead.sub(r"\1", x) for x in p["uses"][1]])
    return pages


def page_title(p):
    """<title>: name + this page's own hook, so no two pages share a title pattern."""
    t = f"{p['name']} in Cursive – {p['hooks']['title']}"
    return t + " | Copy & Paste" if len(t) <= 45 else t


def page_description(p):
    """Lead with the page's unique card sentence; fall back to the hand-written description if that runs long."""
    name = p["name"]
    card = p["card"]
    if p["group"] == "languages" and card.startswith("The word, plus"):
        card = f"{name} in cursive, plus" + card[len("The word, plus"):]
    kw = f"{name} in cursive"
    tails = [
        f" Free {kw} generator (elegant, bold, decorative) plus a letter-by-letter handwriting guide.",
        f" Free {kw} generator plus a handwriting guide.",
        f" Free {kw} generator.",
    ]
    for tail in tails:
        d = card + tail
        if len(d) <= 160:
            return d
    return p["description"]


def fit_font(draw, text, path, max_w, start, floor=48):
    from PIL import ImageFont
    size = start
    while size > floor:
        f = ImageFont.truetype(path, size)
        if draw.textlength(text, font=f) <= max_w:
            return f
        size -= 4
    return ImageFont.truetype(path, floor)


def render_image(p):
    """Draw assets/nations/<slug>-in-cursive.png and return (rel path, alt text)."""
    from PIL import Image, ImageDraw, ImageFont
    name, line2 = p["name"], p["hooks"]["image"]
    rel = f"{IMG_DIR}/{p['slug']}-in-cursive.png"
    img = Image.new("RGB", (IMG_W, IMG_H), "#fbfaf7")
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((16, 16, IMG_W - 16, IMG_H - 16), radius=20, fill="#ffffff", outline="#dfe6df", width=2)
    label = ImageFont.truetype(FONT_LABEL, 22)
    d.text((72, 64), f"{name.upper()} IN CURSIVE", font=label, fill="#2f6b4f")
    # baseline guide, then the word on it
    d.line((72, 300, IMG_W - 72, 300), fill="#e6ebe6", width=2)
    f1 = fit_font(d, name, FONT_SCRIPT, IMG_W - 144, 190)
    asc, desc = f1.getmetrics()
    d.text((72, 300 - asc), name, font=f1, fill="#17201b")
    if line2 and line2 != name:
        d.line((72, 480, IMG_W - 72, 480), fill="#e6ebe6", width=2)
        f2 = fit_font(d, line2, FONT_SCRIPT, IMG_W - 144, 110, floor=40)
        asc2, _ = f2.getmetrics()
        d.text((72, 480 - asc2), line2, font=f2, fill="#c96f59")
    d.text((72, IMG_H - 64), "Handwritten in CTG Everly Script", font=label, fill="#5d6a63")
    dom = "cursive-text-generator.net"
    d.text((IMG_W - 72 - d.textlength(dom, font=label), IMG_H - 64), dom, font=label, fill="#5d6a63")
    out = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out, optimize=True)
    mirror(rel)
    alt = f"{name} in cursive handwriting: the word {name} written in joined script" + (f", with the phrase {line2} underneath" if line2 and line2 != name else "")
    return rel, alt


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
    title = page_title(p)
    desc = page_description(p)
    is_lang = p["group"] == "languages"
    img_rel, img_alt = render_image(p)
    img_url = f"{SITE}/{img_rel}"

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
        "image": img_url,
    }
    image_ld = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "contentUrl": img_url,
        "url": img_url,
        "width": IMG_W,
        "height": IMG_H,
        "name": f"{name} in cursive",
        "description": img_alt,
        "caption": f"{name} in cursive, handwritten in the site's CTG Everly Script font.",
    }
    crumb_ld = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{SITE}/"},
            {"@type": "ListItem", "position": 2, "name": "Cursive Letters A–Z", "item": f"{SITE}/cursive-letters-a-z.html"},
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
  <meta property="og:type" content="website"><meta property="og:title" content="{e(title)}"><meta property="og:description" content="{e(desc, quote=True)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{img_url}"><meta property="og:image:width" content="{IMG_W}"><meta property="og:image:height" content="{IMG_H}"><meta property="og:image:alt" content="{e(img_alt, quote=True)}">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{e(title)}"><meta name="twitter:description" content="{e(desc, quote=True)}"><meta name="twitter:image" content="{img_url}">
  <link rel="icon" href="/favicon.ico" sizes="any"><link rel="stylesheet" href="/assets/styles.css?v={CSS_VERSION}">
  {ld(app_ld)}
  {ld(crumb_ld)}
  {ld(faq_ld)}
  {ld(image_ld)}
  {layout['style']}
</head><body>"""

    aside_title = "Related pages" if is_lang else "Other nations"
    aside_links = "".join(link(s) for s in p["related"]) + '<a href="/cursive-letters-a-z.html">Cursive letters A–Z</a><a href="/cursive-name-generator.html">Cursive name generator</a><a href="/">Cursive text generator</a>'

    faq_html = "".join(f"<h3>{e(q)}</h3><p>{e(a)}</p>" for q, a in p["faq"])
    phrases = "".join(f"<li>{e(x)}</li>" for x in p["phrases"])
    angle_h2, angle_body = p["angle"]
    _, uses_body = p["uses"]
    howto_h2 = p["hooks"]["howto"]
    uses_h2 = p["hooks"]["uses"]
    explore_h2 = "Explore More Languages and Nations" if is_lang else "Explore More Nation Names"
    explore = p["explore"].replace('<a href="/nation-in-cursive/">Nation in Cursive</a> hub', '<a href="/cursive-letters-a-z.html">Cursive Letters A–Z</a> page').replace('href="/nation-in-cursive/"', 'href="/cursive-letters-a-z.html"')
    figure = (f'<figure class="nation-figure"><img src="/{img_rel}" width="{IMG_W}" height="{IMG_H}" alt="{e(img_alt, quote=True)}" loading="lazy" decoding="async">'
              f'<figcaption>{e(name)} in cursive, handwritten in the site\'s own <a href="/free-fonts/ctg-everly-script.html">CTG Everly Script</a> font. The Unicode styles above are copyable text; this is what the joined handwriting looks like.</figcaption></figure>')

    body = f"""<main class="page"><section class="tool-section"><div class="wrap"><nav class="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/cursive-letters-a-z.html">Cursive Letters A–Z</a> › <span>{e(name)} in Cursive</span></nav><div class="tool-intro"><div><h1>{e(name)} in Cursive</h1></div></div><div class="panel input-panel"><label for="nation-input">Enter text</label><textarea id="nation-input" data-nation-input maxlength="120">{e(name)}</textarea></div><div class="nation-styles"><div class="nation-style"><strong>Elegant Cursive</strong><span class="nation-output" data-style="script"></span><button class="nation-copy" type="button" data-copy-style="script">Copy</button></div><div class="nation-style"><strong>Bold Cursive</strong><span class="nation-output" data-style="bold"></span><button class="nation-copy" type="button" data-copy-style="bold">Copy</button></div><div class="nation-style"><strong>Decorative Script</strong><span class="nation-output" data-style="fraktur"></span><button class="nation-copy" type="button" data-copy-style="fraktur">Copy</button></div></div><p class="meta-note">Tip: preview copied text in the target app, since Unicode styling varies.</p></div></section><section class="seo-section"><div class="wrap seo-layout"><aside class="seo-aside"><h2>{aside_title}</h2><div class="keyword-list">{aside_links}</div></aside><article class="seo-copy"><p class="nation-lead">{p['intro']}</p>{figure}<h2>{e(howto_h2)}</h2>{''.join(p['howto'])}<h2>{e(angle_h2)}</h2>{''.join(angle_body)}<h2>{e(uses_h2)}</h2>{''.join(uses_body)}<h3>{e(name)} cursive phrase ideas</h3><ul>{phrases}</ul><h2>{e(name)} in Cursive FAQ</h2>{faq_html}<h2>{explore_h2}</h2>{explore}</article></div></section></main>"""

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


def prune_retired():
    """Drop retired pages (and the hub) from sitemap.xml, sitemap.html and the IndexNow list, and delete their files."""
    with open(RETIRED, encoding="utf-8") as f:
        gone = json.load(f)["slugs"] + ["nation"]
    for rel in ("sitemap.xml", "sitemap.html", "indexnow-urls.txt"):
        path = os.path.join(ROOT, rel)
        t = read(path)
        for slug in gone:
            t = re.sub(rf"  <url>\n    <loc>{re.escape(SITE)}/{slug}-in-cursive/</loc>\n    <lastmod>[^<]*</lastmod>\n  </url>\n", "", t)
            t = re.sub(rf"[ \t]*<li><a href=\"/{slug}-in-cursive/\">[^<]*</a></li>\n", "", t)
            t = t.replace(f"{SITE}/{slug}-in-cursive/\n", "")
        write(path, t)
        mirror(rel)
    for slug in gone:
        for rel in (f"{slug}-in-cursive", f"{slug}-in-cursive.html", f"{IMG_DIR}/{slug}-in-cursive.png"):
            for base in (ROOT, os.path.join(ROOT, "public")):
                target = os.path.join(base, rel)
                if os.path.isdir(target):
                    shutil.rmtree(target)
                elif os.path.exists(target):
                    os.remove(target)


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
            if m not in known:
                sys.exit(f"{p['slug']}: body links to unknown page {m}")

    layout = load_layout()
    for p in pages:
        page_rel = f"{p['slug']}-in-cursive/index.html"
        stub_rel = f"{p['slug']}-in-cursive.html"
        write(os.path.join(ROOT, page_rel), render_page(p, layout))
        write(os.path.join(ROOT, stub_rel), render_stub(p))
        mirror(page_rel)
        mirror(stub_rel)

    prune_retired()
    update_sitemap(pages)
    update_indexnow(pages)
    update_html_sitemap(pages)
    print(f"built {len(pages)} pages")


if __name__ == "__main__":
    main()
