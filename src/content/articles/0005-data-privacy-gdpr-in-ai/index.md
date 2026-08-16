---
title: Data privacy and GDPR when you code with AI
description: It's the content, not the tool, that triggers GDPR. What a dev team needs to know before pasting code, logs, or client data into an AI assistant.
draft: true
version: 1
changelog: []
---

Using an AI assistant while you build is normal now. But the moment you paste code, a log, a ticket, or a client's content into a prompt, you might be processing **personal data** — and GDPR has opinions about that. This is a practical orientation for developers and agencies, not legal advice. (I'm in Switzerland, where the revFADP is broadly analogous to GDPR but a *separate* regime — check your own.)

## It's the content, not the tool

GDPR applies whenever personal data — any information about an identifiable person — is processed. Pasting content into a prompt is processing.

Code itself usually isn't personal data. But dev artefacts quietly carry it all the time:

- commit authors and emails in git history;
- names, emails and IPs in logs and stack traces;
- support tickets, screenshots, meeting notes;
- database dumps, fixtures, CMS exports with customer content.

So the question isn't "can I use AI?" — it's "what's *in* what I'm sending?"

## Who's who: controller, processor, DPA

- **You** (the team or agency) decide why and how data gets fed to the AI — you're the **controller**.
- The **provider** is usually a **processor**, acting on your instructions under a contract — *if* you're on a tier that works that way.
- GDPR **Article 28 requires a Data Processing Agreement (DPA)** between controller and processor. No DPA, no lawful processing of personal data through that provider.
- Providers run on cloud infra (AWS/GCP/Azure) as **sub-processors** — the DPA has to cover that. And if you're processing data *for your own clients*, your client contracts must allow onward use of an AI sub-processor.

## The distinction that matters most: consumer vs API/enterprise

This is the single most practical takeaway:

- **Consumer chat apps** often use your inputs to improve their models by default (you opt out).
- **API and business/enterprise tiers** generally **do not train on your data by default** and offer a DPA and retention controls.

On current official terms (verify on publish day — these change often):

- **Anthropic:** "By default, we will not use your inputs or outputs from our commercial products to train our models." Zero-Data-Retention agreements are available to eligible enterprise customers. ([Anthropic — model training](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training), [ZDR](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to))
- **OpenAI:** data sent to the API "is not used to train or improve OpenAI models" unless you opt in; abuse-monitoring retention is limited (up to ~30 days) then deleted; ZDR is available to approved customers. ([OpenAI — data controls](https://developers.openai.com/api/docs/guides/your-data))

The lesson: **use the API/enterprise tier with training off and retention minimised — not the consumer chatbot — for anything work-related.**

## The GDPR duties that apply

- **Lawful basis** (Art. 6) before any personal data goes in — usually legitimate interest or contract; special-category data (Art. 9) needs more.
- **Data minimisation** — send only what's necessary.
- **Purpose limitation** — data collected for the project can't be quietly repurposed to "test an AI tool."
- **Transparency** (Arts. 12–14) — people should know AI processing happens; privacy notices may need updating.
- **DPIA** (Art. 35) — a data-protection impact assessment for high-risk processing; AI + large-scale or sensitive data often triggers it. (The EU AI Act adds its own high-risk duties — related, but a separate law.)
- **International transfers** (Ch. V) — US providers are only "adequate" under the **EU–US Data Privacy Framework**; otherwise you need **Standard Contractual Clauses + a transfer impact assessment**. The framework is under legal challenge, so treat its durability as a risk.

## What a dev team should actually do

- **Never paste raw client PII, secrets, credentials, tokens, or full production data/logs** into a prompt. Use placeholders (`<API_KEY>`) and synthetic fixtures.
- **Redact / pseudonymise** first — strip names, emails, IPs, keys.
- **Use approved API/enterprise tiers** with **training off and retention minimised (ZDR where offered)** — not consumer apps.
- **Get a DPA in place** with each AI provider before any personal data flows; track sub-processors.
- **Update client contracts** and get authorisation to use an AI sub-processor when you act as your client's processor.
- **Prefer EU/approved regions**; rely on DPF certification or SCCs + TIA for transfers.
- **Run a DPIA** for high-risk uses and keep it on file.
- **Keep an audit trail** — approved-tools list, which data classes are allowed, who approved, and where AI sits in the workflow.
- **Governance** — a short internal AI-usage policy, developer training, and a human reviewing AI output before it touches client systems.

## Bottom line

AI in the workflow doesn't change what GDPR asks — it just adds a fast, easy way to send personal data somewhere new without noticing. Keep personal data and secrets out of prompts, use tiers that don't train on your data and hold a DPA, and write down your rules. The tool is fine; the discipline is the point.

*Informational only — not legal advice. Provider terms change frequently; verify against the official pages before relying on them. Swiss projects fall under the revFADP, a separate regime from GDPR.*

## Sources

- [Anthropic — Is my data used for model training?](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training)
- [Anthropic — Zero Data Retention: which products?](https://privacy.claude.com/en/articles/8956058-i-have-a-zero-data-retention-agreement-with-anthropic-what-products-does-it-apply-to)
- [OpenAI — Data controls in the API](https://developers.openai.com/api/docs/guides/your-data)
- [CNIL — Legal qualification of AI system providers](https://www.cnil.fr/en/determining-legal-qualification-ai-system-providers)
- [Irish DPC — AI, LLMs and Data Protection](https://www.dataprotection.ie/en/dpc-guidance/blogs/AI-LLMs-and-Data-Protection)
- [EDPS — Generative AI orientations (Oct 2025, PDF)](https://www.edps.europa.eu/system/files/2025-10/25-10_28_revised_genai_orientations_en.pdf)
