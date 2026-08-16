---
id: ART-12
title: 'Research: safety of using Claude skills from an external marketplace'
status: To Do
assignee: []
created_date: '2026-08-16 11:03'
labels:
  - research
dependencies: []
ordinal: 11000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Research whether — and how — it's safe to install/use Claude (agent) skills from a third-party/external marketplace, rather than only first-party or self-authored ones.

**Why:** The team relies on `claude-skills`. Pulling skills from an external marketplace adds supply-chain risk — a skill is instructions (and possibly scripts/tools) the agent will follow, so a malicious or careless one could exfiltrate data, run unwanted commands, or prompt-inject. Need a clear safety stance before adopting any.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Document the risk model: what a skill can read/execute; prompt-injection, data exfiltration, unwanted tool/command use
- [ ] #2 Vetting + mitigation guidance: source review, version pinning, least-privilege/permissions, sandboxing, trusted publishers
- [ ] #3 Clear recommendation (safe? under what conditions?) backed by sources
- [ ] #4 Capture the outcome as a Backlog decision or doc
<!-- AC:END -->
