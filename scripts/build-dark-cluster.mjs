// build-dark-cluster.mjs — the alternative / dark font cluster.
//
// Six landing pages, one shared runtime. Nothing here renders text: the actual
// transforms live in assets/style-engine.js and the generator UI in
// assets/aesthetic-cluster.js. A page is only a config object, so the presets,
// ordering, copy, examples, use cases and FAQs are what differ — never the
// engine. Add a seventh style page by adding a seventh entry below.
//
// Every `ids` entry is validated against the engine at build time, so a typo
// fails the build instead of silently rendering a page with missing styles.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { renderClusterPage } from './lib/cluster-template.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const pages = {
  freaky: {
    file: 'freaky-font-generator.html',
    label: 'Freaky',
    appName: 'Freaky Font Generator',
    crumb: 'Freaky Fonts',
    sample: 'Freak Show',
    title: 'Freaky Font Generator – Freaky Text Copy & Paste',
    h1: 'Freaky Font Generator',
    kicker: 'Distorted, chaotic and deliberately strange',
    description: 'Free freaky font generator — turn plain words into distorted, chaotic, upside-down and corrupted-looking Unicode text. Copy and paste freaky fonts anywhere.',
    intro: 'Turn ordinary words into distorted, chaotic, glitch-tinted text. This freaky font generator flips letters, reverses them, stacks marks and wraps everything in strange symbols. Every result is real Unicode, so you can copy freaky text straight into a username, bio or post.',
    ids: 'upside-down,reversed,zalgo-light,alternating,cm-strike,dec-d-fr2,monospace-d-fr5,fraktur-d-gt3,dec-d-dk9,bold-d-dk1,double-cm-slash,dec-d-fr3,fullwidth-d-fr7,smallCaps-cm-strike',
    chips: [['all', 'All'], ['freaky', 'Chaotic'], ['glitch', 'Glitch'], ['weird', 'Strange'], ['symbols', 'Symbol-heavy'], ['gaming', 'Gaming']],
    copyHeading: 'Freaky Fonts Copy and Paste',
    copyBody: 'Every freaky style above is built from Unicode characters, not a font file and not a CSS preview. That distinction matters: because the strangeness lives in the characters themselves, it survives the trip through the clipboard into Discord, Instagram, TikTok or a game lobby. Nothing is installed and nothing reverts to plain text after you paste.',
    popularTitle: 'Popular Freaky Text Styles',
    popular: 'The most effective freaky text does one strange thing clearly rather than five at once. Flipped and reversed letters break reading direction, which is why they look unsettling at a glance. Light combining marks add a smeared, corrupted edge without destroying legibility. Alternating case reads as chaotic and mocking. Heavy symbol frames turn a short name into something that looks assembled from spare parts.',
    howToTitle: 'How to Use the Freaky Font Generator',
    steps: [
      ['1. Enter your text', 'Type a name, handle or short phrase into the box. Short entries stay the most readable once distorted.'],
      ['2. Pick a level of chaos', 'Use the filter chips to move between flipped letters, glitch marks, strange symbols and gaming-style frames.'],
      ['3. Copy and paste', 'Press Copy next to a result and paste it into a bio, username field, caption or chat message.'],
    ],
    socialTitle: 'Where to Use Freaky Text',
    social: 'Freaky text suits Discord usernames and server nicknames, gaming tags, edgy Instagram and TikTok display names, and profile bios that are meant to look a bit broken. Reversed and flipped styles read well as a single short handle. Save the symbol-heavy frames for display names and bios, where the extra characters have room to breathe.',
    limitNote: 'flipped and reversed text is still stored as ordinary characters, so search and screen readers will read it in its literal order, not the order it appears.',
    specificTitle: 'Freaky Fonts vs Creepy and Scary Fonts',
    specific: 'Freaky is the broadest of the three and the least literal. It is strange and chaotic rather than frightening, so it borrows from glitch and symbol styles instead of horror imagery. Creepy text aims for a quieter, unsettling mood built from eerie marks and thin letterforms. Scary text goes fully into horror territory with skulls, bats and heavy gothic weight. If your goal is playful weirdness rather than a haunted look, stay on this page.',
    uniqueH2: 'Freaky Text Styles for Usernames and Bios',
    uniqueBody: [
      'Usernames are where freaky text earns its keep, because a distorted handle stands out in a member list or leaderboard where every other name is plain. Flipped text is the strongest single effect: it stays readable enough to be recognised while looking obviously wrong. Reversed text is subtler and often gets mistaken for a typo, which can be exactly the point.',
      'Bios give you more room, so a symbol-framed line or a light glitch effect works better there than in a cramped username field. A practical approach is to distort one short line and leave the rest plain, so people can still read what you actually do. Some platforms reject unusual characters in account handles while allowing them in display names, so test the handle first and keep the styling in the display name if it is refused.',
    ],
    examplesTitle: 'Freaky Text Examples',
    examplesIntro: 'Paste any of these into the generator to see how the different chaos levels handle short phrases versus single words.',
    examples: [['Stay Weird', 'Short bio line'], ['Freak Show', 'Display name idea'], ['No Rules', 'Gaming tag']],
    linksTitle: 'Explore the Alternative Font Cluster',
    links: [
      ['Weird Font Generator', '/weird-font-generator.html', 'Stranger and funnier, without the corrupted edge.'],
      ['Glitch Text Generator', '/glitch-text-generator.html', 'Zalgo and digital corruption with intensity control.'],
      ['Creepy Font Generator', '/creepy-font-generator.html', 'Quieter, eerier text for an unsettling mood.'],
      ['Aesthetic Fonts', '/aesthetic-fonts.html', 'The wider hub of Unicode style categories.'],
      ['Cursive Text Generator', '/', 'Flowing script instead of chaos.'],
    ],
    faqTitle: 'Freaky Font FAQ',
    faqs: [
      ['What is a freaky font generator?', 'It is a tool that maps ordinary letters onto strange Unicode characters and adds symbols or combining marks, producing text that looks distorted, flipped or corrupted. No font is installed — the result is plain text made of unusual characters.'],
      ['How do I make freaky text?', 'Type your word or phrase into the box above, then compare the generated styles. Flipped, reversed and glitch-marked results give the strongest freaky effect. Press Copy beside the one you want.'],
      ['Can I copy freaky fonts?', 'Yes. Every result is copyable Unicode text rather than a picture or a CSS style, so the effect stays with the characters when you paste them somewhere else.'],
      ['Do freaky fonts work on Discord?', 'They generally work in messages, nicknames and server display names. Discord does restrict some characters in unique account handles, so if a style is rejected there, apply it to your display name instead.'],
      ['Can I use freaky text in usernames?', 'Often, yes, but each platform sets its own rules. Short flipped or reversed handles tend to be accepted more widely than styles that rely on stacked combining marks.'],
      ['Why does freaky text look different on another device?', 'Unusual Unicode characters are drawn by whichever font the receiving device has available. Most modern phones and browsers render them, but the exact shapes and spacing can shift.'],
      ['Is the freaky text generator free?', 'Yes. It runs entirely in your browser, needs no account and has no usage limit.'],
    ],
  },

  creepy: {
    file: 'creepy-font-generator.html',
    label: 'Creepy',
    appName: 'Creepy Font Generator',
    crumb: 'Creepy Fonts',
    sample: 'Lost Soul',
    title: 'Creepy Font Generator – Creepy Text Copy & Paste',
    h1: 'Creepy Font Generator',
    kicker: 'Eerie, haunted and quietly unsettling',
    description: 'Free creepy font generator — make eerie, haunted, subtly corrupted Unicode text. Copy and paste creepy fonts for bios, usernames, captions and dark posts.',
    intro: 'Make text that feels wrong in a quiet way. This creepy font generator leans on thin gothic letterforms, faint combining marks and eerie symbols rather than loud horror graphics. The result is haunted-looking text you can copy and paste into a bio, caption or username.',
    ids: 'zalgo-light,fraktur,dec-d-dk2,fraktur-cm-dotBelow,double-d-dk9,smallCaps-d-dk4,fraktur-cm-strike,dec-d-dk8,italic-d-dk8,zalgo-medium,dec-d-dk12,fraktur-d-dk4,fraktur-cm-ring,dec-d-dk7',
    chips: [['all', 'All'], ['creepy', 'Eerie'], ['glitch', 'Corrupted'], ['gothic', 'Haunted'], ['scary', 'Dark'], ['weird', 'Strange']],
    copyHeading: 'Creepy Fonts Copy and Paste',
    copyBody: 'These creepy styles are Unicode characters, which is why they can be copied at all. A page that simply applied a spooky webfont with CSS would look right on screen and paste as ordinary text. Here the eerie letterforms and marks are part of the characters, so the unsettling look travels with them into other apps.',
    popularTitle: 'Popular Creepy Text Styles',
    popular: 'Creepy works through restraint. A single mark under each letter reads as decay rather than damage. Thin blackletter suggests something old without shouting about it. A faint strikethrough makes text look partly erased. Candles, watching eyes and cobwebs add atmosphere in one character. The moment you stack too many effects the mood tips over into cartoon horror, which belongs on the scary page instead.',
    howToTitle: 'How to Use the Creepy Font Generator',
    steps: [
      ['1. Enter your text', 'Short, ominous phrases work better than long sentences. Names and two-word lines read best.'],
      ['2. Choose an eerie style', 'Filter between haunted letterforms, subtle corruption and dark decorative symbols.'],
      ['3. Copy and paste', 'Copy the result and paste it into a bio, caption, nickname or message.'],
    ],
    socialTitle: 'Where Creepy Text Works Best',
    social: 'Creepy text fits eerie usernames, spooky bios, dark-aesthetic captions, horror community profiles and atmospheric Discord nicknames. It also works for fiction accounts, ARG-style posts and playlist titles. Because the effect is subtle, it survives in small text where louder horror styling would just look cluttered.',
    limitNote: 'combining marks can be announced oddly by screen readers, so keep names, links and instructions in plain text.',
    specificTitle: 'What Makes Text Look Creepy',
    specific: 'Three things do most of the work. Unfamiliar letterforms slow reading down, which makes a phrase feel off before you can say why. Marks that sit slightly below or through a letter suggest damage or age. Sparse dark symbols supply context — a candle or a cobweb frames the words as something abandoned. Notice that none of these depend on gore or shock; the unsettling part is the mismatch between ordinary words and characters that look wrong.',
    uniqueH2: 'Creepy and Eerie Text Styles',
    uniqueBody: [
      'The thin blackletter styles are the backbone of this page. Because Fraktur letterforms are genuinely old, they carry an antique, faintly funereal association that a modern typeface cannot fake. Pair one with a single dotted or ring mark and the text starts to look weathered.',
      'The lightly corrupted styles sit between clean text and full glitch. One or two combining marks per character reads as interference or decay, while heavier stacking reads as digital corruption and belongs on the glitch page. If you want an eerie mood that still lets people read your name, stay with the lighter options here and use the medium corruption sparingly, as a single accent line.',
    ],
    examplesTitle: 'Creepy Text Examples',
    examplesIntro: 'Try these phrases in the generator to see how eerie styling behaves on short, ominous lines.',
    examples: [['Don’t Look Back', 'Caption line'], ['Lost Soul', 'Username idea'], ['The Unknown', 'Profile heading']],
    linksTitle: 'Explore the Alternative Font Cluster',
    links: [
      ['Scary Font Generator', '/scary-font-generator.html', 'Louder horror styling for Halloween and gaming.'],
      ['Gothic Font Generator', '/gothic-font-generator.html', 'Elegant blackletter without the eerie marks.'],
      ['Freaky Font Generator', '/freaky-font-generator.html', 'Chaotic and distorted rather than haunted.'],
      ['Glitch Text Generator', '/glitch-text-generator.html', 'Turn the corruption up with controlled zalgo.'],
      ['Aesthetic Fonts', '/aesthetic-fonts.html', 'Browse every Unicode style category.'],
    ],
    faqTitle: 'Creepy Font FAQ',
    faqs: [
      ['How do I make creepy-looking text?', 'Type your phrase above and choose a style that combines an unusual letterform with a light mark or a dark symbol. Subtle effects read as creepy; heavy ones read as horror.'],
      ['What makes text look creepy?', 'Unfamiliar letter shapes, marks that appear to damage or age the characters, and sparse eerie symbols. Together they make ordinary words feel slightly wrong without being illegible.'],
      ['Can I copy and paste creepy fonts?', 'Yes. Each result is standard Unicode text, so the styling stays intact when you copy it into another app rather than reverting to plain letters.'],
      ['Do creepy fonts work on social media?', 'They usually work in bios, captions, display names and messages on Instagram, TikTok and Discord. Account handles have stricter character rules than display fields.'],
      ['Is creepy text the same as zalgo?', 'No. Zalgo stacks many combining marks for a heavily corrupted look. The creepy styles here use one or two marks at most, so the text stays readable and eerie rather than destroyed.'],
      ['Why do some creepy letters look like boxes?', 'A box appears when the device has no glyph for that character. It is a font coverage gap on the receiving device, not an error in the copied text.'],
      ['Is this creepy text generator free?', 'Yes, completely, with no sign-up and no download.'],
    ],
  },

  weird: {
    file: 'weird-font-generator.html',
    label: 'Weird',
    appName: 'Weird Font Generator',
    crumb: 'Weird Fonts',
    sample: 'Odd One',
    title: 'Weird Font Generator – Weird Text & Fonts Copy Paste',
    h1: 'Weird Font Generator',
    kicker: 'Strange, funny and gleefully experimental',
    description: 'Free weird font generator — upside-down text, tiny letters, bubble text, mirrored words and strange Unicode symbols. Copy and paste weird fonts instantly.',
    intro: 'Flip your words upside down, shrink them to tiny letters, wrap them in bubbles or reverse them entirely. This weird font generator collects the strange, funny and experimental corners of Unicode. Nothing here is horror-themed — it is odd for the fun of it, and all of it copies and pastes.',
    ids: 'upside-down,reversed,alternating,circled,superscript,parenthesized,spaced-fw,dec-d-wd4,circled-d-wd3,dec-d-wd1,subscript,fullwidth-d-wd2,superscript-d-wd5,smallCaps',
    chips: [['all', 'All'], ['weird', 'Weird'], ['bubble', 'Bubble'], ['symbols', 'Tiny & Odd'], ['aesthetic', 'Experimental'], ['gaming', 'Fun']],
    copyHeading: 'Weird Fonts Copy and Paste',
    copyBody: 'The oddness in these styles is stored in the characters, not in a stylesheet. Unicode contains whole alternative alphabets — circled letters, tiny superscript letters, full-width letters — plus a set of upside-down shapes people have repurposed as a flipped alphabet. Copying moves those actual characters, which is why weird text keeps working after you paste it.',
    popularTitle: 'Popular Weird Text Styles',
    popular: 'Upside-down text is the most recognisable weird style and still the most fun, because it forces a reader to stop and rotate their head. Tiny superscript letters shrink a phrase to a whisper. Circled and bracketed letters look like game UI or a board game. Alternating case became internet shorthand for mocking a statement. Full-width letters stretch a phrase into that wide, slightly absurd look borrowed from old computer displays.',
    howToTitle: 'How to Use the Weird Font Generator',
    steps: [
      ['1. Enter your text', 'Type any word or phrase. Weird styles handle short entries best, especially the tiny alphabets.'],
      ['2. Try a different alphabet', 'Switch between flipped, tiny, bubble and stretched styles with the filter chips.'],
      ['3. Copy and paste', 'Hit Copy, then paste the strange version wherever plain text is accepted.'],
    ],
    socialTitle: 'Where to Use Weird Text',
    social: 'Weird text suits funny usernames, joke replies, meme captions, unusual bios, Discord nicknames and experimental profiles. Alternating case is popular for sarcastic quote-tweets. Upside-down text works as a punchline when the rest of a post is normal. Tiny letters make good asides and footnote-style lines under a main caption.',
    limitNote: 'tiny and flipped alphabets are incomplete in Unicode, so a few letters fall back to their closest available match or stay unchanged.',
    specificTitle: 'Strange Fonts and Unusual Alphabets',
    specific: 'Most of these styles are not fonts in the traditional sense. They are separate character ranges that Unicode added for maths, phonetics or older computing systems, then people noticed they resemble styled letters and started using them decoratively. Circled letters came from technical notation. Full-width letters exist because East Asian typesetting needs Latin characters at the same width as its own. Upside-down text is the odd one out: it is assembled from unrelated characters that happen to look like rotated letters.',
    uniqueH2: 'Weird Letters, Symbols and Text Styles',
    uniqueBody: [
      'Weird is deliberately not scary. Where the creepy and scary pages reach for skulls and haunted letterforms, this page stays with the funny and the bizarre: aliens, dice, question marks, wiggles and alphabets that look like they escaped from a different system. That difference matters when you are picking a style for a joke rather than a mood.',
      'Some weird alphabets are incomplete, and it is worth knowing which. The tiny superscript set is missing a handful of clean uppercase letters, and subscript is missing more. Flipped text has no genuine rotated form for several capitals. The generator substitutes the closest available character, so preview your exact word before committing to it — a name that contains one of the gaps will look inconsistent.',
    ],
    examplesTitle: 'Weird Text Examples',
    examplesIntro: 'Drop these into the generator to see how each alternative alphabet handles everyday phrases.',
    examples: [['Hello World', 'Classic test phrase'], ['Odd One', 'Username idea'], ['What Is This', 'Meme caption']],
    linksTitle: 'Explore the Alternative Font Cluster',
    links: [
      ['Freaky Font Generator', '/freaky-font-generator.html', 'Push the strangeness toward chaotic and distorted.'],
      ['Glitch Text Generator', '/glitch-text-generator.html', 'Corrupted and zalgo text with intensity levels.'],
      ['Aesthetic Fonts', '/aesthetic-fonts.html', 'Cleaner Unicode styles for bios and captions.'],
      ['Cursive Text Generator', '/', 'The classic flowing script generator.'],
    ],
    faqTitle: 'Weird Font FAQ',
    faqs: [
      ['How do I make weird text?', 'Type a word above and compare the alternative alphabets — flipped, tiny, circled, stretched and mirrored. Copy whichever looks strangest for your purpose.'],
      ['Why do weird fonts work when pasted?', 'Because they are not fonts. Each style swaps your letters for different Unicode characters that already look that way, so the appearance is part of the text itself and survives copying.'],
      ['What are weird Unicode letters?', 'They are alternative character sets Unicode includes for maths, phonetics and legacy computing — such as circled letters, superscript letters and full-width letters — which people reuse as decorative alphabets.'],
      ['Can I create weird usernames?', 'Yes, where the platform allows non-standard characters. Flipped and circled styles are usually accepted in display names; strict account handles may reject them.'],
      ['Why are some letters missing or unchanged?', 'Several of these alphabets are incomplete in Unicode. When no matching character exists, the generator leaves the original letter or uses the nearest equivalent.'],
      ['Is weird text the same as glitch text?', 'No. Weird text swaps letters for other odd letters. Glitch text keeps your letters and piles combining marks on top of them for a corrupted look.'],
      ['Does the weird font generator cost anything?', 'No. It is free, browser-based and does not require an account.'],
    ],
  },

  glitch: {
    file: 'glitch-text-generator.html',
    label: 'Glitch',
    appName: 'Glitch Text Generator',
    crumb: 'Glitch Text',
    sample: 'SYSTEM ERROR',
    maxlength: 60,
    title: 'Glitch Text Generator – Glitch & Zalgo Text Copy Paste',
    h1: 'Glitch Text Generator',
    kicker: 'Controlled corruption, from a flicker to full zalgo',
    description: 'Free glitch text generator with light, medium and heavy zalgo levels. Make corrupted, broken, glitchy text and copy and paste it anywhere. No install needed.',
    intro: 'Corrupt your text on purpose. This glitch text generator stacks combining marks over each letter to produce anything from a faint flicker to full zalgo, plus digital styles built from static blocks and broken frames. Pick a glitch level, then copy the corrupted result straight into a post, name or bio.',
    ids: 'zalgo-light,zalgo-medium,zalgo-heavy,cm-strike,cm-slash,monospace-d-fr1,monospace-cm-strike,dec-d-fr7,double-d-fr6,fullwidth-d-fr5,monospace,dec-d-fr1,double-cm-slash,fullwidth-cm-strike',
    chips: [['all', 'All'], ['light', 'Light'], ['medium', 'Medium'], ['heavy', 'Heavy'], ['zalgo', 'Zalgo'], ['glitch', 'Corrupted']],
    copyHeading: 'Glitch Text Copy and Paste',
    copyBody: 'Glitch text is not an image or an animation. Each character keeps its normal letter underneath and gains combining marks stacked above, through and below it, which is why the corruption survives copy and paste. Because the marks are real characters, a glitched string is longer than it looks — a ten-letter word at heavy intensity carries around a hundred characters, which matters where there is a length limit.',
    popularTitle: 'Popular Glitch Text Styles',
    popular: 'Zalgo is the headline effect and the reason most people arrive here, but it is not the only way to look corrupted. Strikethrough and slashed text suggest redaction or a broken record. Monospace with static blocks reads as a terminal losing signal. Full-width letters with signal bars borrow the look of a failing display. Choose based on what kind of failure you are imitating: organic decay, digital dropout or censored text.',
    howToTitle: 'How to Use the Glitch Text Generator',
    steps: [
      ['1. Enter your text', 'Type up to 60 characters. Short strings glitch more legibly and paste more reliably.'],
      ['2. Set the glitch level', 'Use the Light, Medium and Heavy chips to control how many combining marks are stacked on each character.'],
      ['3. Copy and paste', 'Press Copy and paste the corrupted text into Discord, a caption, a username or a post.'],
    ],
    socialTitle: 'Where Glitch Text Works Best',
    social: 'Glitch text suits gaming profiles, cyberpunk and vaporwave posts, Discord names and status lines, horror and ARG accounts, and social posts that want to look like something went wrong. Light glitch is safe almost anywhere. Heavy glitch is best kept to a single line, because tall stacks of marks overlap the lines above and below in most chat apps.',
    limitNote: 'some apps strip or normalise combining marks, and a few reject heavily glitched text in username fields. Light and medium levels paste successfully in far more places than heavy.',
    specificTitle: 'How the Glitch Levels Work',
    specific: 'Light adds one mark above and one below each character, so words stay readable and paste almost anywhere. Medium raises that to two above, one through and two below, which is the point where text starts to look genuinely damaged. Heavy uses four above, two through and four below — ten marks per character, which is the hard ceiling this tool enforces. Input is capped at 80 transformed characters and the box accepts 60, because uncapped zalgo generators are the ones that freeze phones. Every result is regenerated randomly, so pressing a key gives you a fresh variation of the same intensity.',
    uniqueH2: 'Glitch, Zalgo and Corrupted Text',
    uniqueBody: [
      'Zalgo text works because Unicode lets an unlimited number of combining marks attach to a single base character. Those marks were designed for languages that stack accents, but nothing stops you from stacking forty of them, and the result spills vertically out of its line. That overflow is the entire visual effect, and it is also why unrestricted zalgo has a reputation for breaking layouts and stalling browsers.',
      'This generator deliberately caps the stack at ten marks per character. That is enough to read as clearly corrupted while staying responsive on a phone and predictable when pasted. If you have seen glitch tools that let you drag a slider into the thousands, the difference is not capability but restraint — the uncapped output tends to be rejected by chat apps, truncated by character limits, or slow enough to lock the tab that generated it.',
    ],
    examplesTitle: 'Glitch Text Examples',
    examplesIntro: 'Paste these into the generator and step through Light, Medium and Heavy to compare the intensity levels on the same string.',
    examples: [['SYSTEM ERROR', 'Classic glitch line'], ['NO SIGNAL', 'Status or bio line'], ['ACCESS DENIED', 'Gaming profile text']],
    linksTitle: 'Explore the Alternative Font Cluster',
    links: [
      ['Freaky Font Generator', '/freaky-font-generator.html', 'Chaotic and distorted text beyond corruption.'],
      ['Weird Font Generator', '/weird-font-generator.html', 'Flipped, tiny and bubble alphabets.'],
      ['Scary Font Generator', '/scary-font-generator.html', 'Pair corruption with horror symbols.'],
      ['Creepy Font Generator', '/creepy-font-generator.html', 'Use corruption sparingly for an eerie mood.'],
      ['Aesthetic Fonts', '/aesthetic-fonts.html', 'The full catalogue of Unicode text styles.'],
    ],
    faqTitle: 'Glitch Text FAQ',
    faqs: [
      ['What is glitch text?', 'Glitch text is ordinary text with combining marks stacked over, through and under each character so it looks corrupted or damaged, as if the rendering had failed.'],
      ['What is Zalgo text?', 'Zalgo is the best-known form of glitch text. It stacks large numbers of combining diacritical marks on each letter until the text spills out of its line, named after an internet horror meme.'],
      ['How does a glitch text generator work?', 'It keeps your original letters and appends randomly chosen combining marks to each one. The marks render on top of the base character instead of beside it, which produces the overflowing effect.'],
      ['Why does glitch text use combining characters?', 'Combining characters exist so writing systems can attach accents to letters. Because Unicode does not limit how many can attach to one character, they can be stacked far beyond their intended purpose.'],
      ['Can glitch text break layouts?', 'Heavily stacked zalgo can overlap neighbouring lines and, in extreme cases, slow down rendering. This tool caps the stack at ten marks per character and limits input length specifically to avoid that.'],
      ['Can I control glitch intensity?', 'Yes. The Light, Medium and Heavy chips above the results set how many marks are added per character, from two at Light up to ten at Heavy.'],
      ['Does glitch text work on Discord and Instagram?', 'Light and medium glitch generally paste fine into messages, bios and display names. Heavy glitch is sometimes stripped or rejected, particularly in username fields.'],
      ['Why does the result change every time I type?', 'The marks are chosen at random, so each keystroke regenerates a new variation at the same intensity. Copy the version you like before editing the text further.'],
    ],
  },

  scary: {
    file: 'scary-font-generator.html',
    label: 'Scary',
    appName: 'Scary Font Generator',
    crumb: 'Scary Fonts',
    sample: 'Enter If You Dare',
    title: 'Scary Font Generator – Horror & Spooky Text Copy Paste',
    h1: 'Scary Font Generator',
    kicker: 'Horror weight, spooky symbols and Halloween text',
    description: 'Free scary font generator — horror text, spooky fonts, Halloween styles with skulls, bats and pumpkins. Copy and paste scary fonts for names, bios and posts.',
    intro: 'Give your words a horror treatment. This scary font generator combines heavy gothic letterforms with skulls, bats, spiders and pumpkins, plus corrupted text for a genuinely damaged look. Everything is copyable Unicode, ready for Halloween posts, horror usernames and spooky gaming tags.',
    ids: 'boldFraktur,boldFraktur-d-dk1,zalgo-heavy,dec-d-dk6,boldFraktur-d-dk6,dec-d-dk11,boldFraktur-d-dk3,fraktur-d-dk7,dec-d-dk5,bold-d-dk11,boldFraktur-d-dk5,zalgo-medium,dec-d-dk3,boldFraktur-cm-wavy',
    chips: [['all', 'All'], ['scary', 'Horror'], ['halloween', 'Halloween'], ['gothic', 'Dark Gothic'], ['glitch', 'Corrupted'], ['gaming', 'Gaming']],
    copyHeading: 'Scary Fonts Copy and Paste',
    copyBody: 'Scary styling here comes from characters, not from an installed horror font. That is what makes it portable: the heavy blackletter letters, the skulls and the corruption marks are all Unicode, so pasting them into a Discord server name or a Halloween caption keeps the effect intact. A CSS horror font would look right on this page and arrive as plain text everywhere else.',
    popularTitle: 'Popular Scary Text Styles',
    popular: 'Heavy blackletter is the workhorse — it is dense, sharp and instantly reads as horror movie title. Skulls and bats do the rest of the work in a single character, which keeps short names readable. Corrupted text is the most aggressive option and suits horror handles more than Halloween party captions. Pumpkins are seasonal and specific, so they land well in October and look out of place in March.',
    howToTitle: 'How to Use the Scary Font Generator',
    steps: [
      ['1. Enter your text', 'Type a name, greeting or short horror phrase. Two to four words is the sweet spot.'],
      ['2. Choose a horror style', 'Filter between heavy gothic, Halloween symbols, corrupted text and gaming-ready frames.'],
      ['3. Copy and paste', 'Copy the styled result into a caption, username, server name or invitation.'],
    ],
    socialTitle: 'Where to Use Scary Text',
    social: 'Scary text is built for Halloween captions and party invitations, horror usernames, spooky bios, gaming tags, horror-themed Discord servers and channel names, and October content across Instagram and TikTok. Symbol-framed styles read clearly at small sizes, which makes them a safer choice for usernames than the corrupted styles.',
    limitNote: 'emoji symbols like skulls and pumpkins are drawn differently on iPhone, Android and desktop, so a design that looks balanced on one device may sit differently on another.',
    specificTitle: 'Horror Fonts, Spooky Symbols and Halloween Text',
    specific: 'There are three levers on this page and they are worth using deliberately. Letterform weight sets the baseline mood — heavy blackletter is menacing, lighter gothic is merely old. Symbols set the subject: a skull is horror year-round, a pumpkin is specifically Halloween, a bat sits between the two. Corruption sets the intensity, and it is the one people overuse. A skull plus heavy blackletter is usually scarier than the same phrase buried under combining marks, because the reader can still make out the words.',
    uniqueH2: 'Scary Fonts for Halloween and Horror Text',
    uniqueBody: [
      'Halloween text and horror text are not quite the same job. Halloween styling is festive and wants to be readable — an invitation or a party caption still has to communicate a date and a place, so the styling belongs on the heading and not the details. Horror styling for a username or a fiction account can afford to be less legible, because the mood is the message.',
      'For seasonal posts, pick one symbol and repeat it rather than mixing pumpkins, skulls, bats and spiders in a single line. A consistent motif reads as design; four different symbols read as clip art. If you are naming a Discord server or a gaming squad, test the styled name at the size it will actually appear, since horror symbols lose their shape in small member lists.',
    ],
    examplesTitle: 'Scary Text Examples',
    examplesIntro: 'Try these in the generator to compare festive Halloween styling against heavier horror treatments.',
    examples: [['Happy Halloween', 'Seasonal caption'], ['Enter If You Dare', 'Party invitation line'], ['Nightmare', 'Horror username idea']],
    linksTitle: 'Explore the Alternative Font Cluster',
    links: [
      ['Creepy Font Generator', '/creepy-font-generator.html', 'Quieter and eerier, without the horror symbols.'],
      ['Gothic Font Generator', '/gothic-font-generator.html', 'Blackletter styling without the skulls.'],
      ['Glitch Text Generator', '/glitch-text-generator.html', 'Add controlled corruption at three intensities.'],
      ['Freaky Font Generator', '/freaky-font-generator.html', 'Chaotic and strange rather than frightening.'],
      ['Aesthetic Fonts', '/aesthetic-fonts.html', 'Every Unicode style category in one place.'],
    ],
    faqTitle: 'Scary Font FAQ',
    faqs: [
      ['How do I make scary text?', 'Type your phrase above and choose a heavy gothic style, optionally framed with a skull, bat or spider. Copy the result and paste it wherever you need it.'],
      ['What fonts look good for Halloween?', 'Heavy blackletter with a pumpkin or bat symbol reads as Halloween immediately while staying readable. Keep dates, times and addresses in normal text so guests can read them.'],
      ['Can I copy scary fonts into Discord?', 'Yes. The styles work in messages, nicknames, server names and channel names. Very heavily corrupted text is occasionally rejected in unique account handles.'],
      ['What is a horror font generator?', 'It is a tool that converts your text into Unicode characters and symbols that carry horror associations — dense blackletter letterforms, skulls, bats and corrupted marks — for copy and paste use.'],
      ['Are scary fonts real installable fonts?', 'No. These are Unicode characters that resemble a horror typeface. That is a limitation for print design but an advantage online, because the look travels with the copied text.'],
      ['Why do the skulls and pumpkins look different on my phone?', 'Emoji artwork is supplied by the operating system, so Apple, Google and Microsoft each draw the same character differently.'],
      ['Is the scary text generator free?', 'Yes. There is no charge, no account and no download.'],
    ],
  },

  gothic: {
    file: 'gothic-font-generator.html',
    label: 'Gothic',
    appName: 'Gothic Font Generator',
    crumb: 'Gothic Fonts',
    sample: 'Dark Romance',
    title: 'Gothic Font Generator – Gothic & Blackletter Text',
    h1: 'Gothic Font Generator',
    kicker: 'Blackletter, medieval and elegantly dark',
    description: 'Free gothic font generator — blackletter, Fraktur and Old English style Unicode text. Copy and paste gothic fonts for names, bios, headings and tattoos.',
    intro: 'Write in blackletter. This gothic font generator uses Unicode Fraktur — the mathematical alphabet that mirrors medieval blackletter scripts — in both regular and bold weight, framed with crosses, fleur-de-lis and other ornamental characters. The result is elegant and old rather than frightening, and it copies and pastes as text.',
    ids: 'fraktur,boldFraktur,fraktur-d-fn9,boldFraktur-d-fn8,fraktur-d-c3,fraktur-d-gt2,fraktur-d-gt1,boldFraktur-d-fn2,fraktur-d-dk10,fraktur-cm-dotBelow,boldFraktur-d-fn1,fraktur-d-fn7,italic-d-gt4,boldFraktur-cm-wavy',
    chips: [['all', 'All'], ['gothic', 'Blackletter'], ['fancy', 'Ornate'], ['bold', 'Bold'], ['aesthetic', 'Elegant'], ['gaming', 'Medieval']],
    copyHeading: 'Gothic Fonts Copy and Paste',
    copyBody: 'This matters more on this page than on most: real gothic typefaces are font files, and a website that shows you blackletter with CSS gives you plain letters when you copy. The styles here are Unicode Mathematical Fraktur characters, which genuinely look like blackletter and genuinely survive copying. The trade-off is that you get one fixed design per weight rather than the full control a licensed typeface would give you.',
    popularTitle: 'Popular Gothic Text Styles',
    popular: 'Regular Fraktur is the more faithful blackletter — narrow, angular and closer to what a medieval scribe produced. Bold Fraktur is heavier and reads better at small sizes and on dark backgrounds, which is why it dominates gothic usernames. Ornamental framing does the rest: a cross or fleur-de-lis says medieval, an ornate bracket says heraldic, and a wilted rose pushes the mood toward romantic gothic without tipping into horror.',
    howToTitle: 'How to Use the Gothic Font Generator',
    steps: [
      ['1. Enter your text', 'Type a name, title or short phrase. Blackletter suits headings and names more than long paragraphs.'],
      ['2. Choose a gothic style', 'Compare regular and bold Fraktur, then filter to ornate and elegant framing options.'],
      ['3. Copy and paste', 'Copy the blackletter result into a bio, display name, heading or message.'],
    ],
    socialTitle: 'Where Gothic Text Works Best',
    social: 'Gothic text works for gothic and dark-aesthetic usernames, band and music profiles, medieval or fantasy gaming names, decorative headings, tattoo mock-ups and profile bios that want an old, formal weight. Because blackletter is dense, it is far more legible as a short name or heading than as a full sentence.',
    limitNote: 'blackletter is genuinely hard to read at small sizes, and Unicode Fraktur has no lowercase-to-uppercase styling options, so preview your exact name before using it.',
    specificTitle: 'Gothic Text vs Old English and Blackletter',
    specific: 'These three terms get used interchangeably online and mostly describe the same visual family. Blackletter is the accurate typographic name for the dense, angular script used across Europe from roughly the twelfth century. Fraktur is one specific blackletter style, and it is the one Unicode encoded. Old English is a font name popularised by tattoo and certificate lettering, and confusingly it is also the name of a language that has nothing to do with the typeface. When people search for any of the three online, they are almost always looking for what this page produces.',
    uniqueH2: 'Gothic, Blackletter and Medieval Text Styles',
    uniqueBody: [
      'Gothic is not a horror style, which is the most common mistake when picking one. Blackletter carries associations with manuscripts, formal certificates, newspaper mastheads and metal album art — old and serious rather than frightening. If you want a haunted or spooky mood instead, the creepy and scary pages combine these same letterforms with eerie marks and horror symbols; this page keeps them clean.',
      'One practical limitation is worth knowing before you use blackletter for something permanent. Unicode Fraktur is a fixed set of characters, so you cannot adjust the weight, spacing or letterforms the way you could with a real typeface, and a handful of letters are drawn from separate Unicode blocks and may look slightly inconsistent in some fonts. For a tattoo or a printed piece, use this generator to explore the look, then have a designer set it in a licensed blackletter typeface.',
    ],
    examplesTitle: 'Gothic Text Examples',
    examplesIntro: 'Try these phrases to see how blackletter handles names, single words and short romantic lines.',
    examples: [['Dark Romance', 'Profile heading'], ['Black Rose', 'Username idea'], ['Eternal', 'Tattoo mock-up word']],
    linksTitle: 'Explore the Alternative Font Cluster',
    links: [
      ['Scary Font Generator', '/scary-font-generator.html', 'The same blackletter plus horror symbols.'],
      ['Creepy Font Generator', '/creepy-font-generator.html', 'Eerie marks over thin gothic letterforms.'],
      ['Aesthetic Fonts', '/aesthetic-fonts.html', 'Browse gothic alongside every other style category.'],
      ['Cursive Text Generator', '/', 'Flowing script for a softer, more classical look.'],
    ],
    faqTitle: 'Gothic Font FAQ',
    faqs: [
      ['What is a Gothic font generator?', 'It converts ordinary letters into Unicode Fraktur characters, which reproduce the look of blackletter script. The output is text, not an image or an installed font.'],
      ['What is blackletter text?', 'Blackletter is the dense, angular script used across Europe from about the twelfth century onward, in manuscripts and early printing. Fraktur is one of its best-known styles.'],
      ['Is Gothic text the same as Old English?', 'Visually, yes — Old English is a popular font name for the same blackletter family. Note that Old English is also the name of a historical language, which is unrelated to the lettering style.'],
      ['Can Gothic Unicode text be copied?', 'Yes. Unlike a CSS webfont preview, these are real characters, so the blackletter appearance stays with the text when you copy and paste it.'],
      ['Where can I use Gothic text?', 'Display names, bios, headings, band and gaming profiles, and messages on any app that accepts Unicode. Keep body text and important details in normal characters for readability.'],
      ['Why do a few gothic letters look different from the rest?', 'Several Fraktur letters live in a separate Unicode block for historical reasons, so some fonts draw them in a slightly different style to the others.'],
      ['Can I use this for a tattoo design?', 'Use it to explore the look, but have a designer set the final artwork in a licensed blackletter typeface. A real font gives control over weight, spacing and letterform that Unicode characters cannot.'],
      ['Is the gothic text generator free?', 'Yes. It is free, requires no sign-up and works in the browser.'],
    ],
  },
};

// ── Validate every configured style id against the live engine ────────────────
const engineSrc = fs.readFileSync(path.join(root, 'assets', 'style-engine.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(engineSrc, sandbox);
const known = new Set(sandbox.window.StyleEngine.STYLES.map((s) => s.id));

let failed = false;
for (const [key, p] of Object.entries(pages)) {
  const missing = p.ids.split(',').filter((id) => !known.has(id));
  if (missing.length) {
    console.error(`✗ ${key}: unknown style ids → ${missing.join(', ')}`);
    failed = true;
  }
}
if (failed) process.exit(1);

// ── Report preset overlap so the pages cannot drift into near-duplicates ─────
const keys = Object.keys(pages);
for (let i = 0; i < keys.length; i++) {
  for (let j = i + 1; j < keys.length; j++) {
    const a = new Set(pages[keys[i]].ids.split(','));
    const b = pages[keys[j]].ids.split(',');
    const shared = b.filter((id) => a.has(id));
    const pct = Math.round((shared.length / Math.max(a.size, b.length)) * 100);
    if (pct >= 40) console.warn(`! ${keys[i]} / ${keys[j]} share ${pct}% of presets`);
  }
}

for (const p of Object.values(pages)) {
  const html = renderClusterPage(p);
  fs.writeFileSync(path.join(root, p.file), html);
  fs.writeFileSync(path.join(root, 'public', p.file), html);
}
console.log(`Built ${Object.keys(pages).length} dark cluster pages in root and public mirror.`);
