import { TOOLS } from './_shared.mjs';

// cute-cursive-signature.html — target: "cute cursive signature".
// Angle: kawaii. Bows, flowers, sparkles and kaomoji faces around a light
// script name — TikTok, WhatsApp and Pinterest bios.
export default {
  key: 'cute',
  file: 'cute-cursive-signature.html',
  label: 'Cute',
  crumb: 'Cute',
  footerLabel: 'Cute Signature',
  title: 'Cute Cursive Signature – Kawaii Styles with Bows & Flowers',
  description: 'Make a cute cursive signature with bows, flowers, sparkles, clouds and kaomoji faces around your name. Copy a kawaii signature for TikTok or Instagram.',
  h1: 'Cute Cursive Signature',
  eyebrow: 'Kawaii · soft · {n} styles',
  intro: 'A cute cursive signature pairs a light script name with the small, friendly symbols that define the kawaii look — bows, daisies, clouds, sparkle drips and the occasional bear face. This page has the widest symbol range on the site and skips anything heavy or formal. Type your name, try a few, and copy the one that matches your profile’s mood.',
  sample: 'Lily Mae',
  names: ['Lily', 'Chloe', 'Zoe', 'Hazel', 'Poppy', 'Ruby', 'Daisy', 'Ivy', 'Luna', 'Rosie'],
  defaultCat: 'all',
  tabs: [['all', 'All'], ['kawaii', 'Kawaii'], ['flowers', 'Flowers'], ['sparkles', 'Sparkles'], ['faces', 'Faces']],
  hero: { style: 'script', pre: 'ʚ ', post: ' ɞ' },
  heroNote: 'Bunny Wings — the ʚ ɞ pair that started the cute-signature trend.',
  cardTitle: 'Cute Signature',
  cardNote: 'Bows, flowers, sparkle drips and kaomoji faces.',
  socialStyle: 'script',
  nameStyle: 'script',
  builderStyles: [['script', 'Cursive Script'], ['boldScript', 'Bold Cursive'], ['italic', 'Italic'], ['double', 'Double-Struck']],
  symbols: [['ʚ ', ' ɞ', 'ʚɞ'], ['🎀 ', ' 🎀', '🎀'], ['✿ ', ' ✿', '✿'], ['☁ ', ' ☁', '☁'], ['˚₊· ', ' ·₊˚', '˚₊·'], ['🌸 ', ' 🌸', '🌸'], ['ʕ•ᴥ•ʔ ', '', 'ʕ•ᴥ•ʔ']],
  presets: [
    // Kawaii — the classic soft symbol pairs
    { cat: 'kawaii', name: 'Bunny Wings', pre: 'ʚ ', post: ' ɞ', style: 'script' },
    { cat: 'kawaii', name: 'Kawaii', pre: 'ﾟ+｡ ', post: ' ｡+ﾟ', style: 'boldScript' },
    { cat: 'kawaii', name: 'Soft Glow', pre: '·˚ ༘ ', post: ' ˚·', style: 'script' },
    { cat: 'kawaii', name: 'Bow', pre: '🎀 ', post: ' 🎀', style: 'script', unique: true },
    { cat: 'kawaii', name: 'Cloud', pre: '☁ ', post: ' ☁', style: 'script', unique: true },
    { cat: 'kawaii', name: 'Ribbon Heart', pre: 'ʚ♡ɞ ', post: '', style: 'script', unique: true },
    { cat: 'kawaii', name: 'Wave', pre: '彡 ', post: ' 彡', style: 'script' },
    // Flowers
    { cat: 'flowers', name: 'Flower', pre: '✿ ', post: ' ✿', style: 'boldScript' },
    { cat: 'flowers', name: 'Cherry Blossom', pre: '🌸 ', post: ' 🌸', style: 'script' },
    { cat: 'flowers', name: 'Daisy', pre: '❀ ', post: ' ❀', style: 'script', unique: true },
    { cat: 'flowers', name: 'Tulip', pre: '🌷 ', post: '', style: 'script', unique: true },
    { cat: 'flowers', name: 'Sunflower', pre: '🌻 ', post: ' 🌻', style: 'boldScript', unique: true },
    { cat: 'flowers', name: 'Clover', pre: '', post: ' 🍀', style: 'script', unique: true },
    { cat: 'flowers', name: 'Petal Trail', pre: '❀·˚ ', post: ' ˚·❀', style: 'script', unique: true },
    // Sparkles
    { cat: 'sparkles', name: 'Sparkle Drip', pre: '˚₊· ', post: ' ·₊˚', style: 'boldScript' },
    { cat: 'sparkles', name: 'Star Bliss', pre: '⭐ ', post: ' ⭐', style: 'script' },
    { cat: 'sparkles', name: 'Twinkle', pre: '✩°｡⋆ ', post: ' ⋆｡°✩', style: 'script', unique: true },
    { cat: 'sparkles', name: 'Fairy Dust', pre: '･ﾟ✧ ', post: ' ✧ﾟ･', style: 'script', unique: true },
    { cat: 'sparkles', name: 'Moon & Stars', pre: '☾ ', post: ' ☽', style: 'script', unique: true },
    { cat: 'sparkles', name: 'Rainbow', pre: '🌈 ', post: '', style: 'boldScript', unique: true },
    // Faces — kaomoji
    { cat: 'faces', name: 'Bear', pre: 'ʕ•ᴥ•ʔ ', post: '', style: 'script', unique: true },
    { cat: 'faces', name: 'Cat', pre: '₍^. .^₎ ', post: '', style: 'script', unique: true },
    { cat: 'faces', name: 'Cat Paws', pre: 'ฅ^•ﻌ•^ฅ ', post: '', style: 'boldScript', unique: true },
    { cat: 'faces', name: 'Shy Face', pre: '(⁄ ⁄•⁄ω⁄•⁄ ⁄) ', post: '', style: 'script', unique: true },
    { cat: 'faces', name: 'Happy', pre: '(◕‿◕) ', post: '', style: 'script', unique: true },
  ],
  socialH2: 'Cute Signature in a TikTok, WhatsApp or Pinterest Bio',
  socialP: 'Emoji flowers and kaomoji faces take more characters than plain symbols. Preview the fit in each app before you paste.',
  socialBio: {"ig": "Baking, bunnies & bujo 🐰<br>📍 Melbourne", "tk": "Cozy vlogs & study-with-me<br>Uploads on Fridays", "dc": "Cozy gamer · Stardew forever"},
  namesP: "Two-syllable names look sweetest in the kawaii frames. Click one to try every cute style.",
  browseP: "Cute is the brightest of the soft styles. The heart page is romance only; the aesthetic page is the muted, no-emoji version of the same mood.",
  namesH2: 'Cute Cursive Signature Examples by Name',
  keywords: ['cute cursive signature', 'kawaii signature', 'cute signature copy and paste', 'cute name signature', 'soft cursive signature', ['cute fonts', '/cute-fonts.html'], ['cursive signature with heart', '/cursive-signature-with-heart.html'], ['aesthetic cursive signature', '/aesthetic-cursive-signature.html'], 'signature with flowers', 'signature with bow'],
  articleH2: 'What Makes a Cursive Signature Cute',
  articleIntro: [
    'Cute signatures use symbols that read as small and friendly: rounded shapes (ʚ ɞ, ☁, ❀), pastel-coded emoji (🎀 🌸 🌷), light sparkle runs, and kaomoji faces. They sit around a <em>light</em> script name rather than a bold one — weight reads as serious, and serious is the opposite of the effect. That is the main difference from the <a href="/fancy-cursive-signature.html">fancy signature</a> page, whose frames are symmetrical and formal, and from the <a href="/cursive-signature-with-heart.html">heart signature</a> page, which is all hearts and nothing else.',
    'Bunny Wings, below, is the most-copied cute signature. The ʚ ɞ characters are actually phonetic symbols from the <a href="https://www.unicode.org/charts/PDF/U0250.pdf" rel="noopener" target="_blank">IPA Extensions block</a>, but they were adopted as a pair of tiny wings or a bow and now define the style.',
  ],
  sections: [
    {
      h2: 'Cute Signature Styles on This Page',
      paras: [
        '<strong>Kawaii</strong> collects the soft symbol pairs: Bunny Wings, the ﾟ+｡ Japanese-punctuation sparkle, Soft Glow, a Bow emoji, Cloud, and Ribbon Heart, which puts a heart between the wings. Wave uses the 彡 character for a breezy, slightly anime feel.',
        '<strong>Flowers</strong> mixes text symbols (✿ ❀) with emoji flowers (🌸 🌷 🌻 🍀). The text symbols render in every app in the app’s own colour; the emoji ones are full-colour on every modern phone and are the better pick for a WhatsApp About or a TikTok bio where colour is welcome. Petal Trail combines a daisy with a small dot run for a longer, softer line.',
        '<strong>Sparkles</strong> covers the glitter runs: Sparkle Drip and Twinkle, the ･ﾟ✧ fairy-dust pattern, a crescent-moon pair, and a Rainbow lead. These are the styles that overlap most with the <a href="/aesthetic-cursive-signature.html">aesthetic signature</a> page, but the versions here use brighter, rounder marks.',
        '<strong>Faces</strong> are kaomoji — text faces built from Unicode letters and punctuation: a bear, two cats, a shy face and a happy face. They are placed before the name so the face “introduces” it. Kaomoji are the longest presets on the page, so they fit bios and About sections better than 30-character name fields.',
      ],
      examples: [
        [{ style: 'script', pre: '🎀 ', post: ' 🎀' }, 'Bow — pastel emoji frame'],
        [{ style: 'script', pre: '❀·˚ ', post: ' ˚·❀' }, 'Petal Trail — daisy with a dot run'],
        [{ style: 'script', pre: '☾ ', post: ' ☽' }, 'Moon & Stars — soft night version'],
        [{ style: 'script', pre: 'ʕ•ᴥ•ʔ ', post: '' }, 'Bear — kaomoji introduction'],
      ],
    },
    {
      h2: 'Text Symbols vs. Emoji in a Cute Signature',
      paras: [
        'Half of the presets here use text symbols (✿ ❀ ☁ ʚ ɞ) and half use emoji (🎀 🌸 🌷). The practical difference: text symbols inherit the text colour and count as one character each, so they fit tight fields and match dark mode automatically. Emoji are full-colour, count as two characters in most length limits, and look different on iPhone, Android and desktop because every platform draws its own set.',
        'For an Instagram Name field (30 characters) or a game username, stick to the text-symbol presets. For a WhatsApp About, a TikTok bio or a Pinterest profile, the emoji presets are fine and the colour helps. If you want the signature to look identical to everyone, avoid emoji entirely.',
      ],
    },
    {
      h2: 'Cute Signatures for TikTok, WhatsApp and Pinterest',
      paras: [
        '<strong>TikTok</strong> profile names allow 30 characters and bios 80. Bunny Wings or Bow fits the name; a kaomoji signature like Bear or Cat Paws belongs in the bio, where it has room. TikTok renders both text symbols and emoji in the profile header and in comments.',
        '<strong>WhatsApp</strong> About text is 139 characters, which is enough for any preset on this page including the long kaomoji faces. WhatsApp renders emoji in its own style, so the flowers will look slightly different to the recipient.',
        '<strong>Pinterest</strong> display names accept Unicode and show at small sizes in the feed. Daisy, Cloud and Sparkle Drip stay readable there; the kaomoji faces get crowded.',
        '<strong>Instagram</strong> shows the Name field in bold under the handle. Text-symbol presets like Bunny Wings, Daisy and Twinkle keep the count under 30 for most first names.',
      ],
    },
    {
      h2: 'Cute vs. Heart vs. Aesthetic Signatures',
      paras: [
        'The three overlap, so here is the split we use. Cute is the broadest: any soft, friendly symbol — bows, flowers, clouds, faces. Heart signatures are exclusively hearts in every form (♡ ❤ 💕, between names, as a tail) and have their own page because “signature with heart” is what people search for by name. Aesthetic signatures are the muted, minimal symbol runs of soft-girl and coquette profiles — ˚₊‧, ⋆｡°, ೃ⁀➷ — quieter than cute and without emoji. Pick cute for playful, heart for romantic, aesthetic for understated.',
      ],
    },
  ],
  faqs: [
    ['What is the ʚ ɞ symbol in cute signatures?', 'They are two characters from the IPA phonetic block (U+029A and U+025E) that happen to look like a small pair of wings or a bow when placed either side of a word. The Bunny Wings preset uses them and they are the most recognisable cute-signature marker.'],
    ['Do the emoji flowers look the same on every phone?', 'No. Every platform draws its own emoji, so 🌸 on an iPhone is a different picture from 🌸 on Android or Windows. The text symbols ✿ and ❀ render as simple outlines in the text colour and look consistent everywhere. Use text symbols when you want the signature to look identical to all viewers.'],
    ['Will a kaomoji face fit in my Instagram name?', 'Usually not. Kaomoji like ʕ•ᴥ•ʔ take 5 to 12 characters and Instagram’s Name field is capped at 30, so a first name plus a face is about the limit. Put kaomoji signatures in the bio instead, where you have 150 characters.'],
    ['Can I combine a cute style with a heart?', 'Yes. Ribbon Heart already does it, and the builder above lets you add a heart to either side of any style. For a signature that is only hearts, the cursive signature with heart page has more than twenty variations.'],
    ['Is this a cute font I can download?', 'No. The signature is Unicode text — letters from a script alphabet plus symbol and emoji characters — so it pastes into apps that do not allow fonts. For downloadable cute fonts, see the cute fonts page.'],
  ],
  related: [TOOLS.hub, TOOLS.cute, TOOLS.heart, TOOLS.aesthetic, TOOLS.name, TOOLS.fancy],
};
