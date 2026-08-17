---
id: ART-36
title: Explore a true masonry layout for the home page
status: To Do
assignee: []
created_date: '2026-08-17 07:42'
updated_date: '2026-08-17 07:43'
labels:
  - chore
dependencies: []
ordinal: 33000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Explore replacing the current home-page layout with a true **masonry** layout. The current home grid (ART-6) is a dense CSS-grid approximation with variable `size` tile spans — not real masonry. Evaluate the genuine masonry options and recommend one, with a small proof-of-concept:\n- **Native CSS masonry** (`grid-template-rows: masonry` / the CSS Masonry spec) — check current browser support and whether a fallback is still needed as of 2026.\n- **CSS columns masonry** (`column-count`) — simple, but reflows order top-to-bottom per column.\n- **JS masonry** (e.g. Masonry.js / a lightweight modern equivalent) — precise, but adds a dependency and layout-shift considerations.\n\nCompare against the current dense-grid mosaic and recommend whether to switch.\n\n**Why:** David specifically wants a real masonry layout; the current approximation isn't it. Naming the concrete masonry approaches makes the choice deliberate.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Named comparison of at least 3 layout patterns (bento grid, justified gallery, quilted, masonry) with pros/cons for this content set
- [ ] #2 A recommendation with rationale, plus a minimal proof-of-concept branch or screenshot
- [ ] #3 Accessibility + responsive behaviour considered; light/dark themes; existing per-article size/imagePosition frontmatter accounted for
- [ ] #4 npm run qa and npm run build pass for any prototype committed
- [ ] #5 Compares native CSS masonry vs CSS columns vs JS masonry vs the current dense-grid mosaic, with 2026 browser-support notes
- [ ] #6 Recommendation with rationale, plus a minimal proof-of-concept branch or screenshot
- [ ] #7 Accessibility + responsive behaviour, light/dark themes, and existing per-article size/imagePosition frontmatter accounted for
- [ ] #8 npm run qa and npm run build pass for any prototype committed
<!-- AC:END -->
