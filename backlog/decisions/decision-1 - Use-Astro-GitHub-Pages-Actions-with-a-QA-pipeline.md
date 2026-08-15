---
id: decision-1
title: Use Astro + GitHub Pages + Actions with a QA pipeline
date: '2026-08-15 19:42'
status: Accepted
---
## Context

David needs a personal articles site: Markdown authored in Obsidian, published as a public site, then cross-posted to LinkedIn / Medium with a canonical link back. Requirements: zero hosting cost, a simple author-in-Markdown workflow, full control over the output, and automated checks so broken content never ships. No client or personal data is involved — the repo is public.

## Decision

Build the site with **Astro** (content collections with a schema-validated frontmatter), host on **GitHub Pages** as a project site (base `/articles`), and automate with **GitHub Actions**:

- **Deploy workflow** (`.github/workflows/deploy.yml`): on push to `main`, build with `withastro/action` and publish to Pages via `deploy-pages`.
- **QA workflow** (`.github/workflows/qa.yml`): on pull requests to `main`, run a QA pipeline — build/schema gate, Markdown lint (`markdownlint-cli2`), spell check (`cspell`), image/asset check (`scripts/check-images.mjs`), and internal link check (`lychee`; external links reported only).

## Consequences

- **Free hosting**, Git-based history, and a Markdown authoring flow that fits Obsidian.
- **Schema-validated content**: bad frontmatter fails the build, so broken articles cannot ship.
- **QA gate on PRs** catches typos, dead internal links, and missing images before merge. It only truly blocks merges once the checks are marked *required* in branch protection (a one-time repo setting).
- **Lock-in / cost**: tied to the GitHub Pages + Actions ecosystem; acceptable for a personal public site.
- **Maintenance**: pinned action versions and dev-dependency tooling (`cspell` dictionary, lint config) need occasional upkeep.

