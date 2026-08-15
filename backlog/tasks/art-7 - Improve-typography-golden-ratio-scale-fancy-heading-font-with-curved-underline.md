---
id: ART-7
title: >-
  Improve typography: golden-ratio scale + fancy heading font with curved
  underline
status: To Do
assignee: []
created_date: '2026-08-15 21:51'
labels:
  - frontend
  - design
dependencies: []
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Rework the site typography. Build the font-size scale on the golden ratio (aurea ratio, ~1.618) as a modular type scale, and replace the heading font with something more distinctive — preferably a non-serif or a handwriting/script display font for headings — while keeping the body reading font. Give h1/h2 a decorative hand-drawn curved underline.

**Why:** A deliberate golden-ratio scale makes the hierarchy feel harmonious, and a characterful heading font plus the curved underline give the site personality instead of looking like a default template.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Font-size scale is a modular scale based on the golden ratio (~1.618), expressed as CSS custom properties in global.css and applied to body + headings
- [ ] #2 Heading font replaced with a distinctive display font (preferably non-serif, optionally a handwriting/script face); body reading font kept legible
- [ ] #3 h1 and h2 have a decorative curved/hand-drawn underline (CSS or inline SVG), not a plain border
- [ ] #4 Fonts are self-hosted (no external CDN/Google Fonts request) to avoid third-party calls; document the source/license
- [ ] #5 Headings stay readable and accessible (contrast, size) and the scale is responsive (scales down on mobile) in both light and dark themes
- [ ] #6 npm run qa and npm run build pass
<!-- AC:END -->
