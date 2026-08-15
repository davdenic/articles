# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

The project version lives in `package.json` (`version`); each release below matches it.

## [Unreleased]

### Added

- QA pipeline (`.github/workflows/qa.yml`) on pull requests to `main`: build/schema gate, markdown lint, spell check, image/asset check, and internal link check (external links reported only).
- `markdownlint-cli2` + `cspell` dev dependencies with configs; `scripts/check-images.mjs`; `npm run qa` to run all checks locally.
- Committed `package-lock.json` for reproducible CI installs.
- Draft article `0002-foundations-of-ai-assisted-software-development` (ported from Medium): body, 7 co-located images with alt text, `draft: true`.
- `author` frontmatter field (defaults to `David Denicolo`), shown in the article meta line.

### Changed

- Sample article `0001-hello-world`: image example shown as inline code instead of a live embed (no missing asset).
- QA configs extended for article prose: disabled markdownlint MD036 (bold lead-in lines are intentional style); added `cspell` dictionary entries (proper nouns + British spellings).
- Article meta line now shows version, published date, and author (the `updated` date is no longer displayed).

### Fixed

- Article detail pages were unreachable: the route lived at `src/pages/articles/[...slug].astro`, which combined with the site `base` (`/articles`) produced a doubled `/articles/articles/<slug>` URL, so every home-page link 404'd. Moved the route to `src/pages/[...slug].astro` so the public URL is `/articles/<slug>`.
- Navigation links now derive from `import.meta.env.BASE_URL` instead of a hardcoded `/articles` prefix, so the article back-link and index links stay correct under the site `base` (previously the back-link pointed at the domain root).

## [0.1.0] - 2026-08-15

### Added

- Astro content collection for articles (`draft`/live status, versioned frontmatter, changelog).
- One folder per article with co-located images; public URLs strip the leading number.
- Serif reading style: mobile-first single column, narrow text column on desktop, wider images.
- GitHub Pages deploy workflow (project site, base `/articles`).
- Sample article `0001-hello-world`.
- `README.md` and `CLAUDE.md` with Obsidian setup instructions.
