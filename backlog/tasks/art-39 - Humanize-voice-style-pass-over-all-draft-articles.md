---
id: ART-39
title: Humanize voice/style pass over all draft articles
status: In Progress
assignee: []
created_date: '2026-10-18 08:02'
updated_date: '2026-10-18 08:02'
labels: []
dependencies: []
ordinal: 36000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Run a WRITER-led voice/style review over the 12 draft articles (0004, 0005, 0007, 0010-0018), apply minimal humanize fixes (voice only, content unchanged), one branch + PR per article (review-NNNN-humanize, PRs #45-#56).\n\n**Why:** Drafts read AI-ish (em-dash overuse, stiff phrasing, missing humour). AGENTS.md voice rules + the humanize skill require a curious, plain-spoken, lightly humorous voice.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Each PR touches exactly one article index.md, no frontmatter schema changes
- [ ] #2 All 12 PRs MERGEABLE against main
- [ ] #3 No AI attribution in any article
<!-- AC:END -->
