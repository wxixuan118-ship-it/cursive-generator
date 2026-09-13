/* Username Generator engine — shared by /aesthetic-username-generator.html and future
   username landing pages (Instagram, TikTok, Discord, Cute, Gaming …).
   Each page supplies its own config (vocabulary, styles, defaults, storage key) and the
   markup; this file owns generation, filtering, copying and favorites.

   Usage:  UsernameGenerator.mount({ root: '#ug', styles: {...}, ... })

   Generation is rule-based: user word + curated vocabulary + naming patterns +
   optional separators, numbers and Unicode symbols. No AI, no availability checks. */
(function (global) {
  'use strict';

  /* ── helpers ── */
  function pick(a){ return a[Math.floor(Math.random() * a.length)]; }
  function chance(p){ return Math.random() < p; }
  function shuffle(a){
    var r = a.slice();
    for (var i = r.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = r[i]; r[i] = r[j]; r[j] = t; }
    return r;
  }
  function cap(s){ return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function uniq(a){ var s = {}, o = []; a.forEach(function(x){ if (!s[x]){ s[x] = 1; o.push(x); } }); return o; }

  /* Small guard against obviously inappropriate input words. Not exhaustive — the
     curated vocabulary itself is clean, so this only screens the user-typed word. */
  var BLOCKED = /(sex|porn|fuck|shit|bitch|cunt|dick|cock|pussy|nude|naked|xxx|rape|nazi|hitler|kill|slut|whore|nigg|fag|retard)/i;

  var SYMBOL_SETS = {
    minimal:  ['⋆', '˚', '·', '⊹', '⋅'],
    cute:     ['♡', '୨୧', '✿', '˚', 'ꕤ', '♡'],
    hearts:   ['♡', '♥', '❥', 'ღ', '♡'],
    stars:    ['☆', '★', '✩', '⋆', '✦'],
    sparkles: ['✧', '✦', '⊹', '₊˚', '✩', '⋆˚']
  };
  /* Symbols that read well on both sides of a word (wrap pattern). */
  var WRAP_OK = { '⋆': 1, '˚': 1, '·': 1, '⊹': 1, '♡': 1, '✿': 1, '☆': 1, '★': 1, '✦': 1, '✧': 1, '✩': 1, '୨୧': 1, '❀': 1, '☾': 1, '✞': 0 };

  var LUCKY = ['7', '77', '777', '444', '222', '333', '111', '11', '888', '1111', '13', '999', '3'];
  function numberFor(mode){
    if (mode === 'lucky') return pick(LUCKY);
    if (mode === 'birth'){
      /* Birth-year *style* digits — random, never asks for a real date. */
      return chance(0.6) ? (chance(0.5) ? '0' : '1') + Math.floor(Math.random() * 10) : String(1998 + Math.floor(Math.random() * 15));
    }
    return chance(0.5) ? String(10 + Math.floor(Math.random() * 90)) : String(100 + Math.floor(Math.random() * 900));
  }

  /* Subtle spelling tweaks: one transform per candidate. */
  function respell(w){
    var opts = [];
    if (/[aeiou]$/.test(w)) opts.push(w + w.slice(-1));                 // lunaa
    if (/y$/.test(w)) opts.push(w.slice(0, -1) + 'ie');                  // cherry → cherrie
    if (/ie$/.test(w)) opts.push(w.slice(0, -2) + 'y');                  // charlie → charly
    if (/a$/.test(w)) opts.push(w + 'h');                                 // luna → lunah
    if (/i/.test(w) && !/ie$/.test(w)) opts.push(w.replace('i', 'y'));   // mia → mya
    if (/s/.test(w) && !/ss/.test(w)) opts.push(w.replace('s', 'z'));    // rose → roze
    var m = w.match(/[aeiou]/);
    if (m && m.index > 0 && w.length >= 3 && w.length <= 5) opts.push(w.slice(0, m.index + 1) + w[m.index] + w.slice(m.index + 1)); // luna → luuna
    if (/c/.test(w)) opts.push(w.replace('c', 'k'));                      // coco → koco
    if (w.length <= 5) opts.push(w + 'x');                                 // luna → lunax
    if (!opts.length) opts.push(w + w.slice(-1));
    return pick(opts);
  }

  function coreLength(parts, joiner, number){
    return parts.join(joiner).length + (number ? number.length : 0);
  }
  function fitsLength(len, mode){
    if (mode === 'short') return len <= 8;
    if (mode === 'medium') return len >= 9 && len <= 13;
    if (mode === 'long') return len >= 14;
    return true;
  }

  /* ── candidate builders: return arrays of word parts ── */
  function patternsWithBase(base, st, common){
    return [
      function(){ return [base, pick(st.nouns)]; },
      function(){ return [pick(st.adjectives), base]; },
      function(){ return [base, pick(st.adjectives)]; },
      function(){ return [pick(st.nouns), base]; },
      function(){ return [pick(common.prefixes), base]; },
      function(){ return [base, pick(st.suffixes && st.suffixes.length ? st.suffixes : common.suffixes)]; },
      function(){ return [respell(base)]; },
      function(){ return [respell(base), pick(st.nouns)]; },
      function(){ return [pick(st.adjectives), base, pick(st.nouns)]; },
      function(){ return [pick(common.prefixes), base, pick(st.nouns)]; },
      function(){ return [base]; },   // decorated with symbols / numbers below
      function(){ return [base, pick(st.nouns)]; }
    ];
  }
  function patternsNoBase(st, common){
    return [
      function(){ return [pick(st.adjectives), pick(st.nouns)]; },
      function(){ var a = pick(st.nouns), b = pick(st.nouns); return a === b ? [a, pick(st.adjectives)] : [a, b]; },
      function(){ return [pick(common.prefixes), pick(st.nouns)]; },
      function(){ return [pick(st.nouns), pick(st.suffixes && st.suffixes.length ? st.suffixes : common.suffixes)]; },
      function(){ return [respell(pick(st.nouns))]; },
      function(){ return [pick(st.adjectives), respell(pick(st.nouns))]; },
      function(){ return [pick(st.nouns)]; },
      function(){ return [pick(st.adjectives), pick(st.nouns), pick(st.nouns)]; }
    ];
  }

  function decorate(parts, st, o, forceBare){
    /* joiner */
    var joiner = '';
    if (o.separator === 'underscore') joiner = '_';
    else if (o.separator === 'period') joiner = '.';
    else if (o.separator === 'auto') joiner = chance(0.62) ? '' : (chance(0.5) ? '_' : '.');

    /* numbers */
    var number = '';
    var wantNumber = o.numbers === 'auto' ? (forceBare ? chance(0.5) : chance(0.14)) : o.numbers !== 'none';
    if (wantNumber) number = numberFor(o.numbers === 'auto' ? pick(['lucky', 'birth', 'random']) : o.numbers);

    var len = coreLength(parts, joiner, number);
    if (!fitsLength(len, o.length)) return null;

    /* casing */
    var cased = parts.map(function(p){
      if (o.letters === 'upper') return p.toUpperCase();
      if (o.letters === 'mixed') return cap(p);
      return p.toLowerCase();
    });
    var text = cased.join(joiner) + number;

    /* symbols */
    var set = null;
    if (o.symbols === 'auto'){ if (forceBare ? chance(0.7) : chance(0.22)) set = st.symbols; }
    else if (o.symbols !== 'none') set = SYMBOL_SETS[o.symbols] || st.symbols;
    var hasSymbols = false;
    if (set && set.length){
      var sym = pick(set);
      var place = pick(['suffix', 'suffix', 'prefix', 'wrap', 'between']);
      if (place === 'between' && cased.length >= 2 && joiner === '' && !number){
        text = cased[0] + sym + cased.slice(1).join('');
      } else if (place === 'wrap' && WRAP_OK[sym]){
        text = sym + text + sym;
      } else if (place === 'prefix'){
        text = sym + text;
      } else {
        text = text + sym;
      }
      hasSymbols = true;
    }
    return { text: text, core: parts.join('') + number, length: len, hasSymbols: hasSymbols, hasNumber: !!number };
  }

  function sanitizeWord(raw){
    var w = String(raw || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return w.slice(0, 16);
  }

  /* Generate one batch. Returns { results, relaxed } */
  function generate(cfg, o, existingTexts){
    var base = sanitizeWord(o.word);
    if (base && BLOCKED.test(base)) throw new Error('Please try a different word.');
    var styleKeys = o.style === 'all' ? shuffle(Object.keys(cfg.styles)) : [o.style];
    if (o.style !== 'all' && !cfg.styles[o.style]) throw new Error('Unknown style.');
    var results = [], seen = {}, coreCount = {}, relaxed = false;
    existingTexts.forEach(function(t){ seen[t] = 1; });
    var si = 0, tries = 0, maxTries = cfg.batchSize * 60;
    var patternCache = {};
    var lengthMode = o.length;

    while (results.length < cfg.batchSize && tries < maxTries){
      tries++;
      if (tries === Math.floor(maxTries * 0.55) && lengthMode !== 'any'){ lengthMode = 'any'; relaxed = true; }
      var key = styleKeys[si++ % styleKeys.length];
      var st = cfg.styles[key];
      if (!patternCache[key]) patternCache[key] = shuffle(base ? patternsWithBase(base, st, cfg.common) : patternsNoBase(st, cfg.common));
      var pats = patternCache[key];
      var pi = Math.floor(tries / styleKeys.length) % pats.length;
      var parts = pats[pi]();
      var bare = parts.length === 1 && !!base;
      var opts = { separator: o.separator, numbers: o.numbers, symbols: o.symbols, letters: o.letters, length: lengthMode };
      var r = decorate(parts, st, opts, bare);
      if (!r) continue;
      if (seen[r.text]) continue;
      /* limit near-duplicates: 2 decorations of the same core, 3 for the bare word */
      coreCount[r.core] = (coreCount[r.core] || 0) + 1;
      if (coreCount[r.core] > (bare ? 3 : 2)) continue;
      r.style = key;
      seen[r.text] = 1;
      results.push(r);
    }
    return { results: results, relaxed: relaxed };
  }

  /* ── DOM layer ── */
  function mount(cfg){
    var root = document.querySelector(cfg.root);
    if (!root) return null;
    var $ = function(sel){ return root.querySelector(sel); };
    var $$ = function(sel){ return Array.prototype.slice.call(root.querySelectorAll(sel)); };

    var form = $('[data-ug-form]');
    var wordEl = $('[data-ug-word]');
    var grid = $('[data-ug-results]');
    var countEl = $('[data-ug-count]');
    var statusEl = $('[data-ug-status]');
    var emptyEl = $('[data-ug-empty]');
    var favList = $('[data-ug-favs]');
    var favEmpty = $('[data-ug-favs-empty]');
    var favCount = $('[data-ug-fav-count]');
    var toastEl = document.querySelector('[data-toast]');
    var toastTimer;
    var results = [];
    var activeFilter = 'all';
    var favorites = loadFavs();

    function showToast(msg){
      if (!toastEl) return;
      toastEl.textContent = msg;
      toastEl.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function(){ toastEl.classList.remove('show'); }, 2200);
    }

    /* favorites persistence */
    function loadFavs(){
      try { var v = JSON.parse(localStorage.getItem(cfg.storageKey) || '[]'); return Array.isArray(v) ? v.filter(function(x){ return typeof x === 'string'; }).slice(0, 200) : []; }
      catch (e) { return []; }
    }
    function saveFavs(){
      try { localStorage.setItem(cfg.storageKey, JSON.stringify(favorites)); } catch (e) { /* private mode etc. */ }
    }
    function isFav(t){ return favorites.indexOf(t) !== -1; }
    function toggleFav(t){
      var i = favorites.indexOf(t);
      if (i === -1){ favorites.unshift(t); showToast('Saved to favorites.'); }
      else { favorites.splice(i, 1); showToast('Removed from favorites.'); }
      saveFavs();
      renderFavs();
      syncHearts();
    }

    /* clipboard */
    function fallbackCopy(str){
      var ta = document.createElement('textarea');
      ta.value = str; ta.setAttribute('readonly', '');
      ta.style.position = 'absolute'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      return ok;
    }
    function copyText(str, onDone){
      var done = function(ok){ if (onDone) onDone(ok); };
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(str).then(function(){ done(true); }, function(){ done(fallbackCopy(str)); });
      } else done(fallbackCopy(str));
    }
    function flashCopied(btn, ok){
      if (!btn) return;
      if (!ok){ showToast('Copy unavailable. Select the text and copy it manually.'); return; }
      var label = btn.getAttribute('data-label') || btn.textContent;
      btn.setAttribute('data-label', label);
      btn.textContent = 'Copied!';
      btn.classList.add('is-copied');
      clearTimeout(btn._t);
      btn._t = setTimeout(function(){ btn.textContent = label; btn.classList.remove('is-copied'); }, 1500);
    }

    /* read form */
    function readOptions(){
      var v = function(name, fallback){ var el = form.elements[name]; return el && el.value ? el.value : fallback; };
      return {
        word: wordEl ? wordEl.value : '',
        style: v('style', 'all'),
        length: v('length', 'any'),
        numbers: v('numbers', 'auto'),
        symbols: v('symbols', 'auto'),
        separator: v('separator', 'auto'),
        letters: v('letters', 'lower')
      };
    }

    /* render */
    function card(r){
      var li = document.createElement('li');
      li.className = 'ug-card';
      li.dataset.style = r.style;
      li.dataset.symbols = r.hasSymbols ? '1' : '0';
      li.dataset.len = r.length;
      var name = document.createElement('span');
      name.className = 'ug-name';
      name.textContent = r.text;
      name.title = r.text;
      var actions = document.createElement('span');
      actions.className = 'ug-actions';
      var copy = document.createElement('button');
      copy.type = 'button'; copy.className = 'ug-copy'; copy.textContent = 'Copy';
      copy.setAttribute('aria-label', 'Copy ' + r.text);
      copy.dataset.ugCopy = r.text;
      var fav = document.createElement('button');
      fav.type = 'button'; fav.className = 'ug-fav'; fav.dataset.ugFav = r.text;
      fav.setAttribute('aria-pressed', isFav(r.text) ? 'true' : 'false');
      fav.setAttribute('aria-label', 'Save ' + r.text + ' to favorites');
      fav.textContent = isFav(r.text) ? '♥' : '♡';
      actions.appendChild(copy); actions.appendChild(fav);
      li.appendChild(name); li.appendChild(actions);
      return li;
    }
    function renderResults(append){
      var frag = document.createDocumentFragment();
      var list = append ? results.slice(results.length - cfg.batchSize) : results;
      list.forEach(function(r){ frag.appendChild(card(r)); });
      if (!append) grid.innerHTML = '';
      grid.appendChild(frag);
      applyFilter();
    }
    function styleLabel(key){ return key === 'all' ? 'All styles' : (cfg.styles[key] && cfg.styles[key].label) || key; }

    function applyFilter(){
      var cards = $$('.ug-card');
      var visible = 0;
      cards.forEach(function(c){
        var show = true;
        if (activeFilter.indexOf('style:') === 0) show = c.dataset.style === activeFilter.slice(6);
        else if (activeFilter === 'short') show = Number(c.dataset.len) <= 8;
        else if (activeFilter === 'symbols') show = c.dataset.symbols === '1';
        else if (activeFilter === 'nosymbols') show = c.dataset.symbols === '0';
        c.hidden = !show;
        if (show) visible++;
      });
      if (countEl) countEl.textContent = visible + (visible === 1 ? ' username' : ' usernames');
      if (emptyEl) emptyEl.hidden = !(cards.length && !visible);
      $$('[data-ug-filter]').forEach(function(b){
        var f = b.dataset.ugFilter;
        var n = cards.filter(function(c){
          if (f === 'all') return true;
          if (f.indexOf('style:') === 0) return c.dataset.style === f.slice(6);
          if (f === 'short') return Number(c.dataset.len) <= 8;
          if (f === 'symbols') return c.dataset.symbols === '1';
          if (f === 'nosymbols') return c.dataset.symbols === '0';
          return true;
        }).length;
        var cnt = b.querySelector('[data-ug-filter-count]');
        if (cnt) cnt.textContent = n;
        b.setAttribute('aria-pressed', f === activeFilter ? 'true' : 'false');
      });
    }
    function syncHearts(){
      Array.prototype.forEach.call(document.querySelectorAll('[data-ug-fav]'), function(b){
        var on = isFav(b.dataset.ugFav);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.textContent = on ? '♥' : '♡';
      });
    }
    function renderFavs(){
      if (!favList) return;
      favList.innerHTML = '';
      var frag = document.createDocumentFragment();
      favorites.forEach(function(t){
        var li = document.createElement('li');
        li.className = 'ug-fav-item';
        var s = document.createElement('span'); s.className = 'ug-name'; s.textContent = t;
        var copy = document.createElement('button');
        copy.type = 'button'; copy.className = 'ug-copy'; copy.textContent = 'Copy';
        copy.dataset.ugCopy = t; copy.setAttribute('aria-label', 'Copy ' + t);
        var rm = document.createElement('button');
        rm.type = 'button'; rm.className = 'ug-remove'; rm.textContent = '×';
        rm.dataset.ugFav = t; rm.setAttribute('aria-label', 'Remove ' + t + ' from favorites');
        li.appendChild(s); li.appendChild(copy); li.appendChild(rm);
        frag.appendChild(li);
      });
      favList.appendChild(frag);
      if (favEmpty) favEmpty.hidden = favorites.length > 0;
      if (favCount) favCount.textContent = favorites.length ? '(' + favorites.length + ')' : '';
      $$('[data-ug-fav-action]').forEach(function(b){ b.disabled = favorites.length === 0; });
    }

    function run(append){
      var o = readOptions();
      var out;
      try { out = generate(cfg, o, append ? results.map(function(r){ return r.text; }) : []); }
      catch (err){ showToast(err.message); return; }
      if (!out.results.length){ showToast('No combinations found. Try another word or setting.'); return; }
      if (append){
        results = results.concat(out.results);
        if (results.length > cfg.maxResults){
          var drop = results.length - cfg.maxResults;
          results = results.slice(drop);
          for (var i = 0; i < drop; i++){ var first = grid.firstElementChild; if (first) grid.removeChild(first); }
        }
      } else results = out.results;
      renderResults(append);
      if (statusEl){
        var w = sanitizeWord(o.word);
        statusEl.textContent = (w ? 'Ideas for “' + w + '”' : 'Fresh ideas') + ' · ' + styleLabel(o.style);
      }
      grid.setAttribute('data-generated', '1');
      showToast(out.relaxed ? 'Some results are longer than requested — your word is long.' : out.results.length + ' new username ideas ready.');
    }

    /* events */
    if (form){
      form.addEventListener('submit', function(e){ e.preventDefault(); run(false); });
    }
    root.addEventListener('click', function(e){
      var t = e.target.closest ? e.target.closest('button, a') : null;
      if (!t) return;
      if (t.hasAttribute('data-ug-more')){ run(true); return; }
      if (t.hasAttribute('data-ug-clear')){
        results = []; grid.innerHTML = ''; applyFilter();
        if (statusEl) statusEl.textContent = 'Cleared. Generate a new batch whenever you like.';
        if (emptyEl) emptyEl.hidden = true;
        return;
      }
      if (t.hasAttribute('data-ug-copy-all')){
        var visible = $$('.ug-card').filter(function(c){ return !c.hidden; }).map(function(c){ return c.querySelector('.ug-name').textContent; });
        if (!visible.length){ showToast('Nothing to copy yet — generate a batch first.'); return; }
        copyText(visible.join('\n'), function(ok){ flashCopied(t, ok); if (ok) showToast(visible.length + ' usernames copied, one per line.'); });
        return;
      }
      if (t.hasAttribute('data-ug-filter')){ activeFilter = t.dataset.ugFilter; applyFilter(); return; }
      if (t.dataset.ugFavAction === 'copy'){
        if (!favorites.length) return;
        copyText(favorites.join('\n'), function(ok){ flashCopied(t, ok); });
        return;
      }
      if (t.dataset.ugFavAction === 'clear'){
        favorites = []; saveFavs(); renderFavs(); syncHearts(); showToast('Favorites cleared.'); return;
      }
    });

    /* Global delegates: copy chips, hearts and style shortcuts anywhere on the page. */
    document.addEventListener('click', function(e){
      var t = e.target.closest ? e.target.closest('[data-ug-copy], [data-ug-fav], [data-ug-style], [data-ug-preset]') : null;
      if (!t) return;
      if (t.hasAttribute('data-ug-copy')){ var s = t.dataset.ugCopy; copyText(s, function(ok){ flashCopied(t, ok); }); return; }
      if (t.hasAttribute('data-ug-fav')){ toggleFav(t.dataset.ugFav); return; }
      /* Shortcuts: data-ug-style="cute" or data-ug-preset='{"style":"soft","symbols":"none"}' */
      var preset = null;
      if (t.hasAttribute('data-ug-preset')){ try { preset = JSON.parse(t.dataset.ugPreset); } catch (err) { preset = null; } }
      else if (t.hasAttribute('data-ug-style')) preset = { style: t.dataset.ugStyle };
      if (preset && form){
        Object.keys(preset).forEach(function(name){
          var el = form.querySelector('input[name="' + name + '"][value="' + preset[name] + '"]');
          if (el) el.checked = true;
        });
        if (t.dataset.ugWord !== undefined && wordEl) wordEl.value = t.dataset.ugWord;
        run(false);
        var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
        root.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        var focusEl = form.querySelector('input[name="style"]:checked');
        if (focusEl) focusEl.focus({ preventScroll: true });
      }
    });

    /* Pre-rendered (server) cards: wire hearts + counts without regenerating. */
    $$('.ug-card').forEach(function(c){
      results.push({ text: c.querySelector('.ug-name').textContent, style: c.dataset.style, hasSymbols: c.dataset.symbols === '1', length: Number(c.dataset.len) });
    });
    renderFavs();
    syncHearts();
    applyFilter();

    return { run: run, generate: function(o){ return generate(cfg, o, []); }, copyText: copyText };
  }

  global.UsernameGenerator = { mount: mount, generate: generate, SYMBOL_SETS: SYMBOL_SETS };
})(window);
