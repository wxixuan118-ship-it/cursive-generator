# Page content for the language / nationality group of "<word> in cursive" pages.
# These pages cover two things at once: the English word written in Latin
# cursive, and how the language's own script handles cursive writing.

PAGES = [
    dict(
        slug="russian",
        name="Russian",
        group="languages",
        description="Write Russian in cursive and copy it in three styles, then learn why Cyrillic cursive is so hard to read and which letters look like m, g, and u.",
        card="The English word, plus why Cyrillic cursive is famously hard to read and which letters turn into waves.",
        intro="Type <strong>Russian</strong> below and copy Russian in cursive in elegant, bold, or decorative form. This page covers two different things: writing the English word Russian by hand, and the Cyrillic cursive that Russians actually use, which has a reputation for being almost unreadable to learners. Both are explained below.",
        howto=[
            "<p>Russian starts with a capital <strong>R</strong>: a tall stem, a bowl, and a leg that lands on the baseline and connects into the next letter. From the leg move into the <em>u</em>, two cups joined at the baseline.</p>",
            "<p>The double <em>s</em> is the feature of this word. Each cursive <em>s</em> is a short pointed stroke that rises to the midline and closes back on itself before continuing along the baseline. Write them the same height and the same width, with a small but visible gap between the two points; if the points touch, the pair reads as a single letter.</p>",
            "<p>Finish with <em>i-a-n</em>: a short stroke, a closed oval, and a two-hump <em>n</em> with an exit stroke. Dot the <em>i</em> last. Russian has no ascenders or descenders after the capital, so it sits flat on the line and the double <em>s</em> becomes the visual centre of the word.</p>",
        ],
        angle=(
            "Russian Cursive: The Cyrillic Handwriting Everyone Struggles With",
            [
                "<p>Russian schoolchildren learn a joined cursive for the Cyrillic alphabet, and it looks very different from the printed letters. Several lowercase forms borrow shapes that mean something else in Latin cursive: handwritten <strong>т</strong> looks like a Latin <em>m</em>, <strong>д</strong> looks like a Latin <em>g</em>, <strong>и</strong> looks like a Latin <em>u</em>, and <strong>п</strong> looks like a Latin <em>n</em>. Because <em>и</em>, <em>ш</em>, <em>л</em>, and <em>м</em> are all built from the same repeated hump, a word such as <em>лишишься</em> comes out as a long unbroken wave that even native readers decode from context.</p>",
                "<p>The generator on this page does not produce that script. It styles the Latin letters A–Z using Unicode mathematical script characters, and Unicode has no equivalent set for Cyrillic. If you type <em>Россия</em> or <em>русский</em> into the box, the letters pass through unchanged. What the tool gives you is the English word Russian, or any romanised phrase such as <em>Spasibo</em> or <em>Privet</em>, in cursive-style Unicode text.</p>",
            ],
        ),
        uses=(
            "Where the Word Russian in Cursive Is Used",
            [
                "<p>The most common uses are Russian-class project covers, language-learning journals, ballet and classical-music programme headings, Russian literature reading lists, and captions for dishes such as borscht and pelmeni. It also appears on tutoring flyers and in bios of translators and interpreters.</p>",
                "<p>Seven letters is a comfortable length for all three styles. The elegant script suits literary and musical contexts. Bold cursive is the safer choice for a caption or a small profile field.</p>",
            ],
        ),
        phrases=["Russian Language", "Learn Russian", "Spasibo", "Privet", "Russian Literature"],
        faq=[
            ("Why is Russian cursive so hard to read?", "Several Cyrillic cursive letters, including и, ш, л, and м, are built from the same repeated hump, so a word can become a single unbroken wave. Other letters borrow Latin shapes with different meanings: handwritten т looks like m and д looks like g."),
            ("Can this generator write Russian words in Cyrillic cursive?", "No. It styles only the Latin letters A to Z using Unicode script characters, and Unicode has no matching set for Cyrillic. Cyrillic text typed into the box passes through unchanged."),
            ("How do you write the double s in Russian in cursive?", "Make each s a short pointed stroke of the same height and width, with a small visible gap between the two points. If the points touch, the pair looks like one letter."),
            ("Does the capital R in Russian connect to the u?", "Yes. The cursive capital R finishes with a leg on the baseline that leads directly into the lowercase u."),
        ],
        related=["english", "german", "greek", "french", "chinese", "japanese", "germany"],
        explore="<p>Other scripts with their own cursive traditions are covered on the <a href=\"/greek-in-cursive/\">Greek in cursive</a> and <a href=\"/german-in-cursive/\">German in cursive</a> pages, and <a href=\"/english-in-cursive/\">English in cursive</a> explains where the Latin cursive on this site comes from. The <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub lists every page.</p>",
    ),
    dict(
        slug="english",
        name="English",
        group="languages",
        description="Write English in cursive and copy it in three styles, plus a short history of English cursive: Copperplate, Spencerian, Palmer, Zaner-Bloser, D'Nealian.",
        card="The word, plus a short history of English cursive: Copperplate, Spencerian, Palmer, Zaner-Bloser, D'Nealian.",
        intro="Enter <strong>English</strong> below and copy English in cursive in elegant, bold, or decorative form. The guide beneath the tool walks through the word letter by letter, then traces where the cursive styles taught in English-speaking schools actually came from.",
        howto=[
            "<p>English starts with a capital <strong>E</strong>, a double curve like a rounded numeral 3 that finishes at the baseline and connects into the next letter. Move into the <em>n</em>, two humps sitting between the baseline and the midline.</p>",
            "<p>The middle run is <em>g-l-i-s</em>, and it covers the full vertical range. The <em>g</em> is a closed oval with a loop below the baseline. The <em>l</em> is a tall loop reaching the height of the capital. So within two letters the word goes from its lowest point to its highest. Make the <em>g</em> loop and the <em>l</em> loop the same size, and keep the <em>i</em> and <em>s</em> that follow small and even.</p>",
            "<p>Finish with the <em>h</em>: a tall loop, back to the baseline, one hump, and an exit stroke. That gives English two ascenders, the <em>l</em> and the <em>h</em>, which should match in height, and one descender, the <em>g</em>. Dot the <em>i</em> last.</p>",
        ],
        angle=(
            "A Short History of English Cursive",
            [
                "<p>The cursive taught in English-speaking schools descends from <strong>English round hand</strong>, better known as Copperplate, which was developed in England in the 1700s and spread through engraved copybooks. In the United States it was reshaped into <strong>Spencerian</strong> script by Platt Rogers Spencer in the mid-1800s, and then simplified into the <strong>Palmer Method</strong> in the 1890s, which dominated American classrooms for half a century. <strong>Zaner-Bloser</strong>, developed in the early 1900s, and <strong>D'Nealian</strong>, introduced in 1978 to bridge print and cursive, are the two models most American children learn today.</p>",
                "<p>In Britain the same tradition is usually called <em>joined-up handwriting</em> or continuous cursive, and the national curriculum for England still requires children to join their letters. The Unicode script letters used by the generator on this page were originally added for mathematical notation, but their shapes are drawn from this same Copperplate lineage, which is why they read as cursive at a glance.</p>",
            ],
        ),
        uses=(
            "Uses for the Word English in Cursive",
            [
                "<p>English in cursive is most often used on ESL and language-class project covers, tutoring and teaching business cards, literature reading-list headings, English-department event flyers, and bios of writers, editors, and English teachers. It also appears on handwriting worksheets as a title.</p>",
                "<p>Seven letters with two ascenders and a descender is a balanced shape that works in every style. The elegant script is the natural choice for anything literary. Bold cursive suits a business card or a caption.</p>",
            ],
        ),
        phrases=["English Language", "Learn English", "English Teacher", "English Literature", "Speak English"],
        faq=[
            ("Where does English cursive come from?", "From English round hand, or Copperplate, developed in England in the 1700s. In America it became Spencerian script, then the Palmer Method, and later Zaner-Bloser and D'Nealian, which are the styles most American schools teach today."),
            ("How do you handle the g and l in English in cursive?", "The g loops below the baseline and the l rises to the height of the capital, so the word goes from its lowest to its highest point in two letters. Make both loops the same size so the section looks balanced."),
            ("What is joined-up handwriting?", "The British term for cursive. The national curriculum for England requires children to join their letters, and the style is broadly the same Copperplate-derived cursive taught in American schools."),
            ("Are the cursive letters in the generator real English cursive?", "They are Unicode mathematical script characters, originally added for maths notation, but their shapes come from the same Copperplate tradition, which is why they read as cursive."),
        ],
        related=["england", "america", "french", "spanish", "german", "australia", "canada"],
        explore="<p>Compare the country name on the <a href=\"/england-in-cursive/\">England in cursive</a> page, or see how other languages teach handwriting on the <a href=\"/french-in-cursive/\">French in cursive</a> and <a href=\"/german-in-cursive/\">German in cursive</a> pages. The <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub has the full list.</p>",
    ),
    dict(
        slug="french",
        name="French",
        group="languages",
        description="Write French in cursive and copy it in three styles, then learn how French schools teach écriture cursive: Seyès paper, looped letters, and ornate capitals.",
        card="The word, plus how French schools teach écriture cursive on Seyès paper with looped letters and ornate capitals.",
        intro="Type <strong>French</strong> below and copy French in cursive in elegant, bold, or decorative form. Below the tool you will find a guide to the word itself and an explanation of French school cursive, which is one of the most distinctive handwriting styles in Europe and looks noticeably different from the American kind.",
        howto=[
            "<p>French starts with a capital <strong>F</strong>, which does not connect. Write the tall stem, the top bar, and the short crossbar, then lift the pen and start the <em>r</em> just to the right at the midline. The <em>r</em> rises to a small point, dips, and flows into the <em>e</em>, a small closed loop.</p>",
            "<p>Then comes <em>n-c-h</em>. The <em>n</em> has two humps. The <em>c</em> is an open curve. The <em>h</em> is a tall loop that returns to the baseline and adds one hump before the exit stroke. The <em>h</em> is the only ascender in the word apart from the capital, and it comes at the very end, so French rises at both ends and stays low in the middle.</p>",
            "<p>The letters between the F and the h are all small, which makes the two tall strokes stand out. Keep the <em>h</em> loop the same height as the stem of the F so the word looks framed rather than lopsided.</p>",
        ],
        angle=(
            "How French Schools Teach Cursive",
            [
                "<p>French children learn <strong>écriture cursive</strong> from the first year of primary school, and they learn it on <strong>Seyès</strong> ruled paper, a grid of horizontal lines spaced 2 mm apart with a heavier line every 8 mm and vertical lines forming squares. Every letter has a prescribed height in those 2 mm units: an <em>a</em> fills one, a <em>d</em> two, an <em>l</em> three. That grid is why French handwriting tends to be so regular.</p>",
                "<p>The letterforms themselves differ from American cursive. Lowercase <em>b</em>, <em>f</em>, <em>h</em>, <em>k</em>, and <em>l</em> all carry closed loops, the <em>x</em> is written as two back-to-back <em>c</em> shapes, the <em>q</em> has a small hook at the bottom, and the capitals are elaborate, with the cursive <em>F</em>, <em>G</em>, and <em>T</em> in particular looking ornamental to American eyes. In 2013 the French Ministry of Education published two official reference models, <em>Écriture A</em> and <em>Écriture B</em>, to standardise what schools teach. The Unicode script letters used by the generator follow the Anglo-American Copperplate tradition rather than the French one, so they will look familiar but not identical to what a French pupil writes.</p>",
            ],
        ),
        uses=(
            "Where French in Cursive Is Used",
            [
                "<p>The word French in cursive appears on French-class project covers, café and patisserie signage, tutoring flyers, language-exchange event posts, bilingual wedding stationery, and bios of translators and French teachers. Companion phrases such as <em>Bonjour</em>, <em>Merci</em>, and <em>Bon Appétit</em> are popular, though the accented <em>é</em> in the last one will stay in plain form in the generator.</p>",
                "<p>The elegant script matches the associations of the word best. Bold cursive is the safe choice for captions. The decorative style has a heavier blackletter feel that rarely suits French themes.</p>",
            ],
        ),
        phrases=["French Language", "Learn French", "Bonjour", "Merci Beaucoup", "French Teacher"],
        faq=[
            ("What is Seyès paper?", "The ruled paper used in French schools: horizontal lines 2 mm apart with a heavier line every 8 mm, crossed by vertical lines to form squares. Each cursive letter has a prescribed height in those 2 mm units, which keeps French handwriting regular."),
            ("How is French cursive different from American cursive?", "French cursive uses closed loops on b, f, h, k, and l, writes the x as two back-to-back c shapes, gives the q a small hook, and has more ornate capitals. It is taught on Seyès grid paper rather than three-line paper."),
            ("Does the generator produce French-style cursive?", "No. Its Unicode script letters follow the Anglo-American Copperplate tradition, so they look familiar to a French reader but do not match the official Écriture A and B school models."),
            ("Does the capital F in French connect to the r?", "No. The cursive capital F is a non-connecting capital. Write it, lift the pen, and start the r just to the right."),
        ],
        related=["france", "english", "spanish", "italian", "german", "canada", "greek"],
        explore="<p>The country name has its own guide on the <a href=\"/france-in-cursive/\">France in cursive</a> page. For other European school hands, see <a href=\"/german-in-cursive/\">German in cursive</a> and <a href=\"/italian-in-cursive/\">Italian in cursive</a>, or browse the <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub.</p>",
    ),
    dict(
        slug="spanish",
        name="Spanish",
        group="languages",
        description="Write Spanish in cursive and copy it in three styles. Covers the p descender, how to add the ñ tilde and accents in cursive, and which phrases convert fully.",
        card="The word, plus how to write ñ and accented vowels in cursive and which Spanish phrases convert in full.",
        intro="Enter <strong>Spanish</strong> below and copy Spanish in cursive in elegant, bold, or decorative form. The guide underneath covers the word letter by letter, then explains how the tilde on <em>ñ</em> and the accents on Spanish vowels are handled both in handwriting and in the generator.",
        howto=[
            "<p>Spanish starts with a capital <strong>S</strong>: an upward stroke, a large loop, and a tail at the baseline that in some styles connects and in others does not. Then comes the <em>p</em>, the only descender: rise to the midline, drop below the baseline, and return with a small bowl. Placing a descender right after a tall capital is the same challenge as in Spain, and both strokes should look proportional.</p>",
            "<p>The middle is <em>a-n-i-s</em>: a closed oval, a two-hump <em>n</em>, a short <em>i</em>, and a short pointed <em>s</em>. All four sit between the baseline and the midline, so keep their heights identical.</p>",
            "<p>Finish with the <em>h</em>: a tall loop, back to the baseline, one hump, and an exit stroke. Dot the <em>i</em> last. The word has one descender near the start and one ascender at the end, which gives it a gentle rising shape from left to right.</p>",
        ],
        angle=(
            "The ñ and Accents in Cursive",
            [
                "<p>Spanish is written in the Latin alphabet, so Spanish school cursive, known as <strong>letra cursiva</strong> or <em>letra ligada</em>, is close to what English speakers learn. The differences are the marks. The tilde on <strong>ñ</strong> is added as a small wave above the letter after the word is finished, in the same pass as t-crosses and i-dots. Accents on <em>á, é, í, ó, ú</em> are short upward strokes added the same way, and on a handwritten <em>í</em> the accent replaces the dot rather than sitting beside it.</p>",
                "<p>The generator cannot add those marks. It converts plain A–Z only, so <em>español</em> comes out with a plain <em>ñ</em> in the middle of an otherwise cursive word, and <em>adiós</em> keeps a plain <em>ó</em>. Phrases without marks convert completely: <em>Hola</em>, <em>Gracias</em>, <em>Buenos Dias</em> (without the accent), <em>Te Amo</em>, and <em>Mi Amor</em> are all safe. The inverted marks <em>¿</em> and <em>¡</em> pass through unchanged, which is fine because they are punctuation and would not be styled anyway.</p>",
            ],
        ),
        uses=(
            "Where Spanish in Cursive Is Used",
            [
                "<p>Spanish in cursive appears on Spanish-class project covers and folders, tutoring business cards, bilingual classroom labels, Hispanic Heritage Month posters, quinceañera and wedding stationery, tapas and taquería menus, and bios of translators and Spanish teachers.</p>",
                "<p>Seven letters with one descender and one ascender works in every style. The elegant script suits stationery and menus. Bold cursive is the right choice for classroom labels and captions read at a distance or at small size.</p>",
            ],
        ),
        phrases=["Spanish Language", "Learn Spanish", "Hola", "Gracias", "Te Amo"],
        faq=[
            ("How do you write the ñ in cursive?", "Write the n as normal, then add the tilde as a small wave above it after the word is finished, in the same pass as t-crosses and i-dots."),
            ("Will Spanish words with accents convert in the generator?", "Only the plain letters convert. Accented vowels and the ñ stay in their normal form, so español shows a plain ñ. Phrases without marks, such as Hola and Gracias, convert fully."),
            ("What is letra ligada?", "The Spanish term for joined cursive handwriting, also called letra cursiva. It is taught in Spanish and Latin American schools and is close to English cursive apart from the accent marks and the ñ."),
            ("Where does the accent go on a cursive í?", "It replaces the dot. On a handwritten accented i you write the short upward accent stroke instead of the dot, not in addition to it."),
        ],
        related=["spain", "mexico", "english", "french", "italian", "peru", "guatemala"],
        explore="<p>The country name is covered on the <a href=\"/spain-in-cursive/\">Spain in cursive</a> page, and Spanish-speaking countries with their own guides include <a href=\"/mexico-in-cursive/\">Mexico in cursive</a> and <a href=\"/costa-rica-in-cursive/\">Costa Rica in cursive</a>. The <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub lists them all.</p>",
    ),
    dict(
        slug="greek",
        name="Greek",
        group="languages",
        description="Write Greek in cursive and copy it in three styles, then learn where lowercase Greek letters came from and why modern Greek handwriting is only partly joined.",
        card="The word, plus where lowercase Greek letters came from and why modern Greek handwriting is only partly joined.",
        intro="Type <strong>Greek</strong> below and copy Greek in cursive in elegant, bold, or decorative form. The guide beneath the tool covers the five-letter English word, then explains how Greek handwriting itself works, which is a different question with a surprising history.",
        howto=[
            "<p>Greek starts with a capital <strong>G</strong>, a tall open curve that drops to the baseline and ends in a small loop, which in most school styles leads into the next letter. Move into the <em>r</em>: a small point at the midline and a shallow dip.</p>",
            "<p>The double <em>e</em> is next. Each <em>e</em> is a small closed loop, and the two should be identical in size and spacing. Slow down through the pair; the second one tends to shrink when the hand speeds up.</p>",
            "<p>Finish with the <em>k</em>: a tall ascender loop, a small closed loop at the midline about the size of an <em>e</em>, and a short leg with an exit stroke. The <em>k</em> is the only tall lowercase letter and it comes last, so the word rises at the end. Keep its loop the same height as the top of the capital G.</p>",
        ],
        angle=(
            "Does Greek Have a Cursive Script?",
            [
                "<p>Yes, and in a sense the whole lowercase Greek alphabet is one. The small letters used today, <em>α, β, γ</em> and the rest, developed from the <strong>Greek minuscule</strong>, a cursive book hand that Byzantine scribes adopted in the 800s because it was faster than writing in capitals. Before that, Greek was written entirely in what we now call uppercase. So every lowercase Greek letter is a descendant of a cursive form.</p>",
                "<p>Modern Greek handwriting, however, is only partly joined. Greek schools do not teach a fully connected cursive the way English or French schools do; most Greeks write the lowercase letters separately or link only some pairs, and the result looks closer to neat print than to Copperplate. As for the generator, Greek letters pass through it unchanged: the Unicode script alphabets cover only A–Z, so <em>Ελληνικά</em> stays as it is. The romanised word <em>Ellinika</em>, or the English word Greek, will convert fully.</p>",
            ],
        ),
        uses=(
            "Where Greek in Cursive Is Used",
            [
                "<p>Greek in cursive appears on Greek-class and classics project covers, Greek Orthodox event programmes, fraternity and sorority materials (where \"Greek life\" is the common term), taverna and gyro menus, Greek-dance and festival flyers, and bios of Greek teachers and translators.</p>",
                "<p>Five letters works in every style. The elegant script is the usual choice for menus and programmes. Bold cursive suits fraternity and sorority social posts where the text is read at small size.</p>",
            ],
        ),
        phrases=["Greek Language", "Learn Greek", "Greek Life", "Opa", "Greek Orthodox"],
        faq=[
            ("Is there a Greek cursive alphabet?", "Historically, yes. The lowercase Greek letters used today developed from the Greek minuscule, a cursive book hand Byzantine scribes adopted in the 800s. Modern Greek handwriting, though, is only partly joined."),
            ("Do Greek schools teach joined cursive?", "Not in the way English or French schools do. Most Greeks write lowercase letters separately or join only some pairs, so everyday Greek handwriting looks closer to neat print."),
            ("What happens if I type Greek letters into the generator?", "They pass through unchanged. The Unicode script alphabets only cover A to Z. Use the English word Greek or a romanised form such as Ellinika for a styled result."),
            ("How do you write the k at the end of Greek in cursive?", "Make a tall ascender loop to the height of the capital, a small closed loop at the midline about the size of an e, and a short leg with an exit stroke."),
        ],
        related=["greece", "russian", "english", "italian", "turkey", "egypt", "german"],
        explore="<p>The country name is covered on the <a href=\"/greece-in-cursive/\">Greece in cursive</a> page. For another alphabet with a famous cursive form, see <a href=\"/russian-in-cursive/\">Russian in cursive</a>, and browse every page on the <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub.</p>",
    ),
    dict(
        slug="italian",
        name="Italian",
        group="languages",
        description="Write Italian in cursive and copy it in three styles, then learn why Italy gave the world the word italic: the chancery hand, Aldus Manutius, and La Operina.",
        card="The word, plus how the Venetian chancery hand became italic type and the first cursive writing manual.",
        intro="Enter <strong>Italian</strong> below and copy Italian in cursive in elegant, bold, or decorative form. Below the tool, the guide covers the seven-letter word and then explains why Italy has a special place in the history of cursive: the slanted type we call italic was named after it.",
        howto=[
            "<p>Italian starts with a capital <strong>I</strong>, a tall stroke with a small loop at the bottom left that connects from the baseline. Move directly into the <em>t</em>, which has a short ascender about half the height of the capital; cross it after the word is finished.</p>",
            "<p>The middle is <em>a-l-i</em>: a closed oval, a tall looped <em>l</em>, and a short <em>i</em>. Keep the <em>l</em> clearly taller than the <em>t</em> before it. As with Italy, this short-tall contrast between <em>t</em> and <em>l</em> is what makes the word look right.</p>",
            "<p>Finish with <em>a-n</em>: a second closed oval the same size as the first, and a two-hump <em>n</em> with an exit stroke. Cross the <em>t</em> and dot the two <em>i</em>'s last, in one pass from left to right. Italian has no descenders, so it sits cleanly on the line.</p>",
        ],
        angle=(
            "Why Cursive Is Called Corsivo, and Italic Is Called Italic",
            [
                "<p>In Italian the same word, <strong>corsivo</strong>, means both cursive handwriting and italic type, and there is a reason for that. In the 1400s the scribes of the papal chancery in Rome wrote a fast, slanted, lightly joined hand called <em>cancelleresca corsiva</em>. In 1501 the Venetian printer <strong>Aldus Manutius</strong> had a typeface cut in imitation of it, and because the style came from Italy the rest of Europe called it italic.</p>",
                "<p>Two decades later, in 1522, the papal scribe <strong>Ludovico degli Arrighi</strong> published <em>La Operina</em>, the first printed manual teaching ordinary people how to write chancery cursive. It is the ancestor of every handwriting copybook since, including the Copperplate manuals that shaped the cursive on this site. Italian schools still teach <em>corsivo</em> from the first year of primary school alongside <em>stampatello</em>, or print, and Italian school cursive keeps the looped ascenders and slant of its chancery ancestor.</p>",
            ],
        ),
        uses=(
            "Where Italian in Cursive Is Used",
            [
                "<p>Italian in cursive is used on Italian-class project covers, trattoria and gelateria menus, tutoring business cards, Italian-American heritage posts, opera and choir programmes, language-exchange flyers, and bios of Italian teachers and translators. Companion phrases such as <em>Ciao</em>, <em>Grazie</em>, and <em>Buon Appetito</em> convert fully because they carry no accents; <em>Caffè</em> does not.</p>",
                "<p>The elegant script is the obvious match, given the word's history. Bold cursive is the safer choice for menus read at a distance and for captions.</p>",
            ],
        ),
        phrases=["Italian Language", "Learn Italian", "Ciao Bella", "Grazie", "Buon Appetito"],
        faq=[
            ("Why is italic type named after Italy?", "Because the first italic typeface, cut for the Venetian printer Aldus Manutius in 1501, imitated the slanted cursive hand of the papal chancery in Rome. The style came from Italy, so Europe called it italic."),
            ("What was the first cursive handwriting manual?", "La Operina, published in 1522 by the papal scribe Ludovico degli Arrighi. It taught chancery cursive to the general public and is the ancestor of later handwriting copybooks."),
            ("What does corsivo mean in Italian?", "Both cursive handwriting and italic type. The two share a word because italic type was designed to imitate Italian cursive handwriting."),
            ("Do Italian schools still teach cursive?", "Yes. Corsivo is taught from the first year of primary school alongside stampatello, or print, and Italian school cursive keeps the looped ascenders and slant of the chancery hand."),
        ],
        related=["italy", "french", "spanish", "english", "german", "greek", "venezuela"],
        explore="<p>The country name has its own page at <a href=\"/italy-in-cursive/\">Italy in cursive</a>. For other national handwriting traditions, see <a href=\"/french-in-cursive/\">French in cursive</a> and <a href=\"/german-in-cursive/\">German in cursive</a>, or browse the <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub.</p>",
    ),
    dict(
        slug="korean",
        name="Korean",
        group="languages",
        description="Write Korean in cursive and copy it in three styles, then learn how Hangul handles cursive: the flowing heullimche style and what pilgiche means.",
        card="The word, plus how Hangul handles cursive: the flowing heullimche style, and why Koreans call English cursive pilgiche.",
        intro="Type <strong>Korean</strong> below and copy Korean in cursive in elegant, bold, or decorative form. The guide beneath the tool covers the six-letter word and the bridge join after its <em>o</em>, then explains how the Korean alphabet, Hangul, approaches cursive writing.",
        howto=[
            "<p>Korean starts with a capital <strong>K</strong>: a tall stem, a small loop at the midline where the arms meet, and a leg that lands on the baseline and connects into the next letter. Move into the <em>o</em>, a closed oval.</p>",
            "<p>The <em>o</em> changes how the next letter starts. Because a cursive <em>o</em> closes at the top, the <em>r</em> that follows begins from a short bridge stroke at the midline rather than from the baseline. The <em>r</em> then rises to its small point, dips, and flows into the <em>e</em>, a small loop. The <em>o-r</em> bridge is the one join in this word worth practising on its own.</p>",
            "<p>Finish with <em>a-n</em>: a closed oval the same size as the <em>o</em> earlier, and a two-hump <em>n</em> with an exit stroke. Korean has no ascenders or descenders after the capital, so the K carries all the height and the rest of the word runs flat.</p>",
        ],
        angle=(
            "Does Korean Have Cursive?",
            [
                "<p>Not in the joined-letter sense. <strong>Hangul</strong>, the Korean alphabet created under King Sejong in the 1440s, groups its letters into square syllable blocks, and in everyday handwriting each block is written separately. What Korea does have is a calligraphic tradition with a flowing style called <strong>heullimche</strong> (흘림체), in which the strokes within a block are softened and linked, as opposed to the upright <em>jeongjache</em> (정자체) standard style. Heullimche is the closest Korean equivalent to cursive and is seen in brush calligraphy rather than in schoolwork.</p>",
                "<p>Koreans have a separate word for Latin cursive: <strong>pilgiche</strong> (필기체), literally \"handwriting style\", and it is what Korean students mean when they talk about learning English cursive. The generator on this page produces that Latin cursive. Hangul typed into it passes through unchanged, because the Unicode script alphabets cover only A–Z, so <em>한국어</em> stays as it is while the romanised <em>Hangugeo</em> converts.</p>",
            ],
        ),
        uses=(
            "Where Korean in Cursive Is Used",
            [
                "<p>Korean in cursive appears on Korean-language class covers, K-pop and K-drama fan account bios, Korean BBQ and café menus, language-exchange flyers, Korean-American community event posts, and bios of Korean tutors and translators. Romanised companion words such as <em>Annyeong</em>, <em>Saranghae</em>, and <em>Hangul</em> all convert fully.</p>",
                "<p>Six letters suits every style. Bold cursive is the usual choice for fan-account bios, where the text is small. The elegant script suits café menus and printed materials.</p>",
            ],
        ),
        phrases=["Korean Language", "Learn Korean", "Annyeong", "Saranghae", "Hangul"],
        faq=[
            ("Is there a Korean cursive alphabet?", "Not in the joined-letter sense. Hangul syllable blocks are written separately in everyday handwriting. The closest equivalent is heullimche, a flowing brush-calligraphy style in which strokes within a block are softened and linked."),
            ("What does pilgiche mean?", "It is the Korean word for Latin cursive handwriting, literally handwriting style. Korean students use it when they talk about learning English cursive."),
            ("Will Hangul convert in the generator?", "No. Hangul passes through unchanged because the Unicode script alphabets cover only A to Z. Romanised words such as Hangugeo or Annyeong convert fully."),
            ("How does the o join the r in Korean?", "From the top. A cursive o closes at the top, so the r that follows begins from a short bridge stroke at the midline rather than from the baseline."),
        ],
        related=["japanese", "chinese", "japan", "china", "english", "malaysia", "philippines"],
        explore="<p>Korea's neighbours have their own cursive traditions, explained on the <a href=\"/japanese-in-cursive/\">Japanese in cursive</a> and <a href=\"/chinese-in-cursive/\">Chinese in cursive</a> pages. The <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub lists every page on the site.</p>",
    ),
    dict(
        slug="german",
        name="German",
        group="languages",
        description="Write German in cursive and copy it in three styles, then learn about Kurrent and Sütterlin, the German cursive scripts abandoned in 1941.",
        card="The word, plus Kurrent and Sütterlin: the German cursive scripts abandoned in 1941 that most Germans can no longer read.",
        intro="Enter <strong>German</strong> below and copy German in cursive in elegant, bold, or decorative form. The guide beneath the tool covers the six-letter word and its tricky <em>r-m</em> join, then tells the story of German cursive, which for centuries was an entirely different script from the one on this page.",
        howto=[
            "<p>German starts with a capital <strong>G</strong>, a tall open curve that drops to the baseline and finishes with a small loop, which in most school styles leads into the <em>e</em>. The <em>e</em> is a small closed loop.</p>",
            "<p>The join from <em>r</em> to <em>m</em> is the test in this word. The <em>r</em> rises to a small point at the midline and dips; keep that dip shallow, then start the first hump of the <em>m</em> from the midline. A deep dip makes the <em>m</em> look as though it has four humps. The <em>m</em> itself has three, evenly spaced.</p>",
            "<p>Finish with <em>a-n</em>: a closed oval and a two-hump <em>n</em> with an exit stroke. German has no ascenders or descenders after the capital, so the whole lowercase run sits in the midline band and any slant errors are easy to spot.</p>",
        ],
        angle=(
            "Kurrent and Sütterlin: The German Cursive Most Germans Can No Longer Read",
            [
                "<p>Until the 1940s, Germans did not write the Latin cursive on this page. They wrote <strong>Kurrent</strong>, a sharply angled cursive that developed from late medieval hands and looks almost like a row of zigzags to an untrained eye. In 1911 the graphic artist Ludwig Sütterlin designed a simplified, upright version for Prussian schools, and <strong>Sütterlin</strong> became the standard school hand across Germany by the 1930s. Then in 1941 the Nazi government abruptly banned both Kurrent and the Fraktur typefaces that went with them, and schools switched to Latin cursive. The result is that most Germans today cannot read letters their grandparents wrote.</p>",
                "<p>Postwar German schools have taught a series of Latin models: the <em>Lateinische Ausgangsschrift</em> from 1953, the East German <em>Schulausgangsschrift</em> from 1968, and the <em>Vereinfachte Ausgangsschrift</em> from 1972, with the unjoined <em>Grundschrift</em> proposed in 2011. All of them are called <em>Schreibschrift</em>, the German word for cursive. The generator produces Latin cursive of the Anglo-American kind. The letters ä, ö, ü, and ß have no Unicode script equivalents, so <em>Deutsch</em> converts fully but <em>schön</em> keeps its plain <em>ö</em>.</p>",
            ],
        ),
        uses=(
            "Where German in Cursive Is Used",
            [
                "<p>German in cursive appears on German-class project covers, Oktoberfest and Christmas-market flyers, beer-garden and bakery menus, tutoring business cards, German-American heritage posts, and bios of German teachers and translators. Companion words such as <em>Danke</em>, <em>Prost</em>, and <em>Willkommen</em> convert fully; anything with an umlaut does not.</p>",
                "<p>Because Fraktur type was the German standard for so long, the decorative fraktur-style option is a better match here than for almost any other page on the site. The elegant script suits business cards, and bold cursive suits captions.</p>",
            ],
        ),
        phrases=["German Language", "Learn German", "Danke", "Prost", "Willkommen"],
        faq=[
            ("What is Sütterlin?", "A simplified German cursive designed by Ludwig Sütterlin in 1911 for Prussian schools. It became the standard school hand across Germany by the 1930s and was banned in 1941, after which schools switched to Latin cursive."),
            ("Why can most Germans not read old German handwriting?", "Because letters written before the 1940s use Kurrent or Sütterlin, which were dropped from schools in 1941. Germans born afterwards learned only Latin cursive and never learned the older script."),
            ("Will umlauts convert in the generator?", "No. The letters ä, ö, ü, and ß have no Unicode script equivalents and stay in plain form. Words without them, such as Danke and Deutsch, convert fully."),
            ("Is the decorative style a good match for German?", "Yes. Fraktur typefaces were the German printing standard until the 1940s, so the decorative fraktur-style option suits German-themed designs better than most."),
        ],
        related=["germany", "english", "french", "russian", "italian", "greek", "spanish"],
        explore="<p>The country name is covered on the <a href=\"/germany-in-cursive/\">Germany in cursive</a> page. For other scripts with a dramatic cursive history, see <a href=\"/russian-in-cursive/\">Russian in cursive</a> and <a href=\"/egypt-in-cursive/\">Egypt in cursive</a>, or browse the <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub.</p>",
    ),
    dict(
        slug="japanese",
        name="Japanese",
        group="languages",
        description="Write Japanese in cursive and copy it in three styles, then learn about kaisho, gyōsho, and sōsho, and how hiragana grew out of cursive kanji.",
        card="The word, plus sōsho, gyōsho, and how hiragana was born from cursive kanji. Also what hikkitai means.",
        intro="Type <strong>Japanese</strong> below and copy Japanese in cursive in elegant, bold, or decorative form. The guide beneath the tool covers the eight-letter word, then explains the three scripts of Japanese calligraphy and the surprising fact that one of Japan's two syllabaries is itself a cursive script.",
        howto=[
            "<p>Japanese starts with a capital <strong>J</strong>: begin at the baseline, rise into a tall loop, drop below the baseline into a second loop, and return to join the <em>a</em>. Match the depth of that lower loop to the <em>p</em> that comes two letters later.</p>",
            "<p>The <em>a</em> is a closed oval, and the <em>p</em> rises to the midline, drops below the baseline, and returns with a small bowl. Then comes another <em>a</em>, the same size as the first, and a two-hump <em>n</em>.</p>",
            "<p>Finish with <em>e-s-e</em>: a small loop, a short pointed <em>s</em>, and another small loop. The two <em>e</em>'s should match, as should the two <em>a</em>'s earlier. Japanese has two descenders near the start, the J and the p, and none afterwards, so the second half of the word runs flat.</p>",
        ],
        angle=(
            "Sōsho, Gyōsho, and the Cursive Origins of Hiragana",
            [
                "<p>Japanese calligraphy recognises three ways of writing a kanji: <strong>kaisho</strong> (楷書), the regular block form; <strong>gyōsho</strong> (行書), the semi-cursive running form in which strokes begin to flow together; and <strong>sōsho</strong> (草書), the fully cursive \"grass script\", where a character may collapse into a few sweeping strokes that only a trained reader can identify. Sōsho is the Japanese cursive in the truest sense.</p>",
                "<p>It also produced something remarkable: <strong>hiragana</strong>. In the Heian period, kanji used purely for their sounds were written so fluidly in sōsho that the simplified shapes became a separate script. The hiragana <em>あ</em> is a cursive 安, <em>い</em> is a cursive 以, and <em>う</em> is a cursive 宇. So every Japanese child learning hiragana is learning what began as cursive handwriting. Everyday Japanese handwriting today, however, does not join characters. Latin cursive has its own name, <strong>hikkitai</strong> (筆記体), and it is what the generator on this page produces; Japanese characters typed into the tool pass through unchanged because the Unicode script alphabets cover only A–Z.</p>",
            ],
        ),
        uses=(
            "Where Japanese in Cursive Is Used",
            [
                "<p>Japanese in cursive appears on Japanese-class project covers, anime and manga fan bios, ramen, sushi, and izakaya menus, language-exchange flyers, JLPT study journals, and bios of Japanese tutors and translators. Romanised companion words such as <em>Arigatou</em>, <em>Konnichiwa</em>, and <em>Kawaii</em> convert fully.</p>",
                "<p>Eight letters with two early descenders is a slightly heavy shape, so the elegant script at large sizes is the best-looking option. Bold cursive suits small bios. The decorative style does not match Japanese themes.</p>",
            ],
        ),
        phrases=["Japanese Language", "Learn Japanese", "Arigatou", "Konnichiwa", "Kawaii"],
        faq=[
            ("What is sōsho?", "The fully cursive grass script of Japanese calligraphy, in which a kanji may be reduced to a few sweeping strokes. It sits alongside kaisho, the regular form, and gyōsho, the semi-cursive running form."),
            ("Is hiragana a cursive script?", "In origin, yes. Hiragana developed in the Heian period from kanji written so fluidly in sōsho that the simplified shapes became a separate syllabary. あ is a cursive 安, and い is a cursive 以."),
            ("What does hikkitai mean?", "It is the Japanese word for Latin cursive handwriting, the joined script taught in English-language schools. It is what the generator on this page produces."),
            ("Will Japanese characters convert in the generator?", "No. Kanji, hiragana, and katakana pass through unchanged because the Unicode script alphabets cover only A to Z. Romanised words such as Arigatou convert fully."),
        ],
        related=["japan", "chinese", "korean", "china", "english", "malaysia", "philippines"],
        explore="<p>The country name is covered on the <a href=\"/japan-in-cursive/\">Japan in cursive</a> page. Sōsho descends from the Chinese cǎoshū described on the <a href=\"/chinese-in-cursive/\">Chinese in cursive</a> page, and Korea's approach is on <a href=\"/korean-in-cursive/\">Korean in cursive</a>. Browse everything on the <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub.</p>",
    ),
    dict(
        slug="chinese",
        name="Chinese",
        group="languages",
        description="Write Chinese in cursive and copy it in three styles, then learn about cǎoshū, the Chinese cursive script, from Wang Xizhi to Tang-dynasty wild cursive.",
        card="The word, plus cǎoshū: the two-thousand-year-old Chinese cursive script, from Wang Xizhi to wild cursive.",
        intro="Enter <strong>Chinese</strong> below and copy Chinese in cursive in elegant, bold, or decorative form. The guide beneath the tool covers the seven-letter word, then introduces cǎoshū, the Chinese cursive script, which is older than any Latin cursive by more than a thousand years.",
        howto=[
            "<p>Chinese starts with a capital <strong>C</strong>, an open curve that sweeps in from the top and ends at the baseline, connecting directly into the <em>h</em>. The <em>h</em> is a tall loop that returns to the baseline and adds one hump; it is the only ascender in the word, so give it full height.</p>",
            "<p>The middle is <em>i-n-e</em>: a short stroke, a two-hump <em>n</em>, and a small looped <em>e</em>, all in the midline band.</p>",
            "<p>Finish with <em>s-e</em>: a short pointed <em>s</em> and a second small loop that should match the first <em>e</em>. Dot the <em>i</em> last. Chinese rises once near the start, at the <em>h</em>, and then runs flat, with no descenders at all.</p>",
        ],
        angle=(
            "Cǎoshū: The Original Cursive",
            [
                "<p>Chinese calligraphy has five classical scripts, and two of them are cursive. <strong>Xíngshū</strong> (行书), running script, softens and links the strokes of regular characters and is the everyday hand of educated writers; the most famous piece of Chinese calligraphy, Wang Xizhi's <em>Preface to the Orchid Pavilion</em> of 353 CE, is in running script. <strong>Cǎoshū</strong> (草书), literally \"grass script\", goes much further, reducing characters to abbreviated flowing shapes that follow their own conventions and cannot be read by someone who knows only the regular forms.</p>",
                "<p>Cǎoshū began in the Han dynasty as a clerk's shorthand, matured in the fourth century, and reached its extreme in Tang-dynasty <strong>wild cursive</strong> (狂草), where masters such as Zhang Xu and Huaisu wrote whole columns in a single continuous motion. Japanese sōsho is its direct descendant. None of this can be produced by the generator, which styles only Latin letters: <em>中文</em> typed into the box passes through unchanged, while the romanised <em>Zhongwen</em> or the English word Chinese converts in all three styles.</p>",
            ],
        ),
        uses=(
            "Where Chinese in Cursive Is Used",
            [
                "<p>Chinese in cursive appears on Mandarin-class project covers, Lunar New Year and Mid-Autumn Festival posts, restaurant and bubble-tea menus, HSK study journals, Chinese-American community event flyers, and bios of Chinese tutors and translators. Romanised companion words such as <em>Ni Hao</em>, <em>Xie Xie</em>, and <em>Gong Xi Fa Cai</em> convert fully.</p>",
                "<p>Seven letters with one ascender is a clean shape for any style. The elegant script pairs well with red and gold at large sizes. Bold cursive suits menus and captions. The decorative style clashes with Chinese themes.</p>",
            ],
        ),
        phrases=["Chinese Language", "Learn Chinese", "Ni Hao", "Xie Xie", "Gong Xi Fa Cai"],
        faq=[
            ("What is cǎoshū?", "The Chinese cursive script, literally grass script. It reduces characters to abbreviated flowing shapes with their own conventions, began as a Han-dynasty shorthand, and reached its extreme in Tang-dynasty wild cursive."),
            ("What is the difference between running script and cursive script in Chinese?", "Running script, xíngshū, softens and links the strokes of regular characters and stays readable to anyone who knows them. Cursive script, cǎoshū, abbreviates characters so far that it must be learned separately."),
            ("Can the generator write Chinese characters in cursive?", "No. It styles only the Latin letters A to Z, so Chinese characters pass through unchanged. The romanised Zhongwen or the English word Chinese converts fully."),
            ("Who were the famous Chinese cursive calligraphers?", "Wang Xizhi in the fourth century set the standard for mature cursive and running script, and the Tang-dynasty masters Zhang Xu and Huaisu are famous for wild cursive written in a single continuous motion."),
        ],
        related=["china", "japanese", "korean", "japan", "english", "malaysia", "india"],
        explore="<p>The country name is covered on the <a href=\"/china-in-cursive/\">China in cursive</a> page. Cǎoshū's Japanese descendant, sōsho, is on the <a href=\"/japanese-in-cursive/\">Japanese in cursive</a> page, and <a href=\"/egypt-in-cursive/\">Egypt in cursive</a> covers the only cursive tradition that is older. The <a href=\"/nation-in-cursive/\">Nation in Cursive</a> hub lists them all.</p>",
    ),
]
