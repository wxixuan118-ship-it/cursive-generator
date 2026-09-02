#!/usr/bin/env python3
from __future__ import annotations

import importlib.util
import json
import math
import shutil
import zipfile
from pathlib import Path

from fontTools.fontBuilder import FontBuilder
from fontTools.pens.t2CharStringPen import T2CharStringPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parent.parent
SOURCE_FILE = ROOT / "font-source" / "ctg_signature_script" / "source.py"
ASSET_DIR = ROOT / "assets" / "fonts" / "ctg-signature-script"
PUBLIC_ASSET_DIR = ROOT / "public" / "assets" / "fonts" / "ctg-signature-script"
PREVIEW_DIR = ROOT / "assets" / "previews"
PUBLIC_PREVIEW_DIR = ROOT / "public" / "assets" / "previews"
DIST_NAME = "CTGSignatureScript"


def load_source():
    spec = importlib.util.spec_from_file_location("ctg_signature_script_source", SOURCE_FILE)
    module = importlib.util.module_from_spec(spec)
    assert spec and spec.loader
    spec.loader.exec_module(module)
    return module.build_source()


def catmull_rom(points, samples=18, closed=False):
    """Smooth a skeleton without the overshoot that caused self-intersections."""
    if len(points) < 2:
        return points

    result = list(points)
    # Corner cutting preserves intended gesture but avoids the looped, spiky
    # overshoot ordinary Catmull-Rom produces at tight handwriting turns.
    for _ in range(4):
        refined = []
        pairs = list(zip(result, result[1:]))
        if closed:
            pairs.append((result[-1], result[0]))
        else:
            refined.append(result[0])
        for (ax, ay), (bx, by) in pairs:
            refined.append((0.75 * ax + 0.25 * bx, 0.75 * ay + 0.25 * by))
            refined.append((0.25 * ax + 0.75 * bx, 0.25 * ay + 0.75 * by))
        if not closed:
            refined.append(result[-1])
        result = refined
    return simplify(result, tolerance=0.35)


def simplify(points, tolerance=0.6):
    if not points:
        return []
    simplified = [points[0]]
    for x, y in points[1:]:
        px, py = simplified[-1]
        if math.hypot(x - px, y - py) >= tolerance:
            simplified.append((x, y))
    return simplified


def unit_normal(a, b):
    dx = b[0] - a[0]
    dy = b[1] - a[1]
    length = math.hypot(dx, dy) or 1.0
    return (-dy / length, dx / length)


def stroke_to_contours(points, width, closed):
    centerline = catmull_rom(points, samples=20, closed=closed)
    if closed and centerline[0] == centerline[-1]:
        centerline = centerline[:-1]
    half = width / 2.0
    contours = []
    pairs = list(zip(centerline, centerline[1:]))
    if closed:
        pairs.append((centerline[-1], centerline[0]))

    # Each short segment is a rounded pen stamp. Keeping the stamps as
    # overlapping contours is deliberate: it avoids self-intersecting outline
    # polygons at reversals, which were responsible for the torn-looking joins.
    for start, end in pairs:
        nx, ny = unit_normal(start, end)
        ax, ay = start
        bx, by = end
        contours.append(
            [
                (ax + nx * half, ay + ny * half),
                (bx + nx * half, by + ny * half),
                (bx - nx * half, by - ny * half),
                (ax - nx * half, ay - ny * half),
            ]
        )
    for index, point in enumerate(centerline):
        if index % 3 == 0 or index == len(centerline) - 1:
            # Segment quads are clockwise, so keep the round joins clockwise
            # too; opposite windings would punch dotted holes into the stroke.
            contours.append(list(reversed(ellipse_contour(point, half, half, steps=12))))
    return contours


def ellipse_contour(center, rx, ry, steps=32):
    cx, cy = center
    return [
        (cx + math.cos((math.tau * i) / steps) * rx, cy + math.sin((math.tau * i) / steps) * ry)
        for i in range(steps)
    ]


def slant_point(point, factor):
    x, y = point
    return (x + y * factor, y)


def apply_slant(contour, factor):
    return [slant_point(point, factor) for point in contour]


def contours_for_elements(elements, slant):
    contours = []
    for element in elements:
        if element["type"] == "stroke":
            stroke_contours = stroke_to_contours(element["points"], element["width"] * 0.72, element["closed"])
            contours.extend(apply_slant(contour, slant) for contour in stroke_contours)
        else:
            contour = ellipse_contour(element["center"], element["rx"], element["ry"])
            contours.append(apply_slant(contour, slant))
    return contours


def draw_tt(contours):
    pen = TTGlyphPen(None)
    if not contours:
        pen.moveTo((0, 0))
        pen.lineTo((0, 0))
        pen.lineTo((0, 0))
        pen.closePath()
        return pen.glyph()
    for contour in contours:
        pen.moveTo(contour[0])
        for point in contour[1:]:
            pen.lineTo(point)
        pen.closePath()
    return pen.glyph()


def draw_cff(contours, advance):
    pen = T2CharStringPen(advance, None)
    for contour in contours:
        pen.moveTo(contour[0])
        for point in contour[1:]:
            pen.lineTo(point)
        pen.closePath()
    return pen.getCharString()


def bounds(contours):
    xs = [x for contour in contours for x, _ in contour]
    ys = [y for contour in contours for _, y in contour]
    if not xs:
        return 0, 0, 0, 0
    return min(xs), min(ys), max(xs), max(ys)


def make_notdef():
    outer = [(40, -200), (40, 760), (420, 760), (420, -200)]
    inner = [(110, -120), (350, -120), (350, 680), (110, 680)]
    return [outer, inner]


def write_text(path, content):
    path.write_text(content, encoding="utf-8")


def make_license(meta):
    return f"""{meta['family_name']}

Copyright (c) 2026, {meta['designer']} ({meta['website']})

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://openfontlicense.org

-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded,
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
"Font Software" refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

"Reserved Font Name" refers to any names specified as such after the
copyright statement(s).

"Original Version" refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

"Modified Version" refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

"Author" refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION & CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
"""


def make_readme(meta):
    return f"""{DIST_NAME}

Family: {meta['family_name']}
Style: {meta['style_name']}
Designer / Publisher: {meta['designer']}
Website: {meta['website']}

Description:
{meta['description']}

Files included:
- {DIST_NAME}.ttf
- {DIST_NAME}.otf
- {DIST_NAME}.woff2
- LICENSE.txt
- README.txt
- preview-primary.png
- preview-specimen.png

How to use:
- Install the TTF or OTF file on desktop systems for design apps.
- Use the WOFF2 file in websites with @font-face for modern browsers.

Sample CSS:
@font-face {{
  font-family: '{meta['family_name']}';
  src: url('{DIST_NAME}.woff2') format('woff2');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}}

Rebuild notes:
- Source recipes live in font-source/ctg_signature_script/source.py
- Build with: ./.venv/bin/python scripts/build-font.py

Distributed by Cursive Text Generator.
"""


def render_preview(ttf_path, out_path, title, lines, width=1600, height=900, font_size=118):
    bg = "#fbfaf7"
    ink = "#17201b"
    accent = "#2f6b4f"
    image = Image.new("RGB", (width, height), bg)
    draw = ImageDraw.Draw(image)
    title_font = ImageFont.truetype(str(ttf_path), 84)
    body_font = ImageFont.truetype(str(ttf_path), font_size)
    sans_font = ImageFont.load_default()

    draw.rounded_rectangle((38, 38, width - 38, height - 38), radius=28, outline="#dfe6df", width=3, fill="#ffffff")
    draw.text((84, 80), title, fill=accent, font=title_font)
    y = 210
    for line in lines:
        draw.text((94, y), line, fill=ink, font=body_font)
        y += int(font_size * 1.24)
    footer = "Original font package by Cursive Text Generator"
    draw.text((94, height - 84), footer, fill="#5d6a63", font=sans_font)
    image.save(out_path)


def build():
    meta, source_glyphs, charmap, kerning_pairs = load_source()
    units_per_em = meta["units_per_em"]
    glyph_order = [".notdef"] + [name for name in source_glyphs.keys()]

    contours_by_name = {".notdef": make_notdef()}
    advances = {".notdef": 500}
    left_bearings = {".notdef": 40}
    for name, definition in source_glyphs.items():
        contours = contours_for_elements(definition["elements"], meta["slant"])
        contours_by_name[name] = contours
        advances[name] = definition["advance"]
        left_bearings[name] = math.floor(bounds(contours)[0]) if contours else 0

    metrics = {name: (advances[name], left_bearings[name]) for name in glyph_order}

    ttf_glyphs = {name: draw_tt(contours_by_name[name]) for name in glyph_order}
    cff_glyphs = {name: draw_cff(contours_by_name[name], advances[name]) for name in glyph_order}

    cmap = {ord(character): glyph_name for character, glyph_name in charmap.items()}
    ps_name = meta["postscript_name"]
    family_name = meta["family_name"]
    style_name = meta["style_name"]
    name_table = {
        "familyName": family_name,
        "styleName": style_name,
        "fullName": meta["full_name"],
        "psName": ps_name,
        "uniqueFontIdentifier": f"{meta['designer']}: {ps_name}: 2026",
        "version": meta["version"],
        "designer": meta["designer"],
        "manufacturer": meta["manufacturer"],
        "description": meta["description"],
        "licenseDescription": meta["license_name"],
        "licenseInfoURL": meta["license_url"],
    }

    common_kwargs = dict(
        unitsPerEm=units_per_em,
        isTTF=True,
    )
    fb = FontBuilder(**common_kwargs)
    fb.setupGlyphOrder(glyph_order)
    fb.setupCharacterMap(cmap)
    fb.setupGlyf(ttf_glyphs)
    fb.setupHorizontalMetrics(metrics)
    fb.setupHorizontalHeader(
        ascent=meta["ascender"],
        descent=meta["descender"],
        lineGap=meta["line_gap"],
    )
    fb.setupNameTable(name_table)
    fb.setupOS2(
        sTypoAscender=meta["ascender"],
        sTypoDescender=meta["descender"],
        sTypoLineGap=meta["line_gap"],
        usWinAscent=meta["ascender"],
        usWinDescent=abs(meta["descender"]),
        sxHeight=meta["x_height"],
        sCapHeight=meta["cap_height"],
    )
    fb.setupPost(italicAngle=-12.0)
    fb.setupMaxp()
    fb.setupHead(created=0, modified=0)

    fb_otf = FontBuilder(unitsPerEm=units_per_em, isTTF=False)
    fb_otf.setupGlyphOrder(glyph_order)
    fb_otf.setupCharacterMap(cmap)
    fb_otf.setupCFF(
        ps_name,
        {
            "FullName": meta["full_name"],
            "FamilyName": family_name,
            "Weight": style_name,
            "version": meta["version"],
            "Notice": meta["description"],
        },
        cff_glyphs,
        {},
    )
    fb_otf.setupHorizontalMetrics(metrics)
    fb_otf.setupHorizontalHeader(
        ascent=meta["ascender"],
        descent=meta["descender"],
        lineGap=meta["line_gap"],
    )
    fb_otf.setupNameTable(name_table)
    fb_otf.setupOS2(
        sTypoAscender=meta["ascender"],
        sTypoDescender=meta["descender"],
        sTypoLineGap=meta["line_gap"],
        usWinAscent=meta["ascender"],
        usWinDescent=abs(meta["descender"]),
        sxHeight=meta["x_height"],
        sCapHeight=meta["cap_height"],
    )
    fb_otf.setupPost(italicAngle=-12.0)
    fb_otf.setupHead(created=0, modified=0)

    ASSET_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)
    ttf_path = ASSET_DIR / f"{DIST_NAME}.ttf"
    otf_path = ASSET_DIR / f"{DIST_NAME}.otf"
    woff2_path = ASSET_DIR / f"{DIST_NAME}.woff2"

    fb.save(str(ttf_path))
    fb_otf.save(str(otf_path))

    woff_font = TTFont(str(ttf_path))
    woff_font.flavor = "woff2"
    woff_font.save(str(woff2_path))

    license_path = ASSET_DIR / "LICENSE.txt"
    readme_path = ASSET_DIR / "README.txt"
    write_text(license_path, make_license(meta))
    write_text(readme_path, make_readme(meta))

    primary_preview = PREVIEW_DIR / "ctg-signature-script-primary.png"
    specimen_preview = PREVIEW_DIR / "ctg-signature-script-specimen.png"
    render_preview(
        ttf_path,
        primary_preview,
        "CTG Signature Script",
        ["Beautiful Things", "Olivia & James", "Signature"],
        width=1440,
        height=840,
        font_size=132,
    )
    render_preview(
        ttf_path,
        specimen_preview,
        "Specimen",
        [
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "abcdefghijklmnopqrstuvwxyz",
            "0123456789",
            "Create Something Beautiful",
            "Cursive Text Generator",
        ],
        width=1800,
        height=1080,
        font_size=86,
    )

    specimen_html = ASSET_DIR / "specimen.html"
    specimen_html.write_text(
        f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{family_name} Specimen</title>
  <style>
    @font-face {{
      font-family: '{family_name}';
      src: url('./{DIST_NAME}.woff2') format('woff2');
      font-display: swap;
    }}
    body {{ margin: 0; padding: 48px; font: 16px/1.5 system-ui, sans-serif; background: #fbfaf7; color: #17201b; }}
    h1 {{ margin: 0 0 18px; font-size: 32px; }}
    .sample {{ margin: 24px 0; padding: 24px; border: 1px solid #dfe6df; border-radius: 18px; background: white; font-family: '{family_name}', cursive; font-size: 48px; }}
  </style>
</head>
<body>
  <h1>{family_name}</h1>
  <div class="sample">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
  <div class="sample">abcdefghijklmnopqrstuvwxyz</div>
  <div class="sample">0123456789</div>
  <div class="sample">Beautiful Things</div>
  <div class="sample">Olivia &amp; James</div>
  <div class="sample">Create Something Beautiful</div>
  <div class="sample">Signature</div>
  <div class="sample">Cursive Text Generator</div>
</body>
</html>
""",
        encoding="utf-8",
    )

    zip_path = ASSET_DIR / f"{DIST_NAME}.zip"
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for item in [ttf_path, otf_path, woff2_path, license_path, readme_path]:
            archive.write(item, arcname=item.name)
        archive.write(primary_preview, arcname="preview-primary.png")
        archive.write(specimen_preview, arcname="preview-specimen.png")

    report = {
        "family_name": family_name,
        "postscript_name": ps_name,
        "glyph_count": len(glyph_order),
        "required_characters": "".join(sorted(charmap.keys())),
        "outputs": [str(ttf_path), str(otf_path), str(woff2_path), str(zip_path)],
        "kerning_pair_count": len(kerning_pairs),
    }
    (ASSET_DIR / "build-report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    if PUBLIC_ASSET_DIR.exists():
        shutil.rmtree(PUBLIC_ASSET_DIR)
    shutil.copytree(ASSET_DIR, PUBLIC_ASSET_DIR)
    for target_dir in (PUBLIC_PREVIEW_DIR,):
        target_dir.mkdir(parents=True, exist_ok=True)
    shutil.copy2(primary_preview, PUBLIC_PREVIEW_DIR / primary_preview.name)
    shutil.copy2(specimen_preview, PUBLIC_PREVIEW_DIR / specimen_preview.name)

    ttf_font = TTFont(str(ttf_path))
    name_table_font = ttf_font["name"]
    validations = {
        "family_name": name_table_font.getDebugName(1),
        "full_name": name_table_font.getDebugName(4),
        "postscript_name": name_table_font.getDebugName(6),
        "glyph_order_unique": len(ttf_font.getGlyphOrder()) == len(set(ttf_font.getGlyphOrder())),
        "contains_required_strings": all(ord(char) in ttf_font.getBestCmap() for char in "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"),
    }
    (ASSET_DIR / "validation.json").write_text(json.dumps(validations, indent=2), encoding="utf-8")
    shutil.copy2(ASSET_DIR / "validation.json", PUBLIC_ASSET_DIR / "validation.json")


if __name__ == "__main__":
    build()
