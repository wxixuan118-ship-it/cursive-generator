"""Render the specimen images for CTG Everly Script.

Pages are laid out in HTML and shot with headless Chrome, so the previews go
through a real OpenType shaper and show the contextual joining exactly as a
design app or browser will.

    ./.venv/bin/python scripts/preview-everly-script.py
"""

from __future__ import annotations

import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "font-release")
SPEC = os.path.join(OUT, "specimen")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

FONT_URL = "../CTGEverlyScript-Regular.woff2"

FACE = """
@font-face {
  font-family: 'CTG Everly Script';
  src: url('%s') format('woff2');
  font-weight: 400; font-style: normal; font-display: block;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #faf7f1; color: #1c1a17;
       font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; }
.script { font-family: 'CTG Everly Script', cursive; font-weight: 400; }
.label { font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
         color: #a2947f; }
""" % FONT_URL

PREVIEW = """<!doctype html><meta charset="utf-8"><style>%s
body { padding: 70px 80px; width: 1500px; height: 1000px; }
.rule { height: 1px; background: #e3dbcd; margin: 34px 0; }
h1.script { font-size: 148px; line-height: 1.05; margin: 10px 0 4px; }
.sub { font-size: 15px; letter-spacing: .34em; text-transform: uppercase;
       color: #9c8e78; margin-bottom: 30px; }
.pangram { font-size: 62px; line-height: 1.35; }
.rows { font-size: 40px; line-height: 1.65; color: #33302b; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 60px;
        margin-top: 26px; }
.grid div { font-size: 54px; }
.foot { position: absolute; bottom: 46px; left: 80px; right: 80px;
        display: flex; justify-content: space-between; }
</style>
<div class="label">Cursive Text Generator</div>
<h1 class="script">CTG Everly Script</h1>
<div class="sub">A natural handwritten cursive &nbsp;·&nbsp; 1 style &nbsp;·&nbsp; 600 glyphs</div>
<div class="rule"></div>
<div class="script pangram">The quick brown fox jumps over the lazy dog</div>
<div class="rule"></div>
<div class="script rows">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 &amp; .,!?&nbsp;&ldquo;&rdquo;&nbsp;()</div>
<div class="grid script">
  <div>Beautiful Things</div><div>Love Yourself</div>
  <div>Dream Without Fear</div><div>Forever &amp; Always</div>
  <div>Handwritten with Love</div><div>Signature Studio</div>
</div>
<div class="foot"><span class="label">SIL Open Font License 1.1</span>
<span class="label">cursive-text-generator.net</span></div>
""" % FACE

ALPHABET = """<!doctype html><meta charset="utf-8"><style>%s
body { padding: 60px 70px; width: 1500px; height: 1240px; }
h2 { font-size: 11px; letter-spacing: .2em; text-transform: uppercase;
     color: #a2947f; margin: 26px 0 10px; font-weight: 600; }
.set { font-size: 60px; line-height: 1.5; letter-spacing: .02em; }
.small { font-size: 46px; line-height: 1.55; }
.title { font-size: 74px; margin-bottom: 4px; }
.cells { display: flex; flex-wrap: wrap; gap: 0 4px; }
.cells span { display: inline-flex; align-items: flex-end; justify-content: center;
              width: 78px; height: 104px; border: 1px solid #ece4d6;
              font-size: 54px; line-height: 1; padding-bottom: 16px; }
</style>
<div class="label">Character set</div>
<div class="script title">CTG Everly Script</div>
<h2>Uppercase</h2>
<div class="cells script">%s</div>
<h2>Lowercase</h2>
<div class="cells script">%s</div>
<h2>Numerals</h2>
<div class="cells script">%s</div>
<h2>Punctuation &amp; symbols</h2>
<div class="script small">. , : ; ! ? &apos; &quot; &lsquo; &rsquo; &ldquo; &rdquo; - &ndash; &mdash; _ ( ) [ ] { } / \\ | &amp; @ # $ %% + = * &lt; &gt; ^ ~ &deg; &plusmn; &times; &divide; &sect; &para; &bull; &hellip; &laquo; &raquo; &iexcl; &iquest; &copy; &reg; &trade; &euro; &pound; &yen; &cent;</div>
<h2>Accented characters</h2>
<div class="script small">&Aacute; &Agrave; &Acirc; &Auml; &Atilde; &Aring; &Ccedil; &Eacute; &Egrave; &Ecirc; &Euml; &Iacute; &Igrave; &Icirc; &Iuml; &Ntilde; &Oacute; &Ograve; &Ocirc; &Ouml; &Otilde; &Oslash; &Uacute; &Ugrave; &Ucirc; &Uuml; &Yacute; &AElig; &OElig; &THORN; &ETH;<br>
&aacute; &agrave; &acirc; &auml; &atilde; &aring; &ccedil; &eacute; &egrave; &ecirc; &euml; &iacute; &igrave; &icirc; &iuml; &ntilde; &oacute; &ograve; &ocirc; &ouml; &otilde; &oslash; &uacute; &ugrave; &ucirc; &uuml; &yacute; &yuml; &aelig; &oelig; &szlig; &thorn; &eth;</div>
"""

TEST = """<!doctype html><meta charset="utf-8"><title>CTG Everly Script - test sheet</title><style>%s
body { padding: 48px 60px; max-width: 1180px; margin: 0 auto; }
h1 { font-size: 22px; margin-bottom: 4px; }
p.note { color: #7d735f; font-size: 14px; margin-bottom: 26px; }
section { border-top: 1px solid #e6ded0; padding: 20px 0; }
h2 { font-size: 11px; letter-spacing: .2em; text-transform: uppercase;
     color: #a2947f; margin-bottom: 12px; }
.s { font-family: 'CTG Everly Script', cursive; }
.s.xl { font-size: 62px; line-height: 1.45; }
.s.lg { font-size: 44px; line-height: 1.5; }
.s.md { font-size: 30px; line-height: 1.6; }
.s.sm { font-size: 19px; line-height: 1.7; }
.dlig { font-feature-settings: "dlig" 1; }
.nocalt { font-variant-ligatures: no-contextual; }
.two { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
</style>
<h1>CTG Everly Script &mdash; test sheet</h1>
<p class="note">Loaded from CTGEverlyScript-Regular.woff2. If the text below is
not cursive, the font failed to load.</p>

<section><h2>1. Uppercase A&ndash;Z</h2><div class="s lg">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div></section>
<section><h2>2. Lowercase a&ndash;z</h2><div class="s lg">abcdefghijklmnopqrstuvwxyz</div></section>
<section><h2>3. Digits 0&ndash;9</h2><div class="s lg">0123456789</div></section>
<section><h2>4. Punctuation</h2><div class="s md">. , : ; ! ? &apos; &quot; &lsquo; &rsquo; &ldquo; &rdquo; - &ndash; &mdash; _ ( ) [ ] { } / \\ | &amp; @ # $ %% + = * &lt; &gt; ^ ~ &deg; &plusmn; &times; &divide; &sect; &para; &bull; &hellip; &laquo; &raquo; &iexcl; &iquest; &copy; &reg; &trade; &euro; &pound; &yen; &cent; &curren; &brvbar; &not; &ordf; &ordm; &sup1; &sup2; &sup3; &frac14; &frac12; &frac34;</div></section>
<section><h2>5. Accented characters</h2><div class="s md">&Aacute;&Agrave;&Acirc;&Auml;&Atilde;&Aring;&Ccedil;&Eacute;&Egrave;&Ecirc;&Euml;&Iacute;&Igrave;&Icirc;&Iuml;&Ntilde;&Oacute;&Ograve;&Ocirc;&Ouml;&Otilde;&Oslash;&Uacute;&Ugrave;&Ucirc;&Uuml;&Yacute;&Yuml;&AElig;&OElig;&ETH;&THORN;<br>
&aacute;&agrave;&acirc;&auml;&atilde;&aring;&ccedil;&eacute;&egrave;&ecirc;&euml;&iacute;&igrave;&icirc;&iuml;&ntilde;&oacute;&ograve;&ocirc;&ouml;&otilde;&oslash;&uacute;&ugrave;&ucirc;&uuml;&yacute;&yuml;&aelig;&oelig;&szlig;&eth;&thorn;<br>
r&eacute;sum&eacute; &nbsp; ca&ntilde;&oacute;n &nbsp; fa&ccedil;ade &nbsp; Str&aring;le &nbsp; Gr&uuml;&szlig;e &nbsp; cr&egrave;me br&ucirc;l&eacute;e</div></section>
<section><h2>6. Common letter combinations</h2><div class="s lg">th he ll lo ve ing tt ss oo ee ri wr st ly</div></section>
<section><h2>7. Long words</h2><div class="s md">extraordinarily &nbsp; uncharacteristically &nbsp; incomprehensibility<br>
handwriting &nbsp; congratulations &nbsp; unforgettable &nbsp; wildflowers</div></section>
<section><h2>8. Uppercase + lowercase</h2><div class="s lg">Beautiful Things &nbsp; Love Yourself<br>Dream Without Fear &nbsp; Forever &amp; Always<br>Handwritten with Love</div></section>
<section><h2>9. Contextual joining (calt on / off)</h2>
<div class="two">
  <div><div class="label">calt on (default)</div><div class="s lg">stellar morning</div></div>
  <div><div class="label">calt off</div><div class="s lg nocalt">stellar morning</div></div>
</div></section>
<section><h2>10. Discretionary ligatures (dlig)</h2>
<div class="two">
  <div><div class="label">default</div><div class="s lg">little offer</div></div>
  <div><div class="label">dlig on</div><div class="s lg dlig">little offer</div></div>
</div></section>
<section><h2>11. Size ladder</h2>
<div class="s xl">Everly 62</div><div class="s lg">Everly Script 44</div>
<div class="s md">The quick brown fox jumps over the lazy dog 30</div>
<div class="s sm">The quick brown fox jumps over the lazy dog 0123456789 19</div></section>
<section><h2>12. Paragraph</h2><div class="s md">She wrote the whole letter by hand, looping every
word into the next, and signed it with the kind of flourish that only comes from
years of practice. Forever &amp; always, she said, and meant it.</div></section>
"""


def cells(chars):
    return "".join("<span>%s</span>" % c for c in chars)


def shoot(html, name, width, height):
    path = os.path.join(SPEC, "_%s.html" % name)
    with open(path, "w") as fh:
        fh.write(html)
    png = os.path.join(SPEC, "%s.png" % name)
    subprocess.run([
        CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
        "--force-device-scale-factor=2", "--allow-file-access-from-files",
        "--default-background-color=faf7f1",
        "--virtual-time-budget=4000",
        "--screenshot=%s" % png,
        "--window-size=%d,%d" % (width, height),
        "file://%s" % path,
    ], check=True, capture_output=True)
    os.remove(path)
    print("wrote", os.path.relpath(png, ROOT))


def main():
    os.makedirs(SPEC, exist_ok=True)
    shoot(PREVIEW, "font-preview", 1500, 1000)
    shoot(ALPHABET % (FACE,
                      cells("ABCDEFGHIJKLMNOPQRSTUVWXYZ"),
                      cells("abcdefghijklmnopqrstuvwxyz"),
                      cells("0123456789")),
          "alphabet-preview", 1500, 1240)
    with open(os.path.join(SPEC, "test.html"), "w") as fh:
        fh.write(TEST % FACE)
    print("wrote font-release/specimen/test.html")


if __name__ == "__main__":
    main()
