(function () {
  const primary = [
    ["Generator", "/"],
    ["Fonts", "/cursive-fonts.html"],
    ["Names", "/cursive-name-generator.html"],
    ["Styles", "/aesthetic-fonts.html"],
    ["Themes", "/super-bowl-2027-font-generator.html"],
    ["Blog", "/blog/"]
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
      ["Name Practice", "/cursive-name-practice-generator.html"],
      ["Roblox Usernames", "/roblox-username-generator.html"],
      ["Aesthetic Usernames", "/aesthetic-username-generator.html"]
    ],
    fonts: [
      ["Cursive Fonts", "/cursive-fonts.html"],
      ["Copy & Paste", "/copy-and-paste/"],
      ["Bold Cursive", "/cursive-bold-generator.html"],
      ["Discord Fonts", "/fonts-for-discord.html"]
    ],
    emoji: [
      ["Aesthetic Symbols", "/aesthetic-symbols.html"],
      ["Invisible Text", "/invisible-text-generator.html"],
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
    pixel: [
      ["Mario Fonts", "/mario-font-generator.html"],
      ["Undertale Fonts", "/undertale-font-generator.html"],
      ["Glitch Text", "/glitch-text-generator.html"],
      ["Fancy Text", "/fancy-text-generator.html"]
    ],
    lettering: [
      ["Tattoo Fonts", "/tattoo-font-generator.html"],
      ["Chicano Lettering", "/chicano-font-generator.html"],
      ["Gangster Fonts", "/gangster-font-generator.html"],
      ["Old English", "/old-english-font-generator.html"],
      ["College Block", "/college-block-font-generator.html"],
      ["Varsity Fonts", "/varsity-font-generator.html"]
    ],
    // Styles is a grouped section: the sub-nav shows every group with a label.
    // Its groups reuse the lists above so each family stays defined once.
    styles: { groups: [] },
    themes: [],
    worksheets: [
      ["Practice Sheets", "/cursive-practice-sheets.html"],
      ["Name Tracing", "/cursive-name-tracing-generator.html"],
      ["Name Practice", "/cursive-name-practice-generator.html"],
      ["Alphabet Sheet", "/cursive-alphabet-practice-sheet.html"],
    ],
    alternative: [
      ["Aesthetic Fonts", "/aesthetic-fonts.html"],
      ["Preppy Fonts", "/preppy-fonts.html"],
      ["Bow Fonts", "/bow-font-generator.html"],
      ["Coquette Fonts", "/coquette-font-generator.html"],
      ["Cute Fonts", "/cute-fonts.html"],
      ["Girly Fonts", "/girly-fonts.html"],
      ["Heart Fonts", "/heart-font-generator.html"]
    ],
    text: [
      ["Bold Fonts", "/bold-font-generator.html"],
      ["Italic Fonts", "/italic-font-generator.html"],
      ["Small Text", "/small-text-generator.html"],
      ["Bubble Text", "/bubble-text-generator.html"],
      ["Strikethrough", "/strikethrough-text-generator.html"],
      ["Upside Down", "/upside-down-text-generator.html"],
      ["Cool Text", "/cool-text-generator.html"],
      ["Stylish Text", "/stylish-text-generator.html"],
      ["Monospace", "/monospace-text-generator.html"],
      ["Wide Text", "/wide-text-generator.html"]
    ],
    social: [
      ["Instagram Fonts", "/instagram-font-generator.html"],
      ["Discord Fonts", "/fonts-for-discord.html"],
      ["Free Fire Fonts", "/free-fire-font-generator.html"],
      ["Adopt Me Fonts", "/adopt-me-font-generator.html"],
      ["Roblox Usernames", "/roblox-username-generator.html"]
    ],
    // Blog posts — newest first. Add a new post here and on /blog/index.html.
    blog: [
      ["All Posts", "/blog/"],
      ["Cursive Text on Instagram", "/blog/cursive-text-instagram/"],
      ["Unicode Cursive vs Fonts", "/blog/unicode-cursive-vs-cursive-fonts/"],
      ["Fix Boxes & Question Marks", "/blog/cursive-text-shows-boxes/"]
    ],
    dark: [
      ["Gothic Fonts", "/gothic-font-generator.html"],
      ["Glitch Text", "/glitch-text-generator.html"],
      ["Scary Fonts", "/scary-font-generator.html"],
      ["Creepy Fonts", "/creepy-font-generator.html"],
      ["Freaky Fonts", "/freaky-font-generator.html"],
      ["Weird Fonts", "/weird-font-generator.html"]
    ]
  };

  sections.styles.groups = [
    ["Aesthetic", sections.alternative.filter(([, href]) => href !== "/heart-font-generator.html")],
    ["Text", sections.text],
    ["Social & Gaming", sections.social],
    ["Dark", sections.dark],
    ["Lettering", sections.lettering],
    ["Symbols", sections.emoji.filter(([, href]) => href !== "/fancy-text-generator.html" && href !== "/copy-and-paste/")]
  ];
  sections.themes = sections.theme.concat(sections.pixel.filter(([, href]) => href.includes("mario") || href.includes("undertale")));

  // Nation pages live in the footer only (hub + the six original countries).
  const nationLinks = [
    ["All Nations", "/nation-in-cursive/"],
    ["America in Cursive", "/america-in-cursive/"],
    ["United States in Cursive", "/united-states-in-cursive/"],
    ["Canada in Cursive", "/canada-in-cursive/"],
    ["Australia in Cursive", "/australia-in-cursive/"],
    ["England in Cursive", "/england-in-cursive/"],
    ["Ireland in Cursive", "/ireland-in-cursive/"]
  ];

  const path = location.pathname.replace(/\/index\.html$/, "/");
  const inPath = (parts) => parts.some((part) => path.includes(part));
  let current = "generator";
  if (path.startsWith("/letters/") || inPath(["letters", "alphabet", "converter"])) current = "letters";
  if (path.startsWith("/names/") || inPath(["name-generator", "signature-generator", "username-generator"])) current = "names";
  if (path.startsWith("/fonts/") || path.startsWith("/copy-and-paste/") || inPath(["cursive-fonts", "fonts-for-discord", "bold", "compatibility", "copy-and-paste"])) current = "fonts";
  if (path.startsWith("/worksheets/") || inPath(["practice-sheets", "alphabet-practice", "name-tracing", "name-practice"])) current = "worksheets";
  if (inPath(["aesthetic-fonts", "preppy-fonts", "bow-font", "coquette-font", "cute-fonts", "girly-fonts"])) current = "alternative";
  // alternative / dark font tools — add new slugs here as the section grows
  if (inPath(["freaky-font", "creepy-font", "weird-font", "glitch-text", "scary-font", "gothic-font"])) current = "dark";
  // core text-style generators — after "fonts" so bold-font-generator is not caught by its "bold" check
  if (inPath(["bold-font-generator", "italic-font", "small-text", "bubble-text", "strikethrough-text", "upside-down-text", "cool-text", "stylish-text", "monospace-text", "wide-text"])) current = "text";
  // platform / game nickname generators (discord + roblox keep their original sections)
  if (inPath(["instagram-font", "free-fire-font", "adopt-me-font"])) current = "social";
  // emoji / symbol tools — add new slugs here as the section grows
  if (inPath(["heart-font", "rose-font", "diamond-font", "emoji", "symbol", "invisible-text"])) current = "emoji";
  // seasonal / event theme tools — add new slugs here as the section grows
  if (inPath(["super-bowl", "stranger-things", "marvel", "harry-potter", "barbie", "theme"])) current = "theme";
  // lettering-style generators — keep LAST so these slugs win over the checks above
  if (inPath(["chicano-font", "tattoo-font", "gangster-font", "old-english-font", "college-block-font", "varsity-font"])) current = "lettering";
  // pixel / retro-game renderer pages — add new slugs here as the section grows
  if (inPath(["mario-font", "undertale-font"])) current = "pixel";
  // blog hub + posts — keep after the slug checks so a post slug never lands in a tool section
  if (path === "/blog" || path.startsWith("/blog/")) current = "blog";

  // Which top-bar item lights up for a given section.
  const primaryFor = { generator: "generator", fonts: "fonts", names: "names", letters: "", worksheets: "",
    alternative: "styles", dark: "styles", text: "styles", social: "styles", lettering: "styles", emoji: "styles", theme: "themes", pixel: "themes", blog: "blog" }[current];
  const isPrimary = ([label]) => label.toLowerCase() === primaryFor;
  const subnavSource = ["alternative", "dark", "text", "social", "lettering", "emoji"].includes(current) ? "styles"
    : ["theme", "pixel"].includes(current) ? "themes" : current;

  const link = ([label, href], active) =>
    `<a href="${href}"${active ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  const isExact = (href) => href === "/" ? path === "/" : path === href || path === href.replace(/\.html$/, "/");

  const header = document.querySelector(".site-header");
  if (!header) return;

  const renderSubnav = (key) => {
    const sec = sections[key];
    if (sec.groups) {
      return `<div class="subnav-inner subnav-grouped">${sec.groups.map(([label, items]) =>
        `<span class="subnav-group"><b class="subnav-group-label">${label}</b>${items.map((item) => link(item, isExact(item[1]))).join("")}</span>`).join("")}</div>`;
    }
    return `<div class="subnav-inner">${sec.map((item) => link(item, isExact(item[1]))).join("")}</div>`;
  };
  const sectionTitle = (key) => key[0].toUpperCase() + key.slice(1);
  // "Blog tools" reads wrong; the blog sub-nav lists posts.
  const sectionLabel = (key) => key === "blog" ? "Blog posts" : sectionTitle(key) + " tools";

  header.innerHTML = `
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="/"><span class="brand-mark">C</span><span>Cursive Generator</span></a>
      <div class="nav-links nav-primary-links">
        ${primary.map((item) => link(item, isPrimary(item))).join("")}
      </div>
      <button class="nav-burger" aria-label="Open menu" aria-expanded="false" onclick="toggleNav(this)"><span></span><span></span><span></span></button>
    </nav>
    <nav class="subnav" aria-label="${sectionLabel(subnavSource)}">
      ${renderSubnav(subnavSource)}
    </nav>`;

  const oldDrawer = document.querySelector("#nav-drawer");
  if (oldDrawer) {
    const flat = (key) => sections[key].groups
      ? sections[key].groups.flatMap(([, items]) => items) : sections[key];
    const drawerSection = (label, items) => `
      <div class="nav-mobile-section">
        <div class="nav-mobile-label">${label}</div>
        ${items.map((item) => link(item, isExact(item[1]))).join("")}
      </div>`;
    oldDrawer.innerHTML = `
      <div class="nav-mobile-section">
        <div class="nav-mobile-label">Explore</div>
        ${primary.map((item) => link(item, isPrimary(item))).join("")}
      </div>
      ${drawerSection(sectionLabel(subnavSource), flat(subnavSource))}
      ${drawerSection("Learn & practice", sections.letters.concat(sections.worksheets))}
      ${drawerSection("Nation in Cursive", nationLinks)}`;
  }

  // Footer nav: the sections that moved out of the top bar. Rendered above
  // each page's own footer columns so every page carries the same links.
  const footer = document.querySelector(".site-footer");
  if (footer && !footer.querySelector(".footer-nav")) {
    const col = (label, items) => `
      <div class="footer-col">
        <strong class="footer-col-title">${label}</strong>
        ${items.map((item) => link(item, isExact(item[1]))).join("")}
      </div>`;
    const nav = document.createElement("nav");
    nav.className = "footer-nav";
    nav.setAttribute("aria-label", "Learn and practice");
    nav.innerHTML = `<div class="footer-nav-inner">
      ${col("Letters", sections.letters)}
      ${col("Worksheets", sections.worksheets)}
      ${col("Nation in Cursive", nationLinks)}
      ${col("Blog", sections.blog)}
    </div>`;
    footer.insertBefore(nav, footer.firstChild);
  }

  const closeDrawer = () => {
    const drawer = document.querySelector("#nav-drawer");
    if (!drawer) return;
    drawer.classList.remove("open");
    const burger = document.querySelector(".nav-burger");
    if (burger) {
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
    document.body.style.overflow = "";
  };

  // This module rebuilds #nav-drawer above, which discards any listener a page
  // bound to the original links — so the close-on-navigate handler belongs here.
  if (oldDrawer) {
    oldDrawer.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeDrawer();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });

  window.toggleNav = function (button) {
    const drawer = document.querySelector("#nav-drawer");
    if (!drawer) return;
    const open = drawer.classList.toggle("open");
    button.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
})();
