// fancy-app.js — UI layer for the 300+ style generator
// Requires style-engine.js to be loaded first.
(function(){
'use strict';

var SE = window.StyleEngine;
if (!SE) { console.error('StyleEngine not loaded'); return; }

// ── DOM refs ──────────────────────────────────────────────────────────────────
var input    = document.querySelector('[data-fg-input]');
var results  = document.querySelector('[data-fg-results]');
var sentinel = document.querySelector('[data-fg-sentinel]');
var countEl  = document.querySelector('[data-fg-count]');
var tabsEl   = document.querySelector('[data-fg-tabs]');
var searchEl = document.querySelector('[data-fg-search]');

if (!input || !results) return;

// ── State ─────────────────────────────────────────────────────────────────────
var currentCat   = results.getAttribute('data-fg-default-cat') || 'all';
var worksheetEnabled = results.hasAttribute('data-fg-worksheet');
var currentQuery = '';
var favorites    = loadFavs();
var PAGE_SIZE    = 50;
var rendered     = 0;
var visibleList  = [];
var toast        = document.querySelector('[data-fg-toast]') || document.querySelector('[data-toast]');

// ── Favorites (localStorage) ──────────────────────────────────────────────────
function loadFavs() {
  try { return JSON.parse(localStorage.getItem('fg-favs')||'[]'); } catch(e){ return []; }
}
function saveFavs() {
  try { localStorage.setItem('fg-favs', JSON.stringify(favorites)); } catch(e){}
}
function isFav(id) { return favorites.indexOf(id) !== -1; }
function toggleFav(id) {
  var i = favorites.indexOf(id);
  if (i === -1) favorites.push(id); else favorites.splice(i,1);
  saveFavs();
  // Update button icon without full re-render
  var btn = results.querySelector('[data-fg-fav="'+id+'"]');
  if (btn) btn.textContent = isFav(id) ? '♥' : '♡';
}

// ── Copy ──────────────────────────────────────────────────────────────────────
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(function(){ toast.classList.remove('show'); }, 1700);
}
function copyText(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function(){ showToast('Copied — paste it anywhere'); }).catch(function(){ fallbackCopy(text); });
  } else { fallbackCopy(text); }
}
function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); showToast('Copied!'); } catch(e){ showToast('Select text to copy'); }
  document.body.removeChild(ta);
}

// ── Build visible list ────────────────────────────────────────────────────────
function rebuildList() {
  if (currentCat === 'favorites') {
    visibleList = SE.STYLES.filter(function(s){ return isFav(s.id); });
  } else {
    visibleList = SE.filter(currentCat, currentQuery);
  }
  rendered = 0;
  results.innerHTML = '';
  if (countEl) {
    var suffix = currentCat === 'favorites' ? 'saved' : 'styles';
    countEl.textContent = visibleList.length + ' ' + suffix;
  }
  renderBatch();
}

// ── Download a practice worksheet (A–Z reference + practice rows) ────────────
function downloadPracticeSheet(sid) {
  var styleObj = SE.STYLES.filter(function(x){ return x.id === sid; })[0];
  if (!styleObj) return;
  var U = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var L = 'abcdefghijklmnopqrstuvwxyz';
  function s(c){ try{ return styleObj.fn(c); }catch(e){ return c; } }
  function grid(str) {
    return Array.from(str).map(function(c){
      return '<div class="lc"><span class="lp">'+c+'</span><span class="ls">'+s(c)+'</span></div>';
    }).join('');
  }
  function row(str){ return Array.from(str).map(s).join(' '); }
  var html = '<!doctype html><html><head><meta charset="utf-8">'+
    '<title>'+styleObj.name+' Practice Sheet</title>'+
    '<style>'+
    '@media print{@page{size:A4;margin:15mm}button{display:none!important}}'+
    'body{font-family:Arial,Helvetica,sans-serif;margin:28px 32px;color:#222;max-width:680px}'+
    'h1{font-size:19px;margin:0 0 2px}'+
    '.sub{font-size:11px;color:#aaa;margin:0 0 18px}'+
    '.lbl{font-size:10px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#999;margin:16px 0 6px}'+
    '.grid{display:grid;grid-template-columns:repeat(13,1fr);gap:4px;margin-bottom:6px}'+
    '.lc{text-align:center;border:1px solid #eee;border-radius:3px;padding:3px 1px}'+
    '.lp{display:block;font-size:9px;color:#bbb;line-height:1.2}'+
    '.ls{display:block;font-size:20px;line-height:1.3}'+
    '.pr{border-bottom:1.5px solid #ccc;min-height:44px;font-size:22px;letter-spacing:.04em;padding:4px 2px;margin-bottom:8px;word-break:break-all}'+
    '.tr{color:#ddd;border-bottom-color:#e8e8e8}'+
    '.bl{border-bottom:1.5px dashed #ddd;min-height:44px;margin-bottom:8px}'+
    'button{margin-top:14px;padding:8px 20px;background:#2d6a4f;color:#fff;border:none;border-radius:6px;font-size:13px;cursor:pointer}'+
    '</style></head><body>'+
    '<h1>'+styleObj.name+' Practice Sheet</h1>'+
    '<div class="sub">cursive-text-generator.net &nbsp;·&nbsp; Print or Save as PDF</div>'+
    '<div class="lbl">Uppercase A–Z</div>'+
    '<div class="grid">'+grid(U)+'</div>'+
    '<div class="lbl">Lowercase a–z</div>'+
    '<div class="grid">'+grid(L)+'</div>'+
    '<div class="lbl">Practice — Uppercase</div>'+
    '<div class="pr">'+row(U)+'</div>'+
    '<div class="pr tr">'+row(U)+'</div>'+
    '<div class="bl"></div>'+
    '<div class="lbl">Practice — Lowercase</div>'+
    '<div class="pr">'+row(L)+'</div>'+
    '<div class="pr tr">'+row(L)+'</div>'+
    '<div class="bl"></div>'+
    '<button onclick="window.print()">🖨 Print / Save as PDF</button>'+
    '</body></html>';
  var win = window.open('','_blank','width=760,height=960');
  if (!win){ showToast('Allow pop-ups for this site'); return; }
  win.document.write(html);
  win.document.close();
  win.focus();
}

// ── Download a style card as PNG ─────────────────────────────────────────────
function downloadFancyCard(sid) {
  var outEl = results.querySelector('[data-fg-output="' + sid + '"]');
  if (!outEl) return;
  var text = outEl.textContent;
  var styleObj = SE.STYLES.filter(function(x){ return x.id === sid; })[0];
  var styleName = styleObj ? styleObj.name : sid;
  var fs = 48, PAD = 48, FOOTER = 32, MAX_W = 1200;
  var ratio = Math.min(window.devicePixelRatio || 2, 3);

  var tmp = document.createElement('canvas');
  var tc  = tmp.getContext('2d');
  var FONT = fs + "px 'Segoe UI','SF Pro Display',Arial,sans-serif";
  tc.font = FONT;
  var textW = tc.measureText(text).width;

  var cW = Math.max(420, Math.min(textW + PAD * 2, MAX_W));
  var cH = fs * 1.6 + PAD * 2 + FOOTER;

  var canvas = document.createElement('canvas');
  canvas.width  = Math.round(cW * ratio);
  canvas.height = Math.round(cH * ratio);
  var ctx = canvas.getContext('2d');
  ctx.scale(ratio, ratio);

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, cW, cH);
  ctx.font = FONT;
  ctx.fillStyle = '#1a1a1a';
  ctx.textBaseline = 'alphabetic';

  var usableW = cW - PAD * 2;
  if (textW > usableW) {
    var words = text.split(' '), line = '', y = PAD + fs;
    for (var wi = 0; wi < words.length; wi++) {
      var test = line ? line + ' ' + words[wi] : words[wi];
      if (ctx.measureText(test).width > usableW && line) {
        ctx.fillText(line, PAD, y); line = words[wi]; y += fs * 1.4;
      } else { line = test; }
    }
    if (line) ctx.fillText(line, PAD, y);
  } else {
    ctx.fillText(text, PAD, PAD + fs);
  }

  ctx.font = "13px 'Segoe UI',Arial,sans-serif";
  ctx.fillStyle = '#aaaaaa';
  ctx.fillText(styleName + ' · cursive-text-generator.net', PAD, cH - 10);

  var slug = (text.slice(0, 20).replace(/\s+/g, '-').replace(/[^a-z0-9-]/gi, '') || 'cursive');
  var a = document.createElement('a');
  a.download = slug + '-' + sid.replace(/[^a-z0-9]/gi, '') + '.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
}

// ── Render a batch of cards ───────────────────────────────────────────────────
function renderBatch() {
  var text = (input.value.trim() || input.placeholder || 'Hello');
  var end  = Math.min(rendered + PAGE_SIZE, visibleList.length);
  var frag = document.createDocumentFragment();

  for (var i = rendered; i < end; i++) {
    var s   = visibleList[i];
    var out = '';
    try { out = s.fn(text); } catch(e){ out = text; }

    var card = document.createElement('article');
    card.className = 'result-card';
    card.setAttribute('data-sid', s.id);

    card.innerHTML =
      '<div class="result-top">' +
        '<div class="result-title">' + escHtml(s.name) + '</div>' +
        '<div class="result-actions">' +
          '<button class="fg-fav-btn" data-fg-fav="' + escHtml(s.id) + '" aria-label="' + (isFav(s.id)?'Remove from saved':'Save style') + '">' + (isFav(s.id)?'♥':'♡') + '</button>' +
          '<button class="btn-download fg-dl-btn" data-fg-dl="' + escHtml(s.id) + '" title="Download as PNG">⬇ Save</button>' +
          (worksheetEnabled ? '<button class="btn-download fg-ws-btn" data-fg-ws="' + escHtml(s.id) + '" title="Download A–Z practice worksheet">📄 Sheet</button>' : '') +
          '<button class="button copy fg-copy-btn" data-fg-copy="' + escHtml(s.id) + '" aria-label="Copy ' + escHtml(s.name) + '">Copy</button>' +
        '</div>' +
      '</div>' +
      '<div class="output fg-output" data-fg-output="' + escHtml(s.id) + '">' + escHtml(out) + '</div>';

    frag.appendChild(card);
  }

  results.appendChild(frag);
  rendered = end;
}

// ── Update text in existing cards (fast path on input change) ─────────────────
function updateOutputs() {
  var text = (input.value.trim() || input.placeholder || 'Hello');
  var cards = results.querySelectorAll('[data-fg-output]');
  for (var i = 0; i < cards.length; i++) {
    var id  = cards[i].getAttribute('data-fg-output');
    var s   = styleById(id);
    if (!s) continue;
    var out = '';
    try { out = s.fn(text); } catch(e){ out = text; }
    cards[i].textContent = out;
  }
}

var _styleMap = null;
function styleById(id) {
  if (!_styleMap) {
    _styleMap = {};
    SE.STYLES.forEach(function(s){ _styleMap[s.id]=s; });
  }
  return _styleMap[id];
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── IntersectionObserver for lazy loading ─────────────────────────────────────
var observer = null;
function setupObserver() {
  if (!sentinel || !('IntersectionObserver' in window)) return;
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting && rendered < visibleList.length) {
      renderBatch();
    }
  }, { rootMargin: '300px' });
  observer.observe(sentinel);
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
var CAT_EMOJI = {all:'✨',cursive:'✍️',bold:'💪',italic:'✦',gothic:'🖤',bubble:'🫧',cute:'🌸',love:'💕',aesthetic:'🌿',fancy:'🎨',gaming:'🎮',glitch:'⚡',symbols:'✺',social:'📱'};

// A container marked role="tablist" must contain role="tab" children, and those
// tabs must point at a tabpanel. Set both up here so every page using this file
// gets the same semantics without repeating the wiring in its HTML.
var isTablist = !!tabsEl && tabsEl.getAttribute('role') === 'tablist';
if (isTablist) {
  if (!results.id) results.id = 'fg-results-panel';
  if (!results.getAttribute('role')) results.setAttribute('role', 'tabpanel');
  results.setAttribute('tabindex', '0');
}
function tabId(cat) { return 'fg-tab-' + cat; }

function tabAttrs(cat, active) {
  var a = ' class="fg-tab' + active + '" data-cat="' + cat + '" type="button"';
  if (isTablist) {
    a += ' role="tab" id="' + tabId(cat) + '" aria-controls="' + results.id + '"' +
         ' aria-selected="' + (active ? 'true' : 'false') + '"' +
         ' tabindex="' + (active ? '0' : '-1') + '"';
  }
  return a;
}

function syncTabState() {
  if (!isTablist) return;
  var tabs = tabsEl.querySelectorAll('.fg-tab');
  for (var i = 0; i < tabs.length; i++) {
    var on = tabs[i].classList.contains('active');
    tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
    tabs[i].setAttribute('tabindex', on ? '0' : '-1');
  }
  results.setAttribute('aria-labelledby', tabId(currentCat));
}

function buildTabs() {
  if (!tabsEl) return;
  var emojiMode = tabsEl.hasAttribute('data-fg-emoji-tabs');
  var cats = SE.ALL_CATS.concat([{id:'favorites', label:'Saved'}]);
  tabsEl.innerHTML = cats.map(function(c) {
    var active = c.id === currentCat ? ' active' : '';
    if (!emojiMode) {
      var lbl = c.id === 'favorites' ? '♥ Saved' : c.label;
      return '<button' + tabAttrs(c.id, active) + '>' + lbl + '</button>';
    }
    var count = c.id === 'all' ? SE.STYLES.length
              : c.id === 'favorites' ? favorites.length
              : SE.STYLES.filter(function(s){ return s.cats && s.cats.indexOf(c.id) > -1; }).length;
    var em = CAT_EMOJI[c.id] || '';
    var displayLabel = c.id === 'favorites' ? '♥ Saved' : c.label;
    var badge = c.id !== 'favorites' ? '<span class="fg-tab-count">' + count + '</span>' : '';
    return '<button' + tabAttrs(c.id, active) + '>' +
           (em ? em + ' ' : '') + displayLabel + badge + '</button>';
  }).join('');
  syncTabState();
}

// ── Events ────────────────────────────────────────────────────────────────────
// Input — debounce 150ms, use fast-update path when possible
var _inputTimer;
input.addEventListener('input', function() {
  clearTimeout(_inputTimer);
  _inputTimer = setTimeout(function() {
    // If same list, just update outputs
    var newText = (input.value.trim()||input.placeholder||'Hello');
    if (rendered > 0 && currentCat !== 'favorites') {
      updateOutputs();
    } else {
      rebuildList();
    }
  }, 120);
});

// Tabs
function activateTab(btn, focus) {
  if (!btn) return;
  currentCat = btn.getAttribute('data-cat');
  tabsEl.querySelectorAll('.fg-tab').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  syncTabState();
  if (focus) btn.focus();
  rebuildList();
}

if (tabsEl) {
  tabsEl.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-cat]');
    if (btn) activateTab(btn, false);
  });

  // Arrow / Home / End move between tabs, per the ARIA tabs pattern.
  tabsEl.addEventListener('keydown', function(e) {
    if (!isTablist) return;
    var keys = {ArrowRight:1, ArrowLeft:-1, Home:'first', End:'last'};
    if (!(e.key in keys)) return;
    var tabs = Array.prototype.slice.call(tabsEl.querySelectorAll('.fg-tab'));
    if (!tabs.length) return;
    var i = tabs.indexOf(e.target.closest('.fg-tab'));
    if (i === -1) return;
    var step = keys[e.key];
    var next = step === 'first' ? 0
             : step === 'last'  ? tabs.length - 1
             : (i + step + tabs.length) % tabs.length;
    e.preventDefault();
    activateTab(tabs[next], true);
  });
}

// ── Static style index -> generator ───────────────────────────────────────────
// The index under #all-styles ships in the HTML so crawlers and no-JS visitors
// see every style name. With JS on, selecting one filters the generator.
document.addEventListener('click', function(e) {
  var jump = e.target.closest('[data-fg-jump]');
  if (!jump || !searchEl) return;
  var name = jump.getAttribute('data-fg-jump');
  searchEl.value = name;
  currentQuery = name;
  var allTab = tabsEl && tabsEl.querySelector('[data-cat="all"]');
  if (allTab) activateTab(allTab, false); else rebuildList();
});

// Search — debounce 200ms
var _searchTimer;
if (searchEl) {
  searchEl.addEventListener('input', function() {
    clearTimeout(_searchTimer);
    _searchTimer = setTimeout(function() {
      currentQuery = searchEl.value.trim();
      rebuildList();
    }, 200);
  });
}

// Results: copy and fav (event delegation)
results.addEventListener('click', function(e) {
  var copyBtn = e.target.closest('[data-fg-copy]');
  if (copyBtn) {
    var sid = copyBtn.getAttribute('data-fg-copy');
    var outEl = results.querySelector('[data-fg-output="'+sid+'"]');
    if (outEl) copyText(outEl.textContent);
    // Visual feedback
    copyBtn.textContent = 'Copied!';
    setTimeout(function(){ copyBtn.textContent = 'Copy'; }, 1500);
    return;
  }
  var favBtn = e.target.closest('[data-fg-fav]');
  if (favBtn) {
    toggleFav(favBtn.getAttribute('data-fg-fav'));
    return;
  }
  var dlBtn = e.target.closest('[data-fg-dl]');
  if (dlBtn) {
    downloadFancyCard(dlBtn.getAttribute('data-fg-dl'));
    return;
  }
  var wsBtn = e.target.closest('[data-fg-ws]');
  if (wsBtn) {
    downloadPracticeSheet(wsBtn.getAttribute('data-fg-ws'));
    return;
  }
  // Click on output div = copy
  var outDiv = e.target.closest('[data-fg-output]');
  if (outDiv && !e.target.closest('button')) {
    copyText(outDiv.textContent);
    showToast('Copied — paste it anywhere');
  }
});

// Clear button
var clearBtn = document.querySelector('[data-fg-clear]');
if (clearBtn) {
  clearBtn.addEventListener('click', function() {
    input.value = ''; input.focus(); updateOutputs();
  });
}

// Random button
var randomBtn = document.querySelector('[data-fg-random]');
if (randomBtn) {
  randomBtn.addEventListener('click', function() {
    var s = SE.STYLES[Math.floor(Math.random() * SE.STYLES.length)];
    // Flash highlight
    var existing = results.querySelector('[data-sid="'+s.id+'"]');
    if (existing) {
      existing.scrollIntoView({behavior:'smooth', block:'center'});
      existing.classList.add('fg-highlight');
      setTimeout(function(){ existing.classList.remove('fg-highlight'); }, 1200);
    }
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────
// ?q= makes a filtered view shareable; canonical still points at the bare page.
try {
  var q0 = new URLSearchParams(location.search).get('q');
  if (q0 && searchEl) { searchEl.value = q0; currentQuery = q0.trim(); }
} catch (e) {}

buildTabs();
rebuildList();
setupObserver();

}());
