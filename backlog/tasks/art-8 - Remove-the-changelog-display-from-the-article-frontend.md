---
id: ART-8
title: Remove the changelog display from the article frontend
status: Done
assignee: []
created_date: '2026-08-16 08:56'
updated_date: '2026-08-16 08:58'
labels:
  - frontend
dependencies: []
ordinal: 8000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Stop rendering the per-article `changelog` section on article pages. Keep the `changelog` frontmatter field and schema (still tracked for authoring), just don't show it to readers.

**Why:** The changelog is versioning/authoring metadata, not reader-facing content — it clutters the published article.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Article pages no longer render the 'Changelog' section
- [ ] #2 The `changelog` frontmatter field and its schema stay unchanged (still stored, just not displayed)
- [ ] #3 Remove the now-unused `.changelog` CSS if nothing else uses it
- [ ] #4 npm run qa and npm run build pass
<!-- AC:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Removed the Changelog <section> from [...slug].astro and the unused .changelog CSS. The changelog frontmatter field/schema are unchanged (still tracked, just not displayed).
<!-- SECTION:FINAL_SUMMARY:END -->
