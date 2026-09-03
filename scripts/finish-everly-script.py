"""Layer OpenType features onto the built outlines and package the release.

Run with the project virtualenv (fontTools + Pillow + brotli):

    .venv/bin/python scripts/finish-everly-script.py
"""

from __future__ import annotations

import json
import os
import sys

from fontTools.ttLib import TTFont
from fontTools.feaLib.builder import addOpenTypeFeatures

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "font-release")
SRC = os.path.join(ROOT, "font-source", "ctg_everly_script")

LOWER = "abcdefghijklmnopqrstuvwxyz"
DOUBLED = ("e", "l", "m", "n", "o", "r", "s", "t", "u", "f", "p", "g", "c")


def glyph_classes(font):
    names = set(font.getGlyphOrder())
    med, init, fina, isol = [], [], [], []
    for name in sorted(names):
        if name.endswith(".init") and name[:-5] in names:
            med.append(name[:-5]); init.append(name)
        elif name.endswith(".fina") and name[:-5] in names:
            fina.append(name)
        elif name.endswith(".isol") and name[:-5] in names:
            isol.append(name)
    med = [n for n in med if n + ".fina" in names and n + ".isol" in names]
    upper_conn = sorted(n[:-5] for n in names
                        if n.endswith(".isol") and n[:-5] in names and n[:-5] not in med)
    upper_isol = [n + ".isol" for n in upper_conn]
    lower_init = [n + ".init" for n in med]
    lower_fina = [n + ".fina" for n in med]
    lower_isol = [n + ".isol" for n in med]
    return med, lower_init, lower_fina, lower_isol, upper_conn, upper_isol


def build_feature_text(font):
    med, init, fina, isol, uconn, uisol = glyph_classes(font)
    names = set(font.getGlyphOrder())
    join = lambda seq: " ".join(seq)

    doubles = []
    for letter in DOUBLED:
        for prev in (letter, letter + ".init"):
            if prev not in names:
                continue
            for cur, alt in ((letter, letter + ".alt"),
                             (letter + ".fina", letter + ".fina.alt")):
                if cur in names and alt in names:
                    doubles.append("    sub %s %s' by %s;" % (prev, cur, alt))

    dlig = []
    for lig, parts in (("t_t", ("t", "t")), ("f_f", ("f", "f"))):
        if lig in names:
            first, second = parts
            for a in (first, first + ".init"):
                for b in (second, second + ".fina"):
                    if a in names and b in names:
                        dlig.append("    sub %s %s by %s;" % (a, b, lig))

    return """
languagesystem DFLT dflt;
languagesystem latn dflt;

@lower_med  = [%s];
@lower_init = [%s];
@lower_fina = [%s];
@lower_isol = [%s];
@upper_conn = [%s];
@upper_isol = [%s];
@joins_left  = [@lower_med @lower_init @upper_conn];
@joins_right = [@lower_med @lower_init @lower_fina @lower_isol];

# Contextual joining.  Letters are drawn with both an entry and an exit stroke
# by default; the lead-in is dropped at the start of a word and the exit is
# swapped for a terminal at the end of one.
feature calt {
    lookup ctg_initial {
        ignore sub @joins_left @lower_med';
        sub @lower_med' by @lower_init;
    } ctg_initial;

    lookup ctg_final {
        ignore sub @lower_med' [@lower_med @lower_init];
        ignore sub @lower_init' [@lower_med @lower_init];
        sub @lower_med' by @lower_fina;
        sub @lower_init' by @lower_isol;
    } ctg_final;

    lookup ctg_capital {
        ignore sub @upper_conn' @joins_right;
        sub @upper_conn' by @upper_isol;
    } ctg_capital;

    # A hand never draws the same letter twice the same way.
    lookup ctg_doubled {
%s
    } ctg_doubled;
} calt;

# Optional joined double-t and double-f, written with one continuous crossbar.
feature dlig {
%s
} dlig;

feature kern {
%s
} kern;
""" % (join(med), join(init), join(fina), join(isol), join(uconn), join(uisol),
       "\n".join(doubles) or "    # none",
       "\n".join(dlig) or "    # none",
       kern_rules(font))


def kern_rules(font):
    """Deliberately sparse: letters join at fixed points, so kerning them
    apart would tear the joins.  Only free-standing neighbours are adjusted."""
    names = set(font.getGlyphOrder())
    terminals = [n for n in ("a.fina", "e.fina", "o.fina", "n.fina", "m.fina",
                             "u.fina", "r.fina", "t.fina", "s.fina", "c.fina",
                             "d.fina", "h.fina", "i.fina", "k.fina", "l.fina",
                             "b.fina", "v.fina", "w.fina", "x.fina", "z.fina")
                 if n in names]
    caps = [c for c in "ABCDEFGHIJKLMNOPQRSTUVWXYZ" if c in names]
    caps_isol = [c + ".isol" for c in caps if c + ".isol" in names]
    rules = []
    if terminals:
        rules.append("    pos [%s] [period comma] -55;" % " ".join(terminals))
        rules.append("    pos [%s] [quoteright quotedblright] -30;" % " ".join(terminals))
    if caps_isol:
        rules.append("    pos [%s] [period comma] -40;" % " ".join(caps_isol))
    rules.append("    pos [parenleft bracketleft braceleft] [%s] -25;" % " ".join(caps))
    rules.append("    pos [%s] [parenright bracketright braceright] -25;" % " ".join(caps))
    rules.append("    pos quoteleft [%s] -20;" % " ".join(caps))
    return "\n".join(rules)


def main():
    fea_path = os.path.join(OUT, "source", "CTGEverlyScript.fea")
    first = TTFont(os.path.join(OUT, "CTGEverlyScript-Regular.ttf"))
    text = build_feature_text(first)
    with open(fea_path, "w") as fh:
        fh.write(text)
    first.close()

    for ext in ("ttf", "otf"):
        path = os.path.join(OUT, "CTGEverlyScript-Regular.%s" % ext)
        font = TTFont(path)
        addOpenTypeFeatures(font, fea_path)
        font.save(path)
        font.close()
        print("features added to", os.path.basename(path))

    web = TTFont(os.path.join(OUT, "CTGEverlyScript-Regular.ttf"))
    web.flavor = "woff2"
    web.save(os.path.join(OUT, "CTGEverlyScript-Regular.woff2"))
    web.close()
    print("woff2 written")


if __name__ == "__main__":
    main()
