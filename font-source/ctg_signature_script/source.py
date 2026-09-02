from __future__ import annotations

import math


FONT_META = {
    "family_name": "CTG Signature Script",
    "style_name": "Regular",
    "full_name": "CTG Signature Script",
    "postscript_name": "CTGSignatureScript-Regular",
    "designer": "Cursive Text Generator",
    "manufacturer": "Cursive Text Generator",
    "description": (
        "An elegant handwritten cursive script font created by Cursive Text Generator "
        "for signatures, invitations, social graphics, quotes, branding, and creative personal projects."
    ),
    "website": "https://www.cursive-text-generator.net/",
    "version": "Version 1.100",
    "license_name": "SIL Open Font License, Version 1.1",
    "license_url": "https://openfontlicense.org",
    "units_per_em": 1000,
    "ascender": 820,
    "descender": -250,
    "line_gap": 170,
    "x_height": 430,
    "cap_height": 720,
    "default_stroke": 76,
    "slant": 0.18,
}


def stroke(points, width=76, closed=False):
    return {
        "type": "stroke",
        "points": [(float(x), float(y)) for x, y in points],
        "width": float(width),
        "closed": bool(closed),
    }


def ellipse(cx, cy, rx, ry):
    return {
        "type": "ellipse",
        "center": (float(cx), float(cy)),
        "rx": float(rx),
        "ry": float(ry),
    }


def star(cx, cy, outer_radius, inner_radius, points=5):
    outline = []
    for index in range(points * 2):
        radius = outer_radius if index % 2 == 0 else inner_radius
        angle = math.radians(-90 + index * 180 / points)
        outline.append((cx + math.cos(angle) * radius, cy + math.sin(angle) * radius))
    return stroke(outline + [outline[0]], 42, closed=True)


def translate(elements, dx=0, dy=0):
    translated = []
    for element in elements:
        if element["type"] == "stroke":
            translated.append(
                {
                    **element,
                    "points": [(x + dx, y + dy) for x, y in element["points"]],
                }
            )
        else:
            cx, cy = element["center"]
            translated.append({**element, "center": (cx + dx, cy + dy)})
    return translated


def reflect(elements, axis_x, dx=0):
    reflected = []
    for element in elements:
        if element["type"] == "stroke":
            reflected.append(
                {
                    **element,
                    "points": [((axis_x - (x - axis_x)) + dx, y) for x, y in element["points"]],
                }
            )
        else:
            cx, cy = element["center"]
            reflected.append({**element, "center": ((axis_x - (cx - axis_x)) + dx, cy)})
    return reflected


def rotate(elements, angle_deg, origin=(0, 0)):
    angle = math.radians(angle_deg)
    cos_a = math.cos(angle)
    sin_a = math.sin(angle)
    ox, oy = origin
    rotated = []
    for element in elements:
        if element["type"] == "stroke":
            pts = []
            for x, y in element["points"]:
                tx = x - ox
                ty = y - oy
                pts.append((ox + tx * cos_a - ty * sin_a, oy + tx * sin_a + ty * cos_a))
            rotated.append({**element, "points": pts})
        else:
            cx, cy = element["center"]
            tx = cx - ox
            ty = cy - oy
            rotated.append(
                {
                    **element,
                    "center": (ox + tx * cos_a - ty * sin_a, oy + tx * sin_a + ty * cos_a),
                }
            )
    return rotated


def scale(elements, sx=1.0, sy=1.0, origin=(0, 0)):
    ox, oy = origin
    scaled = []
    for element in elements:
        if element["type"] == "stroke":
            pts = [((ox + (x - ox) * sx), (oy + (y - oy) * sy)) for x, y in element["points"]]
            scaled.append({**element, "points": pts, "width": element["width"] * (sx + sy) * 0.5})
        else:
            cx, cy = element["center"]
            scaled.append(
                {
                    **element,
                    "center": (ox + (cx - ox) * sx, oy + (cy - oy) * sy),
                    "rx": element["rx"] * sx,
                    "ry": element["ry"] * sy,
                }
            )
    return scaled


def glyph(advance, *elements):
    return {"advance": int(advance), "elements": [element for element in elements if element]}


def low_entry():
    return [(30, 10), (68, 34), (104, 92)]


def low_exit(x):
    return [(x, 8), (x + 42, 18), (x + 88, 10)]


def shallow_arch(start_x, width=210, peak=430):
    return [
        (start_x, 8),
        (start_x + 24, 154),
        (start_x + 58, peak),
        (start_x + 120, 196),
        (start_x + width, 8),
    ]


def bowl_loop(cx, cy, rx, ry, gap=0):
    pts = []
    start = 170 + gap
    end = 530 - gap
    for step in range(12):
        angle = math.radians(start + (end - start) * step / 11)
        pts.append((cx + math.cos(angle) * rx, cy + math.sin(angle) * ry))
    return pts


def lowercase():
    data = {}

    data["a"] = glyph(
        540,
        stroke(low_entry() + bowl_loop(220, 190, 118, 158, gap=8) + [(292, 44), (364, 28), (442, 14)], 74),
    )
    data["b"] = glyph(
        580,
        stroke([(48, -6), (64, 200), (76, 724), (164, 566), (114, 336), (98, 108), (156, 34), (260, 42), (330, 168), (302, 334), (194, 356)], 76),
        stroke([(194, 356), (256, 350), (336, 258), (308, 118), (220, 16), (128, 16)], 72),
    )
    data["c"] = glyph(
        488,
        stroke([(422, 310), (350, 368), (246, 360), (150, 282), (134, 152), (214, 44), (340, 38), (410, 78)], 72),
    )
    data["d"] = glyph(
        592,
        stroke([(410, 18), (380, 190), (352, 722), (454, 580), (418, 330), (330, 110), (214, 34), (114, 116), (132, 272), (246, 360), (364, 326)], 76),
    )
    data["e"] = glyph(
        498,
        stroke([(76, 150), (146, 58), (286, 34), (390, 98), (330, 166), (220, 184), (122, 172), (148, 290), (270, 364), (402, 292)], 72),
    )
    data["f"] = glyph(
        378,
        stroke([(236, 704), (176, 734), (108, 656), (108, 530), (136, 314), (130, 130), (106, -214)], 72),
        stroke([(36, 452), (134, 478), (252, 440)], 54),
    )
    data["g"] = glyph(
        560,
        stroke(low_entry() + bowl_loop(216, 188, 116, 152, gap=8) + [(308, 40), (354, -4), (366, -128), (316, -220), (212, -236), (138, -178)], 74),
    )
    data["h"] = glyph(
        582,
        stroke([(52, 4), (70, 196), (86, 720), (156, 570), (126, 354), (118, 126), (190, 32), (260, 114), (294, 286), (314, 430), (380, 210), (456, 12), (520, 16)], 74),
    )
    data["i"] = glyph(
        284,
        stroke([(42, 10), (82, 120), (108, 292), (126, 428), (160, 210), (202, 14), (248, 16)], 68),
        ellipse(146, 596, 26, 26),
    )
    data["j"] = glyph(
        304,
        stroke([(92, 430), (122, 206), (140, -20), (122, -178), (68, -236), (12, -214)], 68),
        ellipse(150, 594, 26, 26),
    )
    data["k"] = glyph(
        540,
        stroke([(54, 6), (74, 212), (92, 718), (160, 554), (124, 304), (112, 96)], 74),
        stroke([(334, 438), (232, 316), (122, 196), (202, 126), (312, 40), (430, 10)], 70),
    )
    data["l"] = glyph(
        304,
        stroke([(66, -6), (76, 196), (92, 698), (170, 590), (132, 354), (106, 138), (130, 38), (212, 12), (272, 22)], 74),
    )
    data["m"] = glyph(
        788,
        stroke(
            [(28, 10), (74, 138), (108, 420), (178, 204), (244, 14)]
            + shallow_arch(244, width=196, peak=404)[1:]
            + shallow_arch(440, width=202, peak=396)[1:]
            + [(674, 18), (740, 10)],
            74,
        ),
    )
    data["n"] = glyph(
        584,
        stroke([(34, 10), (80, 136), (110, 420), (182, 200), (252, 14)] + shallow_arch(252, width=204, peak=404)[1:] + [(486, 18), (548, 10)], 74),
    )
    data["o"] = glyph(
        552,
        stroke(bowl_loop(236, 194, 138, 166), 74, closed=True),
    )
    data["p"] = glyph(
        578,
        stroke([(58, -230), (76, -24), (88, 426), (152, 250), (248, 22), (352, 56), (398, 174), (362, 314), (250, 362), (150, 326)], 76),
    )
    data["q"] = glyph(
        570,
        stroke(low_entry() + bowl_loop(218, 188, 118, 152, gap=8) + [(316, 36), (374, -12), (420, -120), (464, -238)], 74),
    )
    data["r"] = glyph(
        410,
        stroke([(36, 10), (82, 146), (110, 420), (160, 250), (176, 116), (204, 50), (264, 168), (352, 236), (406, 210)], 72),
    )
    data["s"] = glyph(
        456,
        stroke([(364, 314), (276, 370), (146, 322), (148, 222), (260, 196), (362, 156), (348, 48), (210, 16), (92, 68)], 70),
    )
    data["t"] = glyph(
        352,
        stroke([(144, 710), (124, 548), (114, 320), (126, 48), (204, 8), (286, 44)], 70),
        stroke([(32, 372), (126, 392), (258, 360)], 54),
    )
    data["u"] = glyph(
        564,
        stroke([(28, 166), (58, 40), (154, 20), (246, 132), (274, 312), (304, 94), (402, 18), (490, 90), (536, 12)], 72),
    )
    data["v"] = glyph(
        542,
        stroke([(32, 302), (84, 72), (174, 18), (286, 322), (394, 16), (502, 12)], 70),
    )
    data["w"] = glyph(
        796,
        stroke([(28, 312), (92, 76), (176, 16), (284, 312), (386, 18), (494, 304), (594, 18), (716, 16), (770, 10)], 70),
    )
    data["x"] = glyph(
        506,
        stroke([(62, 356), (188, 210), (362, 8), (456, 12)], 70),
        stroke([(414, 360), (288, 214), (106, 12), (28, 20)], 70),
    )
    data["y"] = glyph(
        530,
        stroke([(34, 304), (86, 86), (174, 20), (282, 324), (360, 116), (398, -32), (364, -180), (286, -236), (208, -214)], 70),
    )
    data["z"] = glyph(
        506,
        stroke([(78, 322), (224, 348), (384, 314), (238, 164), (110, 18), (274, 26), (432, 14)], 68),
    )
    return data


def uppercase():
    data = {}
    data["A"] = glyph(
        742,
        stroke([(34, 10), (116, 236), (232, 726), (324, 414), (428, 12), (494, 182), (594, 366), (706, 324)], 82),
        stroke([(236, 284), (368, 290), (500, 252)], 56),
    )
    data["B"] = glyph(
        720,
        stroke([(72, 8), (96, 232), (108, 714), (208, 624), (242, 500), (192, 396), (112, 352), (238, 328), (360, 260), (356, 108), (246, 18), (134, 20)], 80),
    )
    data["C"] = glyph(
        708,
        stroke([(620, 606), (516, 704), (310, 706), (126, 548), (94, 292), (216, 60), (448, 30), (620, 140)], 80),
    )
    data["D"] = glyph(
        760,
        stroke([(82, 12), (104, 232), (118, 714), (278, 636), (496, 512), (540, 248), (404, 54), (198, 18), (114, 20)], 80),
    )
    data["E"] = glyph(
        646,
        stroke([(582, 622), (410, 700), (170, 666), (118, 498), (286, 386), (438, 380), (266, 360), (126, 216), (258, 58), (516, 84)], 78),
    )
    data["F"] = glyph(
        612,
        stroke([(584, 624), (408, 704), (188, 658), (134, 472), (178, 224), (202, 14)], 78),
        stroke([(182, 378), (342, 394), (470, 354)], 54),
    )
    data["G"] = glyph(
        742,
        stroke([(644, 596), (530, 704), (312, 706), (122, 542), (104, 286), (250, 48), (494, 64), (604, 208), (482, 270), (342, 258)], 80),
    )
    data["H"] = glyph(
        778,
        stroke([(78, 10), (102, 224), (126, 716), (174, 434), (262, 180), (382, 120), (502, 362), (548, 702), (574, 436), (604, 14), (706, 20)], 80),
    )
    data["I"] = glyph(
        396,
        stroke([(110, 14), (144, 188), (188, 712), (220, 454), (264, 18)], 80),
    )
    data["J"] = glyph(
        500,
        stroke([(406, 700), (370, 398), (344, 154), (266, 22), (130, 18), (56, 112)], 78),
    )
    data["K"] = glyph(
        704,
        stroke([(78, 8), (106, 220), (122, 712), (178, 462), (220, 238), (176, 74)], 80),
        stroke([(628, 680), (470, 486), (232, 286), (338, 198), (498, 80), (650, 18)], 78),
    )
    data["L"] = glyph(
        588,
        stroke([(106, 712), (116, 454), (134, 186), (216, 34), (422, 48), (546, 124)], 78),
    )
    data["M"] = glyph(
        948,
        stroke([(58, 10), (108, 226), (142, 718), (220, 472), (340, 110), (472, 516), (570, 716), (638, 454), (706, 130), (830, 22), (914, 30)], 82),
    )
    data["N"] = glyph(
        808,
        stroke([(72, 10), (116, 230), (148, 716), (236, 462), (358, 194), (504, 16), (588, 308), (662, 716), (702, 462), (742, 20)], 82),
    )
    data["O"] = glyph(
        778,
        stroke(bowl_loop(340, 352, 254, 322), 82, closed=True),
    )
    data["P"] = glyph(
        684,
        stroke([(82, 10), (104, 224), (122, 716), (244, 620), (438, 600), (526, 460), (458, 302), (260, 268), (130, 292)], 80),
    )
    data["Q"] = glyph(
        786,
        stroke(bowl_loop(332, 350, 252, 316), 82, closed=True),
        stroke([(438, 104), (548, -12), (670, -78)], 58),
    )
    data["R"] = glyph(
        720,
        stroke([(80, 10), (104, 232), (124, 714), (250, 622), (448, 598), (536, 458), (468, 308), (252, 272), (140, 288)], 80),
        stroke([(260, 272), (376, 196), (554, 24), (684, 18)], 74),
    )
    data["S"] = glyph(
        676,
        stroke([(556, 612), (424, 714), (194, 668), (142, 498), (300, 408), (476, 346), (562, 206), (452, 44), (226, 16), (76, 110)], 76),
    )
    data["T"] = glyph(
        650,
        stroke([(46, 674), (260, 720), (574, 674)], 56),
        stroke([(314, 716), (308, 470), (296, 18)], 80),
    )
    data["U"] = glyph(
        760,
        stroke([(92, 706), (110, 458), (114, 204), (236, 28), (468, 28), (618, 194), (660, 700)], 80),
    )
    data["V"] = glyph(
        722,
        stroke([(96, 704), (196, 420), (332, 18), (530, 430), (658, 706)], 82),
    )
    data["W"] = glyph(
        1024,
        stroke([(94, 704), (174, 404), (282, 18), (452, 414), (560, 704), (656, 404), (772, 18), (934, 706)], 82),
    )
    data["X"] = glyph(
        722,
        stroke([(112, 706), (310, 412), (578, 16)], 78),
        stroke([(596, 706), (382, 402), (126, 16)], 78),
    )
    data["Y"] = glyph(
        698,
        stroke([(108, 706), (246, 444), (388, 284), (546, 706)], 78),
        stroke([(388, 284), (354, 124), (318, 16)], 74),
    )
    data["Z"] = glyph(
        696,
        stroke([(132, 688), (360, 716), (608, 662), (400, 398), (168, 28), (404, 40), (634, 18)], 76),
    )
    return data


def digits():
    return {
        "zero": glyph(594, stroke(bowl_loop(246, 258, 154, 230), 78, closed=True)),
        "one": glyph(334, stroke([(88, 470), (168, 562), (196, 20), (274, 28)], 72)),
        "two": glyph(540, stroke([(98, 392), (184, 518), (340, 528), (418, 438), (356, 314), (210, 180), (110, 42), (290, 30), (460, 56)], 72)),
        "three": glyph(546, stroke([(128, 456), (248, 536), (384, 508), (378, 364), (236, 304), (360, 280), (442, 178), (360, 46), (202, 22), (88, 100)], 72)),
        "four": glyph(586, stroke([(416, 548), (156, 228), (520, 228)], 72), stroke([(390, 676), (398, 340), (390, 22)], 66)),
        "five": glyph(534, stroke([(420, 518), (222, 514), (188, 324), (300, 338), (426, 286), (442, 134), (324, 26), (160, 26), (74, 106)], 72)),
        "six": glyph(560, stroke([(426, 496), (314, 548), (176, 470), (122, 312), (182, 100), (334, 20), (450, 120), (412, 266), (286, 320), (152, 270)], 74)),
        "seven": glyph(524, stroke([(100, 530), (466, 530), (272, 286), (160, 20)], 72)),
        "eight": glyph(566, stroke(bowl_loop(248, 414, 136, 112), 70, closed=True), stroke(bowl_loop(256, 140, 146, 122), 70, closed=True)),
        "nine": glyph(560, stroke([(430, 296), (368, 456), (218, 512), (108, 404), (144, 248), (270, 212), (398, 268), (432, 120), (350, 18), (224, -4)], 74)),
    }


def punctuation():
    quote = [ellipse(82, 520, 20, 28), stroke([(92, 492), (78, 438), (54, 394)], 34)]
    dbl_quote = quote + translate(quote, 86, 0)
    return {
        "space": glyph(320),
        "period": glyph(208, ellipse(88, 34, 24, 24)),
        "comma": glyph(228, ellipse(96, 42, 22, 26), stroke([(104, 20), (90, -32), (62, -74)], 34)),
        "semicolon": glyph(246, ellipse(98, 250, 20, 20), ellipse(100, 38, 22, 26), stroke([(108, 14), (92, -38), (64, -78)], 34)),
        "colon": glyph(236, ellipse(94, 252, 20, 20), ellipse(96, 40, 20, 20)),
        "exclam": glyph(250, stroke([(108, 660), (102, 392), (94, 154)], 56), ellipse(96, 34, 22, 22)),
        "question": glyph(428, stroke([(102, 532), (180, 650), (326, 642), (382, 532), (330, 436), (230, 378), (202, 266), (206, 188)], 62), ellipse(202, 38, 22, 22)),
        "apostrophe": glyph(176, *quote),
        "quotedbl": glyph(274, *dbl_quote),
        "parenleft": glyph(274, stroke([(202, 696), (126, 540), (90, 344), (118, 146), (196, -28)], 54)),
        "parenright": glyph(274, stroke([(94, 696), (170, 540), (206, 344), (178, 146), (100, -28)], 54)),
        "hyphen": glyph(320, stroke([(64, 188), (256, 188)], 44)),
        "underscore": glyph(404, stroke([(42, -54), (360, -54)], 42)),
        "ampersand": glyph(688, stroke([(538, 120), (412, 24), (252, 44), (166, 160), (236, 276), (418, 414), (522, 520), (458, 640), (302, 656), (182, 584), (166, 434), (274, 310), (530, 118), (644, 14)], 70)),
        "at": glyph(848, stroke([(690, 202), (656, 70), (536, 24), (406, 72), (378, 194), (454, 310), (584, 332), (664, 280), (694, 184), (666, 72), (550, -10), (314, 16), (136, 166), (124, 402), (274, 598), (520, 614), (716, 482)], 62)),
        "numbersign": glyph(624, stroke([(208, 642), (138, 20)], 48), stroke([(420, 642), (350, 20)], 48), stroke([(92, 424), (530, 424)], 44), stroke([(70, 228), (506, 228)], 44)),
        "dollar": glyph(540, stroke([(274, 720), (264, -66)], 44), stroke([(392, 586), (300, 650), (180, 618), (138, 500), (246, 438), (366, 386), (404, 262), (306, 126), (170, 102), (96, 164)], 64)),
        "percent": glyph(710, stroke([(140, 650), (560, 42)], 44), stroke(bowl_loop(172, 502, 74, 86), 46, closed=True), stroke(bowl_loop(524, 182, 74, 86), 46, closed=True)),
        "plus": glyph(490, stroke([(246, 398), (246, 66)], 44), stroke([(82, 234), (408, 234)], 44)),
        "slash": glyph(392, stroke([(104, -38), (298, 682)], 46)),
        "equal": glyph(504, stroke([(96, 310), (410, 310)], 38), stroke([(96, 172), (410, 172)], 38)),
        "bracketleft": glyph(270, stroke([(204, 692), (118, 692), (118, -20), (204, -20)], 44)),
        "bracketright": glyph(270, stroke([(70, 692), (156, 692), (156, -20), (70, -20)], 44)),
        "endash": glyph(458, stroke([(62, 188), (394, 188)], 42)),
        "emdash": glyph(674, stroke([(62, 188), (610, 188)], 42)),
        "degree": glyph(244, stroke(bowl_loop(98, 526, 54, 54), 42, closed=True)),
        "copyright": glyph(776, stroke(bowl_loop(334, 330, 250, 250), 48, closed=True), stroke([(472, 466), (376, 528), (252, 492), (194, 362), (224, 224), (338, 162), (462, 194)], 52)),
        "registered": glyph(786, stroke(bowl_loop(334, 330, 256, 256), 48, closed=True), stroke([(244, 180), (258, 488), (396, 486), (458, 396), (392, 314), (262, 316), (452, 174)], 48)),
        "quotedblleft": glyph(274, *rotate(dbl_quote, 180, origin=(130, 470))),
        "quotedblright": glyph(274, *dbl_quote),
        "minus": glyph(320, stroke([(64, 188), (256, 188)], 44)),
        "ampersand.alt": glyph(688, stroke([(538, 120), (412, 24), (252, 44), (166, 160), (236, 276), (418, 414), (522, 520), (458, 640), (302, 656), (182, 584), (166, 434), (274, 310), (530, 118), (644, 14)], 70)),
        "blackstar": glyph(660, star(322, 350, 268, 112)),
        "sparkle": glyph(520, stroke([(260, 650), (294, 384), (474, 350), (294, 316), (260, 50), (226, 316), (46, 350), (226, 384), (260, 650)], 48, closed=True)),
        "smile": glyph(
            760,
            stroke(bowl_loop(330, 340, 266, 266), 48, closed=True),
            ellipse(240, 448, 26, 36),
            ellipse(420, 448, 26, 36),
            stroke([(178, 250), (256, 164), (334, 148), (418, 170), (486, 256)], 52),
        ),
    }


def build_source():
    glyphs = {}
    glyphs.update(uppercase())
    glyphs.update(lowercase())
    glyphs.update(digits())
    glyphs.update(punctuation())

    charmap = {
        " ": "space",
        ".": "period",
        ",": "comma",
        ";": "semicolon",
        ":": "colon",
        "!": "exclam",
        "?": "question",
        "'": "apostrophe",
        '"': "quotedbl",
        "(": "parenleft",
        ")": "parenright",
        "-": "hyphen",
        "_": "underscore",
        "&": "ampersand",
        "@": "at",
        "#": "numbersign",
        "$": "dollar",
        "%": "percent",
        "+": "plus",
        "/": "slash",
        "=": "equal",
        "[": "bracketleft",
        "]": "bracketright",
        "\u2013": "endash",
        "\u2014": "emdash",
        "\u00a9": "copyright",
        "\u00ae": "registered",
        "\u00b0": "degree",
        "\u201c": "quotedblleft",
        "\u201d": "quotedblright",
        "\u2605": "blackstar",
        "\u2726": "sparkle",
        "\u263a": "smile",
    }
    for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
        charmap[letter] = letter
    for letter in "abcdefghijklmnopqrstuvwxyz":
        charmap[letter] = letter
    for digit_name, digit in zip(
        ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
        "0123456789",
    ):
        charmap[digit] = digit_name

    kerning = {
        ("T", "h"): -40,
        ("T", "o"): -36,
        ("T", "e"): -34,
        ("V", "a"): -42,
        ("V", "o"): -34,
        ("W", "a"): -28,
        ("Y", "o"): -52,
        ("Y", "a"): -46,
        ("A", "T"): -20,
        ("A", "V"): -26,
        ("A", "W"): -20,
        ("F", "o"): -22,
        ("L", "T"): -28,
        ("P", "a"): -18,
        ("r", "a"): -12,
        ("r", "o"): -12,
        ("f", "o"): -10,
    }

    return FONT_META, glyphs, charmap, kerning
