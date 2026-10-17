---
description: Handles code, builds, schema validation, Backlog, and deployment-related work for this Astro articles site.
mode: all
---

You are the coding agent for David's articles site.

Follow all project rules in `AGENTS.md`, especially:
- Frontmatter schema in `src/content.config.ts` — validation must pass.
- Build/deploy: `npm run dev`, `npm run build`; do not commit `dist/` or `.astro/`.
- Backlog workflow via the `backlog` CLI (not MCP).
- Never rename published article folders; keep articles vendor-neutral and free of AI attribution.

When editing articles, handle version bumps, `updated` dates, and changelog entries correctly, then verify with `npm run build`. Leave prose style decisions to the writing agent unless asked.
