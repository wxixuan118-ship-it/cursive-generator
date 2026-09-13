// invisible-text.js — invisible / blank character generator.
//
// Everything on the page is driven by CHARS below: the picker chips, the
// generated output, the per-character copy table and the analyzer. Add a new
// invisible character by adding one entry; nothing else needs to change.
(function () {
  'use strict';

  var CHARS = [
    { cp: 0x3164, name: 'Hangul Filler',            short: 'Hangul Filler',   width: 'Wide blank',   best: 'Fortnite, PUBG, Free Fire, Instagram, Discord blank names', note: 'The most widely used invisible character. Renders as a visible-width blank on almost every platform and passes most "name cannot be empty" checks.' },
    { cp: 0x2800, name: 'Braille Pattern Blank',    short: 'Braille Blank',   width: 'Medium blank', best: 'Discord, Twitch, Steam, Instagram bio spacing',            note: 'A Braille cell with no dots. Not treated as whitespace, so apps rarely strip it — good where Hangul Filler is refused.' },
    { cp: 0x200B, name: 'Zero Width Space',         short: 'Zero Width Space',width: 'Zero width',   best: 'Blank WhatsApp / iMessage messages, hidden line breaks',  note: 'Takes up no space at all. Great for a truly empty message or for breaking a hashtag or link without a visible gap.' },
    { cp: 0x200C, name: 'Zero Width Non-Joiner',    short: 'ZWNJ',            width: 'Zero width',   best: 'Duplicate usernames on Discord / Instagram',              note: 'Invisible and zero-width. Slipped between letters it makes a name look identical to an existing one while remaining unique.' },
    { cp: 0x200D, name: 'Zero Width Joiner',        short: 'ZWJ',             width: 'Zero width',   best: 'Invisible padding inside text',                          note: 'Normally glues emoji together; alone it is invisible. Some platforms strip it, so test first.' },
    { cp: 0x2060, name: 'Word Joiner',              short: 'Word Joiner',     width: 'Zero width',   best: 'Preventing line breaks, invisible padding',              note: 'Zero-width and non-breaking. Survives more copy-paste round trips than ZWSP on some systems.' },
    { cp: 0x3000, name: 'Ideographic Space',        short: 'Ideographic Space',width: 'Wide space',  best: 'Wide blank lines in Instagram captions and bios',        note: 'A full-width CJK space. Visibly wide and treated as whitespace, so it can be trimmed from the start or end of a field.' },
    { cp: 0x2003, name: 'Em Space',                 short: 'Em Space',        width: 'Wide space',   best: 'Indentation and spacing in bios',                        note: 'As wide as the letter M. Counted as whitespace by most apps.' },
    { cp: 0x202F, name: 'Narrow No-Break Space',    short: 'Narrow NBSP',     width: 'Thin space',   best: 'Subtle spacing that will not wrap',                      note: 'A thin, non-breaking space. Useful for tightening a spaced-out username.' },
    { cp: 0x200A, name: 'Hair Space',               short: 'Hair Space',      width: 'Thin space',   best: 'The thinnest visible gap',                               note: 'Barely visible. Combine several for fine control over spacing.' },
    { cp: 0x1160, name: 'Hangul Jungseong Filler',  short: 'Jungseong Filler',width: 'Medium blank', best: 'Alternative blank for game names',                       note: 'A second Hangul filler. Try it when U+3164 is refused; renders blank on most systems.' },
    { cp: 0xFFA0, name: 'Halfwidth Hangul Filler',  short: 'Halfwidth Filler',width: 'Narrow blank', best: 'Narrow blank for tight name fields',                     note: 'The half-width version of the Hangul Filler. Narrower blank, same behaviour.' },
    { cp: 0x115F, name: 'Hangul Choseong Filler',   short: 'Choseong Filler', width: 'Wide blank',   best: 'Another Fortnite / Discord blank fallback',              note: 'Wide blank glyph from the Hangul Jamo block. Occasionally shows as a dotted box on very old fonts.' },
    { cp: 0xFEFF, name: 'Zero Width No-Break Space',short: 'ZWNBSP / BOM',    width: 'Zero width',   best: 'Legacy invisible padding',                               note: 'Historically the byte-order mark. Invisible, but some editors strip it — prefer Word Joiner for new text.' },
  ];

  var hex = function (cp) { return 'U+' + cp.toString(16).toUpperCase().padStart(4, '0'); };
  var ch = function (cp) { return String.fromCodePoint(cp); };

  var root = document.querySelector('[data-invisible-tool]');
  if (!root) return;

  var chips = root.querySelector('[data-char-chips]');
  var countInput = root.querySelector('[data-count]');
  var quick = root.querySelectorAll('[data-quick]');
  var output = root.querySelector('[data-output]');
  var meta = root.querySelector('[data-meta]');
  var copyBtn = root.querySelector('[data-copy-main]');
  var selectBtn = root.querySelector('[data-select]');
  var table = document.querySelector('[data-char-table]');
  var analyzer = document.querySelector('[data-analyzer]');
  var analyzeOut = document.querySelector('[data-analyze-out]');
  var toast = document.querySelector('.cluster-toast');

  var current = CHARS[0];

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(function () { toast.classList.remove('show'); }, 1500);
  }

  function copyText(text, button, label) {
    var done = function () {
      showToast(label || 'Copied invisible text');
      if (button) {
        var old = button.textContent;
        button.classList.add('copied');
        button.textContent = 'Copied!';
        setTimeout(function () { button.classList.remove('copied'); button.textContent = old; }, 1400);
      }
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
      return;
    }
    fallback(text, done);
  }
  function fallback(text, done) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); done(); } finally { area.remove(); }
  }

  function count() {
    var n = parseInt(countInput.value, 10);
    if (!(n >= 1)) n = 1;
    if (n > 5000) n = 5000;
    countInput.value = n;
    return n;
  }

  function render() {
    var n = count();
    var text = ch(current.cp).repeat(n);
    output.value = text;
    meta.textContent = n + ' × ' + current.name + ' (' + hex(current.cp) + ') · ' + text.length + ' UTF-16 unit' + (text.length === 1 ? '' : 's') + ' · ' + current.width;
    Array.prototype.forEach.call(chips.querySelectorAll('.cluster-chip'), function (b) {
      var on = Number(b.getAttribute('data-cp')) === current.cp;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  // Picker chips (first six characters; the rest live in the table below).
  chips.innerHTML = CHARS.slice(0, 6).map(function (c) {
    return '<button class="cluster-chip" type="button" data-cp="' + c.cp + '" aria-pressed="false">' + c.short + ' <small>' + hex(c.cp) + '</small></button>';
  }).join('');
  chips.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cp]');
    if (!b) return;
    current = CHARS.filter(function (c) { return c.cp === Number(b.getAttribute('data-cp')); })[0] || current;
    render();
  });

  countInput.addEventListener('input', render);
  Array.prototype.forEach.call(quick, function (b) {
    b.addEventListener('click', function () { countInput.value = b.getAttribute('data-quick'); render(); });
  });
  copyBtn.addEventListener('click', function () { copyText(output.value, copyBtn, 'Copied ' + count() + ' invisible character' + (count() === 1 ? '' : 's')); });
  selectBtn.addEventListener('click', function () { output.focus(); output.select(); });

  // Per-character table with its own copy buttons.
  if (table) {
    table.innerHTML = CHARS.map(function (c) {
      return '<tr><td><code>' + hex(c.cp) + '</code></td><td><strong>' + c.name + '</strong><br><span>' + c.note + '</span></td><td>' + c.width + '</td><td>' + c.best + '</td>' +
        '<td><button class="cluster-copy" type="button" data-copy-cp="' + c.cp + '">Copy</button></td></tr>';
    }).join('');
    table.addEventListener('click', function (e) {
      var b = e.target.closest('[data-copy-cp]');
      if (!b) return;
      var cp = Number(b.getAttribute('data-copy-cp'));
      copyText(ch(cp), b, 'Copied ' + hex(cp));
    });
  }

  // Analyzer: paste anything, see which invisible characters it contains.
  if (analyzer && analyzeOut) {
    var NAMES = {};
    CHARS.forEach(function (c) { NAMES[c.cp] = c.name; });
    NAMES[0x20] = 'Space'; NAMES[0xA0] = 'No-Break Space'; NAMES[0x2028] = 'Line Separator'; NAMES[0x2029] = 'Paragraph Separator';
    NAMES[0x180E] = 'Mongolian Vowel Separator'; NAMES[0x2002] = 'En Space'; NAMES[0x2004] = 'Three-Per-Em Space'; NAMES[0x2005] = 'Four-Per-Em Space';
    NAMES[0x2006] = 'Six-Per-Em Space'; NAMES[0x2007] = 'Figure Space'; NAMES[0x2008] = 'Punctuation Space'; NAMES[0x2009] = 'Thin Space';
    NAMES[0x205F] = 'Medium Mathematical Space'; NAMES[0x061C] = 'Arabic Letter Mark'; NAMES[0x034F] = 'Combining Grapheme Joiner';
    var isInvisible = function (cp) { return NAMES[cp] !== undefined || (cp >= 0x200B && cp <= 0x200F) || (cp >= 0x2060 && cp <= 0x2064) || (cp >= 0xFE00 && cp <= 0xFE0F) || (cp >= 0xE0100 && cp <= 0xE01EF) || (cp >= 0x1D173 && cp <= 0x1D17A) || cp === 0x00AD; };
    var analyze = function () {
      var text = analyzer.value;
      if (!text) { analyzeOut.innerHTML = '<p class="cluster-note">Paste text above to see every character it contains.</p>'; return; }
      var cps = Array.from(text);
      var tally = {};
      var invisibleCount = 0;
      cps.forEach(function (s) {
        var cp = s.codePointAt(0);
        if (isInvisible(cp)) {
          invisibleCount++;
          var key = hex(cp);
          tally[key] = tally[key] || { n: 0, name: NAMES[cp] || (cp >= 0xFE00 && cp <= 0xFE0F ? 'Variation Selector' : cp >= 0xE0100 ? 'Variation Selector Supplement' : cp === 0xAD ? 'Soft Hyphen' : 'Invisible / format character') };
          tally[key].n++;
        }
      });
      var rows = Object.keys(tally).map(function (k) { return '<tr><td><code>' + k + '</code></td><td>' + tally[k].name + '</td><td>' + tally[k].n + '</td></tr>'; }).join('');
      analyzeOut.innerHTML =
        '<p><strong>' + cps.length + '</strong> character' + (cps.length === 1 ? '' : 's') + ' total · <strong>' + invisibleCount + '</strong> invisible or spacing character' + (invisibleCount === 1 ? '' : 's') + (invisibleCount ? '' : ' — nothing hidden here.') + '</p>' +
        (rows ? '<table class="inv-table inv-table-compact"><thead><tr><th>Code point</th><th>Character</th><th>Count</th></tr></thead><tbody>' + rows + '</tbody></table>' : '');
    };
    analyzer.addEventListener('input', analyze);
    analyze();
  }

  render();
})();
