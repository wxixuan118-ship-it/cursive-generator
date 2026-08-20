// style-engine.js — Unicode Style Engine v2.0
// 300+ copy-paste text styles. No font files. Pure Unicode.
(function(global){
'use strict';

// ── UNICODE CHARACTER MAPS ────────────────────────────────────────────────────
// L=lowercase(26) U=uppercase(26) D=digits(10) — use Array.from() for surrogates
const MAPS = {
  script:         { L:'𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏', U:'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵' },
  boldScript:     { L:'𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃', U:'𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩' },
  fraktur:        { L:'𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷', U:'𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ' },
  boldFraktur:    { L:'𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟', U:'𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅' },
  double:         { L:'𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫', U:'𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ', D:'𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡' },
  monospace:      { L:'𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣', U:'𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉', D:'𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿' },
  bold:           { L:'𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳', U:'𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙', D:'𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗' },
  italic:         { L:'𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧', U:'𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍' },
  boldItalic:     { L:'𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛', U:'𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁' },
  sansSerif:      { L:'𝖺𝖻𝖼𝖽𝖾𝖿𝗀𝗁𝗂𝗃𝗄𝗅𝗆𝗇𝗈𝗉𝗊𝗋𝗌𝗍𝗎𝗏𝗐𝗑𝗒𝗓', U:'𝖠𝖡𝖢𝖣𝖤𝖥𝖦𝖧𝖨𝖩𝖪𝖫𝖬𝖭𝖮𝖯𝖰𝖱𝖲𝖳𝖴𝖵𝖶𝖷𝖸𝖹', D:'𝟢𝟣𝟤𝟥𝟦𝟧𝟨𝟩𝟪𝟫' },
  sansBold:       { L:'𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇', U:'𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭', D:'𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵' },
  sansItalic:     { L:'𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻', U:'𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡' },
  sansBoldItalic: { L:'𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯', U:'𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕' },
  fullwidth:      { L:'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ', U:'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ', D:'０１２３４５６７８９' },
  smallCaps:      { L:'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ', U:'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  circled:        { L:'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ', U:'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ', D:'⓪①②③④⑤⑥⑦⑧⑨' },
  parenthesized:  { L:'⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵', U:'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  superscript:    { L:'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖqʳˢᵗᵘᵛʷˣʸᶻ', U:'ᴬᴮCDᴱFᴳᴴᴵᴶᴷᴸᴹᴺOᴾQᴿSTᵁVᵂXYZ', D:'⁰¹²³⁴⁵⁶⁷⁸⁹' },
  subscript:      { L:'ₐbcdₑfgₕᵢⱼₖₗₘₙₒₚqᵣₛₜᵤᵥwₓyz', U:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', D:'₀₁₂₃₄₅₆₇₈₉' },
};

// ── TRANSFORM HELPERS ─────────────────────────────────────────────────────────
function mapText(text, key) {
  var m = MAPS[key]; if (!m) return text;
  var lA = Array.from(m.L||''), uA = Array.from(m.U||''), dA = Array.from(m.D||'');
  return Array.from(text).map(function(c) {
    var code = c.charCodeAt(0);
    if (code>=97&&code<=122) return lA[code-97]||c;
    if (code>=65&&code<=90)  return uA[code-65]||c;
    if (code>=48&&code<=57)  return dA[code-48]||c;
    return c;
  }).join('');
}

var CM = {
  strike:'̶', underline:'̲', dblUnder:'̳',
  overline:'̅', slash:'̸', dotAbove:'̇',
  dotBelow:'̣', tilde:'̃', ring:'̊', wavy:'̰',
  breve:'̆', macron:'̄'
};

function addCM(text, mark) {
  return Array.from(text).map(function(c){ return c===' '?c:c+mark; }).join('');
}

var FLIP = {
  a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',
  m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',y:'ʎ',z:'z',
  A:'∀',B:'q',C:'Ɔ',D:'p',E:'Ǝ',F:'Ⅎ',G:'פ',H:'H',I:'I',J:'ɾ',K:'K',L:'˥',
  M:'W',N:'N',O:'O',P:'d',Q:'b',R:'ɹ',S:'S',T:'┴',U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z',
  '0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ㄣ','5':'ϛ','6':'9','7':'L','8':'8','9':'6',
  '!':'¡','?':'¿','.':'˙',',':'\'','(':')',')':'(','<':'>','>':'<'
};

function upsideDown(t){ return Array.from(t).map(function(c){return FLIP[c]||c;}).reverse().join(''); }
function spaced(t){ return Array.from(t).join(' '); }
function spacedFW(t){ return Array.from(mapText(t,'fullwidth')).join(' '); }

function zalgoLight(t) {
  var mk=['́','̀','̈','̣','̥','̤'];
  return Array.from(t).map(function(c,i){
    if(c===' ')return c;
    return c+mk[i%mk.length]+(i%3===0?mk[(i+2)%mk.length]:'');
  }).join('');
}

// ── DECORATION TEMPLATES ──────────────────────────────────────────────────────
var DECOS = [
  // Hearts & Love
  {id:'d-h1',  name:'Heart Frame',      cats:'love cute',          p:'♡ ',     s:' ♡'},
  {id:'d-h2',  name:'Filled Heart',     cats:'love',               p:'❤ ',     s:' ❤'},
  {id:'d-h3',  name:'Double Heart',     cats:'love cute',          p:'♡♡ ',    s:' ♡♡'},
  {id:'d-h4',  name:'Heart Banner',     cats:'love cute',          p:'♡˚ ',    s:' ˚♡'},
  {id:'d-h5',  name:'Heart Eyes',       cats:'love cute',          p:'♥‿♥ ',   s:' ♥‿♥'},
  {id:'d-h6',  name:'Love Sign',        cats:'love',               p:'❣ ',     s:' ❣'},
  {id:'d-h7',  name:'Cupid',            cats:'love',               p:'⌣♥⌣ ',   s:' ⌣♥⌣'},
  // Stars & Sparkles
  {id:'d-s1',  name:'Star Wrap',        cats:'fancy',              p:'★ ',     s:' ★'},
  {id:'d-s2',  name:'Star Swipe',       cats:'fancy',              p:'★彡 ',   s:' 彡★'},
  {id:'d-s3',  name:'Triple Star',      cats:'fancy',              p:'★★★ ',   s:' ★★★'},
  {id:'d-s4',  name:'Star Dots',        cats:'aesthetic cute',     p:'⋆｡°✩ ', s:' ✩°｡⋆'},
  {id:'d-s5',  name:'Hollow Star',      cats:'fancy',              p:'☆ ',     s:' ☆'},
  {id:'d-s6',  name:'Star Sweep',       cats:'fancy',              p:'☆彡 ',   s:' 彡☆'},
  {id:'d-sp1', name:'Four Sparkle',     cats:'fancy cute',         p:'✦ ',     s:' ✦'},
  {id:'d-sp2', name:'Diamond Sparkle',  cats:'fancy',              p:'✧ ',     s:' ✧'},
  {id:'d-sp3', name:'Glitter',          cats:'cute aesthetic',     p:'✨ ',    s:' ✨'},
  // Flowers & Nature
  {id:'d-f1',  name:'Flower',           cats:'cute aesthetic',     p:'✿ ',     s:' ✿'},
  {id:'d-f2',  name:'Open Flower',      cats:'cute',               p:'❀ ',     s:' ❀'},
  {id:'d-f3',  name:'Rose Vine',        cats:'cute love',          p:'✾ ',     s:' ✾'},
  {id:'d-f4',  name:'Floral Leaf',      cats:'aesthetic',          p:'❧ ',     s:' ❧'},
  {id:'d-f5',  name:'Snowflake',        cats:'cute aesthetic',     p:'❄ ',     s:' ❄'},
  // Crown & Royalty
  {id:'d-c1',  name:'Queen Crown',      cats:'fancy gaming',       p:'♛ ',     s:' ♛'},
  {id:'d-c2',  name:'King Crown',       cats:'fancy gaming',       p:'♔ ',     s:' ♔'},
  {id:'d-c3',  name:'Fleur-de-Lis',     cats:'fancy',              p:'⚜ ',     s:' ⚜'},
  // Celestial
  {id:'d-cel1',name:'Moon Frame',       cats:'aesthetic cute',     p:'☾ ',     s:' ☽'},
  {id:'d-cel2',name:'Sun Frame',        cats:'aesthetic',          p:'☀ ',     s:' ☀'},
  {id:'d-cel3',name:'Moon & Stars',     cats:'aesthetic cute',     p:'✩☽ ',    s:' ☾✩'},
  // Music
  {id:'d-m1',  name:'Music Note',       cats:'cute aesthetic',     p:'♬ ',     s:' ♬'},
  {id:'d-m2',  name:'Music Beat',       cats:'cute',               p:'♩♪ ',    s:' ♪♩'},
  // Arrows
  {id:'d-a1',  name:'Arrow Wrap',       cats:'symbols',            p:'→ ',     s:' ←'},
  {id:'d-a2',  name:'Guillemet',        cats:'symbols fancy',      p:'» ',     s:' «'},
  {id:'d-a3',  name:'Double Guillemet', cats:'symbols fancy',      p:'≫ ',     s:' ≪'},
  {id:'d-a4',  name:'Double Arrow',     cats:'symbols',            p:'→→ ',    s:' ←←'},
  // Diamonds
  {id:'d-dia1',name:'Solid Diamond',    cats:'fancy symbols',      p:'◆ ',     s:' ◆'},
  {id:'d-dia2',name:'Ornate Diamond',   cats:'fancy',              p:'❖ ',     s:' ❖'},
  {id:'d-dia3',name:'Small Diamond',    cats:'symbols',            p:'◇ ',     s:' ◇'},
  // Japanese / Asian Brackets
  {id:'d-j1',  name:'JP 『』',          cats:'aesthetic',          p:'『',     s:'』'},
  {id:'d-j2',  name:'JP 【】',          cats:'aesthetic',          p:'【',     s:'】'},
  {id:'d-j3',  name:'Angle 《》',       cats:'aesthetic',          p:'《 ',    s:' 》'},
  {id:'d-j4',  name:'Tortoise 〔〕',    cats:'aesthetic',          p:'〔 ',    s:' 〕'},
  {id:'d-j5',  name:'Corner 「」',      cats:'aesthetic',          p:'「 ',    s:' 」'},
  // Brackets
  {id:'d-bk1', name:'Double Bracket',   cats:'symbols gaming',     p:'[[ ',    s:' ]]'},
  {id:'d-bk2', name:'Ceiling Bracket',  cats:'symbols',            p:'⌈ ',     s:' ⌉'},
  {id:'d-bk3', name:'Floor Bracket',    cats:'symbols',            p:'⌊ ',     s:' ⌋'},
  // Fancy Frames
  {id:'d-fn1', name:'Crown Frame ꧁꧂',  cats:'fancy social',       p:'꧁',     s:'꧂'},
  {id:'d-fn2', name:'Tibetan ༺༻',       cats:'fancy',              p:'༺ ',     s:' ༻'},
  {id:'d-fn3', name:'Tibetan ༼༽',       cats:'fancy',              p:'༼ ',     s:' ༽'},
  {id:'d-fn4', name:'Wave Border',      cats:'fancy',              p:'≋≋ ',    s:' ≋≋'},
  {id:'d-fn5', name:'Dot Pattern',      cats:'fancy aesthetic',    p:'•.• ',   s:' •.•'},
  {id:'d-fn6', name:'Bold Line',        cats:'fancy',              p:'━━ ',    s:' ━━'},
  {id:'d-fn7', name:'Double Line',      cats:'fancy',              p:'══ ',    s:' ══'},
  {id:'d-fn8', name:'Gothic Cross',     cats:'gothic symbols',     p:'† ',     s:' †'},
  {id:'d-fn9', name:'Cross Ornate',     cats:'gothic symbols',     p:'✝ ',     s:' ✝'},
  // Cute
  {id:'d-cu1', name:'Cute Curl ꒰꒱',    cats:'cute',               p:'꒰ ',     s:' ꒱'},
  {id:'d-cu2', name:'Heart Swirl',      cats:'cute love',          p:'˚ʚ♡ɞ˚ ', s:' ˚ʚ♡ɞ˚'},
  {id:'d-cu3', name:'Tiny Sparkle',     cats:'cute aesthetic',     p:'⊹ ',     s:' ⊹'},
  {id:'d-cu4', name:'Six Star',         cats:'cute',               p:'✰ ',     s:' ✰'},
  {id:'d-cu5', name:'Parenthesis Soft', cats:'cute',               p:'◟ ',     s:' ◞'},
  {id:'d-cu6', name:'Petal Wrap',       cats:'cute aesthetic',     p:'⑅ ',     s:' ⑅'},
  // Aesthetic
  {id:'d-ae1', name:'Dot Rhythm',       cats:'aesthetic',          p:'· · · ', s:' · · ·'},
  {id:'d-ae2', name:'Yin Yang',         cats:'aesthetic',          p:'☯ ',     s:' ☯'},
  {id:'d-ae3', name:'Peace',            cats:'aesthetic',          p:'☮ ',     s:' ☮'},
  {id:'d-ae4', name:'Minimal Dash',     cats:'aesthetic',          p:'─ ',     s:' ─'},
  {id:'d-ae5', name:'Infinity',         cats:'aesthetic symbols',  p:'∞ ',     s:' ∞'},
  {id:'d-ae6', name:'Circle Orb',       cats:'aesthetic symbols',  p:'○ ',     s:' ○'},
  {id:'d-ae7', name:'Asterism',         cats:'aesthetic symbols',  p:'⁂ ',     s:' ⁂'},
  {id:'d-ae8', name:'Angel Halo',       cats:'cute aesthetic',     p:'°。 ',   s:' 。°'},
  // Gaming
  {id:'d-g1',  name:'Crossed Swords',   cats:'gaming',             p:'⚔ ',     s:' ⚔'},
  {id:'d-g2',  name:'HP Bar',           cats:'gaming',             p:'▓▒░ ',   s:' ░▒▓'},
  {id:'d-g3',  name:'Malt Cross',       cats:'gaming gothic',      p:'✠ ',     s:' ✠'},
  {id:'d-g4',  name:'Target',           cats:'gaming',             p:'⊕ ',     s:' ⊕'},
  {id:'d-g5',  name:'Shield',           cats:'gaming',             p:'⊛ ',     s:' ⊛'},
  {id:'d-g6',  name:'Thunder',          cats:'gaming symbols',     p:'⚡ ',    s:' ⚡'},
  {id:'d-g7',  name:'Triangle',         cats:'gaming symbols',     p:'△ ',     s:' △'},
  // Social & WhatsApp
  {id:'d-so1', name:'Social Star',      cats:'social fancy',       p:'✨ ',    s:' ✨'},
  {id:'d-so2', name:'Social Music',     cats:'social cute',        p:'🎵 ',    s:' 🎵'},
  {id:'d-so3', name:'Checkmark',        cats:'social symbols',     p:'✔ ',     s:' ✔'},
  {id:'d-so4', name:'Bullet Wrap',      cats:'social',             p:'• ',     s:' •'},
  {id:'d-so5', name:'Fancy Bio',        cats:'social fancy',       p:'»• ',    s:' •«'},
];

// ── BUILD STYLES ARRAY ────────────────────────────────────────────────────────
var STYLES = [];
var seenOutputs = {};
var TEST = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
var duplicateCount = 0;

function push(style) {
  var sig = style.fn(TEST);
  if (seenOutputs[sig]) { duplicateCount++; return; }
  seenOutputs[sig] = true;
  STYLES.push(style);
}

// ── Layer 1: Base Unicode Alphabets (19) ─────────────────────────────────────
var BASE_META = [
  ['script',         'Cursive Script',       'cursive italic',           'cursive script elegant instagram whatsapp'],
  ['boldScript',     'Bold Cursive',         'cursive bold',             'cursive bold instagram tiktok whatsapp social'],
  ['fraktur',        'Fraktur Gothic',       'gothic',                   'gothic fraktur medieval gaming dark'],
  ['boldFraktur',    'Bold Gothic',          'gothic bold',              'gothic bold gaming dark dramatic'],
  ['double',         'Double Struck',        'bold symbols',             'double math bold discord technical'],
  ['monospace',      'Monospace',            'fancy',                    'monospace code clean subtle'],
  ['bold',           'Math Bold',            'bold',                     'bold math strong whatsapp'],
  ['italic',         'Math Italic',          'italic',                   'italic math elegant'],
  ['boldItalic',     'Bold Italic',          'bold italic',              'bold italic dramatic'],
  ['sansSerif',      'Sans Serif',           'fancy',                    'sans clean modern minimal'],
  ['sansBold',       'Sans Bold',            'bold',                     'sans bold strong clean'],
  ['sansItalic',     'Sans Italic',          'italic',                   'sans italic modern'],
  ['sansBoldItalic', 'Sans Bold Italic',     'bold italic',              'sans bold italic'],
  ['fullwidth',      'Aesthetic Wide',       'aesthetic',                'aesthetic wide vaporwave fullwidth'],
  ['smallCaps',      'Small Caps',           'fancy',                    'small caps formal elegant'],
  ['circled',        'Circled',              'bubble symbols',           'bubble circled cute kawaii'],
  ['parenthesized',  'Parenthesized',        'bubble symbols',           'parenthesized cute bubble'],
  ['superscript',    'Superscript',          'symbols fancy',            'superscript tiny cute small'],
  ['subscript',      'Subscript',            'symbols fancy',            'subscript tiny small'],
];
BASE_META.forEach(function(row) {
  var key=row[0], name=row[1], cats=row[2], tags=row[3];
  push({ id:key, name:name, cats:cats, tags:tags, fn:function(t){return mapText(t,key);} });
});

// ── Layer 2: Special Transforms (3) ──────────────────────────────────────────
push({ id:'upside-down', name:'Upside Down',     cats:'symbols glitch', tags:'flip reverse funny upside',    fn:upsideDown });
push({ id:'spaced',      name:'S p a c e d',     cats:'aesthetic',      tags:'spaced vaporwave aesthetic',   fn:spaced });
push({ id:'spaced-fw',   name:'Ａ ｅ ｓ ｔ ｈ', cats:'aesthetic',      tags:'aesthetic vaporwave fullwidth', fn:spacedFW });

// ── Layer 3: Combining Mark Styles (12) ──────────────────────────────────────
[
  ['strike',    'Strikethrough',     'glitch',              'strike crossed glitch'],
  ['underline', 'Underline',         'fancy',               'underline formal'],
  ['dblUnder',  'Double Underline',  'fancy',               'underline double'],
  ['overline',  'Overline',          'fancy',               'overline bar formal'],
  ['slash',     'Slashed',           'glitch',              'slash crossed glitch'],
  ['dotAbove',  'Dotted Above',      'cute',                'dot cute kawaii'],
  ['dotBelow',  'Dotted Below',      'fancy aesthetic',     'dot elegant'],
  ['tilde',     'Tilde Accent',      'aesthetic',           'tilde wavy aesthetic'],
  ['ring',      'Ring Above',        'cute',                'ring cute circle'],
  ['wavy',      'Wavy Underline',    'aesthetic',           'wavy underline'],
  ['breve',     'Breve Accent',      'aesthetic',           'breve arch accent'],
  ['macron',    'Macron Bar',        'fancy',               'macron bar formal'],
].forEach(function(row) {
  var mark=row[0], name=row[1], cats=row[2], tags=row[3];
  push({ id:'cm-'+mark, name:name, cats:cats, tags:tags, fn:(function(m){return function(t){return addCM(t,CM[m]);};})(mark) });
});
push({ id:'cm-zalgo', name:'Glitch Text', cats:'glitch', tags:'glitch zalgo creepy horror', fn:zalgoLight });

// ── Layer 4: Decoration-Only Styles (plain text + prefix/suffix) ─────────────
DECOS.forEach(function(d) {
  push({ id:'dec-'+d.id, name:d.name, cats:d.cats, tags:d.cats+' decoration', fn:function(t){return d.p+t+d.s;} });
});

// ── Layer 5: Curated Combos (base + decoration) ───────────────────────────────
// Matrix: base key → array of deco IDs to pair with it
var COMBO_MATRIX = {
  boldScript: ['d-h1','d-h2','d-h3','d-h4','d-h6','d-s1','d-s2','d-s4','d-sp1','d-sp2','d-f1','d-f2','d-f3','d-c1','d-cel1','d-fn1','d-fn2','d-fn3','d-j1','d-j2','d-cu1','d-cu2','d-cu4','d-ae2','d-so1','d-m1','d-dia1','d-a2','d-s5','d-s6'],
  script:     ['d-h1','d-h4','d-h6','d-s1','d-s4','d-sp2','d-f1','d-f2','d-f3','d-c1','d-cel1','d-fn1','d-fn2','d-j1','d-cu1','d-cu2','d-ae1','d-ae8','d-m1','d-dia1'],
  fraktur:    ['d-c1','d-c2','d-c3','d-g1','d-g3','d-g2','d-a3','d-dia1','d-fn2','d-bk1','d-g7','d-fn8','d-fn9','d-fn7'],
  boldFraktur:['d-c1','d-g1','d-g3','d-fn1','d-fn2','d-a3','d-dia2','d-fn7','d-bk1','d-fn8','d-g6','d-g7'],
  bold:       ['d-s1','d-s2','d-dia1','d-a1','d-a2','d-bk1','d-bk2','d-g2','d-fn1','d-c1','d-h2','d-fn7','d-a3','d-dia2'],
  boldItalic: ['d-h2','d-sp1','d-s4','d-f1','d-j1','d-j3','d-h6','d-c1','d-fn1','d-fn2','d-ae8'],
  italic:     ['d-f1','d-cel1','d-ae1','d-s4','d-cu1','d-j3','d-h1','d-c1','d-fn2','d-m1'],
  double:     ['d-bk2','d-bk3','d-bk1','d-g2','d-dia2','d-a3','d-j2','d-m1','d-s1','d-c1','d-fn1','d-ae2'],
  monospace:  ['d-g2','d-bk1','d-a1','d-fn6','d-fn7','d-ae4','d-g1','d-a3','d-fn2'],
  sansSerif:  ['d-ae4','d-ae1','d-ae2','d-j4','d-fn5','d-fn4','d-fn1','d-dia1','d-s1'],
  sansBold:   ['d-s1','d-dia1','d-g1','d-c1','d-a2','d-j1','d-fn1','d-fn7'],
  sansItalic: ['d-ae2','d-cel1','d-s4','d-f1','d-cu1','d-j3','d-h1','d-s1'],
  sansBoldItalic:['d-c1','d-fn1','d-dia1','d-j1','d-h1','d-s1','d-g1'],
  fullwidth:  ['d-h1','d-f1','d-cu1','d-ae2','d-j4','d-fn6','d-s1','d-j1'],
  smallCaps:  ['d-h1','d-f1','d-cu4','d-a1','d-j1','d-fn2','d-c1','d-s4','d-g1'],
  circled:    ['d-h1','d-s1','d-j2','d-cu1','d-fn1','d-s4'],
  parenthesized:['d-cu3','d-ae1','d-j4','d-a2','d-s1','d-h1'],
  superscript:['d-h1','d-s4','d-cu3','d-j1','d-ae8'],
  subscript:  ['d-ae1','d-ae4','d-s5','d-h4'],
};

// Build a lookup from deco id to deco object
var decoById = {};
DECOS.forEach(function(d){ decoById[d.id]=d; });

// Find base style name for combo naming
var baseNameMap = {};
BASE_META.forEach(function(row){ baseNameMap[row[0]]=row[1]; });

Object.keys(COMBO_MATRIX).forEach(function(baseKey) {
  var baseName = baseNameMap[baseKey]||baseKey;
  COMBO_MATRIX[baseKey].forEach(function(decoId) {
    var d = decoById[decoId];
    if (!d) return;
    var id = baseKey+'-'+decoId;
    var name = baseName+' '+d.name;
    // Merge cats
    var cats = 'combo '+BASE_META.filter(function(r){return r[0]===baseKey;})[0][2]+' '+d.cats;
    var tags = (baseKey+' '+d.cats+' '+d.name.toLowerCase()).replace(/[^a-z ]/g,'');
    var p=d.p, s=d.s, bk=baseKey;
    push({ id:id, name:name, cats:cats, tags:tags,
      fn:function(t){ return p+mapText(t,bk)+s; }
    });
  });
});

// ── Layer 6: Combining Mark + Base combos (14) ────────────────────────────────
var CM_BASE_COMBOS = [
  ['boldScript', 'strike',    'Bold Cursive Strikethrough', 'cursive glitch bold'],
  ['script',     'underline', 'Cursive Underline',          'cursive fancy'],
  ['script',     'dotAbove',  'Cursive Dotted',             'cursive cute'],
  ['boldScript', 'tilde',     'Bold Cursive Tilde',         'cursive aesthetic'],
  ['boldScript', 'wavy',      'Bold Cursive Wavy',          'cursive aesthetic'],
  ['fraktur',    'strike',    'Gothic Strikethrough',       'gothic glitch'],
  ['fraktur',    'ring',      'Gothic Ring',                'gothic cute'],
  ['bold',       'underline', 'Bold Underline',             'bold fancy'],
  ['bold',       'strike',    'Bold Strikethrough',         'bold glitch'],
  ['double',     'underline', 'Double Struck Underline',    'symbols fancy'],
  ['monospace',  'overline',  'Monospace Overline',         'fancy'],
  ['sansBold',   'underline', 'Sans Bold Underline',        'bold fancy'],
  ['boldItalic', 'dotAbove',  'Bold Italic Dotted',         'bold italic cute'],
  ['fullwidth',  'tilde',     'Aesthetic Tilde',            'aesthetic'],
];
CM_BASE_COMBOS.forEach(function(row) {
  var bk=row[0], mk=row[1], name=row[2], cats=row[3];
  var mark=CM[mk], b=bk;
  push({ id:bk+'-cm-'+mk, name:name, cats:cats, tags:cats.replace(/ /g,' '),
    fn:function(t){ return addCM(mapText(t,b), mark); }
  });
});

// ── CATEGORIES LIST ───────────────────────────────────────────────────────────
var ALL_CATS = [
  {id:'all',       label:'All'},
  {id:'cursive',   label:'Cursive'},
  {id:'bold',      label:'Bold'},
  {id:'italic',    label:'Italic'},
  {id:'gothic',    label:'Gothic'},
  {id:'bubble',    label:'Bubble'},
  {id:'cute',      label:'Cute'},
  {id:'love',      label:'Love'},
  {id:'aesthetic', label:'Aesthetic'},
  {id:'fancy',     label:'Fancy'},
  {id:'gaming',    label:'Gaming'},
  {id:'glitch',    label:'Glitch'},
  {id:'symbols',   label:'Symbols'},
  {id:'social',    label:'Social'},
];

// ── PUBLIC API ────────────────────────────────────────────────────────────────
global.StyleEngine = {
  STYLES: STYLES,
  ALL_CATS: ALL_CATS,
  DUPE_COUNT: duplicateCount,
  TOTAL_PRE_DEDUP: STYLES.length + duplicateCount,

  /** Filter styles by category and search query */
  filter: function(cat, query) {
    var list = cat && cat !== 'all'
      ? STYLES.filter(function(s){ return s.cats.indexOf(cat) !== -1; })
      : STYLES;
    if (!query) return list;
    var q = query.toLowerCase();
    return list.filter(function(s){
      return s.name.toLowerCase().indexOf(q) !== -1 ||
             s.tags.toLowerCase().indexOf(q) !== -1 ||
             s.id.indexOf(q) !== -1;
    });
  }
};

}(window));
