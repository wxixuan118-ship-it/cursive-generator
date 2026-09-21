(function () {
  const primary = [
    ["Generator", "/"],
    ["Fonts", "/cursive-fonts.html"],
    ["Names", "/cursive-name-generator.html"],
    ["Styles", "/aesthetic-fonts.html"],
    ["Themes", "/super-bowl-2027-font-generator.html"],
    ["Blog", "/blog/"]
  ];

  // Retired pages (scripts/retired-pages.txt) are intentionally absent from every list below.
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
    // Styles is a grouped section: the sub-nav shows every group with a label.
    // Its groups reuse the lists above so each family stays defined once.
    styles: { groups: [] },
    themes: [],
    worksheets: [
      ["Printable Sheets", "/printable-cursive-handwriting-practice-sheets.html"],
      ["Practice Sheets", "/cursive-practice-sheets.html"],
      ["Name Tracing", "/cursive-name-tracing-generator.html"],
      ["Name Practice", "/cursive-name-practice-generator.html"],
      ["Alphabet Sheet", "/cursive-alphabet-practice-sheet.html"]
    ],
    alternative: [
      ["Aesthetic Fonts", "/aesthetic-fonts.html"],
      ["Bow Fonts", "/bow-font-generator.html"],
      ["Cute Fonts", "/cute-fonts.html"],
      ["Heart Fonts", "/heart-font-generator.html"]
    ],
    text: [
      ["Bold Fonts", "/bold-font-generator.html"],
      ["Bubble Text", "/bubble-text-generator.html"],
      ["Cool Text", "/cool-text-generator.html"]
    ],
    social: [
      ["Discord Fonts", "/fonts-for-discord.html"],
      ["Adopt Me Fonts", "/adopt-me-font-generator.html"],
      ["Roblox Usernames", "/roblox-username-generator.html"]
    ],
    // Blog posts — newest first. Add a new post here and on /blog/index.html.
    blog: [
      ["All Posts", "/blog/"],
      ["Choosing a Signature Style", "/blog/cursive-signature-styles/"],
      ["Fix Boxes & Question Marks", "/blog/cursive-text-shows-boxes/"],
      ["Unicode Cursive vs Fonts", "/blog/unicode-cursive-vs-cursive-fonts/"],
      ["Cursive Text on Instagram", "/blog/cursive-text-instagram/"]
    ],
    dark: [
      ["Freaky Fonts", "/freaky-font-generator.html"]
    ]
  };

  sections.styles.groups = [
    ["Aesthetic", sections.alternative.filter(([, href]) => href !== "/heart-font-generator.html")],
    ["Text", sections.text],
    ["Social & Gaming", sections.social],
    ["Dark", sections.dark],
    ["Symbols", sections.emoji.filter(([, href]) => href !== "/fancy-text-generator.html" && href !== "/copy-and-paste/")]
  ];
  sections.themes = sections.theme;

  // Nation pages live in the footer only (the six original countries).
  const nationLinks = [
    ["America in Cursive", "/america-in-cursive/"],
    ["United States in Cursive", "/united-states-in-cursive/"],
    ["Canada in Cursive", "/canada-in-cursive/"],
    ["Australia in Cursive", "/australia-in-cursive/"],
    ["England in Cursive", "/england-in-cursive/"],
    ["Ireland in Cursive", "/ireland-in-cursive/"]
  ];

  // Legal / site pages: rendered as a footer column on every page so the
  // policy pages are always one click away (AdSense reviewers look for this).
  const legalLinks = [
    ["Privacy Policy", "/privacy.html"],
    ["Terms of Use", "/terms.html"],
    ["About", "/about.html"],
    ["Contact", "/contact.html"],
    ["Blog", "/blog/"]
  ];

  const path = location.pathname.replace(/\/index\.html$/, "/");
  const inPath = (parts) => parts.some((part) => path.includes(part));
  let current = "generator";
  if (path.startsWith("/letters/") || inPath(["letters", "alphabet", "converter"])) current = "letters";
  if (path.startsWith("/names/") || inPath(["name-generator", "signature-generator", "username-generator"])) current = "names";
  if (path.startsWith("/fonts/") || path.startsWith("/copy-and-paste/") || inPath(["cursive-fonts", "fonts-for-discord", "bold", "compatibility", "copy-and-paste"])) current = "fonts";
  if (path.startsWith("/worksheets/") || inPath(["practice-sheets", "alphabet-practice", "handwriting-practice", "name-tracing", "name-practice"])) current = "worksheets";
  if (inPath(["aesthetic-fonts", "bow-font", "cute-fonts"])) current = "alternative";
  // alternative / dark font tools — add new slugs here as the section grows
  if (inPath(["freaky-font"])) current = "dark";
  // core text-style generators — after "fonts" so bold-font-generator is not caught by its "bold" check
  if (inPath(["bold-font-generator", "bubble-text", "cool-text"])) current = "text";
  // platform / game nickname generators (discord + roblox keep their original sections)
  if (inPath(["adopt-me-font"])) current = "social";
  // emoji / symbol tools — add new slugs here as the section grows
  if (inPath(["heart-font", "rose-font", "diamond-font", "emoji", "symbol"])) current = "emoji";
  // seasonal / event theme tools — add new slugs here as the section grows
  if (inPath(["super-bowl", "stranger-things", "marvel", "harry-potter", "barbie", "theme"])) current = "theme";
  // blog hub + posts — keep after the slug checks so a post slug never lands in a tool section
  if (path === "/blog" || path.startsWith("/blog/")) current = "blog";

  // Which top-bar item lights up for a given section.
  const primaryFor = { generator: "generator", fonts: "fonts", names: "names", letters: "", worksheets: "",
    alternative: "styles", dark: "styles", text: "styles", social: "styles", emoji: "styles", theme: "themes", blog: "blog" }[current];
  const isPrimary = ([label]) => label.toLowerCase() === primaryFor;
  const subnavSource = ["alternative", "dark", "text", "social", "emoji"].includes(current) ? "styles"
    : current === "theme" ? "themes" : current;

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
      ${col("Legal", legalLinks)}
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
