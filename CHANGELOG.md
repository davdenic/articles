# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

The project version lives in `package.json` (`version`); each release below matches it.

## [Unreleased]

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
