---
id: ART-37
title: Build a 'me' landing page at davdenic.github.io (root user site)
status: Done
assignee: []
created_date: '2026-08-17 17:03'
updated_date: '2026-08-17 17:32'
labels:
  - chore
dependencies: []
ordinal: 34000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Create a new GitHub Pages **user-site** repo `davdenic/davdenic.github.io` serving a tiny personal landing page at the root `https://davdenic.github.io/` (which currently 404s because the articles site is a project page under `/articles/`). A micro "me" page: short bio + photo, and primary links to **Articles** (`https://davdenic.github.io/articles/`), **CV** (David's Netlify resume subdomain — URL TBD), **Flickr** photos (URL TBD), and LinkedIn. Reuse the bio/photo from the articles' `src/components/AuthorFooter.astro` ("Software engineer with 25+ years on web development, PHP, Python and CI/CD, exploring how to make AI a reliable engineering teammate."). Plain self-contained static `index.html` (no build); enable Pages on `main`/root; no custom domain. Full design in plan file /Users/david/.claude/plans/pure-kindling-quasar.md.\n\n**Why:** Gives David a real home page (fixes the root 404) that ties together his three web presences (articles on GH Pages, CV on Netlify, photos on Flickr) without a custom domain.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 New repo davdenic/davdenic.github.io with a self-contained index.html; GitHub Pages enabled (main/root); https://davdenic.github.io/ returns 200 (no 404)
- [ ] #2 Micro 'me' page: name, short reused bio, photo; clear links to Articles, CV (Netlify), Flickr, LinkedIn — all resolving
- [ ] #3 SEO done well: unique <title> + meta description, canonical, Open Graph + Twitter card (title/description/image), an OG share image, favicon, semantic HTML, valid lang; responsive + light/dark
- [ ] #4 GEO / AI-visibility done well: JSON-LD schema.org Person (name, jobTitle, url, sameAs → Articles/CV/Flickr/LinkedIn), robots.txt allowing crawlers + AI agents with a sitemap.xml, and an llms.txt pointing to the articles site (mirror the patterns in the articles repo: public/robots.txt, sitemap, llms.txt)
- [ ] #5 Gather the two missing URLs first (CV Netlify subdomain, Flickr) before building
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Include a portrait photo like the one in the articles footer — reuse src/assets/author.jpg (the same headshot), shown prominently on the landing page.

Local clone should live at /Users/david/DEV/me (repo davdenic/davdenic.github.io checked out there).

SHIPPED. Repo davdenic/davdenic.github.io created + cloned at /Users/david/DEV/me; self-contained index.html styled like the articles site (Newsreader, palette, accent underline, light/dark), portrait (author.jpg), reused bio, link cards to Articles/CV(ddenicolo.netlify.app)/Flickr(flickr.com/photos/davdenic)/LinkedIn. SEO (title/desc/canonical/OG/Twitter/favicons) + GEO (JSON-LD Person sameAs, host-root robots.txt with both sitemaps, sitemap.xml, llms.txt), .nojekyll. Pages enabled (main/root). Verified live: https://davdenic.github.io/ HTTP 200, all assets + /articles/ 200.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Built and shipped the personal landing page at davdenic.github.io (root). Verified: root + all assets HTTP 200; /articles/ unaffected.
<!-- SECTION:FINAL_SUMMARY:END -->
