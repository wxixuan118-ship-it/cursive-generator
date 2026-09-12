// signature-app.js — shared runtime for the cursive signature hub and its
// style pages. A page supplies `window.SIG_CONFIG` (presets, popular names,
// default tab, sample text, social preview style); everything else — the
// Unicode maps, the result grid, the builder, the social mock-ups and the
// popular-names strip — lives here so the pages never diverge.
//
// Preset shape: {cat, name, pre, post, style, mode?, sep?, unique?} — see
// signature-engine.js for the render fields; `unique` marks a preset that
// exists only on this page (shows the "only here" badge).
(function () {
  var C = window.SIG_CONFIG || {};
  var E = window.SigEngine;
  var cv = E.convert, makeSig = E.render;

  window.sigRender = makeSig; // exposed for the static "browse by style" cards

  var T = C.presets || [];
  var NAMES = C.names || ['Olivia','Sophia','Emma','Isabella','Ava','Charlotte','Liam','Noah','Mia','Amelia'];
  var SAMPLE = C.sample || 'Olivia';
  var SOCIAL_STYLE = C.socialStyle || 'boldScript';
  var NAME_STYLE = C.nameStyle || SOCIAL_STYLE;
  var currentCat = C.defaultCat || 'all';
  var bLeft = '', bRight = '', bStyle = C.builderStyle || 'boldScript';
  var toastTimer;
  var $ = function (id) { return document.getElementById(id); };

  function showToast(msg) {
    var t = $('sig-toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  function copyText(text, btn) {
    function done() {
      showToast('Copied!');
      if (btn) { btn.textContent = 'Copied!'; btn.classList.add('copied'); setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500); }
    }
    function fb() {
      var ta = document.createElement('textarea'); ta.value = text;
      document.body.appendChild(ta); ta.select(); document.execCommand('copy');
      document.body.removeChild(ta); done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(fb);
    else fb();
  }

  function getInput() { var el = $('sig-input'); return (el && el.value.trim()) || SAMPLE; }

  function buildResults(cat) {
    currentCat = cat;
    var list = cat === 'all' ? T : T.filter(function (x) { return x.cat === cat; });
    var text = getInput();
    var g = $('sig-grid'); if (!g) return;
    g.innerHTML = '';
    if (!list.length) { g.innerHTML = '<div class="sig-empty">No styles in this group yet.</div>'; return; }
    list.forEach(function (p) {
      var sig = makeSig(text, p);
      var card = document.createElement('div'); card.className = 'sig-card';
      var label = document.createElement('div'); label.className = 'sig-card-label'; label.textContent = p.name;
      if (p.unique) { var b = document.createElement('span'); b.className = 'sig-badge'; b.textContent = 'only here'; label.appendChild(b); }
      var prev = document.createElement('div'); prev.className = 'sig-card-preview'; prev.textContent = sig;
      var btn = document.createElement('button'); btn.className = 'sig-card-btn'; btn.type = 'button'; btn.textContent = 'Copy';
      btn.addEventListener('click', function (e) { copyText(sig, e.currentTarget); });
      card.appendChild(label); card.appendChild(prev); card.appendChild(btn);
      g.appendChild(card);
    });
  }

  function updateBuilder() {
    var el = $('b-preview'); if (!el) return '';
    var sig = bLeft + cv(getInput(), bStyle) + bRight;
    el.textContent = sig;
    return sig;
  }

  function updateSocial() {
    var text = getInput();
    var sig = bLeft + cv(text, SOCIAL_STYLE) + bRight;
    ['ig','tk','dc','wa','x'].forEach(function (p) { var el = $(p + '-sig'); if (el) el.textContent = sig; });
    var lower = text.toLowerCase().replace(/\s+/g, '_');
    var un = $('ig-username'); if (un) un.textContent = lower;
    var xh = $('x-handle'); if (xh) xh.textContent = '@' + lower;
  }

  function refresh() { buildResults(currentCat); updateBuilder(); updateSocial(); }

  function buildNames() {
    var g = $('names-grid'); if (!g) return;
    NAMES.forEach(function (n) {
      var card = document.createElement('div'); card.className = 'name-card';
      var a = document.createElement('div'); a.className = 'name-card-plain'; a.textContent = n;
      var b = document.createElement('div'); b.className = 'name-card-sig'; b.textContent = cv(n, NAME_STYLE);
      card.appendChild(a); card.appendChild(b);
      card.addEventListener('click', function () {
        $('sig-input').value = n; refresh();
        var tool = $('tool'); if (tool) tool.scrollIntoView({behavior: 'smooth', block: 'start'});
      });
      g.appendChild(card);
    });
  }

  // Static example / browse cards: any element with data-sig-preset="index"
  // or data-sig-style / data-sig-pre / data-sig-post gets rendered from SAMPLE.
  function renderStatic() {
    var text = getInput();
    document.querySelectorAll('[data-sig-live]').forEach(function (el) {
      var p = {style: el.dataset.sigStyle || 'boldScript', pre: el.dataset.sigPre || '', post: el.dataset.sigPost || '', mode: el.dataset.sigMode || '', sep: el.dataset.sigSep || ''};
      el.textContent = makeSig(text, p);
    });
  }

  var tabs = $('cat-tabs');
  if (tabs) tabs.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cat]'); if (!btn) return;
    tabs.querySelectorAll('.cat-tab').forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected', 'true');
    buildResults(btn.dataset.cat);
  });

  var bs = $('b-style');
  if (bs) { bStyle = bs.value || bStyle; bs.addEventListener('change', function () { bStyle = this.value; updateBuilder(); }); }

  ['b-left','b-right'].forEach(function (id) {
    var box = $(id); if (!box) return;
    box.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-val]'); if (!btn) return;
      box.querySelectorAll('.sym-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (id === 'b-left') bLeft = btn.dataset.val; else bRight = btn.dataset.val;
      updateBuilder(); updateSocial();
    });
  });

  var bc = $('b-copy');
  if (bc) bc.addEventListener('click', function () { copyText(updateBuilder(), null); });

  var st = $('social-tabs');
  if (st) st.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-platform]'); if (!btn) return;
    st.querySelectorAll('.social-tab').forEach(function (b) { b.classList.remove('active'); });
    document.querySelectorAll('.social-mock').forEach(function (m) { m.classList.remove('visible'); });
    btn.classList.add('active');
    var el = $('mock-' + btn.dataset.platform); if (el) el.classList.add('visible');
  });

  var input = $('sig-input');
  if (input) input.addEventListener('input', function () { refresh(); renderStatic(); });

  // Deep link: /page.html?name=Olivia or #cat
  try {
    var q = new URLSearchParams(location.search).get('name');
    if (q && input) input.value = q.slice(0, 60);
  } catch (e) {}

  refresh();
  buildNames();
  renderStatic();
})();
