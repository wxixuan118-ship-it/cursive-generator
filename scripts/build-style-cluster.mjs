// build-style-cluster.mjs — the "text style" cluster: one landing page per
// core Unicode letter style the homepage already offers (bold, italic, small
// text, bubble, strikethrough, upside down).
//
// Same shape as build-aesthetic-cluster.mjs / build-dark-cluster.mjs: nothing
// here renders text. Transforms live in assets/style-engine.js, the generator
// UI in assets/aesthetic-cluster.js, and the HTML shell in
// scripts/lib/cluster-template.mjs. A page is a config object; add a seventh
// style page by adding a seventh entry below and running:
//
//   node scripts/build-style-cluster.mjs
//
// Every `ids` entry is validated against the live engine, and preset overlap
// is reported against every other cluster page on the site so a new page
// cannot quietly become a near-duplicate of an existing one.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { renderClusterPage } from './lib/cluster-template.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const pages = {
  bold: {
    file: 'bold-font-generator.html',
    label: 'Bold',
    appName: 'Bold Font Generator',
    crumb: 'Bold Fonts',
    sample: 'Bold Text',
    title: 'Bold Font Generator – Bold Text Copy & Paste (𝐁𝐨𝐥𝐝, 𝗦𝗮𝗻𝘀, 𝓒𝓾𝓻𝓼𝓲𝓿𝓮)',
    h1: 'Bold Font Generator',
    kicker: 'Serif bold, sans bold, bold italic, bold cursive and bold gothic',
    description: 'Free bold font generator — turn plain text into bold Unicode letters you can copy and paste into Instagram, WhatsApp, Discord, LinkedIn and anywhere else. Serif, sans, italic, cursive and gothic bold.',
    intro: 'Make any word heavier. This bold font generator converts your text into real Unicode bold characters — serif bold, sans-serif bold, bold italic, bold cursive, bold gothic and double-struck — so the weight survives when you paste it into a bio, caption, comment or message. No formatting toolbar needed.',
    ids: 'bold,sansBold,boldItalic,sansBoldItalic,boldScript,boldFraktur,double,bold-cm-underline,sansBold-cm-underline,bold-cm-strike,bold-d-s1,sansBold-d-dia1,bold-d-fn7,bold-d-a2,boldScript-d-s1,boldFraktur-d-c1,sansBold-d-j1,bold-d-bk2',
    chips: [['all', 'All'], ['italic', 'Bold Italic'], ['cursive', 'Bold Cursive'], ['gothic', 'Bold Gothic'], ['fancy', 'Framed'], ['glitch', 'Struck']],
    copyHeading: 'Bold Text Copy and Paste',
    copyBody: 'Most apps have no bold button, so people paste bold Unicode instead. The letters above come from the Mathematical Alphanumeric Symbols block: 𝐛𝐨𝐥𝐝 serif, 𝗯𝗼𝗹𝗱 sans, 𝒃𝒐𝒍𝒅 italic and 𝓫𝓸𝓵𝓭 script are all separate characters, not styling applied to normal letters. That is why the weight stays intact in an Instagram bio or a WhatsApp status, where a CSS or rich-text bold would be stripped on paste.',
    popularTitle: 'Popular Bold Text Styles',
    popular: 'Sans-serif bold (𝗔𝗕𝗖) is the most-used style because it looks like a native bold setting on almost every phone. Serif bold (𝐀𝐁𝐂) reads as a headline or book title. Bold italic adds emphasis and movement, bold cursive turns a name into a signature-style flourish, and bold gothic gives a dense blackletter weight. Double-struck (𝔸𝔹ℂ) is technically an outline, but many people use it as a decorative bold for usernames.',
    howToTitle: 'How to Use the Bold Font Generator',
    steps: [
      ['1. Type your text', 'Enter a word, name, heading or short sentence. Numbers convert too in the serif, sans and double-struck styles.'],
      ['2. Choose a weight', 'Use the chips to switch between plain bold, bold italic, bold cursive, bold gothic and framed versions.'],
      ['3. Copy and paste', 'Press Copy next to the style you want, then paste it into your bio, caption, post or message.'],
    ],
    socialTitle: 'Bold Fonts for Instagram, WhatsApp, Discord and LinkedIn',
    social: 'Bold text is the easiest way to make one line stand out in an Instagram bio, an X/Twitter post, a LinkedIn headline or a Facebook caption where no formatting is allowed. In WhatsApp and Discord you can also bold with *asterisks* or **double asterisks**, but that only works inside messages — Unicode bold works in names, statuses and channel topics too. Keep it to a heading or a key phrase; a whole paragraph in bold Unicode is tiring to read.',
    limitNote: 'bold Unicode is not read as “bold” by screen readers — it is announced letter by letter as mathematical symbols — so keep essential information in normal text as well.',
    specificTitle: 'Bold Font Generator vs Bold Cursive Generator',
    specific: 'This page covers every bold weight the engine offers, with plain sans and serif bold first. If you specifically want flowing bold script for a name or signature, the dedicated cursive bold generator narrows the results to bold cursive presets with matching decorations. Use this page for headings, emphasis and clean bold usernames; use the cursive bold page for elegant script.',
    uniqueH2: 'Serif Bold, Sans Bold, Bold Italic and Double Struck: Which to Pick',
    uniqueBody: [
      'Sans bold (𝗦𝗮𝗻𝘀 𝗕𝗼𝗹𝗱) is the safest choice for social media. It matches the system font on iOS and Android closely, so it looks like real formatting rather than a “fancy font”. Serif bold (𝐒𝐞𝐫𝐢𝐟 𝐁𝐨𝐥𝐝) is more editorial and works well for quotes, titles and announcements.',
      'Bold italic and sans bold italic add a slant, which reads as emphasis or a voice change — useful for a tagline under a name. Double struck (𝔻𝕠𝕦𝕓𝕝𝕖) is not heavier than regular text, but its doubled strokes make it look outlined and bold at small sizes, which is why it is popular in gamer tags and Discord names. Bold gothic is the heaviest visual weight on the page and suits dark, metal or medieval themes.',
    ],
    examplesTitle: 'Bold Text Examples',
    examplesIntro: 'Try these in the generator to compare how the same phrase carries in serif bold, sans bold and bold cursive.',
    examples: [['NEW DROP FRIDAY', 'Announcement headline'], ['Alex Rivera', 'Bold display name'], ['Link in bio', 'Bio call to action']],
    linksTitle: 'Explore Related Text Styles',
    links: [
      ['Cursive Bold Generator', '/cursive-bold-generator.html', 'Only bold cursive script, with matching decorations.'],
      ['Italic Font Generator', '/italic-font-generator.html', 'Slanted serif, sans and script letters.'],
      ['Gothic Font Generator', '/gothic-font-generator.html', 'Blackletter and bold Fraktur text.'],
      ['Small Text Generator', '/small-text-generator.html', 'Small caps, superscript and tiny letters.'],
      ['Fancy Text Generator', '/fancy-text-generator.html', 'Browse every style in one place.'],
      ['Cursive Text Generator', '/', 'The site’s classic flowing script styles.'],
    ],
    faqTitle: 'Bold Font FAQ',
    faqs: [
      ['How does a bold font generator work?', 'It swaps each ordinary letter for the matching character in a Unicode bold alphabet, such as 𝐀 for A. Because the result is made of real characters, it can be copied and pasted anywhere text is allowed.'],
      ['Can I make text bold on Instagram?', 'Instagram has no bold button, so the standard approach is to paste bold Unicode text into your bio, name, caption or comment. This generator produces exactly that.'],
      ['Does bold Unicode work in WhatsApp?', 'Yes. WhatsApp also supports *asterisk* bold inside messages, but Unicode bold additionally works in your profile name and “About” status where markdown does not apply.'],
      ['What is the difference between serif bold and sans bold?', 'Serif bold (𝐀𝐁𝐂) has small strokes at the ends of letters and looks like a headline typeface. Sans bold (𝗔𝗕𝗖) has clean ends and resembles the system font on most phones.'],
      ['Will bold text hurt my SEO or accessibility?', 'Search engines and screen readers treat these characters as mathematical symbols, not as bold letters, so avoid using them for anything that must be searched or read aloud. Use them for decoration and emphasis only.'],
      ['Can I bold numbers?', 'Yes. The serif bold, sans bold and double-struck alphabets include digits 0–9. Italic and cursive styles have no bold digits in Unicode, so numbers stay plain in those.'],
      ['Is this bold text generator free?', 'Yes. It is free, runs in your browser, and does not require an account or download.'],
    ],
  },

  italic: {
    file: 'italic-font-generator.html',
    label: 'Italic',
    appName: 'Italic Font Generator',
    crumb: 'Italic Fonts',
    sample: 'Italic Text',
    title: 'Italic Font Generator – Italic Text Copy & Paste (𝘐𝘵𝘢𝘭𝘪𝘤 & 𝒮𝒸𝓇𝒾𝓅𝓉)',
    h1: 'Italic Font Generator',
    kicker: 'Serif italic, sans italic, bold italic and slanted script',
    description: 'Free italic font generator — convert text into italic Unicode letters you can copy and paste into Instagram, X, Facebook, Discord and anywhere without a formatting button. Serif, sans, bold italic and script.',
    intro: 'Add a slant to any word. This italic font generator turns your text into real Unicode italic characters — serif italic, sans italic, bold italic and flowing script — so the emphasis stays when you paste it into a bio, caption, tweet or comment that has no italic option.',
    ids: 'italic,sansItalic,boldItalic,sansBoldItalic,script,boldScript,italic-d-f1,italic-d-cel1,sansItalic-d-s4,boldItalic-d-sp1,italic-d-ae1,sansItalic-d-ae2,boldItalic-d-h2,boldItalic-cm-dotAbove,script-cm-underline,italic-d-j3,sansItalic-d-cu1,italic-d-h1',
    chips: [['all', 'All'], ['bold', 'Bold Italic'], ['cursive', 'Script'], ['aesthetic', 'Aesthetic'], ['cute', 'Cute'], ['love', 'Hearts']],
    copyHeading: 'Italic Text Copy and Paste',
    copyBody: 'Italic Unicode comes from the same mathematical alphabet blocks as bold: 𝑖𝑡𝑎𝑙𝑖𝑐 serif, 𝘪𝘵𝘢𝘭𝘪𝘤 sans and 𝒊𝒕𝒂𝒍𝒊𝒄 bold are distinct characters rather than a slant applied to normal letters. Copy any result above and the italic look travels with the text into Instagram, X, Threads, LinkedIn, Facebook and Discord — places where a rich-text italic would be flattened on paste.',
    popularTitle: 'Popular Italic Text Styles',
    popular: 'Sans italic (𝘈𝘉𝘊) looks closest to a native italic setting on a phone and is the most versatile. Serif italic (𝐴𝐵𝐶) has a classic, book-like feel that suits quotes and titles. Bold italic doubles up on emphasis. Cursive script is technically a different alphabet, but people searching for italic text often want its connected, handwritten slant, so the two script styles are included here as well.',
    howToTitle: 'How to Use the Italic Font Generator',
    steps: [
      ['1. Type your text', 'Enter a quote, name, caption line or short phrase. Letters convert; digits stay plain because Unicode has no italic numerals.'],
      ['2. Pick a slant', 'Switch between serif italic, sans italic, bold italic and script with the filter chips, or browse the decorated variants.'],
      ['3. Copy and paste', 'Press Copy on the style you like and paste it into any app that accepts Unicode text.'],
    ],
    socialTitle: 'Italic Fonts for Instagram, X and Discord',
    social: 'Italic text is the classic way to mark a quote, a book or film title, a thought, or a softer aside in a caption. On X and Threads, where formatting is unavailable, a single italic line stands out in a timeline of plain text. On Instagram it works in bios, captions and comments; on Discord it works in usernames and channel topics where markdown _underscores_ do not. Use italic for one phrase rather than a full post so it keeps its emphasis.',
    limitNote: 'Unicode italic is announced letter by letter by screen readers, and a few sans italic letters can look almost upright on some system fonts.',
    specificTitle: 'Italic vs Cursive: What Is the Difference?',
    specific: 'Italic letters are slanted versions of ordinary print letters — each letter stands alone. Cursive (script) letters are designed to connect and flow like handwriting. Many “italic font” searches actually want cursive, which is why both appear on this page: compare 𝘐𝘵𝘢𝘭𝘪𝘤 with 𝒞𝓊𝓇𝓈𝒾𝓋𝓮 to see which one matches the look in your head. For a full range of cursive styles, use the main cursive text generator.',
    uniqueH2: 'Italic Text for Quotes, Titles and Emphasis',
    uniqueBody: [
      'The traditional uses of italics are quotations, titles of works, foreign words and emphasis, and those carry over to social media. A caption that opens with a quoted line in serif italic and continues in plain text reads naturally, and a book or film title in sans italic signals “this is a title” without quotation marks.',
      'For usernames and display names, sans italic keeps the name readable while making it visibly different from the default font. Bold italic is stronger and better for a tagline or a one-word bio. Avoid italic Unicode for links, hashtags or handles: those are matched literally, and a slanted @name will not link to the real account.',
    ],
    examplesTitle: 'Italic Text Examples',
    examplesIntro: 'Paste one of these into the generator and compare the serif, sans and script versions.',
    examples: [['the art of slowing down', 'Quoted caption line'], ['Mara Ellis', 'Italic display name'], ['currently reading: Dune', 'Title in a bio']],
    linksTitle: 'Explore Related Text Styles',
    links: [
      ['Bold Font Generator', '/bold-font-generator.html', 'Heavy serif, sans, cursive and gothic weights.'],
      ['Cursive Text Generator', '/', 'Connected, handwritten-style script.'],
      ['Calligraphy Text Generator', '/calligraphy-text-generator.html', 'Formal script and calligraphic letters.'],
      ['Aesthetic Fonts', '/aesthetic-fonts.html', 'Wide, spaced and softly decorated styles.'],
      ['Small Text Generator', '/small-text-generator.html', 'Small caps and tiny letters for subtle bios.'],
      ['Fancy Text Generator', '/fancy-text-generator.html', 'Every Unicode style in one searchable list.'],
    ],
    faqTitle: 'Italic Font FAQ',
    faqs: [
      ['How do I make italic text without a formatting button?', 'Type your text here, copy an italic style, and paste it. The slant is built into the Unicode characters, so it works in apps that have no italic option.'],
      ['Can I use italic text on Instagram or X?', 'Yes. Neither platform offers italic formatting, so pasted Unicode italic is the standard way to get italic text in bios, captions, posts and comments.'],
      ['Why are the numbers not italic?', 'Unicode does not include italic digits. Numbers stay in their normal form; if you need styled numbers, use the bold or double-struck styles instead.'],
      ['Is italic the same as cursive?', 'No. Italic letters are slanted print letters that stand alone. Cursive letters connect like handwriting. Both are available above so you can compare.'],
      ['Does italic Unicode work in Discord usernames?', 'Yes. Discord markdown only formats messages, but Unicode italic works in usernames, nicknames, channel names and topics as well.'],
      ['Is the italic text generator free?', 'Yes. It is free, has no sign-up, and runs entirely in your browser.'],
    ],
  },

  small: {
    file: 'small-text-generator.html',
    label: 'Small',
    appName: 'Small Text Generator',
    crumb: 'Small Text',
    sample: 'small text',
    title: 'Small Text Generator – Tiny Text & Small Caps Copy and Paste (ˢᵐᵃˡˡ ᴛɪɴʏ)',
    h1: 'Small Text Generator',
    kicker: 'Small caps, superscript and subscript tiny letters',
    description: 'Free small text generator — make tiny text, small caps and superscript letters you can copy and paste into bios, captions, usernames and comments. Three sizes of small Unicode text, instantly.',
    intro: 'Shrink your words. This small text generator converts ordinary letters into ᵗⁱⁿʸ superscript, ₛᵤᵦₛ𝒸ᵣᵢₚₜ and ꜱᴍᴀʟʟ ᴄᴀᴩꜱ Unicode characters — real text that stays small when you paste it into an Instagram bio, a TikTok caption, a Discord name or a tweet. Perfect for subtle notes, footnotes and understated usernames.',
    ids: 'smallCaps,superscript,subscript,smallCaps-d-h1,superscript-d-s4,superscript-d-cu3,smallCaps-d-f1,subscript-d-ae1,superscript-d-j1,smallCaps-d-j1,subscript-d-ae4,superscript-d-ae8,smallCaps-d-cu4,smallCaps-d-a1,smallCaps-d-s4,subscript-d-h4,superscript-d-h1,smallCaps-d-fn2',
    chips: [['all', 'All'], ['symbols', 'Tiny'], ['cute', 'Cute'], ['aesthetic', 'Aesthetic'], ['love', 'Hearts']],
    copyHeading: 'Small Text Copy and Paste',
    copyBody: 'There is no font-size setting in a bio, so “small text” online means characters that are drawn small by design. Superscript letters (ᵗⁱⁿʸ) sit high and tiny, subscript letters (ₜᵢₙy) sit low, and small caps (ꜱᴍᴀʟʟ ᴄᴀᴩꜱ) are capital shapes at lowercase height. All three are real Unicode text, so they copy and paste at their small size anywhere plain text is accepted.',
    popularTitle: 'Popular Small Text Styles',
    popular: 'Superscript is the true “tiny text” and the most searched: it makes a phrase look like a whisper or a footnote. Small caps are the most readable at small size and are widely used for aesthetic usernames and neat bio headings. Subscript is the least complete alphabet — Unicode has no subscript for several letters, so those stay normal — but it works for short words and numbers. Combine any of them with a light decoration for a soft, minimal look.',
    howToTitle: 'How to Use the Small Text Generator',
    steps: [
      ['1. Type your text', 'Enter a short phrase, name or note. Lowercase letters give the most complete result in the tiny styles.'],
      ['2. Pick a size', 'Use the Tiny chip for superscript and subscript, or Small Caps for the more readable capital style.'],
      ['3. Copy and paste', 'Press Copy and paste the small text into your bio, caption, username or message.'],
    ],
    socialTitle: 'Small Text for Instagram, TikTok and Discord Bios',
    social: 'Tiny text is a bio staple: a small-caps name line, a superscript pronoun or location note, or a whisper-quiet caption under a bigger heading. On TikTok and Instagram it lets you fit a second line of information that visually recedes. On Discord, small caps make a clean, uniform nickname. Because these characters are very small, keep the message short and never use tiny text for anything people must actually read, such as a link or a date.',
    limitNote: 'superscript and subscript alphabets are incomplete in Unicode — letters like q in superscript and most of the subscript alphabet have no small form and stay normal size.',
    specificTitle: 'Superscript vs Subscript vs Small Caps',
    specific: 'Superscript (ᵃᵇᶜ) is raised and covers nearly every lowercase letter, which makes it the best all-round tiny text. Subscript (ₐbcdₑ) is lowered but only exists for a handful of letters, so it suits numbers and short words like “ₒₙₗᵢₙₑ”. Small caps (ᴀʙᴄ) are not raised or lowered; they replace lowercase letters with miniature capitals and stay legible at normal text size. If you need something small and readable, choose small caps; if you want it as tiny as possible, choose superscript.',
    uniqueH2: 'Tiny Text Ideas for Usernames and Captions',
    uniqueBody: [
      'Small caps usernames read cleanly in member lists and comment threads because every letter has the same height. A pattern that works well is a normal-weight name followed by a small-caps descriptor, for example “Jordan ᴀʀᴛ” or “ᴅᴊ Mika”. Small caps also pair naturally with a single star or heart symbol without becoming cluttered.',
      'Superscript is ideal for asides: a tiny “ˢʷⁱᵖᵉ ᶠᵒʳ ᵐᵒʳᵉ” under a caption, a whispered joke, or a quiet credit line. Because the characters sit high, keep superscript to its own line rather than mixing it into a normal sentence, where it can look like a typo. Subscript works for small numbers such as a year or a jersey number after a name.',
    ],
    examplesTitle: 'Small Text Examples',
    examplesIntro: 'Try these in the generator and compare the tiny, subscript and small-caps versions.',
    examples: [['swipe for more', 'Tiny caption aside'], ['jordan art', 'Small-caps username'], ['est 2019', 'Subscript detail']],
    linksTitle: 'Explore Related Text Styles',
    links: [
      ['Bubble Text Generator', '/bubble-text-generator.html', 'Circled and parenthesized letters.'],
      ['Cute Fonts', '/cute-fonts.html', 'Tiny letters with kawaii decorations.'],
      ['Aesthetic Username Generator', '/aesthetic-username-generator.html', 'Ready-made soft usernames.'],
      ['Bold Font Generator', '/bold-font-generator.html', 'Go the other way with heavy Unicode bold.'],
      ['Aesthetic Fonts', '/aesthetic-fonts.html', 'Spaced, wide and minimal styles.'],
      ['Cursive Text Generator', '/', 'Flowing script for names and signatures.'],
    ],
    faqTitle: 'Small Text FAQ',
    faqs: [
      ['How do I make text smaller in my bio?', 'Bios have no font-size setting, so use small Unicode characters instead. Type your text here, copy the superscript or small-caps version, and paste it into the bio.'],
      ['What is tiny text made of?', 'Tiny text uses superscript and subscript characters that Unicode originally included for phonetics and mathematics. They are ordinary text, just drawn small by the font.'],
      ['Why do some letters stay big?', 'Unicode has no superscript or subscript form for a few letters (for example superscript q and most subscript consonants), so those fall back to normal size. Small caps cover every letter.'],
      ['Are small caps the same as tiny text?', 'Not quite. Small caps are miniature capital letters at normal text height, so they stay readable. Tiny text is raised or lowered and considerably smaller.'],
      ['Can I use small text in a Discord or TikTok username?', 'Usually yes for display names and nicknames. Some platforms restrict account handles to plain letters, so test the handle first and keep the small text in the display name if it is rejected.'],
      ['Is this small text generator free?', 'Yes. It is free, requires no sign-up and works in your browser on any device.'],
    ],
  },

  bubble: {
    file: 'bubble-text-generator.html',
    label: 'Bubble',
    appName: 'Bubble Text Generator',
    crumb: 'Bubble Text',
    sample: 'bubble text',
    title: 'Bubble Text Generator – Bubble Letters Copy & Paste (ⓑⓤⓑⓑⓛⓔ)',
    h1: 'Bubble Text Generator',
    kicker: 'Circled letters, bracketed letters and outlined bubble fonts',
    description: 'Free bubble text generator — turn your words into circled bubble letters ⓛⓘⓚⓔ ⓣⓗⓘⓢ, bracketed text and outlined letters. Copy and paste bubble fonts into bios, names, captions and messages.',
    intro: 'Put every letter in its own bubble. This bubble text generator converts text into circled Unicode letters (ⓑⓤⓑⓑⓛⓔ), parenthesized letters (⒝⒰⒝⒝⒧⒠) and outlined double-struck letters (𝔹𝕦𝕓𝕓𝕝𝕖), plus cute framed versions. All of it is real text you can copy and paste into any bio, username, caption or chat.',
    ids: 'circled,parenthesized,double,circled-d-h1,circled-d-s1,circled-d-cu1,circled-d-s4,parenthesized-d-cu3,parenthesized-d-s1,circled-d-j2,parenthesized-d-a2,circled-d-fn1,parenthesized-d-h1,parenthesized-d-ae1,double-d-bk2,double-d-m1,circled-d-wd4,parenthesized-d-j4',
    chips: [['all', 'All'], ['bubble', 'Bubble'], ['cute', 'Cute'], ['fancy', 'Fancy'], ['love', 'Hearts'], ['bold', 'Outline']],
    copyHeading: 'Bubble Letters Copy and Paste',
    copyBody: 'Bubble letters online are Unicode enclosed alphanumerics: Ⓐ through Ⓩ and ⓐ through ⓩ, plus circled digits ①②③. Because each bubble is a single character rather than a drawing, the whole word copies as text and pastes into Instagram, TikTok, Discord, WhatsApp and anywhere else. The outlined double-struck style works the same way and is often called “bubble font” too, even though its letters are open rather than circled.',
    popularTitle: 'Popular Bubble Font Styles',
    popular: 'Circled letters are the classic bubble text and the most requested. They are bold, round and instantly playful, which is why they show up in TikTok display names and cute bios. Parenthesized letters are a lighter, more unusual variant that looks like a list of options. Double-struck outlined letters read as “bubble” at small sizes and work well for gaming tags. Adding a heart, star or ꒰ ꒱ frame gives the bubbles a finished kawaii look.',
    howToTitle: 'How to Use the Bubble Text Generator',
    steps: [
      ['1. Type your text', 'Enter a name, word or short phrase. Letters and digits both have circled forms; punctuation stays plain.'],
      ['2. Choose a bubble', 'Switch between circled, bracketed and outlined letters, or pick a framed version with hearts, stars or sparkles.'],
      ['3. Copy and paste', 'Press Copy next to your favourite and paste it into a bio, display name, caption or message.'],
    ],
    socialTitle: 'Bubble Text for TikTok, Instagram and Discord',
    social: 'Bubble letters are loud and friendly, so they suit display names, playful captions, birthday messages and group-chat names more than serious bios. On TikTok and Instagram, a bubble-letter name is readable at profile size and stands out in comments. On Discord, circled letters make a distinctive nickname, and circled digits are handy for numbered lists in a server description. Because each bubble is wide, keep bubble text to a few words.',
    limitNote: 'circled letters are wide, so some platforms count them as more characters, and a few older fonts draw the lowercase circles smaller than the uppercase ones.',
    specificTitle: 'Circled Letters vs Outlined Letters',
    specific: 'Circled letters (ⓐⓑⓒ) enclose each letter in a ring — the true bubble look. Outlined double-struck letters (𝕒𝕓𝕔) have hollow strokes and no ring, giving a “bubble font” feel that stays narrower and easier to read in longer words. Parenthesized letters (⒜⒝⒞) sit between the two: enclosed, but light. If you want maximum playfulness, use circled; if you want a bubble style that still fits a username length limit, use double-struck.',
    uniqueH2: 'Bubble Letter Ideas for Names and Captions',
    uniqueBody: [
      'Short names are where bubble letters shine. A five- or six-letter name in circled letters looks like a row of badges, and a single heart or star on each side finishes it without hiding the name. For longer phrases, bubble the first word only and leave the rest plain so the line stays readable.',
      'Circled digits are useful on their own: ① ② ③ for steps in a caption, or a circled number after a name to show a year or a squad number. The outlined double-struck style is the better choice for gaming tags and Discord names, where a hollow, bold silhouette reads clearly against dark themes.',
    ],
    examplesTitle: 'Bubble Text Examples',
    examplesIntro: 'Try these in the generator to see how the circled, bracketed and outlined styles handle short names and phrases.',
    examples: [['happy birthday', 'Bubble message'], ['Zoe', 'Circled display name'], ['level up', 'Outlined gaming tag']],
    linksTitle: 'Explore Related Text Styles',
    links: [
      ['Cute Fonts', '/cute-fonts.html', 'Bubbles, tiny letters and kawaii frames together.'],
      ['Small Text Generator', '/small-text-generator.html', 'Tiny superscript and small-caps letters.'],
      ['Bold Font Generator', '/bold-font-generator.html', 'Heavy weights including double-struck.'],
      ['Heart Font Generator', '/heart-font-generator.html', 'Frame any style with heart symbols.'],
      ['Fancy Text Generator', '/fancy-text-generator.html', 'Browse every Unicode style in one list.'],
      ['Cursive Text Generator', '/', 'Flowing script for a softer look.'],
    ],
    faqTitle: 'Bubble Text FAQ',
    faqs: [
      ['What is a bubble text generator?', 'It converts normal letters into Unicode enclosed characters — mainly circled letters like ⓑ — that look like bubbles. The output is text you can copy and paste, not an image.'],
      ['Can I copy and paste bubble letters?', 'Yes. Every style here is made of standard Unicode characters, so the bubbles stay when you paste them into bios, names, captions and messages.'],
      ['Do bubble letters work on TikTok and Instagram?', 'Yes, in display names, bios, captions and comments. Account handles are usually restricted to plain letters, so use bubble text in the display name instead.'],
      ['Are there bubble numbers?', 'Yes. Circled digits ⓪ to ⑨ and double-struck digits 𝟘 to 𝟡 are included, so numbers convert along with letters.'],
      ['What is the difference between bubble text and outline text?', 'Bubble text encloses each letter in a circle. Outline (double-struck) text has hollow strokes and no circle. Both are available on this page.'],
      ['Is the bubble text generator free?', 'Yes. It is free, needs no sign-up and runs in your browser.'],
    ],
  },

  strikethrough: {
    file: 'strikethrough-text-generator.html',
    label: 'Strikethrough',
    appName: 'Strikethrough Text Generator',
    crumb: 'Strikethrough Text',
    sample: 'Strike this',
    title: 'Strikethrough Text Generator – Cross Out & Underline Text Copy and Paste',
    h1: 'Strikethrough Text Generator',
    kicker: 'Cross out, slash, underline and overline any text',
    description: 'Free strikethrough text generator — cross out text with a single line s̶t̶r̶i̶k̶e̶ or slash, or add an underline, double underline or overline. Copy and paste into Instagram, X, Discord, WhatsApp and anywhere else.',
    intro: 'Cross it out — or underline it. This strikethrough text generator adds a Unicode line through, under or over every character of your text: s̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶, s̷l̷a̷s̷h̷, u̲n̲d̲e̲r̲l̲i̲n̲e̲, d̳o̳u̳b̳l̳e̳ and o̅v̅e̅r̅l̅i̅n̅e̅, plus bold, cursive and gothic versions. The line is part of the text, so it survives pasting into apps with no formatting.',
    ids: 'cm-strike,cm-slash,cm-underline,cm-dblUnder,cm-overline,cm-macron,cm-wavy,cm-tilde,bold-cm-strike,boldScript-cm-strike,fraktur-cm-strike,fullwidth-cm-strike,bold-cm-underline,sansBold-cm-underline,script-cm-underline,double-cm-underline,monospace-cm-overline,boldScript-cm-wavy',
    chips: [['all', 'All'], ['glitch', 'Strikethrough'], ['fancy', 'Underline'], ['aesthetic', 'Wavy'], ['bold', 'Bold'], ['cursive', 'Cursive']],
    copyHeading: 'Strikethrough Text Copy and Paste',
    copyBody: 'The lines above are Unicode combining characters — U+0336 for a long stroke, U+0337 for a short slash, U+0332 for an underline, U+0305 for an overline. A combining mark attaches to the letter before it, so each character carries its own piece of the line. That is why the effect copies as plain text and shows up in an Instagram caption, a tweet or a WhatsApp status, where a real strikethrough setting does not exist.',
    popularTitle: 'Popular Strikethrough and Underline Styles',
    popular: 'The long strikethrough (s̶t̶r̶i̶k̶e̶) is the standard cross-out and the most used, for jokes, corrections and “old price / new price” posts. The short slash (s̷l̷a̷s̷h̷) looks more deliberately broken and suits edgy usernames. Underline is the cleanest way to emphasise a phrase where bold is unavailable, double underline is stronger, and overline gives a technical, retro-computer look. Wavy and tilde marks are decorative rather than functional and fit aesthetic bios.',
    howToTitle: 'How to Use the Strikethrough Text Generator',
    steps: [
      ['1. Type your text', 'Enter the word or phrase to cross out or underline. Every character, including spaces and numbers, gets a mark.'],
      ['2. Pick a line', 'Choose Strikethrough, Underline or Wavy from the chips, or a bold, cursive or gothic combination.'],
      ['3. Copy and paste', 'Press Copy next to the result and paste it into your post, bio, message or name.'],
    ],
    socialTitle: 'Strikethrough Text for Instagram, X, Discord and WhatsApp',
    social: 'Strikethrough is a joke format as much as a correction: “~~totally not~~ obsessed with this” style humour works on Instagram and X even though neither has a strikethrough button. Discord and WhatsApp do support ~tilde~ strikethrough inside messages, but Unicode strikethrough also works in usernames, bios, channel topics and statuses where markdown is ignored. Underline is useful for a single emphasised line in a bio where bold Unicode would feel too heavy.',
    limitNote: 'combining marks can render unevenly — the line may look broken or offset on some fonts — and screen readers may read each mark aloud, so keep struck text short.',
    specificTitle: 'Strikethrough vs Slash vs Underline',
    specific: 'The long strikethrough (U+0336) is a horizontal line through the middle of each character and joins into a continuous line on most fonts. The short slash (U+0337) is a diagonal stroke that stays separate per letter, reading as “crossed out” in a rougher way. Underline (U+0332) sits below the baseline and is the closest Unicode gets to real underline formatting; double underline (U+0333) is heavier. Overline (U+0305) mirrors underline above the letters and is popular in glitch and terminal aesthetics.',
    uniqueH2: 'Strikethrough Text Ideas for Posts, Prices and Bios',
    uniqueBody: [
      'The most common use is comedic self-correction: strike a word, then write what you “really” meant. It also works for sale posts — cross out the old price and put the new one in bold Unicode next to it — and for “done” items in a to-do caption. Because the line is baked into the text, the effect appears in the feed exactly as you typed it.',
      'For usernames, a slashed or struck name signals a “deleted” or glitch aesthetic and pairs well with gothic letters. Underlined names are rarer and read as a heading. Keep struck text to a few words: a whole paragraph with combining marks becomes hard to read and can render as a solid bar on some devices.',
    ],
    examplesTitle: 'Strikethrough Text Examples',
    examplesIntro: 'Try these in the generator and compare the long strike, slash and underline versions.',
    examples: [['was $40 now $25', 'Price cross-out'], ['definitely not obsessed', 'Caption joke'], ['read the pinned post', 'Underlined bio line']],
    linksTitle: 'Explore Related Text Styles',
    links: [
      ['Glitch Text Generator', '/glitch-text-generator.html', 'Zalgo and corrupted text with intensity control.'],
      ['Bold Font Generator', '/bold-font-generator.html', 'Heavy Unicode bold for the “new price” half.'],
      ['Freaky Font Generator', '/freaky-font-generator.html', 'Flipped, reversed and chaotic text.'],
      ['Upside Down Text Generator', '/upside-down-text-generator.html', 'Flip your text 180 degrees.'],
      ['Fancy Text Generator', '/fancy-text-generator.html', 'Every style in one searchable list.'],
      ['Cursive Text Generator', '/', 'Flowing script without any lines.'],
    ],
    faqTitle: 'Strikethrough Text FAQ',
    faqs: [
      ['How do I strikethrough text on Instagram or X?', 'Neither app has a strikethrough button. Type your text here, copy the strikethrough version and paste it — the line is part of the Unicode text, so it displays in captions, bios and posts.'],
      ['How does Unicode strikethrough work?', 'A combining character (U+0336) is added after each letter. Combining marks attach to the character before them, so every letter carries its own segment of the line.'],
      ['Can I underline text in a bio?', 'Yes. Copy the underline style, which adds U+0332 after each character. It works anywhere plain text is accepted, including bios and usernames.'],
      ['Why does the line look broken on some phones?', 'Fonts draw combining marks at slightly different positions. On most modern systems the strokes join into one line, but a few fonts leave small gaps or offset the mark.'],
      ['Does strikethrough work in Discord and WhatsApp?', 'Both apps support ~tilde~ strikethrough inside messages. Unicode strikethrough additionally works in usernames, nicknames, statuses and channel topics where markdown is not applied.'],
      ['Is the strikethrough text generator free?', 'Yes. It is free, has no sign-up and runs in your browser.'],
    ],
  },

  upsideDown: {
    file: 'upside-down-text-generator.html',
    label: 'Upside Down',
    appName: 'Upside Down Text Generator',
    crumb: 'Upside Down Text',
    sample: 'Upside Down',
    title: 'Upside Down Text Generator – Flip Text Copy & Paste (uʍop ǝpᴉsd∩)',
    h1: 'Upside Down Text Generator',
    kicker: 'Flip, mirror and reverse text with real Unicode characters',
    description: 'Free upside down text generator — flip your text 180° (ʇxǝʇ pǝddᴉlɟ), mirror it, reverse it or flip individual letters. Copy and paste upside down text into Instagram, TikTok, Discord and anywhere else.',
    intro: 'Turn your words on their head. This upside down text generator replaces each letter with a Unicode character that looks like it has been rotated 180 degrees, then reverses the order so the whole line reads correctly when you flip your phone. Reversed, letter-flipped and framed versions are included. Everything is real text — copy it and paste it anywhere.',
    ids: 'upside-down,flipped,reversed,upside-down-caps,upside-down-spaced,alternating,upside-down-d-a1,upside-down-d-wd1,upside-down-d-wd5,upside-down-d-bk1,upside-down-d-j1,upside-down-d-fr3,upside-down-d-s1,upside-down-d-h1,upside-down-d-cu1,upside-down-d-wd2,upside-down-d-g7,reversed-d-a1,reversed-d-fr6',
    chips: [['all', 'All'], ['weird', 'Reversed'], ['cute', 'Cute'], ['gaming', 'Gaming'], ['aesthetic', 'Aesthetic']],
    copyHeading: 'Upside Down Text Copy and Paste',
    copyBody: 'There is no “rotate” instruction in plain text, so upside down text is built from look-alike characters: ɐ for a, q for b, ǝ for e, ɟ for f, ʇ for t and so on, borrowed from the International Phonetic Alphabet and other Unicode blocks. Because they are ordinary characters, the flipped line copies as text and displays in Instagram, TikTok, Discord, WhatsApp and anywhere else without an image.',
    popularTitle: 'Popular Upside Down and Flipped Text Styles',
    popular: 'The classic upside down style flips every letter and reverses the order, so the line looks properly rotated. Flipped Letters turns each character but keeps the original order, which reads as individually toppled letters. Reversed text mirrors the order without changing the letters — subtle enough to look like a typo. Upside Down Caps uses only the uppercase flips, which are bolder and more legible, and the framed versions add arrows, brackets or a ¿ ? pair that suit the confused mood.',
    howToTitle: 'How to Use the Upside Down Text Generator',
    steps: [
      ['1. Type your text', 'Enter a word, name or short sentence. Letters, digits and common punctuation all have flipped forms.'],
      ['2. Choose a flip', 'Pick the full upside down style, letter-only flips, reversed order or a framed version from the chips.'],
      ['3. Copy and paste', 'Press Copy and paste the flipped text into a bio, caption, message or username.'],
    ],
    socialTitle: 'Upside Down Text for Instagram, TikTok and Discord',
    social: 'Upside down text is a playful attention grab: a flipped caption makes people tilt their phone, a flipped “read more” arrow line is a running joke, and a flipped display name stands out in a comment section. It works in Instagram and TikTok bios and captions, Discord nicknames and statuses, and WhatsApp messages. Keep the flipped part short and put the real information in normal text — people will not rotate their screen to read a paragraph.',
    limitNote: 'flipped text is stored in reverse order, so search, copy-search and screen readers see the characters literally rather than the word you intended.',
    specificTitle: 'Upside Down vs Mirrored vs Reversed Text',
    specific: 'Upside down text rotates the line 180° — letters are flipped and the order is reversed, so it reads correctly if you turn the screen. Flipped Letters only turns each glyph, leaving the order intact. Reversed text keeps the letters upright but writes them backwards, which is what most people mean by “mirror text” online. True horizontally mirrored glyphs barely exist in Unicode, so reversed order is the closest real-text equivalent. All three are on this page so you can compare them side by side.',
    uniqueH2: 'How Upside Down Letters Work in Unicode',
    uniqueBody: [
      'Unicode was never designed for rotated text, so an upside down font generator relies on characters that happen to look like flipped Latin letters. Many come from the IPA block used by linguists: ɐ (turned a), ǝ (turned e), ɹ (turned r), ʇ (turned t) and ʍ (turned w). Others are simple stand-ins — a lowercase b becomes q and p becomes d because the shapes already match when rotated. Uppercase letters use ∀, Ǝ, Ⅎ, ┴ and ⅄, and digits use characters like Ɛ and ㄣ.',
      'A few letters have no convincing flipped form and stay the same: H, I, N, O, S, X, Z and the lowercase l, o, s, x and z are symmetrical enough to pass. This is also why upside down text sometimes looks slightly uneven — the substitute characters come from different scripts and fonts draw them at different weights. Short words and lowercase text give the most convincing result.',
    ],
    examplesTitle: 'Upside Down Text Examples',
    examplesIntro: 'Paste one of these into the generator and compare the full flip, letter flip and reversed versions.',
    examples: [['turn your phone', 'Flipped caption'], ['Riley', 'Upside down display name'], ['read this again', 'Reversed joke line']],
    linksTitle: 'Explore Related Text Styles',
    links: [
      ['Freaky Font Generator', '/freaky-font-generator.html', 'Flipped text mixed with glitch and chaos.'],
      ['Weird Font Generator', '/weird-font-generator.html', 'Strange, funny and unusual Unicode styles.'],
      ['Strikethrough Text Generator', '/strikethrough-text-generator.html', 'Cross out or underline any text.'],
      ['Glitch Text Generator', '/glitch-text-generator.html', 'Zalgo and corrupted-looking text.'],
      ['Fancy Text Generator', '/fancy-text-generator.html', 'Every Unicode style in one place.'],
      ['Cursive Text Generator', '/', 'Back to elegant, right-way-up script.'],
    ],
    faqTitle: 'Upside Down Text FAQ',
    faqs: [
      ['How does an upside down text generator work?', 'It replaces each letter with a Unicode character that looks like the rotated version — for example ɐ for a and ʇ for t — and reverses the order so the whole line reads correctly when turned 180°.'],
      ['Can I copy and paste upside down text?', 'Yes. The result is ordinary Unicode text, so it pastes into bios, captions, usernames and messages on any platform that accepts Unicode.'],
      ['Why do some letters not flip?', 'A few letters such as H, I, N, O, S, X and Z look the same upside down, so they are left unchanged. Others have no close look-alike in Unicode and also stay as they are.'],
      ['What is the difference between upside down and reversed text?', 'Upside down text flips the letters and reverses their order. Reversed text keeps the letters upright and only writes them backwards, which is what most people mean by mirror text.'],
      ['Does upside down text work in Discord and TikTok usernames?', 'Usually in display names and nicknames, yes. Account handles are often limited to plain letters, so keep the flipped text in the display name if the handle is rejected.'],
      ['Is this upside down text generator free?', 'Yes. It is free, has no sign-up and runs entirely in your browser.'],
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

// ── Report preset overlap against every other cluster page on the site ───────
// Reads data-style-ids from the built HTML of the other clusters, so a page
// here cannot drift into a near-duplicate of an aesthetic or dark page either.
const ownFiles = new Set(Object.values(pages).map((p) => p.file));
const others = fs.readdirSync(root)
  .filter((f) => f.endsWith('.html') && !ownFiles.has(f))
  .flatMap((f) => {
    const m = fs.readFileSync(path.join(root, f), 'utf8').match(/data-style-ids="([^"]+)"/);
    return m ? [[f, m[1].split(',')]] : [];
  });
const all = [...Object.entries(pages).map(([k, p]) => [k, p.ids.split(',')]), ...others];
const ownKeys = Object.keys(pages);
for (const key of ownKeys) {
  const a = new Set(pages[key].ids.split(','));
  for (const [name, b] of all) {
    if (name === key) continue;
    const shared = b.filter((id) => a.has(id));
    const pct = Math.round((shared.length / Math.max(a.size, b.length)) * 100);
    if (pct >= 40) console.warn(`! ${key} / ${name} share ${pct}% of presets`);
  }
}

for (const p of Object.values(pages)) {
  const html = renderClusterPage(p);
  fs.writeFileSync(path.join(root, p.file), html);
  fs.writeFileSync(path.join(root, 'public', p.file), html);
}
console.log(`Built ${Object.keys(pages).length} style cluster pages in root and public mirror.`);
