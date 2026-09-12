import { byCat, TOOLS } from './_shared.mjs';

// elegant-cursive-signature.html — target: "elegant cursive signature".
// Angle: restraint. Thin strokes, whitespace, rules and monograms; nothing
// that reads as decoration for its own sake.
export default {
  key: 'elegant',
  file: 'elegant-cursive-signature.html',
  label: 'Elegant',
  crumb: 'Elegant',
  footerLabel: 'Elegant Signature',
  title: 'Elegant Cursive Signature – Refined Script Styles to Copy',
  description: 'Make an elegant cursive signature from your name: thin script, fine italics, monogram initials and ruled signature lines. Copy one for a bio or email sign-off.',
  h1: 'Elegant Cursive Signature',
  eyebrow: 'Refined · understated · {n} styles',
  intro: 'An elegant cursive signature relies on restraint: light script letterforms, a single hairline rule, a spaced monogram. This page keeps the decorative frames off the table and focuses on signatures that look at home under a professional email, on a wedding website or in a minimalist Instagram bio. Type your name below, then copy the version that reads cleanly at small sizes.',
  sample: 'Charlotte Reed',
  names: ['Charlotte', 'Eleanor', 'Genevieve', 'Vivienne', 'Theodore', 'Sebastian', 'Juliette', 'Beatrice', 'Alexander', 'Rosalind'],
  defaultCat: 'all',
  tabs: [['all', 'All'], ['minimal', 'Minimal'], ['lined', 'Ruled'], ['monogram', 'Monogram'], ['italic', 'Italic']],
  hero: { style: 'script', post: ' ─' },
  heroNote: 'Signature Line — light script with a hairline rule, the signature most people mean by “elegant”.',
  cardTitle: 'Elegant Signature',
  cardNote: 'Thin script, ruled lines and monogram initials — no frames.',
  socialStyle: 'script',
  nameStyle: 'script',
  builderStyles: [['script', 'Cursive Script'], ['italic', 'Fine Italic'], ['boldItalic', 'Elegant Bold Italic'], ['sansItalic', 'Light Sans Italic'], ['double', 'Double-Struck'], ['smallCaps', 'Small Caps']],
  symbols: [['— ', '', '—'], ['· ', ' ·', '·'], ['~ ', ' ~', '~'], ['', ' ─', '─'], ['⸻ ', '', '⸻'], ['◦ ', ' ◦', '◦'], ['', ' ✦', '✦']],
  presets: [
    // Minimal — the letterforms carry the whole signature
    { cat: 'minimal', name: 'Cursive Script', pre: '', post: '', style: 'script' },
    { cat: 'minimal', name: 'Fine Italic', pre: '', post: '', style: 'italic' },
    { cat: 'minimal', name: 'Light Sans Italic', pre: '', post: '', style: 'sansItalic' },
    { cat: 'minimal', name: 'Double-Struck', pre: '', post: '', style: 'double' },
    { cat: 'minimal', name: 'Old Style Script', pre: '', post: '', style: 'fraktur' },
    { cat: 'minimal', name: 'Small Caps Signature', pre: '', post: '', style: 'smallCaps' },
    // Ruled — a single line or mark, never a frame
    { cat: 'lined', name: 'Signature Line', pre: '', post: ' ─', style: 'script' },
    { cat: 'lined', name: 'Long Rule', pre: '', post: ' ────', style: 'script', unique: true },
    { cat: 'lined', name: 'Underlined Script', pre: '', post: '', style: 'script', mode: 'underline', unique: true },
    { cat: 'lined', name: 'Em Dash Lead', pre: '— ', post: '', style: 'script' },
    { cat: 'lined', name: 'Dot Accent', pre: '· ', post: ' ·', style: 'script' },
    { cat: 'lined', name: 'Tilde Wrap', pre: '~ ', post: ' ~', style: 'script' },
    { cat: 'lined', name: 'Closing Period', pre: '', post: '.', style: 'italic', unique: true },
    // Monogram — initials and spaced letters
    { cat: 'monogram', name: 'Monogram Initials', pre: '', post: '', style: 'script', mode: 'initials', unique: true },
    { cat: 'monogram', name: 'First Name + Initial', pre: '', post: '', style: 'script', mode: 'firstInitial', unique: true },
    { cat: 'monogram', name: 'Initial + Surname', pre: '', post: '', style: 'italic', mode: 'initialLast', unique: true },
    { cat: 'monogram', name: 'Spaced Letters', pre: '', post: '', style: 'script', mode: 'spaced', unique: true },
    // Italic — slanted but still quiet
    { cat: 'italic', name: 'Elegant Italic', pre: '', post: '', style: 'boldItalic' },
    { cat: 'italic', name: 'Italic Rule', pre: '', post: ' ─', style: 'italic', unique: true },
    { cat: 'italic', name: 'Italic Dash Lead', pre: '— ', post: '', style: 'boldItalic', unique: true },
  ],
  socialH2: 'Elegant Signature in an Instagram Bio, Email or Profile',
  socialP: 'Elegant styles are the ones that survive a small font size. Preview your signature the way it appears in a profile header.',
  socialBio: {"ig": "Interior stylist · Editorial & residential<br>📍 London", "tk": "Slow living, good light<br>New every Sunday", "dc": "Reads more than she posts."},
  namesP: "Longer classic names show off the thin script best — pick one to see it in every elegant style.",
  browseP: "The elegant set stops at one rule or a monogram. The pages below go the other way — frames, weight, hearts, symbols — each with presets that exist only there.",
  namesH2: 'Elegant Cursive Signature Examples by Name',
  keywords: ['elegant cursive signature', 'elegant signature font', 'classy cursive signature', 'thin cursive signature', 'signature in cursive', ['fancy cursive signature', '/fancy-cursive-signature.html'], ['simple cursive signature', '/simple-cursive-signature.html'], ['cursive signature fonts', '/cursive-signature-fonts.html'], 'monogram signature', 'signature line copy and paste'],
  articleH2: 'What Makes a Cursive Signature Look Elegant',
  articleIntro: [
    'Elegance in a signature is mostly about what is left out. The styles on this page use the lightest Unicode script alphabet available (Mathematical Script, the letterforms in 𝒞𝒽𝒶𝓇𝓁ℴ𝓉𝓉ℯ), a fine italic, or small capitals, and then add at most one mark: a rule, a dash, a closing period. Compare that with the <a href="/fancy-cursive-signature.html">fancy signature styles</a>, where the frame is the point — the two pages share almost nothing.',
    'The result below is what most people picture when they search for an elegant cursive signature: light strokes, a name that is still legible, and a single hairline that suggests a signature line without drawing a box around it.',
  ],
  sections: [
    {
      h2: 'Elegant Signature Styles on This Page',
      paras: [
        '<strong>Minimal</strong> signatures are the bare letterforms. Cursive Script is the lightest and the most recognisably “handwritten”; Fine Italic and Light Sans Italic are quieter still and suit surnames and professional contexts; Small Caps gives you a signature that reads as an engraved nameplate rather than handwriting.',
        '<strong>Ruled</strong> signatures add one line. Signature Line and Long Rule place a hairline after the name, the way a printed signature block does. Underlined Script uses a combining underline so every letter sits on its own baseline stroke — it renders on iOS, Android and desktop, but check it in the target app before you commit, because a few chat clients strip combining marks.',
        '<strong>Monogram</strong> styles reshape the text before styling it. Monogram Initials turns “Charlotte Reed” into C.R., First Name + Initial gives Charlotte R., and Initial + Surname gives C. Reed — the three forms used on stationery, email footers and wedding suites. Spaced Letters puts a gap between every character for a wide, engraved feel.',
      ],
      examples: [
        [{ style: 'script', mode: 'initials' }, 'Monogram Initials — the classic stationery form'],
        [{ style: 'script', mode: 'firstInitial' }, 'First Name + Initial — friendly but still formal'],
        [{ style: 'italic', mode: 'initialLast' }, 'Initial + Surname — the business-card form'],
        [{ style: 'script', mode: 'spaced' }, 'Spaced Letters — wide, engraved spacing'],
      ],
    },
    {
      h2: 'Elegant vs. Fancy vs. Simple Cursive Signatures',
      paras: [
        'People use these three words loosely, so it helps to draw the line. A <em>simple</em> signature is plain text in a cursive alphabet with no marks at all — see the <a href="/simple-cursive-signature.html">simple cursive signature</a> page. An <em>elegant</em> signature is simple plus one deliberate detail: a rule, a monogram treatment, a closing period. A <em>fancy</em> signature adds symmetrical decoration on both sides — brackets, stars, ornamental frames — and lives on the <a href="/fancy-cursive-signature.html">fancy signature</a> page.',
        'If you are choosing for a professional email footer, a LinkedIn headline or a wedding website, stay on this page. If the signature is going into a gaming username or a TikTok display name where it competes with emoji, the fancy set will hold up better.',
      ],
    },
    {
      h2: 'Where an Elegant Signature Works Best',
      paras: [
        '<strong>Email sign-offs.</strong> Paste the plain Cursive Script or Fine Italic version of your name on its own line under your closing. Gmail, Outlook and Apple Mail all render Unicode script, and because it is text rather than an image it will not be blocked as an attachment or stripped by a corporate filter.',
        '<strong>Instagram and Threads bios.</strong> The Name field truncates at 30 characters, so a monogram or first-name-only signature is the safest fit. In the Bio field you have room for the Signature Line version with the rule.',
        '<strong>Wedding and event pages.</strong> Two names joined by a thin dash or middle dot in Cursive Script read well as a couple’s signature line on an RSVP page or Notion invite.',
        '<strong>Personal websites and link-in-bio pages.</strong> Linktree, Beacons and Carrd accept Unicode in titles; a Small Caps or Light Sans Italic signature is a good understated header.',
      ],
    },
    {
      h2: 'How to Keep an Elegant Signature Readable',
      paras: [
        'Thin script letterforms lose detail at small sizes, so test the copied result at the size it will actually appear. Names with many round letters (o, a, e) stay legible in Cursive Script; names with several ascenders and descenders (f, g, j, y) often look cleaner in Fine Italic. Avoid all-caps in the script alphabet — Unicode script capitals were designed to appear one at a time, and a run of them looks crowded.',
        'One more practical note: the <a href="https://www.unicode.org/charts/PDF/U1D400.pdf" rel="noopener" target="_blank">Mathematical Script block</a> is missing a handful of letters in the base range, which is why some generators show a mix of weights. This generator maps every letter to a consistent glyph, so the result stays uniform across the whole name.',
      ],
    },
  ],
  faqs: [
    ['What makes a cursive signature look elegant?', 'Light letterforms, consistent slant and very little decoration. The elegant styles here use thin script or italic Unicode alphabets and add at most one detail such as a hairline rule, a monogram treatment or a closing period, so the name itself stays the focus.'],
    ['Should I use my full name, first name or initials?', 'For an email footer or business profile, use your full name or Initial + Surname. For social bios where space is tight, a first name in Cursive Script or a two-letter monogram is cleaner. The Monogram tab generates all three forms from whatever you type.'],
    ['Can I use an elegant cursive signature in Gmail or Outlook?', 'Yes. The signature is Unicode text, so paste it directly into the signature editor in Gmail, Outlook or Apple Mail. It renders on the recipient’s side without any font being installed, though a very old email client may fall back to plain letters.'],
    ['Is this the same as a downloadable elegant signature font?', 'No. These are Unicode characters that look like elegant script and can be pasted anywhere text is allowed. If you need a real font file for a document or logo, see the cursive signature fonts page or download the free CTG Signature Script.'],
    ['Can I sign a contract with this?', 'No. Treat it as letterhead, not a signature block: it dresses up a profile or an email, but it carries no legal weight.'],
  ],
  related: [TOOLS.hub, TOOLS.name, TOOLS.fonts, TOOLS.freeFont, TOOLS.font, TOOLS.writing],
};
