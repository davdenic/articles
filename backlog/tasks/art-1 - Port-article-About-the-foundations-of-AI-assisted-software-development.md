---
id: ART-1
title: 'Port article: About the foundations of AI assisted software development'
status: Done
assignee: []
created_date: '2026-08-15 19:42'
updated_date: '2026-08-15 21:28'
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

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Branch art-1-foundations-article off main. 2. Create folder 0002-foundations-of-ai-assisted-software-development with index.md (frontmatter, draft:true). 3. David pastes body + drops images in the folder via Obsidian. 4. Fill description; on publish set published/updated + changelog and flip draft:false. 5. npm run qa && npm run build; open PR.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Merged in PR #4. Article 0002 ported (draft), 7 images co-located with alt text, SEO description added. Also fixed the base-path 404 routing bug and the lychee link check.
<!-- SECTION:NOTES:END -->
