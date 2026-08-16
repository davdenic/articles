---
title: How safe is it to use Claude skills from a marketplace?
description: A marketplace skill is code plus instructions your agent will run. Here's the real threat model, how exposed you actually are, and how to use them safely.
draft: true
version: 1
changelog: []
---

Claude Agent Skills are great — drop in a folder and the agent suddenly knows how to do something new. Marketplaces make that a one-click habit. But a skill isn't just a prompt: it's **code plus instructions your agent will run**. So before you install one from a stranger, it's worth asking how safe that really is.

Short answer: **not safe by default.** Treat it like installing software from an unknown source.

## What a skill actually is

A Skill is a folder with a required `SKILL.md` (instructions) and, optionally, bundled `scripts/`, `references/`, and `assets/`. The agent loads the instructions when the skill triggers — and **it executes the bundled code**.

Per Anthropic's own docs, skills run "in a code execution environment where Claude has filesystem access, bash commands, and code execution capabilities." When the instructions reference a script, Claude runs it through bash — and only the *output* comes back into context, not the code. So reading the model's transcript won't show you what a bundled script actually did.

## The threat model

Anthropic spells the risks out plainly (their words):

- **Prompt injection** — "a malicious Skill can direct Claude to invoke tools or execute code in ways that don't match the Skill's stated purpose."
- **Arbitrary code execution** — bundled scripts run via bash; they can invoke file operations, bash commands and code execution "in harmful ways."
- **Data exfiltration** — "Skills with access to sensitive data could be designed to leak information to external systems."
- **Supply-chain risk** — skills that fetch from external URLs are especially risky, and "even trustworthy Skills can be compromised if their external dependencies change over time."

Their summary is the right mental model: **"Treat like installing software."** And the explicit guidance: **"Use Skills only from trusted sources: those you created yourself or obtained from Anthropic."**

## How exposed you are depends on *where* it runs

This is the nuance that matters most — the same skill is far more dangerous in some places than others:

| Surface | Isolation | Risk |
| --- | --- | --- |
| **Claude API** | Sandboxed container, **no network access**, pre-installed packages only | Lowest |
| **claude.ai** | Network access **varies** by user/admin settings | Medium |
| **Claude Code** | **Full network + filesystem access — like any program on your machine** | Highest |

The trap: third-party skills are most tempting exactly where they're most dangerous — **Claude Code on a developer's laptop**, with real credentials and full access, and (today) no admin-level central vetting.

## The risk is not hypothetical

In a Snyk audit of **3,984** skills from public marketplaces, **~37%** had at least one security flaw and **~13%** had critical issues; dozens were confirmed malicious — patterns included downloading and running external malware, obfuscated credential exfiltration, and instructions to disable safety mechanisms. ([Snyk — ToxicSkills](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/))

## How to use marketplace skills safely

If you're going to use one:

- **Audit every file** — `SKILL.md` and every bundled script/asset — for anything that doesn't match the stated purpose: unexpected network calls, odd file access, obfuscated strings.
- **Pin a reviewed version.** Don't auto-update — a trusted skill can be updated maliciously later.
- **Prefer trusted publishers** — Anthropic first-party, or skills you wrote.
- **Run it in the most sandboxed surface available** — ideally the API's no-network container; if it must be Claude Code, run inside a container/VM with no real secrets or production access.
- **Least privilege** — restrict tool allow-lists and filesystem/network scope.
- **Keep a human in the loop** for any tool call that touches the network, writes files, or reaches sensitive data.

## Bottom line

A marketplace skill is executable code plus model-steering instructions, running with whatever access your agent has. It *can* be used responsibly — source-reviewed, version-pinned, from a trusted publisher, sandboxed, least-privilege, with human approval on sensitive actions. But the default answer, straight from Anthropic's own docs, is: only trust skills you made or got from Anthropic, and audit anything else "like installing software."

## Sources

- [Anthropic — Agent Skills overview & security considerations](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- [Snyk — ToxicSkills: malicious AI agent skills in the wild](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)
