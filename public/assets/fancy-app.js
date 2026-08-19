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
var currentCat   = 'all';
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
function buildTabs() {
  if (!tabsEl) return;
  var cats = SE.ALL_CATS.concat([{id:'favorites', label:'♥ Saved'}]);
  tabsEl.innerHTML = cats.map(function(c) {
    return '<button class="fg-tab' + (c.id===currentCat?' active':'') + '" data-cat="' + c.id + '">' + c.label + '</button>';
  }).join('');
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
if (tabsEl) {
  tabsEl.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-cat]');
    if (!btn) return;
    currentCat = btn.getAttribute('data-cat');
    tabsEl.querySelectorAll('.fg-tab').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    rebuildList();
  });
}

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
buildTabs();
rebuildList();
setupObserver();

}());
