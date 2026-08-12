const alphabets = {
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
  }
};

const input = document.querySelector("[data-input]");
const results = document.querySelector("[data-results]");
const clearButton = document.querySelector("[data-clear]");
const presetSelect = document.querySelector("[data-preset]");
const toast = document.querySelector("[data-toast]");

function convert(text, alphabet) {
  return Array.from(text).map((char) => {
    if (char >= "a" && char <= "z") {
      return Array.from(alphabet.lower)[char.charCodeAt(0) - 97];
    }
    if (char >= "A" && char <= "Z") {
      return Array.from(alphabet.upper)[char.charCodeAt(0) - 65];
    }
    return char;
  }).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1700);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("Copied - paste it anywhere");
  } catch {
    showToast("Select and copy the text");
  }
}

function render() {
  const text = input.value.trim() || input.placeholder;
  const selected = presetSelect.value;
  const entries = selected === "all"
    ? Object.entries(alphabets)
    : Object.entries(alphabets).filter(([key]) => key === selected);

  results.innerHTML = entries.map(([key, alphabet]) => {
    const output = convert(text, alphabet);
    return `
      <article class="result-card">
        <div class="result-top">
          <div class="result-title">${alphabet.name}</div>
          <button class="button copy" type="button" data-copy="${key}" aria-label="Copy ${alphabet.name}">1-Click Copy</button>
        </div>
        <div class="output" data-output="${key}">${output}</div>
      </article>
    `;
  }).join("");
}

input?.addEventListener("input", render);
presetSelect?.addEventListener("change", render);
clearButton?.addEventListener("click", () => {
  input.value = "";
  input.focus();
  render();
});

results?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-copy]");
  if (!button) return;
  const output = results.querySelector(`[data-output="${button.dataset.copy}"]`);
  copyText(output.textContent);
});

render();
