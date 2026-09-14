/* handwriting-sheets.js — the ready-to-print library on
   /printable-cursive-handwriting-practice-sheets.html. Loaded after
   sheet-engine.js. Every card is built from the catalogue below; the page
   holds one <div class="hs-card" data-hs="id"> per entry with an empty
   [data-hs-pages] host, and this script fills it in. */
(function () {
  var S = window.CTGSheet;
  if (!S) return;
  var W = S.W, H = S.H, M = S.M, TOP = 128, BOTTOM = 44;
  var ALPHA = 'abcdefghijklmnopqrstuvwxyz';

  var PRE_PRIMER = 'a and away big blue can come down find for funny go help here I in is it jump little look make me my not one play red run said see the three to two up we where yellow you'.split(' ');
  var PRIMER = 'all am are at ate be black brown but came did do eat four get good have he into like must new no now on our out please pretty ran ride saw say she so soon that there they this too under want was well went what white who will with yes'.split(' ');
  var DAYS = 'Monday Tuesday Wednesday Thursday Friday Saturday Sunday'.split(' ');
  var MONTHS = 'January February March April May June July August September October November December'.split(' ');
  var COLOURS_NUMBERS = 'red orange yellow green blue purple pink brown black white one two three four five six seven eight nine ten'.split(' ');
  var SIMPLE = ['The cat sat on the mat.', 'I like to read books.', 'We play in the park.', 'My dog can run fast.',
                'The sun is hot today.', 'She has a red hat.', 'Birds sing in the morning.', 'I can write in cursive.',
                'We went to the beach.', 'It is fun to learn.'];
  var PANGRAMS = ['The quick brown fox jumps over the lazy dog.', 'The five boxing wizards jump quickly.',
                  'How vexingly quick daft zebras jump!', 'Sphinx of black quartz, judge my vow.',
                  'Jackdaws love my big sphinx of quartz.'];

  /* ---------- builders ---------- */
  function paginate(title, sub, rowH, items, draw) {
    var perPage = Math.floor((H - TOP - BOTTOM) / rowH), total = Math.max(1, Math.ceil(items.length / perPage)), pages = [];
    for (var p = 0; p < total; p++) {
      var svg = S.page(title, sub, p + 1, total), y = TOP;
      items.slice(p * perPage, (p + 1) * perPage).forEach(function (it) { draw(svg, it, y); y += rowH; });
      pages.push(svg);
    }
    return pages;
  }

  /* Blank three-line paper: ruled rows down the whole page. */
  function paper(o) {
    var r = S.ruling(o.lineH), rows = [];
    for (var y = TOP; y + r.lineH <= H - BOTTOM; y += r.rowH) rows.push(y);
    var svg = S.page(o.title, o.sub, 1, 1);
    rows.forEach(function (y) { S.ruledLine(svg, y, r); });
    return [svg];
  }

  /* Letter rows: model, three dotted copies, blank space. */
  function alphabet(o) {
    var r = S.ruling(72);
    var items = ALPHA.split('').map(function (l) {
      return o.kase === 'lower' ? [l] : o.kase === 'upper' ? [l.toUpperCase()] : [l.toUpperCase(), l];
    });
    return paginate(o.title, o.sub, r.rowH, items, function (svg, parts, y) {
      S.ruledLine(svg, y, r); S.repeatRow(svg, parts, y, r, 3);
    });
  }

  /* Word rows: model word, two dotted copies, blank space. */
  function words(o) {
    var r = S.ruling(56);
    return paginate(o.title, o.sub, r.rowH, o.words, function (svg, w, y) {
      S.ruledLine(svg, y, r); S.repeatRow(svg, [w], y, r, 2);
    });
  }

  /* Sentence blocks: the model wrapped over as many rows as it needs, then
     the same number of blank rows to copy it onto. */
  function sentences(o) {
    var r = S.ruling(44), rows = [];
    o.sentences.forEach(function (s) {
      var lines = S.wrapWords(s, r);
      lines.forEach(function (ln) { rows.push({t: ln}); });
      lines.forEach(function () { rows.push({t: null}); });
      rows.push({t: null, spacer: true});
    });
    /* keep each sentence block on one page */
    var perPage = Math.floor((H - TOP - BOTTOM) / r.rowH), pages = [], cur = [], all = [];
    var block = [];
    rows.forEach(function (row) {
      block.push(row);
      if (row.spacer) {
        if (cur.length + block.length > perPage + 1) { all.push(cur); cur = []; }
        cur = cur.concat(block); block = [];
      }
    });
    if (cur.length) all.push(cur);
    all.forEach(function (list, p) {
      var svg = S.page(o.title, o.sub, p + 1, all.length), y = TOP;
      list.forEach(function (row) {
        if (row.spacer) { y += Math.round(r.rowH * 0.35); return; }
        S.ruledLine(svg, y, r);
        if (row.t) S.letter(svg, row.t, M + 14, y + r.lineH - 1, 'solid', r.fs);
        y += r.rowH;
      });
      pages.push(svg);
    });
    return pages;
  }

  /* ---------- catalogue ---------- */
  var CATALOGUE = {
    'paper-wide':     {build: paper, lineH: 72, title: 'Cursive Handwriting Paper — Wide Ruling', sub: '19 mm three-line ruling · for first cursive letters and joins'},
    'paper-standard': {build: paper, lineH: 56, title: 'Cursive Handwriting Paper — Standard Ruling', sub: '15 mm three-line ruling · words and short sentences'},
    'paper-narrow':   {build: paper, lineH: 40, title: 'Cursive Handwriting Paper — Narrow Ruling', sub: '11 mm three-line ruling · fluent writers and copywork'},
    'alphabet-aa':    {build: alphabet, kase: 'both',  title: 'Cursive Alphabet Practice Sheet', sub: 'uppercase & lowercase · trace the dotted letters, then write on your own'},
    'alphabet-lower': {build: alphabet, kase: 'lower', title: 'Lowercase Cursive Alphabet Practice Sheet', sub: 'a–z · trace the dotted letters, then write on your own'},
    'alphabet-upper': {build: alphabet, kase: 'upper', title: 'Uppercase Cursive Alphabet Practice Sheet', sub: 'A–Z · trace the dotted letters, then write on your own'},
    'words-preprimer': {build: words, words: PRE_PRIMER, title: 'Cursive Sight Words — Pre-Primer', sub: '40 Dolch pre-primer words · copy the word, trace the dotted copies, then write it'},
    'words-primer':   {build: words, words: PRIMER, title: 'Cursive Sight Words — Primer', sub: '52 Dolch primer words · copy the word, trace the dotted copies, then write it'},
    'words-days':     {build: words, words: DAYS, title: 'Days of the Week in Cursive', sub: 'Monday to Sunday · capital letter joins'},
    'words-months':   {build: words, words: MONTHS, title: 'Months of the Year in Cursive', sub: 'January to December · capital letter joins'},
    'words-colours':  {build: words, words: COLOURS_NUMBERS, title: 'Colours and Numbers in Cursive', sub: 'ten colour words and the numbers one to ten'},
    'sentences-simple': {build: sentences, sentences: SIMPLE, title: 'Cursive Sentence Practice — Simple Sentences', sub: 'copy each sentence onto the blank lines below it'},
    'sentences-pangrams': {build: sentences, sentences: PANGRAMS, title: 'Cursive Sentence Practice — Pangrams', sub: 'every letter of the alphabet in one sentence'}
  };

  /* ---------- cards ---------- */
  function mountCard(card) {
    var id = card.getAttribute('data-hs'), o = CATALOGUE[id];
    if (!o) return;
    var pages = o.build(o), host = card.querySelector('[data-hs-pages]');
    host.innerHTML = '';
    pages.forEach(function (svg) {
      var wrap = document.createElement('div'); wrap.className = 'as-page';
      svg.setAttribute('width', '100%'); svg.removeAttribute('height');
      wrap.appendChild(svg); host.appendChild(wrap);
    });
    var n = card.querySelector('[data-hs-count]');
    if (n) n.textContent = pages.length + (pages.length === 1 ? ' page' : ' pages');

    var print = card.querySelector('[data-hs-print]');
    if (print) print.addEventListener('click', function () {
      Array.prototype.forEach.call(document.querySelectorAll('.hs-card.printing'), function (c) { c.classList.remove('printing'); });
      card.classList.add('printing');
      window.print();
    });
    var png = card.querySelector('[data-hs-png]');
    if (png) png.addEventListener('click', function () {
      png.disabled = true;
      S.toPngAll(pages, 'cursive-' + id, function () { png.disabled = false; });
    });
    var view = card.querySelector('[data-hs-view]');
    if (view) view.addEventListener('click', function () {
      var open = card.classList.toggle('open');
      view.textContent = open ? 'Close' : 'All pages';
      view.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) card.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    S.ready(function () {
      Array.prototype.forEach.call(document.querySelectorAll('.hs-card[data-hs]'), function (c) {
        try { mountCard(c); } catch (e) {}
      });
    });
  });
  window.addEventListener('afterprint', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.hs-card.printing'), function (c) { c.classList.remove('printing'); });
  });
})();
