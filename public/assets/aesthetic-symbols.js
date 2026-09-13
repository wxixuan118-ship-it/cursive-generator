// aesthetic-symbols.js — click-to-copy symbol grid.
//
// GROUPS is the whole page: one entry per category, each a list of symbols or
// ready-made symbol combos. Clicking a tile copies it and adds it to the
// collection tray, so people can assemble a bio line from several symbols and
// copy the whole thing once.
(function () {
  'use strict';

  var GROUPS = [
    { id: 'popular', label: 'Popular Combos', desc: 'Ready-made aesthetic symbol lines people paste around names, headings and bio sections.',
      items: ['⋆｡°✩', '✩°｡⋆', '˚ʚ♡ɞ˚', '⋆˙⟡', '⟡˙⋆', '✧˖°', '°˖✧', '⋆.ೃ࿔*:･', '⊹₊⟡⋆', '⋆⊹₊', '꒰ა ໒꒱', '♡‧₊˚', '˚₊‧♡', '⊹ ࣪ ˖', '˖ ࣪ ⊹', '⋆⭒˚｡⋆', '✩₊˚.⋆☾⋆⁺₊✧', '☾⋆⁺₊✧', '୭ ˚. ᵎᵎ', '⁺˖ ✦', '✦ ˖⁺', '｡°✩', '✩°｡', '⋆ ˚｡⋆୨୧˚', '˚୨୧⋆｡˚', 'ೀ⋆｡˚', '⤷', '⤹', '➶', '༉‧₊˚.', '⋆ ˚｡⋆', '·˚ ༘ ₊·', '‧₊˚✧', '✧˚₊‧', '⋆｡‧˚ʚ♡ɞ˚‧｡⋆', '☁︎ ⋆｡˚', '𓂃 ࣪˖', '𓍢ִ໋🌷͙֒', '𓆩♡𓆪', '╰┈➤', '┊', '┊ ┊', '╭┈', '┈╯'] },
    { id: 'hearts', label: 'Hearts', desc: 'Every text heart, from filled and hollow to soft Sinhala and Georgian shapes.',
      items: ['♡', '♥', '❤', '❣', '❥', '❦', '❧', '♡̷', '♥︎', 'ღ', 'ෆ', 'ᥫ᭡', '𓆩♡𓆪', '𐙚', '♡⃛', '♡︎', '❤︎', '❥︎', '💗', '💕', '💞', '💓', '💖', '💝', '🩷', '🤍', '🖤', '🩶', '💜', '💙', '🩵', '💚', '💛', '🧡', '❤️‍🩹', '♡ ♡', '♡♡♡', '♥‿♥', '⌣♥⌣', '(♡˙︶˙♡)', '♡( ◡‿◡ )'] },
    { id: 'stars', label: 'Stars & Sparkles', desc: 'Stars, asterisms and sparkle marks for headings and username accents.',
      items: ['★', '☆', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮', '✯', '✰', '⋆', '⭒', '⭑', '✵', '✶', '✷', '✸', '✹', '✺', '❂', '⁂', '⟡', '⟢', '⟣', '⁎', '⁑', '✱', '✲', '✳', '✴', '❋', '❊', '❉', '❈', '❇', '✨', '💫', '⭐', '🌟', '⋆⁺₊⋆', '☆彡', '★彡', '彡★'] },
    { id: 'flowers', label: 'Flowers & Nature', desc: 'Petals, leaves, clouds and other soft nature symbols.',
      items: ['✿', '❀', '❁', '✾', '❃', '❋', '✽', '✼', '❀', '⚘', '🌸', '🌷', '🌹', '🌺', '🌼', '🌻', '💐', '🪷', '🌱', '🍃', '🌿', '☘', '🍀', '🌾', '❦', '❧', '☙', '✤', '✥', '⚜', '🍒', '🍓', '🍑', '🍄', '☁', '☁︎', '☾', '☽', '⛅', '🌈', '☔', '❄', '❅', '❆', '☃', '⛄', '🦋', '🐚', '🌊'] },
    { id: 'celestial', label: 'Moons & Sky', desc: 'Moons, suns, weather and space for dreamy, night-time aesthetics.',
      items: ['☾', '☽', '☾⋆', '⋆☽', '☾ ☽', '🌙', '🌛', '🌜', '🌚', '🌝', '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘', '☀', '☼', '☀︎', '☉', '🌞', '⋆☀︎⋆', '☄', '🪐', '🌌', '☁', '☂', '☔', '⚡', '☇', '☈', '☈', '✩☽', '☾✩', '☾⋆⁺₊✧', '✧₊⁺⋆☽', '𖤓', '𖥔', '𖦹', '๋࣭ ⭑', '⭑๋࣭'] },
    { id: 'bows', label: 'Bows & Coquette', desc: 'Text bows, ribbons and the soft coquette set.',
      items: ['୨୧', '୨ৎ', '౨ৎ', '⋆୨୧˚', '˚୨୧⋆', '⋆ ˚｡⋆୨୧˚', '🎀', '🩰', '🪞', '🕯', '🫧', '🦢', '🍰', '🧸', '💌', '📜', '🪶', 'ᡣ𐭩', 'ᡣ𐭩 ୭', '𐙚', '𐙚 ‧₊˚', '⋆.˚ 𐙚', '⋆˙⟡♡', '♡⟡˙⋆', '⋆｡‧˚ʚ♡ɞ˚‧｡⋆', '˚ʚ♡ɞ˚', 'ʚɞ', 'ʚ♡ɞ', '𓏲 ๋࣭ ࣪', '𓂃 ࣪˖ ִֶָ', '𓂃🖊', '𓍢ִ໋🌷͙֒'] },
    { id: 'cute', label: 'Cute & Kawaii', desc: 'Kaomoji faces and small kawaii marks.',
      items: ['꒰ ꒱', '꒰ა ໒꒱', '꒰ ˶• ༝ •˶꒱', '(´｡• ᵕ •｡`)', '(◕‿◕)', '(｡♥‿♥｡)', '(◍•ᴗ•◍)', '( ˶ˆᗜˆ˵ )', '(๑>◡<๑)', '(ᵔᴥᵔ)', '( ˘͈ ᵕ ˘͈♡)', '(⑅˘꒳˘)', 'ʕ•ᴥ•ʔ', '(=^･ω･^=)', '(￣▽￣)', '(˶ᵔ ᵕ ᵔ˶)', '(ɔ◔‿◔)ɔ ♥', '(づ｡◕‿‿◕｡)づ', '⸜(｡˃ ᵕ ˂ )⸝♡', '(´ ε ` )♡', 'ᶻ 𝗓 𐰁', '⑅', '⊹', '✰', '୭', 'ෆ', '⸝⸝', 'ᵎᵎ', '‧₊˚', '˚₊‧', '꙳', '⋄', '◟', '◞', '◜', '◝', '◡̈', 'ᵔᴗᵔ', '‿', '⌣'] },
    { id: 'arrows', label: 'Arrows & Pointers', desc: 'Arrows for “link below”, list markers and direction.',
      items: ['→', '←', '↑', '↓', '↗', '↘', '↙', '↖', '⇒', '⇐', '⇑', '⇓', '⇢', '⇠', '⇡', '⇣', '➜', '➔', '➙', '➛', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤', '➥', '➦', '➧', '➨', '➩', '➪', '➫', '➬', '➭', '➮', '➯', '➱', '➲', '➳', '➴', '➵', '➶', '➷', '➸', '➹', '➺', '➻', '➼', '➽', '➾', '⤷', '⤹', '⤵', '⤴', '↳', '↲', '↴', '↵', '⇝', '⇜', '⟶', '⟵', '⟹', '⟸', '↯', '⤞', '⤝', '╰┈➤', '┈➤', '⊳', '⊲', '▸', '◂', '▹', '◃', '▶', '◀', '►', '◄'] },
    { id: 'brackets', label: 'Brackets & Frames', desc: 'Frames to wrap a name or heading.',
      items: ['꧁ ꧂', '꧁༺ ༻꧂', '༺ ༻', '༼ ༽', '『 』', '「 」', '【 】', '《 》', '〔 〕', '〖 〗', '〘 〙', '〚 〛', '⟦ ⟧', '⟨ ⟩', '⟪ ⟫', '⌈ ⌉', '⌊ ⌋', '⌜ ⌝', '⌞ ⌟', '« »', '‹ ›', '❮ ❯', '❰ ❱', '❪ ❫', '❬ ❭', '❨ ❩', '⸨ ⸩', '⦃ ⦄', '⦅ ⦆', '⦗ ⦘', '⧼ ⧽', '『', '』', '「', '」', '【', '】', '〖', '〗', '꧁', '꧂', '༺', '༻', '⋆｡°✩ ✩°｡⋆', '˚ʚ♡ɞ˚ ˚ʚ♡ɞ˚', '»• •«', '•.• •.•', '⊹ ⊹'] },
    { id: 'dividers', label: 'Dividers & Borders', desc: 'Lines and borders to separate bio sections or decorate a caption.',
      items: ['─', '━', '═', '┄', '┅', '┈', '┉', '╌', '╍', '╴', '╶', '⎯', '‒', '–', '—', '―', '⸺', '⸻', '─────', '━━━━━', '═════', '┈┈┈┈┈', '•─────•', '•━━━━━•', '⋆─────⋆', '☆─────☆', '♡─────♡', '✧─────✧', '⊹─────⊹', '─ ⋆⋅☆⋅⋆ ─', '⋆⋅☆⋅⋆', '⋆⋅♡⋅⋆', '⋆⋅✧⋅⋆', '︶꒷꒦︶', '꒷꒦', '︶︶︶', '︵︵︵', '︶⏝︶', '⏝⏝⏝', '≋≋≋≋≋', '∞∞∞∞∞', '⊱ ────── ⊰', '⊰ ⊱', '⊹ ────── ⊹', '┏━━━━━━┓', '┗━━━━━━┛', '╭──────╮', '╰──────╯', '╭┈┈┈┈┈┈╮', '╰┈┈┈┈┈┈╯', '┊', '┆', '┇', '╎', '│', '║'] },
    { id: 'dots', label: 'Dots & Bullets', desc: 'Bullets and dot patterns for lists and spacing.',
      items: ['•', '◦', '∘', '·', '⋅', '∙', '●', '○', '◉', '◎', '◌', '◍', '◐', '◑', '◒', '◓', '⚬', '⦁', '⦾', '⦿', '⊙', '⊚', '⊛', '⊜', '⊝', '‣', '⁃', '⁌', '⁍', '∴', '∵', '∷', '⁘', '⁙', '⁚', '⁛', '⁝', '⁞', '︙', '⋮', '⋯', '⋰', '⋱', '· · ·', '• • •', '∘ ∘ ∘', '⋆ ⋆ ⋆', '｡ ｡ ｡', '˙ ˙ ˙'] },
    { id: 'shapes', label: 'Shapes & Geometry', desc: 'Diamonds, squares, triangles and other clean geometric marks.',
      items: ['◆', '◇', '◈', '❖', '⬥', '⬦', '⬧', '⬨', '◊', '⟐', '⟡', '■', '□', '▪', '▫', '▬', '▭', '▮', '▯', '◼', '◻', '◾', '◽', '▰', '▱', '▲', '△', '▴', '▵', '▶', '▷', '▸', '▹', '▼', '▽', '▾', '▿', '◀', '◁', '◂', '◃', '◢', '◣', '◤', '◥', '⬟', '⬠', '⬡', '⬢', '⬣', '⭓', '⭔', '○', '◯', '⬭', '⬮', '⬯', '⌾', '⍟', '⊕', '⊗', '⊘'] },
    { id: 'music', label: 'Music & Sound', desc: 'Notes and music marks for playlist titles and bios.',
      items: ['♪', '♫', '♬', '♩', '♭', '♮', '♯', '𝄞', '𝄢', '𝄡', '𝄫', '𝄪', '𝅘𝅥', '𝅗𝅥', '𝅘𝅥𝅮', '𝅘𝅥𝅯', '🎵', '🎶', '🎧', '🎤', '🎸', '🎹', '🎻', '📻', '💿', '📀', '🔊', '🔉', '🔈', '♪♫', '♫♪', '♩♪♫', '♬♪', '♪ ♫ ♪', '𓏲 ♬', '⋆｡♫', '♫｡⋆', 'ılı.lıllılı.ıllı.', '▶ ───●───── 2:35', '◁ ❚❚ ▷', '↻ ◁ II ▷ ↺', '0:00 ─●───── 3:45'] },
    { id: 'zodiac', label: 'Zodiac & Mystic', desc: 'Astrology, planets and mystical marks.',
      items: ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '⛎', '☉', '☽', '☿', '♀', '♁', '♂', '♃', '♄', '♅', '♆', '♇', '☊', '☋', '☌', '☍', '⚳', '⚴', '⚵', '⚶', '⚷', '⚸', '☯', '☮', '☸', '✡', '☪', '☦', '⚛', '⚝', '⚚', '𖤐', '🔮', '🪬', '🧿', '🕯', '🌙', '⋆☾⋆', '☽◯☾', '☾ ⋆*･ﾟ', '✧･ﾟ: *✧･ﾟ:*'] },
    { id: 'gaming', label: 'Gaming & Cool', desc: 'Swords, crowns and heavy symbols for gamer tags and clan names.',
      items: ['⚔', '⚔︎', '🗡', '🛡', '⛨', '⚚', '♛', '♚', '♕', '♔', '♜', '♖', '♝', '♗', '♞', '♘', '♟', '♙', '👑', '⚜', '☠', '☠︎', '💀', '⚰', '⚱', '☢', '☣', '⚠', '⚡', '🔥', '💣', '🎯', '🎮', '🕹', '🏆', '🥇', '⚙', '⚒', '⛏', '🔱', '⚓', '⛓', '✠', '☨', '☥', '✞', '✟', '✝', '†', '‡', '⚡︎', '▓▒░', '░▒▓', '▓▒░ ░▒▓', '꧁☠︎꧂', '×͜×', '乂', 'ツ', '〆', '气', 'ミ★', '★彡', 'ᶠᶠ', '⌁', '⌇', '⍝'] },
    { id: 'hands', label: 'Hands & People', desc: 'Pointing hands, peace signs and small figure marks.',
      items: ['☝', '☞', '☜', '☟', '✌', '✍', '✋', '✊', '👆', '👇', '👈', '👉', '🫶', '🤍', '🤞', '🤟', '🤘', '👋', '🙌', '👏', '🙏', '☺', '☹', '☻', 'ツ', 'シ', 'ジ', 'ッ', '✌︎', '☝︎', '☞︎', '☜︎', '☟︎', '☺︎', '☻︎', 'ᵕ̈', 'ᵔᴥᵔ', '•ᴗ•', 'ʘ‿ʘ', '◠‿◠', '❛‿❛', '◕‿◕'] },
    { id: 'misc', label: 'Misc & Punctuation', desc: 'Currency, checkmarks, degree marks and other useful odds and ends.',
      items: ['✓', '✔', '✗', '✘', '☑', '☒', '☐', '✅', '❎', '❌', '⭕', '№', '℃', '℉', '°', '′', '″', '‰', '‱', '§', '¶', '†', '‡', '•', '‣', '©', '®', '™', '℗', '℠', '¢', '£', '€', '¥', '₩', '₹', '₿', '∞', '≈', '≠', '≤', '≥', '±', '×', '÷', '√', '∑', '∏', '∫', '∂', '∆', '∇', '∈', '∉', '∩', '∪', '⊂', '⊃', '∀', '∃', '∅', '¿', '¡', '‽', '⁇', '⁈', '⁉', '‼', '⁂', '※', '⁕', '⌘', '⌥', '⇧', '⌃', '⎋', '⌫', '⏎', '⏏'] },
  ];

  var root = document.querySelector('[data-symbols]');
  if (!root) return;

  var nav = root.querySelector('[data-symbol-nav]');
  var grid = root.querySelector('[data-symbol-grid]');
  var search = root.querySelector('[data-symbol-search]');
  var tray = document.querySelector('[data-tray]');
  var trayCopy = document.querySelector('[data-tray-copy]');
  var trayClear = document.querySelector('[data-tray-clear]');
  var trayCount = document.querySelector('[data-tray-count]');
  var toast = document.querySelector('.cluster-toast');

  var active = 'all';
  var query = '';

  function esc(v) { var d = document.createElement('div'); d.textContent = v; return d.innerHTML; }

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast.t);
    showToast.t = setTimeout(function () { toast.classList.remove('show'); }, 1400);
  }
  function copyText(text, done) {
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); }); return; }
    fallback(text, done);
  }
  function fallback(text, done) {
    var area = document.createElement('textarea');
    area.value = text; area.setAttribute('readonly', ''); area.style.position = 'fixed'; area.style.opacity = '0';
    document.body.appendChild(area); area.select();
    try { document.execCommand('copy'); done(); } finally { area.remove(); }
  }

  nav.innerHTML = '<button class="cluster-chip active" type="button" data-cat="all" aria-pressed="true">All</button>' +
    GROUPS.map(function (g) { return '<button class="cluster-chip" type="button" data-cat="' + g.id + '" aria-pressed="false">' + g.label + '</button>'; }).join('');

  function render() {
    var q = query.trim().toLowerCase();
    var shown = GROUPS.filter(function (g) { return active === 'all' || g.id === active; });
    var total = 0;
    grid.innerHTML = shown.map(function (g) {
      var items = g.items.filter(function (s, i, arr) { return arr.indexOf(s) === i; });
      if (q) items = items.filter(function (s) { return s.indexOf(q) !== -1 || g.label.toLowerCase().indexOf(q) !== -1 || g.desc.toLowerCase().indexOf(q) !== -1; });
      if (!items.length) return '';
      total += items.length;
      return '<section class="sym-group" id="sym-' + g.id + '"><div class="sym-group-head"><h3>' + esc(g.label) + '</h3><p>' + esc(g.desc) + '</p><button class="cluster-copy sym-copy-group" type="button" data-copy-group="' + g.id + '">Copy all ' + items.length + '</button></div>' +
        '<div class="sym-grid">' + items.map(function (s) { return '<button class="sym-tile' + (s.length > 4 ? ' sym-tile-wide' : '') + '" type="button" data-sym="' + esc(s) + '" title="Copy ' + esc(s) + '">' + esc(s) + '</button>'; }).join('') + '</div></section>';
    }).join('') || '<p class="cluster-note">No symbols match “' + esc(query) + '”.</p>';
    var count = root.querySelector('[data-symbol-count]');
    if (count) count.textContent = total + ' symbols' + (active === 'all' ? ' in ' + shown.length + ' categories' : '');
  }

  nav.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat]');
    if (!b) return;
    active = b.getAttribute('data-cat');
    Array.prototype.forEach.call(nav.querySelectorAll('.cluster-chip'), function (c) { var on = c === b; c.classList.toggle('active', on); c.setAttribute('aria-pressed', String(on)); });
    render();
  });
  if (search) search.addEventListener('input', function () { query = search.value; render(); });

  grid.addEventListener('click', function (e) {
    var g = e.target.closest('[data-copy-group]');
    if (g) {
      var group = GROUPS.filter(function (x) { return x.id === g.getAttribute('data-copy-group'); })[0];
      copyText(group.items.join(' '), function () { showToast('Copied all ' + group.label.toLowerCase()); });
      return;
    }
    var tile = e.target.closest('[data-sym]');
    if (!tile) return;
    var s = tile.getAttribute('data-sym');
    copyText(s, function () {
      showToast('Copied ' + s);
      tile.classList.add('copied');
      setTimeout(function () { tile.classList.remove('copied'); }, 700);
      if (tray) { tray.value = tray.value ? tray.value + s : s; updateTray(); }
    });
  });

  function updateTray() {
    if (!trayCount || !tray) return;
    var n = Array.from(tray.value).length;
    trayCount.textContent = n ? n + ' character' + (n === 1 ? '' : 's') + ' collected' : 'Click symbols to collect them here, then copy the whole line.';
  }
  if (tray) {
    tray.addEventListener('input', updateTray);
    if (trayCopy) trayCopy.addEventListener('click', function () { if (!tray.value) return; copyText(tray.value, function () { showToast('Copied your collection'); }); });
    if (trayClear) trayClear.addEventListener('click', function () { tray.value = ''; updateTray(); });
    updateTray();
  }

  render();
})();
