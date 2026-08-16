---
id: decision-3
title: GEO / AI-visibility approach
date: '2026-08-16 16:29'
status: accepted
---
## Context

GEO (Generative Engine Optimization) = making the site legible and citable to
AI search / LLM answer engines (ChatGPT, Perplexity, Google AI, Claude), not
just to classic search crawlers. Source: Wolfgang Wagner, "Invisible to AI?"
(T3DD26). His six levers:

1. Structured data (JSON-LD, schema.org) — machine-readable meaning.
2. Content architecture — one topic per page, clear H2/H3, answer-first
   passages, FAQ blocks that map to how people ask questions.
3. E-E-A-T / evidence — named author, dates, sources, first-hand experience.
4. Machine-readable clarity — stable URLs, clean HTML, canonical.
5. Crawlability — sitemap + robots.txt that explicitly allow AI crawlers.
6. Off-page signals — being cited elsewhere; out of scope for the repo itself.

Plus: ship an `llms.txt` (a cheap signal, "ship it, don't sell it"), measure via
server logs, and don't over-invest — GEO is a signal, not a guarantee.

Goal here is personal-brand reputation, so being quotable by AI matters.

## Decision

Split the six levers into **code we ship now** and **editorial habits**.

**Shipped in code (this change):**

- `@astrojs/sitemap` — generates `sitemap-index.xml` at build (lever 5).
- `public/robots.txt` — explicitly allows the named AI crawlers (GPTBot,
  OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot,
  Claude-User, Claude-SearchBot, Google-Extended, Applebot-Extended) plus `*`,
  and points to the sitemap (lever 5).
- `src/pages/rss.xml.js` — RSS feed of live articles (distribution + a stable
  machine-readable index).
- `src/pages/llms.txt.ts` — plain-text index of live articles with absolute
  URLs and descriptions (the `llms.txt` signal).

**Already in place (ART-5, no new work):**

- JSON-LD Article + WebSite, canonical, OG/Twitter tags (levers 1, 4).
- Named author + published/updated dates in frontmatter and footer (lever 3).
- Stable numbered folders; public URL strips the number and never changes
  after publish (lever 4).

**Editorial habits (not code — apply when writing):**

- One topic per article; descriptive H2/H3 that read as questions/answers.
- Answer-first: put the takeaway near the top, then support it.
- Keep a Sources section with real, verifiable links (lever 3).
- Add short FAQ-style passages where a topic invites direct questions (lever 2).

**Deliberately skipped:** off-page signals (lever 6) are not a repo concern;
per-crawler analytics deferred until there's traffic to measure.

## Consequences

- New build artifacts: `/articles/sitemap-index.xml`, `/articles/rss.xml`,
  `/articles/llms.txt`, `/robots.txt`. All base-path aware.
- `llms.txt` and RSS list only non-draft articles and must stay correct as the
  content set grows — they regenerate on every build, so no manual upkeep.
- GEO is a signal, not a guarantee; treat these as low-cost hygiene, not a
  campaign. Revisit measurement once the site has real AI-referral traffic.
