#!/usr/bin/env python3
"""Add a "Countries and Languages Starting With X" list to each cursive-letters
page, linking every nation page whose name begins with that letter.

The letter pages explain exactly the capital these words begin with, so they
are the most relevant internal link the nation pages can get; each anchor
carries the nation page's own hook so no two anchors read the same.
Idempotent: a page that already links a nation is left alone. Mirrors to public/.

Run from the repo root:  python3 scripts/link-letters-to-nations.py
"""
import glob, html, importlib.util, json, os, re, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT_DIR = os.path.join(ROOT, "scripts", "nation-pages-content")
SCRIPT_LOWER = "𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏"
SCRIPT_UPPER = "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵"


def cursive(text):
    lo, up = list(SCRIPT_LOWER), list(SCRIPT_UPPER)
    return "".join(lo[ord(c) - 97] if "a" <= c <= "z" else up[ord(c) - 65] if "A" <= c <= "Z" else c for c in text)


def load_pages():
    pages = []
    for path in sorted(glob.glob(os.path.join(CONTENT_DIR, "*.py"))):
        spec = importlib.util.spec_from_file_location(os.path.basename(path)[:-3], path)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        pages.extend(mod.PAGES)
    with open(os.path.join(CONTENT_DIR, "hooks.json"), encoding="utf-8") as f:
        hooks = json.load(f)
    with open(os.path.join(CONTENT_DIR, "retired.json"), encoding="utf-8") as f:
        retired = set(json.load(f)["slugs"])  # taken-down pages must not be linked
    pages = [p for p in pages if p["slug"] not in retired]
    for p in pages:
        p["hooks"] = hooks[p["slug"]]
    return pages


def main():
    by_letter = {}
    for p in load_pages():
        by_letter.setdefault(p["name"][0].lower(), []).append(p)
    touched = 0
    for letter, pages in sorted(by_letter.items()):
        rel = f"cursive-letters/{letter}-in-cursive/index.html"
        path = os.path.join(ROOT, rel)
        if not os.path.exists(path):
            print(f"skip {letter}: no letter page")
            continue
        t = open(path, encoding="utf-8").read()
        todo = [p for p in sorted(pages, key=lambda p: p["name"]) if f'href="/{p["slug"]}-in-cursive/"' not in t]
        if not todo:
            continue
        items = "".join(
            f'\n            <li><strong>{html.escape(p["name"])}</strong> &mdash; <span class="nm">{cursive(p["name"])}</span> &middot; '
            f'<a href="/{p["slug"]}-in-cursive/">{html.escape(p["name"])} in cursive: {html.escape(p["hooks"]["title"])}</a></li>'
            for p in todo
        )
        L = letter.upper()
        block = (f'\n          <h3>Countries and Languages Starting With {L} in Cursive</h3>\n'
                 f'          <ul class="ex-list">{items}\n          </ul>\n')
        # place it right after the "Names Starting With X" list
        m = re.search(rf"<h2>Names Starting With {L} in Cursive</h2>\s*<ul class=\"ex-list\">[\s\S]*?</ul>\n", t)
        if not m:
            print(f"skip {letter}: no Names section")
            continue
        t = t[: m.end()] + block + t[m.end():]
        open(path, "w", encoding="utf-8").write(t)
        dst = os.path.join(ROOT, "public", rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(path, dst)
        touched += 1
        print(f"{letter}: linked {', '.join(p['name'] for p in todo)}")
    print(f"updated {touched} letter pages")


if __name__ == "__main__":
    main()
