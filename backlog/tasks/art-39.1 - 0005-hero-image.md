---
id: ART-39.1
title: 0005 hero image
status: In Progress
assignee: []
created_date: '2026-10-18 08:02'
updated_date: '2026-10-18 08:02'
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
- [ ] #1 hero.svg: handwriting font embedded base64, viewBox width >=1200, white bg, comic/hand-drawn style
- [ ] #2 hero.png exactly 1200x630
- [ ] #3 Committed on review-0005-humanize, included in PR #46
- [ ] #4 index.md image reference and alt text unchanged
<!-- AC:END -->
