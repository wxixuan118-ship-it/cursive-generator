/* signature-maker.js — the typed + drawn signature image tool on
   /copy-and-paste-cursive-signature.html.

   Typed signatures are SVG <text> set in real script fonts: the site's two OFL
   fonts (CTG Everly Script, CTG Signature Script) plus six OFL Google Fonts
   loaded by the page. Exports embed the font as a data URI so the PNG/SVG
   stands alone; for Google Fonts only the glyphs of the name are fetched
   (css2 &text=). The draw pad is a plain <canvas> with pointer events; strokes
   are kept as point lists so undo and a trimmed transparent PNG are cheap.
   Nothing leaves the browser. */
(function () {
  'use strict';
  var root = document.querySelector('[data-sig-maker]');
  if (!root) return;

  var NS = 'http://www.w3.org/2000/svg';
  /* size: optical correction so every font reads at a similar height. */
  var FONTS = {
    ev:  { family: 'CTG Everly Script',    url: '/assets/fonts/ctg-everly-script/CTGEverlyScript.woff2' },
    sig: { family: 'CTG Signature Script', url: '/assets/fonts/ctg-signature-script/CTGSignatureScript.woff2' },
    sac: { family: 'Sacramento',           gf: 'Sacramento',           size: 1.15 },
    msd: { family: 'Mrs Saint Delafield',  gf: 'Mrs Saint Delafield',  size: 1.25 },
    ab:  { family: 'Alex Brush',           gf: 'Alex Brush' },
    gv:  { family: 'Great Vibes',          gf: 'Great Vibes' },
    hvm: { family: 'Herr Von Muellerhoff', gf: 'Herr Von Muellerhoff', size: 1.25 },
    all: { family: 'Allura',               gf: 'Allura',               size: 1.05 }
  };
  var INKS = [
    ['#17201b', 'Black'], ['#1b3a8f', 'Blue'], ['#0d2a4a', 'Navy'],
    ['#8b1e1e', 'Red'], ['#2f6b4f', 'Green'], ['#5a3e2b', 'Sepia']
  ];
  /* Each typed style: which font, how much slant, whether a swash underline
     is drawn, and an optional transform of the text itself. */
  var STYLES = [
    { id: 'classic',     name: 'Classic',          font: 'ev' },
    { id: 'sacramento',  name: 'Thin signature',   font: 'sac' },
    { id: 'delafield',   name: 'Fast signature',   font: 'msd' },
    { id: 'underline',   name: 'Swash underline',  font: 'ev', underline: true },
    { id: 'alex-brush',  name: 'Brush pen',        font: 'ab' },
    { id: 'great-vibes', name: 'Elegant',          font: 'gv' },
    { id: 'muellerhoff', name: 'Executive',        font: 'hvm', underline: true },
    { id: 'allura',      name: 'Formal',           font: 'all' },
    { id: 'marker',      name: 'Marker',           font: 'sig' },
    { id: 'slanted',     name: 'Slanted',          font: 'ev', slant: -12 },
    { id: 'initials',    name: 'Initials',         font: 'gv', initials: true },
    { id: 'compact',     name: 'Compact',          font: 'ev', size: 0.82, spacing: -1.5 }
  ];

  var input = root.querySelector('[data-sig-input]');
  var grid = root.querySelector('[data-sig-grid]');
  var inkRow = root.querySelector('[data-sig-inks]');
  var weightSel = root.querySelector('[data-sig-weight]');
  var sizeIn = root.querySelector('[data-sig-size]');
  var sizeOut = root.querySelector('[data-sig-size-out]');
  var toast = document.querySelector('[data-sig-toast]');
  var timer, ink = INKS[0][0], weight = 0, fontPx = sizeIn ? Number(sizeIn.value) || 48 : 48;

  function say(msg) {
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(say.t); say.t = setTimeout(function () { toast.classList.remove('show'); }, 1500);
  }
  function el(n, a) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
  function esc(v) { var d = document.createElement('div'); d.textContent = v; return d.innerHTML; }
  function slug(s) { return (s || 'signature').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'signature'; }

  /* ---------- measuring ---------- */
  var CTX;
  function measure(str, family, size, spacing) {
    if (!CTX) CTX = document.createElement('canvas').getContext('2d');
    CTX.font = size + "px '" + family + "'";
    var m = CTX.measureText(str);
    return { w: m.width + (spacing || 0) * Math.max(0, str.length - 1),
             asc: m.actualBoundingBoxAscent || size * 0.75, desc: m.actualBoundingBoxDescent || size * 0.3,
             left: Math.max(0, m.actualBoundingBoxLeft || 0), right: m.actualBoundingBoxRight || m.width };
  }

  /* ---------- typed signature -> SVG ---------- */
  function textFor(s) {
    var raw = (input.value || '').trim() || 'Your Name';
    if (!s.initials) return raw;
    return raw.split(/\s+/).map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
  }
  function build(s) {
    /* fontPx is the chosen font size; padding and strokes scale with it */
    var k = fontPx / 96, wt = weight * k;
    var f = FONTS[s.font], size = fontPx * (s.size || 1) * (f.size || 1) * (s.initials ? 1.25 : 1);
    var str = textFor(s), sp = s.spacing || 0;
    var m = measure(str, f.family, size, sp);
    /* script swashes overhang the advance width; use the ink box when wider */
    var inkW = Math.max(m.w, m.left + m.right);
    var slant = s.slant || 0, skew = Math.tan(Math.abs(slant) * Math.PI / 180) * (m.asc + m.desc);
    var padX = Math.round(36 * k), padY = Math.round(28 * k);
    var w = Math.ceil(inkW + skew + padX * 2), h = Math.ceil(m.asc + m.desc + padY * 2 + (s.underline ? 22 * k : 0));
    var svg = el('svg', { xmlns: NS, viewBox: '0 0 ' + w + ' ' + h, width: w, height: h, role: 'img',
                          'aria-label': str + ' as a ' + s.name.toLowerCase() + ' signature' });
    var baseline = padY + m.asc, x = padX + m.left + (slant < 0 ? skew : 0);
    var t = el('text', { x: x, y: baseline, 'font-family': "'" + f.family + "'", 'font-size': size, fill: ink });
    if (sp) t.setAttribute('letter-spacing', sp);
    if (weight) { t.setAttribute('stroke', ink); t.setAttribute('stroke-width', wt); t.setAttribute('paint-order', 'stroke'); t.setAttribute('stroke-linejoin', 'round'); }
    if (slant) t.setAttribute('transform', 'skewX(' + slant + ')');
    t.textContent = str; svg.appendChild(t);
    if (s.underline) {
      var y = baseline + Math.max(14 * k, m.desc * 0.55), x1 = padX - 6 * k, x2 = padX + inkW + 10 * k;
      var d = 'M' + x1 + ' ' + (y + 6 * k) + ' C ' + (x1 + inkW * 0.25) + ' ' + (y - 8 * k) + ', ' + (x1 + inkW * 0.6) + ' ' + (y + 10 * k) + ', ' + x2 + ' ' + (y - 2 * k);
      svg.appendChild(el('path', { d: d, fill: 'none', stroke: ink, 'stroke-width': (2.2 + weight) * k, 'stroke-linecap': 'round' }));
    }
    return svg;
  }

  /* ---------- export ---------- */
  function b64(buf) {
    var b = '', u8 = new Uint8Array(buf);
    for (var i = 0; i < u8.length; i += 0x8000) b += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
    return btoa(b);
  }
  var fontCache = {};
  /* Own fonts: the whole woff2. Google Fonts: a subset holding just these glyphs. */
  function fontCss(key, str) {
    var f = FONTS[key], ck = f.gf ? key + '|' + str : key;
    if (!fontCache[ck]) {
      var src = f.gf
        ? fetch('https://fonts.googleapis.com/css2?family=' + encodeURIComponent(f.gf) + '&text=' + encodeURIComponent(str))
            .then(function (r) { return r.text(); })
            .then(function (css) { var u = css.match(/url\((https:[^)]+)\)/); if (!u) throw new Error('no font url'); return fetch(u[1]); })
        : fetch(f.url);
      fontCache[ck] = src.then(function (r) {
        var type = (r.headers.get('content-type') || '').indexOf('ttf') > -1 ? 'truetype' : 'woff2';
        return r.arrayBuffer().then(function (buf) {
          return "@font-face{font-family:'" + f.family + "';src:url(data:font/" + type + ';base64,' + b64(buf) + ") format('" + type + "')}";
        });
      }).catch(function () { delete fontCache[ck]; return ''; });
    }
    return fontCache[ck];
  }
  function svgString(svg, css) {
    var c = svg.cloneNode(true);
    if (css) { var st = el('style', {}); st.textContent = css; c.insertBefore(st, c.firstChild); }
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(c);
  }
  function download(blob, name) {
    var u = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = u; a.download = name; document.body.appendChild(a); a.click();
    document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
  }
  function exportSvg(s, name) {
    fontCss(s.font, textFor(s)).then(function (css) {
      download(new Blob([svgString(build(s), css)], { type: 'image/svg+xml' }), name + '.svg');
      say('SVG downloaded');
    });
  }
  function exportPng(s, name, done) {
    fontCss(s.font, textFor(s)).then(function (css) {
      var svg = build(s), w = +svg.getAttribute('width'), h = +svg.getAttribute('height');
      var url = URL.createObjectURL(new Blob([svgString(svg, css)], { type: 'image/svg+xml;charset=utf-8' })), img = new Image();
      img.onload = function () {
        var sc = 3, cv = document.createElement('canvas');
        cv.width = w * sc; cv.height = h * sc;
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);   /* no fill: transparent background */
        URL.revokeObjectURL(url);
        cv.toBlob(function (b) { download(b, name + '.png'); say('PNG downloaded'); done && done(); }, 'image/png');
      };
      img.onerror = function () { URL.revokeObjectURL(url); say('Export failed'); done && done(); };
      img.src = url;
    });
  }

  /* ---------- render the typed grid ---------- */
  function render() {
    grid.innerHTML = '';
    STYLES.forEach(function (s) {
      var card = document.createElement('article'); card.className = 'sm-card';
      var head = document.createElement('div'); head.className = 'sm-card-head';
      head.innerHTML = '<span class="sm-name">' + esc(s.name) + '</span>';
      var actions = document.createElement('div'); actions.className = 'sm-actions';
      var png = document.createElement('button'); png.type = 'button'; png.className = 'sm-btn'; png.textContent = 'PNG';
      png.setAttribute('aria-label', 'Download ' + s.name + ' signature as PNG');
      var sv = document.createElement('button'); sv.type = 'button'; sv.className = 'sm-btn ghost'; sv.textContent = 'SVG';
      sv.setAttribute('aria-label', 'Download ' + s.name + ' signature as SVG');
      var base = slug(textFor(s)) + '-' + s.id + '-signature';
      png.addEventListener('click', function () { png.disabled = true; exportPng(s, base, function () { png.disabled = false; }); });
      sv.addEventListener('click', function () { exportSvg(s, base); });
      actions.appendChild(png); actions.appendChild(sv); head.appendChild(actions);
      var box = document.createElement('div'); box.className = 'sm-preview';
      var svg = build(s);   /* real pixel size; CSS max-width shrinks it only when wider than the card */
      box.appendChild(svg);
      card.appendChild(head); card.appendChild(box); grid.appendChild(card);
    });
  }

  /* ---------- controls ---------- */
  inkRow.innerHTML = INKS.map(function (c, i) {
    return '<button type="button" class="sm-ink' + (i ? '' : ' active') + '" style="--c:' + c[0] + '" data-ink="' + c[0] + '" aria-label="' + c[1] + ' ink" aria-pressed="' + (i ? 'false' : 'true') + '"></button>';
  }).join('');
  inkRow.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ink]'); if (!b) return;
    ink = b.getAttribute('data-ink');
    Array.prototype.forEach.call(inkRow.querySelectorAll('.sm-ink'), function (x) { var on = x === b; x.classList.toggle('active', on); x.setAttribute('aria-pressed', String(on)); });
    render(); pad.setColor(ink);
  });
  if (weightSel) weightSel.addEventListener('change', function () { weight = Number(weightSel.value) || 0; render(); });
  if (sizeIn) sizeIn.addEventListener('input', function () {
    fontPx = Number(sizeIn.value) || 48;
    if (sizeOut) sizeOut.textContent = fontPx + 'px';
    clearTimeout(timer); timer = setTimeout(render, 40);
  });
  input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(render, 60); });

  /* ---------- draw pad ---------- */
  var pad = (function () {
    var canvas = root.querySelector('[data-sig-pad]');
    if (!canvas) return { setColor: function () {} };
    var ctx = canvas.getContext('2d'), strokes = [], cur = null, color = ink, width = 2.6, dpr = 1;
    var wsel = root.querySelector('[data-pad-width]');
    var hint = root.querySelector('[data-pad-hint]');

    function fit() {
      dpr = Math.min(window.devicePixelRatio || 1, 3);
      var w = canvas.clientWidth || 700, h = Math.max(160, Math.round(w * 0.36));
      canvas.style.height = h + 'px';
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      redraw();
    }
    function line(pts, c, wd, g, scale, ox, oy) {
      if (pts.length < 1) return;
      g.strokeStyle = c; g.lineWidth = wd * scale; g.lineCap = 'round'; g.lineJoin = 'round';
      g.beginPath();
      var p0 = pts[0]; g.moveTo((p0.x - ox) * scale, (p0.y - oy) * scale);
      if (pts.length === 1) { g.lineTo((p0.x - ox) * scale + 0.1, (p0.y - oy) * scale); g.stroke(); return; }
      for (var i = 1; i < pts.length - 1; i++) {
        var a = pts[i], b = pts[i + 1], mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        g.quadraticCurveTo((a.x - ox) * scale, (a.y - oy) * scale, (mx - ox) * scale, (my - oy) * scale);
      }
      var l = pts[pts.length - 1]; g.lineTo((l.x - ox) * scale, (l.y - oy) * scale); g.stroke();
    }
    function redraw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      strokes.forEach(function (s) { line(s.pts, s.color, s.width, ctx, dpr, 0, 0); });
      if (cur) line(cur.pts, cur.color, cur.width, ctx, dpr, 0, 0);
      if (hint) hint.hidden = strokes.length > 0 || !!cur;
    }
    function pos(e) { var r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    canvas.addEventListener('pointerdown', function (e) {
      e.preventDefault(); canvas.setPointerCapture(e.pointerId);
      cur = { pts: [pos(e)], color: color, width: width }; redraw();
    });
    canvas.addEventListener('pointermove', function (e) {
      if (!cur) return; e.preventDefault();
      var p = pos(e), last = cur.pts[cur.pts.length - 1];
      if (Math.abs(p.x - last.x) + Math.abs(p.y - last.y) < 1.2) return;
      cur.pts.push(p); redraw();
    });
    function up() { if (!cur) return; strokes.push(cur); cur = null; redraw(); }
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up); canvas.addEventListener('pointerleave', up);

    root.querySelector('[data-pad-undo]').addEventListener('click', function () { strokes.pop(); redraw(); });
    root.querySelector('[data-pad-clear]').addEventListener('click', function () { strokes = []; redraw(); });
    if (wsel) wsel.addEventListener('change', function () { width = Number(wsel.value) || 2.6; });
    root.querySelector('[data-pad-png]').addEventListener('click', function () {
      if (!strokes.length) { say('Draw your signature first'); return; }
      /* trim to the ink's bounding box, with padding, at 3x */
      var minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
      strokes.forEach(function (s) { s.pts.forEach(function (p) {
        minX = Math.min(minX, p.x - s.width); minY = Math.min(minY, p.y - s.width);
        maxX = Math.max(maxX, p.x + s.width); maxY = Math.max(maxY, p.y + s.width); }); });
      var margin = 16, sc = 3, ox = minX - margin, oy = minY - margin;
      var cv = document.createElement('canvas');
      cv.width = Math.ceil((maxX - minX + margin * 2) * sc); cv.height = Math.ceil((maxY - minY + margin * 2) * sc);
      var g = cv.getContext('2d');
      strokes.forEach(function (s) { line(s.pts, s.color, s.width, g, sc, ox, oy); });
      cv.toBlob(function (b) { download(b, slug(input.value) + '-drawn-signature.png'); say('PNG downloaded'); }, 'image/png');
    });
    window.addEventListener('resize', function () { clearTimeout(fit.t); fit.t = setTimeout(fit, 120); });
    fit();
    return { setColor: function (c) { color = c; } };
  })();

  /* Tabs between typed and drawn panels. */
  Array.prototype.forEach.call(root.querySelectorAll('[data-sig-tab]'), function (tab) {
    tab.addEventListener('click', function () {
      var id = tab.getAttribute('data-sig-tab');
      Array.prototype.forEach.call(root.querySelectorAll('[data-sig-tab]'), function (t) { var on = t === tab; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); });
      Array.prototype.forEach.call(root.querySelectorAll('[data-sig-panel]'), function (p) { p.hidden = p.getAttribute('data-sig-panel') !== id; });
      if (id === 'draw') window.dispatchEvent(new Event('resize'));
    });
  });

  /* Draw once with fallback metrics, then again when the fonts are in, so
     widths are measured on the real glyphs. */
  render();
  if (document.fonts && document.fonts.load) {
    Promise.all(Object.keys(FONTS).map(function (k) { return document.fonts.load("96px '" + FONTS[k].family + "'"); }))
      .then(render, render);
  }
})();
