import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const domain = 'https://www.cursive-text-generator.net';

const common = {
  preppy: {
    file:'preppy-fonts.html', title:'Preppy Fonts – Cute Preppy Font Generator & Copy Paste', h1:'Preppy Fonts: Copy & Paste Generator', label:'Preppy', kicker:'Polished, playful, and campus-ready',
    description:'Make polished preppy fonts for names, bios, captions, and school-inspired profiles. Type your text, preview cute Unicode styles, and copy any result free.',
    intro:'Give names, club captions, study accounts, and profile bios a polished preppy look. Type once to preview clean script, collegiate bold, small caps, monogram-inspired letters, stars, and hearts—then copy a style free.',
    ids:'smallCaps,bold,script,double,circled,boldScript,fullwidth,dec-d-s4,smallCaps-d-s4,boldScript-d-h1,script-d-sp2,dec-d-cu6',
    chips:[['all','All'],['cursive','Script'],['bold','Bold'],['aesthetic','Aesthetic'],['cute','Cute']],
    popular:'Preppy style works best when it feels tidy rather than overloaded. Small caps and bold letters suggest varsity or collegiate lettering; script adds a polished notebook feel; restrained stars and hearts create a cute preppy accent without burying the name.',
    specificTitle:'Preppy Fonts for Names and Bios',
    specific:'For a short name, start with small caps or clean script and add one compact symbol. Study-account bios can pair a bold heading with a star divider, while sorority, club, or team captions often suit collegiate-inspired bold text. Keep dates, links, and important details in regular characters for readability.',
    social:'Preppy text fits Instagram study accounts, TikTok display names, school-club captions, team profiles, and Pinterest board titles. A short styled name usually reads better than a full paragraph. If a platform rejects a character in a username, use the style in the display-name or bio field instead.',
    examples:[['AVA SOCIAL CLUB','Small-cap club name'],['study date 4pm','Clean planner caption'],['weekend on campus','Polished profile line']],
    links:[['Cute Fonts','/cute-fonts.html','Playful bubbles, tiny letters, and kawaii details.'],['Aesthetic Fonts','/aesthetic-fonts.html','Explore the complete aesthetic style collection.'],['Girly Fonts','/girly-fonts.html','Soft script and feminine decorative text.'],['Cursive Text Generator','/','Try the site’s classic flowing scripts.']],
    faqs:[
      ['What are preppy fonts?','Online “preppy fonts” are usually Unicode letter styles and neat decorative symbols chosen for a polished, youthful, school-inspired look. They are not installed font files.'],
      ['Can I copy and paste preppy fonts?','Yes. Each result here is made from copyable Unicode characters. Use the Copy button, then paste into a supported bio, caption, message, or display name.'],
      ['Which preppy style is best for a name?','Small caps, clean script, and restrained bold styles stay readable for names. Add one star or heart frame when you want a more decorative result.'],
      ['Do these work for sorority or college bios?','They can decorate informal social bios and captions. Avoid implying an official organization identity, and keep essential contact details in normal text.'],
      ['Are preppy fonts free?','Yes. The generator is free, requires no account, and runs in your browser.'],
      ['Why do some letters look different on another phone?','Unicode rendering depends on the device and app font. Most modern platforms display these characters, but exact shapes can vary.']]
  },
  bow: {
    file:'bow-font-generator.html', title:'Bow Font Generator – Cute Bow Text & Fonts 🎀', h1:'Bow Font Generator for Copy & Paste', label:'Bow', kicker:'Ribbon frames, soft script, and sweet symbols',
    description:'Create bow text with ribbons, hearts, cute script, and copyable Unicode styles. Use the free bow font generator for bios, names, captions, and messages.',
    intro:'Wrap your words in ribbons, delicate bows, hearts, and soft script. This free bow font generator creates actual Unicode text and symbol combinations you can copy for bios, captions, display names, and messages.',
    ids:'dec-d-bow1,boldScript-d-bow1,script-d-bow2,dec-d-bow3,boldScript-d-bow4,script,boldScript,dec-d-h1,script-d-h10,circled,dec-d-cu1,dec-d-sp2',
    chips:[['all','All'],['cute','Bows'],['cursive','Script'],['love','Hearts'],['aesthetic','Soft']],
    popular:'Bow text can be simple—୨୧ around plain letters—or more expressive when ribbon symbols frame a transformed script. The most useful presets mix copyable lettering with balanced decoration, so the bow feels connected to the name rather than pasted on as an unrelated emoji.',
    specificTitle:'Bow Text and Ribbon Styles',
    specific:'The characters ୨୧ and ౨ৎ are popular text bows because they remain monochrome and adapt to the surrounding text color. A 🎀 emoji is brighter but may render differently across devices. For a delicate ribbon font effect, pair a text bow with script; for compact usernames, use plain letters inside a single bow frame.',
    social:'Bow fonts suit coquette bios, gift captions, fan profiles, boutique display names, and soft Discord nicknames. Instagram and TikTok display names allow more decorative freedom than usernames. In longer captions, use one bow line as a heading and keep the body readable.',
    examples:[['Mia’s closet','Boutique display name'],['soft girl sunday','TikTok caption'],['made with love','Gift-note line']],
    links:[['Coquette Font Generator','/coquette-font-generator.html','Romantic bows, vintage details, and delicate script.'],['Cute Fonts','/cute-fonts.html','Round, tiny, and playful Unicode letters.'],['Heart Font Generator','/heart-font-generator.html','More ways to frame text with hearts.'],['Cursive Text Generator','/','Create flowing script without bow decorations.']],
    faqs:[
      ['What is a bow font generator?','It combines Unicode styled letters with bow or ribbon symbols to create decorative text you can copy and paste.'],
      ['Is ୨୧ a bow symbol?','It is commonly used online as a text bow because its two curved sides resemble ribbon loops. Its original meaning depends on the writing system and context.'],
      ['Can I make bow fonts without emoji?','Yes. Many presets use text symbols such as ୨୧ and ౨ৎ rather than colorful emoji, and several also transform the letters into Unicode script.'],
      ['Where can I paste bow text?','Try display names, bios, captions, messages, and profile headings in apps that accept Unicode. Username rules can be stricter.'],
      ['Why does the bow look different on iPhone and Android?','Text symbols are usually similar, while emoji artwork varies by operating system. Character spacing can also differ slightly.'],
      ['Is this ribbon text generator free?','Yes. It is free to use and does not require a download or sign-up.']]
  },
  coquette: {
    file:'coquette-font-generator.html', title:'Coquette Font Generator – Coquette Fonts Copy & Paste', h1:'Coquette Font Generator', label:'Coquette', kicker:'Delicate romance with a vintage-soft mood',
    description:'Generate coquette fonts with delicate Unicode script, bows, hearts, ribbons, and romantic symbols. Copy coquette text for names, bios, and captions free.',
    intro:'Create a soft, romantic line with delicate script, text bows, tiny hearts, and vintage-inspired framing. Every result is a copyable Unicode combination, ready for coquette bios, names, captions, and mood-board titles.',
    ids:'script-d-bow4,boldScript-d-bow2,script-d-h10,boldScript-d-cu2,script-d-h4,dec-d-bow1,boldScript-d-bow3,script,italic-d-h1,dec-d-f3,superscript-d-cu3,dec-d-ae8',
    chips:[['all','All'],['cursive','Delicate'],['love','Romantic'],['cute','Bows'],['aesthetic','Vintage']],
    popular:'Coquette styles lean delicate: script letters, airy spacing, bow shapes, fine hearts, petals, and softly balanced frames. Unlike a general cute style, the mood is romantic and composed. One detailed line often works better than stacking several ornate decorations together.',
    specificTitle:'Coquette Fonts, Bows and Symbols',
    specific:'Build a coquette text style by choosing one visual motif and repeating it consistently. Bows suggest ribbon details, hollow hearts keep the line light, and script creates the handwritten feel of a note or invitation. Vintage-inspired does not require copying a logo or artwork—the character combination itself supplies the mood.',
    social:'Use coquette fonts for Instagram bio headings, TikTok display names, Pinterest mood-board labels, soft Discord statuses, or a short romantic caption. A transformed name plus one bow is usually readable at profile size. Save more ornate frames for standalone captions or headings.',
    examples:[['dear diary','Romantic journal heading'],['Lily Rose','Soft display name'],['love letters only','Profile bio line']],
    links:[['Bow Font Generator','/bow-font-generator.html','Explore ribbon-first bow text styles.'],['Girly Fonts','/girly-fonts.html','Try feminine script and bolder pretty styles.'],['Aesthetic Fonts','/aesthetic-fonts.html','Browse dreamy, minimal, gothic, and cute looks.'],['Heart Font Generator','/heart-font-generator.html','Build text around heart symbols.']],
    faqs:[
      ['What is a coquette font?','Online, the phrase usually describes delicate script or feminine Unicode text combined with bows, hearts, ribbons, and romantic symbols.'],
      ['How do I create coquette text?','Enter a name or phrase, compare the generated lines, and copy the preset that best matches your desired level of decoration.'],
      ['Are coquette fonts copy and paste text?','The results on this page are. They use Unicode characters and symbols rather than a visual-only CSS font.'],
      ['Which coquette symbols work best in bios?','Compact text bows, hollow hearts, and small sparkles are less likely to crowd a short bio than a long decorative frame.'],
      ['Can I use these styles for invitations?','They are useful for digital headings and informal text. For printed invitations, a licensed traditional font offers better typographic control.'],
      ['Does this generator copy copyrighted artwork?','No. It assembles standard Unicode characters and does not reproduce branded graphics or copyrighted illustrations.']]
  },
  cute: {
    file:'cute-fonts.html', title:'Cute Fonts – Cute Font Generator for Copy & Paste', h1:'Cute Fonts to Copy and Paste', label:'Cute', kicker:'Tiny, bubbly, rounded, and playfully decorated',
    description:'Turn your words into cute fonts, tiny letters, bubble text, kawaii decorations, hearts, and stars. Copy and paste free Unicode styles instantly.',
    intro:'Make any short phrase feel playful with bubble-like letters, tiny text, rounded characters, hearts, stars, and kawaii-style frames. Type once, preview the results instantly, and copy your favorite cute font free.',
    ids:'circled,parenthesized,superscript,smallCaps,dec-d-cu1,dec-d-cu3,dec-d-s4,dec-d-f2,script-d-cu1,boldScript-d-h3,fullwidth-d-cu1,dec-d-cel3',
    chips:[['all','All'],['bubble','Bubble'],['cute','Kawaii'],['symbols','Tiny'],['love','Hearts']],
    popular:'Bubble and circled characters feel toy-like, while superscript letters make a phrase tiny and light. Stars, flowers, soft brackets, and hearts add kawaii energy without changing every letter. Because compactness matters in usernames, compare a plain transformation with a decorated version before copying.',
    specificTitle:'Cute Fonts for Usernames',
    specific:'Short usernames benefit from styles that preserve clear letter shapes. Circled letters are bold and playful; tiny letters save visual weight but may not support every uppercase character; soft brackets create a cute frame around otherwise readable text. If a service limits username characters, keep the account handle plain and decorate the display name.',
    social:'Cute text works naturally in TikTok display names, Discord nicknames, gaming profiles, Instagram bios, friendship captions, and playful contact names. Use a single decorated heading for emphasis. For accessibility, avoid transforming instructions, links, or a full multi-line caption.',
    examples:[['peachy','Cute username idea'],['besties forever','Friendship caption'],['tiny cafe club','Playful group name']],
    links:[['Preppy Fonts','/preppy-fonts.html','Try a cleaner, campus-inspired cute look.'],['Girly Fonts','/girly-fonts.html','Add soft script and feminine decoration.'],['Aesthetic Fonts','/aesthetic-fonts.html','Compare cute styles with the wider aesthetic set.'],['Bow Font Generator','/bow-font-generator.html','Frame your text with ribbons and bows.']],
    faqs:[
      ['What are cute fonts for copy and paste?','They are Unicode character styles and symbol combinations that make ordinary text look bubbly, tiny, rounded, or playfully decorated.'],
      ['Is this the same as installing a cute font?','No. You copy Unicode text, not a font file. That lets the style travel with the characters in many apps.'],
      ['What is the cutest style for a username?','Circled, small-cap, or softly framed text is usually compact enough for a display name. Actual username fields may allow fewer characters.'],
      ['Do kawaii fonts work in Discord?','They generally work in display names and messages, although server rules and username validation may restrict some symbols.'],
      ['Can I generate cute letters on mobile?','Yes. Type in the box and tap Copy beside a result; a fallback copy method supports browsers without the modern clipboard API.'],
      ['Why are a few tiny letters not perfectly matched?','Unicode does not include a complete tiny alphabet in one unified style, so some letters use the closest available characters.']]
  },
  girly: {
    file:'girly-fonts.html', title:'Girly Fonts – Pretty Girly Font Generator', h1:'Girly Fonts: Pretty Text Generator', label:'Girly', kicker:'Feminine script, pretty accents, and confident style',
    description:'Create girly fonts with elegant cursive, feminine Unicode letters, cute bold text, hearts, and stars. Copy pretty text for names and bios free.',
    intro:'Style names and bios with feminine script, elegant cursive, cute bold letters, hearts, stars, and soft decorative details. This free girly font generator turns your text into copyable Unicode results instantly.',
    ids:'boldScript,script,italic,boldItalic,boldScript-d-h1,script-d-f1,boldScript-d-s4,script-d-bow1,sansBoldItalic-d-h1,dec-d-cu2,smallCaps-d-f1,dec-d-sp1',
    chips:[['all','All'],['cursive','Elegant'],['love','Hearts'],['bold','Cute Bold'],['fancy','Decorative']],
    popular:'Girly fonts can be soft or confident. Fine script feels elegant, bold cursive stands out in short names, italic text keeps captions polished, and hearts or stars add a playful finish. The best choice depends on whether you want a subtle feminine detail or a statement display name.',
    specificTitle:'Girly Fonts for Bios and Names',
    specific:'For names, choose a script with strong letter shapes so initials stay recognizable. For bios, use styled text as a heading or one short mood line. A cute bold preset can anchor a profile, while flower or heart details suit beauty, fashion, journaling, friendship, and lifestyle themes.',
    social:'Girly text is useful for Instagram names, TikTok bios, Discord display names, beauty-page headings, birthday captions, and digital notes. Decorative letters are best used selectively: a readable handle and link help people find you, while the display name carries the style.',
    examples:[['Sofia Marie','Elegant personal name'],['gloss & good days','Beauty bio line'],['girls night','Playful caption']],
    links:[['Coquette Font Generator','/coquette-font-generator.html','Choose a softer bow-and-ribbon mood.'],['Cute Fonts','/cute-fonts.html','Explore bubbles, tiny letters, and kawaii frames.'],['Heart Font Generator','/heart-font-generator.html','Add varied heart symbols to your words.'],['Aesthetic Fonts','/aesthetic-fonts.html','See every major aesthetic category together.']],
    faqs:[
      ['What makes a font style look girly?','In online text styling, flowing script, elegant italics, rounded bold letters, hearts, flowers, and stars are commonly used to create a feminine look.'],
      ['Can I copy girly fonts into an Instagram bio?','Usually, yes. Copy a result and paste it into a display name or bio. Keep important information in plain text for clarity.'],
      ['Which style is best for a girl’s name?','Bold script is expressive and readable for short names; lighter script feels more refined. Preview both with the exact name before deciding.'],
      ['Are feminine fonts only cursive?','No. Italic, cute bold, small caps, and symbol-framed text can all feel feminine depending on the surrounding design.'],
      ['Can I use girly text in a TikTok username?','Display names and bios are the safer choice because actual usernames often have tighter character rules.'],
      ['Is the pretty font generator free?','Yes. All listed styles can be generated and copied without signing up.']]
  },
  aesthetic: {
    file:'aesthetic-fonts.html', title:'Aesthetic Fonts – Aesthetic Font Generator Copy & Paste', h1:'Aesthetic Fonts Generator', label:'Aesthetic', kicker:'The complete hub for expressive Unicode text',
    description:'Generate aesthetic fonts in cursive, bold, italic, gothic, cute, dreamy, minimal, and symbol styles. Copy aesthetic text for bios and captions free.',
    intro:'Explore a broad mix of cursive, bold, italic, gothic, cute, dreamy, minimal, and symbol-based text. Enter your words once to compare copyable Unicode styles, then jump into a focused aesthetic collection when you want a more specific mood.',
    ids:'script,bold,italic,fraktur,smallCaps,circled,fullwidth,spaced,dec-d-ae4,dec-d-cel3,script-d-s4,boldScript-d-h1,boldScript-d-bow4,dec-d-f1,monospace,dec-d-sp2',
    chips:[['all','All'],['cursive','Cursive'],['bold','Bold'],['gothic','Gothic'],['cute','Cute'],['aesthetic','Dreamy']],
    popular:'Aesthetic text is an umbrella rather than one typeface. Cursive feels personal, bold adds emphasis, gothic creates contrast, small caps stay tidy, fullwidth letters feel digital, and stars or moons make a phrase dreamy. Compare several moods with the same wording to see which one remains readable.',
    specificTitle:'Aesthetic Fonts and Symbols',
    specific:'Symbols shape the mood around the letters. Minimal dashes and spaced text feel calm; moons and stars suggest a dreamy profile; hearts and bows lead toward romantic or coquette styling. Choose a transformed alphabet first, then add symbols only when they support the message. This keeps an aesthetic bio intentional instead of crowded.',
    social:'Use aesthetic fonts for Instagram bio headings, TikTok display names, Discord roles, Pinterest titles, usernames where allowed, and short captions. Platform support is usually strongest in display text and messages. Keep URLs, accessibility-critical labels, and searchable account handles in regular characters.',
    examples:[['midnight notes','Dreamy profile line'],['CREATE MORE','Bold creative motto'],['slow mornings','Minimal caption']],
    links:[['Preppy Fonts','/preppy-fonts.html','Polished, campus-inspired letters and symbols.'],['Bow Font Generator','/bow-font-generator.html','Ribbon frames and soft bow combinations.'],['Coquette Font Generator','/coquette-font-generator.html','Delicate romantic script and vintage details.'],['Cute Fonts','/cute-fonts.html','Bubble, tiny, and kawaii-style text.'],['Girly Fonts','/girly-fonts.html','Feminine cursive and pretty bold presets.'],['Heart Font Generator','/heart-font-generator.html','Heart letters and love-symbol styles.']],
    faqs:[
      ['What are aesthetic fonts?','The term covers many visual moods made with Unicode letters and symbols, including cursive, gothic, tiny, fullwidth, dreamy, cute, and minimal text.'],
      ['How does an aesthetic font generator work?','It maps ordinary Latin letters to visually styled Unicode characters and may add symbols around the result. The output can then be copied as text.'],
      ['Are aesthetic fonts real fonts?','Not in the installable typeface sense. These results are characters that resemble font styles, which is why they can survive copy and paste.'],
      ['Which aesthetic text is easiest to read?','Bold, italic, small caps, and lightly decorated script are generally clearer than dense symbol frames or combining-mark effects.'],
      ['Can I use aesthetic symbols in a username?','It depends on the platform. Display names and bios often accept more Unicode than unique account handles.'],
      ['Is aesthetic text accessible?','Decorative Unicode may be announced unpredictably by screen readers. Use it as an accent and leave essential information in plain text.'],
      ['What if I want only cursive styles?','Use the main Cursive Text Generator for a focused selection of flowing script and calligraphy-like Unicode.']]
  }
};

function esc(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');}
function page(p){
  const url=`${domain}/${p.file}`;
  const chips=p.chips.map(([id,label],i)=>`<button class="cluster-chip${i?'':' active'}" type="button" data-cat="${id}" aria-pressed="${i?'false':'true'}">${label}</button>`).join('');
  const examples=p.examples.map(([text,note])=>`<div class="cluster-example"><code>${esc(text)}</code><span>${esc(note)}</span></div>`).join('');
  const links=p.links.map(([name,href,note])=>`<a class="cluster-link" href="${href}"><strong>${esc(name)}</strong><span>${esc(note)}</span></a>`).join('');
  const faqHtml=p.faqs.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  const faqJson=p.faqs.map(([q,a])=>({"@type":"Question",name:q,acceptedAnswer:{"@type":"Answer",text:a}}));
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(p.title)}</title><meta name="description" content="${esc(p.description)}"><meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:url" content="${url}"><meta property="og:title" content="${esc(p.title)}"><meta property="og:description" content="${esc(p.description)}"><meta property="og:image" content="${domain}/assets/cursive-generator-hero.png">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(p.title)}"><meta name="twitter:description" content="${esc(p.description)}"><meta name="twitter:image" content="${domain}/assets/cursive-generator-hero.png">
<link rel="icon" href="/favicon.ico" sizes="any"><link rel="stylesheet" href="/assets/styles.css?v=20260904b"><link rel="stylesheet" href="/assets/aesthetic-cluster.css?v=20260908"><style>.cluster-hero .tool-intro p{display:block}</style>
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"WebApplication",name:`${p.label} Font Generator`,url,applicationCategory:'DesignApplication',operatingSystem:'Any',offers:{"@type":"Offer",price:'0',priceCurrency:'USD'},description:p.description})}</script>
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:'Cursive Text Generator',item:`${domain}/`},{"@type":"ListItem",position:2,name:`${p.label} Fonts`,item:url}]})}</script>
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqJson})}</script></head>
<body><header class="site-header"></header><nav class="nav-mobile-drawer" id="nav-drawer" aria-label="Mobile navigation"></nav><main>
<section class="hero cluster-hero"><div class="wrap"><div class="tool-intro"><p class="cluster-kicker">${esc(p.kicker)}</p><h1>${esc(p.h1)}</h1><p>${esc(p.intro)}</p></div></div></section>
<section class="tool-section"><div class="wrap cluster-shell"><div class="generator-card" data-cluster-generator data-style-ids="${p.ids}"><div class="cluster-input-panel"><label for="cluster-text"><strong>Enter your text</strong></label><textarea id="cluster-text" class="cluster-input" maxlength="160">Your Text</textarea><div class="cluster-input-row"><button class="button secondary cluster-reset" type="button">Reset</button><span class="cluster-note">Free · no sign-up · live Unicode preview</span></div><div class="cluster-chips" aria-label="Filter styles">${chips}</div><div class="cluster-count" aria-live="polite"></div></div><div class="cluster-grid"></div></div></div></section>
<section class="cluster-section"><div class="wrap"><h2>${esc(p.label)} Fonts Copy and Paste</h2><p>Type your text once, compare the live styles above, and press Copy beside the result you want. The letters and decorations are Unicode characters, so the styling usually stays with the text when you paste it. This is different from a CSS font preview, which would revert when copied.</p></div></section>
<section class="cluster-section alt"><div class="wrap"><h2>Popular ${esc(p.label)} Font Styles</h2><p>${esc(p.popular)}</p><div class="cluster-examples">${examples}</div></div></section>
<section class="cluster-section"><div class="wrap"><h2>How to Use the ${esc(p.label)} Font Generator</h2><ol class="cluster-steps"><li class="cluster-step"><strong>1. Enter your text</strong>Replace “Your Text” with a name, bio, caption, or short phrase.</li><li class="cluster-step"><strong>2. Choose a style</strong>Compare the Unicode letters and decorative symbol combinations.</li><li class="cluster-step"><strong>3. Copy and paste</strong>Use the Copy button, then paste the result into your chosen app.</li></ol></div></section>
<section class="cluster-section alt"><div class="wrap"><h2>${esc(p.label)} Fonts for Social Media</h2><p>${esc(p.social)}</p><p class="cluster-limit"><strong>Good to know:</strong> decorative Unicode is widely supported, but exact glyphs and allowed characters vary by app and device.</p></div></section>
<section class="cluster-section"><div class="wrap"><h2>${esc(p.specificTitle)}</h2><p>${esc(p.specific)}</p></div></section>
<section class="cluster-section alt"><div class="wrap"><h2>${esc(p.label)} Font Examples</h2><p>Try the sample ideas below in the generator, then adjust the wording and decoration to fit your profile.</p><div class="cluster-examples">${examples}</div></div></section>
<section class="cluster-section"><div class="wrap"><h2>Explore Related Font Styles</h2><div class="cluster-links">${links}</div></div></section>
<section class="cluster-section alt"><div class="wrap cluster-faq"><h2>${esc(p.label)} Fonts FAQ</h2>${faqHtml}</div></section></main>
<footer class="site-footer"><div class="footer-inner"><span>Cursive Text Generator</span><span class="footer-links"><a href="/about.html">About</a><a href="/contact.html">Contact</a><a href="/privacy.html">Privacy</a><a href="/sitemap.html">Sitemap</a></span></div></footer>
<script src="/assets/navigation.js?v=20260908"></script><script src="/assets/style-engine.js?v=20260908"></script><script src="/assets/aesthetic-cluster.js?v=20260908"></script></body></html>`;
}

for (const p of Object.values(common)) {
  const html=page(p);
  fs.writeFileSync(path.join(root,p.file),html);
  const mirror=path.join(root,'public',p.file);
  fs.writeFileSync(mirror,html);
}
console.log(`Built ${Object.keys(common).length} aesthetic cluster pages in root and public mirror.`);
