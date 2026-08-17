---
id: ART-35
title: 'Chore: update Astro to the latest release'
status: To Do
assignee: []
created_date: '2026-08-17 07:39'
labels:
  - chore
dependencies: []
ordinal: 32000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Update the Astro dependency (currently `^5.0.0`, installed 5.18.2) to the latest release, including any related integrations (@astrojs/sitemap, etc.). Review the Astro changelog/upgrade guide for breaking changes, run `npx @astrojs/upgrade` if appropriate, and verify the site still builds and renders.\n\n**Why:** Stay current for security, performance, and feature fixes; small, regular bumps are cheaper than a big-bang upgrade later.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Astro (and @astrojs integrations) bumped to the latest compatible release; lockfile updated
- [ ] #2 Astro upgrade guide reviewed; any breaking changes handled and noted in the task
- [ ] #3 npm run qa and npm run build pass; home mosaic, an article page, OG/sitemap/RSS spot-checked
- [ ] #4 CHANGELOG updated; version bump per semver
<!-- AC:END -->
