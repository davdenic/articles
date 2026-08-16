---
id: ART-14
title: 'Article: SaaS AI vs self-hosted/local LLM (privacy & GDPR)'
status: In Progress
assignee: []
created_date: '2026-08-16 12:37'
updated_date: '2026-08-16 14:06'
labels:
  - research
  - content
dependencies: []
ordinal: 13000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Article comparing cloud AI services (ChatGPT, Claude) against self-hosted/local models (Llama and similar), focused on the privacy/GDPR trade-off: convenience and capability vs data control and no data leaving your environment. When is local worth it? Cite Salvatore Sanfilippo's (antirez) work on running local LLMs — VERIFY the exact project/reference first (David mentioned 'darfstar4' — likely misremembered; do not cite until confirmed). Optional analogy: streaming services vs self-hosted media (music; movies via Jellyfin/Plex) — include only if it genuinely strengthens the point, drop if it distracts. Companion to ART-13 (GDPR).

**Why:** Teams weighing cloud AI's ease against the data-control/GDPR benefits of local models need a clear, honest framing — especially for sensitive or client data.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Compares cloud vs local AI across capability, cost, ops effort, and privacy/GDPR/data-control
- [ ] #2 Explains when self-hosting is worth it (sensitive data never leaves; no third-party processor)
- [ ] #3 antirez local-LLM reference verified against a real source before citing (no invented project names)
- [ ] #4 Streaming self-hosted parallel used only if it clarifies; otherwise omitted
- [ ] #5 draft: true; sources cited; npm run qa and npm run build pass
<!-- AC:END -->
