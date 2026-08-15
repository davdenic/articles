---
id: ART-1
title: 'Port article: About the foundations of AI assisted software development'
status: To Do
assignee: []
created_date: '2026-08-15 19:42'
labels:
  - content
dependencies: []
ordinal: 1000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Bring David's existing article "About the foundations of AI assisted software development" into this Astro articles site as a new article folder, following the repo workflow in CLAUDE.md.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 New folder src/content/articles/NNNN-slug created with next free number and a kebab-case slug
- [ ] #2 index.md has full frontmatter matching src/content.config.ts (title, description, draft, version, published, updated, changelog)
- [ ] #3 Article body ported into index.md; images (if any) co-located in the folder and referenced relatively
- [ ] #4 Starts as draft: true
- [ ] #5 npm run qa passes (lint, spell, images) and npm run build succeeds
<!-- AC:END -->
