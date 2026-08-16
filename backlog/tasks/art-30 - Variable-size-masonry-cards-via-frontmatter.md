---
id: ART-30
title: Variable-size masonry cards via frontmatter
status: Done
assignee: []
created_date: '2026-08-16 16:59'
updated_date: '2026-08-16 17:04'
labels: []
dependencies: []
ordinal: 27000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Let the home mosaic show cards of different sizes via an optional frontmatter field `size` written as `WxH` grid spans (columns x rows): e.g. `2x1` (wide), `1x2` (tall), `2x2` (big), `3x1`. Default `1x1`. No dynamic measuring.

**Why:** A uniform grid reads flat. Sizing tiles by the article's weight/length gives the home page editorial rhythm and signals which pieces matter. Follows ART-6 (mosaic).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Add optional `size` enum to the content schema (normal|wide|tall|feature), default normal
- [ ] #2 Home switches from CSS multicol to CSS grid (dense) so cards can span columns and rows per `size`
- [ ] #3 Images crop to fill (object-fit cover); fallback block scales; layout collapses cleanly on mobile
- [ ] #4 Build + qa green
- [ ] #5 Add optional `size` field to the content schema, format `WxH` (regex-validated), default `1x1`
- [ ] #6 Home switches from CSS multicol to CSS grid (dense); each card spans W columns x H rows from `size`; browser clamps over-wide spans on narrow screens
- [ ] #7 Images crop to fill (object-fit cover); fallback block scales; layout collapses cleanly on mobile
- [ ] #8 Build + qa green
<!-- AC:END -->
