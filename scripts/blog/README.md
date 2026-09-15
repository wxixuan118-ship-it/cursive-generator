# Blog

Posts are data, not hand-written HTML. `scripts/build-blog.mjs` renders them.

```
scripts/blog/posts/<slug>.json   title, seoTitle, description, excerpt, tag, date,
                                 readMinutes, lede, navLabel, related[], faq[], cta{}
scripts/blog/posts/<slug>.html   the article body (h2/h3, p, ul/ol, post-table, post-note, post-sample)
```

## Daily release

A post is published on its `date`. The build skips posts dated in the future, so
the whole week can sit in the repo while the site releases one per day:

```bash
node scripts/build-blog.mjs      # renders posts dated today or earlier + hub
git add -A && git commit -m "Publish: <post title>" && git push
```

Run it once a day (or whenever a post's date arrives). It also updates
`sitemap.xml`, `sitemap.html`, `indexnow-urls.txt`, the blog list in
`assets/navigation.js` (newest five) and, when that list changes, bumps the
`navigation.js?v=` cache-buster on every page. Everything is mirrored to `public/`.

`--all` ignores dates (preview the whole queue); `--date 2026-09-20` pretends it
is that day. After publishing, `npm run indexnow` submits the new URLs.

## Writing a post

- 650–1000 words, one H1 (the `title`), H2s that carry the topic, ≥4 internal links
  to tool pages, one outbound citation where a claim needs one.
- `description` 120–160 chars; `seoTitle` ≤ 60 chars (the site name is appended).
- At least 3 FAQ entries (rendered as `<details>` and FAQPage schema).
- Stay on the cursive theme: every post should send readers to a tool page.
