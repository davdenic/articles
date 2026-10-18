---
id: ART-39.1
title: 0005 hero image
status: In Progress
assignee: []
created_date: '2026-10-18 08:02'
updated_date: '2026-10-18 08:10'
labels: []
dependencies: []
parent_task_id: ART-39
ordinal: 37000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Replace the bulk-generated hero.png for article 0005 with a new hand-drawn hero (hero.svg source + 1200x630 PNG render), committed on review-0005-humanize (PR #46).\n\n**Why:** The current hero is a placeholder from bulk commit 5815982; the user asked for a proper on-theme hero (dev pasting a stack trace with personal data into an AI chat, GDPR flavour).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 hero.svg: handwriting font embedded base64, viewBox width >=1200, white bg, comic/hand-drawn style
- [x] #2 hero.png exactly 1200x630
- [x] #3 Committed on review-0005-humanize, included in PR #46
- [x] #4 index.md image reference and alt text unchanged
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Verified: hero.svg has 2 base64-embedded font data URIs + @font-face, viewBox 0 0 1200 630; sips confirms hero.png 1200x630; remote tip d690ee7 = local, PR #46 diff lists hero.png+hero.svg+index.md; index.md untouched by the hero commit. Designer (vision model) visually self-checked the render (no tofu, nothing clipped).
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
New hand-drawn hero for 0005 on branch review-0005-humanize (commit d690ee7, in PR #46): hero.svg source (comic panel: dev pasting a stack trace with j.doe@example.com highlighted into an AI chat, EU shield for GDPR; Caveat handwriting font embedded base64) + hero.png rendered at exactly 1200x630 via sharp. Replaces the bulk placeholder from 5815982. No index.md changes needed.
<!-- SECTION:FINAL_SUMMARY:END -->
