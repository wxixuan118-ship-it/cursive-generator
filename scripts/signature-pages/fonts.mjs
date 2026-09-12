import { TOOLS } from './_shared.mjs';

// cursive-signature-fonts.html — target: "cursive signature font(s)".
// Angle: the alphabets themselves. One preset per Unicode "font" family so
// the same name can be compared across all eleven, plus the real, installable
// signature fonts for documents and logos.
export default {
  key: 'fonts',
  file: 'cursive-signature-fonts.html',
  label: 'Signature Fonts',
  crumb: 'Signature Fonts',
  footerLabel: 'Signature Fonts',
  appName: 'Cursive Signature Font Comparison',
  title: 'Cursive Signature Fonts – Compare 11 Styles & Copy Your Name',
  description: 'Compare all 11 cursive signature fonts side by side — script, bold script, italic, blackletter, double-struck — with your own name, then copy or download.',
  h1: 'Cursive Signature Fonts',
  eyebrow: '11 alphabets · compare with your name',
  intro: 'Every cursive signature generator on the web draws its cursive signature fonts from the same eleven Unicode alphabets. This page lines them up so you can see your own name in each one — Mathematical Script, Bold Script, Italic, Bold Italic, two Sans Italics, Fraktur, Bold Fraktur, Double-Struck, Small Caps and Monospace — and understand what each actually is before you copy it. If you need a font file rather than pasteable text, the second half of the page covers real signature fonts you can install.',
  sample: 'Olivia Bennett',
  names: ['Olivia', 'Benjamin', 'Sophia', 'William', 'Harper', 'Elijah', 'Evelyn', 'Oliver', 'Abigail', 'Daniel'],
  defaultCat: 'all',
  tabs: [['all', 'All 11'], ['script', 'Script'], ['italic', 'Italic'], ['gothic', 'Blackletter'], ['modern', 'Modern'], ['spaced', 'Letter-spaced']],
  hero: { style: 'script' },
  heroNote: 'Mathematical Script (U+1D49C…) — the alphabet behind almost every “cursive font” result online.',
  cardTitle: 'Signature Fonts',
  cardNote: 'All 11 Unicode alphabets side by side, plus real font downloads.',
  builderTitle: 'Combine a Font With a Symbol',
  previewCaption: '“Olivia Bennett” in Mathematical Script and two letter-spaced signature fonts from this page',
  socialStyle: 'boldScript',
  builderStyles: [['script', 'Mathematical Script'], ['boldScript', 'Bold Script'], ['italic', 'Italic'], ['boldItalic', 'Bold Italic'], ['sansItalic', 'Sans-Serif Italic'], ['sansBoldItalic', 'Sans-Serif Bold Italic'], ['fraktur', 'Fraktur'], ['boldFraktur', 'Bold Fraktur'], ['double', 'Double-Struck'], ['smallCaps', 'Small Caps'], ['monospace', 'Monospace']],
  presets: [
    // Script family
    { cat: 'script', name: 'Mathematical Script', pre: '', post: '', style: 'script' },
    { cat: 'script', name: 'Bold Script', pre: '', post: '', style: 'boldScript' },
    // Italic family
    { cat: 'italic', name: 'Italic', pre: '', post: '', style: 'italic' },
    { cat: 'italic', name: 'Bold Italic', pre: '', post: '', style: 'boldItalic' },
    { cat: 'italic', name: 'Sans-Serif Italic', pre: '', post: '', style: 'sansItalic' },
    { cat: 'italic', name: 'Sans-Serif Bold Italic', pre: '', post: '', style: 'sansBoldItalic' },
    // Blackletter
    { cat: 'gothic', name: 'Fraktur', pre: '', post: '', style: 'fraktur' },
    { cat: 'gothic', name: 'Bold Fraktur', pre: '', post: '', style: 'boldFraktur' },
    // Modern / non-cursive companions
    { cat: 'modern', name: 'Double-Struck', pre: '', post: '', style: 'double' },
    { cat: 'modern', name: 'Small Caps', pre: '', post: '', style: 'smallCaps' },
    { cat: 'modern', name: 'Monospace', pre: '', post: '', style: 'monospace' },
    // Letter-spaced variants — a signature-card look for each family
    { cat: 'spaced', name: 'Bold Script, Spaced', pre: '', post: '', style: 'boldScript', mode: 'spaced', unique: true },
    { cat: 'spaced', name: 'Italic, Spaced', pre: '', post: '', style: 'italic', mode: 'spaced', unique: true },
    { cat: 'spaced', name: 'Fraktur, Spaced', pre: '', post: '', style: 'fraktur', mode: 'spaced', unique: true },
    { cat: 'spaced', name: 'Double-Struck, Spaced', pre: '', post: '', style: 'double', mode: 'spaced', unique: true },
    { cat: 'spaced', name: 'Small Caps, Spaced', pre: '', post: '', style: 'smallCaps', mode: 'spaced', unique: true },
  ],
  socialH2: 'How Each Signature Font Renders in a Profile',
  socialP: 'Apps use their own font stacks, so the same alphabet can look different between Instagram and Discord. Preview before you commit.',
  socialBio: {"ig": "Brand designer · Type nerd<br>📍 Toronto", "tk": "Lettering process videos", "dc": "Font questions welcome"},
  namesP: "Click a name to compare it across all eleven alphabets at once.",
  browseP: "This page compares the alphabets themselves. The style pages combine them with frames, rules, hearts and symbol runs — each with presets found nowhere else.",
  namesH2: 'Signature Font Examples by Name',
  keywords: ['cursive signature font', 'cursive signature fonts', 'signature font copy and paste', 'best font for signature', 'signature font generator', ['free signature font download', '/free-fonts/ctg-signature-script.html'], ['cursive fonts', '/cursive-fonts.html'], ['elegant cursive signature', '/elegant-cursive-signature.html'], 'unicode cursive alphabet', 'handwriting signature font'],
  articleH2: 'The 11 Cursive Signature Fonts, Explained',
  articleIntro: [
    'Strictly speaking, none of these are fonts. They are separate Unicode alphabets — mostly from the <a href="https://www.unicode.org/charts/PDF/U1D400.pdf" rel="noopener" target="_blank">Mathematical Alphanumeric Symbols</a> block (U+1D400–U+1D7FF), added so that mathematicians could write 𝒜 and 𝐴 and 𝔄 as distinct symbols. Because each letter is its own character, the styling travels with the text: paste 𝓞𝓵𝓲𝓿𝓲𝓪 into Instagram and it stays bold script, where a real font would revert to plain letters. That is the whole trick behind every <a href="/copy-and-paste-cursive-signature.html">cursive signature generator</a>, including this one.',
    'Below is the alphabet most people mean by “cursive font”: Mathematical Script. The sections that follow describe each family, what it was designed for, and where it renders well.',
  ],
  sections: [
    {
      h2: 'Script Fonts: Mathematical Script and Bold Script',
      paras: [
        '<strong>Mathematical Script</strong> (U+1D49C–U+1D4CF, with a few letters like ℬ, ℯ and ℴ borrowed from the older Letterlike Symbols block) is the light, looped alphabet that looks most like handwriting. It is the default in most generators and the right choice for an <a href="/elegant-cursive-signature.html">elegant signature</a>. Its weakness is size: strokes are thin and disappear at avatar scale.',
        '<strong>Bold Script</strong> (U+1D4D0–U+1D503) is the same design with heavier strokes. It is the best-supported cursive alphabet on older Android phones — the light script is missing letters from some system fonts, while the bold set is complete — which is why it is the fallback we recommend everywhere and the backbone of the <a href="/bold-cursive-signature.html">bold signature</a> page.',
      ],
      examples: [
        [{ style: 'script' }, 'Mathematical Script — light, looped'],
        [{ style: 'boldScript' }, 'Bold Script — heavy, best supported'],
      ],
    },
    {
      h2: 'Italic Fonts: Serif and Sans-Serif',
      paras: [
        '<strong>Italic</strong> (U+1D434–U+1D467) and <strong>Bold Italic</strong> (U+1D468–U+1D49B) are slanted serif letters — closer to a typeset italic than to handwriting, which makes them a good fit for surnames, formal sign-offs and anything that should look printed rather than signed. Note that the lowercase italic <em>h</em> is ℎ (U+210E, the Planck constant) from Letterlike Symbols; every generator handles that quietly.',
        '<strong>Sans-Serif Italic</strong> (U+1D608–U+1D63B) and <strong>Sans-Serif Bold Italic</strong> (U+1D63C–U+1D66F) drop the serifs for a modern, sporty slant. They are the italics that match Instagram’s and Discord’s own UI fonts most closely, so a signature in them looks native rather than pasted in.',
      ],
      examples: [
        [{ style: 'italic' }, 'Italic — typeset serif slant'],
        [{ style: 'sansBoldItalic' }, 'Sans-Serif Bold Italic — modern, sporty'],
      ],
    },
    {
      h2: 'Blackletter Fonts: Fraktur and Bold Fraktur',
      paras: [
        '<strong>Fraktur</strong> (U+1D504–U+1D537, with ℭ ℌ ℑ ℜ ℨ from Letterlike Symbols) and <strong>Bold Fraktur</strong> (U+1D56C–U+1D59F) are the “old English” or gothic alphabets. They are not cursive in the joined-up sense, but they are the standard choice for a tattoo-style, medieval or metal signature, and Bold Fraktur is legible at small sizes where the regular weight is not. The <a href="/gothic-font-generator.html">gothic font generator</a> covers blackletter for longer text.',
      ],
      examples: [
        [{ style: 'fraktur' }, 'Fraktur — old English'],
        [{ style: 'boldFraktur' }, 'Bold Fraktur — tattoo weight'],
      ],
    },
    {
      h2: 'Modern Companions: Double-Struck, Small Caps and Monospace',
      paras: [
        '<strong>Double-Struck</strong> (U+1D538–U+1D56B, with ℂ ℍ ℕ ℙ ℚ ℝ ℤ from Letterlike Symbols) is the outlined “blackboard bold” alphabet. It is not cursive, but it is one of the most popular signature styles on YouTube and TikTok because the hollow strokes read as bold without being heavy.',
        '<strong>Small Caps</strong> is assembled from the IPA and Phonetic Extensions blocks (ᴀ ʙ ᴄ…), which is why it has no separate uppercase and why a few letters (ǫ, ꜰ, ꜱ) come from different blocks than the rest. It gives an engraved, nameplate look and is the quietest option on the page.',
        '<strong>Monospace</strong> (U+1D670–U+1D6A3) is the typewriter alphabet — fixed width, no slant. Include it when a “signature” should read as typed, such as a plain-text email footer or a code-adjacent profile.',
      ],
      examples: [
        [{ style: 'double' }, 'Double-Struck — outlined, hollow'],
        [{ style: 'smallCaps' }, 'Small Caps — engraved nameplate'],
      ],
    },
    {
      h2: 'Unicode Fonts vs. Real Signature Fonts',
      paras: [
        'The alphabets above are for places where you cannot install a font: social bios, usernames, chat apps, comments. They have two limits. First, they only cover A–Z — no accents, so <em>José</em> becomes 𝓙𝓸𝓼é with a plain é. Second, they are read literally by screen readers and search (𝓞𝓵𝓲𝓿𝓲𝓪 is not searchable as “Olivia”), so they belong in display fields, not in anything that needs to be found or read aloud.',
        'For a document, a logo, a wax-seal graphic or an email signature image, you want a real OpenType font. The site publishes one for free: <a href="/free-fonts/ctg-signature-script.html">CTG Signature Script</a>, a script face designed for names and sign-offs, available as OTF, TTF and WOFF2 under the SIL Open Font License, so personal and commercial use are both allowed. The <a href="/cursive-fonts.html">cursive fonts</a> page lists further downloadable options and explains how to install them on Windows, macOS and iOS.',
      ],
      list: [
        '<strong>Need it in a bio, username or chat?</strong> Use the Unicode alphabets above — copy and paste, nothing to install.',
        '<strong>Need it in a document, PDF, logo or image?</strong> Download a real font such as CTG Signature Script and type your name in Word, Canva or Figma.',
        '<strong>Need it to be legally binding?</strong> Neither. Use a dedicated e-signature service; both of these are decorative.',
      ],
    },
  ],
  faqs: [
    ['What is the best font for a cursive signature?', 'For pasteable text, Bold Script is the safest all-round choice — it is fully supported on every current phone and stays readable at small sizes. Mathematical Script is lighter and more elegant but thin at avatar scale. For a document or logo, use an installable script font such as CTG Signature Script.'],
    ['Are these real fonts I can download?', 'No. The eleven styles on this page are Unicode alphabets — each letter is a separate character, which is what lets the styling survive pasting into apps that do not allow fonts. Real, downloadable signature fonts are covered in the last section and on the cursive fonts page.'],
    ['Why is one letter a different weight or style in my signature?', 'Some Mathematical Script letters (B, E, F, H, I, L, M, R, e, g, o) were encoded earlier in the Letterlike Symbols block, and a few system fonts draw those from a different typeface. The build here picks one code point per letter so the input is consistent, but the receiving app’s font decides what is drawn. Bold Script avoids the problem entirely because its whole alphabet lives in one block.'],
    ['Do these fonts support accents like é or ñ?', 'No. The Unicode alphabets cover only A–Z, so accented letters are passed through unchanged. A real font file handles accents properly, which is another reason to use one for documents.'],
    ['Can I use a Unicode signature font in Word or Google Docs?', 'Yes, you can paste it in and it will display. But for documents it is better to install a real font — it supports accents, prints reliably and is searchable — and the free CTG Signature Script exists for exactly that.'],
  ],
  related: [TOOLS.freeFont, TOOLS.fonts, TOOLS.hub, TOOLS.font, TOOLS.gothic, TOOLS.home],
};
