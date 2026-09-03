"""Quality checks for the CTG Everly Script release.

    ./.venv/bin/python scripts/validate-everly-script.py

Writes font-release/validation-report.json and prints a summary. Exits non-zero
if any check fails.
"""

from __future__ import annotations

import json
import os
import sys

from fontTools.ttLib import TTFont
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.recordingPen import RecordingPen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "font-release")
sys.path.insert(0, os.path.join(ROOT, "font-source", "ctg_everly_script"))

BLANK = {"space", "uni00A0", "nbspace", "nonbreakingspace", ".notdef", "uni200B"}

REQUIRED_RANGES = [
    ("Basic Latin letters", list(range(0x41, 0x5B)) + list(range(0x61, 0x7B))),
    ("Digits", list(range(0x30, 0x3A))),
    ("ASCII punctuation", [c for c in range(0x20, 0x7F)
                           if not (0x30 <= c <= 0x39 or 0x41 <= c <= 0x5A or 0x61 <= c <= 0x7A)]),
    ("Latin-1 Supplement", list(range(0xA0, 0x100))),
    ("Typographic punctuation", [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D,
                                 0x2022, 0x2026, 0x2039, 0x203A, 0x20AC, 0x2122]),
]


def check_font(path, results):
    tag = os.path.basename(path)
    font = TTFont(path)
    cmap = font.getBestCmap()
    glyphset = font.getGlyphSet()
    order = font.getGlyphOrder()
    fails, warns = [], []

    for table in ("head", "hhea", "maxp", "OS/2", "name", "cmap", "post", "hmtx"):
        if table not in font:
            fails.append("%s: missing required table %s" % (tag, table))
    outlines = "glyf" if "glyf" in font else ("CFF " if "CFF " in font else None)
    if outlines is None:
        fails.append("%s: no glyf or CFF outline table" % tag)

    # Every encoded glyph must actually carry ink.
    empty = []
    for code, name in cmap.items():
        if name in BLANK:
            continue
        pen = RecordingPen()
        glyphset[name].draw(pen)
        if not pen.value:
            empty.append("U+%04X %s" % (code, name))
    if empty:
        fails.append("%s: %d encoded glyphs draw nothing: %s"
                     % (tag, len(empty), ", ".join(empty[:12])))

    # Nothing may spill outside the vertical space the font declares.
    win_asc = font["OS/2"].usWinAscent
    win_desc = -font["OS/2"].usWinDescent
    clipped, wide = [], []
    for name in order:
        if name in BLANK:
            continue
        bounds = BoundsPen(glyphset)
        try:
            glyphset[name].draw(bounds)
        except Exception as exc:
            fails.append("%s: %s failed to draw (%s)" % (tag, name, exc))
            continue
        if bounds.bounds is None:
            continue
        x0, y0, x1, y1 = bounds.bounds
        if y1 > win_asc or y0 < win_desc:
            clipped.append("%s (%d..%d)" % (name, y0, y1))
        width = font["hmtx"][name][0]
        if width <= 0:
            fails.append("%s: %s has advance width %d" % (tag, name, width))
        if x1 - x0 > 1600 or y1 - y0 > 1600:
            wide.append(name)
    if clipped:
        fails.append("%s: %d glyphs clip the win metrics: %s"
                     % (tag, len(clipped), ", ".join(clipped[:10])))
    if wide:
        fails.append("%s: %d glyphs are implausibly large: %s"
                     % (tag, len(wide), ", ".join(wide[:10])))

    # Contour hygiene (TrueType only: CFF charstrings are checked by fontTools
    # on load, and a broken one would already have raised above).
    if outlines == "glyf":
        stubs, heavy = [], []
        glyf = font["glyf"]
        for name in order:
            g = glyf[name]
            if g.numberOfContours <= 0:
                continue
            coords, ends, _ = g.getCoordinates(glyf)
            start = 0
            for end in ends:
                if end - start + 1 < 3:
                    stubs.append(name)
                    break
                start = end + 1
            if len(coords) > 900:
                heavy.append("%s(%d)" % (name, len(coords)))
        if stubs:
            fails.append("%s: contours with fewer than 3 points: %s"
                         % (tag, ", ".join(sorted(set(stubs))[:10])))
        if heavy:
            warns.append("%s: heavy glyphs: %s" % (tag, ", ".join(heavy[:8])))

    # Coverage
    coverage = {}
    for label, codes in REQUIRED_RANGES:
        missing = [c for c in codes if c not in cmap]
        coverage[label] = {"required": len(codes), "present": len(codes) - len(missing),
                           "missing": ["U+%04X" % c for c in missing]}
        if missing:
            (fails if label != "Latin-1 Supplement" else warns).append(
                "%s: %s missing %d of %d (%s)"
                % (tag, label, len(missing), len(codes),
                   " ".join("U+%04X" % c for c in missing[:14])))

    # Features
    feature_tags = set()
    for table_tag in ("GSUB", "GPOS"):
        if table_tag in font:
            for record in font[table_tag].table.FeatureList.FeatureRecord:
                feature_tags.add(record.FeatureTag)
    for wanted in ("calt", "dlig", "kern"):
        if wanted not in feature_tags:
            fails.append("%s: feature '%s' is missing" % (tag, wanted))

    # Name table
    names = {r.nameID: r.toUnicode() for r in font["name"].names}
    for nid, label in ((1, "family"), (2, "subfamily"), (4, "full name"),
                       (5, "version"), (6, "postscript name"), (13, "licence")):
        if nid not in names or not names[nid].strip():
            fails.append("%s: name record %d (%s) is empty" % (tag, nid, label))

    results[tag] = {
        "outlines": outlines,
        "glyphs": len(order),
        "encoded": len(cmap),
        "unitsPerEm": font["head"].unitsPerEm,
        "features": sorted(feature_tags),
        "coverage": coverage,
        "failures": fails,
        "warnings": warns,
    }
    font.close()
    return fails


def check_joins(results):
    """The whole cursive depends on every letter meeting at the same point."""
    import design
    problems = []
    for name, letter in design.LOWER.items():
        entry, exit_pts, adv = letter["entry"], letter["exit"], letter["adv"]
        if tuple(entry[0]) != (0, design.CONN):
            problems.append("%s entry starts at %s" % (name, entry[0]))
        if tuple(exit_pts[-1]) != (adv, design.CONN):
            problems.append("%s exit ends at %s, advance is %d"
                            % (name, exit_pts[-1], adv))
    for name, letter in design.UPPER.items():
        if tuple(letter["exit"][-1]) != (letter["adv"], design.CONN):
            problems.append("%s exit ends at %s" % (name, letter["exit"][-1]))
    results["joins"] = {"checked": len(design.LOWER) + len(design.UPPER),
                        "failures": problems}
    return problems


def check_rasterises(path, results):
    """Load through FreeType the way an operating system would."""
    from PIL import Image, ImageDraw, ImageFont
    try:
        face = ImageFont.truetype(path, 64)
        image = Image.new("L", (1400, 120), 255)
        ImageDraw.Draw(image).text((10, 10), "Handwritten with Love 0123", font=face, fill=0)
        ink = 255 - min(image.getdata())
        ok = ink > 200
        results.setdefault("rasterise", {})[os.path.basename(path)] = {
            "loaded": True, "drew_ink": bool(ok)}
        return [] if ok else ["%s: FreeType drew no ink" % os.path.basename(path)]
    except Exception as exc:
        results.setdefault("rasterise", {})[os.path.basename(path)] = {
            "loaded": False, "error": str(exc)}
        return ["%s: FreeType could not load the font (%s)" % (os.path.basename(path), exc)]


def main():
    results = {}
    failures = []
    for ext in ("ttf", "otf", "woff2"):
        path = os.path.join(OUT, "CTGEverlyScript-Regular.%s" % ext)
        if not os.path.exists(path):
            failures.append("missing release file: %s" % os.path.basename(path))
            continue
        if ext == "woff2":
            font = TTFont(path)
            results["woff2"] = {"flavor": font.flavor, "glyphs": len(font.getGlyphOrder())}
            font.close()
            continue
        failures += check_font(path, results)
        failures += check_rasterises(path, results)
    failures += check_joins(results)

    for name in ("README.txt", "LICENSE.txt", "specimen/font-preview.png",
                 "specimen/alphabet-preview.png", "specimen/test.html"):
        if not os.path.exists(os.path.join(OUT, name)):
            failures.append("missing release file: %s" % name)

    results["summary"] = {"passed": not failures, "failures": failures}
    with open(os.path.join(OUT, "validation-report.json"), "w") as fh:
        json.dump(results, fh, indent=2)

    for tag, data in results.items():
        if tag in ("summary", "joins", "rasterise", "woff2"):
            continue
        print("%-34s %s outlines, %d glyphs, %d encoded, features %s"
              % (tag, data["outlines"], data["glyphs"], data["encoded"],
                 ",".join(data["features"])))
        for label, cov in data["coverage"].items():
            print("    %-26s %d/%d" % (label, cov["present"], cov["required"]))
        for warn in data["warnings"]:
            print("    warning:", warn)
    print("joins checked:", results["joins"]["checked"],
          "problems:", len(results["joins"]["failures"]))
    if failures:
        print("\nFAILED (%d):" % len(failures))
        for item in failures:
            print("  -", item)
        return 1
    print("\nAll checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
