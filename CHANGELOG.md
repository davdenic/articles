# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

The project version lives in `package.json` (`version`); each release below matches it.

## [Unreleased]

## [1.1.0] - 2026-08-16

### Added

- Variable-size mosaic tiles (ART-30): optional `size` frontmatter written as `WxH` grid spans in 0.5 steps — e.g. `2x1` (wide), `1x2` (tall), `2x2` (big), `1.5x1.5`; default `1x1`. The home grid moved from CSS multicolumn to a 2×-resolution CSS grid (`grid-auto-flow: dense`) so halves land on real tracks and over-wide spans clamp on narrow screens; card images now crop to fill (`object-fit: cover`). Starter sizes assigned to a few drafts.

## [1.0.0] - 2026-08-16

First stable release. The site is feature-complete: masonry home page, per-article SEO (OG/canonical/JSON-LD), GEO surfaces (sitemap, robots.txt, RSS, llms.txt), self-hosted typography with light/dark themes, an about-the-author footer, and a content QA pipeline in CI.

### Added

- Writing-style spec: `backlog` doc-2 "Article writing style" plus operative bullets in `CLAUDE.md` — curious/questioning voice (ask real questions, show doubt, open to changing opinion) and 1–2 light humorous asides per article to break the rhythm. Applies to new/edited articles only; published `0001` and `0002` are not retrofitted.

## [0.11.0] - 2026-08-16

### Changed

- Home page is now a **masonry mosaic of article cards** (ART-6): each card shows the article's image (frontmatter `image` → first body image, same resolver as the share image) at its native aspect ratio, with title and date; whole card links to the article. Articles without an image get an accent-tinted title block. CSS-columns layout (1/2/3 columns responsive), no JS. Replaces the plain link list.

## [0.10.0] - 2026-08-16

### Added

- GEO / AI-visibility (ART-16): `@astrojs/sitemap` integration, `public/robots.txt` allowing named AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-User, Google-Extended, …) + sitemap reference, an RSS feed (`/rss.xml`), and an `llms.txt` index of live articles. Decision recorded in `backlog/decisions/decision-3`.

## [0.9.0] - 2026-08-16

### Added

- Draft articles (all `draft: true`): 0009 Adopting Odoo · 0010 Cloud vs self-hosted AI · 0011 Saying less in the age of AI · 0012 Automated testing for TYPO3 content elements · 0013 AI chatbot edge cases · 0014 EU AI Act · 0015 Matomo vs GTM · 0016 Testing local LLMs · 0017 TYPO3 ERD extension · 0018 Observability + E2E — most with hand-drawn SVG diagrams.
- Backlog research/writing tasks ART-21..28 (LinkedIn-seed articles + observability).

### Changed

- 0002 polish (ART-9): restored the two house tables, unnumbered the non-pillar sections, 'three pillars', title 'AI-assisted', plain 'CI pipelines'/'Claude skills'.

## [0.8.0] - 2026-08-16

### Added

- Article **tables** styled (ART-15): subtle theme-aware row rules, a hand-drawn curved header underline, real column gaps, and horizontal scroll when wide.
- **Draft articles** (all `draft: true`, for review): 0003 Scrum in web agencies, 0004 Claude skills marketplace safety, 0005 GDPR when coding with AI, 0006 what happens to our digital life when we die, 0007 what's new in TYPO3 v14, 0008 atomic design.
- **Hand-drawn SVG diagrams** for the articles that had none (skill-surface risk ladder, consumer-vs-API card, Europe patchwork, component co-location, atomic-design levels) plus the Scrum context-switching and ideal-sprint calendars.
- Backlog: research/writing tasks ART-9, ART-11..20 tracked (some drafted, some queued).

## [0.7.0] - 2026-08-16

### Added

- Automatic SEO on every page (ART-5): meta description with a derived fallback, Open Graph + Twitter Card tags, canonical URL, and schema.org JSON-LD (Article with author + date; WebSite for the index). The social image defaults to the article's **first image** (optional `image` frontmatter override; site default otherwise). New `npm run qa:seo` warns when an article lacks a description or image.

## [0.6.0] - 2026-08-16

### Added

- Site favicon (Purple Tentacle) — 32×32, 512×512, and apple-touch-icon, wired in the layout head (ART-10).

## [0.5.0] - 2026-08-16

### Changed

- Published article `0002` (foundations of AI-assisted software development).
- Reworked `0001-hello-world` into a **published personal intro page** — bio, portrait, a photo, and links (supersedes the sanity-check stub); first-person intro (ART-4).
- Editorial pass on `0002`: reconstructed the garbled blocks as lists, removed leaked internal notes, introduced the **harness** framing + jargon glosses, clarified the objective-function analogy, rewrote and renamed "The model" → **"The house, part by part"** (avoids the AI sense of "model"), expanded the Specs pillar with the tacit/word-of-mouth knowledge gap, restored the variance point, and moved the closing punch above the references.

### Removed

- The per-article **Changelog** section is no longer displayed on article pages (ART-8); the `changelog` frontmatter field is still tracked.

## [0.4.0] - 2026-08-16

### Added

- "About the author" footer on every article (ART-3): a single reusable `AuthorFooter` component (edit once, appears everywhere) with a rounded portrait, short bio, and a LinkedIn link, set off by a hand-drawn curved divider.

### Changed

- Author name renders with its accent — **David Denicolò**.
- Removed the "← all articles" back-link from article pages.

## [0.3.0] - 2026-08-16

### Added

- Typography overhaul (ART-7): self-hosted **Newsreader** serif for both headings (light) and body (OFL, roman + italic, no CDN call); a golden-ratio-anchored **fluid `clamp()` type scale on an accelerating curve** (bigger jumps toward h1, larger reading text, widened reading column); the article title breaks out **wider than the body column, centered**, with a thin hand-drawn **curved underline** (theme-colored via CSS mask); a hand-drawn **line section separator** replacing the `hr` rule; **blockquotes restyled as hand-drawn info-boxes** (four curved lines, bigger centered text, extra spacing after); and roomier list-item spacing. All theme-aware (light/dark).

## [0.2.0] - 2026-08-16

### Added

- Dark/light theme toggle (top-right icon): defaults to the OS `prefers-color-scheme`, lets the reader override, and persists the choice in `localStorage` with no flash of the wrong theme on load.
- QA pipeline (`.github/workflows/qa.yml`) on pull requests to `main`: build/schema gate, markdown lint, spell check, image/asset check, and internal link check (external links reported only).
- `markdownlint-cli2` + `cspell` dev dependencies with configs; `scripts/check-images.mjs`; `npm run qa` to run all checks locally.
- Committed `package-lock.json` for reproducible CI installs.
- Draft article `0002-foundations-of-ai-assisted-software-development` (ported from Medium): body, 7 co-located images with alt text, `draft: true`.
- `author` frontmatter field (defaults to `David Denicolo`), shown in the article meta line.
- Backlog.md for task/docs/decision tracking (CLI-driven; `auto_commit` disabled so changes go through PRs; tasks follow a What/Why/AC structure).

### Changed

- Sample article `0001-hello-world`: image example shown as inline code instead of a live embed (no missing asset).
- QA configs extended for article prose: disabled markdownlint MD036 (bold lead-in lines are intentional style); added `cspell` dictionary entries (proper nouns + British spellings).
- Article meta line reads "Written by {author} on {date}" (article version and the `updated` date are not displayed; both remain in frontmatter).
- CI actions bumped to their first Node24-based majors (`checkout@v5`, `setup-node@v5`, `withastro/action@v6`, `deploy-pages@v5`); QA runtime on Node 22 LTS.

### Fixed

- Article detail pages were unreachable: the route lived at `src/pages/articles/[...slug].astro`, which combined with the site `base` (`/articles`) produced a doubled `/articles/articles/<slug>` URL, so every home-page link 404'd. Moved the route to `src/pages/[...slug].astro` so the public URL is `/articles/<slug>`.
- Navigation links now derive from `import.meta.env.BASE_URL` instead of a hardcoded `/articles` prefix, so the article back-link and index links stay correct under the site `base` (previously the back-link pointed at the domain root).
- QA link check (lychee) now stages the build under an `articles/` dir so base-prefixed links (`/articles/<slug>/`) resolve on disk.

## [0.1.0] - 2026-08-15

### Added

- Astro content collection for articles (`draft`/live status, versioned frontmatter, changelog).
- One folder per article with co-located images; public URLs strip the leading number.
- Serif reading style: mobile-first single column, narrow text column on desktop, wider images.
- GitHub Pages deploy workflow (project site, base `/articles`).
- Sample article `0001-hello-world`.
- `README.md` and `CLAUDE.md` with Obsidian setup instructions.
