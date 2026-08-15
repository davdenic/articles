# Articles

My articles. Written in Markdown, edited in Obsidian, published as an Astro site on GitHub Pages, then cross-posted to LinkedIn / Medium (with canonical link back here).

## How it works

- One repo. The Obsidian vault folder and Astro's content folder are the **same folder**.
- Write Markdown → push to `main` → GitHub Action builds and deploys the site automatically.
- Public URL: `https://davdenic.github.io/articles/` (project site).

## Structure

```
src/content/articles/
  0001-hello-world/
    index.md        ← the article
    cover.png       ← images live beside index.md
src/pages/
  index.astro       ← lists live articles
  articles/[...slug].astro  ← article page (number stripped from URL)
.github/workflows/deploy.yml  ← Astro → GitHub Pages
```

### One folder per article

- Folder name = `NNNN-slug` (zero-padded number + slug, no spaces).
  - Number = stable ID + ordering + cross-link handle ("see 0003").
  - The public URL **strips the number**: `0001-hello-world` → `/articles/hello-world/`.
- The Markdown file is always `index.md`.
- Images go in the same folder, referenced relatively (`./cover.png`). Astro optimizes them.

## Frontmatter schema

```yaml
---
title: Hello World                       # required — the human title
description: One-line summary.           # optional — used for SEO / cards
draft: false                             # true = hidden, false/absent = live
version: 1                               # bump on meaningful edits
published: 2026-08-15                    # first publish date
updated: 2026-08-15                      # last edit date
changelog:                               # newest first
  - "2026-08-15: first publish"
---
```

### Statuses (only two)

- `draft: true` → hidden from the built site.
- `draft: false` (or omitted) → **live**.
- In `npm run dev` drafts stay visible so you can preview them; production build drops them.

## Obsidian setup

1. Obsidian → **Open folder as vault** → select `src/content/articles/`.
   - This scopes the vault to articles only (not config/build files).
2. Install community plugin **Front Matter Title**.
   - Every article file is `index.md`, so tabs/links would all read "index".
   - This plugin shows the frontmatter `title` instead. Enable it.
3. Recommended Obsidian settings:
   - **New link format:** relative path — keeps image links portable for Astro.
   - **Default location for new attachments:** *Same folder as current file* — drops pasted images straight into the article folder.
4. To add an article: create a folder `NNNN-slug/`, add `index.md`, paste the frontmatter block, write.

## Local development

```bash
npm install
npm run dev       # preview at localhost:4321 (drafts visible)
npm run build     # production build (drafts dropped)
npm run preview   # serve the production build locally
```

## Publishing checklist

1. Set `draft: false`, fill `published` / `updated`, bump `version`, add a changelog line.
2. Commit + push to `main`. The Action deploys.
3. Cross-post to LinkedIn / Medium. Set the canonical URL to the article on this site so search engines credit the original.

## Setup notes (one-time)

- Repo: `davdenic/articles` (project site). Config already set: `site: https://davdenic.github.io`, `base: /articles`.
- GitHub repo → **Settings → Pages → Source: GitHub Actions**.
