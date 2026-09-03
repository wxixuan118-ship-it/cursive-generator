"""FontForge build driver for CTG Everly Script.

Run with the FontForge python interpreter:

    fontforge -script scripts/build-everly-script.py

Skeletons from design.py are sheared, expanded into nib polygons by
geometry.py, then unioned and refitted with cubic curves by FontForge.
"""

from __future__ import annotations

import os
import sys

import fontforge
import psMat

import design
import geometry

STEM = design.STEM
SLANT = design.SLANT
CONTRAST = design.CONTRAST
SX = design.SCALE_X
SY = design.SCALE_Y


# ------------------------------------------------------------- width ramps --

def ramp(count, start, end):
    if count == 1:
        return [STEM * end]
    return [STEM * (start + (end - start) * i / (count - 1)) for i in range(count)]


def flat(count, scale=1.0):
    return [STEM * scale] * count


def entry_widths(count):
    """Join strokes arrive as a hairline and swell into the letter."""
    return ramp(count, 0.46, 1.0)


def exit_widths(count):
    return ramp(count, 1.0, 0.66)


def final_widths(count):
    return ramp(count, 1.0, 0.22)


# ------------------------------------------------------------ form assembly --

def init_stub(entry):
    """A short tapered lead-in used when a letter opens a word."""
    (x0, y0), (x1, y1) = entry[-2], entry[-1]
    dx, dy = x1 - x0, y1 - y0
    length = (dx * dx + dy * dy) ** 0.5 or 1.0
    back = 74.0 / length
    return [(x1 - dx * back, y1 - dy * back), (x1, y1)]


def default_final(exit_pts, adv):
    """Word-final terminal: the connector lifts off in a light upward flick."""
    return list(exit_pts[:-1]) + [(adv + 4, 150), (adv + 46, 236)]


def forms(letter):
    """Return {form suffix: [(points, widths, closed), ...]} for one letter."""
    adv = letter["adv"]
    weight = letter.get("weight", 1.0)
    body = [(pts, flat(len(pts)), False) for pts in letter["body"]]
    body += [(pts, flat(len(pts), scale), False) for pts, scale in letter["extras"]]

    entry = letter.get("entry")
    stub = letter.get("init") or (init_stub(entry) if entry else None)
    exit_pts = letter.get("exit")
    final_pts = letter.get("final") or (default_final(exit_pts, adv) if exit_pts else None)

    def piece(pts, widths):
        return [(pts, [w * weight for w in widths], False)] if pts else []

    scaled = lambda parts: [(p, [w * weight for w in ws], c) for p, ws, c in parts]
    body = scaled(body)

    return {
        "": piece(entry, entry_widths(len(entry))) + body + piece(exit_pts, exit_widths(len(exit_pts))),
        ".init": piece(stub, ramp(len(stub), 0.40, 1.0)) + body + piece(exit_pts, exit_widths(len(exit_pts))),
        ".fina": piece(entry, entry_widths(len(entry))) + body + piece(final_pts, final_widths(len(final_pts))),
        ".isol": piece(stub, ramp(len(stub), 0.40, 1.0)) + body + piece(final_pts, final_widths(len(final_pts))),
    }


# ------------------------------------------------------------------ drawing --

def _drop_specks(glyph, min_span=12):
    """Discard the pinhole contours remove-overlap can leave at a crossing."""
    layer = glyph.foreground
    keep = fontforge.layer()
    for contour in layer:
        xs = [p.x for p in contour]
        ys = [p.y for p in contour]
        if (max(xs) - min(xs)) >= min_span or (max(ys) - min(ys)) >= min_span:
            keep += contour
    glyph.foreground = keep


def draw(font, name, adv, strokes, dots=(), code=None, simplify=1.1):
    glyph = font.createChar(code if code is not None else -1, name)
    glyph.clear()
    pen = glyph.glyphPen()
    for pts, widths, closed in strokes:
        sheared = geometry.shear([(x * SX, y * SY) for x, y in pts], SLANT)
        for contour in geometry.stroke_contours(sheared, widths, closed=closed,
                                                contrast=CONTRAST):
            pen.moveTo(contour[0])
            for point in contour[1:]:
                pen.lineTo(point)
            pen.closePath()
    for cx, cy, rx, ry in dots:
        cx, cy = cx * SX, cy * SY
        for contour in geometry.ellipse_contour(cx + SLANT * cy, cy, rx, ry):
            pen.moveTo(contour[0])
            for point in contour[1:]:
                pen.lineTo(point)
            pen.closePath()
    pen = None
    glyph.width = int(round(adv * SX))
    glyph.removeOverlap()
    _drop_specks(glyph)
    glyph.round()  # snap away sub-unit noise before curve fitting
    glyph.simplify(simplify, ("smoothcurves", "choosehv"), 0.2)
    glyph.addExtrema()
    glyph.round()
    glyph.canonicalContours()
    glyph.canonicalStart()
    return glyph
