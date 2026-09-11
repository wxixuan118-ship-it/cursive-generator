/* ── Pixel cluster UI ───────────────────────────────────────────────────────
   Reads the themes a page lists in data-themes, renders one canvas per theme
   and wires the shared controls (pixel size, colours, uppercase, filters).
   All drawing lives in assets/pixel-engine.js — this file is DOM only. */
(function () {
  'use strict';

  var PF = window.PixelFont;
  var root = document.querySelector('[data-pixel-generator]');
  if (!PF || !root) return;

  var ids = (root.getAttribute('data-themes') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
  var themes = ids.map(function (id) { return PF.theme(id); }).filter(Boolean);
  var slug = root.getAttribute('data-slug') || 'pixel-text';
  var sample = root.getAttribute('data-sample') || 'PIXEL';

  var input = document.getElementById('px-text');
  var grid = root.querySelector('.px-grid');
  var countEl = root.querySelector('.px-count');
  var sizeEl = document.getElementById('px-size');
  var sizeOut = document.getElementById('px-size-out');
  var customEl = document.getElementById('px-custom');
  var fgEl = document.getElementById('px-fg');
  var bgEl = document.getElementById('px-bg');
  var clearBgEl = document.getElementById('px-clear-bg');
  var upperEl = document.getElementById('px-upper');
  var resetEl = root.querySelector('.px-reset');
  var chips = Array.prototype.slice.call(root.querySelectorAll('.px-chip'));
  var toastEl = document.querySelector('[data-toast]');

  var activeCat = 'all';
  var toastTimer;
  var frame = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1600);
  }

  function copyText(text, msg) {
    var done = function () { showToast(msg); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
    } else fallback(text, done);
  }
  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-1000px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { showToast('Copy failed — select the text manually'); }
    document.body.removeChild(ta);
  }

  function currentText() {
    var v = input && input.value !== '' ? input.value : sample;
    return v;
  }

  function options() {
    var custom = customEl && customEl.checked;
    var transparent = clearBgEl && clearBgEl.checked;
    var over = {};
    if (custom) {
      over.fg = fgEl.value;
      over.bg = transparent ? null : bgEl.value;
    } else if (transparent) {
      over.bg = null;
    }
    return {
      scale: sizeEl ? Number(sizeEl.value) : 7,
      forceUpper: upperEl && upperEl.checked,
      override: over
    };
  }

  var cards = themes.map(function (theme) {
    var fig = document.createElement('figure');
    fig.className = 'px-card';
    fig.setAttribute('data-theme', theme.id);

    var cap = document.createElement('figcaption');
    cap.className = 'px-name';
    cap.textContent = theme.name;

    var wrap = document.createElement('div');
    wrap.className = 'px-canvas-wrap';
    var canvas = document.createElement('canvas');
    canvas.className = 'px-canvas';
    canvas.setAttribute('role', 'img');
    wrap.appendChild(canvas);

    var actions = document.createElement('div');
    actions.className = 'px-actions';

    var png = document.createElement('button');
    png.type = 'button';
    png.className = 'px-btn px-png';
    png.textContent = 'Download PNG';
    png.addEventListener('click', function () { download(canvas, theme); });

    var blocks = document.createElement('button');
    blocks.type = 'button';
    blocks.className = 'px-btn px-blocks';
    blocks.textContent = 'Copy text art';
    blocks.addEventListener('click', function () {
      var o = options();
      var art = PF.blockArt(currentText(), { uppercase: o.forceUpper || !!theme.uppercase });
      copyText(art, 'Text art copied');
      blocks.classList.add('copied');
      setTimeout(function () { blocks.classList.remove('copied'); }, 900);
    });

    actions.appendChild(png);
    actions.appendChild(blocks);
    fig.appendChild(cap);
    fig.appendChild(wrap);
    fig.appendChild(actions);
    grid.appendChild(fig);

    return { theme: theme, fig: fig, canvas: canvas };
  });

  function download(canvas, theme) {
    var name = slug + '-' + theme.id + '.png';
    var finish = function (url, revoke) {
      var a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      if (revoke) setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      showToast('PNG saved');
    };
    if (canvas.toBlob) {
      canvas.toBlob(function (blob) {
        if (!blob) return finish(canvas.toDataURL('image/png'), false);
        finish(URL.createObjectURL(blob), true);
      }, 'image/png');
    } else finish(canvas.toDataURL('image/png'), false);
  }

  function visible(theme) {
    return activeCat === 'all' || (theme.cats || '').indexOf(activeCat) !== -1;
  }

  function render() {
    frame = null;
    var text = currentText();
    var o = options();
    var shown = 0;
    cards.forEach(function (card) {
      var on = visible(card.theme);
      card.fig.hidden = !on;
      if (!on) return;
      shown++;
      PF.draw(card.canvas, text, card.theme, {
        scale: o.scale,
        uppercase: o.forceUpper ? true : undefined,
        override: o.override
      });
      /* Natural size in CSS pixels; .px-canvas caps it at 100% and keeps the
         edges hard with image-rendering:pixelated when it has to shrink. */
      card.canvas.style.width = card.canvas.width + 'px';
      card.canvas.setAttribute('aria-label', text + ' rendered as pixel text in the ' + card.theme.name + ' style');
    });
    if (countEl) countEl.textContent = 'Showing ' + shown + ' of ' + cards.length + ' pixel styles';
  }

  function schedule() {
    if (frame) return;
    frame = requestAnimationFrame(render);
  }

  if (input) {
    input.addEventListener('input', schedule);
    input.value = sample;
  }
  [sizeEl, customEl, fgEl, bgEl, clearBgEl, upperEl].forEach(function (el) {
    if (!el) return;
    el.addEventListener('input', function () {
      if (el === sizeEl && sizeOut) sizeOut.textContent = sizeEl.value + '×';
      if (el === customEl || el === clearBgEl) syncColorInputs();
      schedule();
    });
    el.addEventListener('change', function () {
      if (el === customEl || el === clearBgEl) syncColorInputs();
      schedule();
    });
  });

  function syncColorInputs() {
    var custom = customEl && customEl.checked;
    if (fgEl) fgEl.disabled = !custom;
    if (bgEl) bgEl.disabled = !custom || (clearBgEl && clearBgEl.checked);
  }

  if (resetEl) {
    resetEl.addEventListener('click', function () {
      if (input) input.value = sample;
      if (sizeEl) { sizeEl.value = 7; if (sizeOut) sizeOut.textContent = '7×'; }
      if (customEl) customEl.checked = false;
      if (clearBgEl) clearBgEl.checked = false;
      if (upperEl) upperEl.checked = false;
      syncColorInputs();
      render();
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeCat = chip.getAttribute('data-cat');
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      render();
    });
  });

  syncColorInputs();
  render();
})();
