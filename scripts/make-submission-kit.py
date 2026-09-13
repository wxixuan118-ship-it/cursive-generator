"""Package each CTG font for font-directory submission.

For every font in FONTS this writes font-release/submission/<slug>/ with:

    <Name>.ttf / <Name>.otf   name table normalised (copyright, vendor URL ->
                              font landing page, designer URL -> homepage,
                              licence), fsType 0
    OFL.txt, README.txt
    <Name>.zip                the four files above, ready to upload
    previews/cover.png        1600x1000 hero, the image most directories want
    previews/banner.png       1200x630 social / featured image
    previews/thumb-1200x800.png  1200x800 thumbnail (Free Design Resources etc.)
    previews/alphabet.png     full character set
    submission-copy.md        every field a directory form asks for, ready to
                              paste: short/long description, tags, categories,
                              author, URLs

Run with the project virtualenv (fontTools + brotli) and Google Chrome:

    .venv/bin/python scripts/make-submission-kit.py
"""

from __future__ import annotations

import os
import shutil
import subprocess
import zipfile

from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "font-release", "submission")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

SITE = "https://www.cursive-text-generator.net/"
DESIGNER = "Cursive Text Generator"
CONTACT = "pw072888@gmail.com"
YEAR = "2026"

FONTS = [
    {
        "slug": "ctg-everly-script",
        "family": "CTG Everly Script",
        "file": "CTGEverlyScript",
        "src": {
            "ttf": "font-release/CTGEverlyScript-Regular.ttf",
            "otf": "font-release/CTGEverlyScript-Regular.otf",
            "woff2": "font-release/CTGEverlyScript-Regular.woff2",
        },
        # also normalise the copies the website serves
        "mirror": ["font-release", "assets/fonts/ctg-everly-script",
                   "public/assets/fonts/ctg-everly-script"],
        "page": SITE + "free-fonts/ctg-everly-script.html",
        "generator": SITE + "cursive-text-generator.html",
        "tagline": "A natural handwritten cursive with true letter joins",
        "short": ("Free handwritten cursive font with real contextual joins, "
                  "257 characters and full Latin-1 accents. OFL licensed, free "
                  "for personal and commercial use."),
        "long": [
            "CTG Everly Script is a natural handwritten cursive. Every letter "
            "is drawn as a pen skeleton with a variable-width nib, so "
            "downstrokes swell and upstrokes thin the way they do under a real "
            "hand. Lowercase letters carry entry and exit strokes that meet at "
            "a fixed point on the baseline, which makes words join "
            "continuously instead of sitting as separate shapes.",
            "Contextual alternates (calt) are on by default: the lead-in "
            "stroke is dropped at the start of a word, the exit is swapped for "
            "a terminal at the end, and the second letter of a doubled pair is "
            "varied so the text never looks mechanical. Discretionary "
            "ligatures (dlig) add joined tt and ff written with one continuous "
            "crossbar.",
            "The font covers complete Basic Latin, all ASCII punctuation, the "
            "full Latin-1 Supplement, typographic punctuation, currency marks "
            "and Central European accented letters - 604 glyphs, 257 "
            "characters. It is an original typeface: nothing is traced or "
            "derived from an existing font.",
            "Good for names and signatures, wedding invitations, quotes, "
            "social graphics, logotypes and greeting cards. Licensed under the "
            "SIL Open Font License 1.1 - free for personal and commercial use.",
        ],
        "tags": ["cursive", "handwritten", "script", "calligraphy", "signature",
                 "wedding", "elegant", "connected", "handwriting", "free font"],
        "categories": {
            "DaFont": "Script > Handwritten",
            "1001 Fonts": "Calligraphy / Handwriting / Script",
            "FontSpace": "Cursive, Handwriting, Script, Calligraphy",
            "generic": "Script, Handwritten, Calligraphy",
        },
        "glyphs": "604 glyphs / 257 characters",
        "features": "calt, dlig, kern",
        "samples": ["Beautiful Things", "Love Yourself", "Dream Without Fear",
                    "Forever & Always", "Handwritten with Love", "Everly Script"],
        "accents": True,
    },
    {
        "slug": "ctg-signature-script",
        "family": "CTG Signature Script",
        "file": "CTGSignatureScript",
        "src": {
            "ttf": "assets/fonts/ctg-signature-script/CTGSignatureScript.ttf",
            "otf": "assets/fonts/ctg-signature-script/CTGSignatureScript.otf",
            "woff2": "assets/fonts/ctg-signature-script/CTGSignatureScript.woff2",
        },
        "mirror": [],  # built by scripts/build-font.py with the same metadata
        "page": SITE + "free-fonts/ctg-signature-script.html",
        "generator": SITE + "cursive-signature-generator.html",
        "tagline": "An elegant signature script for names and logotypes",
        "short": ("Free signature-style cursive font for names, autographs, "
                  "logos and invitations. Full A-Z, a-z, numerals and "
                  "punctuation. OFL licensed, free for commercial use."),
        "long": [
            "CTG Signature Script is an elegant handwritten cursive built for "
            "signatures. The capitals are tall and open with a slight forward "
            "slant, the lowercase is compact and quick, and the overall rhythm "
            "reads like a confident autograph rather than a formal "
            "calligraphic hand.",
            "It covers complete Basic Latin - uppercase, lowercase, numerals "
            "and standard punctuation - and is an original typeface drawn "
            "from hand-authored stroke recipes, not traced from any existing "
            "font.",
            "Use it for personal signatures, email sign-offs, logotypes, "
            "wedding stationery, social graphics, quotes and branding. "
            "Licensed under the SIL Open Font License 1.1 - free for personal "
            "and commercial use.",
        ],
        "tags": ["signature", "cursive", "handwritten", "script", "autograph",
                 "logo", "elegant", "handwriting", "wedding", "free font"],
        "categories": {
            "DaFont": "Script > Handwritten",
            "1001 Fonts": "Handwriting / Script / Calligraphy",
            "FontSpace": "Signature, Cursive, Handwriting, Script",
            "generic": "Script, Signature, Handwritten",
        },
        "glyphs": "98 glyphs / 95 characters",
        "features": "none (plain outlines)",
        "samples": ["Signature Studio", "With Love", "Olivia Bennett",
                    "Yours Truly", "James Carter", "Best Wishes"],
        "accents": False,
    },
]

OFL = os.path.join(ROOT, "font-release", "submission", "OFL.txt")


# ---------------------------------------------------------------- metadata

def normalise_names(path, font):
    """Make sure every directory that reads the name table finds the
    designer, the licence and - most importantly - the website."""
    tt = TTFont(path)
    name = tt["name"]
    values = {
        0: "Copyright (c) %s %s. Licensed under the SIL Open Font License, "
           "Version 1.1." % (YEAR, DESIGNER),
        8: DESIGNER,
        9: DESIGNER,
        11: font["page"],
        12: SITE,
        13: "This Font Software is licensed under the SIL Open Font License, "
            "Version 1.1. This licence is available with a FAQ at: "
            "https://openfontlicense.org",
        14: "https://openfontlicense.org",
    }
    for nid, text in values.items():
        name.setName(text, nid, 3, 1, 0x409)
        name.setName(text, nid, 1, 0, 0)
    tt["OS/2"].fsType = 0
    tt.save(path)
    tt.close()


# ------------------------------------------------------------------- text

def readme(font):
    return """%(family)s
%(rule)s

Family        %(family)s
Style         Regular
Version       %(version)s
Designer      %(designer)s
Website       %(page)s
Licence       SIL Open Font License, Version 1.1 (see OFL.txt)
              Free for personal AND commercial use.

About
-----
%(about)s

Contents
--------
%(file)s.ttf   TrueType, for Windows / macOS / Linux
%(file)s.otf   OpenType/CFF, for print and design apps
OFL.txt%(pad)s   SIL Open Font License 1.1
README.txt%(pad2)s   This file

Installing
----------
Windows    right-click the .ttf and choose Install
macOS      double-click the .ttf or .otf and choose Install Font
Linux      copy into ~/.local/share/fonts and run: fc-cache -f

Character set
-------------
%(glyphs)s

OpenType features
-----------------
%(features)s

More free cursive fonts and the online generator:
%(site)s

Copyright (c) %(year)s %(designer)s.
""" % dict(family=font["family"], rule="=" * len(font["family"]),
           version=font["version"], designer=DESIGNER, page=font["page"],
           about="\n\n".join(wrap(p) for p in font["long"]),
           file=font["file"], pad=" " * (len(font["file"]) - 3),
           pad2=" " * (len(font["file"]) - 6), glyphs=font["glyphs"],
           features=font["features"], site=SITE, year=YEAR)


def wrap(text, width=78):
    words, lines, cur = text.split(), [], ""
    for w in words:
        if len(cur) + len(w) + 1 > width:
            lines.append(cur); cur = w
        else:
            cur = (cur + " " + w).strip()
    lines.append(cur)
    return "\n".join(lines)


def submission_copy(font):
    cats = "\n".join("- **%s**: %s" % kv for kv in font["categories"].items())
    return """# %(family)s - submission copy

Paste-ready fields for font directory forms. Keep the URLs exactly as written.

## Identity

| Field | Value |
|---|---|
| Font name | %(family)s |
| Style | Regular (1 style) |
| Version | %(version)s |
| Author / Designer / Foundry | %(designer)s |
| Author website (the link we want) | %(page)s |
| Fallback website (if only a homepage is accepted) | %(site)s |
| Contact email | %(contact)s |
| Licence | SIL Open Font License 1.1 (OFL) - 100%% free, personal & commercial |
| Licence URL | https://openfontlicense.org |
| Download / official page | %(page)s |
| Direct file | %(page_dir)s%(file)s.zip |
| File formats | TTF, OTF |
| Character set | %(glyphs)s |
| OpenType features | %(features)s |

## Tagline (~60 chars)

%(tagline)s

## Short description (<=160 chars)

%(short)s

## Long description

%(long)s

## Tags

%(tags)s

## Categories

%(cats)s

## Sample text for previews

%(samples)s

## Files in this folder

- `%(file)s.zip` - upload this where a single archive is asked for
- `%(file)s.ttf` / `%(file)s.otf` - where individual files are asked for
- `previews/cover.png` (1600x1000) - main preview / featured image
- `previews/banner.png` (1200x630) - social / thumbnail
- `previews/thumb-1200x800.png` - thumbnail for sites that ask for 1200x800
- `previews/alphabet.png` - character set

## Notes for the form

- Licence dropdowns: pick "100%% Free", "Free for commercial use", "OFL" or
  "Open Source" - never "Donationware" or "Demo".
- "Is this your own font?" - yes, original design by %(designer)s.
- If the form asks for a designer *page* rather than a site, use %(page)s.
""" % dict(family=font["family"], version=font["version"], designer=DESIGNER,
           page=font["page"], site=SITE, contact=CONTACT,
           page_dir=SITE + "assets/fonts/%s/" % font["slug"], file=font["file"],
           glyphs=font["glyphs"], features=font["features"],
           tagline=font["tagline"], short=font["short"],
           long="\n\n".join(font["long"]), tags=", ".join(font["tags"]),
           cats=cats, samples="\n".join("- " + s for s in font["samples"]))


# --------------------------------------------------------------- previews

CSS = """
@font-face { font-family: 'F'; src: url('%s') format('woff2');
             font-weight: 400; font-style: normal; font-display: block; }
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #faf7f1; color: #1c1a17; overflow: hidden;
       font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; }
.s { font-family: 'F', cursive; }
.label { font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
         color: #a2947f; }
.rule { height: 1px; background: #e3dbcd; }
"""

COVER = """<!doctype html><meta charset="utf-8"><style>%(css)s
body { padding: 64px 80px; width: 1600px; height: 1000px; position: relative; }
h1 { font-size: %(h1)dpx; line-height: 1.05; margin: 8px 0 2px; font-weight: 400; }
.sub { font-size: 15px; letter-spacing: .34em; text-transform: uppercase;
       color: #9c8e78; margin-bottom: 28px; }
.rule { margin: 30px 0; }
.pangram { font-size: 60px; line-height: 1.35; }
.rows { font-size: 38px; line-height: 1.6; color: #33302b; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 60px; margin-top: 22px; }
.grid div { font-size: 52px; }
.foot { position: absolute; bottom: 44px; left: 80px; right: 80px;
        display: flex; justify-content: space-between; }
</style>
<div class="label">%(designer)s &nbsp;·&nbsp; free font</div>
<h1 class="s">%(family)s</h1>
<div class="sub">%(tagline)s &nbsp;·&nbsp; %(glyphs)s</div>
<div class="rule"></div>
<div class="s pangram">The quick brown fox jumps over the lazy dog</div>
<div class="rule"></div>
<div class="s rows">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 &amp; .,!? &ldquo;&rdquo; ()</div>
<div class="grid s">%(samples)s</div>
<div class="foot"><span class="label">SIL Open Font License 1.1 &nbsp;·&nbsp; free for commercial use</span>
<span class="label">cursive-text-generator.net</span></div>
"""

BANNER = """<!doctype html><meta charset="utf-8"><style>%(css)s
body { width: 1200px; height: %(bh)dpx; padding: 70px 80px; position: relative; }
h1 { font-size: %(h1b)dpx; line-height: 1; font-weight: 400; margin: 18px 0 30px; }
.p { font-size: 46px; line-height: 1.3; color: #33302b; }
.foot { position: absolute; bottom: 44px; left: 80px; right: 80px;
        display: flex; justify-content: space-between; }
</style>
<div class="label">Free font &nbsp;·&nbsp; OFL</div>
<h1 class="s">%(family)s</h1>
<div class="s p">%(sample0)s &nbsp;·&nbsp; %(sample1)s</div>
%(extra)s
<div class="foot"><span class="label">%(designer)s</span>
<span class="label">cursive-text-generator.net</span></div>
"""

ALPHABET = """<!doctype html><meta charset="utf-8"><style>%(css)s
body { padding: 56px 70px; width: 1600px; height: %(height)dpx; }
h2 { font-size: 11px; letter-spacing: .2em; text-transform: uppercase;
     color: #a2947f; margin: 26px 0 10px; font-weight: 600; }
.title { font-size: 72px; margin-bottom: 4px; }
.small { font-size: 44px; line-height: 1.55; }
.cells { display: flex; flex-wrap: wrap; gap: 0 4px; }
.cells span { display: inline-flex; align-items: flex-end; justify-content: center;
              width: 84px; height: 104px; border: 1px solid #ece4d6;
              font-size: 54px; line-height: 1; padding-bottom: 16px; }
</style>
<div class="label">Character set &nbsp;·&nbsp; %(glyphs)s</div>
<div class="s title">%(family)s</div>
<h2>Uppercase</h2><div class="cells s">%(upper)s</div>
<h2>Lowercase</h2><div class="cells s">%(lower)s</div>
<h2>Numerals</h2><div class="cells s">%(digits)s</div>
<h2>Punctuation &amp; symbols</h2>
<div class="s small">. , : ; ! ? ' " - _ ( ) [ ] { } / \\ | &amp; @ # $ %% + = * &lt; &gt; ^ ~</div>
%(accents)s
"""

ACCENTS = """<h2>Accented characters</h2>
<div class="s small">&Aacute; &Agrave; &Acirc; &Auml; &Atilde; &Aring; &Ccedil; &Eacute; &Egrave; &Ecirc; &Euml; &Iacute; &Igrave; &Icirc; &Iuml; &Ntilde; &Oacute; &Ograve; &Ocirc; &Ouml; &Otilde; &Oslash; &Uacute; &Ugrave; &Ucirc; &Uuml; &Yacute; &AElig; &OElig; &szlig;<br>
&aacute; &agrave; &acirc; &auml; &atilde; &aring; &ccedil; &eacute; &egrave; &ecirc; &euml; &iacute; &igrave; &icirc; &iuml; &ntilde; &oacute; &ograve; &ocirc; &ouml; &otilde; &oslash; &uacute; &ugrave; &ucirc; &uuml; &yacute; &yuml; &aelig; &oelig;</div>"""


def cells(chars):
    return "".join("<span>%s</span>" % c for c in chars)


def shoot(html, png, width, height):
    tmp = png + ".html"
    with open(tmp, "w") as fh:
        fh.write(html)
    subprocess.run([
        CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
        "--force-device-scale-factor=1", "--allow-file-access-from-files",
        "--default-background-color=faf7f1", "--virtual-time-budget=4000",
        "--screenshot=%s" % png, "--window-size=%d,%d" % (width, height),
        "file://%s" % tmp,
    ], check=True, capture_output=True)
    os.remove(tmp)


def previews(font, folder, woff2):
    prev = os.path.join(folder, "previews")
    os.makedirs(prev, exist_ok=True)
    css = CSS % woff2
    wide = len(font["family"]) > 18
    ctx = dict(css=css, designer=DESIGNER, family=font["family"],
               h1=112 if wide else 150, h1b=96 if wide else 136,
               tagline=font["tagline"], glyphs=font["glyphs"],
               samples="".join("<div>%s</div>" % s.replace("&", "&amp;")
                               for s in font["samples"]),
               sample0=font["samples"][0].replace("&", "&amp;"),
               sample1=font["samples"][1].replace("&", "&amp;"),
               upper=cells("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
               lower=cells("abcdefghijklmnopqrstuvwxyz"),
               digits=cells("0123456789"),
               accents=ACCENTS if font["accents"] else "",
               height=1240 if font["accents"] else 1000)
    shoot(COVER % ctx, os.path.join(prev, "cover.png"), 1600, 1000)
    shoot(BANNER % dict(ctx, bh=630, extra=""), os.path.join(prev, "banner.png"), 1200, 630)
    # Free Design Resources and most WordPress directories want 1200x800
    extra = ('<div class="s p" style="margin-top:34px;font-size:40px;line-height:1.5">'
             'The quick brown fox jumps over the lazy dog<br>'
             'ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz 0123456789</div>')
    shoot(BANNER % dict(ctx, bh=800, extra=extra), os.path.join(prev, "thumb-1200x800.png"), 1200, 800)
    shoot(ALPHABET % ctx, os.path.join(prev, "alphabet.png"), 1600, ctx["height"])


# ------------------------------------------------------------------- main

def build(font):
    folder = os.path.join(OUT, font["slug"])
    if os.path.isdir(folder):
        shutil.rmtree(folder)
    os.makedirs(folder)

    # normalise the files the site serves, then copy them into the kit
    for kind, rel in font["src"].items():
        src = os.path.join(ROOT, rel)
        normalise_names(src, font)
        for mirror in font["mirror"]:
            for cand in os.listdir(os.path.join(ROOT, mirror)):
                if cand.lower().endswith("." + kind) and font["file"].lower() in cand.lower():
                    target = os.path.join(ROOT, mirror, cand)
                    if os.path.abspath(target) != os.path.abspath(src):
                        shutil.copy(src, target)
        if kind != "woff2":
            shutil.copy(src, os.path.join(folder, "%s.%s" % (font["file"], kind)))

    font["version"] = TTFont(os.path.join(ROOT, font["src"]["ttf"]))["name"] \
        .getDebugName(5).replace("Version ", "")

    shutil.copy(OFL, os.path.join(folder, "OFL.txt"))
    with open(os.path.join(folder, "README.txt"), "w") as fh:
        fh.write(readme(font))
    with open(os.path.join(folder, "submission-copy.md"), "w") as fh:
        fh.write(submission_copy(font))

    zip_path = os.path.join(folder, font["file"] + ".zip")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as z:
        for n in ("%s.ttf" % font["file"], "%s.otf" % font["file"],
                  "OFL.txt", "README.txt"):
            z.write(os.path.join(folder, n), n)

    previews(font, folder, os.path.join(ROOT, font["src"]["woff2"]))
    print("kit:", os.path.relpath(folder, ROOT))
    for n in sorted(os.listdir(folder)):
        p = os.path.join(folder, n)
        if os.path.isfile(p):
            print("   %-28s %7d KB" % (n, os.path.getsize(p) // 1024))
    for n in sorted(os.listdir(os.path.join(folder, "previews"))):
        p = os.path.join(folder, "previews", n)
        print("   previews/%-19s %7d KB" % (n, os.path.getsize(p) // 1024))


def main():
    os.makedirs(OUT, exist_ok=True)
    if not os.path.exists(OFL):
        raise SystemExit("missing " + OFL)
    for font in FONTS:
        build(font)


if __name__ == "__main__":
    main()
