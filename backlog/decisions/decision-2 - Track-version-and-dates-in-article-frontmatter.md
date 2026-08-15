---
id: decision-2
title: Track version and dates in article frontmatter
date: '2026-08-15 19:45'
status: Accepted
---
## Context

Articles here are living documents: they get published, then revised over time, and the same content is cross-posted to LinkedIn / Medium with a canonical link back. Readers (and David) need to know how current a piece is and what changed since it first went out. There is no separate CMS or database — the Markdown file is the single source of truth.

## Decision

Each article carries its version and dates in the frontmatter, validated by the schema in `src/content.config.ts`:

- `version` (number) — bumped on every meaningful edit.
- `published` (date) — first publication date, set once.
- `updated` (date) — date of the latest edit.
- `changelog` (string[], newest first) — one line per change, e.g. `"2026-08-15: first publish"`.

On any edit to a published article: bump `version`, set `updated`, and prepend a `changelog` line. This mirrors the project-level versioning (`package.json` + root `CHANGELOG.md`) but at the per-article level.

## Consequences

- **Transparency**: each article shows its version and last-updated date, so readers can judge freshness.
- **Traceability**: the per-article changelog records what changed and when, without relying on Git history.
- **Schema-enforced**: the build fails if the frontmatter is malformed, keeping metadata consistent.
- **Author discipline required**: edits must update three fields; easy to forget. The workflow note in CLAUDE.md and code review are the guardrails.
- **Not automated**: version/date bumps are manual. If this becomes error-prone, a pre-commit hook or a QA check could enforce it later.

