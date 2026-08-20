const alphabets = {
  // ── Original 5 ──────────────────────────────────────────────────────────────
  script: {
    name: "Cursive Script",
    lower: "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏",
    upper: "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵"
  },
  boldScript: {
    name: "Bold Cursive",
    lower: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃",
    upper: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩"
  },
  fraktur: {
    name: "Old Style Script",
    lower: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷",
    upper: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ"
  },
  double: {
    name: "Double-Struck",
    lower: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
    upper: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ"
  },
  monospace: {
    name: "Clean Fancy",
    lower: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
    upper: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉"
  },
  // ── New 11 ──────────────────────────────────────────────────────────────────
  bold: {
    name: "Bold",
    lower: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳",
    upper: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙"
  },
  italic: {
    name: "Italic",
    lower: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
    upper: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍"
  },
  boldItalic: {
    name: "Bold Italic",
    lower: "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛",
    upper: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁"
  },
  boldFraktur: {
    name: "Bold Gothic",
    lower: "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟",
    upper: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅"
  },
  sansSerif: {
    name: "Sans-Serif",
    lower: "𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓",
    upper: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹"
  },
  sansBold: {
    name: "Sans Bold",
    lower: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇",
    upper: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭"
  },
  sansItalic: {
    name: "Sans Italic",
    lower: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻",
    upper: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡"
  },
  sansBoldItalic: {
    name: "Sans Bold Italic",
    lower: "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯",
    upper: "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕"
  },
  fullwidth: {
    name: "Aesthetic Wide",
    lower: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ",
    upper: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ"
  },
  smallCaps: {
    name: "Small Caps",
    lower: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  },
  circled: {
    name: "Circled",
    lower: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ",
    upper: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ"
  }
};

// ── DOM refs ─────────────────────────────────────────────────────────────────
const input        = document.querySelector("[data-input]");
const results      = document.querySelector("[data-results]");
const clearButton  = document.querySelector("[data-clear]");
const presetSelect = document.querySelector("[data-preset]");
const toast        = document.querySelector("[data-toast]");

// ── State ────────────────────────────────────────────────────────────────────
let bgMode   = "transparent"; // current bg mode key
let bgHex    = "#ffffff";     // hex used for download when not transparent
let fontSize = 0;             // 0 = use CSS default

// ── Populate select from alphabets ──────────────────────────────────────────
function populateSelect() {
  if (!presetSelect) return;
  const saved = presetSelect.value || "all";
  presetSelect.innerHTML = '<option value="all">All styles</option>';
  for (const [key, ab] of Object.entries(alphabets)) {
    const opt = new Option(ab.name, key);
    presetSelect.appendChild(opt);
  }
  // Restore pre-selected value (from HTML attribute or default)
  if ([...presetSelect.options].some(o => o.value === saved)) {
    presetSelect.value = saved;
  }
}

// ── Inject extra controls once ───────────────────────────────────────────────
const BG_PRESETS = [
  { key: "transparent", label: "Transparent", hex: null,      cls: "swatch-tp" },
  { key: "#ffffff",     label: "White",        hex: "#ffffff", cls: "" },
  { key: "#000000",     label: "Black",        hex: "#000000", cls: "" },
  { key: "#fce4ec",     label: "Pink",         hex: "#fce4ec", cls: "" },
  { key: "#e8f5e9",     label: "Mint",         hex: "#e8f5e9", cls: "" },
  { key: "#e3f2fd",     label: "Sky Blue",     hex: "#e3f2fd", cls: "" },
  { key: "#fff9c4",     label: "Yellow",       hex: "#fff9c4", cls: "" },
];

function injectExtraControls() {
  const controlsDiv = document.querySelector(".controls");
  if (!controlsDiv || document.querySelector("[data-extra-controls]")) return;

  const el = document.createElement("div");
  el.className = "controls-extra";
  el.dataset.extraControls = "";

  const swatchHtml = BG_PRESETS.map((p, i) => {
    const style = p.hex
      ? `background:${p.hex};border:1px solid rgba(0,0,0,.12)`
      : `background:repeating-conic-gradient(#ccc 0 25%,#fff 0 50%) 0 0/10px 10px;border:1px dashed #aaa`;
    return `<button class="swatch${i === 0 ? " active" : ""}" data-bg-key="${p.key}" style="${style}" title="${p.label}" aria-label="${p.label}"></button>`;
  }).join("");

  el.innerHTML = `
    <div class="ctrl-group">
      <label for="gen-size-slider">Size&thinsp;<span id="gen-size-display">–</span>px</label>
      <input type="range" id="gen-size-slider" min="14" max="96" value="32" step="2" class="size-slider" data-size-slider>
    </div>
    <div class="ctrl-group">
      <label>Background</label>
      <div class="bg-swatches">
        ${swatchHtml}
        <input type="color" class="swatch swatch-picker" id="gen-bg-picker" value="#ffffff" title="Custom colour" aria-label="Custom background colour">
      </div>
    </div>`;

  controlsDiv.after(el);

  // ── Wire size slider ──
  const slider  = el.querySelector("[data-size-slider]");
  const display = el.querySelector("#gen-size-display");

  function applySize(v) {
    fontSize = parseInt(v, 10);
    display.textContent = fontSize;
    document.documentElement.style.setProperty("--output-fs", fontSize + "px");
  }

  // Init display from CSS computed value on first load
  const computedFs = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--output-fs") || "32"
  );
  const initFs = isNaN(computedFs) ? 32 : Math.min(96, Math.max(14, computedFs));
  slider.value = initFs;
  applySize(initFs);

  slider.addEventListener("input", () => applySize(slider.value));

  // ── Wire background swatches ──
  function applyBg(key) {
    bgMode = key;
    bgHex  = key === "transparent" ? "#ffffff" : key;
    const isDark = key !== "transparent" && luma(key) < 128;
    document.documentElement.style.setProperty("--result-bg",   key === "transparent" ? "" : key);
    document.documentElement.style.setProperty("--result-text", isDark ? "#ffffff" : "");
    el.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
    el.querySelectorAll(`[data-bg-key="${key}"]`).forEach(s => s.classList.add("active"));
  }

  el.querySelectorAll("[data-bg-key]").forEach(btn => {
    btn.addEventListener("click", () => applyBg(btn.dataset.bgKey));
  });

  const picker = el.querySelector("#gen-bg-picker");
  picker.addEventListener("input", () => {
    bgMode = picker.value;
    bgHex  = picker.value;
    const isDark = luma(picker.value) < 128;
    document.documentElement.style.setProperty("--result-bg",   picker.value);
    document.documentElement.style.setProperty("--result-text", isDark ? "#ffffff" : "");
    el.querySelectorAll(".swatch").forEach(s => s.classList.remove("active"));
    picker.classList.add("active");
  });
}

// ── Core helpers ─────────────────────────────────────────────────────────────
function convert(text, alphabet) {
  return Array.from(text).map(char => {
    if (char >= "a" && char <= "z") return Array.from(alphabet.lower)[char.charCodeAt(0) - 97];
    if (char >= "A" && char <= "Z") return Array.from(alphabet.upper)[char.charCodeAt(0) - 65];
    return char;
  }).join("");
}

function luma(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1700);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied — paste it anywhere");
  } catch {
    showToast("Select and copy the text manually");
  }
}

// ── Download as PNG ──────────────────────────────────────────────────────────
function downloadCard(key) {
  const outputEl = results?.querySelector(`[data-output="${key}"]`);
  if (!outputEl) return;

  const text      = outputEl.textContent;
  const styleName = alphabets[key]?.name || key;
  const fs        = fontSize || parseInt(getComputedStyle(outputEl).fontSize) || 36;
  const ratio     = Math.min(window.devicePixelRatio || 2, 3);
  const PAD       = 48;
  const FOOTER    = 32;
  const MAX_W     = 1200;
  const transparent = bgMode === "transparent";

  // Measure
  const tmp = document.createElement("canvas");
  const tc  = tmp.getContext("2d");
  const FONT = `${fs}px 'Segoe UI','SF Pro Display',Arial,sans-serif`;
  tc.font = FONT;
  const textW = tc.measureText(text).width;

  const cW = Math.max(420, Math.min(textW + PAD * 2, MAX_W));
  const cH = fs * 1.6 + PAD * 2 + FOOTER;

  const canvas = document.createElement("canvas");
  canvas.width  = Math.round(cW * ratio);
  canvas.height = Math.round(cH * ratio);
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);

  // Background
  if (!transparent) {
    ctx.fillStyle = bgHex;
    ctx.fillRect(0, 0, cW, cH);
  }

  const dark = !transparent && luma(bgHex) < 128;
  const ink  = dark ? "#ffffff" : "#1a1a1a";
  const sub  = dark ? "#888888" : "#aaaaaa";

  // Main text
  ctx.font         = FONT;
  ctx.fillStyle    = ink;
  ctx.textBaseline = "alphabetic";

  // Wrap if too wide
  const usableW = cW - PAD * 2;
  if (textW > usableW) {
    const words = text.split(" ");
    let line = "";
    let y = PAD + fs;
    for (const word of words) {
      const test = line ? line + " " + word : word;
      if (ctx.measureText(test).width > usableW && line) {
        ctx.fillText(line, PAD, y);
        line = word;
        y += fs * 1.4;
      } else {
        line = test;
      }
    }
    if (line) ctx.fillText(line, PAD, y);
  } else {
    ctx.fillText(text, PAD, PAD + fs);
  }

  // Footer label
  ctx.font      = `13px 'Segoe UI',Arial,sans-serif`;
  ctx.fillStyle = sub;
  ctx.fillText(`${styleName} · cursive-text-generator.net`, PAD, cH - 10);

  // Trigger download
  const a      = document.createElement("a");
  a.download   = `${text.slice(0, 20).replace(/\s+/g, "-").replace(/[^a-z0-9-]/gi, "")}-${key}.png`;
  a.href       = canvas.toDataURL("image/png");
  a.click();
}

// ── Render ───────────────────────────────────────────────────────────────────
function render() {
  if (!input || !results || !presetSelect) return;
  const text     = input.value.trim() || input.placeholder;
  const selected = presetSelect.value;
  const entries  = selected === "all"
    ? Object.entries(alphabets)
    : Object.entries(alphabets).filter(([k]) => k === selected);

  results.innerHTML = entries.map(([key, ab]) => {
    const output = convert(text, ab);
    return `
      <article class="result-card">
        <div class="result-top">
          <div class="result-title">${ab.name}</div>
          <div class="result-actions">
            <button class="btn-download" type="button" data-dl="${key}" title="Download as PNG">⬇ Save</button>
            <button class="button copy" type="button" data-copy="${key}" aria-label="Copy ${ab.name}">1-Click Copy</button>
          </div>
        </div>
        <div class="output" data-output="${key}">${output}</div>
      </article>`;
  }).join("");
}

// ── Event listeners ──────────────────────────────────────────────────────────
input?.addEventListener("input", render);
presetSelect?.addEventListener("change", render);
clearButton?.addEventListener("click", () => { input.value = ""; input.focus(); render(); });

results?.addEventListener("click", e => {
  const copyBtn = e.target.closest("[data-copy]");
  if (copyBtn) {
    const out = results.querySelector(`[data-output="${copyBtn.dataset.copy}"]`);
    if (out) copyText(out.textContent);
    return;
  }
  const dlBtn = e.target.closest("[data-dl]");
  if (dlBtn) downloadCard(dlBtn.dataset.dl);
});

// ── Init ─────────────────────────────────────────────────────────────────────
populateSelect();
injectExtraControls();
render();
