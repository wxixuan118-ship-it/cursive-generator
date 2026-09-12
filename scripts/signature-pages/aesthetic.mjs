import { TOOLS } from './_shared.mjs';

// aesthetic-cursive-signature.html — target: "aesthetic cursive signature".
// Angle: the soft, minimal symbol runs of soft-girl / coquette / Y2K
// profiles — quieter than cute, asymmetric, no emoji.
export default {
  key: 'aesthetic',
  file: 'aesthetic-cursive-signature.html',
  label: 'Aesthetic',
  crumb: 'Aesthetic',
  footerLabel: 'Aesthetic Signature',
  title: 'Aesthetic Cursive Signature – Soft Symbol Styles to Copy',
  description: 'Create an aesthetic cursive signature with soft symbol runs like ˚₊‧ and ⋆｡°✩ — the minimal look of soft-girl, coquette and Y2K bios. Copy for Instagram.',
  h1: 'Aesthetic Cursive Signature',
  eyebrow: 'Soft · minimal · no emoji · {n} styles',
  intro: 'An aesthetic cursive signature is quiet on purpose. Instead of frames or emoji, it uses small runs of dots, degree marks, stars and Japanese punctuation — ˚₊‧, ⋆｡°✩, ೃ⁀➷ — that sit lightly around a script name. This is the signature style of soft-girl, coquette, dark-academia and Y2K profiles on Instagram, Pinterest and Tumblr. Type your name and copy a version that matches your feed.',
  sample: 'Ivy Laurent',
  names: ['Ivy', 'Willow', 'Juniper', 'Sage', 'Wren', 'Margot', 'Iris', 'Elodie', 'Celeste', 'Maeve'],
  defaultCat: 'all',
  tabs: [['all', 'All'], ['soft', 'Soft'], ['stars', 'Stars'], ['minimal', 'Minimal'], ['y2k', 'Y2K'], ['dark', 'Dark Academia']],
  hero: { style: 'script', pre: '˚₊‧ ', post: ' ‧₊˚' },
  heroNote: 'Soft Run — the ˚₊‧ dot pattern that defines the aesthetic signature.',
  cardTitle: 'Aesthetic Signature',
  cardNote: 'Soft symbol runs — ˚₊‧, ⋆｡°✩, ೃ⁀➷ — without emoji.',
  socialStyle: 'script',
  nameStyle: 'script',
  builderStyles: [['script', 'Cursive Script'], ['italic', 'Italic'], ['sansItalic', 'Sans Italic'], ['smallCaps', 'Small Caps'], ['boldScript', 'Bold Cursive']],
  symbols: [['˚₊‧ ', ' ‧₊˚', '˚₊‧'], ['⋆｡°✩ ', ' ✩°｡⋆', '⋆｡°✩'], ['ೃ⁀➷ ', '', 'ೃ⁀➷'], ['⊹ ', ' ⊹', '⊹'], ['☾ ', '', '☾'], ['𓆩 ', ' 𓆪', '𓆩𓆪'], ['— ', '', '—']],
  presets: [
    // Soft — dot and degree runs
    { cat: 'soft', name: 'Soft Run', pre: '˚₊‧ ', post: ' ‧₊˚', style: 'script', unique: true },
    { cat: 'soft', name: 'Dot Cloud', pre: '｡ﾟ☁︎｡ ', post: '', style: 'script', unique: true },
    { cat: 'soft', name: 'Petal Arrow', pre: 'ೃ⁀➷ ', post: '', style: 'script', unique: true },
    { cat: 'soft', name: 'Sparkle Cross', pre: '⊹ ', post: ' ⊹', style: 'script', unique: true },
    { cat: 'soft', name: 'Soft Glow', pre: '·˚ ༘ ', post: ' ˚·', style: 'script' },
    { cat: 'soft', name: 'Degree Wrap', pre: '° ∘ ◦ ', post: ' ◦ ∘ °', style: 'boldScript' },
    { cat: 'soft', name: 'Feather', pre: '', post: ' ࿐', style: 'script', unique: true },
    // Stars — small, not bright
    { cat: 'stars', name: 'Star Wrap', pre: '⋆✦⋆ ', post: ' ⋆✦⋆', style: 'script' },
    { cat: 'stars', name: 'Sparkle Mix', pre: '✧･ﾟ:*✧ ', post: ' ✧*:ﾟ･✧', style: 'script' },
    { cat: 'stars', name: 'Star Dust', pre: '⋆｡°✩ ', post: ' ✩°｡⋆', style: 'script', unique: true },
    { cat: 'stars', name: 'Crescent', pre: '☾ ', post: ' ⋆', style: 'script', unique: true },
    { cat: 'stars', name: 'Four-Point', pre: '✮ ', post: ' ✮', style: 'script', unique: true },
    { cat: 'stars', name: 'Triple Star', pre: '⁂ ', post: ' ⁂', style: 'boldScript' },
    // Minimal — one or two marks
    { cat: 'minimal', name: 'Arrow Wrap', pre: '↠ ', post: ' ↞', style: 'script' },
    { cat: 'minimal', name: 'Chevron', pre: '⊱ ', post: ' ⊰', style: 'boldScript' },
    { cat: 'minimal', name: 'Infinity', pre: '∞ ', post: ' ∞', style: 'boldScript' },
    { cat: 'minimal', name: 'Vertical Bars', pre: '│ ', post: ' │', style: 'sansItalic', unique: true },
    { cat: 'minimal', name: 'Small Caps Dots', pre: '· ', post: ' ·', style: 'smallCaps', unique: true },
    { cat: 'minimal', name: 'Lowercase Soft', pre: '˚ ', post: '', style: 'script', mode: 'lower', unique: true },
    // Y2K — glyph-heavy, slightly chaotic
    { cat: 'y2k', name: 'Y2K Star', pre: '☆⋆｡𖦹°‧ ', post: '', style: 'script', unique: true },
    { cat: 'y2k', name: 'Wings', pre: '𓆩 ', post: ' 𓆪', style: 'boldScript', unique: true },
    { cat: 'y2k', name: 'Flying Star', pre: 'ᯓ★ ', post: '', style: 'script', unique: true },
    { cat: 'y2k', name: 'Hollow Diamond', pre: '⟡ ', post: ' ⟡', style: 'script', unique: true },
    { cat: 'y2k', name: 'Butterfly', pre: 'ೃ ', post: ' ꕥ', style: 'script', unique: true },
    // Dark academia — muted, literary
    { cat: 'dark', name: 'Dagger', pre: '† ', post: ' †', style: 'fraktur', unique: true },
    { cat: 'dark', name: 'Old Script Rule', pre: '', post: ' ─', style: 'fraktur', unique: true },
    { cat: 'dark', name: 'Italic Dots', pre: '· ', post: ' ·', style: 'italic', unique: true },
    { cat: 'dark', name: 'Ampersand Tail', pre: '', post: ' &c.', style: 'italic', unique: true },
    { cat: 'dark', name: 'Fleuron', pre: '❦ ', post: ' ❦', style: 'script', unique: true },
  ],
  socialH2: 'Aesthetic Signature in an Instagram, Pinterest or Tumblr Bio',
  socialP: 'Aesthetic runs are light, so they read best against a clean profile. Preview the signature in a header.',
  socialBio: {"ig": "film & tea · zine coming soon<br>📍 portland", "tk": "thrift hauls, journaling, rain", "dc": "reading · listening · lurking"},
  namesP: "Nature names fit the soft runs. Click one to load it — lowercase works well here too.",
  browseP: "Aesthetic sits between cute and elegant. Go brighter with the cute page, quieter with elegant, or heavier with bold.",
  namesH2: 'Aesthetic Cursive Signature Examples by Name',
  keywords: ['aesthetic cursive signature', 'aesthetic signature copy and paste', 'soft girl signature', 'coquette signature', 'aesthetic name symbols', ['aesthetic fonts', '/aesthetic-fonts.html'], ['cute cursive signature', '/cute-cursive-signature.html'], ['elegant cursive signature', '/elegant-cursive-signature.html'], 'y2k signature', 'dark academia signature'],
  articleH2: 'What Makes a Cursive Signature Aesthetic',
  articleIntro: [
    'The word gets used for everything, but on Instagram and Pinterest “aesthetic” has a specific look: light script, lowercase or small caps, and small asymmetric symbol runs made from degree signs, middle dots, subscript pluses and Japanese punctuation. No emoji, no symmetrical ꧁ ꧂ frames, nothing bold. It is the visual language of soft-girl, coquette, cottagecore and Y2K bios, and it is quieter than the <a href="/cute-cursive-signature.html">cute signature</a> page (which uses emoji and faces) and more decorated than the <a href="/elegant-cursive-signature.html">elegant signature</a> page (which allows only a rule).',
    'Soft Run, below, is the pattern you have most likely seen — ˚₊‧ before the name and its mirror after. The characters are a ring above, a subscript plus and a hyphenation point, none of which were designed for this.',
  ],
  sections: [
    {
      h2: 'Aesthetic Signature Styles on This Page',
      paras: [
        '<strong>Soft</strong> is the core set: Soft Run, the ｡ﾟ☁︎｡ Dot Cloud, the ೃ⁀➷ Petal Arrow that leads into a name, the ⊹ Sparkle Cross, and Feather — a trailing ࿐ Tibetan mark that reads as a flourish. These are the runs most used by soft-girl and coquette accounts.',
        '<strong>Stars</strong> keeps them small and dim: ⋆｡°✩ Star Dust, a crescent ☾ with a single star, the four-point ✮, and the ⁂ asterism. Bright ⭐ emoji stars are deliberately absent.',
        '<strong>Minimal</strong> is for profiles that want one mark only: thin vertical bars around a sans italic name, small caps with middle dots, a lowercase name with a single ring ˚ before it.',
        '<strong>Y2K</strong> is the louder, glyph-heavy variant that came back with the 2000s revival — ☆⋆｡𖦹°‧ runs, the 𓆩 𓆪 Egyptian-hieroglyph wings, the ᯓ★ flying star, and a butterfly-marked name. These use rarer Unicode blocks, so check them on the target device.',
        '<strong>Dark Academia</strong> swaps the light script for old-style Fraktur and italic, and uses literary marks: a † dagger pair, a hairline rule, italic dots, an “&amp;c.” tail and a ❦ fleuron pair.',
      ],
      examples: [
        [{ style: 'script', pre: 'ೃ⁀➷ ', post: '' }, 'Petal Arrow — leads into the name'],
        [{ style: 'script', pre: '⋆｡°✩ ', post: ' ✩°｡⋆' }, 'Star Dust — small, dim stars'],
        [{ style: 'boldScript', pre: '𓆩 ', post: ' 𓆪' }, 'Wings — the Y2K hieroglyph pair'],
        [{ style: 'fraktur', pre: '† ', post: ' †' }, 'Dagger — dark academia'],
      ],
    },
    {
      h2: 'Where the Aesthetic Symbols Come From',
      paras: [
        'Almost none of these characters were designed as decoration (the <a href="https://www.unicode.org/charts/" rel="noopener" target="_blank">Unicode code charts</a> show where each one actually lives). ˚ is a ring above (a Nordic diacritic), ₊ is a subscript plus from the mathematical operators, ‧ is a hyphenation point, ｡ is a half-width Japanese full stop, ೃ is a Kannada vowel sign, ࿐ is a Tibetan ornament, and 𓆩 𓆪 are Egyptian hieroglyphs. They were adopted because they are small, light and available on phones — which also means their support varies.',
        'Everything in the Soft, Stars and Minimal tabs has a glyph in the default fonts of every current phone and desktop OS. The Y2K and Dark Academia tabs reach into rarer blocks (hieroglyphs, the 𖦹 Miao mark, the ᯓ Batak letter) that render on current iPhones and most recent Android phones but can show as boxes on older devices. If your signature will be seen by people you cannot check with, stay in the first three tabs.',
      ],
    },
    {
      h2: 'Aesthetic Signatures for Instagram, Pinterest and Tumblr',
      paras: [
        '<strong>Instagram.</strong> The Name field (30 characters) fits Soft Run or Star Dust around a first name. In the bio, an aesthetic signature works as the first line, with the rest of the bio in lowercase to match. Instagram renders all of the Soft and Stars characters in the profile text colour.',
        '<strong>Pinterest.</strong> Display names show at small sizes in the feed; Petal Arrow, Sparkle Cross and the Minimal styles stay readable. Pinterest boards can also take a signature as a board title.',
        '<strong>Tumblr.</strong> Blog titles and descriptions accept any Unicode, and the Dark Academia set — Dagger, Old Script Rule, Ampersand Tail — was made for the literary Tumblr look.',
        '<strong>Spotify and Discord.</strong> Playlist names and Discord display names both accept these characters. A Lowercase Soft or Crescent signature is a common playlist-title style.',
      ],
    },
    {
      h2: 'Aesthetic vs. Cute vs. Elegant',
      paras: [
        'Aesthetic is muted and asymmetric — small runs, no emoji, often lowercase. Cute is brighter and rounder, with bows, flowers, emoji and kaomoji faces. Elegant is the most restrained of all: plain script and at most one rule or monogram treatment. If your feed is pastel and playful, use the cute page; if it is beige, film-grain or dark academia, this one; if it is a professional or wedding profile, the elegant page. For aesthetic text longer than a name, the <a href="/aesthetic-fonts.html">aesthetic fonts</a> generator handles captions and bios.',
      ],
    },
  ],
  faqs: [
    ['What symbols are used in aesthetic signatures?', 'Mostly small marks borrowed from other scripts: the ring above ˚, subscript plus ₊, hyphenation point ‧, Japanese full stop ｡, degree sign °, small stars ✩ ⋆ ✮, the Kannada vowel sign ೃ and the arrow ➷. Combined into short runs like ˚₊‧ and ⋆｡°✩ they give the soft, minimal look.'],
    ['Why do some aesthetic symbols show as boxes?', 'The Y2K and Dark Academia presets use characters from rarer Unicode blocks — Egyptian hieroglyphs, the Miao and Batak scripts — that older phones do not have glyphs for. The Soft, Stars and Minimal tabs use characters supported on every current OS.'],
    ['Should an aesthetic signature be lowercase?', 'Often, yes — lowercase is part of the look on soft-girl and coquette profiles. The Lowercase Soft preset converts your name automatically; you can also type your name in lowercase and every other preset will keep it that way.'],
    ['Can I use these in my Instagram name and bio?', 'Yes. The Name field accepts Unicode up to 30 characters, and the bio up to 150. Only the @username is restricted to letters, numbers, periods and underscores.'],
    ['Is an aesthetic signature the same as an aesthetic font?', 'The letters come from a Unicode script alphabet and the runs are Unicode symbols, so it is text, not a font — that is what lets it paste into Instagram. For aesthetic styling of longer text, use the aesthetic fonts generator.'],
  ],
  related: [TOOLS.hub, TOOLS.aesthetic, TOOLS.cute, TOOLS.name, TOOLS.fancy, TOOLS.font],
};
