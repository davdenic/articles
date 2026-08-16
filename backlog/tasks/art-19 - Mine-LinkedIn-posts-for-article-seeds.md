---
id: ART-19
title: Mine LinkedIn posts for article seeds
status: In Progress
assignee: []
created_date: '2026-08-16 13:37'
updated_date: '2026-08-16 14:41'
labels:
  - content
  - research
dependencies: []
ordinal: 18000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Review David's LinkedIn posts and identify which ones could grow into full site articles. Produce a shortlist mapping post → article idea/angle.

**Why:** David already writes short reflections on LinkedIn; several could become fuller evergreen articles here (with the canonical living on the site).
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 David provides the posts (LinkedIn can't be fetched — export or paste)
- [ ] #2 Shortlist of posts worth expanding, each with a proposed article angle
- [ ] #3 Note which are quick expansions vs need research
<!-- AC:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
LinkedIn post → article-seed shortlist (David's posts):

STRONG (own article):
1. Flattening / saying less in the age of AI writing → DONE (0011).
2. Automated Testing for Content Elements + TYPO3 Seeder for E2E (T3DD26 d3) → TYPO3 QA/testing article; notes available.
3. Chatbot can't cancel an order, a human fixes it → 'edge cases all the way down' / human-in-the-loop reflection.
8. EU AI Act (Feb 2026 GPAI transparency; Aug 2026 high-risk; extraterritorial; fines/bans) → timely; pairs with 0005 GDPR.
10. Digital sovereignty in Switzerland: Matomo instead of GTM, easy on TYPO3+DDEV → privacy-first analytics / sovereignty how-to.

CLUSTER → one experiential article 'Testing local LLMs in real work':
5. High-memory Mac (256/512GB) to run DeepSeek V4 Pro locally.
11. Code review local opencode+Gemma-4 vs Claude Code Opus 4.8 — Claude still better, Gemma missed bugs.
12. Gemma-4 on mobile (Edge Gallery), free + on-device; can't parse 90"=90s (says rest 9 min); LLMs great at language, weak at numbers/units.
(overlaps/enriches 0010 cloud-vs-self-hosted; could be its companion.)

MEDIUM:
4. Replacing gulp with Vite (WIP) → short TYPO3 frontend-build migration piece.

HOOK (not standalone):
7. 'Don't read sensible data… auto mode on' (humor) → opener for AI-agents-and-secrets.
9. ChatGPT confidently roleplays a powerlifter persona → opener for AI-hallucination/persona.

SKIP (social): 6. Friends & cakes at T3DD26.
<!-- SECTION:NOTES:END -->
