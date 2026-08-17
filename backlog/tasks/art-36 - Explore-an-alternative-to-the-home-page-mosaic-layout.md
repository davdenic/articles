---
id: ART-36
title: Explore a polygonal (non-rectangular) home-page tile layout
status: To Do
assignee: []
created_date: '2026-08-17 07:42'
updated_date: '2026-08-17 07:44'
labels:
  - chore
dependencies: []
ordinal: 33000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Explore replacing the current rectangular home-page grid with a more **polygonal, less rectangular** layout, while keeping each card's **title readable**. The current home grid (ART-6) is a dense CSS-grid mosaic of rectangular tiles with variable `size` spans. David wants something more visually organic/angular. Evaluate approaches and recommend one with a proof-of-concept:\n- **Hexagonal grid** (honeycomb of hex tiles via clip-path)\n- **Angled / sheared tiles** (parallelogram/rhombus via CSS `clip-path` or transforms)\n- **Voronoi / irregular-polygon mosaic** (organic cells; most distinctive, hardest to keep tidy)\n- **Clip-path masonry** (rectangular flow, polygonal masks on top)\n\nKey constraint: the **title must stay fully legible** — polygonal cropping must not eat the headline (e.g. keep a readable text zone, overlay a straight text band, or place titles below the shape).\n\n**Why:** David wants a more intentional, less boxy home layout, but not at the cost of readability. Naming concrete polygonal patterns makes the choice deliberate.
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
- [ ] #9 Compares at least 3 polygonal approaches (hex grid, angled/sheared tiles, Voronoi/irregular, clip-path masonry) with pros/cons for this content set
- [ ] #10 Title/headline remains fully readable in every approach evaluated (explicit note on how text stays legible over/under the polygon)
- [ ] #11 Recommendation with rationale + minimal proof-of-concept branch or screenshot; responsive + light/dark + accessibility considered
- [ ] #12 Existing per-article size/imagePosition frontmatter accounted for; npm run qa and npm run build pass for any prototype committed
<!-- AC:END -->
