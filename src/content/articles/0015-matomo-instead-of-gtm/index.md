---
title: Digital sovereignty, concretely: Matomo instead of GTM
description: Digital sovereignty is easy to talk about and harder to act on. One concrete move: swap Google Tag Manager for self-hosted Matomo. On TYPO3 with DDEV it's straightforward.
draft: true
version: 1
changelog: []
---

Digital sovereignty keeps coming up here in Switzerland — and it's one of those topics worth acting on concretely instead of just nodding at. The easiest, most concrete first step I know: **your analytics.**

## The swap

Most sites reach for Google Tag Manager / Google Analytics by reflex. That means shipping your visitors' data to a US provider and taking on the whole transfer-and-consent burden that comes with it.

**Matomo** is the self-hosted alternative: open-source analytics you run yourself, so the data stays on your infrastructure. You get the numbers you actually need without handing them to a third party — and, configured for it, you can run privacy-friendly (cookieless / no personal data) analytics that lightens the consent problem too.

## On TYPO3 it's straightforward

- Setting Matomo up on a TYPO3 site is simple — and it **runs smoothly with DDEV** for local development, so you can wire and test it before it ever hits production.
- You keep ownership of the data, the retention rules, and where it lives.

## Why it's the right first move

Sovereignty as a slogan is cheap; sovereignty as a decision is a series of small, concrete swaps. Analytics is the ideal starting point: high data-sensitivity, low switching cost, and a mature open-source option that does the job. Start there, and the principle becomes a habit instead of a talking point.

Not the first time, won't be the last.

## Sources

- [Matomo — open-source analytics](https://matomo.org/)

*Reflects my own setup on TYPO3 + DDEV; check current Matomo and TYPO3 integration docs for specifics.*
