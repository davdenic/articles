---
id: ART-5
title: >-
  Auto-generate SEO from frontmatter (meta, OG, canonical, JSON-LD) + QA flags
  gaps
status: To Do
assignee: []
created_date: '2026-08-15 21:39'
updated_date: '2026-08-15 21:47'
labels:
  - seo
  - frontend
dependencies: []
ordinal: 5000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Central, frontmatter-derived SEO for every article — meta description (with fallback), Open Graph + Twitter Card tags, canonical URL, and schema.org JSON-LD (Article + author as Person) — plus a QA check that flags articles missing key SEO. Minimal manual authoring.

**Why:** SEO shouldn't depend on hand-writing tags per article. Auto-generation covers the common case, JSON-LD enables rich results, and a QA warning catches the articles that genuinely need a human-written description or image. (Merged from the former schema.org and SEO tasks.)
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Meta description: use frontmatter `description` when present, else derive a sensible fallback (first meaningful paragraph, trimmed)
- [ ] #2 Open Graph + Twitter Card tags and canonical URL emitted per article, derived from frontmatter
- [ ] #3 Valid schema.org JSON-LD <script> for an Article, with author as a Person (name from the author field)
- [ ] #4 Social/OG + JSON-LD image defaults to the FIRST image in the article; optional `image` frontmatter overrides it; a site default is used only when the article has no images
- [ ] #5 All generated centrally in the layout — no per-article manual SEO tags or JSON
- [ ] #6 Output validates (Google Rich Results / schema.org validator); no hardcoded or placeholder values
- [ ] #7 QA highlights articles missing key SEO (no description and no derivable fallback, or no resolvable image); decide/document warn-vs-fail consistent with the image-size warnings
- [ ] #8 npm run qa and npm run build pass
<!-- AC:END -->
