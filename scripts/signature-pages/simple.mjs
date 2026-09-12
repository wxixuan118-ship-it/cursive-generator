import { TOOLS } from './_shared.mjs';

// simple-cursive-signature.html — target: "simple cursive signature".
// Angle: plain text in a cursive alphabet. No frames, at most one punctuation
// mark; lowercase and initial forms for people who want the least possible.
export default {
  key: 'simple',
  file: 'simple-cursive-signature.html',
  label: 'Simple',
  crumb: 'Simple',
  footerLabel: 'Simple Signature',
  title: 'Simple Cursive Signature – Plain Script Styles to Copy',
  description: 'Get a simple cursive signature with no symbols or frames: plain script, lowercase, initials and first-name forms. Copy a clean signature for email or bios.',
  h1: 'Simple Cursive Signature',
  eyebrow: 'Plain · no symbols · {n} styles',
  intro: 'A simple cursive signature is just your name in a cursive alphabet — no stars, no brackets, no hearts. This page strips everything back to the letterforms and the three or four ways people actually write a short signature: full name, first name, lowercase, and initials. Type your name and copy the plainest version that still looks like handwriting.',
  sample: 'Emma Clark',
  names: ['Emma', 'James', 'Grace', 'Henry', 'Claire', 'Owen', 'Anna', 'Lucas', 'Jane', 'Samuel'],
  defaultCat: 'all',
  tabs: [['all', 'All'], ['plain', 'Plain'], ['lowercase', 'Lowercase'], ['initials', 'Initials'], ['marks', 'One Mark']],
  hero: { style: 'script' },
  heroNote: 'Plain Script — the name and nothing else.',
  cardTitle: 'Simple Signature',
  cardNote: 'Plain script, lowercase and initials — nothing added.',
  socialStyle: 'script',
  nameStyle: 'script',
  builderStyles: [['script', 'Cursive Script'], ['boldScript', 'Bold Cursive'], ['italic', 'Italic'], ['sansItalic', 'Sans Italic'], ['monospace', 'Typewriter']],
  symbols: [['— ', '', '—'], ['', '.', '.'], ['∙ ', ' ∙', '∙'], ['→ ', '', '→'], ['~', '~', '~'], ['', ' ✓', '✓']],
  presets: [
    // Plain — the letterforms only
    { cat: 'plain', name: 'Plain Script', pre: '', post: '', style: 'script' },
    { cat: 'plain', name: 'Plain Bold', pre: '', post: '', style: 'boldScript' },
    { cat: 'plain', name: 'Plain Italic', pre: '', post: '', style: 'italic' },
    { cat: 'plain', name: 'Plain Sans Italic', pre: '', post: '', style: 'sansItalic' },
    { cat: 'plain', name: 'Typewriter', pre: '', post: '', style: 'monospace' },
    { cat: 'plain', name: 'Title Case Script', pre: '', post: '', style: 'script', mode: 'capital', unique: true },
    // Lowercase — the way many people actually sign
    { cat: 'lowercase', name: 'Lowercase Script', pre: '', post: '', style: 'script', mode: 'lower', unique: true },
    { cat: 'lowercase', name: 'Lowercase Bold', pre: '', post: '', style: 'boldScript', mode: 'lower', unique: true },
    { cat: 'lowercase', name: 'Lowercase Italic', pre: '', post: '', style: 'italic', mode: 'lower', unique: true },
    { cat: 'lowercase', name: 'Lowercase Sans', pre: '', post: '', style: 'sansItalic', mode: 'lower', unique: true },
    // Initials — shortened forms
    { cat: 'initials', name: 'Initials Only', pre: '', post: '', style: 'boldScript', mode: 'initials', unique: true },
    { cat: 'initials', name: 'First Name + Initial', pre: '', post: '', style: 'boldScript', mode: 'firstInitial', unique: true },
    { cat: 'initials', name: 'Initial + Surname', pre: '', post: '', style: 'script', mode: 'initialLast', unique: true },
    { cat: 'initials', name: 'Italic Initials', pre: '', post: '', style: 'italic', mode: 'initials', unique: true },
    // One Mark — a single piece of punctuation
    { cat: 'marks', name: 'Dash Lead', pre: '— ', post: '', style: 'boldScript' },
    { cat: 'marks', name: 'Tilde Simple', pre: '~', post: '~', style: 'boldScript' },
    { cat: 'marks', name: 'Middle Dot', pre: '∙ ', post: ' ∙', style: 'script' },
    { cat: 'marks', name: 'Arrow Lead', pre: '→ ', post: '', style: 'script' },
    { cat: 'marks', name: 'Full Stop', pre: '', post: '.', style: 'boldScript', unique: true },
    { cat: 'marks', name: 'Checked', pre: '', post: ' ✓', style: 'script', unique: true },
  ],
  socialH2: 'Simple Signature in a Bio, Email or Profile',
  socialP: 'Plain styles keep the most characters free for the rest of your bio. Preview the length in each app.',
  socialBio: {"ig": "Product designer<br>📍 Copenhagen", "tk": "Woodworking, no talking", "dc": "Here for the game nights."},
  namesP: "Short names suit the plain styles. Click one to see it in script, lowercase and initials.",
  browseP: "Simple is the baseline. Every other style page adds something to it — a rule, a frame, a heart, a symbol run — with presets that exist only there.",
  namesH2: 'Simple Cursive Signature Examples by Name',
  keywords: ['simple cursive signature', 'simple signature copy and paste', 'plain cursive signature', 'minimalist signature', 'signature in cursive text', ['elegant cursive signature', '/elegant-cursive-signature.html'], ['cursive signature fonts', '/cursive-signature-fonts.html'], ['cursive name generator', '/cursive-name-generator.html'], 'lowercase cursive signature', 'initials signature'],
  articleH2: 'What Counts as a Simple Cursive Signature',
  articleIntro: [
    'Most signature generators pile on symbols because symbols look like features. This page does the opposite. Every style here is a plain Unicode cursive alphabet applied to your name, with the only variation being <em>which</em> alphabet and <em>how much</em> of the name: full, first name, lowercase, or initials. If you want a rule under the name or a monogram treatment, the <a href="/elegant-cursive-signature.html">elegant signature</a> page adds exactly one detail; if you want frames, the <a href="/fancy-cursive-signature.html">fancy signature</a> page has them.',
    'Plain Script, below, is the simplest cursive signature Unicode can produce. It is also the one that pastes cleanly into the widest range of apps, because there is nothing in it but letters.',
  ],
  sections: [
    {
      h2: 'Simple Signature Styles on This Page',
      paras: [
        '<strong>Plain</strong> is the name in each of five alphabets. Plain Script is the light handwritten one; Plain Bold is the same shapes with more weight and the best support on older phones; Plain Italic and Sans Italic are slanted rather than looped, which some people prefer for a surname; Typewriter is monospaced and reads as a typed name rather than a signed one. Title Case Script fixes capitalisation if you typed in lowercase or all caps.',
        '<strong>Lowercase</strong> mirrors how a lot of people sign informally — <em>emma clark</em> rather than <em>Emma Clark</em>. In the script alphabet, lowercase avoids the wide Unicode capitals entirely and produces a smaller, tighter signature that fits a 30-character name field with room to spare.',
        '<strong>Initials</strong> generates E.C., Emma C. and E. Clark from whatever full name you enter. Initials Only is the shortest signature possible and a common choice for a Discord or Slack display name where the full name is shown elsewhere.',
        '<strong>One Mark</strong> allows a single piece of punctuation — a leading dash, a closing full stop, a tick — for people who want a signature that ends decisively but still does not want a symbol frame.',
      ],
      examples: [
        [{ style: 'script', mode: 'lower' }, 'Lowercase Script — informal, compact'],
        [{ style: 'boldScript', mode: 'initials' }, 'Initials Only — the shortest signature'],
        [{ style: 'monospace' }, 'Typewriter — typed rather than signed'],
        [{ style: 'boldScript', post: '.' }, 'Full Stop — ends with a period'],
      ],
    },
    {
      h2: 'Why a Simple Signature Is the Safest to Paste',
      paras: [
        'Unicode cursive letters come from the <a href="https://www.unicode.org/charts/PDF/U1D400.pdf" rel="noopener" target="_blank">Mathematical Alphanumeric Symbols</a> block, which every current operating system ships glyphs for. Decorative symbols do not have that guarantee — the ornaments used in fancy signatures come from a dozen different blocks with uneven font coverage. A signature made of letters only will render the same on an old Android phone, a smart TV, a Kindle browser or a corporate Windows laptop.',
        'The one exception worth knowing: some form fields and search boxes “normalise” Unicode text back to plain ASCII, and a few platforms (notably some banking and government sites) reject anything outside basic Latin. A simple signature is decorative text for profiles, bios and correspondence, not a replacement for typing your name into a form that asks for it.',
      ],
    },
    {
      h2: 'Where a Simple Cursive Signature Fits',
      paras: [
        '<strong>Email.</strong> Under a sign-off, Plain Script or Plain Italic reads as a signature without looking like a decoration. Because it is text, it survives reply chains and plain-text email clients better than an image signature does.',
        '<strong>Résumés and cover letters.</strong> Google Docs and Word both accept pasted Unicode. A Plain Script name above a typed name at the end of a cover letter gives the impression of a signed letter without embedding an image.',
        '<strong>Social bios.</strong> Lowercase Script is the quiet-aesthetic choice for Instagram, Threads and Pinterest bios. Initials Only works as a Discord or Slack display name.',
        '<strong>Comments and captions.</strong> Signing a caption or a long comment with a Plain Bold first name is a small, readable flourish that does not push the text out of the preview.',
      ],
    },
    {
      h2: 'Simple vs. Elegant vs. Bold',
      paras: [
        'Simple is the baseline: letters, nothing else. Elegant adds one intentional detail — a hairline rule, a monogram layout, spaced letters — and is the better fit for stationery and formal profiles. Bold uses the heaviest alphabets so the name stays legible at avatar size, and adds frames only when they are also heavy. If you are unsure, start here: a simple signature is never the wrong choice, and the other pages are one click away from the browse section below.',
      ],
    },
  ],
  faqs: [
    ['What is the simplest cursive signature I can copy?', 'Plain Script — your name in the Mathematical Script alphabet with no symbols. It is the first result on this page. If you want it even shorter, Initials Only reduces the name to two or three styled letters.'],
    ['Should a cursive signature be lowercase?', 'It is a style choice. Lowercase reads informal and compact and fits tight name fields; Title Case reads more like a formal signature. The Lowercase tab and the Title Case Script preset let you compare both from the same input.'],
    ['Does a simple signature work on old phones?', 'Better than any decorated style. Letters from the Mathematical Alphanumeric block are supported by iOS, Android, Windows and macOS system fonts; it is the decorative symbols in fancier signatures that fall back to boxes on older devices.'],
    ['Can I paste this into a Word or Google Docs signature line?', 'Yes. Paste the copied text into the document; it is Unicode and does not require a font. Note that PDF exporters embed whichever system font renders it, so check the exported file once.'],
    ['Is a simple cursive signature legally valid?', 'No. Contract signatures go through e-sign services that record identity and consent; a Unicode name in a text field records neither, so treat it as decoration only.'],
  ],
  related: [TOOLS.hub, TOOLS.name, TOOLS.home, TOOLS.font, TOOLS.fonts, TOOLS.tracing],
};
