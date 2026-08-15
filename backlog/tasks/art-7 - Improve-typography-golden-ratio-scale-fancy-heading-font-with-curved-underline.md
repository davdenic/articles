---
id: ART-7
title: >-
  Improve typography: golden-ratio scale + fancy heading font with curved
  underline
status: In Progress
assignee: []
created_date: '2026-08-15 21:51'
updated_date: '2026-08-15 22:05'
labels:
  - frontend
  - design
dependencies: []
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Rework the site typography. Build the font-size scale on the golden ratio (aurea ratio, ~1.618) as a modular type scale, and replace the heading font with something more distinctive — preferably a non-serif or a handwriting/script display font for headings — while keeping the body reading font. Give h1/h2 a decorative hand-drawn curved underline. Also restyle the thematic break (`<hr>`, from `---`) as a fancy-but-subtle section separator (e.g. three spaced dots / small ornament) — gentle, not a strong line.

**Why:** A deliberate golden-ratio scale makes the hierarchy feel harmonious, a characterful heading font plus the curved underline give the site personality, and a soft ornamental separator marks section breaks without the heaviness of a full rule — instead of looking like a default template.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Font-size scale is a modular scale based on the golden ratio (~1.618), expressed as CSS custom properties in global.css and applied to body + headings
- [ ] #2 Heading font replaced with a distinctive display font (preferably non-serif, optionally a handwriting/script face); body reading font kept legible
- [ ] #3 h1 and h2 have a decorative curved/hand-drawn underline (CSS or inline SVG), not a plain border
- [ ] #4 Thematic break (`<hr>`) restyled as a fancy-but-subtle separator (e.g. three spaced dots / small ornament), gentle not a strong line; the plain rule is hidden
- [ ] #5 Fonts are self-hosted (no external CDN/Google Fonts request) to avoid third-party calls; document the source/license
- [ ] #6 Typography respects the existing dark/light theme system (colours via the theme CSS variables; headings, underline and separator legible and correct in BOTH themes and when toggled)
- [ ] #7 Type scale is responsive (scales down on mobile) and headings stay readable/accessible
- [ ] #8 npm run qa and npm run build pass
<!-- AC:END -->
