---
id: ART-3
title: Add reusable 'About the author' footer to every article
status: To Do
assignee: []
created_date: '2026-08-15 21:35'
updated_date: '2026-08-15 21:48'
labels:
  - frontend
dependencies:
  - ART-2
ordinal: 3000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** An 'About the author' block at the end of every article, sourced from a single shared partial/component included by the article layout.

**Why:** One source of truth for the bio — edit once, appears everywhere. Avoids copy-pasting the same block into each article and drifting out of sync.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 An 'About the author' block renders at the end of every article, in the footer area
- [ ] #2 The content lives in ONE shared partial/component (single source of truth), not duplicated per article
- [ ] #3 Editing that partial once updates the block on all articles automatically
- [ ] #4 Styled coherently with the reading layout in both light and dark themes
- [ ] #5 npm run qa and npm run build pass
<!-- AC:END -->
