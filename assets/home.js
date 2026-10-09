(() => {

const STYLES = [
  { key: "script", cat: "pretty", name: "Cursive Script",
    lower: "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏", upper: "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵" },
  { key: "boldScript", cat: "pretty", name: "Bold Cursive",
    lower: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃", upper: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩" },
  { key: "bold", cat: "bold", name: "Bold",
    lower: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳", upper: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙" },
  { key: "sansBold", cat: "bold", name: "Sans Bold",
    lower: "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇", upper: "𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭" },
  { key: "sansBoldItalic", cat: "bold", name: "Sans Bold Italic",
    lower: "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯", upper: "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕" },
  { key: "italic", cat: "italic", name: "Italic",
    lower: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧", upper: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍" },
  { key: "boldItalic", cat: "italic", name: "Bold Italic",
    lower: "𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛", upper: "𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁" },
  { key: "sansItalic", cat: "italic", name: "Sans Italic",
    lower: "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻", upper: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡" },
  { key: "fraktur", cat: "gothic", name: "Old Style Script",
    lower: "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷", upper: "𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ" },
  { key: "boldFraktur", cat: "gothic", name: "Bold Gothic",
    lower: "𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟", upper: "𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅" },
  { key: "double", cat: "clean", name: "Double-Struck",
    lower: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫", upper: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ" },
  { key: "monospace", cat: "clean", name: "Clean Fancy",
    lower: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣", upper: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉" },
  { key: "sansSerif", cat: "clean", name: "Sans-Serif",
    lower: "𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓", upper: "𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹" },
  { key: "smallCaps", cat: "clean", name: "Small Caps",
    lower: "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ", upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
  { key: "fullwidth", cat: "clean", name: "Aesthetic Wide",
    lower: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ", upper: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ" },
  { key: "circled", cat: "clean", name: "Circled",
    lower: "ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ", upper: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ" }
];
for (const s of STYLES) { s.l = Array.from(s.lower); s.u = Array.from(s.upper); }

const STYLE_CATS = [["all", "All"], ["pretty", "Pretty"], ["bold", "Bold"], ["italic", "Italic"], ["gothic", "Gothic"], ["clean", "Clean"]];

const DECOS = {
  popular: [["❝", "❞"], ["⋆·˚✦ ", " ✦˚·⋆"], ["꧁♢ ", " ♢꧂"], ["˚₊‧꒰ა ", " ໒꒱‧₊˚"], ["ʚ ", " ɞ"], ["✧･ﾟ ", " ﾟ･✧"]],
  royal:   [["♛ ", " ♛"], ["꧁", "꧂"], ["༺ ", " ༻"], ["⚜ ", " ⚜"], ["♔ ", " ♔"]],
  stars:   [["✦ ", " ✦"], ["☆ ", " ☆"], ["⋆｡°✩ ", " ✩°｡⋆"], ["★彡 ", " 彡★"], ["✩ ", " ✩"]],
  flowers: [["✿ ", " ✿"], ["❀ ", " ❀"], ["❧ ", " ☙"], ["⚘ ", " ⚘"], ["˚✿˖° ", " °˖✿˚"]],
  hearts:  [["♡ ", " ♡"], ["❥ ", " ❥"], ["ღ ", " ღ"], ["❣ ", " ❣"], ["♥ ", " ♥"]],
  lines:   [["━ ", " ━"], ["── ", " ──"], ["▸ ", " ◂"], ["【", "】"], ["『", "』"]]
};
const DECO_CATS = [["popular", "Popular"], ["royal", "Royal"], ["stars", "Stars"], ["flowers", "Flowers"], ["hearts", "Hearts"], ["lines", "Lines"]];

const GFONTS = [
  { name: "Great Vibes", cat: "elegant", scale: 1.9, weight: 400 },
  { name: "Allura", cat: "elegant", scale: 1.9, weight: 400 },
  { name: "Parisienne", cat: "elegant", scale: 1.6, weight: 400 },
  { name: "Pinyon Script", cat: "elegant", scale: 1.6, weight: 400 },
  { name: "Dancing Script", cat: "casual", scale: 1.6, weight: 600 },
  { name: "Pacifico", cat: "casual", scale: 1.35, weight: 400 },
  { name: "Satisfy", cat: "casual", scale: 1.6, weight: 400 },
  { name: "Caveat", cat: "casual", scale: 1.7, weight: 600 },
  { name: "Sacramento", cat: "signature", scale: 2.0, weight: 400 },
  { name: "Mrs Saint Delafield", cat: "signature", scale: 2.1, weight: 400 },
  { name: "Alex Brush", cat: "signature", scale: 1.8, weight: 400 },
  { name: "Kaushan Script", cat: "signature", scale: 1.4, weight: 400 }
];
const GCATS = [["all", "All"], ["elegant", "Elegant"], ["casual", "Casual"], ["signature", "Signature"]];
const GNOTE = { elegant: "Elegant script", casual: "Casual handwriting", signature: "Signature style" };
const INKS = [["#24212b", "Charcoal"], ["#7846dc", "Purple"], ["#9a6d17", "Gold"], ["#c2416b", "Rose"], ["#ffffff", "White"]];
const BGS = [["transparent", "Transparent"], ["#ffffff", "White"], ["#f6efe4", "Cream"], ["#efe6ff", "Lilac"], ["#1b1a1f", "Dark"]];
const FONTS_CSS = "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Allura&family=Parisienne&family=Pinyon+Script&family=Dancing+Script:wght@600&family=Pacifico&family=Satisfy&family=Caveat:wght@600&family=Sacramento&family=Mrs+Saint+Delafield&family=Alex+Brush&family=Kaushan+Script&display=swap";

const ICON_COPY = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h8"/></svg>';
const ICON_DL = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>';

const state = { tab: "copy", decoCat: "popular", deco: null, styleCat: "all", size: 26, gCat: "all", ink: INKS[0][0], bg: "transparent" };

const $ = (sel, root = document) => root.querySelector(sel);
const input = $("[data-input]");
const countEl = $("[data-count]");
const results = $("[data-results]");
const toast = $("[data-toast]");
const fontsGrid = $("[data-gfonts]");

const esc = (v) => String(v).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const convert = (text, s) => Array.from(text).map((ch) => {
  if (ch >= "a" && ch <= "z") return s.l[ch.charCodeAt(0) - 97];
  if (ch >= "A" && ch <= "Z") return s.u[ch.charCodeAt(0) - 65];
  return ch;
}).join("");
const currentText = () => (input && input.value.trim()) || "Cursive Text";
const currentDeco = () => {
  if (!state.deco) return ["", ""];
  const [cat, i] = state.deco.split(":");
  return DECOS[cat][+i];
};

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1700);
}

async function copyPlain(text, msg = "Copied") {
  try { await navigator.clipboard.writeText(text); showToast(msg); }
  catch { showToast("Select and copy the text manually"); }
}

function flash(btn, label) {
  const html = btn.innerHTML;
  btn.classList.add("is-done");
  btn.innerHTML = label;
  clearTimeout(btn._t);
  btn._t = setTimeout(() => { btn.classList.remove("is-done"); btn.innerHTML = html; }, 1300);
}

// After a copy, offer the next step right under the copied row: where people paste
// cursive text, plus one page matching the style family they picked.
const NEXT_BY_CAT = {
  pretty: ["/cursive-name-generator.html", "Cursive names"],
  bold: ["/cursive-bold-generator.html", "More bold cursive"],
  italic: ["/italic-font-generator.html", "More italic fonts"],
  gothic: ["/fancy-text-generator.html", "More fancy text"],
  clean: ["/aesthetic-fonts.html", "Aesthetic fonts"]
};
const NEXT_LINKS = [
  ["/instagram-font-generator.html", "Instagram fonts"],
  ["/fonts-for-discord.html", "Discord fonts"],
  ["/copy-and-paste-cursive-signature.html", "Cursive signatures"]
];
let nextBar = null;
function showNext(btn, key) {
  const row = btn.closest(".hg-result");
  const style = STYLES.find((s) => s.key === key);
  if (!row || !style) return;
  if (!nextBar) {
    nextBar = document.createElement("nav");
    nextBar.className = "hg-next";
    nextBar.setAttribute("aria-label", "Next steps");
  }
  const links = [NEXT_BY_CAT[style.cat], ...NEXT_LINKS].filter(Boolean)
    .map(([href, label]) => `<a href="${href}">${label}</a>`).join("");
  nextBar.innerHTML = `<span class="hg-next-title">Next:</span>${links}<button type="button" class="hg-next-img" data-tab="graphic">Need an image? Graphic fonts</button>`;
  row.after(nextBar);
}

const pressed = (on) => `aria-pressed="${on ? "true" : "false"}"`;

// ── Copy-paste panel ─────────────────────────────────────────────────────────
function renderDecoBar() {
  const cats = $("[data-deco-cats]");
  const chips = $("[data-deco-chips]");
  if (!cats || !chips) return;
  cats.innerHTML = DECO_CATS.map(([k, label]) => `<button type="button" class="hg-pill" data-deco-cat="${k}" ${pressed(state.decoCat === k)}>${label}</button>`).join("");
  chips.innerHTML = `<button type="button" class="hg-chip" data-deco="" ${pressed(!state.deco)}>No decoration</button>` +
    DECOS[state.decoCat].map(([l, r], i) => {
      const id = `${state.decoCat}:${i}`;
      return `<button type="button" class="hg-chip" data-deco="${id}" ${pressed(state.deco === id)} aria-label="Decoration ${esc(l + "Aa" + r)}">${esc(l + "Aa" + r)}</button>`;
    }).join("");
}

function renderStyleCats() {
  const el = $("[data-style-cats]");
  if (!el) return;
  el.innerHTML = STYLE_CATS.map(([k, label]) => {
    const n = k === "all" ? STYLES.length : STYLES.filter((s) => s.cat === k).length;
    return `<button type="button" class="hg-seg" data-style-cat="${k}" ${pressed(state.styleCat === k)}>${label} <span>${n}</span></button>`;
  }).join("");
}

function renderResults() {
  if (!results) return;
  const text = currentText();
  const [l, r] = currentDeco();
  results.innerHTML = STYLES.filter((s) => state.styleCat === "all" || s.cat === state.styleCat).map((s) => `
    <div class="hg-result">
      <div class="hg-meta"><strong>${s.name}</strong><span>${s.cat}</span></div>
      <div class="hg-out" data-out="${s.key}">${esc(l + convert(text, s) + r)}</div>
      <div class="hg-actions">
        <button type="button" class="hg-btn" data-copy="${s.key}" aria-label="Copy ${s.name}">${ICON_COPY}Copy</button>
        <button type="button" class="hg-btn-ghost" data-png="${s.key}" aria-label="Download ${s.name} as PNG">${ICON_DL}PNG</button>
      </div>
    </div>`).join("");
}

// ── Graphic fonts panel ──────────────────────────────────────────────────────
let fontsRequested = false;
function loadGraphicFonts() {
  if (fontsRequested) return;
  fontsRequested = true;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FONTS_CSS;
  document.head.appendChild(link);
}

function bgCss(bg) {
  return bg === "transparent" ? "" : `background:${bg}`;
}

function renderGraphicControls() {
  const cats = $("[data-gcats]");
  const inks = $("[data-inks]");
  const bgs = $("[data-bgs]");
  if (cats) cats.innerHTML = GCATS.map(([k, label]) => {
    const n = k === "all" ? GFONTS.length : GFONTS.filter((f) => f.cat === k).length;
    return `<button type="button" class="hg-seg" data-gcat="${k}" ${pressed(state.gCat === k)}>${label} <span>${n}</span></button>`;
  }).join("");
  if (inks) inks.innerHTML = INKS.map(([hex, label]) => `<button type="button" class="hg-swatch" data-ink="${hex}" style="background:${hex}" aria-label="Text color ${label}" ${pressed(state.ink === hex)}></button>`).join("");
  if (bgs) bgs.innerHTML = BGS.map(([hex, label]) => `<button type="button" class="hg-swatch sq${hex === "transparent" ? " hg-checker" : ""}" data-bg="${hex}" style="${bgCss(hex)}" aria-label="Background ${label}" ${pressed(state.bg === hex)}></button>`).join("");
}

function renderGraphicFonts() {
  if (!fontsGrid) return;
  const text = currentText();
  const bgClass = state.bg === "transparent" ? " hg-checker" : "";
  fontsGrid.style.setProperty("--hg-ink", state.ink);
  fontsGrid.innerHTML = GFONTS.filter((f) => state.gCat === "all" || f.cat === state.gCat).map((f) => `
    <div class="hg-font">
      <div class="hg-font-preview${bgClass}" style="${bgCss(state.bg)};font-family:'${f.name}',cursive;font-weight:${f.weight};font-size:${Math.round(state.size * f.scale)}px">${esc(text)}</div>
      <div class="hg-font-bar">
        <div><strong>${f.name}</strong><span>${GNOTE[f.cat]} · Free</span></div>
        <div class="hg-actions">
          <button type="button" class="hg-btn-ghost" data-gcopy="${f.name}" aria-label="Copy ${f.name} image">${ICON_COPY}</button>
          <button type="button" class="hg-btn" data-gpng="${f.name}" aria-label="Download ${f.name} as PNG">${ICON_DL}PNG</button>
        </div>
      </div>
    </div>`).join("");
}

// ── PNG rendering ────────────────────────────────────────────────────────────
function luma(hex) {
  const n = parseInt(hex.slice(1), 16);
  return ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000;
}

function wrapLines(ctx, text, maxW) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (line && ctx.measureText(test).width > maxW) { lines.push(line); line = w; } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

function drawCanvas({ text, font, size, ink, bg, weight = 400 }) {
  const ratio = 2, PAD = 48, FOOT = 30, MAX_W = 1200;
  const m = document.createElement("canvas").getContext("2d");
  m.font = `${weight} ${size}px ${font}`;
  const cW = Math.max(420, Math.min(m.measureText(text).width + PAD * 2, MAX_W));
  const lines = wrapLines(m, text, cW - PAD * 2);
  const lineH = size * 1.45;
  const cH = Math.ceil(PAD * 2 + lineH * lines.length + FOOT);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(cW * ratio);
  canvas.height = Math.round(cH * ratio);
  const ctx = canvas.getContext("2d");
  ctx.scale(ratio, ratio);
  if (bg !== "transparent") { ctx.fillStyle = bg; ctx.fillRect(0, 0, cW, cH); }
  ctx.font = `${weight} ${size}px ${font}`;
  ctx.fillStyle = ink;
  ctx.textBaseline = "middle";
  lines.forEach((ln, i) => ctx.fillText(ln, PAD, PAD + lineH * (i + 0.5)));
  const dark = bg !== "transparent" && luma(bg) < 128;
  ctx.font = "12px 'Segoe UI',Arial,sans-serif";
  ctx.fillStyle = dark ? "#9a96a3" : "#a9a3b5";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("cursive-text-generator.net", PAD, cH - 12);
  return canvas;
}

function fileName(text, suffix) {
  const base = text.slice(0, 24).replace(/\s+/g, "-").replace(/[^a-z0-9-]/gi, "") || "cursive";
  return `${base}-${suffix.replace(/\s+/g, "-").toLowerCase()}.png`;
}

function saveCanvas(canvas, name) {
  const a = document.createElement("a");
  a.download = name;
  a.href = canvas.toDataURL("image/png");
  a.click();
}

async function graphicCanvas(fontName) {
  const f = GFONTS.find((x) => x.name === fontName);
  const size = Math.round(state.size * f.scale * 1.4);
  const fontDecl = `${f.weight} ${size}px '${f.name}'`;
  try { await document.fonts.load(fontDecl, currentText()); } catch {}
  return drawCanvas({ text: currentText(), font: `'${f.name}', cursive`, size, ink: state.ink, bg: state.bg, weight: f.weight });
}

// ── Events ───────────────────────────────────────────────────────────────────
function renderAll() {
  if (countEl) countEl.textContent = Array.from(input ? input.value : "").length;
  renderResults();
  if (state.tab === "graphic") renderGraphicFonts();
}

input?.addEventListener("input", renderAll);
$("[data-clear]")?.addEventListener("click", () => { input.value = ""; input.focus(); renderAll(); });

const sizeInput = $("[data-size]");
const sizeOut = $("[data-size-out]");
sizeInput?.addEventListener("input", () => {
  state.size = +sizeInput.value;
  if (sizeOut) sizeOut.textContent = state.size + "px";
  document.documentElement.style.setProperty("--hg-size", state.size + "px");
  if (state.tab === "graphic") renderGraphicFonts();
});

function setTab(tab) {
  state.tab = tab;
  document.querySelectorAll(".hg-tab[data-tab]").forEach((b) => b.setAttribute("aria-selected", b.dataset.tab === tab ? "true" : "false"));
  document.querySelectorAll("[data-panel]").forEach((p) => { p.hidden = p.dataset.panel !== tab; });
  if (tab === "graphic") { loadGraphicFonts(); renderGraphicControls(); renderGraphicFonts(); }
}

document.addEventListener("click", async (e) => {
  const t = e.target.closest("button");
  if (!t) return;
  const d = t.dataset;
  if (d.tab) {
    setTab(d.tab);
    if (t.classList.contains("hg-next-img")) $(".hg-tabs")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (d.decoCat) { state.decoCat = d.decoCat; return renderDecoBar(); }
  if (d.deco !== undefined) { state.deco = d.deco || null; renderDecoBar(); return renderResults(); }
  if (d.styleCat) { state.styleCat = d.styleCat; renderStyleCats(); return renderResults(); }
  if (d.copy) {
    const out = $(`[data-out="${d.copy}"]`);
    if (!out) return;
    try { await navigator.clipboard.writeText(out.textContent); flash(t, `${ICON_COPY}Copied`); showToast("Copied"); }
    catch { showToast("Select and copy the text manually"); }
    showNext(t, d.copy);
    return;
  }
  if (d.png) {
    const out = $(`[data-out="${d.png}"]`);
    if (!out) return;
    const s = STYLES.find((x) => x.key === d.png);
    saveCanvas(drawCanvas({ text: out.textContent, font: "'Segoe UI','SF Pro Display',Arial,sans-serif", size: Math.max(32, state.size * 1.4), ink: "#1a1a1a", bg: "transparent" }), fileName(currentText(), s.name));
    return;
  }
  if (d.gcat) { state.gCat = d.gcat; renderGraphicControls(); return renderGraphicFonts(); }
  if (d.ink) { state.ink = d.ink; renderGraphicControls(); return renderGraphicFonts(); }
  if (d.bg) { state.bg = d.bg; renderGraphicControls(); return renderGraphicFonts(); }
  if (d.gpng) {
    const canvas = await graphicCanvas(d.gpng);
    saveCanvas(canvas, fileName(currentText(), d.gpng));
    flash(t, `${ICON_DL}Saved`);
    return;
  }
  if (d.gcopy) {
    const canvas = await graphicCanvas(d.gcopy);
    try {
      const blob = await new Promise((res) => canvas.toBlob(res, "image/png"));
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      showToast("Image copied");
    } catch { showToast("Your browser can't copy images — use PNG instead"); }
    return;
  }
  if (d.letter) return copyPlain(d.letter, `Copied ${d.letter}`);
  if (d.copyText) return copyPlain(d.copyText);
  if (d.alpha) return setAlpha(d.alpha);
  if (d.copyAll) {
    const grid = $(`[data-letters="${d.copyAll}"]`);
    if (grid) copyPlain(Array.from(grid.querySelectorAll("button")).map((b) => b.textContent).join(""), "Alphabet copied");
  }
});

// ── Alphabet section ─────────────────────────────────────────────────────────
const ALPHA_SETS = { script: "Classic Script", boldScript: "Bold Cursive", sansItalic: "Italic" };
function setAlpha(key) {
  const s = STYLES.find((x) => x.key === key);
  const wrap = $("[data-alpha-wrap]");
  if (!s || !wrap) return;
  document.querySelectorAll("[data-alpha-tabs] [data-alpha]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.alpha === key ? "true" : "false"));
  const grid = (letters) => letters.map((ch) => `<button type="button" data-letter="${ch}" aria-label="Copy ${ch}">${ch}</button>`).join("");
  wrap.innerHTML = [["upper", "Uppercase", s.u], ["lower", "Lowercase", s.l]].map(([id, label, letters]) => `
    <div class="home-card home-alpha">
      <div class="home-alpha-head"><h3>${ALPHA_SETS[key]} — ${label}</h3>
        <button type="button" class="home-copyall" data-copy-all="${id}">${ICON_COPY}Copy all</button></div>
      <div class="home-letters" data-letters="${id}">${grid(letters)}</div>
    </div>`).join("");
}

// ── Init ─────────────────────────────────────────────────────────────────────
renderDecoBar();
renderStyleCats();
renderAll();
})();
