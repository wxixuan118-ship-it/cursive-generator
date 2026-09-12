// signature-engine.js — the Unicode maps and the single render function
// shared by the cursive signature hub, its style pages and the build script.
// Loads in the browser (window.SigEngine) and in Node (module.exports), so the
// build can pre-render static examples with exactly the code the page runs.
//
// Preset shape: {pre, post, style, mode?, sep?}
//   style  key of ALPHA below
//   mode   'initials' | 'firstInitial' | 'initialLast' | 'lower' | 'upper'
//          | 'capital' | 'spaced' | 'underline'
//   sep    replaces spaces between words (e.g. ' ♡ ') after styling
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SigEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var ALPHA = {
    script:        {l:"𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏", u:"𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵"},
    boldScript:    {l:"𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃", u:"𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩"},
    italic:        {l:"𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧", u:"𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍"},
    boldItalic:    {l:"𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛", u:"𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁"},
    sansItalic:    {l:"𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻", u:"𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡"},
    sansBoldItalic:{l:"𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯", u:"𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕"},
    fraktur:       {l:"𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷", u:"𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ"},
    boldFraktur:   {l:"𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟", u:"𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅"},
    double:        {l:"𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫", u:"𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ"},
    smallCaps:     {l:"ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ", u:"ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ"},
    monospace:     {l:"𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣", u:"𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉"}
  };
  var cache = {};
  function alpha(k) {
    if (!cache[k]) { var a = ALPHA[k]; cache[k] = a ? {l: Array.from(a.l), u: Array.from(a.u)} : null; }
    return cache[k];
  }

  function cv(t, k) {
    var a = alpha(k); if (!a) return t;
    return Array.from(t).map(function (c) {
      var x = c.charCodeAt(0);
      if (x >= 97 && x <= 122) return a.l[x - 97] || c;
      if (x >= 65 && x <= 90) return a.u[x - 65] || c;
      return c;
    }).join('');
  }

  // Text-level transforms that run before the Unicode mapping.
  function shape(t, mode) {
    var words = t.trim().split(/\s+/).filter(Boolean);
    switch (mode) {
      case 'initials':
        return words.map(function (w) { return w[0].toUpperCase() + '.'; }).join('');
      case 'firstInitial':
        return words.length > 1 ? words[0] + ' ' + words[words.length - 1][0].toUpperCase() + '.' : t;
      case 'initialLast':
        return words.length > 1 ? words[0][0].toUpperCase() + '. ' + words.slice(1).join(' ') : t;
      case 'lower': return t.toLowerCase();
      case 'upper': return t.toUpperCase();
      case 'capital': return words.map(function (w) { return w[0].toUpperCase() + w.slice(1).toLowerCase(); }).join(' ');
      default: return t;
    }
  }
  // Character-level decorations applied after the mapping.
  function decorate(s, mode) {
    if (mode === 'spaced') return Array.from(s).join(' ').replace(/   /g, '  ');
    if (mode === 'underline') return Array.from(s).map(function (c) { return c === ' ' ? c : c + '̲'; }).join('');
    return s;
  }

  function makeSig(text, p) {
    var body = cv(shape(text, p.mode), p.style);
    body = decorate(body, p.mode);
    if (p.sep) body = body.replace(/ +/g, p.sep);
    return (p.pre || '') + body + (p.post || '');
  }
  return {ALPHA: ALPHA, convert: cv, render: makeSig, styles: Object.keys(ALPHA)};
});
