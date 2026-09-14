/* alphabet-sheet.js — printable cursive alphabet practice sheet (A–Z).
   Loaded by /cursive-alphabet-practice-sheet.html.

   Letters are set in CTG Everly Script, the site's own OFL cursive font,
   as SVG <text>. The font is measured once after it loads so the x-height
   sits on the dashed midline of a 72px three-line ruling; the exported
   SVG/PNG embeds the woff2 as a data URI so the file is self-contained. */
(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var W = 794, H = 1123, M = 48;                  /* A4 at 96dpi */
  var LINE_H = 72, ROW_H = 104;
  var FONT = 'CTG Everly Script';
  var FONT_URL = '/assets/fonts/ctg-everly-script/CTGEverlyScript.woff2';
  var FF = 'Georgia, "Times New Roman", serif';
  var ALPHA = 'abcdefghijklmnopqrstuvwxyz';
  var INK = '#2f6b4f', TRACE = '#9fb3a6';

  /* Letter families in the order most handwriting schemes teach them. */
  var GROUPS = { all: ALPHA, under: 'ituwrsjp', over: 'nmvxyz', loop: 'lhkbfe', oval: 'acdgoq' };
  var GROUP_NAMES = {
    all: 'Full alphabet A–Z', under: 'Undercurve letters', over: 'Overcurve letters',
    loop: 'Loop letters', oval: 'Oval letters', custom: 'Custom letters'
  };

  function el(n, a) { var e = document.createElementNS(NS, n);
    for (var k in a) e.setAttribute(k, a[k]); return e; }

  /* ---------- font metrics ----------
     SVG getBBox() on <text> returns the em box, not the ink, so the font is
     measured on a canvas (actualBoundingBox*) instead. */
  var FS = 48, CTX, WIDTHS = {};
  function ctx() {
    if (!CTX) CTX = document.createElement('canvas').getContext('2d');
    CTX.font = FS + "px '" + FONT + "'";
    return CTX;
  }
  function ink(str, size) {
    var c = ctx(); c.font = size + "px '" + FONT + "'";
    var m = c.measureText(str);
    return {asc: m.actualBoundingBoxAscent || size * 0.7, desc: m.actualBoundingBoxDescent || size * 0.2};
  }
  /* Pick a font size whose x-height fills the lower band of the ruling
     (baseline to dashed midline = 38px) without ascenders crossing the top
     line or descenders reaching the next row. */
  function calibrate() {
    var xh = ink('x', 100).asc, ah = ink('lhkbdf', 100).asc, dh = ink('gjpqyf', 100).desc;
    var byX = 36 / xh, byAsc = 70 / ah, byDesc = 27 / dh;
    FS = Math.floor(Math.min(byX, byAsc, byDesc) * 100);
  }
  function width(str) {
    if (WIDTHS[str] == null) WIDTHS[str] = ctx().measureText(str).width;
    return WIDTHS[str];
  }

  /* ---------- drawing ---------- */
  function letter(svg, str, x, baseline, mode) {
    var t = el('text', {x: x, y: baseline, 'font-family': "'" + FONT + "'", 'font-size': FS});
    if (mode === 'solid') t.setAttribute('fill', INK);
    else {                                          /* dashed hollow outline to trace */
      t.setAttribute('fill', 'none'); t.setAttribute('stroke', TRACE);
      t.setAttribute('stroke-width', '1.25'); t.setAttribute('stroke-dasharray', '3 2.5');
      t.setAttribute('stroke-linejoin', 'round');
    }
    t.textContent = str; svg.appendChild(t);
  }

  /* One ruled line: solid top + dashed x-height + solid baseline. */
  function ruledLine(svg, y) {
    svg.appendChild(el('line', {x1: M, y1: y, x2: W - M, y2: y, stroke: '#c9d4cc', 'stroke-width': 1.5}));
    svg.appendChild(el('line', {x1: M, y1: y + 34, x2: W - M, y2: y + 34, stroke: '#d8e0da',
                                'stroke-width': 1.2, 'stroke-dasharray': '6 6'}));
    svg.appendChild(el('line', {x1: M, y1: y + LINE_H, x2: W - M, y2: y + LINE_H, stroke: '#8fa396', 'stroke-width': 1.8}));
  }

  /* The pieces of one repetition: ["A","a"], ["a"] or ["A"]. */
  function units(l, kase) {
    if (kase === 'lower') return [l];
    if (kase === 'upper') return [l.toUpperCase()];
    return [l.toUpperCase(), l];
  }

  /* Fill one ruled row with a letter (or Aa pair): solid model first, then
     dashed copies to trace, then blank space to write unaided. */
  function fillRow(svg, l, kase, y, trace) {
    var us = units(l, kase), base = y + LINE_H - 1, x = M + 14, rep = 0;
    var traced = trace === 'trace' ? Infinity : trace === 'model' ? 0 : 3;
    var wRep = 0; us.forEach(function (u, i) { wRep += width(u) + (i ? 8 : 0); });
    while (x + wRep <= W - M - 6) {
      var mode = rep === 0 ? 'solid' : rep <= traced ? 'trace' : null;
      if (mode) {
        var gx = x;
        us.forEach(function (u) { letter(svg, u, gx, base, mode); gx += width(u) + 8; });
      }
      x += wRep + 28; rep++;
    }
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

  function caseName(kase) {
    return kase === 'lower' ? 'lowercase a–z' : kase === 'upper' ? 'uppercase A–Z' : 'uppercase & lowercase';
  }

  /* ---------- practice sheet: one ruled row per letter, paginated ---------- */
  function buildSheets(o) {
    var top = 128, rowsPerPage = Math.floor((H - top - 44) / ROW_H);   /* 9 */
    var rows = [];
    o.letters.split('').forEach(function (l) { for (var r = 0; r < o.rows; r++) rows.push(l); });
    var total = Math.max(1, Math.ceil(rows.length / rowsPerPage));
    var title = 'Cursive Alphabet Practice Sheet' + (o.group === 'all' ? '' : ' — ' + GROUP_NAMES[o.group]);
    var sub = caseName(o.kase) + ' · ' + (o.trace === 'trace' ? 'trace every letter' :
              o.trace === 'model' ? 'copy the model letter' : 'trace the dotted letters, then write on your own');
    var pages = [];
    for (var p = 0; p < total; p++) {
      var svg = page(title, sub, p + 1, total), y = top;
      rows.slice(p * rowsPerPage, (p + 1) * rowsPerPage).forEach(function (l) {
        ruledLine(svg, y); fillRow(svg, l, o.kase, y, o.trace); y += ROW_H;
      });
      pages.push(svg);
    }
    return pages;
  }

  /* ---------- one-page alphabet chart: 26 solid Aa pairs in a grid ---------- */
  function buildChart(o) {
    var svg = page('Cursive Alphabet Chart', caseName(o.kase) + ' · all 26 letters on one page', 1, 1);
    var cols = 4, rowsN = 7, top = 128, cw = (W - 2 * M) / cols, ch = (H - top - 44) / rowsN;
    o.letters.split('').forEach(function (l, i) {
      var cx = M + (i % cols) * cw, cy = top + Math.floor(i / cols) * ch + (ch - LINE_H) / 2 - 6;
      var us = units(l, o.kase), wAll = 0;
      us.forEach(function (u, k) { wAll += width(u) + (k ? 8 : 0); });
      [[0, '#d8e0da', 1.2, '6 6'], [34, '#e4eae6', 1, '6 6'], [LINE_H, '#a9b8ae', 1.6, 'none']].forEach(function (ln) {
        svg.appendChild(el('line', {x1: cx + 8, y1: cy + ln[0], x2: cx + cw - 8, y2: cy + ln[0],
                                    stroke: ln[1], 'stroke-width': ln[2], 'stroke-dasharray': ln[3]}));
      });
      var gx = cx + (cw - wAll) / 2;
      us.forEach(function (u) { letter(svg, u, gx, cy + LINE_H - 1, 'solid'); gx += width(u) + 8; });
      text(svg, l.toUpperCase() + l, cx + 8, cy - 8, 11, '#8fa396', 'bold');
    });
    return [svg];
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
        var ctx = cv.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        cv.toBlob(function (b) { download(b, name); done && done(); }, 'image/png');
      };
      img.onerror = function () { URL.revokeObjectURL(url); done && done(); };
      img.src = url;
    });
  }

  /* ---------- page wiring ---------- */
  function readOptions(root) {
    var q = function (s) { return root.querySelector(s); };
    var group = q('[data-as-group]').value, letters;
    if (group === 'custom') {
      var seen = {};
      letters = (q('[data-as-custom]').value || '').toLowerCase().replace(/[^a-z]/g, '')
        .split('').filter(function (c) { return seen[c] ? false : (seen[c] = true); }).join('');
      if (!letters) letters = ALPHA;
    } else letters = GROUPS[group] || ALPHA;
    return {
      group: group, letters: letters,
      kase: q('[data-as-case]').value,
      rows: parseInt(q('[data-as-rows]').value, 10) || 1,
      trace: q('[data-as-trace]').value,
      layout: q('[data-as-layout]').value
    };
  }

  function fileBase(o) {
    return 'cursive-alphabet-' + (o.layout === 'chart' ? 'chart' : 'practice-sheet') +
           (o.group === 'all' ? '' : '-' + o.group) + '-' + o.kase;
  }

  function render(root) {
    var host = root.querySelector('[data-as-sheets]');
    var o = readOptions(root);
    var pages = o.layout === 'chart' ? buildChart(o) : buildSheets(o);
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
      var name = fileBase(o) + (pages.length > 1 ? '-p' + (i + 1) : '');
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
    var count = root.querySelector('[data-as-count]');
    if (count) count.textContent = o.letters.length + ' letter' + (o.letters.length === 1 ? '' : 's') +
      ' · ' + pages.length + ' page' + (pages.length === 1 ? '' : 's');
    root._asPages = pages; root._asName = fileBase(o);
  }

  function init() {
    var root = document.querySelector('[data-alphabet-sheet]');
    if (!root) return;
    try { calibrate(); } catch (e) {}

    var groupSel = root.querySelector('[data-as-group]');
    var customRow = root.querySelector('[data-as-custom-row]');
    function syncCustom() { customRow.hidden = groupSel.value !== 'custom'; }

    Array.prototype.forEach.call(root.querySelectorAll('select'), function (s) {
      s.addEventListener('change', function () { syncCustom(); render(root); });
    });
    var custom = root.querySelector('[data-as-custom]');
    custom.addEventListener('input', function () {
      clearTimeout(custom._t); custom._t = setTimeout(function () { render(root); }, 250);
    });

    var printBtn = root.querySelector('[data-as-print]');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    var allBtn = root.querySelector('[data-as-png-all]');
    if (allBtn) allBtn.addEventListener('click', function () {
      var pages = root._asPages || [], i = 0;
      allBtn.disabled = true;
      (function next() {
        if (i >= pages.length) { allBtn.disabled = false; return; }
        var name = root._asName + (pages.length > 1 ? '-p' + (i + 1) : '') + '.png';
        toPng(pages[i++], name, function () { setTimeout(next, 350); });
      })();
    });

    /* "Make this sheet" buttons in the letter-family section. */
    Array.prototype.forEach.call(document.querySelectorAll('[data-as-pick]'), function (b) {
      b.addEventListener('click', function () {
        groupSel.value = b.getAttribute('data-as-pick');
        syncCustom(); render(root);
        root.scrollIntoView({behavior: 'smooth', block: 'start'});
      });
    });

    syncCustom();
    try { render(root); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* Measure only once the cursive font is in, else the fallback font's
       metrics would size every row. */
    var go = function () { try { init(); } catch (e) {} };
    if (document.fonts && document.fonts.load) {
      var done = false, once = function () { if (!done) { done = true; go(); } };
      document.fonts.load("48px '" + FONT + "'").then(once, once);
      setTimeout(once, 3000);
    } else go();
  });
})();
