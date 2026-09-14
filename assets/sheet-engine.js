/* sheet-engine.js — shared renderer for the printable cursive worksheets
   (/cursive-alphabet-practice-sheet.html, /printable-cursive-handwriting-practice-sheets.html).

   Letters are set in CTG Everly Script, the site's own OFL cursive font, as
   SVG <text>. The font is measured once after it loads so the x-height sits
   on the dashed midline of a three-line ruling; exported SVG/PNG files embed
   the woff2 as a data URI so they stand alone. Exposed as window.CTGSheet. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var W = 794, H = 1123, M = 48;                  /* A4 at 96dpi */
  var FONT = 'CTG Everly Script';
  var FONT_URL = '/assets/fonts/ctg-everly-script/CTGEverlyScript.woff2';
  var FF = 'Georgia, "Times New Roman", serif';
  var INK = '#2f6b4f', TRACE = '#9fb3a6';

  function el(n, a) { var e = document.createElementNS(NS, n);
    for (var k in a) e.setAttribute(k, a[k]); return e; }

  /* ---------- font metrics ----------
     SVG getBBox() on <text> returns the em box, not the ink, so the font is
     measured on a canvas (actualBoundingBox*) instead. BASE_FS is the size
     that fits a 72px ruling; other rulings scale from it. */
  var BASE_FS = 48, CTX, WIDTHS = {};
  function ctx(size) {
    if (!CTX) CTX = document.createElement('canvas').getContext('2d');
    CTX.font = size + "px '" + FONT + "'";
    return CTX;
  }
  function ink(str, size) {
    var m = ctx(size).measureText(str);
    return {asc: m.actualBoundingBoxAscent || size * 0.7, desc: m.actualBoundingBoxDescent || size * 0.2};
  }
  function calibrate() {
    var xh = ink('x', 100).asc, ah = ink('lhkbdf', 100).asc, dh = ink('gjpqyf', 100).desc;
    BASE_FS = Math.floor(Math.min(36 / xh, 70 / ah, 27 / dh) * 100);
  }
  /* A ruling: three lines `lineH` tall, rows `rowH` apart, text at `fs`. */
  function ruling(lineH) {
    lineH = lineH || 72;
    var k = lineH / 72;
    return {lineH: lineH, mid: Math.round(34 * k), rowH: Math.round(104 * k), fs: Math.floor(BASE_FS * k), gap: Math.round(8 * k)};
  }
  function width(str, fs) {
    var key = fs + '|' + str;
    if (WIDTHS[key] == null) WIDTHS[key] = ctx(fs).measureText(str).width;
    return WIDTHS[key];
  }

  /* ---------- drawing ---------- */
  function letter(svg, str, x, baseline, mode, fs) {
    var t = el('text', {x: x, y: baseline, 'font-family': "'" + FONT + "'", 'font-size': fs});
    if (mode === 'solid') t.setAttribute('fill', INK);
    else {                                          /* dashed hollow outline to trace */
      t.setAttribute('fill', 'none'); t.setAttribute('stroke', TRACE);
      t.setAttribute('stroke-width', String(Math.max(0.9, 1.25 * fs / 103).toFixed(2)));
      t.setAttribute('stroke-dasharray', '3 2.5'); t.setAttribute('stroke-linejoin', 'round');
    }
    t.textContent = str; svg.appendChild(t);
    return t;
  }

  /* One ruled line: solid top + dashed x-height + solid baseline. */
  function ruledLine(svg, y, r, x1, x2) {
    x1 = x1 == null ? M : x1; x2 = x2 == null ? W - M : x2;
    svg.appendChild(el('line', {x1: x1, y1: y, x2: x2, y2: y, stroke: '#c9d4cc', 'stroke-width': 1.5}));
    svg.appendChild(el('line', {x1: x1, y1: y + r.mid, x2: x2, y2: y + r.mid, stroke: '#d8e0da',
                                'stroke-width': 1.2, 'stroke-dasharray': '6 6'}));
    svg.appendChild(el('line', {x1: x1, y1: y + r.lineH, x2: x2, y2: y + r.lineH, stroke: '#8fa396', 'stroke-width': 1.8}));
  }

  /* A row of one repeated unit (a letter, an "Aa" pair, or a word): solid
     model first, `traced` dashed copies, then blank space to write unaided. */
  function repeatRow(svg, parts, y, r, traced) {
    var base = y + r.lineH - 1, x = M + 14, rep = 0, wRep = 0;
    parts.forEach(function (u, i) { wRep += width(u, r.fs) + (i ? r.gap : 0); });
    var step = wRep + Math.round(28 * r.lineH / 72);
    while (x + wRep <= W - M - 6) {
      var mode = rep === 0 ? 'solid' : rep <= traced ? 'trace' : null;
      if (mode) {
        var gx = x;
        parts.forEach(function (u) { letter(svg, u, gx, base, mode, r.fs); gx += width(u, r.fs) + r.gap; });
      }
      x += step; rep++;
    }
  }

  /* Wrap a sentence onto as many rows as it needs; returns the row count. */
  function wrapWords(str, r) {
    var words = str.split(/\s+/), lines = [], cur = '';
    var space = width(' ', r.fs), max = W - 2 * M - 28;
    words.forEach(function (w) {
      var test = cur ? cur + ' ' + w : w;
      if (cur && width(test, r.fs) > max) { lines.push(cur); cur = w; } else cur = test;
    });
    if (cur) lines.push(cur);
    return lines;
  }

  function text(svg, str, x, y, size, color, weight, anchor) {
    var t = el('text', {x: x, y: y, 'font-family': FF, 'font-size': size,
                        fill: color, 'font-weight': weight || 'normal'});
    if (anchor) t.setAttribute('text-anchor', anchor);
    t.textContent = str; svg.appendChild(t);
  }

  function page(title, sub, n, total) {
    var svg = el('svg', {xmlns: NS, viewBox: '0 0 ' + W + ' ' + H, width: W, height: H,
                         role: 'img', 'aria-label': title + (total > 1 ? ', page ' + n + ' of ' + total : '')});
    svg.appendChild(el('rect', {x: 0, y: 0, width: W, height: H, fill: '#ffffff'}));
    text(svg, title, M, 62, 24, '#17201b', 'bold');
    text(svg, sub, M, 88, 13, '#5d6a63');
    text(svg, 'cursive-text-generator.net', W - M, 62, 12, '#8fa396', 'normal', 'end');
    if (total > 1) text(svg, 'Page ' + n + ' of ' + total, W - M, 88, 12, '#8fa396', 'normal', 'end');
    svg.appendChild(el('line', {x1: M, y1: 104, x2: W - M, y2: 104, stroke: '#dfe6df', 'stroke-width': 1.5}));
    text(svg, 'Name: ______________________________', W - M, H - 22, 12, '#8fa396', 'normal', 'end');
    return svg;
  }

  /* ---------- export (font embedded so the file stands alone) ---------- */
  var fontData;
  function fontCss() {
    if (!fontData) fontData = fetch(FONT_URL).then(function (r) { return r.arrayBuffer(); }).then(function (buf) {
      var b = '', u8 = new Uint8Array(buf);
      for (var i = 0; i < u8.length; i += 0x8000) b += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
      return "@font-face{font-family:'" + FONT + "';src:url(data:font/woff2;base64," + btoa(b) + ") format('woff2')}";
    }).catch(function () { return ''; });
    return fontData;
  }
  function svgString(svg, css) {
    var c = svg.cloneNode(true);
    c.setAttribute('xmlns', NS); c.setAttribute('width', W); c.setAttribute('height', H);
    if (css) { var st = el('style', {}); st.textContent = css; c.insertBefore(st, c.firstChild); }
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(c);
  }
  function download(blob, name) {
    var u = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = u; a.download = name; document.body.appendChild(a); a.click();
    document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
  }
  function toSvgFile(svg, name, done) {
    fontCss().then(function (css) {
      download(new Blob([svgString(svg, css)], {type: 'image/svg+xml'}), name); done && done();
    });
  }
  function toPng(svg, name, done) {
    fontCss().then(function (css) {
      var blob = new Blob([svgString(svg, css)], {type: 'image/svg+xml;charset=utf-8'});
      var url = URL.createObjectURL(blob), img = new Image();
      img.onload = function () {
        var sc = 2, cv = document.createElement('canvas');
        cv.width = W * sc; cv.height = H * sc;
        var c = cv.getContext('2d');
        c.fillStyle = '#fff'; c.fillRect(0, 0, cv.width, cv.height);
        c.drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        cv.toBlob(function (b) { download(b, name); done && done(); }, 'image/png');
      };
      img.onerror = function () { URL.revokeObjectURL(url); done && done(); };
      img.src = url;
    });
  }
  /* Download every page of a sheet as PNG, one after another. */
  function toPngAll(pages, base, done) {
    var i = 0;
    (function next() {
      if (i >= pages.length) { done && done(); return; }
      toPng(pages[i], base + (pages.length > 1 ? '-p' + (i + 1) : '') + '.png', function () { i++; setTimeout(next, 350); });
    })();
  }

  /* ---------- shared page-list UI ---------- */
  function mountPages(host, pages, base) {
    host.innerHTML = '';
    pages.forEach(function (svg, i) {
      var wrap = document.createElement('div'); wrap.className = 'as-page';
      svg.setAttribute('width', '100%'); svg.removeAttribute('height');
      wrap.appendChild(svg);
      var bar = document.createElement('div'); bar.className = 'as-page-bar';
      var lbl = document.createElement('span');
      lbl.textContent = pages.length > 1 ? 'Page ' + (i + 1) + ' of ' + pages.length : 'One page';
      var png = document.createElement('button'); png.type = 'button'; png.textContent = 'Download PNG';
      var sv = document.createElement('button'); sv.type = 'button'; sv.className = 'ghost'; sv.textContent = 'SVG';
      var name = base + (pages.length > 1 ? '-p' + (i + 1) : '');
      png.addEventListener('click', function () {
        png.disabled = true; toPng(svg, name + '.png', function () { png.disabled = false; });
      });
      sv.addEventListener('click', function () {
        sv.disabled = true; toSvgFile(svg, name + '.svg', function () { sv.disabled = false; });
      });
      bar.appendChild(lbl); bar.appendChild(png); bar.appendChild(sv);
      wrap.appendChild(bar);
      host.appendChild(wrap);
    });
  }

  /* Run `cb` once the cursive font is in (else the fallback font's metrics
     would size every row). */
  function ready(cb) {
    var done = false, once = function () { if (done) return; done = true;
      try { calibrate(); } catch (e) {} cb(); };
    if (document.fonts && document.fonts.load) {
      document.fonts.load("48px '" + FONT + "'").then(once, once);
      setTimeout(once, 3000);
    } else once();
  }

  window.CTGSheet = {
    W: W, H: H, M: M, INK: INK, TRACE: TRACE, NS: NS,
    el: el, text: text, page: page, ruling: ruling, width: width,
    letter: letter, ruledLine: ruledLine, repeatRow: repeatRow, wrapWords: wrapWords,
    toPng: toPng, toPngAll: toPngAll, toSvgFile: toSvgFile, mountPages: mountPages, ready: ready
  };
})();
