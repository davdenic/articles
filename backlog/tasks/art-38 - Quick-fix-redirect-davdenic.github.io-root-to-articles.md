---
id: ART-38
title: 'Quick fix: redirect davdenic.github.io root to /articles/'
status: Done
assignee: []
created_date: '2026-08-17 17:13'
updated_date: '2026-08-17 17:32'
labels:
  - chore
dependencies: []
ordinal: 35000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Interim stopgap for the root 404: create the `davdenic/davdenic.github.io` user-site repo with a minimal `index.html` that redirects `https://davdenic.github.io/` → `https://davdenic.github.io/articles/` (meta refresh + a JS `location.replace` fallback + a plain link for no-JS). Enable Pages on main/root. No styling, no build.\n\n**Why:** Makes the bare root usable immediately while the fuller 'me' landing page (ART-37) is designed. When ART-37 ships, it replaces this index.html in the same repo.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 davdenic/davdenic.github.io repo exists with an index.html that redirects root → /articles/ (meta refresh + JS + <noscript> link); Pages enabled
- [ ] #2 https://davdenic.github.io/ lands on the articles site (no 404)
- [ ] #3 Superseded by ART-37 (the me-page) — same repo, swap the index later
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Repo is davdenic/davdenic.github.io (must be named that to serve the root); clone locally at /Users/david/DEV/me. Same repo ART-37 later replaces.

Superseded — the full me-page (ART-37) shipped directly and serves the root, so the redirect stopgap isn't needed.
<!-- SECTION:NOTES:END -->
