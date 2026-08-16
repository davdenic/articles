---
id: ART-29
title: Investigate + add automated tests to QA
status: To Do
assignee: []
created_date: '2026-08-16 16:51'
labels: []
dependencies: []
ordinal: 27000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Investigate which automated tests are worth adding to the site, then agree a first slice and wire it into QA/CI. Current QA only lints content (markdownlint, cspell, image check, SEO check) + build/schema gate + lychee links — nothing asserts the site actually behaves.

**Why:** Content linting misses behavioural regressions. The base-path 404 (doubled /articles/articles) shipped and was caught by hand, not CI. Things worth guarding: draft filtering (drafts never build), public-URL derivation (strip NNNN-), share-image + card image resolver, SEO/OG/canonical/JSON-LD output, GEO endpoints (sitemap/rss.xml/llms.txt) content, theme no-flash. Investigate-first: decide what's worth it before writing tests.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Survey options with worth/cost notes: unit (vitest) for pure helpers (slug, image/description resolvers); rendered-output assertions on built HTML/endpoints; e2e (Playwright) for routing/theme/nav
- [ ] #2 Recommend a minimal high-value first set and get David's sign-off on scope before implementing
- [ ] #3 Implement the agreed slice and wire it into 'npm run qa' + the qa.yml CI workflow
- [ ] #4 Document the testing approach as a backlog doc or decision
<!-- AC:END -->
