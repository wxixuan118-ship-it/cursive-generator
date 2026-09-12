import { TOOLS } from './_shared.mjs';

// cursive-signature-with-heart.html — target: "cursive signature with heart".
// Angle: every way a heart can attach to a name — both sides, one side,
// between first and last name, as a tail, framed, and in emoji colours.
export default {
  key: 'heart',
  file: 'cursive-signature-with-heart.html',
  label: 'Heart',
  crumb: 'With Heart',
  footerLabel: 'Signature With Heart',
  title: 'Cursive Signature With Heart – ♡ Styles to Copy and Paste',
  description: 'Cursive signature with heart, every way: ♡ on both sides, one side, between first and last name, as a tail, or in emoji colours. Copy it for Instagram.',
  h1: 'Cursive Signature With Heart',
  eyebrow: 'Hearts only · every placement · {n} styles',
  intro: 'A cursive signature with heart is the most requested signature style on the site, and the simplest to describe: a name with a ♡. This page covers every placement — both sides, left or right only, between first and last name, as a tail on the last letter, inside a frame, and in the coloured emoji hearts — so you can copy the exact version you have seen in someone’s bio. Type your name and pick a heart.',
  sample: 'Sofia Rose',
  names: ['Sofia', 'Amelia', 'Mia', 'Ella', 'Aria', 'Layla', 'Nora', 'Stella', 'Violet', 'Elena'],
  defaultCat: 'all',
  tabs: [['all', 'All'], ['classic', 'Both Sides'], ['side', 'One Side'], ['between', 'Between Names'], ['framed', 'Framed'], ['emoji', 'Emoji Hearts']],
  hero: { style: 'boldScript', pre: '♡ ', post: ' ♡' },
  heroNote: '♡ Name ♡ in Bold Cursive — the heart signature that renders reliably on every platform.',
  cardTitle: 'Signature With Heart',
  cardNote: 'Hearts on both sides, one side, between names, or as a tail.',
  socialStyle: 'boldScript',
  builderStyles: [['boldScript', 'Bold Cursive'], ['script', 'Cursive Script'], ['boldItalic', 'Bold Italic'], ['double', 'Double-Struck']],
  symbols: [['♡ ', ' ♡', '♡'], ['❤ ', ' ❤', '❤'], ['♥ ', ' ♥', '♥'], ['❣ ', ' ❣', '❣'], ['💕 ', ' 💕', '💕'], ['🤍 ', ' 🤍', '🤍'], ['🖤 ', ' 🖤', '🖤']],
  presets: [
    // Both sides — the classic
    { cat: 'classic', name: 'Simple Heart', pre: '♡ ', post: ' ♡', style: 'script' },
    { cat: 'classic', name: 'Bold Heart', pre: '♡ ', post: ' ♡', style: 'boldScript' },
    { cat: 'classic', name: 'Red Heart', pre: '❤ ', post: ' ❤', style: 'boldScript' },
    { cat: 'classic', name: 'Heart Exclaim', pre: '❣ ', post: ' ❣', style: 'boldScript' },
    { cat: 'classic', name: 'Filled Heart', pre: '♥ ', post: ' ♥', style: 'script', unique: true },
    { cat: 'classic', name: 'Italic Heart', pre: '♡ ', post: ' ♡', style: 'boldItalic', unique: true },
    // One side — left or right only
    { cat: 'side', name: 'Heart Lead', pre: '♡ ', post: '', style: 'boldScript', unique: true },
    { cat: 'side', name: 'Heart Tail', pre: '', post: '♡', style: 'script', unique: true },
    { cat: 'side', name: 'Bold Heart Tail', pre: '', post: ' ♡', style: 'boldScript', unique: true },
    { cat: 'side', name: 'Red Heart Tail', pre: '', post: ' ❤', style: 'script', unique: true },
    { cat: 'side', name: 'Signed With Love', pre: '', post: ' ♡ x', style: 'script', unique: true },
    // Between names — heart replaces the space
    { cat: 'between', name: 'Heart Between', pre: '', post: '', style: 'script', sep: ' ♡ ', unique: true },
    { cat: 'between', name: 'Bold Heart Between', pre: '', post: '', style: 'boldScript', sep: ' ❤ ', unique: true },
    { cat: 'between', name: 'Heart Joined', pre: '', post: '', style: 'boldScript', sep: '♡', unique: true },
    { cat: 'between', name: 'Hearts All Round', pre: '♡ ', post: ' ♡', style: 'script', sep: ' ♡ ', unique: true },
    // Framed — hearts inside a frame
    { cat: 'framed', name: 'Heart Parens', pre: '꒰ ♡ ', post: ' ♡ ꒱', style: 'boldScript' },
    { cat: 'framed', name: 'Heart Stars', pre: '✦♡ ', post: ' ♡✦', style: 'script' },
    { cat: 'framed', name: 'Heart Ornament', pre: '˚｡⋆ ♡ ', post: ' ♡ ⋆｡˚', style: 'script' },
    { cat: 'framed', name: 'Heart Arrow', pre: '➳♡ ', post: '', style: 'boldScript', unique: true },
    { cat: 'framed', name: 'Heart Sparkle', pre: '♡⋆｡°✩ ', post: ' ✩°｡⋆♡', style: 'script', unique: true },
    { cat: 'framed', name: 'Heart Royal', pre: '꧁♡ ', post: ' ♡꧂', style: 'boldScript', unique: true },
    // Emoji hearts — colour
    { cat: 'emoji', name: 'Pink Hearts', pre: '💕 ', post: ' 💕', style: 'script' },
    { cat: 'emoji', name: 'Sparkling Heart', pre: '💖 ', post: ' 💖', style: 'boldScript', unique: true },
    { cat: 'emoji', name: 'Two Hearts', pre: '💞 ', post: '', style: 'script', unique: true },
    { cat: 'emoji', name: 'White Heart', pre: '🤍 ', post: ' 🤍', style: 'script', unique: true },
    { cat: 'emoji', name: 'Black Heart', pre: '🖤 ', post: ' 🖤', style: 'boldScript', unique: true },
    { cat: 'emoji', name: 'Heart Ribbon', pre: '💝 ', post: '', style: 'script', unique: true },
  ],
  socialH2: 'Heart Signature in an Instagram, TikTok or WhatsApp Bio',
  socialP: 'The ♡ outline heart renders in every app in the text colour; emoji hearts show in colour. Preview both.',
  socialBio: {"ig": "Wedding photographer · Booking 2027<br>📍 Charleston", "tk": "Love stories, 60 seconds at a time", "dc": "Taken 💍 · plays support"},
  namesP: "Click a name to see every heart placement — or type two names to try the heart-between form.",
  browseP: "Hearts only on this page. For bows, flowers and kaomoji see cute; for symmetrical frames without the romance, see fancy.",
  namesH2: 'Cursive Signature With Heart — Examples by Name',
  keywords: ['cursive signature with heart', 'signature with heart copy and paste', 'name with heart in cursive', 'heart signature', 'cursive name with heart', ['heart font generator', '/heart-font-generator.html'], ['cute cursive signature', '/cute-cursive-signature.html'], ['fancy cursive signature', '/fancy-cursive-signature.html'], 'heart between names', 'signature ♡'],
  articleH2: 'How to Put a Heart in a Cursive Signature',
  articleIntro: [
    'A heart can go in five places: before the name, after it, on both sides, between the first and last name, or inside a larger frame. Most generators only offer the first three. This page generates all five from whatever you type, in both the text hearts (♡ ♥ ❤ ❣, which take the text colour) and the emoji hearts (💕 💖 🤍 🖤, which are full colour). For hearts on text that is not a name — captions, messages — the <a href="/heart-font-generator.html">heart font generator</a> handles sentences.',
    'The classic cursive signature with heart is below: ♡ on both sides of the name in Bold Cursive. It is the combination we recommend first because the outline heart U+2661 and the bold script alphabet are both supported on every current phone and desktop.',
  ],
  sections: [
    {
      h2: 'Heart Signature Styles on This Page',
      paras: [
        '<strong>Both Sides</strong> is the symmetrical ♡ Name ♡. It comes in the outline heart, the filled ♥, the heavy ❤ and the ❣ heart-exclamation, and in three alphabets. Bold Heart is the most legible; Simple Heart (light script) is the softest.',
        '<strong>One Side</strong> puts the heart only before or only after the name. Heart Tail — the heart touching the last letter with no space — is how many people hand-sign a note, and Signed With Love adds the “♡ x” sign-off used in messages and cards.',
        '<strong>Between Names</strong> replaces the space in a two-word name with a heart, so “Sofia Rose” becomes 𝒮ℴ𝒻𝒾𝒶 ♡ ℛℴ𝓈ℯ. It is the couple’s-signature form (Sofia ♡ Daniel) and works for any two words. Heart Joined removes the spaces entirely for a compact username-friendly version; Hearts All Round adds a heart between and on both ends.',
        '<strong>Framed</strong> combines a heart with another frame: the ꒰ ꒱ soft brackets, stars, a sparkle run, an arrow-through-heart ➳♡, and the ꧁ ꧂ royal border with hearts tucked inside.',
        '<strong>Emoji Hearts</strong> uses the coloured set — pink 💕, sparkling 💖, two hearts 💞, white 🤍, black 🖤 and the ribboned gift heart 💝. Each renders in the platform’s own emoji style.',
      ],
      examples: [
        [{ style: 'script', sep: ' ♡ ' }, 'Heart Between — the couple’s form'],
        [{ style: 'script', post: '♡' }, 'Heart Tail — touching the last letter'],
        [{ style: 'script', post: ' ♡ x' }, 'Signed With Love — card sign-off'],
        [{ style: 'boldScript', pre: '꧁♡ ', post: ' ♡꧂' }, 'Heart Royal — hearts inside the ꧁ ꧂ frame'],
      ],
    },
    {
      h2: 'Which Heart Symbol to Use',
      paras: [
        'There are four text hearts and a dozen emoji hearts, and they behave differently. <strong>♡ (U+2661)</strong> is the white/outline heart (see the <a href="https://www.unicode.org/charts/PDF/U2600.pdf" rel="noopener" target="_blank">Unicode Miscellaneous Symbols chart</a>): one character, text colour, supported everywhere — the safest choice. <strong>♥ (U+2665)</strong> is the filled black heart suit; it is also one character and universal, but on some platforms it is automatically turned into the red ❤️ emoji, which changes the look. <strong>❤ (U+2764)</strong> is the heavy black heart; without a variation selector it is text, but most phones show it as the red emoji anyway. <strong>❣ (U+2763)</strong> is the heart exclamation, less common and rendered as text more often.',
        'Emoji hearts count as two characters against most length limits and look different on every platform. For a signature that stays identical to everyone, use ♡; for colour, pick an emoji heart and accept that iPhone and Android viewers will see slightly different drawings.',
      ],
    },
    {
      h2: 'Heart Signatures for Instagram, TikTok and WhatsApp',
      paras: [
        '<strong>Instagram.</strong> The Name field is 30 characters and renders ♡ in the profile’s text colour. Bold Heart is the standard heart signature there; the emoji versions show in colour but push a longer name over the limit. The @handle itself rejects hearts entirely.',
        '<strong>TikTok.</strong> Heart Between and Heart Tail are common in TikTok display names. The 30-character limit applies; Heart Joined (no spaces) is the most compact two-name form.',
        '<strong>WhatsApp.</strong> The About field is long enough for any preset. WhatsApp converts ♥ and ❤ to its own emoji drawing, so if you want an outline heart specifically, use the ♡ presets.',
        '<strong>Discord.</strong> Display names take Unicode; the ♡ and ♥ text hearts render in Discord’s font, while emoji hearts render as Twemoji. Heart Royal and Heart Parens are the two framed styles that stay readable in the member list.',
      ],
    },
    {
      h2: 'Heart vs. Cute vs. Fancy',
      paras: [
        'This page is the cursive signature with heart and nothing else. If you want the softer symbol family around a name — bows, flowers, clouds, kaomoji — the <a href="/cute-cursive-signature.html">cute signature</a> page has them. If you want symmetrical ornamental frames without a romantic reading, the <a href="/fancy-cursive-signature.html">fancy signature</a> page is the one. And for the hub with every category in one tool, go back to the <a href="/copy-and-paste-cursive-signature.html">main cursive signature generator</a>.',
      ],
    },
  ],
  faqs: [
    ['How do I add a heart to my cursive signature?', 'Type your name above and pick a preset from the Both Sides, One Side or Between Names tabs. Each result already contains the heart, so one click on Copy gives you the complete signature. The builder further down lets you add any heart symbol to either side of any style.'],
    ['How do I put a heart between my first and last name?', 'Use the Between Names tab. Heart Between replaces the space in “First Last” with ♡, Bold Heart Between uses ❤ in bold script, and Heart Joined removes the spaces so the result is short enough for username fields.'],
    ['Why does my ♥ heart turn into a red emoji?', 'Some platforms — WhatsApp, iMessage and parts of Android — automatically render the text heart ♥ (U+2665) and ❤ (U+2764) as the red emoji heart. The outline heart ♡ (U+2661) is not converted, so use a ♡ preset if you want a text-style heart everywhere.'],
    ['Can I use a heart signature in my Instagram username?', 'The @handle field rejects every heart character, so no. Put it in the profile Name field instead — that field takes Unicode, shows in bold under the handle, and is where heart signatures normally live.'],
    ['Is a heart signature legally valid?', 'No. It is decorative Unicode text for bios, profiles and messages, not a legal electronic signature.'],
  ],
  related: [TOOLS.hub, TOOLS.heart, TOOLS.cute, TOOLS.name, TOOLS.aesthetic, TOOLS.font],
};
