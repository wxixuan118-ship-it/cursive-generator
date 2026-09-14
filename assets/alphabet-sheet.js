/* alphabet-sheet.js — printable cursive alphabet practice sheet (A–Z).
   Loaded by /cursive-alphabet-practice-sheet.html after sheet-engine.js. */
(function () {
  var S = window.CTGSheet;
  if (!S) return;
  var W = S.W, H = S.H, M = S.M;
  var ALPHA = 'abcdefghijklmnopqrstuvwxyz';

  /* Letter families in the order most handwriting schemes teach them. */
  var GROUPS = { all: ALPHA, under: 'ituwrsjp', over: 'nmvxyz', loop: 'lhkbfe', oval: 'acdgoq' };
  var GROUP_NAMES = {
    all: 'Full alphabet A–Z', under: 'Undercurve letters', over: 'Overcurve letters',
    loop: 'Loop letters', oval: 'Oval letters', custom: 'Custom letters'
  };

  /* The pieces of one repetition: ["A","a"], ["a"] or ["A"]. */
  function units(l, kase) {
    if (kase === 'lower') return [l];
    if (kase === 'upper') return [l.toUpperCase()];
    return [l.toUpperCase(), l];
  }
  function caseName(kase) {
    return kase === 'lower' ? 'lowercase a–z' : kase === 'upper' ? 'uppercase A–Z' : 'uppercase & lowercase';
  }

  /* ---------- practice sheet: one ruled row per letter, paginated ---------- */
  function buildSheets(o) {
    var r = S.ruling(72), top = 128, rowsPerPage = Math.floor((H - top - 44) / r.rowH);   /* 9 */
    var traced = o.trace === 'trace' ? Infinity : o.trace === 'model' ? 0 : 3;
    var rows = [];
    o.letters.split('').forEach(function (l) { for (var i = 0; i < o.rows; i++) rows.push(l); });
    var total = Math.max(1, Math.ceil(rows.length / rowsPerPage));
    var title = 'Cursive Alphabet Practice Sheet' + (o.group === 'all' ? '' : ' — ' + GROUP_NAMES[o.group]);
    var sub = caseName(o.kase) + ' · ' + (o.trace === 'trace' ? 'trace every letter' :
              o.trace === 'model' ? 'copy the model letter' : 'trace the dotted letters, then write on your own');
    var pages = [];
    for (var p = 0; p < total; p++) {
      var svg = S.page(title, sub, p + 1, total), y = top;
      rows.slice(p * rowsPerPage, (p + 1) * rowsPerPage).forEach(function (l) {
        S.ruledLine(svg, y, r); S.repeatRow(svg, units(l, o.kase), y, r, traced); y += r.rowH;
      });
      pages.push(svg);
    }
    return pages;
  }

  /* ---------- one-page alphabet chart: 26 solid Aa pairs in a grid ---------- */
  function buildChart(o) {
    var r = S.ruling(72), LINE_H = r.lineH;
    var svg = S.page('Cursive Alphabet Chart', caseName(o.kase) + ' · all 26 letters on one page', 1, 1);
    var cols = 4, rowsN = 7, top = 128, cw = (W - 2 * M) / cols, ch = (H - top - 44) / rowsN;
    o.letters.split('').forEach(function (l, i) {
      var cx = M + (i % cols) * cw, cy = top + Math.floor(i / cols) * ch + (ch - LINE_H) / 2 - 6;
      var us = units(l, o.kase), wAll = 0;
      us.forEach(function (u, k) { wAll += S.width(u, r.fs) + (k ? r.gap : 0); });
      [[0, '#d8e0da', 1.2, '6 6'], [r.mid, '#e4eae6', 1, '6 6'], [LINE_H, '#a9b8ae', 1.6, 'none']].forEach(function (ln) {
        svg.appendChild(S.el('line', {x1: cx + 8, y1: cy + ln[0], x2: cx + cw - 8, y2: cy + ln[0],
                                      stroke: ln[1], 'stroke-width': ln[2], 'stroke-dasharray': ln[3]}));
      });
      var gx = cx + (cw - wAll) / 2;
      us.forEach(function (u) { S.letter(svg, u, gx, cy + LINE_H - 1, 'solid', r.fs); gx += S.width(u, r.fs) + r.gap; });
      S.text(svg, l.toUpperCase() + l, cx + 8, cy - 8, 11, '#8fa396', 'bold');
    });
    return [svg];
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
    var o = readOptions(root);
    var pages = o.layout === 'chart' ? buildChart(o) : buildSheets(o);
    S.mountPages(root.querySelector('[data-as-sheets]'), pages, fileBase(o));
    var count = root.querySelector('[data-as-count]');
    if (count) count.textContent = o.letters.length + ' letter' + (o.letters.length === 1 ? '' : 's') +
      ' · ' + pages.length + ' page' + (pages.length === 1 ? '' : 's');
    root._asPages = pages; root._asName = fileBase(o);
  }

  function init() {
    var root = document.querySelector('[data-alphabet-sheet]');
    if (!root) return;

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
      allBtn.disabled = true;
      S.toPngAll(root._asPages || [], root._asName, function () { allBtn.disabled = false; });
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

  document.addEventListener('DOMContentLoaded', function () { S.ready(init); });
})();
