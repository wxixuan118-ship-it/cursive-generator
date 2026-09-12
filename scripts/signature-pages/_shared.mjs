// _shared.mjs — presets and link lists reused by more than one signature page.
//
// HUB_PRESETS is the hub's original 54-style set, grouped by the tab it sits
// under. Style pages pull the relevant group from here and add their own
// `unique:true` presets on top; the build fails if a "unique" preset also
// exists on another page, so the flag stays honest.

export const HUB_PRESETS = [
    // elegant
    {cat:'elegant',name:'Cursive Script',pre:'',post:'',style:'script'},
    {cat:'elegant',name:'Elegant Italic',pre:'',post:'',style:'boldItalic'},
    {cat:'elegant',name:'Signature Line',pre:'',post:' ─',style:'script'},
    {cat:'elegant',name:'Old Style Script',pre:'',post:'',style:'fraktur'},
    {cat:'elegant',name:'Double-Struck',pre:'',post:'',style:'double'},
    {cat:'elegant',name:'Em Dash Lead',pre:'— ',post:'',style:'script'},
    {cat:'elegant',name:'Dot Accent',pre:'· ',post:' ·',style:'script'},
    {cat:'elegant',name:'Tilde Wrap',pre:'~ ',post:' ~',style:'script'},
    // fancy
    {cat:'fancy',name:'Royal Frame',pre:'꧁',post:'꧂',style:'boldScript'},
    {cat:'fancy',name:'Royal Script',pre:'꧁ ',post:' ꧂',style:'script'},
    {cat:'fancy',name:'Japanese Bracket',pre:'『',post:'』',style:'script'},
    {cat:'fancy',name:'Full-width Bracket',pre:'【',post:'】',style:'boldScript'},
    {cat:'fancy',name:'Black Star',pre:'✦ ',post:' ✦',style:'script'},
    {cat:'fancy',name:'White Star',pre:'✧ ',post:' ✧',style:'boldScript'},
    {cat:'fancy',name:'Diamond',pre:'◆ ',post:' ◆',style:'script'},
    {cat:'fancy',name:'Star Trail',pre:'★彡 ',post:' 彡★',style:'boldScript'},
    {cat:'fancy',name:'Crown',pre:'♔ ',post:' ♔',style:'script'},
    {cat:'fancy',name:'Sparkle Frame',pre:'✶꧁',post:'꧂✶',style:'boldScript'},
    // simple
    {cat:'simple',name:'Plain Script',pre:'',post:'',style:'script'},
    {cat:'simple',name:'Plain Bold',pre:'',post:'',style:'boldScript'},
    {cat:'simple',name:'Dash Lead',pre:'— ',post:'',style:'boldScript'},
    {cat:'simple',name:'Tilde Simple',pre:'~',post:'~',style:'boldScript'},
    {cat:'simple',name:'Middle Dot',pre:'∙ ',post:' ∙',style:'script'},
    {cat:'simple',name:'Arrow Lead',pre:'→ ',post:'',style:'script'},
    // bold
    {cat:'bold',name:'Bold Cursive',pre:'',post:'',style:'boldScript'},
    {cat:'bold',name:'Bold Italic',pre:'',post:'',style:'boldItalic'},
    {cat:'bold',name:'Bold Gothic',pre:'',post:'',style:'boldFraktur'},
    {cat:'bold',name:'Bold Star',pre:'✦ ',post:' ✦',style:'boldScript'},
    {cat:'bold',name:'Bold Frame',pre:'꧁',post:'꧂',style:'boldScript'},
    {cat:'bold',name:'Bold Red Heart',pre:'❤ ',post:' ❤',style:'boldScript'},
    // cute
    {cat:'cute',name:'Bunny Wings',pre:'ʚ ',post:' ɞ',style:'script'},
    {cat:'cute',name:'Flower',pre:'✿ ',post:' ✿',style:'boldScript'},
    {cat:'cute',name:'Wave',pre:'彡 ',post:' 彡',style:'script'},
    {cat:'cute',name:'Soft Glow',pre:'·˚ ༘ ',post:' ˚·',style:'script'},
    {cat:'cute',name:'Kawaii',pre:'ﾟ+｡ ',post:' ｡+ﾟ',style:'boldScript'},
    {cat:'cute',name:'Cherry Blossom',pre:'🌸 ',post:' 🌸',style:'script'},
    {cat:'cute',name:'Sparkle Drip',pre:'˚₊· ',post:' ·₊˚',style:'boldScript'},
    {cat:'cute',name:'Star Bliss',pre:'⭐ ',post:' ⭐',style:'script'},
    // heart
    {cat:'heart',name:'Simple Heart',pre:'♡ ',post:' ♡',style:'script'},
    {cat:'heart',name:'Red Heart',pre:'❤ ',post:' ❤',style:'boldScript'},
    {cat:'heart',name:'Pink Hearts',pre:'💕 ',post:' 💕',style:'script'},
    {cat:'heart',name:'Heart Exclaim',pre:'❣ ',post:' ❣',style:'boldScript'},
    {cat:'heart',name:'Heart Stars',pre:'✦♡ ',post:' ♡✦',style:'script'},
    {cat:'heart',name:'Heart Parens',pre:'꒰ ♡ ',post:' ♡ ꒱',style:'boldScript'},
    {cat:'heart',name:'Heart Ornament',pre:'˚｡⋆ ♡ ',post:' ♡ ⋆｡˚',style:'script'},
    {cat:'heart',name:'Bold Heart',pre:'♡ ',post:' ♡',style:'boldScript'},
    // symbol
    {cat:'symbol',name:'Sparkle Mix',pre:'✧･ﾟ:*✧ ',post:' ✧*:ﾟ･✧',style:'script'},
    {cat:'symbol',name:'Triple Star',pre:'⁂ ',post:' ⁂',style:'boldScript'},
    {cat:'symbol',name:'Arrow Wrap',pre:'↠ ',post:' ↞',style:'script'},
    {cat:'symbol',name:'Chevron',pre:'⊱ ',post:' ⊰',style:'boldScript'},
    {cat:'symbol',name:'Star Wrap',pre:'⋆✦⋆ ',post:' ⋆✦⋆',style:'script'},
    {cat:'symbol',name:'Degree Wrap',pre:'° ∘ ◦ ',post:' ◦ ∘ °',style:'boldScript'},
    {cat:'symbol',name:'Lightning',pre:'⚡ ',post:' ⚡',style:'script'},
    {cat:'symbol',name:'Infinity',pre:'∞ ',post:' ∞',style:'boldScript'}
];

export const byCat = (cat) => HUB_PRESETS.filter((p) => p.cat === cat).map((p) => ({ ...p }));

// Related-tool cards shared across the cluster; pages pick and reorder.
export const TOOLS = {
  hub:      ['Cursive Signature Generator', '/copy-and-paste-cursive-signature.html', 'Every signature category in one tool, plus the symbol builder.', '✒️'],
  name:     ['Cursive Name Generator', '/cursive-name-generator.html', 'Your name in 30+ cursive styles with one-click copy.', '𝒩'],
  writing:  ['Cursive Writing Copy and Paste', '/copy-and-paste-cursive-writing.html', '58 cursive styles for words, sentences and messages.', '✍'],
  font:     ['Cursive Font Copy and Paste', '/copy-and-paste-cursive-font.html', 'Cursive font text for bios, captions and usernames.', '✦'],
  fancy:    ['Fancy Text Generator', '/fancy-text-generator.html', 'Beyond cursive — gothic, aesthetic and decorative styles.', '✨'],
  bold:     ['Bold Cursive Generator', '/cursive-bold-generator.html', 'Heavy cursive for names that need to stand out.', '𝓑'],
  heart:    ['Heart Font Generator', '/heart-font-generator.html', 'Heart symbols and heart-decorated text for any message.', '♡'],
  aesthetic:['Aesthetic Fonts', '/aesthetic-fonts.html', 'Soft, minimal aesthetic text for bios and captions.', '⋆'],
  cute:     ['Cute Fonts', '/cute-fonts.html', 'Kawaii and cute text styles for TikTok and Instagram.', '🎀'],
  fonts:    ['Cursive Fonts', '/cursive-fonts.html', 'Downloadable cursive fonts and where to use them.', '𝒜'],
  freeFont: ['CTG Signature Script (Free Font)', '/free-fonts/ctg-signature-script.html', 'A free downloadable signature font for documents and logos.', '⬇'],
  tracing:  ['Name Tracing Generator', '/cursive-name-tracing-generator.html', 'Printable cursive tracing sheets for any name.', '✏️'],
  home:     ['Cursive Text Generator', '/', 'Generate any text in 16 Unicode cursive styles at once.', '𝒞'],
  discord:  ['Fonts for Discord', '/fonts-for-discord.html', 'Styles that render reliably in Discord names and bios.', '🎮'],
  gothic:   ['Gothic Font Generator', '/gothic-font-generator.html', 'Blackletter and old-English style text.', '𝔊'],
};
