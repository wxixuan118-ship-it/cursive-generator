var S = {
  script:      { l: '𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏', u: '𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵' },
  boldScript:  { l: '𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃', u: '𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩' },
  italic:      { l: '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧', u: '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍' },
  boldItalic:  { l: '𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛', u: '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁' },
  fraktur:     { l: '𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷', u: '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ' },
  boldFraktur: { l: '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟', u: '𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅' },
  double:      { l: '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫', u: '𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ' },
  sansItalic:  { l: '𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻', u: '𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡' }
};

var STYLES = [
  { k: 'boldScript',  name: 'Bold Cursive' },
  { k: 'script',      name: 'Elegant' },
  { k: 'italic',      name: 'Italic' },
  { k: 'boldItalic',  name: 'Bold Italic' },
  { k: 'fraktur',     name: 'Gothic' },
  { k: 'boldFraktur', name: 'Bold Gothic' },
  { k: 'double',      name: 'Double' },
  { k: 'sansItalic',  name: 'Sans Italic' }
];

var active = STYLES[0];

function cv(t, k) {
  var a = S[k]; if (!a) return t;
  var l = [...a.l], u = [...a.u];
  return [...t].map(function(c) {
    var x = c.charCodeAt(0);
    if (x >= 97 && x <= 122) return l[x - 97] || c;
    if (x >= 65 && x <= 90)  return u[x - 65] || c;
    return c;
  }).join('');
}

function getInput() { return document.getElementById('input').value || ''; }

function copyText(text, btn, label) {
  function done() {
    if (btn) {
      var orig = btn.textContent;
      btn.textContent = label || 'Copied!';
      btn.classList.add('done');
      setTimeout(function() { btn.textContent = orig; btn.classList.remove('done'); }, 1500);
    }
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(fb);
  } else { fb(); }
  function fb() {
    var ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta); done();
  }
}

function downloadPng(cursiveText, styleName) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var fontSize = 96, padding = 48;
  ctx.font = fontSize + 'px system-ui, -apple-system, sans-serif';
  var w = Math.max(ctx.measureText(cursiveText).width + padding * 2, 400);
  canvas.width = Math.ceil(w);
  canvas.height = fontSize + padding * 2;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = fontSize + 'px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = '#2a2a26';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(cursiveText, canvas.width / 2, canvas.height / 2);
  var link = document.createElement('a');
  var raw = getInput().slice(0, 20).replace(/[^a-z0-9]/gi, '-') || 'cursive';
  link.download = raw + '-' + styleName.toLowerCase().replace(/\s/g, '-') + '.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function buildStylePills() {
  var bar = document.getElementById('styles'); bar.innerHTML = '';
  STYLES.forEach(function(s) {
    var b = document.createElement('button');
    b.className = 'style-pill' + (s.k === active.k ? ' active' : '');
    b.textContent = s.name;
    b.addEventListener('click', function() { active = s; build(); });
    bar.appendChild(b);
  });
}

function buildPrimary() {
  var text = getInput();
  var out = text ? cv(text, active.k) : '';
  document.getElementById('primary-out').textContent = out;
  document.getElementById('primary-label').textContent = active.name;
}

function buildAllRows() {
  var text = getInput();
  var wrap = document.getElementById('all-rows'); wrap.innerHTML = '';
  STYLES.forEach(function(s) {
    var out = text ? cv(text, s.k) : '';
    var row = document.createElement('div');
    row.className = 'style-row';
    row.innerHTML = '<div class="style-row-name">' + s.name + '</div>'
      + '<div class="style-row-out">' + out + '</div>'
      + '<div class="style-row-copy">Copy</div>';
    row.addEventListener('click', function() { copyText(out); });
    wrap.appendChild(row);
  });
}

function build() {
  buildStylePills();
  buildPrimary();
  buildAllRows();
}

// Init
build();

document.getElementById('input').addEventListener('input', function() { build(); });
document.getElementById('input').focus();

document.getElementById('btn-copy').addEventListener('click', function(e) {
  var text = getInput();
  if (!text) return;
  copyText(cv(text, active.k), e.currentTarget, 'Copied ✓');
});

document.getElementById('btn-dl').addEventListener('click', function() {
  var text = getInput();
  if (!text) return;
  downloadPng(cv(text, active.k), active.name);
});
