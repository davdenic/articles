---
id: doc-1
title: Run Astro locally
type: guide
created_date: '2026-08-15 19:44'
---

## Run Astro locally

Requires Node 22+.

```bash
npm install        # once, after cloning or when dependencies change
npm run dev        # start the dev server (drafts visible), http://localhost:4321/articles
```

That is all you need day-to-day. Edit files in `src/`; the browser reloads automatically.

## Before pushing

```bash
npm run qa         # lint + spell + image checks
npm run build      # production build (drafts dropped) — must pass
```

## Occasionally

```bash
npm run preview    # serve the built site to check the production output
```
