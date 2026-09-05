/* letter-tools.js — per-letter generator + printable practice sheet.
   Loaded by the 26 /cursive-letters/<x>-in-cursive/ pages.

   Stroke paths are authored in a 520x210 box where cap height = 42,
   x-height = 98 and baseline = 160. The practice sheet re-measures each
   glyph with getBBox() rather than assuming a width, because letter
   widths vary a lot (M against i). */
(function () {
  var G = {"a":{"u":["M 150,60 C 140,44 112,44 100,64 C 86,88 88,124 106,142 C 120,156 142,152 150,138 L 158,58 C 160,46 170,49 168,60 L 156,146 C 154,156 166,160 174,152"],"l":["M 366,112 C 360,99 340,97 330,107 C 318,118 318,142 331,151 C 341,158 356,154 362,144 L 368,110 L 360,146 C 358,156 370,160 378,152"]},"b":{"u":["M 70,58 C 62,44 82,36 86,50 L 96,146 C 98,156 108,158 114,150","M 86,50 C 122,38 156,52 148,72 C 142,88 112,94 98,92","M 97,93 C 134,89 164,102 155,126 C 147,148 114,155 96,146"],"l":["M 310,158 C 314,124 320,64 327,50 C 330,42 337,47 334,60 L 324,146","M 324,146 C 321,120 334,104 351,107 C 368,110 375,131 364,145 C 353,158 331,158 324,146","M 369,127 C 377,120 386,119 392,126"]},"c":{"u":["M 176,62 C 180,46 160,36 140,44 C 114,54 104,92 110,118 C 116,144 138,158 160,152 C 172,148 180,140 182,130"],"l":["M 396,114 C 392,100 374,96 358,104 C 341,114 338,142 352,152 C 366,161 386,155 396,144"]},"d":{"u":["M 72,56 C 64,44 84,36 88,50 L 98,148 C 100,157 110,158 116,150","M 88,50 C 130,40 168,58 164,100 C 160,140 124,158 98,148"],"l":["M 356,112 C 352,100 338,96 328,104 C 316,113 314,140 324,150 C 332,158 346,156 352,146 L 359,108 C 361,78 365,58 371,50 C 374,45 379,48 377,58 L 367,146 C 366,155 375,159 383,153"]},"e":{"u":["M 168,60 C 172,46 152,38 134,46 C 116,54 108,70 118,80 C 126,88 142,84 146,74 C 140,86 128,92 118,96 C 106,100 100,116 108,132 C 118,150 146,154 164,142"],"l":["M 328,134 L 368,124 C 375,122 374,109 363,103 C 348,95 329,106 327,125 C 325,143 338,156 355,154 C 366,153 374,147 379,138"]},"f":{"u":["M 60,62 C 72,44 112,38 132,50 C 146,58 140,72 128,69","M 100,54 L 90,148 C 88,157 98,161 106,153","M 74,102 L 122,97"],"l":["M 334,152 C 334,120 338,72 346,56 C 352,44 364,48 360,62 C 357,74 352,90 348,110 L 340,168 C 337,184 325,189 319,182 C 315,177 323,169 329,175","M 325,112 L 365,107"]},"g":{"u":["M 176,62 C 180,46 160,36 140,44 C 114,54 104,92 110,118 C 116,144 140,158 162,150 C 173,146 177,135 175,123","M 175,123 L 148,119"],"l":["M 386,113 C 381,100 364,96 352,105 C 338,115 336,141 349,151 C 360,159 375,155 381,144","M 384,112 L 372,176 C 369,189 356,194 348,187 C 342,182 348,175 355,179"]},"h":{"u":["M 62,56 C 56,44 72,38 76,50 L 88,148 C 90,157 100,160 106,152","M 152,52 C 146,42 162,37 166,49 L 178,148 C 180,157 190,160 196,152","M 80,98 C 108,87 134,99 158,92"],"l":["M 314,158 C 317,126 322,66 330,52 C 333,44 340,49 337,61 L 327,150","M 327,150 C 330,120 341,102 355,105 C 367,108 370,122 366,136 L 363,150 C 361,158 371,161 379,154"]},"i":{"u":["M 100,152 C 94,132 106,110 120,94 C 134,78 146,60 138,50 C 128,40 110,50 112,70 C 114,92 128,116 134,140 C 137,152 148,156 156,148"],"l":["M 344,104 L 336,146 C 334,156 346,160 354,152","M 350,84 L 351,84"]},"j":{"u":["M 90,64 C 96,48 118,40 132,50 C 142,58 138,70 128,68 L 116,150 C 112,178 96,192 82,186 C 74,182 78,172 88,175"],"l":["M 350,104 L 337,172 C 334,187 320,193 313,186 C 309,181 317,174 323,179","M 354,84 L 355,84"]},"k":{"u":["M 62,56 C 56,44 72,38 76,50 L 88,148 C 90,157 100,160 106,152","M 156,52 C 160,42 170,46 166,57 L 96,102 L 148,146 C 154,155 164,156 170,148"],"l":["M 314,158 C 317,126 322,66 330,52 C 333,44 340,49 337,61 L 327,150","M 370,104 L 328,127 L 360,146 C 364,154 374,156 380,148"]},"l":{"u":["M 158,54 C 148,42 126,48 124,68 C 122,90 142,104 130,128 C 120,148 98,152 102,158 C 108,166 140,160 166,144"],"l":["M 316,150 C 320,120 327,66 337,52 C 344,42 352,49 348,63 L 335,146 C 333,156 345,160 353,152"]},"m":{"u":["M 62,150 C 66,110 72,64 78,52 C 82,44 89,48 86,60 L 78,142 L 116,56 L 132,140 L 168,54 C 172,46 179,50 176,61 L 166,148 C 164,157 174,160 182,152"],"l":["M 312,158 L 318,104 C 320,97 328,99 327,109 L 325,150 C 329,124 339,102 351,105 C 361,107 364,124 361,140 C 364,122 373,104 384,107 C 393,109 396,126 393,142 L 391,152 C 390,158 400,161 407,153"]},"n":{"u":["M 62,150 C 66,110 72,64 78,52 C 82,44 90,48 87,60 L 79,140 L 150,54 C 154,46 161,50 158,61 L 148,148 C 146,157 156,160 164,152"],"l":["M 314,158 L 320,104 C 322,97 330,99 329,109 L 327,152 C 331,123 343,101 357,104 C 369,107 372,126 368,144 L 366,152 C 365,158 375,161 382,153"]},"o":{"u":["M 152,58 C 158,46 148,40 140,46 C 118,50 100,76 100,106 C 100,138 118,156 140,153 C 162,150 174,126 172,100 C 170,74 160,58 152,58"],"l":["M 368,110 C 358,96 336,99 329,117 C 322,136 331,155 347,155 C 362,155 373,140 370,122","M 370,120 C 375,107 383,109 388,118"]},"p":{"u":["M 66,56 C 58,44 78,38 82,50 L 94,150 C 96,159 106,161 112,153","M 82,50 C 120,38 156,54 148,78 C 141,98 106,104 92,100"],"l":["M 330,104 C 327,96 318,99 317,109 L 306,184 C 303,194 314,197 319,188 L 328,112","M 326,114 C 334,102 352,98 362,108 C 372,118 370,138 358,148 C 346,156 331,153 325,143"]},"q":{"u":["M 152,58 C 158,46 148,40 140,46 C 118,50 100,76 100,106 C 100,138 118,156 140,153 C 162,150 174,126 172,100 C 170,74 160,58 152,58","M 142,128 C 152,140 160,154 170,164"],"l":["M 368,112 C 362,99 344,96 333,106 C 321,117 320,142 333,151 C 343,158 358,155 364,145","M 368,110 L 356,180 C 354,191 365,195 373,187"]},"r":{"u":["M 66,56 C 58,44 78,38 82,50 L 94,150 C 96,159 106,161 112,153","M 82,50 C 120,38 156,54 148,78 C 141,98 106,104 92,100","M 108,101 L 150,146 C 155,155 165,157 171,149"],"l":["M 314,152 L 324,107 C 326,100 334,102 333,112 C 343,103 360,101 371,108 C 378,113 372,123 363,119 C 352,114 344,125 342,139 L 341,150 C 340,158 350,161 357,153"]},"s":{"u":["M 156,58 C 148,44 120,42 108,56 C 96,70 106,88 122,96 C 138,104 150,118 144,134 C 138,150 112,156 98,146"],"l":["M 314,153 C 326,134 336,113 343,105 C 348,99 355,104 350,114 C 344,124 331,131 327,141 C 323,152 336,158 347,153 C 355,149 362,150 367,156"]},"t":{"u":["M 58,60 C 70,44 110,38 130,50 C 144,58 138,72 126,69","M 98,54 L 88,148 C 86,157 96,161 104,153"],"l":["M 340,152 C 342,118 349,78 356,60 L 348,146 C 346,156 358,160 366,152","M 332,98 L 370,94"]},"u":{"u":["M 62,54 C 56,44 72,38 76,50 L 66,128 C 63,148 84,159 100,148 C 112,139 118,118 122,94 L 130,54 C 132,44 142,47 140,58 L 128,146 C 126,156 138,160 146,152"],"l":["M 316,100 L 308,142 C 306,156 324,161 333,147 L 344,100 L 336,146 C 334,157 348,162 358,151 C 363,146 370,148 375,154"]},"v":{"u":["M 62,54 C 56,44 72,38 76,50 L 100,146 L 148,58 C 152,46 162,50 158,62 C 155,73 165,78 173,70"],"l":["M 314,100 L 332,152 L 356,102 C 360,92 371,97 367,109 C 364,120 375,123 383,115"]},"w":{"u":["M 58,62 C 54,44 78,36 88,46 L 116,158 L 144,44 L 172,158 L 200,44 C 204,34 220,38 216,52 C 213,62 226,64 234,56"],"l":["M 316,158 C 318,122 324,100 334,100 L 350,158 L 368,100 L 384,158 L 402,100 C 406,90 418,93 413,104 C 421,96 431,100 437,107"]},"x":{"u":["M 62,54 C 56,44 72,38 76,50 L 150,148 C 154,157 164,158 170,150","M 158,54 C 162,44 172,48 168,58 L 82,150 C 78,158 88,161 96,153"],"l":["M 318,100 L 368,152 C 371,159 381,160 387,153","M 372,100 C 376,94 384,98 380,107 L 330,152 C 326,159 337,163 344,155"]},"y":{"u":["M 62,54 C 56,44 72,38 76,50 L 98,118 C 102,131 113,133 120,122 L 148,58 C 152,46 162,50 158,62 L 132,170 C 128,186 111,192 104,184 C 99,179 107,172 113,177"],"l":["M 314,100 L 328,148 C 330,157 342,158 347,147 L 362,100 L 344,180 C 340,192 326,196 320,189 C 316,184 323,176 329,181"]},"z":{"u":["M 62,58 C 74,44 106,42 122,52 C 132,58 128,71 118,68 L 70,148 C 66,156 77,160 85,154 L 152,144"],"l":["M 316,102 C 329,92 353,93 363,103 L 327,150 C 322,158 336,163 345,155 L 366,146 L 354,182 C 351,193 337,197 330,188"]}};

  /* Mathematical Alphanumeric Symbols has holes: Unicode had already
     encoded these in Letterlike Symbols, so the script block skips them. */
  var HU = {script:{B:'\u212C',E:'\u2130',F:'\u2131',H:'\u210B',I:'\u2110',L:'\u2112',M:'\u2133',R:'\u211B'},
            frak:{C:'\u212D',H:'\u210C',I:'\u2111',R:'\u211C',Z:'\u2128'},
            dbl:{C:'\u2102',H:'\u210D',N:'\u2115',P:'\u2119',Q:'\u211A',R:'\u211D',Z:'\u2124'}};
  var HL = {script:{e:'\u212F',g:'\u210A',o:'\u2134'}};
  var BASE = {script:[0x1D49C,0x1D4B6], bold:[0x1D4D0,0x1D4EA], frak:[0x1D504,0x1D51E],
              dbl:[0x1D538,0x1D552], mono:[0x1D670,0x1D68A]};
  var STYLES = [['script','Cursive Script'],['bold','Bold Cursive'],['frak','Old Style Script'],
                ['dbl','Double-Struck'],['mono','Clean Monospace']];

  function conv(text, key) {
    var b = BASE[key], out = '';
    for (var i = 0; i < text.length; i++) {
      var c = text[i], cp = c.charCodeAt(0), g = null;
      if (cp >= 65 && cp <= 90)  g = (HU[key] && HU[key][c]) || String.fromCodePoint(b[0] + cp - 65);
      else if (cp >= 97 && cp <= 122) g = (HL[key] && HL[key][c]) || String.fromCodePoint(b[1] + cp - 97);
      out += g || c;
    }
    return out;
  }

  function copy(t, label) {
    var done = function () {
      var el = document.querySelector('[data-toast]');
      if (el) { el.textContent = 'Copied ' + (label || t); el.classList.add('show');
                setTimeout(function () { el.classList.remove('show'); }, 1500); }
    };
    if (navigator.clipboard) { navigator.clipboard.writeText(t).then(done, done); return; }
    var ta = document.createElement('textarea');
    ta.value = t; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta); done();
  }

  /* ---------- generator ---------- */
  function initGen(root, letter) {
    var input = root.querySelector('[data-lt-input]');
    var out = root.querySelector('[data-lt-out]');
    function render() {
      var v = input.value;
      if (!v.trim()) { out.innerHTML = '<p class="lt-empty">Type something above to see it in five styles.</p>'; return; }
      out.innerHTML = '';
      STYLES.forEach(function (s) {
        var conv_ = conv(v, s[0]);
        var row = document.createElement('button');
        row.type = 'button'; row.className = 'lt-row';
        row.setAttribute('aria-label', 'Copy your text in ' + s[1]);
        row.innerHTML = '<span class="lt-name">' + s[1] + '</span><span class="lt-val"></span>';
        row.querySelector('.lt-val').textContent = conv_;
        row.addEventListener('click', function () { copy(conv_, s[1]); });
        out.appendChild(row);
      });
    }
    input.addEventListener('input', render);
    var clr = root.querySelector('[data-lt-clear]');
    if (clr) clr.addEventListener('click', function () { input.value = ''; input.focus(); render(); });
    render();
  }

  /* ---------- practice sheet ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  function el(n, a) { var e = document.createElementNS(NS, n);
    for (var k in a) e.setAttribute(k, a[k]); return e; }

  /* Measure a glyph's real bounds so spacing adapts to letter width. */
  function bbox(paths) {
    var s = el('svg', {width: 520, height: 210, style: 'position:absolute;left:-9999px;top:-9999px'});
    var g = el('g', {});
    paths.forEach(function (d) { g.appendChild(el('path', {d: d, fill: 'none', stroke: '#000', 'stroke-width': 6})); });
    s.appendChild(g); document.body.appendChild(s);
    var b = g.getBBox(); document.body.removeChild(s);
    return b;
  }

  function glyphGroup(paths, dash, color) {
    var g = el('g', {});
    paths.forEach(function (d) {
      var p = el('path', {d: d, fill: 'none', stroke: color, 'stroke-width': 6,
                          'stroke-linecap': 'round', 'stroke-linejoin': 'round'});
      if (dash) p.setAttribute('stroke-dasharray', '7 7');
      g.appendChild(p);
    });
    return g;
  }

  /* One ruled line: solid top + dashed x-height + solid baseline. */
  function ruledLine(y, W, M) {
    var g = el('g', {});
    g.appendChild(el('line', {x1: M, y1: y, x2: W - M, y2: y, stroke: '#c9d4cc', 'stroke-width': 1.5}));
    g.appendChild(el('line', {x1: M, y1: y + 34, x2: W - M, y2: y + 34, stroke: '#d8e0da',
                              'stroke-width': 1.2, 'stroke-dasharray': '6 6'}));
    g.appendChild(el('line', {x1: M, y1: y + 72, x2: W - M, y2: y + 72, stroke: '#8fa396', 'stroke-width': 1.8}));
    return g;
  }

  /* Repeat one glyph along a ruled line, fading out so the second half is
     free practice rather than tracing. */
  function fillRow(svg, paths, y, W, M, fadeFrom) {
    var b = bbox(paths);
    var lineH = 72, scale = lineH / 118;          /* 118 = baseline(160) - cap(42) */
    var w = b.width * scale, gap = 34, x = M + 16;
    var i = 0;
    while (x + w < W - M - 10) {
      var faded = fadeFrom != null && i >= fadeFrom;
      if (!faded) {
        var g = glyphGroup(paths, true, '#b9c7bd');
        g.setAttribute('transform', 'translate(' + (x - b.x * scale) + ',' +
                       (y - 42 * scale) + ') scale(' + scale + ')');
        svg.appendChild(g);
      }
      x += w + gap; i++;
    }
  }

  function buildSheet(letter) {
    var U = letter.toUpperCase(), d = G[letter];
    var W = 794, H = 1123, M = 48;                 /* A4 at 96dpi */
    var svg = el('svg', {xmlns: NS, viewBox: '0 0 ' + W + ' ' + H, width: W, height: H});
    svg.appendChild(el('rect', {x: 0, y: 0, width: W, height: H, fill: '#ffffff'}));
    var FF = 'Georgia, "Times New Roman", serif';

    function text(str, x, y, size, color, weight, anchor) {
      var t = el('text', {x: x, y: y, 'font-family': FF, 'font-size': size,
                          fill: color, 'font-weight': weight || 'normal'});
      if (anchor) t.setAttribute('text-anchor', anchor);
      t.textContent = str; svg.appendChild(t);
    }

    text('Cursive ' + U + ' — Practice Sheet', M, 62, 26, '#17201b', 'bold');
    text('Trace the grey letters, then keep going on your own.', M, 88, 13, '#5d6a63');
    text('cursive-text-generator.net', W - M, 62, 12, '#8fa396', 'normal', 'end');
    svg.appendChild(el('line', {x1: M, y1: 104, x2: W - M, y2: 104, stroke: '#dfe6df', 'stroke-width': 1.5}));

    /* stroke-order reference, reusing the page's own diagram */
    text('Stroke order', M, 132, 13, '#2f6b4f', 'bold');
    var ref = el('g', {transform: 'translate(' + M + ',142) scale(' + ((W - 2 * M) / 520) + ')'});
    [[42, '#e4eae6'], [98, '#e4eae6'], [160, '#c9d4cc']].forEach(function (p) {
      ref.appendChild(el('line', {x1: 20, y1: p[0], x2: 500, y2: p[0], stroke: p[1],
                                  'stroke-width': 1.5, 'stroke-dasharray': '5 5'}));
    });
    d.u.concat(d.l).forEach(function (p) {
      ref.appendChild(el('path', {d: p, fill: 'none', stroke: '#2f6b4f', 'stroke-width': 6,
                                  'stroke-linecap': 'round', 'stroke-linejoin': 'round'}));
    });
    svg.appendChild(ref);

    var y = 142 + 210 * ((W - 2 * M) / 520) + 24;
    function section(label, paths, rows) {
      text(label, M, y, 13, '#2f6b4f', 'bold'); y += 12;
      for (var r = 0; r < rows; r++) {
        svg.appendChild(ruledLine(y, W, M));
        /* first row full tracing, later rows fade to blank halfway */
        fillRow(svg, paths, y, W, M, r === 0 ? null : 3);
        y += 102;
      }
      y += 20;
    }
    section('Capital ' + U, d.u, 2);
    section('Lowercase ' + letter, d.l, 2);

    text('Now try on your own', M, y, 13, '#2f6b4f', 'bold'); y += 12;
    while (y + 102 < H - 40) { svg.appendChild(ruledLine(y, W, M)); y += 102; }
    return svg;
  }

  function svgString(svg) {
    var c = svg.cloneNode(true);
    c.setAttribute('xmlns', NS);
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + new XMLSerializer().serializeToString(c);
  }

  function download(blob, name) {
    var u = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = u; a.download = name; document.body.appendChild(a); a.click();
    document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(u); }, 4000);
  }

  function initSheet(root, letter) {
    var host = root.querySelector('[data-lt-sheet]');
    var svg = buildSheet(letter);
    svg.setAttribute('width', '100%'); svg.removeAttribute('height');
    host.appendChild(svg);

    var pngBtn = root.querySelector('[data-lt-png]');
    var svgBtn = root.querySelector('[data-lt-svg]');
    var printBtn = root.querySelector('[data-lt-print]');

    if (svgBtn) svgBtn.addEventListener('click', function () {
      download(new Blob([svgString(buildSheet(letter))], {type: 'image/svg+xml'}),
               'cursive-' + letter + '-practice-sheet.svg');
    });

    if (pngBtn) pngBtn.addEventListener('click', function () {
      var s = buildSheet(letter);
      var blob = new Blob([svgString(s)], {type: 'image/svg+xml;charset=utf-8'});
      var url = URL.createObjectURL(blob), img = new Image();
      pngBtn.disabled = true;
      img.onload = function () {
        var sc = 2;                                  /* 2x for a crisp print */
        var cv = document.createElement('canvas');
        cv.width = 794 * sc; cv.height = 1123 * sc;
        var ctx = cv.getContext('2d');
        ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        URL.revokeObjectURL(url);
        cv.toBlob(function (b) {
          download(b, 'cursive-' + letter + '-practice-sheet.png');
          pngBtn.disabled = false;
        }, 'image/png');
      };
      img.onerror = function () { URL.revokeObjectURL(url); pngBtn.disabled = false; };
      img.src = url;
    });

    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('[data-letter-tools]');
    if (!root) return;
    var letter = root.getAttribute('data-letter-tools');
    if (!G[letter]) return;
    try { initGen(root, letter); } catch (e) {}
    try { initSheet(root, letter); } catch (e) {}
  });
})();
