(function () {
  const primary = [
    ["Generator", "/"],
    ["Letters", "/cursive-letters-generator.html"],
    ["Names", "/cursive-name-generator.html"],
    ["Fonts", "/cursive-fonts.html"],
    ["Worksheets", "/cursive-practice-sheets.html"],
    ["Emoji", "/heart-font-generator.html"],
    ["Theme", "/super-bowl-2027-font-generator.html"]
  ];

  const sections = {
    generator: [
      ["Cursive Text", "/"],
      ["Writing Generator", "/cursive-writing-generator.html"],
      ["Font Generator", "/cursive-font-generator.html"],
      ["Fancy Text", "/fancy-text-generator.html"],
      ["Calligraphy", "/calligraphy-text-generator.html"]
    ],
    letters: [
      ["Letters Generator", "/cursive-letters-generator.html"],
      ["Letters A–Z", "/cursive-letters-a-z.html"],
      ["Converter", "/cursive-converter.html"]
    ],
    names: [
      ["Name Generator", "/cursive-name-generator.html"],
      ["Signature Generator", "/copy-and-paste-cursive-signature.html"],
      ["Name Tracing", "/cursive-name-tracing-generator.html"],
      ["Name Practice", "/cursive-name-practice-generator.html"]
    ],
    fonts: [
      ["Cursive Fonts", "/cursive-fonts.html"],
      ["Copy & Paste", "/copy-and-paste/"],
      ["Bold Cursive", "/cursive-bold-generator.html"],
      ["Discord Fonts", "/fonts-for-discord.html"]
    ],
    emoji: [
      ["Heart Fonts", "/heart-font-generator.html"],
      ["Rose Fonts", "/rose-font-generator.html"],
      ["Diamond Fonts", "/diamond-font-generator.html"],
      ["Fancy Text", "/fancy-text-generator.html"],
      ["Copy & Paste", "/copy-and-paste/"]
    ],
    theme: [
      ["Super Bowl 2027", "/super-bowl-2027-font-generator.html"],
      ["Stranger Things", "/stranger-things-font-generator.html"],
      ["Marvel", "/marvel-font-generator.html"],
      ["Harry Potter", "/harry-potter-font-generator.html"],
      ["Barbie", "/barbie-font-generator.html"]
    ],
    worksheets: [
      ["Practice Sheets", "/cursive-practice-sheets.html"],
      ["Name Tracing", "/cursive-name-tracing-generator.html"],
      ["Name Practice", "/cursive-name-practice-generator.html"],
    ]
  };

  const path = location.pathname.replace(/\/index\.html$/, "/");
  const inPath = (parts) => parts.some((part) => path.includes(part));
  let current = "generator";
  if (path.startsWith("/letters/") || inPath(["letters", "alphabet", "converter"])) current = "letters";
  if (path.startsWith("/names/") || inPath(["name-generator", "signature-generator"])) current = "names";
  if (path.startsWith("/fonts/") || path.startsWith("/copy-and-paste/") || inPath(["cursive-fonts", "fonts-for-discord", "bold", "compatibility", "copy-and-paste"])) current = "fonts";
  if (path.startsWith("/worksheets/") || inPath(["practice-sheets", "name-tracing", "name-practice"])) current = "worksheets";
  // emoji / symbol tools — add new slugs here as the section grows
  if (inPath(["heart-font", "rose-font", "diamond-font", "emoji", "symbol"])) current = "emoji";
  // seasonal / event theme tools — add new slugs here as the section grows
  if (inPath(["super-bowl", "stranger-things", "marvel", "harry-potter", "barbie", "theme"])) current = "theme";

  const link = ([label, href], active) =>
    `<a href="${href}"${active ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  const isExact = (href) => href === "/" ? path === "/" : path === href || path === href.replace(/\.html$/, "/");

  const header = document.querySelector(".site-header");
  if (!header) return;

  header.innerHTML = `
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="/"><span class="brand-mark">C</span><span>Cursive Generator</span></a>
      <div class="nav-links nav-primary-links">
        ${primary.map((item) => link(item, item[0].toLowerCase() === current)).join("")}
      </div>
      <button class="nav-burger" aria-label="Open menu" aria-expanded="false" onclick="toggleNav(this)"><span></span><span></span><span></span></button>
    </nav>
    <nav class="subnav" aria-label="${current[0].toUpperCase() + current.slice(1)} tools">
      <div class="subnav-inner">${sections[current].map((item) => link(item, isExact(item[1]))).join("")}</div>
    </nav>`;

  const oldDrawer = document.querySelector("#nav-drawer");
  if (oldDrawer) {
    oldDrawer.innerHTML = `
      <div class="nav-mobile-section">
        <div class="nav-mobile-label">Explore</div>
        ${primary.map((item) => link(item, item[0].toLowerCase() === current)).join("")}
      </div>
      <div class="nav-mobile-section">
        <div class="nav-mobile-label">${current[0].toUpperCase() + current.slice(1)} tools</div>
        ${sections[current].map((item) => link(item, isExact(item[1]))).join("")}
      </div>`;
  }

  window.toggleNav = function (button) {
    const drawer = document.querySelector("#nav-drawer");
    if (!drawer) return;
    const open = drawer.classList.toggle("open");
    button.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
})();
