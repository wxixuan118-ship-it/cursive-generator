/* ── Pixel Font Engine — shared bitmap renderer ─────────────────────────────
   One renderer, many pages. Nothing here touches the DOM beyond the canvas it
   is handed, so the same engine drives /mario-font-generator.html,
   /undertale-font-generator.html and every retro/pixel/arcade page added later.

     PixelFont  →  glyph bitmaps + text layout   (no colour, no canvas)
     THEMES     →  named looks (colour, outline, extrude, background)
     draw()     →  paint a layout onto a canvas with a theme
     blockArt() →  the same layout as copy-and-paste Unicode block characters

   The glyphs below are original 5x8 bitmaps authored for this site. They are
   NOT a copy of any game's typeface — no font file is downloaded, embedded or
   redistributed, which is deliberate: fan recreations of game fonts carry
   licensing problems that a bitmap we drew ourselves does not.

   Cell geometry: 5 wide x 8 tall. Row 0 is the cap line, row 6 the baseline,
   row 7 the descender row (g j p q y and the comma reach into it).
   ------------------------------------------------------------------------ */
(function () {
  'use strict';

  var CELL_W = 5, CELL_H = 8;

  /* Rows are '/'-separated, '.' = off, 'X' = on. */
  var G = {
    'A': '.XXX./X...X/X...X/XXXXX/X...X/X...X/X...X/.....',
    'B': 'XXXX./X...X/X...X/XXXX./X...X/X...X/XXXX./.....',
    'C': '.XXX./X...X/X..../X..../X..../X...X/.XXX./.....',
    'D': 'XXXX./X...X/X...X/X...X/X...X/X...X/XXXX./.....',
    'E': 'XXXXX/X..../X..../XXXX./X..../X..../XXXXX/.....',
    'F': 'XXXXX/X..../X..../XXXX./X..../X..../X..../.....',
    'G': '.XXX./X...X/X..../X.XXX/X...X/X...X/.XXX./.....',
    'H': 'X...X/X...X/X...X/XXXXX/X...X/X...X/X...X/.....',
    'I': 'XXXXX/..X../..X../..X../..X../..X../XXXXX/.....',
    'J': '..XXX/...X./...X./...X./...X./X..X./.XX../.....',
    'K': 'X...X/X..X./X.X../XX.../X.X../X..X./X...X/.....',
    'L': 'X..../X..../X..../X..../X..../X..../XXXXX/.....',
    'M': 'X...X/XX.XX/X.X.X/X.X.X/X...X/X...X/X...X/.....',
    'N': 'X...X/XX..X/X.X.X/X..XX/X...X/X...X/X...X/.....',
    'O': '.XXX./X...X/X...X/X...X/X...X/X...X/.XXX./.....',
    'P': 'XXXX./X...X/X...X/XXXX./X..../X..../X..../.....',
    'Q': '.XXX./X...X/X...X/X...X/X.X.X/X..X./.XX.X/.....',
    'R': 'XXXX./X...X/X...X/XXXX./X.X../X..X./X...X/.....',
    'S': '.XXXX/X..../X..../.XXX./....X/....X/XXXX./.....',
    'T': 'XXXXX/..X../..X../..X../..X../..X../..X../.....',
    'U': 'X...X/X...X/X...X/X...X/X...X/X...X/.XXX./.....',
    'V': 'X...X/X...X/X...X/X...X/X...X/.X.X./..X../.....',
    'W': 'X...X/X...X/X...X/X.X.X/X.X.X/XX.XX/X...X/.....',
    'X': 'X...X/X...X/.X.X./..X../.X.X./X...X/X...X/.....',
    'Y': 'X...X/X...X/.X.X./..X../..X../..X../..X../.....',
    'Z': 'XXXXX/....X/...X./..X../.X.../X..../XXXXX/.....',

    'a': '...../...../.XXX./....X/.XXXX/X...X/.XXXX/.....',
    'b': 'X..../X..../XXXX./X...X/X...X/X...X/XXXX./.....',
    'c': '...../...../.XXXX/X..../X..../X..../.XXXX/.....',
    'd': '....X/....X/.XXXX/X...X/X...X/X...X/.XXXX/.....',
    'e': '...../...../.XXX./X...X/XXXXX/X..../.XXX./.....',
    'f': '..XX./.X.../.X.../XXXX./.X.../.X.../.X.../.....',
    'g': '...../...../.XXXX/X...X/X...X/.XXXX/....X/.XXX.',
    'h': 'X..../X..../XXXX./X...X/X...X/X...X/X...X/.....',
    'i': '..X../...../.XX../..X../..X../..X../.XXX./.....',
    'j': '...X./...../..XX./...X./...X./...X./X..X./.XX..',
    'k': 'X..../X..../X..X./X.X../XX.../X.X../X..X./.....',
    'l': '.XX../..X../..X../..X../..X../..X../.XXX./.....',
    'm': '...../...../XX.X./X.X.X/X.X.X/X.X.X/X.X.X/.....',
    'n': '...../...../XXXX./X...X/X...X/X...X/X...X/.....',
    'o': '...../...../.XXX./X...X/X...X/X...X/.XXX./.....',
    'p': '...../...../XXXX./X...X/X...X/XXXX./X..../X....',
    'q': '...../...../.XXXX/X...X/X...X/.XXXX/....X/....X',
    'r': '...../...../X.XXX/XX.../X..../X..../X..../.....',
    's': '...../...../.XXXX/X..../.XXX./....X/XXXX./.....',
    't': '.X.../.X.../XXXX./.X.../.X.../.X..X/..XX./.....',
    'u': '...../...../X...X/X...X/X...X/X...X/.XXXX/.....',
    'v': '...../...../X...X/X...X/X...X/.X.X./..X../.....',
    'w': '...../...../X...X/X...X/X.X.X/X.X.X/.X.X./.....',
    'x': '...../...../X...X/.X.X./..X../.X.X./X...X/.....',
    'y': '...../...../X...X/X...X/X...X/.XXXX/....X/.XXX.',
    'z': '...../...../XXXXX/...X./..X../.X.../XXXXX/.....',

    '0': '.XXX./X...X/X..XX/X.X.X/XX..X/X...X/.XXX./.....',
    '1': '..X../.XX../..X../..X../..X../..X../.XXX./.....',
    '2': '.XXX./X...X/....X/...X./..X../.X.../XXXXX/.....',
    '3': '.XXX./X...X/....X/..XX./....X/X...X/.XXX./.....',
    '4': '...X./..XX./.X.X./X..X./XXXXX/...X./...X./.....',
    '5': 'XXXXX/X..../XXXX./....X/....X/X...X/.XXX./.....',
    '6': '..XX./.X.../X..../XXXX./X...X/X...X/.XXX./.....',
    '7': 'XXXXX/....X/...X./..X../.X.../.X.../.X.../.....',
    '8': '.XXX./X...X/X...X/.XXX./X...X/X...X/.XXX./.....',
    '9': '.XXX./X...X/X...X/.XXXX/....X/...X./.XX../.....',

    '.': '...../...../...../...../...../.XX../.XX../.....',
    ',': '...../...../...../...../...../..XX./..XX./..X..',
    '!': '..X../..X../..X../..X../..X../...../..X../.....',
    '?': '.XXX./X...X/....X/...X./..X../...../..X../.....',
    "'": '..X../..X../...../...../...../...../...../.....',
    '"': '.X.X./.X.X./...../...../...../...../...../.....',
    ':': '...../...../..X../...../...../..X../...../.....',
    ';': '...../...../..X../...../...../..X../..X../.X...',
    '-': '...../...../...../XXXXX/...../...../...../.....',
    '_': '...../...../...../...../...../...../...../XXXXX',
    '+': '...../..X../..X../XXXXX/..X../..X../...../.....',
    '=': '...../...../XXXXX/...../XXXXX/...../...../.....',
    '*': '...../X.X.X/.XXX./XXXXX/.XXX./X.X.X/...../.....',
    '/': '....X/....X/...X./..X../.X.../X..../X..../.....',
    '\\': 'X..../X..../.X.../..X../...X./....X/....X/.....',
    '(': '...X./..X../.X.../.X.../.X.../..X../...X./.....',
    ')': '.X.../..X../...X./...X./...X./..X../.X.../.....',
    '[': '..XX./..X../..X../..X../..X../..X../..XX./.....',
    ']': '.XX../..X../..X../..X../..X../..X../.XX../.....',
    '<': '...X./..X../.X.../X..../.X.../..X../...X./.....',
    '>': '.X.../..X../...X./....X/...X./..X../.X.../.....',
    '#': '.X.X./.X.X./XXXXX/.X.X./XXXXX/.X.X./.X.X./.....',
    '@': '.XXX./X...X/X.XXX/X.X.X/X.XXX/X..../.XXX./.....',
    '&': '.XX../X..X./X.X../.X.../X.X.X/X..X./.XX.X/.....',
    '%': 'XX..X/XX.X./...X./..X../.X.../X.XX./X..XX/.....',
    '$': '..X../.XXXX/X.X../.XXX./..X.X/XXXX./..X../.....',
    '|': '..X../..X../..X../..X../..X../..X../..X../.....',
    '^': '..X../.X.X./X...X/...../...../...../...../.....',
    ' ': '...../...../...../...../...../...../...../.....'
  };

  /* Decode once, on load: '.XXX./…' → [[0,1,1,1,0], …]. */
  var BITMAPS = {};
  Object.keys(G).forEach(function (ch) {
    BITMAPS[ch] = G[ch].split('/').map(function (row) {
      var out = [];
      for (var i = 0; i < CELL_W; i++) out.push(row.charAt(i) === 'X' ? 1 : 0);
      return out;
    });
  });

  var BLANK = BITMAPS[' '];

  /* Characters we cannot draw render as a space rather than a tofu box, so a
     stray emoji or CJK character leaves a gap instead of a row of rectangles.
     The pages say plainly which characters the pixel font covers. */
  function glyph(ch) {
    return BITMAPS[ch] || null;
  }

  /* ── Layout ─────────────────────────────────────────────────────────────
     Returns a plain grid of 0/1 in *pixel units*, not screen pixels:
       { w, h, rows:[Uint8Array], lines:n }
     `tracking` is extra blank columns between glyphs (1 = the default gap). */
  function layout(text, opts) {
    opts = opts || {};
    var tracking = opts.tracking == null ? 1 : Math.max(0, opts.tracking);
    var lineGap = opts.lineGap == null ? 2 : Math.max(0, opts.lineGap);
    var src = String(text == null ? '' : text);
    if (opts.uppercase) src = src.toUpperCase();

    var lines = src.split(/\r?\n/).map(function (line) {
      return Array.from(line).map(function (ch) {
        return glyph(ch) || (ch === '\t' ? BLANK : (BITMAPS[ch] ? BITMAPS[ch] : BLANK));
      });
    });
    if (!lines.length) lines = [[]];

    var w = 0;
    lines.forEach(function (cells) {
      var lw = cells.length ? cells.length * CELL_W + (cells.length - 1) * tracking : 0;
      if (lw > w) w = lw;
    });
    var h = lines.length * CELL_H + (lines.length - 1) * lineGap;
    if (!w) { w = CELL_W; }

    var rows = [];
    for (var y = 0; y < h; y++) rows.push(new Uint8Array(w));

    lines.forEach(function (cells, li) {
      var top = li * (CELL_H + lineGap);
      var lw = cells.length ? cells.length * CELL_W + (cells.length - 1) * tracking : 0;
      var left = opts.align === 'center' ? Math.floor((w - lw) / 2)
        : opts.align === 'right' ? (w - lw) : 0;
      cells.forEach(function (bm, ci) {
        var ox = left + ci * (CELL_W + tracking);
        for (var y = 0; y < CELL_H; y++) {
          for (var x = 0; x < CELL_W; x++) {
            if (bm[y][x] && rows[top + y] && ox + x >= 0 && ox + x < w) rows[top + y][ox + x] = 1;
          }
        }
      });
    });

    return { w: w, h: h, rows: rows, lines: lines.length };
  }

  /* Chebyshev dilation — used for outlines and for the glow halo. */
  function dilate(grid, r) {
    if (!r) return grid;
    var w = grid.w + r * 2, h = grid.h + r * 2;
    var rows = [];
    for (var y = 0; y < h; y++) rows.push(new Uint8Array(w));
    for (var sy = 0; sy < grid.h; sy++) {
      for (var sx = 0; sx < grid.w; sx++) {
        if (!grid.rows[sy][sx]) continue;
        for (var dy = -r; dy <= r; dy++) {
          for (var dx = -r; dx <= r; dx++) rows[sy + r + dy][sx + r + dx] = 1;
        }
      }
    }
    return { w: w, h: h, rows: rows, lines: grid.lines };
  }

  /* ── Themes ─────────────────────────────────────────────────────────────
     A theme is only colour and depth — never letterforms. Every page draws the
     same bitmaps; the theme decides how they are painted, which is why one
     renderer can serve a Mario page and an Undertale page honestly.

       fg        string, or an array of stops for a vertical gradient
       outline   colour of the 1px (or more) border traced around the letters
       extrude   {n, color}  solid 3D depth stepped down-right
       shadow    {dx, dy, color}  flat drop shadow
       bg        canvas colour, or null for a transparent PNG
       bgKind    'solid' | 'none' | 'grid' | 'scanline' | 'checker'
       frame     {color, w, gap}  dialogue-box border drawn inside the edges
       glow      {color, r}  soft halo behind the letters
       overlay   'scanline' draws CRT lines over the finished image
     All distances are in *pixel units*, so they scale with the pixel size. */
  var THEMES = [
    { id: 'mario-classic', name: 'Classic Plumber', cats: 'mario,game,retro,bold,color',
      fg: ['#fff27a', '#ffb300', '#e2231a'], outline: '#1b0d05', outlineW: 1,
      extrude: { n: 2, color: '#7d1512' }, bg: '#5c94fc', bgKind: 'solid', pad: 4, uppercase: true },
    { id: 'mario-block', name: 'Question Block', cats: 'mario,game,block,bold,gold',
      fg: '#fffdf3', outline: '#5b3a12', outlineW: 1,
      shadow: { dx: 2, dy: 2, color: 'rgba(60,32,8,.55)' }, bg: '#e8a33d', bgKind: 'checker',
      checker: '#d8912c', pad: 4, uppercase: true },
    { id: 'warp-pipe', name: 'Warp Pipe', cats: 'mario,game,green,retro',
      fg: ['#8fe36a', '#2fa137'], outline: '#0b2b10', outlineW: 1,
      extrude: { n: 1, color: '#14561f' }, bg: '#0f1a10', bgKind: 'solid', pad: 4 },
    { id: 'coin-gold', name: 'Coin Rush', cats: 'mario,gold,game,bold',
      fg: ['#fff6b0', '#ffc82e', '#c07a05'], outline: '#3a2202', outlineW: 1,
      shadow: { dx: 2, dy: 2, color: 'rgba(0,0,0,.4)' }, bg: '#101a3a', bgKind: 'solid', pad: 4, uppercase: true },
    { id: 'fire-flower', name: 'Fire Flower', cats: 'mario,game,bold,color',
      fg: ['#fff0a8', '#ff7a18', '#c1121f'], outline: '#ffffff', outlineW: 1,
      glow: { color: 'rgba(255,120,20,.45)', r: 2 }, bg: '#120806', bgKind: 'solid', pad: 5 },
    { id: 'power-star', name: 'Power Star', cats: 'mario,game,gold,light',
      fg: ['#ffffff', '#ffe14d'], outline: '#e07b00', outlineW: 1,
      shadow: { dx: 1, dy: 2, color: 'rgba(120,70,0,.45)' }, bg: '#fdf6e3', bgKind: 'grid',
      grid: 'rgba(200,150,40,.25)', pad: 4, uppercase: true },
    { id: 'one-up', name: '1-Up Green', cats: 'mario,game,green,light',
      fg: '#ffffff', outline: '#0d3b17', outlineW: 1, bg: '#2fa137', bgKind: 'solid', pad: 4, uppercase: true },
    { id: 'brick-shadow', name: 'Brick Wall', cats: 'mario,retro,block,warm',
      fg: '#4a2410', outline: null, outlineW: 0,
      shadow: { dx: 1, dy: 1, color: 'rgba(255,240,220,.7)' }, bg: '#c1743c', bgKind: 'checker',
      checker: '#b3682f', pad: 4, uppercase: true },

    { id: 'dialogue-box', name: 'Dialogue Box', cats: 'undertale,game,dialogue,light',
      fg: '#ffffff', outline: null, outlineW: 0, bg: '#000000', bgKind: 'solid',
      frame: { color: '#ffffff', w: 1, gap: 2 }, pad: 6, align: 'left' },
    { id: 'determination', name: 'Determination', cats: 'undertale,game,light,minimal',
      fg: '#ffffff', outline: null, outlineW: 0, bg: '#000000', bgKind: 'solid', pad: 5 },
    { id: 'soul-red', name: 'Red Soul', cats: 'undertale,game,red,dark',
      fg: '#ff2b2b', outline: null, outlineW: 0, glow: { color: 'rgba(255,40,40,.35)', r: 2 },
      bg: '#000000', bgKind: 'solid', pad: 5 },
    { id: 'flowey-gold', name: 'Golden Flower', cats: 'undertale,gold,game,dark',
      fg: ['#fff3a8', '#f2c331'], outline: null, outlineW: 0, bg: '#080a05', bgKind: 'solid', pad: 5 },
    { id: 'bone-blue', name: 'Bone Blue', cats: 'undertale,game,blue,glow',
      fg: '#7fdfff', outline: null, outlineW: 0, glow: { color: 'rgba(90,200,255,.4)', r: 2 },
      bg: '#00060f', bgKind: 'solid', pad: 5 },
    { id: 'battle-box', name: 'Battle Box', cats: 'undertale,dialogue,game,light',
      fg: '#ffffff', outline: null, outlineW: 0, bg: '#000000', bgKind: 'solid',
      frame: { color: '#ffffff', w: 2, gap: 3 }, pad: 8, uppercase: true },
    { id: 'glitch-soul', name: 'Glitched', cats: 'undertale,glitch,dark,red',
      fg: '#f2f2f2', outline: null, outlineW: 0,
      shadow: { dx: 1, dy: 0, color: 'rgba(255,0,60,.85)' }, ghost: { dx: -1, dy: 0, color: 'rgba(0,220,255,.7)' },
      bg: '#050505', bgKind: 'solid', pad: 5 },
    { id: 'papyrus-orange', name: 'Orange Attack', cats: 'undertale,game,color,warm',
      fg: '#ff9f1c', outline: null, outlineW: 0, glow: { color: 'rgba(255,150,20,.32)', r: 2 },
      bg: '#0b0700', bgKind: 'solid', pad: 5 },

    { id: 'arcade-neon', name: 'Arcade Neon', cats: 'arcade,neon,retro,game',
      fg: ['#ff5ce6', '#8b5cff', '#39d0ff'], outline: '#12002b', outlineW: 1,
      glow: { color: 'rgba(180,80,255,.4)', r: 2 }, bg: '#0a0018', bgKind: 'solid', pad: 5 },
    { id: 'gameboy', name: 'Handheld Green', cats: 'retro,gameboy,green,8bit',
      fg: '#0f380f', outline: null, outlineW: 0, bg: '#9bbc0f', bgKind: 'solid', pad: 5, uppercase: true },
    { id: 'crt-scanline', name: 'CRT Monitor', cats: 'retro,crt,8bit,green',
      fg: '#8dff9b', outline: null, outlineW: 0, glow: { color: 'rgba(60,255,120,.3)', r: 1 },
      bg: '#020a04', bgKind: 'solid', overlay: 'scanline', pad: 5 },
    { id: 'terminal', name: 'Terminal', cats: 'retro,8bit,minimal,green',
      fg: '#33ff66', outline: null, outlineW: 0, bg: '#000000', bgKind: 'solid', pad: 5 },
    { id: 'lava-8bit', name: 'Lava 8-Bit', cats: '8bit,arcade,bold,color',
      fg: ['#ffe57a', '#ff8a00', '#b3060f'], outline: '#1a0000', outlineW: 1,
      bg: '#180402', bgKind: 'solid', pad: 5, uppercase: true },
    { id: 'ice-cave', name: 'Ice Cave', cats: 'pixel,cold,light,blue',
      fg: ['#ffffff', '#9fe8ff'], outline: '#0d3a5c', outlineW: 1,
      bg: '#123a52', bgKind: 'grid', grid: 'rgba(255,255,255,.08)', pad: 5 },
    { id: 'pastel-pixel', name: 'Pastel Pixel', cats: 'pixel,cute,light,pink',
      fg: '#e5638d', outline: '#ffffff', outlineW: 1,
      shadow: { dx: 1, dy: 1, color: 'rgba(200,120,150,.35)' }, bg: '#fff4f7', bgKind: 'grid',
      grid: 'rgba(230,150,180,.25)', pad: 5 },
    { id: 'paper-print', name: 'Paper Print', cats: 'pixel,minimal,light',
      fg: '#17201b', outline: null, outlineW: 0, bg: '#fbfaf7', bgKind: 'solid', pad: 5 },
    { id: 'mono-clear', name: 'Transparent PNG', cats: 'pixel,minimal,light,transparent',
      fg: '#17201b', outline: null, outlineW: 0, bg: null, bgKind: 'none', pad: 3 },
    { id: 'midnight', name: 'Midnight Pixel', cats: 'pixel,dark,blue',
      fg: '#7ee8fa', outline: '#00121f', outlineW: 1, bg: '#0b1230', bgKind: 'solid', pad: 5 }
  ];

  var THEME_BY_ID = {};
  THEMES.forEach(function (t) { THEME_BY_ID[t.id] = t; });

  function fillGrid(ctx, grid, ox, oy, scale, style) {
    ctx.fillStyle = style;
    for (var y = 0; y < grid.h; y++) {
      var row = grid.rows[y];
      var x = 0;
      while (x < grid.w) {
        if (!row[x]) { x++; continue; }
        var run = 1;
        while (x + run < grid.w && row[x + run]) run++;      /* run-length fill keeps
                                                                long text cheap */
        ctx.fillRect((ox + x) * scale, (oy + y) * scale, run * scale, scale);
        x += run;
      }
    }
  }

  function paintStyle(ctx, fg, top, height, scale) {
    if (!Array.isArray(fg)) return fg;
    var g = ctx.createLinearGradient(0, top * scale, 0, (top + height) * scale);
    fg.forEach(function (stop, i) { g.addColorStop(fg.length === 1 ? 0 : i / (fg.length - 1), stop); });
    return g;
  }

  /* ── draw ───────────────────────────────────────────────────────────────
     Paints `text` onto `canvas` and returns the metrics used, so a caller can
     size the element or report the PNG dimensions. `over` lets the page's
     colour controls replace the theme's fg/bg without editing the theme. */
  function draw(canvas, text, theme, opts) {
    opts = opts || {};
    var over = opts.override || {};
    var scale = Math.max(1, opts.scale || 6);
    var t = theme || THEMES[0];

    var grid = layout(text || ' ', {
      tracking: opts.tracking == null ? (t.tracking == null ? 1 : t.tracking) : opts.tracking,
      lineGap: 2,
      uppercase: opts.uppercase == null ? !!t.uppercase : !!opts.uppercase,
      align: t.align === 'left' ? 'left' : 'center'
    });

    var outlineW = t.outlineW || 0;
    var glowR = t.glow ? t.glow.r : 0;
    var frameW = t.frame ? t.frame.w + t.frame.gap : 0;
    var pad = (t.pad == null ? 4 : t.pad) + frameW;
    var grow = Math.max(outlineW, glowR);
    var extrudeN = t.extrude ? t.extrude.n : 0;
    var shX = t.shadow ? t.shadow.dx : 0, shY = t.shadow ? t.shadow.dy : 0;
    var ghX = t.ghost ? Math.abs(t.ghost.dx) : 0;

    var left = pad + grow + Math.max(0, -(t.ghost ? t.ghost.dx : 0));
    var topPad = pad + grow;
    var right = pad + grow + Math.max(extrudeN, shX, ghX);
    var bottom = pad + grow + Math.max(extrudeN, shY);

    var W = grid.w + left + right;
    var H = grid.h + topPad + bottom;

    canvas.width = W * scale;
    canvas.height = H * scale;
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Background */
    var bg = over.bg !== undefined ? over.bg : t.bg;
    var kind = over.bg === null ? 'none' : t.bgKind || (bg ? 'solid' : 'none');
    if (bg && kind !== 'none') {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      if (kind === 'checker') {
        ctx.fillStyle = t.checker || 'rgba(0,0,0,.12)';
        for (var cy = 0; cy < H; cy += 4) {
          for (var cx = (cy / 4) % 2 ? 4 : 0; cx < W; cx += 8) ctx.fillRect(cx * scale, cy * scale, 4 * scale, 4 * scale);
        }
      } else if (kind === 'grid') {
        ctx.fillStyle = t.grid || 'rgba(0,0,0,.1)';
        for (var gy = 0; gy < H; gy += 4) ctx.fillRect(0, gy * scale, canvas.width, Math.max(1, scale * 0.2));
        for (var gx = 0; gx < W; gx += 4) ctx.fillRect(gx * scale, 0, Math.max(1, scale * 0.2), canvas.height);
      }
    }

    /* Dialogue-box frame */
    if (t.frame) {
      ctx.fillStyle = t.frame.color;
      var fw = t.frame.w * scale;
      var inset = 1 * scale;
      ctx.fillRect(inset, inset, canvas.width - inset * 2, fw);
      ctx.fillRect(inset, canvas.height - inset - fw, canvas.width - inset * 2, fw);
      ctx.fillRect(inset, inset, fw, canvas.height - inset * 2);
      ctx.fillRect(canvas.width - inset - fw, inset, fw, canvas.height - inset * 2);
    }

    var thick = grow ? dilate(grid, grow) : grid;

    if (t.glow) fillGrid(ctx, dilate(grid, glowR), left - glowR, topPad - glowR, scale, t.glow.color);
    if (t.shadow) fillGrid(ctx, thick, left - grow + t.shadow.dx, topPad - grow + t.shadow.dy, scale, t.shadow.color);
    if (t.ghost) fillGrid(ctx, grid, left + t.ghost.dx, topPad + t.ghost.dy, scale, t.ghost.color);
    if (t.extrude) {
      for (var e = extrudeN; e >= 1; e--) {
        fillGrid(ctx, thick, left - grow + e, topPad - grow + e, scale, t.extrude.color);
      }
    }
    if (outlineW) fillGrid(ctx, dilate(grid, outlineW), left - outlineW, topPad - outlineW, scale, t.outline);

    var fg = over.fg || t.fg;
    fillGrid(ctx, grid, left, topPad, scale, paintStyle(ctx, fg, topPad, grid.h, scale));

    if (t.overlay === 'scanline') {
      ctx.fillStyle = 'rgba(0,0,0,.28)';
      for (var sy = 0; sy < H; sy += 2) ctx.fillRect(0, sy * scale, canvas.width, Math.max(1, Math.round(scale / 2)));
    }

    return { width: canvas.width, height: canvas.height, units: { w: W, h: H }, scale: scale, grid: grid };
  }

  /* The same layout as copy-and-paste text. This is the one output that
     survives the clipboard, so pages must not describe the PNG as copyable. */
  function blockArt(text, opts) {
    opts = opts || {};
    var on = opts.on || '█';
    var off = opts.off || ' ';
    var grid = layout(text, { tracking: opts.tracking == null ? 1 : opts.tracking, uppercase: opts.uppercase });
    var out = [];
    for (var y = 0; y < grid.h; y++) {
      var line = '';
      for (var x = 0; x < grid.w; x++) line += grid.rows[y][x] ? on : off;
      out.push(line.replace(/\s+$/, ''));
    }
    while (out.length && !out[out.length - 1]) out.pop();
    return out.join('\n');
  }

  window.PixelFont = {
    CELL_W: CELL_W,
    CELL_H: CELL_H,
    BITMAPS: BITMAPS,
    THEMES: THEMES,
    theme: function (id) { return THEME_BY_ID[id] || null; },
    supports: function (ch) { return Object.prototype.hasOwnProperty.call(BITMAPS, ch); },
    layout: layout,
    dilate: dilate,
    draw: draw,
    blockArt: blockArt
  };
})();
