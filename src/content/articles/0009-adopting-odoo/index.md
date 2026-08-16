---
title: Adopting Odoo — business logic in modules, integrations over FastAPI
description: "What I learned moving from a monolithic PHP app to Odoo: put the business logic in custom modules, and let FastAPI handle the integrations Odoo shouldn't."
draft: true
version: 1
changelog: []
modified: 2026-08-16T19:20:37+02:00
---

At some point a homegrown app stops being the thing you sell and becomes the thing you maintain. We had a monolithic PHP application carrying years of business processes, and every new requirement meant re-inventing something an ERP already does well. Moving to **Odoo** was less about the framework and more about a decision: stop rebuilding invoicing, contacts, workflows and access control by hand, and put our energy into what's actually specific to us.

Here's how I think about it after doing it.

![Odoo owns the domain and business rules (the source of truth); FastAPI handles the edges and integrations to external systems.](./odoo-fastapi.svg)

## Why Odoo, not another rewrite

Odoo isn't just an ERP you install — it's an application framework with a strong ORM, a data model, views, workflows and access rights already in place. That matters: the boring 80% (who can do what, how records relate, audit, the admin UI) comes for free, so a rewrite becomes an *incremental migration* instead of a big-bang.

The trap is treating it like a product to configure. Treat it as a **platform to build on**.

## Put the business logic in custom modules

The single most important habit: **your domain logic lives in your own Odoo modules — never in patched core.**

- Model your entities as Odoo models; use computed fields, constraints and `onchange` for the rules.
- Encode real workflows (states, transitions, what triggers what) in the module, not in a pile of scripts around it.
- Lean on Odoo's access rights and record rules instead of reinventing permissions.
- Keep each concern a separate, installable module with clear dependencies — so it survives upgrades and can be reasoned about on its own.

When the business logic is *inside* Odoo, the ERP's tooling (views, reports, security, the ORM) works with your rules instead of against them. When it's bolted on outside, you fight the platform forever.

## Let FastAPI handle what Odoo shouldn't

Odoo is great at the business domain. It's not always the right place for a fast, custom HTTP surface, a public integration endpoint, or async work talking to external systems. That's where a small **FastAPI** service earns its place, alongside Odoo.

A boundary that worked for me:

- **Odoo owns the domain** — the data and the business rules. It's the source of truth.
- **FastAPI owns the edges** — custom or high-throughput endpoints, webhooks, and bridges to external software that don't belong in the ERP.
- They talk over a clear API (Odoo's, or one you expose), and each side stays in its lane.

The point isn't "microservices everywhere." It's: don't cram every integration into Odoo, and don't leak business rules out into the FastAPI layer. Keep the domain in one place.

## Lessons and gotchas

- **Customisations as modules, not core edits** — the difference between a smooth upgrade and a dreaded one.
- **Respect the ORM** — fighting it with raw SQL is usually a smell; when you do need it, isolate it.
- **Draw the Odoo ↔ FastAPI line deliberately** — re-litigating it per feature is where integrations rot.
- **Migrate incrementally** — move one process at a time from the old app; keep both running until each slice is proven.

## Takeaway

Adopting Odoo paid off not because it's magic, but because it let us stop maintaining the generic parts and concentrate on our actual business logic — expressed as proper modules — while FastAPI took the integration edges. The framework does the boring 80%; you own the 20% that's really yours.
