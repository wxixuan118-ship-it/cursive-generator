CTG Everly Script
=================

Family        CTG Everly Script
Style         Regular
Version       1.000
Designer      Cursive Text Generator
Website       https://www.cursive-text-generator.net/
Licence       SIL Open Font License, Version 1.1 (see LICENSE.txt)

About
-----
A natural handwritten cursive. Every letter is drawn as a pen skeleton with a
variable-width nib, so downstrokes swell and upstrokes thin out the way they do
under a real hand. Lowercase letters carry entry and exit strokes that meet at a
fixed point on the baseline, which makes words join continuously rather than
sitting as separate shapes.

The font is not a slanted or filtered version of any other typeface: the
outlines are generated from original stroke skeletons, and the right slant is
sheared into the skeleton before the nib is expanded, so stroke weight stays
perpendicular to the pen path.

Good for names and signatures, quotes, invitations, social graphics, logotypes,
greeting cards and cursive text generators.

Files
-----
CTGEverlyScript-Regular.ttf     TrueType, for desktop installation
CTGEverlyScript-Regular.otf     OpenType/CFF, for print and design apps
CTGEverlyScript-Regular.woff2   Web font
LICENSE.txt                     SIL Open Font License 1.1
README.txt                      This file
specimen/font-preview.png       Specimen image
specimen/alphabet-preview.png   Full character set
specimen/test.html              Browser test page
source/                         Editable source (.sfd, .fea, build recipe)
CTGEverlyScript.zip             Everything above, ready to upload to a
                                font directory (DaFont, FontSpace, 1001Fonts)

Installing
----------
macOS      double-click the .ttf or .otf and choose Install Font
Windows    right-click the .ttf or .otf and choose Install
Linux      copy into ~/.local/share/fonts and run: fc-cache -f

Web use
-------
@font-face {
  font-family: 'CTG Everly Script';
  src: url('CTGEverlyScript-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

OpenType features
-----------------
calt  Contextual alternates (on by default). Drops the lead-in stroke at the
      start of a word, swaps the exit for a terminal at the end of one, removes
      the connector from a capital that is not followed by lowercase, and varies
      the second letter of a doubled pair.
dlig  Discretionary ligatures (off by default). Joined "tt" and "ff" written
      with a single continuous crossbar.
kern  Pair kerning for punctuation and free-standing capitals. Joining letters
      are deliberately left unkerned so the connections stay exact.

Turning features on in CSS:
  font-feature-settings: "dlig" 1;      /* joined tt / ff */
  font-variant-ligatures: no-contextual; /* disable the joining logic */

Rebuilding
----------
  python3 scripts/build-everly-script.py        # outlines (needs FontForge)
  ./.venv/bin/python scripts/finish-everly-script.py   # features + woff2
  ./.venv/bin/python scripts/preview-everly-script.py  # specimen images
  ./.venv/bin/python scripts/validate-everly-script.py # QA report

Distributed by Cursive Text Generator.
