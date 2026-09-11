/* ── Lettering Style Generator — shared engine ─────────────────────────────
   One generator, six pages. Each page supplies window.LETTERING_CONFIG and
   this file does the rest: Unicode transforms, CSS-preview rendering, copy
   handling, category filters, preview modes and the display controls.

   Style objects:
     {n:name, c:category, k:'unicode'|'visual', f:mapKey, p:prefix, s:suffix,
      v:'lg-v-*' css class (visual only), up:true (force uppercase)}

   Unicode styles produce real characters that survive copy and paste.
   Visual styles are rendered by the browser with CSS and are labelled as
   previews — they are NOT copyable text, and the engine never pretends
   otherwise: their copy button copies the plain typed text only.
   ------------------------------------------------------------------------ */
(function () {
  'use strict';

  var CFG = window.LETTERING_CONFIG;
  if (!CFG) return;

  /* ── Unicode letter maps: [lowercase a-z, uppercase A-Z, digits 0-9] ──── */
  var M = {
    script:      ['𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏', '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵'],
    boldScript:  ['𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃', '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩'],
    fraktur:     ['𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷', '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ'],
    boldFraktur: ['𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟', '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅'],
    bold:        ['𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳', '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙', '𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗'],
    boldItalic:  ['𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛', '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁'],
    italic:      ['𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧', '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍'],
    sansBold:    ['𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇', '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭', '𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵'],
    sansBoldIt:  ['𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯', '𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕'],
    mono:        ['𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣', '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉', '𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿'],
    double:      ['𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫', '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ', '𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡'],
    fw:          ['ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ', 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ', '０１２３４５６７８９'],
    circled:     ['ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ', 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', '⓪①②③④⑤⑥⑦⑧⑨'],
    negCircled:  ['🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩', '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩', '⓿➊➋➌➍➎➏➐➑➒'],
    squared:     ['🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉', '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'],
    negSquared:  ['🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉', '🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉'],
    smallcaps:   ['ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ']
  };

  /* Apply a Unicode letter map. Characters with no mapping pass through
     unchanged — that includes digits for maps whose Unicode block has none
     (script, fraktur, small caps), which is why the collegiate pages use the
     maps that do carry digits. */
  function tf(text, key) {
    var m = M[key];
    if (!key || !m) return String(text);
    var lo = Array.from(m[0]), up = Array.from(m[1]), dg = m[2] ? Array.from(m[2]) : null;
    return Array.from(String(text)).map(function (ch) {
      var c = ch.charCodeAt(0);
      if (c >= 97 && c <= 122) return lo[c - 97] || ch;
      if (c >= 65 && c <= 90) return up[c - 65] || ch;
      if (dg && c >= 48 && c <= 57) return dg[c - 48] || ch;
      return ch;
    }).join('');
  }

  /* ── State ───────────────────────────────────────────────────────────── */
  var STYLES = CFG.styles || [];
  var DEFAULT_TEXT = CFG.defaultText || 'Lettering';
  var activeCat = 'all';
  var activeMode = null;
  var fx = { upper: false, spacing: 0, arch: false, outline: false, shadow: false };
  var toastTimer;

  /* ── DOM ─────────────────────────────────────────────────────────────── */
  var $ = function (id) { return document.getElementById(id); };
  var inputs = Array.prototype.slice.call(document.querySelectorAll('[data-lg-sync]'));
  var mainInput = $('lg-input');
  var grid = $('lg-grid');
  var countEl = $('lg-count');
  var miniWrap = $('lg-mini');
  var exampleGrid = $('lg-examples');
  var clearBtn = $('lg-clear');
  var toastEl = document.querySelector('[data-toast]');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.lg-chip'));
  var modeBtns = Array.prototype.slice.call(document.querySelectorAll('.lg-mode'));

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* Raw text the user typed, falling back to the page's sample word. */
  function currentText() {
    var v = (mainInput && mainInput.value || '').replace(/\s+$/, '');
    return v.length ? v : DEFAULT_TEXT;
  }

  /* Text after the controls that genuinely change characters. Uppercase is a
     real text transform so it applies to Unicode output too; spacing, arch,
     outline and shadow are CSS only and never touch the copied string. */
  function styledText(style) {
    var t = currentText();
    if (fx.upper || (style && style.up)) t = t.toUpperCase();
    return t;
  }

  function unicodeOut(style) {
    return (style.p || '') + tf(styledText(style), style.f) + (style.s || '');
  }

  /* ── Clipboard ───────────────────────────────────────────────────────── */
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1600);
  }

  function fallbackCopy(str) {
    var ta = document.createElement('textarea');
    ta.value = str;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  function flash(btn) {
    if (!btn || btn.classList.contains('is-copied')) return;
    var orig = btn.getAttribute('data-orig') || btn.textContent;
    btn.setAttribute('data-orig', orig);
    btn.textContent = 'Copied!';
    btn.classList.add('is-copied');
    setTimeout(function () {
      btn.textContent = btn.getAttribute('data-orig');
      btn.classList.remove('is-copied');
    }, 1500);
  }

  function copyText(str, btn, msg) {
    var after = function () { flash(btn); showToast(msg || 'Copied!'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str).then(after, function () { fallbackCopy(str); after(); });
    } else {
      fallbackCopy(str);
      after();
    }
  }

  /* ── Visual (CSS) preview rendering ──────────────────────────────────── */
  function fxClasses(style) {
    var cls = 'lg-view ' + (style.v || 'lg-v-block');
    if (fx.outline) cls += ' fx-outline';
    if (fx.shadow) cls += ' fx-shadow';
    if (fx.arch) cls += ' fx-arch';
    return cls;
  }

  function fxStyleAttr() {
    return fx.spacing ? ' style="letter-spacing:' + (fx.spacing / 100) + 'em"' : '';
  }

  /* Arched team-name preview: each character is its own span, rotated along
     an arc. Rebuilt on every render because the angle depends on length. */
  function archMarkup(text) {
    var chars = Array.from(text);
    var n = chars.length;
    if (n < 2) return esc(text);
    var span = Math.min(56, 8 + n * 3.4);
    var out = '';
    for (var i = 0; i < n; i++) {
      var t = n === 1 ? 0 : (i / (n - 1)) * 2 - 1;
      var angle = t * span / 2;
      var lift = (1 - t * t) * (span / 3.2);
      out += '<span style="transform:rotate(' + angle.toFixed(2) + 'deg) translateY(-' +
        lift.toFixed(2) + 'px)">' + esc(chars[i]) + '</span>';
    }
    return out;
  }

  function visualMarkup(style) {
    var t = styledText(style);
    return '<div class="' + fxClasses(style) + '"' + fxStyleAttr() + ' aria-label="' +
      esc(style.n) + ' preview of ' + esc(t) + '">' +
      (fx.arch ? archMarkup(t) : esc(t)) + '</div>';
  }

  /* ── Cards ───────────────────────────────────────────────────────────── */
  function card(style) {
    var isVisual = style.k === 'visual';
    var body, btn, note = '';
    if (isVisual) {
      body = visualMarkup(style);
      btn = '<button class="lg-copy is-plain" type="button" data-copy-plain="1" ' +
        'data-copy="' + esc(styledText(style)) + '" ' +
        'aria-label="Copy the plain text of ' + esc(style.n) + ' (the preview styling is not copied)">Copy text</button>';
      note = '<p class="lg-note">Preview rendered with CSS on this page. The styling is not part of the text, so pasting elsewhere gives plain letters.</p>';
    } else {
      var out = unicodeOut(style);
      body = '<div class="lg-out" role="button" tabindex="0" data-copy="' + esc(out) +
        '" aria-label="Copy this text">' + esc(out) + '</div>';
      btn = '<button class="lg-copy" type="button" data-copy="' + esc(out) +
        '" aria-label="Copy ' + esc(style.n) + ' style">Copy</button>';
    }
    return '<div class="lg-card' + (isVisual ? ' is-visual' : '') + '">' +
      '<div class="lg-card-head"><span class="lg-name">' + esc(style.n) +
      '<span class="lg-badge ' + (isVisual ? 'is-visual">Preview only' : 'is-unicode">Copyable') +
      '</span></span>' + btn + '</div>' + body + note + '</div>';
  }

  function build() {
    if (!grid) return;
    var html = '', shown = 0, uni = 0;
    for (var i = 0; i < STYLES.length; i++) {
      var st = STYLES[i];
      if (activeCat !== 'all' && (' ' + st.c + ' ').indexOf(' ' + activeCat + ' ') === -1) continue;
      html += card(st);
      shown++;
      if (st.k !== 'visual') uni++;
    }
    grid.innerHTML = html || '<p class="lg-empty">No styles in this category.</p>';
    if (countEl) {
      countEl.textContent = shown + (shown === 1 ? ' style' : ' styles') +
        (activeCat === 'all' ? '' : ' in ' + activeCat) +
        ' · ' + uni + ' copyable, ' + (shown - uni) + ' preview-only';
    }
  }

  function buildMini() {
    if (!miniWrap) return;
    var list = CFG.mini || [];
    var html = '';
    for (var i = 0; i < list.length; i++) html += card(list[i]);
    miniWrap.innerHTML = html;
  }

  /* ── Example words (fixed sample text, not the user's input) ─────────── */
  function buildExamples() {
    if (!exampleGrid) return;
    var words = CFG.examples || [];
    var styles = CFG.exampleStyles || [];
    var html = '';
    for (var i = 0; i < words.length; i++) {
      var word = words[i], rows = '';
      for (var j = 0; j < styles.length; j++) {
        var es = styles[j];
        var w = es.up ? word.toUpperCase() : word;
        var out = (es.p || '') + tf(w, es.f) + (es.s || '');
        rows += '<div class="lg-example-row">' +
          '<span class="lg-example-out" role="button" tabindex="0" data-copy="' + esc(out) +
          '" aria-label="Copy ' + esc(word) + ' in ' + esc(es.n || 'this style') + '">' + esc(out) + '</span>' +
          '<button class="mini-copy" type="button" data-copy="' + esc(out) +
          '" aria-label="Copy ' + esc(word) + ' in ' + esc(es.n || 'this style') + '">Copy</button></div>';
      }
      html += '<div class="lg-example-card"><h3>' + esc(word) + '</h3>' + rows + '</div>';
    }
    exampleGrid.innerHTML = html;
  }

  /* ── Ornament / symbol library ───────────────────────────────────────── */
  function fillSyms(id, list, label) {
    var el = $(id);
    if (!el || !list) return;
    var html = '';
    for (var i = 0; i < list.length; i++) {
      html += '<button class="lg-sym" type="button" data-copy="' + esc(list[i]) +
        '" aria-label="Copy ' + esc(label || 'symbol') + ' ' + esc(list[i]) + '">' + esc(list[i]) + '</button>';
    }
    el.innerHTML = html;
  }

  /* ── Redraw everything that depends on the current text or controls ──── */
  function refresh() { build(); buildMini(); }

  /* ── Events ──────────────────────────────────────────────────────────── */
  function handleCopyTarget(target) {
    var node = target.closest ? target.closest('[data-copy]') : null;
    if (!node) return false;
    var str = node.getAttribute('data-copy');
    if (str == null) return false;
    if (node.classList.contains('lg-sym')) {
      copyText(str, null, 'Copied!');
      node.classList.add('copied');
      setTimeout(function () { node.classList.remove('copied'); }, 1100);
      return true;
    }
    var isPlain = node.getAttribute('data-copy-plain') === '1';
    var btn = node.tagName === 'BUTTON' ? node : null;
    copyText(str, btn, isPlain ? 'Plain text copied — styling stays here' : 'Copied!');
    return true;
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('[data-copy]')) handleCopyTarget(e.target);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
    var node = e.target.closest ? e.target.closest('[data-copy]') : null;
    if (!node || node.tagName === 'BUTTON') return;
    e.preventDefault();
    handleCopyTarget(e.target);
  });

  inputs.forEach(function (el) {
    el.addEventListener('input', function () {
      inputs.forEach(function (other) { if (other !== el) other.value = el.value; });
      modeBtns.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      activeMode = null;
      refresh();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      inputs.forEach(function (el) { el.value = ''; });
      if (mainInput) mainInput.focus();
      refresh();
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeCat = chip.getAttribute('data-cat') || 'all';
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('active', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      build();
    });
  });

  /* Preview modes swap the sample text (Name / Word / Initials / Quote). */
  modeBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-text') || '';
      activeMode = btn.getAttribute('data-mode');
      inputs.forEach(function (el) { el.value = text; });
      modeBtns.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      refresh();
    });
  });

  /* Display controls. */
  function bindToggle(id, key) {
    var el = $(id);
    if (!el) return;
    fx[key] = !!el.checked;
    el.addEventListener('change', function () { fx[key] = el.checked; refresh(); });
  }
  bindToggle('lg-upper', 'upper');
  bindToggle('lg-arch', 'arch');
  bindToggle('lg-outline', 'outline');
  bindToggle('lg-shadow', 'shadow');

  var spacingEl = $('lg-spacing');
  if (spacingEl) {
    var spacingOut = $('lg-spacing-out');
    var syncSpacing = function () {
      fx.spacing = parseFloat(spacingEl.value) || 0;
      if (spacingOut) spacingOut.textContent = (fx.spacing / 100).toFixed(2) + 'em';
      refresh();
    };
    spacingEl.addEventListener('input', syncSpacing);
    fx.spacing = parseFloat(spacingEl.value) || 0;
    if (spacingOut) spacingOut.textContent = (fx.spacing / 100).toFixed(2) + 'em';
  }

  /* ── Init ────────────────────────────────────────────────────────────── */
  inputs.forEach(function (el) { if (el !== mainInput) el.value = mainInput ? mainInput.value : ''; });
  refresh();
  buildExamples();
  (CFG.symbolSets || []).forEach(function (set) { fillSyms(set.id, set.items, set.label); });
})();
