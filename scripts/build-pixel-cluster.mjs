// build-pixel-cluster.mjs — the pixel / retro-game font cluster.
//
// Mario and Undertale ship first because they are the two highest-volume
// queries the bitmap renderer can serve honestly. Everything below is copy and
// preset selection; the renderer itself is assets/pixel-engine.js and is not
// page-specific, which is the whole point — a Minecraft, Roblox, arcade, 8-bit
// or generic pixel page is a new entry in `pages`, not a new generator.
//
// Every `themes` id is validated against the live engine at build time, and
// preset overlap between pages is reported, so two pages cannot quietly become
// the same page with different headings.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { renderPixelPage } from './lib/pixel-template.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SHARED_LEGAL = [
  'Nothing on this page is a copy of a commercial or fan-made game font. The letters you see are an original 5×8 bitmap alphabet drawn for this site, painted with colours, outlines and drop shadows chosen to evoke the era rather than to reproduce any studio’s artwork. No font file is downloaded to your device, and none is redistributed from ours.',
  'That distinction matters if you plan to publish what you make. A PNG of your own words in a generic pixel alphabet is yours to use. A game’s actual logo, wordmark, character art or trademarked name is not, and running those words through a pixel generator does not change that. Fan art, personal profiles, private servers and mock-ups are the normal home for this kind of image; merchandise, thumbnails monetised off a franchise, and anything implying an official connection are where rights holders object.',
];

const pages = {
  mario: {
    file: 'mario-font-generator.html',
    label: 'Mario',
    appName: 'Mario Font Generator',
    crumb: 'Mario Fonts',
    sample: 'SUPER STAR',
    themes: 'mario-classic,mario-block,coin-gold,fire-flower,power-star,warp-pipe,one-up,brick-shadow,lava-8bit,arcade-neon,paper-print,mono-clear',
    chips: [['all', 'All'], ['mario', 'Plumber'], ['bold', 'Bold & 3D'], ['gold', 'Coin gold'], ['retro', 'Retro'], ['light', 'Light']],
    title: 'Mario Font Generator – Pixel Text Preview & PNG Download',
    h1: 'Mario Font Generator',
    kicker: 'Chunky pixel letters, coin gold and 3D outlines',
    description: 'Free Mario font generator — type any text and see it drawn as chunky retro pixel letters. Adjust pixel size and colours, download a PNG, or copy block text art.',
    intro: 'Type a word and watch it turn into chunky, outlined pixel letters in the colours of a classic side-scroller. Choose a pixel size, set your own text and background colours, then download a transparent or coloured PNG. Everything renders in your browser — nothing is uploaded and no font is installed.',

    aboutTitle: 'What the Mario Font Generator Does',
    about: [
      'This is a pixel text renderer, not a Unicode converter. Instead of swapping your letters for lookalike characters, it draws each letter from a bitmap grid and paints it: a warm gold-to-red gradient, a hard black outline, a stepped 3D edge falling down and to the right, and a sky-blue field behind it. That combination — heavy outline, gradient fill, visible depth — is what makes a word read as an early-nineties platform game rather than as ordinary bold text.',
      'Because the letters are drawn rather than substituted, the tool can give you controls that a copy-and-paste generator cannot. The pixel size slider changes how coarse the blocks look, from a fine 3× grid up to a 14× chunk that shows every square. The colour pickers replace the preset palette on every style at once, so you can take the 3D treatment and put it in your own team colours. The transparent background option drops the backdrop entirely and hands you a PNG with a clean alpha channel, ready to drop onto a thumbnail, a stream overlay or a birthday invitation.',
      'The trade-off is honest and worth stating up front: a rendered image is an image. It cannot be pasted into an Instagram bio or a Discord username the way the Unicode tools elsewhere on this site can. What travels as text is the block art output, described further down.',
    ],
    previewAlt: 'The words "SUPER STAR" drawn as chunky gold and red pixel letters with a black outline and 3D edge on a sky-blue background',
    previewCaption: '“SUPER STAR” rendered by the Mario font generator in the Classic Plumber style',

    howToTitle: 'How to Use the Mario Font Generator',
    steps: [
      ['1. Type your text', 'Replace the sample with a name, a level title or a short phrase. Short entries look best — the pixel grid is deliberately coarse, so four to twelve characters read most clearly.'],
      ['2. Set the pixel size', 'Drag the slider left for finer, denser blocks or right for heavy chunks. Larger sizes produce a bigger PNG, which is what you want for print or a video thumbnail.'],
      ['3. Recolour it if you like', 'Tick Custom colours to override every preset with your own text and background. Tick Transparent background to export with no backdrop at all.'],
      ['4. Download or copy', 'Download PNG saves the exact image you see. Copy text art copies the same letters as block characters you can paste into a chat message.'],
    ],

    stylesTitle: 'Pixel Styles on This Page',
    stylesIntro: 'Twelve presets share one alphabet and differ only in how it is painted. Use the filter chips to narrow them down, then adjust size and colour on whichever one is closest to what you want.',
    styleNotes: [
      ['Classic Plumber', 'Gold-to-red gradient, black outline and a two-step 3D edge on sky blue. The default, and the closest to a classic platformer title card.'],
      ['Question Block', 'Cream letters with a brown outline over a chequered amber field, echoing a coin block.'],
      ['Coin Rush', 'Bright gold gradient with a deep outline and a flat drop shadow on midnight blue — good for scores and numbers.'],
      ['Fire Flower', 'Orange-to-crimson letters ringed in white with a warm glow behind them.'],
      ['Power Star', 'White-to-yellow letters on a pale grid background, the lightest style here and the easiest to print.'],
      ['Warp Pipe', 'Green gradient with a dark outline and a single depth step on near-black.'],
      ['1-Up Green', 'Flat white letters on solid green — the simplest, most legible option at small pixel sizes.'],
      ['Brick Wall', 'Dark brown letters with a light top-shadow over a chequered brick field.'],
      ['Lava 8-Bit', 'Yellow-to-red gradient on a near-black ground, leaning arcade rather than console.'],
      ['Arcade Neon', 'Magenta-to-cyan gradient with a violet glow, for a cabinet-marquee look.'],
      ['Paper Print', 'Black on off-white. Use this one for worksheets, party signs and anything going to a printer.'],
      ['Transparent PNG', 'Dark letters, no background at all. The style to pick when you are compositing onto your own artwork.'],
    ],

    outputTitle: 'Copy, Download and What Actually Transfers',
    output: [
      'Each style gives you two outputs, and they behave very differently. Download PNG saves the canvas exactly as drawn, at the pixel size you selected, with a transparent background if you asked for one. This is the output to use for thumbnails, overlays, invitations, printed signs and anything you will place in a design tool.',
      'Copy text art is the output that survives the clipboard. It rebuilds your word out of solid block characters — the same bitmap, one character per pixel — so it pastes into Discord, a chat message, a README or a code block as real text. Wrap it in a code block wherever one is available: block art depends on every row lining up, and a proportional font will skew it. Keep these short, because each letter is five characters wide and eight lines tall, and a long phrase quickly becomes too wide for a phone screen.',
      'If what you actually want is styled text for an Instagram bio or a username field, a pixel renderer is the wrong tool and no image-based generator will do it. Unicode has no pixel-font alphabet to map onto, so the honest answer is to use the block art for chat, and one of the Unicode generators linked below for profile fields.',
    ],
    limitNote: 'the pixel alphabet covers A–Z, a–z, 0–9 and common punctuation. Accented letters, emoji and non-Latin scripts have no bitmap and render as blank space rather than as a box.',

    uniqueH2: 'Making a Mario-Style Title Card or Thumbnail',
    uniqueBody: [
      'The look people are usually after is a title card: a short phrase in heavy pixel letters, outlined so it survives being scaled down. Three settings do most of the work. Keep the phrase to two or three words, because the outline and 3D edge add roughly two pixels of bulk on every side and a long line loses its punch. Push the pixel size to 10× or higher, which gives you a PNG wide enough to sit in a 1280×720 thumbnail without resampling. And pick a style whose outline contrasts with wherever the image is going — the black outline of Classic Plumber holds up on almost any background, which is exactly why arcade artwork used it.',
      'For a party sign or a worksheet, invert that advice. Paper Print at a 5× or 6× pixel size gives crisp dark letters on white that a home printer handles cleanly, with no heavy ink coverage. If you are compositing over your own background art, use Transparent PNG, then apply your own colour in the design tool — the letters export as flat shapes with a clean alpha edge, so a colour overlay or a gradient fill behaves predictably.',
      'One practical note about scaling: the PNG is drawn at exactly the size shown, so enlarging it afterwards in an editor will blur the pixel edges unless you use a nearest-neighbour or “preserve hard edges” resample. It is easier to raise the pixel size here and export bigger than to scale up later.',
    ],

    whereTitle: 'Where People Use Pixel Text Like This',
    where: [
      'The common uses are video thumbnails and stream overlays, Discord server banners and channel headers, retro-themed birthday invitations and party signs, itch.io and game-jam page art, fan art captions, and mock-ups for pixel-art projects that need placeholder lettering. Teachers use the Paper Print style for classroom number lines and name cards, where the blocky grid is easy for young children to copy.',
      'The block art output has its own niche. It works well as a Discord announcement header, an ASCII-style banner at the top of a README, a terminal splash screen, or a message that needs to look loud without being an image attachment. Because it is plain text, it also survives places that strip images entirely.',
    ],

    examplesTitle: 'Mario Font Examples to Try',
    examplesIntro: 'Paste any of these into the box above to see how the presets handle short titles, numbers and mixed case.',
    examples: [
      ['SUPER STAR', 'Title card, two words'],
      ['LEVEL 1-1', 'Numbers and punctuation'],
      ['GAME OVER', 'Classic screen text'],
      ['1 UP', 'Very short, very large'],
      ['World Record', 'Mixed case, no all-caps'],
      ['PLAYER 2', 'Stream overlay label'],
    ],

    legalTitle: 'Is This the Real Mario Font?',
    legal: [
      'No, and no online generator has it. The Super Mario logo is a custom hand-drawn wordmark owned by Nintendo, not a typeface anyone can license or install, and the in-game text across the series uses several different bitmap and vector fonts that were never released publicly. The “Mario fonts” you find on download sites are fan recreations of varying quality and unclear licensing, which is why this page does not host or link to one.',
      ...SHARED_LEGAL,
    ],

    linksTitle: 'Related Generators',
    links: [
      ['Undertale Font Generator', '/undertale-font-generator.html', 'The same pixel renderer with dialogue-box and battle-box styles.'],
      ['Glitch Text Generator', '/glitch-text-generator.html', 'Corrupted Unicode text that you can paste into a username.'],
      ['Fancy Text Generator', '/fancy-text-generator.html', 'Copy-and-paste Unicode styles for bios and profiles.'],
      ['College Block Font Generator', '/college-block-font-generator.html', 'Heavy block lettering for team and varsity text.'],
      ['Stranger Things Font Generator', '/stranger-things-font-generator.html', 'Another franchise-flavoured styling tool.'],
      ['Cursive Text Generator', '/', 'The main Unicode script generator.'],
    ],

    faqTitle: 'Mario Font Generator FAQ',
    faqs: [
      ['Is there a real Mario font I can download?', 'Not an official one. The Super Mario logo is a custom wordmark rather than a released typeface, and the in-game fonts were never published. Files sold or shared as “Mario font” are fan recreations with unclear licensing, so this page renders an original pixel alphabet instead.'],
      ['Can I copy and paste the Mario font?', 'The PNG is an image, so it cannot be pasted into a bio or username field. The Copy text art button gives you the same letters built from block characters, which does paste as real text — use a code block so the rows stay aligned.'],
      ['How do I download my pixel text as a PNG?', 'Press Download PNG under any style. The file saves at exactly the pixel size shown on screen, so raise the slider before downloading if you need a larger image.'],
      ['Can I make the background transparent?', 'Yes. Tick “Transparent background” and every style exports with a clean alpha channel, ready to composite onto your own artwork. The chequerboard behind the preview shows where the transparency is.'],
      ['Can I change the colours?', 'Tick “Custom colours” and pick a text and background colour. Your choice overrides every preset at once, so you keep the outline and 3D treatment while changing the palette.'],
      ['Does it work with numbers and punctuation?', 'Yes — the bitmap alphabet covers A–Z, a–z, 0–9 and common punctuation such as . , ! ? - and #. Accented characters, emoji and non-Latin scripts are not drawn and appear as blank space.'],
      ['Can I use the images commercially?', 'The alphabet is original and the image of your own words is yours to use. What you may not do is use a franchise’s name, logo or characters commercially — that restriction comes from trademark and copyright law, not from this tool.'],
      ['Is the Mario font generator free?', 'Yes. It runs entirely in your browser, needs no account, has no watermark and no usage limit.'],
    ],
  },

  undertale: {
    file: 'undertale-font-generator.html',
    label: 'Undertale',
    appName: 'Undertale Font Generator',
    crumb: 'Undertale Fonts',
    sample: '* You feel determined.',
    themes: 'dialogue-box,determination,battle-box,soul-red,flowey-gold,bone-blue,papyrus-orange,glitch-soul,terminal,crt-scanline,midnight,mono-clear',
    chips: [['all', 'All'], ['undertale', 'Dialogue'], ['dark', 'Dark'], ['glitch', 'Glitched'], ['retro', 'Retro'], ['minimal', 'Minimal']],
    title: 'Undertale Font Generator – Pixel Dialogue Box Text Maker',
    h1: 'Undertale Font Generator',
    kicker: 'White pixel text in a black dialogue box',
    description: 'Free Undertale font generator — type any line and see it rendered as white pixel text inside a black dialogue box. Adjust pixel size and colours, download a PNG, copy block text art.',
    intro: 'Write a line and see it drawn the way an RPG dialogue box would show it: white pixel letters, a hard black field and a thin white border. Adjust the pixel size, recolour the text for a specific character, and download a PNG. It all renders in your browser, with no font to install.',

    aboutTitle: 'What the Undertale Font Generator Does',
    about: [
      'The look this page reproduces is a text box, not a typeface on its own. Three things create it: a plain monospaced-feeling pixel alphabet with no outline or shadow, pure white on pure black so the contrast is absolute, and a one-pixel white rule drawn just inside the edge of the frame. Take away the border and you have plain pixel text; add it back and the same words read as a line of game dialogue.',
      'Because the renderer draws each letter from a bitmap grid rather than substituting lookalike characters, you get controls a copy-and-paste tool cannot offer. The pixel size slider takes the text from a fine grid up to heavy blocks. The colour pickers recolour every style at once, which is how you get the character-coloured variants people usually want — a red line, a cyan line, an orange line. The Battle Box preset thickens the border and widens the padding for the squarer frame used in combat scenes.',
      'The dialogue styles are the only ones on the site that use left alignment rather than centring, because a text box reads as a text box only when the lines start flush at the left edge. Press Enter in the input to add a second or third line and it will wrap the way a real box does.',
    ],
    previewAlt: 'The line "You feel determined." shown as white pixel letters inside a black dialogue box with a thin white border',
    previewCaption: 'A line rendered by the Undertale font generator in the Dialogue Box style',

    howToTitle: 'How to Use the Undertale Font Generator',
    steps: [
      ['1. Write your line', 'Type the text you want in the box. Press Enter to start a second line — the dialogue styles keep the lines left-aligned, as a real text box does.'],
      ['2. Choose a style', 'Dialogue Box and Battle Box add the white border. Determination is the same text with no frame, and the coloured presets stand in for different speakers.'],
      ['3. Adjust size and colour', 'Use the pixel size slider for finer or chunkier letters. Tick Custom colours to set an exact text colour for a specific character.'],
      ['4. Save or copy', 'Download PNG saves the frame exactly as shown. Copy text art copies the same letters as block characters for chat.'],
    ],

    stylesTitle: 'Dialogue and Battle Styles on This Page',
    stylesIntro: 'All twelve presets draw the same bitmap alphabet. What changes is the frame, the colour and how much glow sits behind the letters.',
    styleNotes: [
      ['Dialogue Box', 'White text, black field, a thin white border and generous padding. Left-aligned, and the closest match to a standard RPG text box.'],
      ['Determination', 'The same white-on-black text with no border, for when you want the line without the frame.'],
      ['Battle Box', 'A thicker two-pixel border and wider padding, in all caps — the squarer frame used for combat text.'],
      ['Red Soul', 'Red letters with a soft red halo on black.'],
      ['Golden Flower', 'A warm gold gradient on near-black.'],
      ['Bone Blue', 'Pale cyan letters with a blue glow.'],
      ['Orange Attack', 'Amber letters with a warm glow, the counterpart to the blue.'],
      ['Glitched', 'White letters with red and cyan copies offset one pixel either side, for a corrupted-signal look.'],
      ['Terminal', 'Bright green on pure black, plainer and more computer-like.'],
      ['CRT Monitor', 'Pale green with scanlines drawn over the whole image.'],
      ['Midnight Pixel', 'Cyan letters with a dark outline on deep navy — the least game-specific of the dark styles.'],
      ['Transparent PNG', 'No background at all, for compositing the text onto your own artwork.'],
    ],

    outputTitle: 'Copy, Download and What Actually Transfers',
    output: [
      'Download PNG saves the canvas exactly as drawn, border included, at whatever pixel size you selected. This is what you want for fan art, a video thumbnail, a Discord embed image or a printed sticker sheet.',
      'Copy text art is the output that survives the clipboard: your line rebuilt from solid block characters, one per pixel, which pastes into Discord or a README as real text. Put it inside a code block so the rows stay aligned — in a proportional font the shape falls apart. Keep the line short, since every letter is five characters wide.',
      'For a username or a bio you need real characters, and there is no pixel alphabet in Unicode to map onto. The closest usable options are the monospace and full-width Unicode styles in the fancy text generator, which read as blocky without being pixel art.',
    ],
    limitNote: 'the bitmap alphabet covers A–Z, a–z, 0–9 and common punctuation, including the asterisk that dialogue lines usually open with. Emoji, accented letters and non-Latin scripts have no bitmap and render as blank space.',

    uniqueH2: 'Making a Dialogue Box That Reads Correctly',
    uniqueBody: [
      'A convincing text box is mostly about line breaks. Real dialogue boxes are narrow and break early — usually somewhere between thirty and forty characters — and they keep a consistent left margin, which is why the dialogue presets here do not centre their text. Type your own line breaks rather than letting one long line run: press Enter where the box would break, and the frame will size itself around the block you built.',
      'Lines in this style also conventionally open with an asterisk and a space, and that character is in the alphabet, so “* You feel determined.” renders exactly as typed. Sentence case reads better than all caps for narration; save the all-caps treatment for the Battle Box preset, where it belongs.',
      'Character-coloured text is the other thing people come here for, and Custom colours is how you get it: pick the exact hex value you want and it replaces the text colour on every preset while leaving the frame white. A useful trick is to draft in Dialogue Box at a small pixel size to get the line breaks right, then raise the pixel size and switch presets once the wording is settled — the layout will not shift, because the pixel grid scales uniformly.',
    ],

    whereTitle: 'Where People Use Pixel Dialogue Text',
    where: [
      'The usual homes are fan art and comics, video thumbnails and stream overlays, Discord server rules and announcement images, meme captions built around a text box, and mock-ups for people making their own RPGs who need placeholder dialogue that looks right. The transparent export is popular for sticker sheets and for compositing a line over a screenshot.',
      'The block art output travels differently. Pasted into a Discord code block it becomes a text banner nobody can scroll past, and it works in READMEs, terminal splash screens and anywhere images are stripped out. It is the only output here that stays text all the way through.',
    ],

    examplesTitle: 'Undertale Font Examples to Try',
    examplesIntro: 'Paste any of these in to see how the presets handle punctuation, multiple lines and short labels.',
    examples: [
      ['* You feel determined.', 'Standard narration line'],
      ['* But nobody came.', 'Short single line'],
      ['* Howdy!\n* I\'m new here.', 'Two lines — press Enter'],
      ['FIGHT   ACT   ITEM   MERCY', 'Menu row, all caps'],
      ['* 99 / 99 HP', 'Numbers and punctuation'],
      ['SAVE', 'One word, very large'],
    ],

    legalTitle: 'Is This the Real Undertale Font?',
    legal: [
      'No. The fonts used in Undertale are Determination Mono and Determination Sans, fan-made typefaces created after the game’s release, plus separate faces for individual characters. They are distributed by their own authors under their own terms, and this page neither hosts them nor loads them, so what you see here is a lookalike rather than the article itself. If you need those exact files for a project, get them from their creators and read the licence.',
      ...SHARED_LEGAL,
    ],

    linksTitle: 'Related Generators',
    links: [
      ['Mario Font Generator', '/mario-font-generator.html', 'The same renderer with chunky 3D outlined styles.'],
      ['Glitch Text Generator', '/glitch-text-generator.html', 'Corrupted Unicode you can actually paste into a username.'],
      ['Fancy Text Generator', '/fancy-text-generator.html', 'Monospace and full-width Unicode for blocky profile text.'],
      ['Fonts for Discord', '/fonts-for-discord.html', 'What renders and what breaks in Discord.'],
      ['Stranger Things Font Generator', '/stranger-things-font-generator.html', 'Another franchise-flavoured styling tool.'],
      ['Cursive Text Generator', '/', 'The main Unicode script generator.'],
    ],

    faqTitle: 'Undertale Font Generator FAQ',
    faqs: [
      ['What font does Undertale use?', 'The main text is set in Determination Mono and Determination Sans, fan-made typefaces released after the game, with separate faces for certain characters. They are not distributed here — this page draws its own pixel alphabet in the same spirit.'],
      ['Can I copy and paste Undertale text?', 'The PNG is an image and cannot be pasted into a bio or username. Copy text art rebuilds the same letters from block characters, which does paste as real text — use a code block so the rows line up.'],
      ['How do I make an Undertale dialogue box?', 'Pick the Dialogue Box style, type your line, and press Enter where you want the box to break. The white border and left alignment come with the preset; raise the pixel size before downloading if you need a bigger image.'],
      ['Can I change the text colour for a character?', 'Yes. Tick “Custom colours” and choose the exact colour you want. It replaces the text colour on every preset while the dialogue frame stays white.'],
      ['Can I get a transparent PNG?', 'Yes. Tick “Transparent background” and the image exports with a clean alpha channel, which is what you want when compositing over a screenshot or your own art.'],
      ['Does the asterisk at the start of a line work?', 'It does. The asterisk, along with A–Z, a–z, 0–9 and common punctuation, is part of the bitmap alphabet, so a line typed as “* You feel determined.” renders exactly as written.'],
      ['Can I use these images in my fan art or video?', 'The alphabet is original, so an image of your own words is yours to use. Franchise names, characters and logos remain the rights holder’s, which is the usual line between fan work and commercial use.'],
      ['Is the Undertale font generator free?', 'Yes. It runs in your browser, needs no sign-up, adds no watermark and has no limit.'],
    ],
  },
};

// ── Validate every configured theme id against the live engine ───────────────
const engineSrc = fs.readFileSync(path.join(root, 'assets', 'pixel-engine.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(engineSrc, sandbox);
const PF = sandbox.window.PixelFont;
const known = new Set(PF.THEMES.map((t) => t.id));

let failed = false;
for (const [key, p] of Object.entries(pages)) {
  const list = p.themes.split(',');
  const missing = list.filter((id) => !known.has(id));
  if (missing.length) {
    console.error(`✗ ${key}: unknown theme ids → ${missing.join(', ')}`);
    failed = true;
  }
  // A filter chip that matches nothing would render an empty grid.
  for (const [cat] of p.chips) {
    if (cat === 'all') continue;
    const hit = list.some((id) => (PF.theme(id)?.cats || '').includes(cat));
    if (!hit) { console.error(`✗ ${key}: chip "${cat}" matches no theme on the page`); failed = true; }
  }
  // Every character used in sample text and examples must have a bitmap.
  const probe = [p.sample, ...p.examples.map((e) => e[0])].join('').replace(/\\n/g, '');
  const gaps = [...new Set([...probe].filter((ch) => ch !== '\n' && !PF.supports(ch)))];
  if (gaps.length) { console.error(`✗ ${key}: sample text uses undrawable characters → ${gaps.join(' ')}`); failed = true; }
}
if (failed) process.exit(1);

// ── Report preset overlap so two pages cannot drift into near-duplicates ─────
const keys = Object.keys(pages);
for (let i = 0; i < keys.length; i++) {
  for (let j = i + 1; j < keys.length; j++) {
    const a = new Set(pages[keys[i]].themes.split(','));
    const b = pages[keys[j]].themes.split(',');
    const shared = b.filter((id) => a.has(id));
    const pct = Math.round((shared.length / Math.max(a.size, b.length)) * 100);
    if (pct >= 40) console.warn(`! ${keys[i]} / ${keys[j]} share ${pct}% of presets`);
  }
}

for (const p of Object.values(pages)) {
  const html = renderPixelPage(p);
  fs.writeFileSync(path.join(root, p.file), html);
  fs.writeFileSync(path.join(root, 'public', p.file), html);
}
console.log(`Built ${Object.keys(pages).length} pixel cluster pages in root and public mirror.`);
