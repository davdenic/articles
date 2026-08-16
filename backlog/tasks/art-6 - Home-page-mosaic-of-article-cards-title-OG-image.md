---
id: ART-6
title: 'Home page: mosaic of article cards (title + OG image)'
status: Done
assignee: []
created_date: '2026-08-15 21:49'
updated_date: '2026-08-16 16:33'
labels:
  - frontend
dependencies:
  - ART-5
ordinal: 6000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Turn the home page into a responsive mosaic/grid of article cards, each showing the article title and its image — the same image resolved for OG/social in ART-5 (first image in the article, with optional `image` override and site-default fallback).

**Why:** A visual, scannable landing beats a plain text list, and reusing the OG image keeps the home page, social previews, and structured data visually consistent from a single source of truth.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Home shows a responsive mosaic/grid of cards, one per listed article
- [ ] #2 Each card shows the article title and its image, using the SAME image-resolution logic as ART-5 (first image → `image` override → site default), not a separate rule
- [ ] #3 Cards link to the article; only non-draft articles show in production (drafts still visible in dev, per the existing filter)
- [ ] #4 Grid is responsive and styled coherently in both light and dark themes
- [ ] #5 Graceful when an article has no image (uses the site default)
- [ ] #6 npm run qa and npm run build pass
<!-- AC:END -->
