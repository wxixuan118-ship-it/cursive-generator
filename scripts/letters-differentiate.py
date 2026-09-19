#!/usr/bin/env python3
"""De-template the 26 /cursive-letters/<x>-in-cursive/ pages.

Reads scripts/letters-hooks.json and, for each letter page:
  1. rewrites <title>, og:title and twitter:title with the letter's own hook;
  2. renames the "Joining x to the Next Letter" and "Common Mistakes with
     Cursive X" H2s to the letter-specific wording;
  3. draws assets/letters/<x>-in-cursive.png (capital + lowercase in the
     site's CTG Everly Script, a sample name underneath), places it in a
     <figure> before "How to Write a Capital X", and points og:image,
     twitter:image and the WebPage.primaryImageOfPage at it.
Idempotent — a page that already carries assets/letters/ is only re-titled.
The letter pages have no builder, so this edits the HTML in place and
mirrors each file into public/. Run from the repo root.
"""
import html
import json
import os
import re
import shutil

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://www.cursive-text-generator.net"
HOOKS = os.path.join(ROOT, "scripts", "letters-hooks.json")
FONT_SCRIPT = os.path.join(ROOT, "assets", "fonts", "ctg-everly-script", "CTGEverlyScript.otf")
FONT_LABEL = "/System/Library/Fonts/Supplemental/Arial.ttf"
IMG_DIR = "assets/letters"
W, H = 1200, 630
CSS = ".letter-figure{margin:18px 0 26px}.letter-figure img{display:block;width:100%;height:auto;border:1px solid var(--line);border-radius:12px;background:#fff}.letter-figure figcaption{font-size:13px;color:var(--muted);margin-top:8px;line-height:1.5}"


def mirror(rel):
    dst = os.path.join(ROOT, "public", rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    shutil.copyfile(os.path.join(ROOT, rel), dst)


def fit(draw, text, size, max_w, floor=48):
    while size > floor:
        f = ImageFont.truetype(FONT_SCRIPT, size)
        if draw.textlength(text, font=f) <= max_w:
            return f
        size -= 6
    return ImageFont.truetype(FONT_SCRIPT, floor)


def render(letter, name):
    U, L = letter.upper(), letter.lower()
    img = Image.new("RGB", (W, H), "#fbfaf7")
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((16, 16, W - 16, H - 16), radius=20, fill="#ffffff", outline="#dfe6df", width=2)
    label = ImageFont.truetype(FONT_LABEL, 22)
    d.text((72, 64), f"{U} IN CURSIVE", font=label, fill="#2f6b4f")
    # guide lines: ascender, x-height, baseline — the same three the stroke diagrams use
    base = 410
    big = fit(d, f"{U} {L}", 320, 620)
    asc, _ = big.getmetrics()
    for y, col in ((base, "#cfd8cf"), (base - int(asc * 0.42), "#e6ebe6"), (base - int(asc * 0.78), "#e6ebe6")):
        d.line((72, y, 700, y), fill=col, width=2)
    d.text((80, base - asc), f"{U} {L}", font=big, fill="#17201b")
    # sample name on the right, in the accent colour
    small = fit(d, name, 150, 358, floor=44)
    asc2, _ = small.getmetrics()
    d.line((760, base, W - 72, base), fill="#cfd8cf", width=2)
    d.text((770, base - asc2), name, font=small, fill="#c96f59")
    d.text((72, H - 64), f"Capital {U}, lowercase {L} and the name {name} in CTG Everly Script", font=label, fill="#5d6a63")
    dom = "cursive-text-generator.net"
    d.text((W - 72 - d.textlength(dom, font=label), H - 64), dom, font=label, fill="#5d6a63")
    rel = f"{IMG_DIR}/{L}-in-cursive.png"
    os.makedirs(os.path.join(ROOT, IMG_DIR), exist_ok=True)
    img.save(os.path.join(ROOT, rel), optimize=True)
    mirror(rel)
    return rel


def main():
    with open(HOOKS, encoding="utf-8") as f:
        hooks = json.load(f)
    done = 0
    for L in "abcdefghijklmnopqrstuvwxyz":
        h = hooks[L]
        U = L.upper()
        rel = f"cursive-letters/{L}-in-cursive/index.html"
        path = os.path.join(ROOT, rel)
        s = open(path, encoding="utf-8").read()
        e = lambda t: html.escape(t, quote=True)

        # 1. title
        title = f"{U} in Cursive — {h['title']}"
        if len(title) <= 45:
            title += " | Copy & Paste"
        s = re.sub(r"<title>[^<]*</title>", f"<title>{e(title)}</title>", s, count=1)
        s = re.sub(r'(<meta property="og:title" content=")[^"]*(")', rf"\g<1>{e(title)}\g<2>", s, count=1)
        s = re.sub(r'(<meta name="twitter:title" content=")[^"]*(")', rf"\g<1>{e(title)}\g<2>", s, count=1)

        # 2. H2s
        if h.get("join"):
            s = s.replace(f"<h2>Joining {L} to the Next Letter</h2>", f"<h2>{e(h['join'])}</h2>", 1)
        s = s.replace(f"<h2>Common Mistakes with Cursive {U}</h2>", f"<h2>{e(h['mistakes'])}</h2>", 1)

        # 3. image
        img_rel = render(L, h["name"])
        img_url = f"{SITE}/{img_rel}"
        alt = f"{U} in cursive: the capital {U} and lowercase {L} written in joined cursive handwriting, with the name {h['name']} beside them"
        if f"/{IMG_DIR}/" not in s:
            fig = (f'<figure class="letter-figure"><img src="/{img_rel}" width="{W}" height="{H}" alt="{e(alt)}" loading="lazy" decoding="async">'
                   f'<figcaption>Capital {U}, lowercase {L} and the name {e(h["name"])} handwritten in the site\'s own <a href="/free-fonts/ctg-everly-script.html">CTG Everly Script</a> font — what the joined letter looks like on paper, next to the copyable Unicode styles above.</figcaption></figure>\n          ')
            anchor = f"<h2>How to Write a Capital {U} in Cursive</h2>"
            assert anchor in s, f"{L}: no capital H2"
            s = s.replace(anchor, fig + anchor, 1)
            s = s.replace("</style>", CSS + "</style>", 1)
        s = re.sub(r'(<meta property="og:image" content=")[^"]*(")', rf"\g<1>{img_url}\g<2>", s, count=1)
        s = re.sub(r'(<meta name="twitter:image" content=")[^"]*(")', rf"\g<1>{img_url}\g<2>", s, count=1)
        if 'property="og:image:alt"' not in s:
            s = s.replace('<meta property="og:image:height" content="630">', f'<meta property="og:image:height" content="630"><meta property="og:image:alt" content="{e(alt)}">', 1)
        s = re.sub(r'("primaryImageOfPage": \{"@type": "ImageObject", "url": ")[^"]*(")', rf"\g<1>{img_url}\g<2>", s, count=1)

        open(path, "w", encoding="utf-8").write(s)
        mirror(rel)
        done += 1
    print(f"updated {done} letter pages")


if __name__ == "__main__":
    main()
