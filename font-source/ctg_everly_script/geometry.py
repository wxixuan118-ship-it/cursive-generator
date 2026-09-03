"""Skeleton-to-outline geometry for CTG Everly Script.

Letters are authored as pen skeletons: a list of points that a nib travels
through, plus a width profile.  This module turns a skeleton into a closed
polygon that traces the edge of the nib, including round caps.  Overlapping
polygons are merged later by FontForge's remove-overlap pass.

Pure standard library so it can be imported both from the FontForge
interpreter and from the project virtualenv.
"""

from __future__ import annotations

import math

# Sampling resolution along a skeleton, in font units.  The units-per-em is
# 1000, so ~3 units keeps the polygon well under a pixel of error at any
# realistic rendering size while staying cheap to union.
STEP = 3.0
CAP_SEGMENTS = 14


def _hermite(p0, p1, p2, p3, t, tension):
    """Position and tangent of the Catmull-Rom segment p1 -> p2 at t."""
    m1 = (tension * (p2[0] - p0[0]) * 0.5, tension * (p2[1] - p0[1]) * 0.5)
    m2 = (tension * (p3[0] - p1[0]) * 0.5, tension * (p3[1] - p1[1]) * 0.5)
    t2 = t * t
    t3 = t2 * t
    h00 = 2 * t3 - 3 * t2 + 1
    h10 = t3 - 2 * t2 + t
    h01 = -2 * t3 + 3 * t2
    h11 = t3 - t2
    d00 = 6 * t2 - 6 * t
    d10 = 3 * t2 - 4 * t + 1
    d01 = -6 * t2 + 6 * t
    d11 = 3 * t2 - 2 * t
    pos = (
        h00 * p1[0] + h10 * m1[0] + h01 * p2[0] + h11 * m2[0],
        h00 * p1[1] + h10 * m1[1] + h01 * p2[1] + h11 * m2[1],
    )
    tan = (
        d00 * p1[0] + d10 * m1[0] + d01 * p2[0] + d11 * m2[0],
        d00 * p1[1] + d10 * m1[1] + d01 * p2[1] + d11 * m2[1],
    )
    return pos, tan


def _smoothstep(t):
    return t * t * (3 - 2 * t)


def sample(points, widths, closed=False, tension=1.0):
    """Walk the skeleton, returning (point, unit tangent, width) triples."""
    n = len(points)
    if n < 2:
        raise ValueError("a skeleton needs at least two points")

    def node(i):
        if closed:
            return points[i % n]
        if i < 0:
            return (2 * points[0][0] - points[1][0], 2 * points[0][1] - points[1][1])
        if i >= n:
            return (2 * points[-1][0] - points[-2][0], 2 * points[-1][1] - points[-2][1])
        return points[i]

    out = []
    last = n if closed else n - 1
    for i in range(last):
        p0, p1, p2, p3 = node(i - 1), node(i), node(i + 1), node(i + 2)
        span = math.hypot(p2[0] - p1[0], p2[1] - p1[1])
        steps = max(4, int(span / STEP))
        w1 = widths[i % n]
        w2 = widths[(i + 1) % n]
        for s in range(steps):
            t = s / steps
            pos, tan = _hermite(p0, p1, p2, p3, t, tension)
            length = math.hypot(tan[0], tan[1]) or 1.0
            out.append((pos, (tan[0] / length, tan[1] / length),
                        w1 + (w2 - w1) * _smoothstep(t)))
    if not closed:
        # Close out on the final segment, not the one past it: sampling the
        # segment beyond the path would land on the reflected virtual point.
        pos, tan = _hermite(node(n - 3), node(n - 2), node(n - 1), node(n), 1.0, tension)
        length = math.hypot(tan[0], tan[1]) or 1.0
        out.append((pos, (tan[0] / length, tan[1] / length), widths[-1]))
    return out


def _modulate(tangent, contrast):
    """Pen pressure: downstrokes swell, upstrokes thin out."""
    return 1.0 + contrast * (-tangent[1])


def _arc(center, radius, a0, a1, segments=CAP_SEGMENTS):
    return [
        (center[0] + radius * math.cos(a0 + (a1 - a0) * k / segments),
         center[1] + radius * math.sin(a0 + (a1 - a0) * k / segments))
        for k in range(segments + 1)
    ]


def _signed_area(poly):
    total = 0.0
    for i in range(len(poly)):
        x0, y0 = poly[i]
        x1, y1 = poly[(i + 1) % len(poly)]
        total += x0 * y1 - x1 * y0
    return total * 0.5


def _ccw(poly):
    return poly if _signed_area(poly) >= 0 else list(reversed(poly))


def stroke_contours(points, widths, closed=False, tension=1.0, contrast=0.0):
    """Return the closed contour(s) covered by a nib run along the skeleton."""
    samples = sample(points, widths, closed=closed, tension=tension)
    left, right = [], []
    for pos, tan, width in samples:
        half = 0.5 * width * _modulate(tan, contrast)
        nx, ny = -tan[1], tan[0]
        left.append((pos[0] + nx * half, pos[1] + ny * half))
        right.append((pos[0] - nx * half, pos[1] - ny * half))

    if closed:
        return [_ccw(left), list(reversed(_ccw(right)))]

    start_pos, start_tan, start_w = samples[0]
    end_pos, end_tan, end_w = samples[-1]
    start_r = 0.5 * start_w * _modulate(start_tan, contrast)
    end_r = 0.5 * end_w * _modulate(end_tan, contrast)
    end_angle = math.atan2(end_tan[1], end_tan[0])
    start_angle = math.atan2(start_tan[1], start_tan[0])

    poly = list(left)
    poly += _arc(end_pos, end_r, end_angle + math.pi / 2, end_angle - math.pi / 2)
    poly += list(reversed(right))
    poly += _arc(start_pos, start_r, start_angle - math.pi / 2, start_angle - 3 * math.pi / 2)
    return [_ccw(poly)]


def ellipse_contour(cx, cy, rx, ry, segments=48):
    return [_ccw([
        (cx + rx * math.cos(2 * math.pi * k / segments),
         cy + ry * math.sin(2 * math.pi * k / segments))
        for k in range(segments)
    ])]


def arc_points(cx, cy, rx, ry, a0, a1, count=9):
    """Skeleton points along an elliptical arc, angles in degrees."""
    return [
        (cx + rx * math.cos(math.radians(a0 + (a1 - a0) * k / (count - 1))),
         cy + ry * math.sin(math.radians(a0 + (a1 - a0) * k / (count - 1))))
        for k in range(count)
    ]


def shear(points, slant):
    return [(x + slant * y, y) for x, y in points]
