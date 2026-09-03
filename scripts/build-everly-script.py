"""Build the CTG Everly Script outlines with FontForge.

    fontforge -quiet -script scripts/build-everly-script.py
    (or simply: python3 scripts/build-everly-script.py, since the Homebrew
     FontForge ships python bindings for the system interpreter)

Outlines, metrics and names are written here; OpenType features are layered on
afterwards by scripts/finish-everly-script.py using fontTools.
"""

from __future__ import annotations

import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "font-source", "ctg_everly_script")
sys.path.insert(0, SRC)

import fontforge
import psMat

import design
import build as pen

OUT = os.path.join(ROOT, "font-release")
os.makedirs(OUT, exist_ok=True)
os.makedirs(os.path.join(OUT, "specimen"), exist_ok=True)
os.makedirs(os.path.join(OUT, "source"), exist_ok=True)

SX, SY = design.SCALE_X, design.SCALE_Y
LOWER_FORMS = ("", ".init", ".fina", ".isol")

font = fontforge.font()
font.encoding = "UnicodeFull"
font.em = design.UPM
font.ascent = 800
font.descent = 200
font.familyname = design.FAMILY
font.fontname = "CTGEverlyScript-Regular"
font.fullname = design.FAMILY
font.weight = "Regular"
font.version = design.VERSION
font.italicangle = 0.0
font.copyright = (
    "Copyright (c) 2026 Cursive Text Generator. "
    "Licensed under the SIL Open Font License, Version 1.1."
)

built = {"lower": [], "upper": [], "other": [], "composed": [], "alt": [], "dlig": []}


# ------------------------------------------------------------------ letters --

def add_lower(name, letter, code):
    variants = pen.forms(letter)
    for suffix in LOWER_FORMS:
        pen.draw(font, name + suffix, letter["adv"], variants[suffix],
                 letter["dots"], code=code if suffix == "" else None)
    built["lower"].append(name)


CAP_WEIGHT = 1.05   # capitals are taller, so the same nib reads lighter


def add_upper(name, letter, code):
    heavy = lambda ws: [w * CAP_WEIGHT for w in ws]
    body = [(pts, heavy(pen.flat(len(pts))), False) for pts in letter["body"]]
    body += [(pts, heavy(pen.flat(len(pts), scale)), False)
             for pts, scale in letter["extras"]]
    exit_pts = letter["exit"]
    joined = body + [(exit_pts, heavy(pen.exit_widths(len(exit_pts))), False)]
    pen.draw(font, name, letter["adv"], joined, letter["dots"], code=code)
    pen.draw(font, name + ".isol", letter["adv"], body, letter["dots"])
    built["upper"].append(name)


def add_other(name, spec):
    strokes = [(pts, pen.flat(len(pts), w), closed) for pts, w, closed in spec["strokes"]]
    pen.draw(font, name, spec["adv"], strokes, spec["dots"], code=spec["code"])
    built["other"].append(name)


for name, letter in design.LOWER.items():
    add_lower(name, letter, ord(name))
for name, letter in design.UPPER.items():
    add_upper(name, letter, ord(name))
for name, spec in design.OTHER.items():
    add_other(name, spec)

# Dotless i and j carry the accents for i-acute and friends.
for base, dotless in (("i", "dotlessi"), ("j", "dotlessj")):
    letter = dict(design.LOWER[base], dots=[])
    variants = pen.forms(letter)
    for suffix in LOWER_FORMS:
        pen.draw(font, dotless + suffix, letter["adv"], variants[suffix],
                 code=(0x131 if base == "i" and suffix == "" else
                       0x237 if base == "j" and suffix == "" else None))
    built["lower"].append(dotless)


# ------------------------------------------------- extra letters (Latin-1) --

def add_letter_shape(name, adv, strokes, code=None, forms_like=None):
    """A letter drawn from scratch; forms_like builds the four joining forms."""
    if forms_like is None:
        pen.draw(font, name, adv, [(p, pen.flat(len(p), w), c) for p, w, c in strokes],
                 code=code)
        return
    spec = dict(forms_like, adv=adv)
    variants = pen.forms(spec)
    for suffix in LOWER_FORMS:
        pen.draw(font, name + suffix, adv, variants[suffix], spec.get("dots", []),
                 code=code if suffix == "" else None)


CONN = design.CONN

# ae / AE / oe / OE / oslash / eth / thorn / germandbls, drawn in design space.
_ae = dict(design.LOWER["a"])
_ae = dict(_ae,
           adv=620,
           body=[design.LOWER["a"]["body"][0],
                 [(266, 348), (270, 200), (276, 64), (300, 12)],
                 [(300, 176), (368, 190), (430, 178), (420, 274), (356, 330),
                  (296, 300), (286, 200), (300, 96), (366, 26), (444, 44)]],
           exit=[(444, 44), (490, 20), (574, 22), (620, CONN)])
add_letter_shape("ae", 620, None, code=0xE6, forms_like=_ae)
built["lower"].append("ae")

_oe = dict(design.LOWER["o"])
_oe = dict(_oe,
           adv=650,
           body=[design.LOWER["o"]["body"][0],
                 [(330, 176), (398, 190), (460, 178), (450, 274), (386, 330),
                  (326, 300), (316, 200), (330, 96), (396, 26), (474, 44)]],
           exit=[(474, 44), (520, 20), (604, 22), (650, CONN)])
add_letter_shape("oe", 650, None, code=0x153, forms_like=_oe)
built["lower"].append("oe")

_oslash = dict(design.LOWER["o"])
_oslash = dict(_oslash, extras=[([(70, 20), (180, 190), (300, 372)], 0.62)])
add_letter_shape("oslash", design.LOWER["o"]["adv"], None, code=0xF8, forms_like=_oslash)
built["lower"].append("oslash")

_eth = dict(design.LOWER["d"])
_eth = dict(_eth, extras=[([(196, 520), (300, 604)], 0.66)])
add_letter_shape("eth", design.LOWER["d"]["adv"], None, code=0xF0, forms_like=_eth)
built["lower"].append("eth")

_thorn = dict(design.LOWER["p"])
_thorn = dict(_thorn,
              body=[[(128, 560), (146, 300), (150, 10), (142, -120), (134, -232)],
                    design.LOWER["p"]["body"][1]],
              entry=[(0, CONN), (46, 190), (102, 380), (128, 560)])
add_letter_shape("thorn", design.LOWER["p"]["adv"], None, code=0xFE, forms_like=_thorn)
built["lower"].append("thorn")

_germandbls = dict(design.LOWER["b"])
_germandbls = dict(
    _germandbls,
    adv=470,
    body=[[(150, 700), (120, 640), (126, 470), (144, 300), (140, 100), (132, -120),
           (110, -222)],
          [(150, 700), (216, 716), (268, 656), (250, 552), (180, 486), (256, 452),
           (312, 380), (302, 250), (232, 176), (166, 190)]],
    entry=[(0, CONN), (44, 220), (104, 470), (150, 700)],
    exit=[(292, 330), (352, 250), (400, 170), (470, CONN)])
add_letter_shape("germandbls", 470, None, code=0xDF, forms_like=_germandbls)
built["lower"].append("germandbls")

# Capitals: AE, OE, Oslash, Eth, Thorn
_AE = dict(design.UPPER["A"])
_AE = dict(_AE, adv=760,
           body=design.UPPER["A"]["body"] + [
               [(392, 596), (312, 662), (398, 676), (540, 662), (620, 640)],
               [(340, 366), (430, 384), (520, 360)],
               [(300, 40), (400, 22), (546, 40), (626, 20)]],
           extras=[], exit=[(626, 20), (680, 8), (708, 24), (760, CONN)])
_UP_EXTRA = {"AE": (0xC6, _AE)}
_OE = dict(design.UPPER["O"])
_OE = dict(_OE, adv=780,
           body=design.UPPER["O"]["body"] + [
               [(400, 640), (480, 668), (620, 654), (700, 630)],
               [(414, 366), (504, 384), (594, 360)],
               [(392, 60), (470, 34), (614, 52), (694, 28)]],
           exit=[(694, 28), (740, 14), (728, 24), (780, CONN)])
_UP_EXTRA["OE"] = (0x152, _OE)
_Oslash = dict(design.UPPER["O"])
_Oslash = dict(_Oslash, extras=[([(110, 30), (290, 340), (470, 662)], 0.6)])
_UP_EXTRA["Oslash"] = (0xD8, _Oslash)
_Eth = dict(design.UPPER["D"])
_Eth = dict(_Eth, extras=[([(96, 356), (230, 380)], 0.68)])
_UP_EXTRA["Eth"] = (0xD0, _Eth)
_Thorn = dict(design.UPPER["P"])
_Thorn = dict(_Thorn,
              body=[[(150, 688), (164, 420), (176, 200), (186, 18)],
                    [(158, 566), (280, 594), (370, 520), (358, 390), (250, 332), (180, 328)]])
_UP_EXTRA["Thorn"] = (0xDE, _Thorn)

for name, (code, spec) in _UP_EXTRA.items():
    add_upper(name, spec, code)


# ----------------------------------------------------------- accented forms --

ACCENTS = {
    "grave": "grave", "acute": "acute", "circumflex": "circumflex",
    "tilde": "tilde", "dieresis": "dieresis", "ring": "ring",
    "macron": "macron", "breve": "breve", "caron": "caron",
    "hungarumlaut": "hungarumlaut", "cedilla": "cedilla", "ogonek": "ogonek",
}

# base letter, accent, unicode  (lowercase are joined, so all four forms are made)
LOWER_ACCENTED = [
    ("a", "grave", 0xE0), ("a", "acute", 0xE1), ("a", "circumflex", 0xE2),
    ("a", "tilde", 0xE3), ("a", "dieresis", 0xE4), ("a", "ring", 0xE5),
    ("c", "cedilla", 0xE7),
    ("e", "grave", 0xE8), ("e", "acute", 0xE9), ("e", "circumflex", 0xEA),
    ("e", "dieresis", 0xEB),
    ("dotlessi", "grave", 0xEC), ("dotlessi", "acute", 0xED),
    ("dotlessi", "circumflex", 0xEE), ("dotlessi", "dieresis", 0xEF),
    ("n", "tilde", 0xF1),
    ("o", "grave", 0xF2), ("o", "acute", 0xF3), ("o", "circumflex", 0xF4),
    ("o", "tilde", 0xF5), ("o", "dieresis", 0xF6),
    ("u", "grave", 0xF9), ("u", "acute", 0xFA), ("u", "circumflex", 0xFB),
    ("u", "dieresis", 0xFC),
    ("y", "acute", 0xFD), ("y", "dieresis", 0xFF),
    ("s", "caron", 0x161), ("z", "caron", 0x17E), ("c", "caron", 0x10D),
    ("a", "macron", 0x101), ("e", "macron", 0x113), ("o", "macron", 0x14D),
    ("u", "macron", 0x16B), ("a", "breve", 0x103), ("e", "ogonek", 0x119),
    ("a", "ogonek", 0x105), ("s", "acute", 0x15B), ("z", "acute", 0x17A),
    ("n", "acute", 0x144), ("l", "acute", 0x13A), ("c", "acute", 0x107),
    ("o", "hungarumlaut", 0x151), ("u", "hungarumlaut", 0x171),
    ("g", "breve", 0x11F), ("s", "cedilla", 0x15F),
]

UPPER_ACCENTED = [
    ("A", "grave", 0xC0), ("A", "acute", 0xC1), ("A", "circumflex", 0xC2),
    ("A", "tilde", 0xC3), ("A", "dieresis", 0xC4), ("A", "ring", 0xC5),
    ("C", "cedilla", 0xC7),
    ("E", "grave", 0xC8), ("E", "acute", 0xC9), ("E", "circumflex", 0xCA),
    ("E", "dieresis", 0xCB),
    ("I", "grave", 0xCC), ("I", "acute", 0xCD), ("I", "circumflex", 0xCE),
    ("I", "dieresis", 0xCF),
    ("N", "tilde", 0xD1),
    ("O", "grave", 0xD2), ("O", "acute", 0xD3), ("O", "circumflex", 0xD4),
    ("O", "tilde", 0xD5), ("O", "dieresis", 0xD6),
    ("U", "grave", 0xD9), ("U", "acute", 0xDA), ("U", "circumflex", 0xDB),
    ("U", "dieresis", 0xDC),
    ("Y", "acute", 0xDD), ("Y", "dieresis", 0x178),
    ("S", "caron", 0x160), ("Z", "caron", 0x17D), ("C", "caron", 0x10C),
    ("A", "macron", 0x100), ("E", "macron", 0x112), ("O", "macron", 0x14C),
    ("U", "macron", 0x16A), ("A", "breve", 0x102), ("E", "ogonek", 0x118),
    ("A", "ogonek", 0x104), ("S", "acute", 0x15A), ("Z", "acute", 0x179),
    ("N", "acute", 0x143), ("L", "acute", 0x139), ("C", "acute", 0x106),
    ("O", "hungarumlaut", 0x150), ("U", "hungarumlaut", 0x170),
    ("G", "breve", 0x11E), ("S", "cedilla", 0x15E),
]

BELOW = {"cedilla", "ogonek"}
GAP_LOWER = 62
GAP_UPPER = 48


def compose(name, base_name, accent_name, code=None):
    base = font[base_name]
    accent = font[accent_name]
    bb, ab = base.boundingBox(), accent.boundingBox()
    if accent_name in BELOW:
        dy = min(bb[1], 0) - ab[3] - 26
        dx = (bb[0] + bb[2]) / 2 - (ab[0] + ab[2]) / 2 - 20
    else:
        gap = GAP_UPPER if base_name[0].isupper() else GAP_LOWER
        dy = bb[3] + gap - ab[1]
        # keep the mark over the letter, following the slant of the design
        dx = (bb[0] + bb[2]) / 2 - (ab[0] + ab[2]) / 2 + design.SLANT * dy * 0.5
    glyph = font.createChar(code if code is not None else -1, name)
    glyph.clear()
    glyph.addReference(base_name)
    glyph.addReference(accent_name, psMat.translate(round(dx), round(dy)))
    glyph.width = base.width
    return glyph


ACCENT_NAMES = {"grave": "grave", "acute": "acute", "circumflex": "circumflex",
                "tilde": "tilde", "dieresis": "dieresis", "ring": "ring",
                "macron": "macron", "breve": "breve", "caron": "caron",
                "hungarumlaut": "hungarumlaut", "cedilla": "cedilla",
                "ogonek": "ogonek"}

UNI_LOWER_NAME = {}
for base, accent, code in LOWER_ACCENTED:
    stem = ("i" if base == "dotlessi" else base)
    name = fontforge.nameFromUnicode(code) or (stem + accent)
    for suffix in LOWER_FORMS:
        compose(name + suffix, base + suffix, ACCENT_NAMES[accent],
                code=code if suffix == "" else None)
    UNI_LOWER_NAME[code] = name
    built["composed"].append(name)

for base, accent, code in UPPER_ACCENTED:
    name = fontforge.nameFromUnicode(code) or (base + accent)
    compose(name, base, ACCENT_NAMES[accent], code=code)
    compose(name + ".isol", base + ".isol", ACCENT_NAMES[accent])
    built["composed"].append(name)


# ------------------------------------------------- superscripts / fractions --

def scaled_copy(name, source, factor, dx, dy, code=None):
    glyph = font.createChar(code if code is not None else -1, name)
    glyph.clear()
    matrix = psMat.compose(psMat.scale(factor), psMat.translate(dx, dy))
    glyph.addReference(source, matrix)
    glyph.width = int(round(font[source].width * factor))
    return glyph


for digit, code in (("one", 0xB9), ("two", 0xB2), ("three", 0xB3)):
    scaled_copy(digit + ".sup", digit, 0.62, 30, 300, code=code)
    built["composed"].append(digit + ".sup")

O_ = design.OTHER
pen.draw(font, "fraction", 380,
         [([(20, -70), (180, 300), (330, 690)], pen.flat(3, 0.72), False)], code=0x2044)
for name, num, den, code in (("onequarter", "one", "four", 0xBC),
                             ("onehalf", "one", "two", 0xBD),
                             ("threequarters", "three", "four", 0xBE)):
    glyph = font.createChar(code, name)
    glyph.clear()
    glyph.addReference(num, psMat.compose(psMat.scale(0.58), psMat.translate(10, 300)))
    glyph.addReference("fraction", psMat.translate(150, 0))
    glyph.addReference(den, psMat.compose(psMat.scale(0.58), psMat.translate(430, -20)))
    glyph.width = 720
    built["composed"].append(name)


# ------------------------------------- doubled-letter alternates (rhythm) --
#
# Real handwriting never repeats a letter identically.  A slightly taller,
# slightly wider copy is substituted for the second of a doubled pair.

DOUBLED = ("e", "l", "m", "n", "o", "r", "s", "t", "u", "f", "p", "g", "c")


def variation(letter):
    lift = 1.045
    def bend(pts):
        return [(x + 5.0, y * lift if y > 40 else y) for x, y in pts]
    out = dict(letter)
    out["body"] = [bend(p) for p in letter["body"]]
    out["extras"] = [(bend(p), w) for p, w in letter["extras"]]
    out["dots"] = [(cx + 5, cy * lift, rx, ry) for cx, cy, rx, ry in letter["dots"]]
    if letter.get("entry"):
        out["entry"] = letter["entry"][:-1] + [bend(letter["entry"][-1:])[0]]
    if letter.get("init"):
        out["init"] = letter["init"][:-1] + [bend(letter["init"][-1:])[0]]
    if letter.get("exit"):
        out["exit"] = [bend(letter["exit"][:1])[0]] + letter["exit"][1:]
    return out


for name in DOUBLED:
    alt = variation(design.LOWER[name])
    variants = pen.forms(alt)
    for suffix in ("", ".fina"):
        pen.draw(font, name + suffix + ".alt", alt["adv"], variants[suffix], alt["dots"])
    built["alt"].append(name)


# --------------------------------------- discretionary ligatures: tt and ff --
#
# Two t's (or two f's) written with one continuous crossbar, the way a hand
# actually writes them.

def ligature(name, first, second, offset, bar):
    letter_a = design.LOWER[first]
    letter_b = design.LOWER[second]
    a = pen.forms(letter_a)[""]
    b = pen.forms(letter_b)[""]
    shift = lambda parts: [([(x + offset, y) for x, y in p], w, c) for p, w, c in parts]
    keep = lambda parts, drop: [s for i, s in enumerate(parts) if i not in drop]
    # drop each letter's own crossbar (the trailing "extras" stroke) and
    # replace it with a single long one
    strokes = keep(a, {len(a) - 2}) + keep(shift(b), {len(b) - 2})
    strokes.append((bar, pen.flat(len(bar), 0.60), False))
    pen.draw(font, name, letter_a["adv"] + offset + (letter_b["adv"] - letter_a["adv"]),
             strokes)
    built["dlig"].append(name)


ligature("t_t", "t", "t", design.LOWER["t"]["adv"],
         [(100, 400), (200, 424), (330, 430), (440, 420), (560, 396)])
ligature("f_f", "f", "f", design.LOWER["f"]["adv"],
         [(74, 182), (190, 206), (330, 210), (450, 200), (594, 176)])


# ------------------------------------------------------------------ metrics --

font.os2_typoascent_add = False
font.os2_typoascent = 760
font.os2_typodescent_add = False
font.os2_typodescent = -240
font.os2_typolinegap = 120
font.hhea_ascent_add = False
font.hhea_ascent = 820
font.hhea_descent_add = False
font.hhea_descent = -260
font.hhea_linegap = 0
font.os2_winascent_add = False
font.os2_winascent = 880
font.os2_windescent_add = False
font.os2_windescent = 300
font.os2_family_class = 0x0A03          # Script / Brush Joined
font.os2_panose = (3, 3, 5, 2, 4, 5, 6, 3, 3, 4)
font.os2_vendor = "CTG "
font.os2_use_typo_metrics = True
font.os2_capheight = int(round(design.CAP * SY))
font.os2_xheight = int(round(design.XH * SY))

font.appendSFNTName("English (US)", "Family", design.FAMILY)
font.appendSFNTName("English (US)", "SubFamily", "Regular")
font.appendSFNTName("English (US)", "Fullname", design.FAMILY)
font.appendSFNTName("English (US)", "PostScriptName", "CTGEverlyScript-Regular")
font.appendSFNTName("English (US)", "UniqueID",
                    "Cursive Text Generator: %s: 2026" % design.FAMILY)
font.appendSFNTName("English (US)", "Version", "Version %s" % design.VERSION)
font.appendSFNTName("English (US)", "Designer", "Cursive Text Generator")
font.appendSFNTName("English (US)", "Manufacturer", "Cursive Text Generator")
font.appendSFNTName("English (US)", "Vendor URL", "https://www.cursive-text-generator.net/")
font.appendSFNTName("English (US)", "Designer URL", "https://www.cursive-text-generator.net/")
font.appendSFNTName("English (US)", "License",
                    "This Font Software is licensed under the SIL Open Font License, "
                    "Version 1.1. This licence is available with a FAQ at "
                    "https://openfontlicense.org")
font.appendSFNTName("English (US)", "License URL", "https://openfontlicense.org")
font.appendSFNTName("English (US)", "Descriptor",
                    "A natural handwritten cursive with flowing joins, contextual "
                    "entry and exit strokes and a light right slant.")
font.appendSFNTName("English (US)", "Sample Text", "Handwritten with Love")

# Latin-1 needs a no-break space and a soft hyphen to be complete.
nbsp = font.createChar(0x00A0, "uni00A0")
nbsp.width = font["space"].width
shy = font.createChar(0x00AD, "uni00AD")
shy.clear()
shy.addReference("hyphen")
shy.width = font["hyphen"].width

notdef = font.createChar(-1, ".notdef")
notdef.width = 300

sfd = os.path.join(OUT, "source", "CTGEverlyScript-Regular.sfd")
font.save(sfd)
font.generate(os.path.join(OUT, "CTGEverlyScript-Regular.ttf"),
              flags=("opentype", "round"))
font.generate(os.path.join(OUT, "CTGEverlyScript-Regular.otf"),
              flags=("opentype", "round"))

with open(os.path.join(ROOT, "font-source", "ctg_everly_script", "build-manifest.json"), "w") as fh:
    json.dump({k: sorted(v) for k, v in built.items()}, fh, indent=2)

print("glyphs:", len(list(font.glyphs())))
print("lower %d  upper %d  other %d  composed %d  alt %d  dlig %d" % (
    len(built["lower"]), len(built["upper"]), len(built["other"]),
    len(built["composed"]), len(built["alt"]), len(built["dlig"])))
