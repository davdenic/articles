---
id: ART-15
title: Style article tables with subtle borders for clarity
status: Done
assignee: []
created_date: '2026-08-16 12:40'
updated_date: '2026-08-16 12:41'
labels:
  - frontend
  - design
dependencies: []
ordinal: 14000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Add light styling to Markdown tables in articles — subtle border/row lines, comfortable cell padding, a distinguished header row — so tables read clearly. Currently they use unstyled browser defaults.

**Why:** Articles like 0002 (harness matrix) and 0003 (web-agency vs complex-product) rely on tables; without any rules they're hard to scan.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Article tables have subtle, theme-aware border/row lines (via --rule) — clear but not heavy
- [ ] #2 Header row is visually distinguished; cells have comfortable padding
- [ ] #3 Wide tables scroll horizontally inside their own container on small screens (page body never scrolls sideways)
- [ ] #4 Looks correct in both light and dark themes
- [ ] #5 npm run qa and npm run build pass
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Added .prose table styles: theme-aware row rules (--rule), heavier header underline, cell padding, and display:block + overflow-x:auto so wide tables scroll within the column instead of overflowing the page.
<!-- SECTION:FINAL_SUMMARY:END -->
