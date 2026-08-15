# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

The project version lives in `package.json` (`version`); each release below matches it.

## [Unreleased]

### Added

- QA pipeline (`.github/workflows/qa.yml`) on pull requests to `main`: build/schema gate, markdown lint, spell check, image/asset check, and internal link check (external links reported only).
- `markdownlint-cli2` + `cspell` dev dependencies with configs; `scripts/check-images.mjs`; `npm run qa` to run all checks locally.
- Committed `package-lock.json` for reproducible CI installs.

### Changed

- Sample article `0001-hello-world`: image example shown as inline code instead of a live embed (no missing asset).

### Fixed

- Navigation links now derive from `import.meta.env.BASE_URL` instead of a hardcoded `/articles` prefix, so the article back-link and index links stay correct under the site `base` (previously the back-link pointed at the domain root).

## [0.1.0] - 2026-08-15

### Added

- Astro content collection for articles (`draft`/live status, versioned frontmatter, changelog).
- One folder per article with co-located images; public URLs strip the leading number.
- Serif reading style: mobile-first single column, narrow text column on desktop, wider images.
- GitHub Pages deploy workflow (project site, base `/articles`).
- Sample article `0001-hello-world`.
- `README.md` and `CLAUDE.md` with Obsidian setup instructions.
