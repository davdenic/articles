---
id: ART-7
title: >-
  Improve typography: golden-ratio scale + fancy heading font with curved
  underline
status: Done
assignee: []
created_date: '2026-08-15 21:51'
updated_date: '2026-08-15 22:53'
labels:
  - frontend
  - design
dependencies: []
ordinal: 7000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Rework the site typography. Build the font-size scale on the golden ratio (aurea ratio, ~1.618) as a fluid, curved modular scale, and replace the heading font with a distinctive non-serif display font while keeping the body reading font. Give the h1 a decorative hand-drawn curved underline. Also restyle the thematic break (`<hr>`, from `---`) as a fancy-but-subtle section separator (three spaced dots) — gentle, not a strong line.

**Why:** A deliberate golden-ratio scale makes the hierarchy feel harmonious, a characterful heading font plus the h1 underline give the site personality, and a soft ornamental separator marks section breaks without the heaviness of a full rule — instead of looking like a default template.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Font-size scale is a modular scale based on the golden ratio (~1.618), expressed as CSS custom properties in global.css and applied to body + headings
- [ ] #2 Heading font replaced with a distinctive display font (preferably non-serif, optionally a handwriting/script face); body reading font kept legible
- [ ] #3 Thematic break (`<hr>`) restyled as a fancy-but-subtle separator (e.g. three spaced dots / small ornament), gentle not a strong line; the plain rule is hidden
- [ ] #4 Fonts are self-hosted (no external CDN/Google Fonts request) to avoid third-party calls; document the source/license
- [ ] #5 Type scale is responsive (scales down on mobile) and headings stay readable/accessible
- [ ] #6 npm run qa and npm run build pass
- [ ] #7 The h1 has a decorative curved/hand-drawn underline (CSS mask + --accent); h2/h3 do not
- [ ] #8 Heading font is self-hosted via @font-face (no external CDN/Google Fonts request); document the source/license
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Implemented in PR #7: Oswald (light, elongated condensed sans) headings self-hosted; golden-ratio fluid clamp scale on an accelerating curve with larger reading text + widened column; hand-drawn curved underline on h1; three-dot hr separator; body stays Georgia; all theme-aware.
<!-- SECTION:FINAL_SUMMARY:END -->
