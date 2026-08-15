---
id: ART-2
title: Add dark/light mode switch
status: In Progress
assignee: []
created_date: '2026-08-15 21:34'
updated_date: '2026-08-15 21:57'
labels:
  - frontend
dependencies: []
ordinal: 2000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Add a dark/light theme toggle to the site, defaulting to the OS `prefers-color-scheme` and persisting the reader's choice across visits.

**Why:** Reading comfort and reader expectation — long-form articles are read in both bright and dark environments; respecting and remembering the preference is table stakes.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 A visible toggle switches between light and dark themes
- [ ] #2 Initial theme respects the OS prefers-color-scheme when no choice is stored
- [ ] #3 The chosen theme persists across page loads (e.g. localStorage) with no flash of the wrong theme on load
- [ ] #4 Both themes styled coherently (text, links, images, meta line) in global.css
- [ ] #5 npm run qa and npm run build pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
Inline top-right icon toggle. CSS: light defaults on :root; dark vars on :root[data-theme=dark] AND @media(prefers-color-scheme:dark) :root:not([data-theme=light]) so unset=OS, set=obey. No-flash inline head script reads localStorage.theme. Toggle button (sun/moon SVG) in Base.astro top bar, right-aligned; click flips + persists + updates icon.
<!-- SECTION:PLAN:END -->
