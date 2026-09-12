import { TOOLS } from './_shared.mjs';

// bold-cursive-signature.html — target: "bold cursive signature".
// Angle: weight. The heaviest Unicode alphabets, all-caps forms, underlines
// and heavy frames — signatures that survive being shrunk to an avatar.
export default {
  key: 'bold',
  file: 'bold-cursive-signature.html',
  label: 'Bold',
  crumb: 'Bold',
  footerLabel: 'Bold Signature',
  title: 'Bold Cursive Signature – Heavy Script Styles to Copy',
  description: 'Generate a bold cursive signature: thick script, bold italic, blackletter, all-caps and underlined styles that stay readable small. Copy for Instagram.',
  h1: 'Bold Cursive Signature',
  eyebrow: 'Heavy · high-contrast · {n} styles',
  intro: 'A bold cursive signature is built for small screens. Thin script disappears at avatar size; the heavy alphabets on this page — Bold Cursive, Bold Italic, Bold Gothic, Double-Struck — keep their shape when a name is shrunk into a comment header or a video overlay. Type your name and copy the weight that still reads at a glance.',
  sample: 'Marcus Vale',
  names: ['Marcus', 'Victoria', 'Dominic', 'Natalia', 'Bruno', 'Simone', 'Rocco', 'Bianca', 'Hugo', 'Camila'],
  defaultCat: 'all',
  tabs: [['all', 'All'], ['heavy', 'Heavy'], ['caps', 'All Caps'], ['underlined', 'Underlined'], ['framed', 'Framed']],
  hero: { style: 'boldScript' },
  heroNote: 'Bold Cursive — the heaviest script alphabet in Unicode, and the most widely supported.',
  cardTitle: 'Bold Signature',
  cardNote: 'Heavy script, all-caps, underlines and thick frames.',
  socialStyle: 'boldScript',
  builderStyles: [['boldScript', 'Bold Cursive'], ['boldItalic', 'Bold Italic'], ['sansBoldItalic', 'Bold Sans Italic'], ['boldFraktur', 'Bold Gothic'], ['double', 'Double-Struck']],
  symbols: [['꧁', '꧂', '꧁꧂'], ['【', '】', '【】'], ['▌ ', ' ▐', '▌▐'], ['■ ', ' ■', '■'], ['⫸ ', ' ⫷', '⫸⫷'], ['✦ ', ' ✦', '✦'], ['❯ ', '', '❯']],
  presets: [
    // Heavy — the thickest alphabets, nothing added
    { cat: 'heavy', name: 'Bold Cursive', pre: '', post: '', style: 'boldScript' },
    { cat: 'heavy', name: 'Bold Italic', pre: '', post: '', style: 'boldItalic' },
    { cat: 'heavy', name: 'Bold Sans Italic', pre: '', post: '', style: 'sansBoldItalic' },
    { cat: 'heavy', name: 'Bold Gothic', pre: '', post: '', style: 'boldFraktur' },
    { cat: 'heavy', name: 'Heavy Double-Struck', pre: '', post: '', style: 'double' },
    // All Caps — uppercase forms of the heavy alphabets
    { cat: 'caps', name: 'Bold Caps', pre: '', post: '', style: 'boldScript', mode: 'upper', unique: true },
    { cat: 'caps', name: 'Bold Italic Caps', pre: '', post: '', style: 'boldItalic', mode: 'upper', unique: true },
    { cat: 'caps', name: 'Sans Caps', pre: '', post: '', style: 'sansBoldItalic', mode: 'upper', unique: true },
    { cat: 'caps', name: 'Gothic Caps', pre: '', post: '', style: 'boldFraktur', mode: 'upper', unique: true },
    { cat: 'caps', name: 'Outline Caps', pre: '', post: '', style: 'double', mode: 'upper', unique: true },
    // Underlined — a rule under every letter
    { cat: 'underlined', name: 'Bold Underline', pre: '', post: '', style: 'boldScript', mode: 'underline', unique: true },
    { cat: 'underlined', name: 'Bold Italic Underline', pre: '', post: '', style: 'boldItalic', mode: 'underline', unique: true },
    { cat: 'underlined', name: 'Sans Underline', pre: '', post: '', style: 'sansBoldItalic', mode: 'underline', unique: true },
    { cat: 'underlined', name: 'Double Rule', pre: '', post: ' ═══', style: 'boldScript', unique: true },
    // Framed — heavy frames only
    { cat: 'framed', name: 'Bold Frame', pre: '꧁', post: '꧂', style: 'boldScript' },
    { cat: 'framed', name: 'Bold Star', pre: '✦ ', post: ' ✦', style: 'boldScript' },
    { cat: 'framed', name: 'Bold Bracket', pre: '【', post: '】', style: 'boldItalic', unique: true },
    { cat: 'framed', name: 'Block Bars', pre: '▌ ', post: ' ▐', style: 'boldScript', unique: true },
    { cat: 'framed', name: 'Square Stops', pre: '■ ', post: ' ■', style: 'sansBoldItalic', unique: true },
    { cat: 'framed', name: 'Chevron Heavy', pre: '⫸ ', post: ' ⫷', style: 'boldScript', unique: true },
    { cat: 'framed', name: 'Gothic Frame', pre: '꧁ ', post: ' ꧂', style: 'boldFraktur', unique: true },
  ],
  socialH2: 'Bold Signature in a YouTube, Instagram or Discord Profile',
  socialP: 'Bold styles are the ones that survive a profile header and a comment thread. Preview how the weight holds up.',
  socialBio: {"ig": "Strength coach · Online programming<br>📍 Austin", "tk": "Gym clips & form checks<br>New PR every month", "dc": "Streams weeknights · ranked duo"},
  namesP: "Bold weight suits short, punchy names. Click one to compare the heavy alphabets.",
  browseP: "Bold is about weight. For decoration without the weight, see fancy; for the lightest possible signature, see simple or elegant.",
  namesH2: 'Bold Cursive Signature Examples by Name',
  keywords: ['bold cursive signature', 'bold signature font', 'thick cursive signature', 'bold script signature', 'heavy cursive text', ['bold cursive generator', '/cursive-bold-generator.html'], ['fancy cursive signature', '/fancy-cursive-signature.html'], ['cursive signature fonts', '/cursive-signature-fonts.html'], 'signature in bold letters', 'bold name copy and paste'],
  articleH2: 'Why Weight Matters in a Cursive Signature',
  articleIntro: [
    'Most signatures are seen small: a 40-pixel name on a comment, a display name in a Discord member list, a channel name under a video thumbnail. At that size, the light Mathematical Script alphabet (𝒶𝒷𝒸, from the <a href="https://www.unicode.org/charts/PDF/U1D400.pdf" rel="noopener" target="_blank">Mathematical Alphanumeric Symbols</a> block) turns into a grey smudge. The bold alphabets — Bold Script (𝓪𝓫𝓬), Bold Italic (𝒂𝒃𝒄), Bold Fraktur (𝖆𝖇𝖈) and Double-Struck (𝕒𝕓𝕔) — have thicker strokes and more open counters, so the name stays a name.',
    'Bold Cursive, below, is also the best-supported cursive alphabet across old Android devices, which is why it is the default in the <a href="/copy-and-paste-cursive-signature.html">main signature generator</a> and the fallback we recommend whenever a lighter style renders unevenly.',
  ],
  sections: [
    {
      h2: 'Bold Signature Styles on This Page',
      paras: [
        '<strong>Heavy</strong> is the five thick alphabets with nothing added. Bold Cursive is the standard; Bold Italic is a slanted serif with a more formal feel; Bold Sans Italic is the modern, sporty one; Bold Gothic is blackletter, the choice for a tattoo-style or metal-band look; Heavy Double-Struck is the outlined “hollow” alphabet that reads as bold even though the strokes are open.',
        '<strong>All Caps</strong> converts the name to uppercase before styling it. Capital letters in the bold alphabets are wider and more angular than their lowercase forms, so an all-caps signature looks closer to a wordmark or a jersey name than to handwriting. Outline Caps — double-struck capitals — is a popular YouTube channel style.',
        '<strong>Underlined</strong> adds a combining underline to every letter so the whole name sits on one thick baseline rule, the way a signed name on a form does. Double Rule appends a heavy ═══ line instead, which renders more consistently in apps that strip combining marks.',
        '<strong>Framed</strong> keeps only the frames that match the weight: the ꧁ ꧂ border in bold and gothic, thick CJK brackets, block bars ▌ ▐, square stops and a heavy chevron pair. Light star and lace frames from the <a href="/fancy-cursive-signature.html">fancy signature</a> page are left out on purpose — they look thin next to a bold name.',
      ],
      examples: [
        [{ style: 'boldScript', mode: 'upper' }, 'Bold Caps — wordmark weight'],
        [{ style: 'double', mode: 'upper' }, 'Outline Caps — the YouTube channel look'],
        [{ style: 'boldScript', mode: 'underline' }, 'Bold Underline — a rule under every letter'],
        [{ style: 'boldScript', pre: '▌ ', post: ' ▐' }, 'Block Bars — heavy geometric frame'],
      ],
    },
    {
      h2: 'Bold Signatures for Video, Streaming and Gaming',
      paras: [
        '<strong>YouTube channel names</strong> appear at small sizes under thumbnails and in comment threads. Bold Cursive or Outline Caps keep the name readable there; a thin script would not. YouTube allows Unicode in channel names and handles up to 50 characters.',
        '<strong>Twitch and Kick display names</strong> render in a compact sans-serif UI, so a Bold Sans Italic or Block Bars signature matches the surroundings while still standing out. Twitch display names are limited to the characters of your login name plus capitalisation changes, so the bold version goes in the About panel or a title, not the display name itself.',
        '<strong>Discord</strong> shows display names in a member list where dozens of names compete. Bold Frame and Gothic Frame are the two most legible framed styles at that size; see the Fonts for Discord page for what Discord’s font stack renders.',
        '<strong>Game usernames</strong> in Free Fire, PUBG Mobile and Call of Duty Mobile are usually shown over gameplay, where a bold signature with a frame stays visible against a busy background.',
      ],
    },
    {
      h2: 'Legibility Rules for Bold Cursive',
      paras: [
        'Weight helps, but three things still break a bold signature. First, length: bold capitals are wide, and an all-caps surname can overflow a 30-character name field once a frame is added — check the count. Second, combining underlines: they render on iOS, Android and every desktop browser, but a few chat apps strip them on paste, so keep Double Rule as a fallback. Third, mixed alphabets: pasting a bold first name next to a thin last name looks like a rendering error, so style the whole name in one alphabet.',
        'For a name that needs to be heavy and formal at the same time, Bold Italic is the safest pick; for heavy and modern, Bold Sans Italic; for heavy and decorative, Bold Gothic inside the ꧁ ꧂ frame.',
      ],
    },
    {
      h2: 'Bold vs. Fancy vs. Simple',
      paras: [
        'Bold is about weight, not decoration — several styles here have no symbols at all. Fancy is about the frame and uses whichever alphabet suits it, light or heavy. Simple is the lightest option: plain letters in a script alphabet with nothing added; the <a href="/simple-cursive-signature.html">simple signature</a> page has those. If you want bold text for something longer than a name — a caption, a headline, a message — the <a href="/cursive-bold-generator.html">bold cursive generator</a> handles full sentences.',
      ],
    },
  ],
  faqs: [
    ['Which bold cursive style is the most readable?', 'Bold Cursive (the Mathematical Bold Script alphabet) is the most readable and the most widely supported. Bold Italic is a close second and looks slightly more formal. Both hold their shape at comment-header and avatar sizes where light script does not.'],
    ['Why does the underlined signature lose its line in some apps?', 'Underlined styles use a combining low line character after every letter. Most apps keep it, but a few chat clients and some game username fields strip combining marks on paste. If that happens, use Double Rule, which appends a solid ═══ line made of ordinary box-drawing characters.'],
    ['Can I use a bold cursive signature as a YouTube channel name?', 'Yes. YouTube channel names accept Unicode and allow up to 50 characters. Bold Cursive and Outline Caps are the two styles that stay legible under thumbnails and in comments.'],
    ['Is bold cursive the same as bold text in Instagram?', 'Instagram has no native bold toggle for bios or names, which is why people paste Unicode bold alphabets. What you copy here is that Unicode text — it displays bold on Instagram because the characters themselves are the bold forms, not because of formatting.'],
    ['Is this a font I can download?', 'No — what you copy is Unicode text in the bold alphabets, which is exactly why it survives pasting into apps that block custom fonts. For a bold script font file to install in a document or design tool, see the cursive fonts page.'],
  ],
  related: [TOOLS.hub, TOOLS.bold, TOOLS.discord, TOOLS.gothic, TOOLS.name, TOOLS.fancy],
};
