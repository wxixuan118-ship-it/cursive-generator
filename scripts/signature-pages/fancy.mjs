import { byCat, TOOLS } from './_shared.mjs';

// fancy-cursive-signature.html — target: "fancy cursive signature".
// Angle: the frame is the point. Symmetrical ornaments, brackets, royal
// symbols and star trails around a bold or light script name.
export default {
  key: 'fancy',
  file: 'fancy-cursive-signature.html',
  label: 'Fancy',
  crumb: 'Fancy',
  footerLabel: 'Fancy Signature',
  title: 'Fancy Cursive Signature – Framed & Ornate Styles to Copy',
  description: 'Create a fancy cursive signature with ornamental frames, royal symbols, star trails and bracket borders. Copy any style for a username or Instagram name.',
  h1: 'Fancy Cursive Signature',
  eyebrow: 'Framed · ornate · {n} styles',
  intro: 'A fancy cursive signature is a name wrapped in symmetry: ꧁ ꧂ frames, 『 』 brackets, crowns, fleurs-de-lis and star trails on both sides of bold or light Unicode script. These are the signatures that hold their own next to emoji in a TikTok display name or a Free Fire username. Type your name, pick a frame, and copy — every result is plain text, so it pastes anywhere.',
  sample: 'Isabella',
  names: ['Isabella', 'Valentina', 'Aurora', 'Seraphina', 'Leonardo', 'Maximilian', 'Anastasia', 'Dominic', 'Arabella', 'Xavier'],
  defaultCat: 'all',
  tabs: [['all', 'All'], ['frames', 'Frames'], ['royal', 'Royal'], ['stars', 'Stars'], ['ornate', 'Ornate']],
  hero: { style: 'boldScript', pre: '꧁', post: '꧂' },
  heroNote: 'Royal Frame — the ꧁ ꧂ border that defines the fancy signature look.',
  cardTitle: 'Fancy Signature',
  cardNote: '꧁ ꧂ frames, crowns, star trails and ornate borders.',
  socialStyle: 'boldScript',
  builderStyles: [['boldScript', 'Bold Cursive'], ['script', 'Cursive Script'], ['boldItalic', 'Bold Italic'], ['double', 'Double-Struck'], ['boldFraktur', 'Bold Gothic']],
  symbols: [['꧁', '꧂', '꧁꧂'], ['『', '』', '『』'], ['【', '】', '【】'], ['♔ ', ' ♔', '♔'], ['⚜ ', ' ⚜', '⚜'], ['★彡 ', ' 彡★', '★彡'], ['༺ ', ' ༻', '༺༻']],
  presets: [
    // Frames — symmetrical borders
    { cat: 'frames', name: 'Royal Frame', pre: '꧁', post: '꧂', style: 'boldScript' },
    { cat: 'frames', name: 'Royal Script', pre: '꧁ ', post: ' ꧂', style: 'script' },
    { cat: 'frames', name: 'Japanese Bracket', pre: '『', post: '』', style: 'script' },
    { cat: 'frames', name: 'Full-width Bracket', pre: '【', post: '】', style: 'boldScript' },
    { cat: 'frames', name: 'Wing Frame', pre: '༺ ', post: ' ༻', style: 'script', unique: true },
    { cat: 'frames', name: 'Double Frame', pre: '꧁༺ ', post: ' ༻꧂', style: 'boldScript', unique: true },
    { cat: 'frames', name: 'Sparkle Frame', pre: '✶꧁', post: '꧂✶', style: 'boldScript' },
    { cat: 'frames', name: 'Corner Frame', pre: '╰┈➤ ', post: '', style: 'boldScript', unique: true },
    // Royal — crowns, gems, heraldry
    { cat: 'royal', name: 'Crown', pre: '♔ ', post: ' ♔', style: 'script' },
    { cat: 'royal', name: 'Queen’s Crown', pre: '♕ ', post: ' ♕', style: 'boldScript', unique: true },
    { cat: 'royal', name: 'Fleur-de-lis', pre: '⚜ ', post: ' ⚜', style: 'boldScript', unique: true },
    { cat: 'royal', name: 'Diamond', pre: '◆ ', post: ' ◆', style: 'script' },
    { cat: 'royal', name: 'Gem Frame', pre: '❖ ', post: ' ❖', style: 'boldScript', unique: true },
    { cat: 'royal', name: 'Regal Gothic', pre: '♔ ', post: ' ♔', style: 'boldFraktur', unique: true },
    // Stars — trails and sparkles
    { cat: 'stars', name: 'Black Star', pre: '✦ ', post: ' ✦', style: 'script' },
    { cat: 'stars', name: 'White Star', pre: '✧ ', post: ' ✧', style: 'boldScript' },
    { cat: 'stars', name: 'Star Trail', pre: '★彡 ', post: ' 彡★', style: 'boldScript' },
    { cat: 'stars', name: 'Shooting Star', pre: '☆彡 ', post: '', style: 'script', unique: true },
    { cat: 'stars', name: 'Star Crown', pre: '✧･ﾟ: *✧･ﾟ:* ', post: ' *:･ﾟ✧*:･ﾟ✧', style: 'boldScript', unique: true },
    // Ornate — filigree and flourishes
    { cat: 'ornate', name: 'Filigree', pre: '❧ ', post: ' ☙', style: 'script', unique: true },
    { cat: 'ornate', name: 'Floral Ornament', pre: '✾ ', post: ' ✾', style: 'boldScript', unique: true },
    { cat: 'ornate', name: 'Baroque Scroll', pre: '⊰ ', post: ' ⊱', style: 'boldItalic', unique: true },
    { cat: 'ornate', name: 'Ornate Double-Struck', pre: '꧁ ', post: ' ꧂', style: 'double', unique: true },
    { cat: 'ornate', name: 'Lace Border', pre: '•°¯`•• ', post: ' ••´¯°•', style: 'script', unique: true },
  ],
  socialH2: 'Fancy Signature in a Username, Display Name or Bio',
  socialP: 'Frames take up characters, so preview the length before you paste — Instagram names cut off at 30 characters.',
  socialBio: {"ig": "Cosplay · Con season loading<br>📍 Orlando", "tk": "Edits & fits ✦ 1M views club", "dc": "Clan leader · ranked grinder · DMs open"},
  namesP: "Long, vowel-rich names carry a frame well. Click one to preview it in every fancy border.",
  browseP: "If the frames feel like too much, the elegant and simple pages strip them off; if you want the frame heavier, the bold page keeps only the thick ones.",
  namesH2: 'Fancy Cursive Signature Examples by Name',
  keywords: ['fancy cursive signature', 'fancy signature copy and paste', 'stylish signature', 'signature with symbols', 'royal signature font', ['elegant cursive signature', '/elegant-cursive-signature.html'], ['aesthetic cursive signature', '/aesthetic-cursive-signature.html'], ['bold cursive signature', '/bold-cursive-signature.html'], 'fancy name signature', 'decorative signature text'],
  articleH2: 'What Makes a Cursive Signature Fancy',
  articleIntro: [
    'A fancy signature is built in two layers: a cursive alphabet for the name, and a matched pair of symbols on either side. The frame does most of the work — the same name in Bold Cursive looks businesslike on its own and looks like a gaming clan tag inside ꧁ ꧂. That is why this page is organised by frame type rather than by letterform, and why it shares almost no presets with the <a href="/elegant-cursive-signature.html">elegant signature</a> page, which deliberately leaves the frame off.',
    'The Royal Frame below is the most-copied fancy signature on the site. If you have seen a name that looked like this in a Free Fire lobby or a TikTok comment, this is how it was made.',
  ],
  sections: [
    {
      h2: 'Fancy Signature Styles on This Page',
      paras: [
        '<strong>Frames</strong> are the classic fancy look: ꧁ ꧂ (Javanese ornaments that became the standard “cool name” border), 『 』 and 【 】 CJK brackets, and the ༺ ༻ Tibetan marks used in Wing Frame and Double Frame. Corner Frame is a one-sided arrow lead that works for the first line of a bio.',
        '<strong>Royal</strong> styles use heraldic symbols — the chess-piece crowns ♔ ♕, the fleur-de-lis ⚜, and gem marks ◆ ❖. Regal Gothic swaps the script alphabet for bold blackletter, which is the closest Unicode gets to a coat-of-arms feel.',
        '<strong>Stars</strong> range from the single ✦ ✧ pair to Star Trail (★彡), the kaomoji shooting-star used in anime-style usernames, and Star Crown, the longest preset here, which surrounds the name with two sparkle runs.',
        '<strong>Ornate</strong> styles borrow from print ornaments: the floral heart ❧ ☙, ✾ rosettes, ⊰ ⊱ scrolls and a lace border. They are the most decorative options on the site and best kept for display names rather than usernames.',
      ],
      examples: [
        [{ style: 'boldScript', pre: '꧁༺ ', post: ' ༻꧂' }, 'Double Frame — two borders stacked'],
        [{ style: 'boldScript', pre: '⚜ ', post: ' ⚜' }, 'Fleur-de-lis — heraldic and formal'],
        [{ style: 'script', pre: '❧ ', post: ' ☙' }, 'Filigree — print-ornament flourish'],
        [{ style: 'boldFraktur', pre: '♔ ', post: ' ♔' }, 'Regal Gothic — blackletter with crowns'],
      ],
    },
    {
      h2: 'Choosing a Frame That Renders Everywhere',
      paras: [
        'Every symbol on this page is a standard Unicode character (the ꧁ ꧂ pair sits in the <a href="https://www.unicode.org/charts/PDF/UA980.pdf" rel="noopener" target="_blank">Javanese block</a>), but not every device has a glyph for every one. The ꧁ ꧂ frame, CJK brackets, crowns, ◆ and ✦ ✧ stars are covered by the system fonts on iOS, Android, Windows and macOS, so they are safe defaults. The Tibetan ༺ ༻ marks and the ❧ ☙ ornaments are covered on modern phones but can show as boxes on older Android builds and some smart-TV apps.',
        'If your signature is going somewhere you cannot test — a Discord server full of strangers, a public leaderboard — choose from the Frames or Stars tabs. If it is going in your own Instagram name where you can check it on your phone immediately, anything on the page is fair game. The <a href="/cursive-compatibility.html">compatibility page</a> lists which alphabets and symbols are safest per platform.',
      ],
    },
    {
      h2: 'Fancy Signatures for Gaming, TikTok and Instagram',
      paras: [
        '<strong>Game usernames.</strong> Free Fire, PUBG Mobile, Mobile Legends and Roblox all accept Unicode in display names, and the ꧁ ꧂ frame is practically the house style. Keep the name short — most games cap the field at 12 to 16 characters and the frame uses two of them.',
        '<strong>TikTok display names.</strong> TikTok allows 30 characters and renders decorative Unicode in the profile header and on comments. Star Trail and Sparkle Frame stand out in a comment thread without pushing the name off-screen.',
        '<strong>Instagram.</strong> The Name field is also 30 characters; a first name in Royal Frame or Crown fits comfortably. Instagram usernames (the @handle) only accept letters, numbers, periods and underscores, so the fancy version belongs in the Name field, not the handle.',
        '<strong>Discord.</strong> Server nicknames and the global display name both take Unicode. The Fonts for Discord page covers which styles render in Discord’s font stack; from this page, Frames and Royal are the reliable picks.',
      ],
    },
    {
      h2: 'Fancy vs. Elegant vs. Aesthetic',
      paras: [
        'Fancy is symmetrical and ornamental. Elegant removes the ornament and keeps a single rule or monogram — the <a href="/elegant-cursive-signature.html">elegant signature page</a> is the right one for email footers and professional profiles. Aesthetic sits between them: soft, asymmetric symbol runs like ˚₊‧ and ⋆｡°✩ that suit soft-girl and coquette profiles rather than gaming tags; those live on the <a href="/aesthetic-cursive-signature.html">aesthetic signature</a> page.',
        'If you want the decoration but in a heavier weight, the <a href="/bold-cursive-signature.html">bold signature</a> page applies frames to thick script and blackletter so the name still reads at thumbnail size.',
      ],
    },
  ],
  faqs: [
    ['What is the ꧁ ꧂ symbol in fancy signatures?', 'They are two ornament characters from the Javanese script block (U+A9C1 and U+A9C2 in the Unicode Javanese chart). They became popular as a decorative border in mobile-game usernames and are now the most recognisable “fancy name” frame. Every preset in the Frames tab uses them or a similar bracket pair.'],
    ['Can I use a fancy cursive signature as my Instagram username?', 'Not as the @handle — Instagram usernames only allow letters, numbers, periods and underscores. You can paste a fancy signature into the Name field on your profile, which is the bold line under your handle and accepts Unicode.'],
    ['Why do some symbols show as boxes on my friend’s phone?', 'Their device is missing a glyph for that symbol. The ꧁ ꧂ frame, CJK brackets, crowns and the basic stars are covered by every modern OS; the Tibetan and ornament symbols in the Wing, Filigree and Lace presets are the ones most likely to fall back to a box on older Android versions.'],
    ['How long can a fancy signature be?', 'As long as the field allows. A frame adds two to six characters, and the Star Crown preset adds around twenty, so check the limit: Instagram and TikTok names are 30 characters, most game usernames 12 to 16, Discord display names 32.'],
    ['Is a fancy signature the same as a fancy font?', 'The name is written in a Unicode cursive alphabet and the frame is made of Unicode symbols — no font file is involved. That is what lets you paste it into apps that do not allow custom fonts. For decorative fonts you can install, see the cursive fonts page.'],
  ],
  related: [TOOLS.hub, TOOLS.fancy, TOOLS.discord, TOOLS.name, TOOLS.gothic, TOOLS.font],
};
