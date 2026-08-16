---
id: ART-10
title: Add a site favicon
status: Done
assignee: []
created_date: '2026-08-16 10:58'
updated_date: '2026-08-16 11:02'
labels:
  - frontend
dependencies: []
ordinal: 9000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Add a browser favicon from the provided image (`~/Pictures/evil-tentacle.png`). Generate the needed sizes/formats (ICO/PNG 32×32, a modern PNG/SVG, apple-touch-icon 180×180) and wire `<link rel="icon">` in the layout head with the correct site base path.

**Why:** Tab/bookmark identity — the site currently ships no favicon.

**Note (rights):** the image is the Purple Tentacle from Day of the Tentacle (LucasArts) — a copyrighted character. Confirm it's acceptable for public use before shipping, or swap for an original/licensed icon.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Favicon appears in the browser tab on all pages
- [ ] #2 Sizes/formats generated (32×32, apple-touch-icon 180×180, modern PNG/SVG)
- [ ] #3 Wired in Base.astro head with base-path-correct URLs; source asset optimized
- [ ] #4 Rights confirmed (or a licensed/original icon used instead)
- [ ] #5 npm run qa and npm run build pass
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Generated favicon sizes (32, 512, apple-touch 180) from evil-tentacle.png into public/, wired <link> tags in Base.astro with base-correct URLs. Rights: David accepted use of the Purple Tentacle image for the personal site.
<!-- SECTION:FINAL_SUMMARY:END -->
