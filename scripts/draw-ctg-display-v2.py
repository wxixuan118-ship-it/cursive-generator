#!/usr/bin/env fontforge
"""Source generator for the hand-drawn CTG Display v2 font project.

This file intentionally starts a new FontForge source instead of modifying the
earlier procedural signature font. Glyph outlines are authored here as editable
vectors and saved as an SFD before any release formats are generated.
"""

import fontforge


FONT_NAME = "CTG Display"
OUTPUT = "font-source/ctg_display_v2/CTGDisplay-Regular.sfd"
TEST_TTF = "font-source/ctg_display_v2/CTGDisplay-Regular-test.ttf"


def setup_font():
    font = fontforge.font()
    font.familyname = FONT_NAME
    font.fullname = "CTG Display Regular"
    font.fontname = "CTGDisplay-Regular"
    font.version = "0.1"
    font.em = 1000
    font.ascent = 800
    font.descent = 200
    font.copyright = "Copyright 2026 Cursive Text Generator"
    return font


def rounded_rect(pen, left, bottom, right, top, radius):
    """Draw a rounded rectangular terminal using cubic Bezier curves."""
    control = radius * 0.55228475
    pen.moveTo((left + radius, bottom))
    pen.lineTo((right - radius, bottom))
    pen.curveTo((right - radius + control, bottom), (right, bottom + radius - control), (right, bottom + radius))
    pen.lineTo((right, top - radius))
    pen.curveTo((right, top - radius + control), (right - radius + control, top), (right - radius, top))
    pen.lineTo((left + radius, top))
    pen.curveTo((left + radius - control, top), (left, top - radius + control), (left, top - radius))
    pen.lineTo((left, bottom + radius))
    pen.curveTo((left, bottom + radius - control), (left + radius - control, bottom), (left + radius, bottom))
    pen.closePath()


def add_control_glyphs(font):
    # These control glyphs lock the approved system's decisions: A and M end
    # cleanly without underscoring; U is an uppercase bowl with no exit tail.
    for codepoint, name, width in ((65, "A", 720), (77, "M", 850), (85, "U", 740)):
        glyph = font.createChar(codepoint, name)
        glyph.width = width
        pen = glyph.glyphPen()
        if name == "A":
            rounded_rect(pen, 88, 64, 204, 700, 58)
            rounded_rect(pen, 496, 64, 612, 700, 58)
            rounded_rect(pen, 174, 306, 532, 410, 52)
        elif name == "M":
            rounded_rect(pen, 78, 64, 194, 700, 58)
            rounded_rect(pen, 656, 64, 772, 700, 58)
            rounded_rect(pen, 236, 384, 350, 700, 56)
            rounded_rect(pen, 500, 384, 614, 700, 56)
        else:
            rounded_rect(pen, 88, 244, 204, 700, 58)
            rounded_rect(pen, 536, 244, 652, 700, 58)
            rounded_rect(pen, 154, 64, 586, 180, 58)


font = setup_font()
add_control_glyphs(font)
font.save(OUTPUT)
font.generate(TEST_TTF)
