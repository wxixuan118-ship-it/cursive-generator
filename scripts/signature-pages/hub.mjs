import { HUB_PRESETS, TOOLS } from './_shared.mjs';

// copy-and-paste-cursive-signature.html — the hub. Title, H1, description,
// URL and FAQ are unchanged from the pre-cluster page (it ranks); what changed
// is that each style paragraph now links to its own page, the heart section
// defers to the heart page, and a "browse by style" grid sits under the tool.
export default {
  isHub: true,
  key: 'hub',
  file: 'copy-and-paste-cursive-signature.html',
  label: 'All Styles',
  crumb: 'Cursive Signature',
  appName: 'Cursive Signature Copy and Paste Generator',
  title: 'Cursive Signature Generator – Copy and Paste 40+ Styles',
  description: 'Create a cursive signature you can copy and paste. Compare 40+ elegant, fancy, cute, bold, heart, and symbol styles with no signup required.',
  ogDescription: 'Type your name and instantly get 40+ cursive signature styles — elegant, fancy, cute, heart, symbol. One-click copy for Instagram, TikTok, Discord, WhatsApp and anywhere Unicode is supported.',
  h1: 'Cursive Signature Generator – Copy and Paste',
  eyebrow: 'Free · 40+ styles · instant copy · no signup',
  intro: 'Create a cursive signature you can copy and paste into Instagram, TikTok, Discord, WhatsApp, email, and other apps. Type your name, compare 40+ Unicode signature styles, and copy your favorite instantly—no download, font installation, or account required.',
  sample: 'Olivia',
  names: ['Olivia', 'Sophia', 'Emma', 'Isabella', 'Ava', 'Charlotte', 'Liam', 'Noah', 'Mia', 'Amelia'],
  defaultCat: 'all',
  tabs: [['all', 'All'], ['elegant', 'Elegant'], ['fancy', 'Fancy'], ['simple', 'Simple'], ['bold', 'Bold'], ['cute', 'Cute'], ['heart', 'Heart'], ['symbol', 'Symbols']],
  presets: HUB_PRESETS,
  hero: { style: 'boldScript' },
  heroNote: 'Bold Cursive — the default signature style.',
  builderTitle: 'Customize Your Cursive Signature',
  socialStyle: 'boldScript',
  socialH2: 'Cursive Signature for Instagram and Social Media',
  socialP: 'Preview how your cursive signature looks in different platforms.',
  namesP: "Click a name to load it into the generator above, or type any name in the box.",
  browseP: "Each tab above is a preview. The style pages below carry larger, different preset sets — the ones marked “only here” do not appear anywhere else on the site.",
  namesH2: 'Cursive Signature Examples — Popular Names',
  crumbs: [['Home', '/'], ['Copy and Paste', '/copy-and-paste-cursive-font.html'], ['Cursive Signature', null]],
  breadcrumbLd: [
    { name: 'Home', item: '/' },
    { name: 'Copy and Paste', item: '/copy-and-paste-cursive-font.html' },
    { name: 'Cursive Signature Copy and Paste', item: '/copy-and-paste-cursive-signature.html' },
  ],
  keywords: ['cursive signature copy and paste', 'cursive signature generator', ['cursive signature font', '/cursive-signature-fonts.html'], 'cursive signature text', 'signature copy paste', ['cursive name generator', '/cursive-name-generator.html'], ['cursive font copy paste', '/copy-and-paste-cursive-font.html'], ['fancy cursive signature', '/fancy-cursive-signature.html'], ['cute cursive signature', '/cute-cursive-signature.html'], ['cursive signature with heart', '/cursive-signature-with-heart.html'], ['elegant cursive signature', '/elegant-cursive-signature.html'], 'cursive signature for instagram', 'signature text generator'],
  asideBox: `<strong style="display:block;font-size:13px;margin-bottom:.5rem">Want a name-only tool?</strong>
            <a href="/cursive-name-generator.html" style="font-size:13px;color:var(--sage)">Cursive Name Generator →</a>
            <br>
            <a href="/cursive-signature-fonts.html" style="font-size:13px;color:var(--sage);margin-top:.25rem;display:inline-block">Compare Signature Fonts →</a>`,
  articleH2: 'Cursive Signature Copy and Paste — How It Works',
  articleIntro: [
    `<div class="cluster-flow">
            <p>This page answers a specific user need. For the full category, visit <a href="/copy-and-paste/">Copy & Paste Cursive Tools</a>, or return to the <a href="/">Cursive Generator</a> homepage.</p>
            <div class="flow-links">
              <a href="/copy-and-paste/">Copy & Paste Cursive Tools</a>
              <a href="/">Cursive Generator</a>
            </div>
          </div>`,
    'This tool converts the letters in your name into Unicode script and calligraphy characters that resemble cursive handwriting. Because these are standard Unicode characters — not images or fonts — they remain copyable text that works in any text field without installing anything. Type your name, pick a style, click Copy, and paste anywhere.',
  ],
  figure: `<figure class="page-preview" style="margin:28px 0;max-width:560px;border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--paper)">
          <img src="assets/previews/copy-and-paste-cursive-signature.svg" width="1200" height="630" loading="lazy" decoding="async"
          style="display:block;width:100%;height:auto" alt="The words &quot;Signature&quot; shown in copy-and-paste cursive signature style — preview from the Cursive Signature Copy and Paste">
          <figcaption style="font-size:13px;color:var(--muted);padding:8px 14px">&ldquo;Signature&rdquo; rendered by the cursive signature copy and paste</figcaption>
          </figure>`,
  sections: [
    {
      h3: 'How to Copy and Paste a Cursive Signature',
      paras: ['1. Type your name in the input box at the top of the page. 2. Browse the 40+ signature styles — use the filter tabs (Elegant, Fancy, Cute, Heart, Symbols) to find the right look. 3. Click <strong>Copy</strong> on the card you like. 4. Paste with Ctrl+V (Windows), Cmd+V (Mac), or long-press → Paste on mobile.'],
    },
    {
      h3: 'Cursive Signature Styles Explained',
      paras: [
        'Each tab above is a preview. The dedicated style pages carry a larger, different preset set for that look — the ones marked “only here” exist nowhere else on the site.',
        '<strong><a href="/elegant-cursive-signature.html">Elegant</a>:</strong> Clean Unicode script and italic styles with at most a hairline rule or a monogram treatment — ideal for email sign-offs and display names where readability matters.<br>' +
        '<strong><a href="/fancy-cursive-signature.html">Fancy</a>:</strong> Names wrapped in decorative frames, brackets, and border symbols like ꧁꧂ and 【】 — popular for gaming usernames and profile names.<br>' +
        '<strong><a href="/simple-cursive-signature.html">Simple</a>:</strong> Plain script with no symbols at all, including lowercase and initials-only forms.<br>' +
        '<strong><a href="/bold-cursive-signature.html">Bold</a>:</strong> Thick, high-visibility bold cursive, all-caps and underlined — best for Instagram names and anywhere small text needs to stand out on mobile.<br>' +
        '<strong><a href="/cute-cursive-signature.html">Cute</a>:</strong> Soft, kawaii-style decoration with bows, flowers, sparkles and kaomoji faces — popular on TikTok bios and WhatsApp.<br>' +
        '<strong><a href="/cursive-signature-with-heart.html">Heart</a>:</strong> Heart symbols (♡ ❤ 💕 ❣) flanking your name, between first and last name, or as a tail — the most widely requested signature style for Instagram bios.<br>' +
        '<strong><a href="/aesthetic-cursive-signature.html">Symbols / Aesthetic</a>:</strong> Star trails, sparkles, arrows, and the soft ˚₊‧ symbol runs of aesthetic profiles.<br>' +
        '<strong><a href="/cursive-signature-fonts.html">Signature Fonts</a>:</strong> All 11 Unicode alphabets compared side by side with your name, plus real downloadable signature fonts.',
      ],
    },
    {
      h3: 'Cursive Signature for Instagram Bio',
      paras: ['Instagram supports Unicode text in both the Name and Bio fields. The Name field (which appears in bold under your username and in search results) has a 30-character limit — choose a shorter signature style. The Bio field allows 150 characters — enough for a signature with symbols. Bold Cursive is the most readable on small mobile screens; heart signatures are the most popular for personal accounts.'],
    },
    {
      h3: 'Cursive Signature Text vs. a Real Handwritten Signature',
      paras: ['Unicode cursive signature text is <strong>decorative</strong> — it looks like a cursive signature and works for social media profiles, bios, display names, usernames, and personal decoration. It is not:'],
      list: ['A legal electronic signature for contracts or documents', 'A cryptographically verified signature', 'A replacement for a bank or government-accepted signature'],
    },
    {
      h3: 'How to Add a Heart to Your Cursive Signature',
      paras: ['Switch to the <strong>Heart</strong> tab above, or use the <strong>Signature Builder</strong> to add any heart symbol (♡ ❤ 💕 ❣) to the left or right of your name. The most popular combination is ♡ Name ♡ in Bold Cursive. For every other placement — a heart between your first and last name, a heart tail, framed and emoji-colour hearts — see the <a href="/cursive-signature-with-heart.html">cursive signature with heart</a> page.'],
    },
  ],
  faqs: [
    ['Can I copy and paste my cursive signature?', 'Yes. Type your name, pick a style, click Copy, and paste anywhere with Ctrl+V (Windows), Cmd+V (Mac), or long-press Paste on mobile. No font installation needed.'],
    ['Is this cursive signature generator free?', 'Yes, completely free. No account, no download, no watermark. Generate and copy unlimited signatures.'],
    ['Can I use a cursive signature on Instagram?', 'Yes. Copy a Bold Cursive or Script signature here, go to Instagram → Edit Profile → Name or Bio, and paste. It shows in cursive on your profile.'],
    ['Are these signatures real fonts?', 'No — they are Unicode characters that look like cursive. No font install is needed. They work as plain text in any Unicode-supporting app.'],
    ['Can I use these to sign legal documents?', 'No. These are decorative Unicode text for social media and personal use, not legally recognized electronic signatures.'],
    ['Why does my signature look different on some devices?', 'Older devices may not support the full Unicode script range. Switch to Bold Cursive (𝓝𝓪𝓶𝓮) — it has the broadest support across modern iOS and Android devices.'],
  ],
  relatedH2: 'More Cursive Copy and Paste Tools',
  related: [TOOLS.writing, TOOLS.home, TOOLS.font, TOOLS.name, TOOLS.bold, TOOLS.fancy, TOOLS.tracing],
};
