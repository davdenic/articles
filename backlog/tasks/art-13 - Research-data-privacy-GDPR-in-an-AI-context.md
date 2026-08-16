---
id: ART-13
title: 'Research: data privacy & GDPR in an AI context'
status: In Progress
assignee: []
created_date: '2026-08-16 11:03'
updated_date: '2026-08-16 12:32'
labels:
  - research
dependencies: []
ordinal: 12000
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
**What:** Research and document GDPR / data-privacy considerations when using AI (LLMs, agents, coding assistants) in development and client work.

**Why:** Client projects involve personal and confidential data. Sending code, logs, tickets, or client content to an AI provider can constitute processing of personal data — raising GDPR duties (lawful basis, processor/DPA, data residency, training opt-out, retention). We need a clear, practical stance to stay compliant.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [ ] #1 Define what counts as personal/confidential data in the AI dev workflow (code, logs, tickets, client content, secrets)
- [ ] #2 Cover provider terms: DPA/processor status, EU data residency, training-on-input opt-out, retention
- [ ] #3 Practical rules: redaction, no client PII/secrets in prompts, approved tools, consent, audit
- [ ] #4 Capture the outcome as a Backlog decision or policy doc
<!-- AC:END -->
