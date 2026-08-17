---
title: Adopting Odoo — business logic in modules, integrations over FastAPI
description: "What we learned moving from a monolithic PHP app to Odoo: put the business logic in custom modules, and let FastAPI handle the integrations Odoo shouldn't."
draft: true
image: "hero.png"
version: 1
changelog: []
modified: 2026-08-16T19:20:37+02:00
---

![We moved to Odoo — hand-drawn hero](./hero.png)

At some point a homegrown app stops being the thing you sell and becomes the thing you maintain. We had a monolithic PHP application carrying years of business processes, and every new requirement meant re-inventing something an ERP already does well. Moving to **Odoo** was less about the framework and more about a decision: stop rebuilding invoicing, contacts, workflows and access control by hand, and put our energy into what's actually specific to us.

None of this was a sudden switch. It started about two years earlier, at my kitchen table, sketching the idea on paper for my boss — the drawing that slowly turned into a plan, and then into a team effort. So the "we" here is real: this was never a one-person job, even if the first version of it fit on a napkin.

Here's how we think about it after doing it — with the honest caveat that we're one migration in: enough to have opinions, not enough to be smug about them.

![Odoo owns the domain and business rules (the source of truth); FastAPI handles the edges and integrations to external systems.](./odoo-fastapi.svg)

## Why Odoo, not another rewrite

Odoo isn't just an ERP you install — it's an application framework with a strong ORM, a data model, views, workflows and access rights already in place. That matters: the boring 80% (who can do what, how records relate, audit, the admin UI) comes for free, so a rewrite becomes an *incremental migration* instead of a big-bang.

The trap is treating it like a product to configure. Treat it as a **platform to build on**. We started out clicking through settings screens expecting to be "done" — that phase lasted about a week before it was obvious we were building software, not filling in a form.

One thing we're still turning over: where's the line between what you accept as Odoo's opinion and what you bend to fit your business? Configure too much and you're fighting the platform; customise too much and every upgrade hurts. We don't have a clean rule for it yet.

## Put the business logic in custom modules

The single most important habit: **your domain logic lives in your own Odoo modules — never in patched core.**

- Model your entities as Odoo models; use computed fields, constraints and `onchange` for the rules.
- Encode real workflows (states, transitions, what triggers what) in the module, not in a pile of scripts around it.
- Lean on Odoo's access rights and record rules instead of reinventing permissions.
- Keep each concern a separate, installable module with clear dependencies — so it survives upgrades and can be reasoned about on its own.

When the business logic is *inside* Odoo, the ERP's tooling (views, reports, security, the ORM) works with your rules instead of against them. When it's bolted on outside, you fight the platform forever.

## Let FastAPI handle what Odoo shouldn't

Odoo is great at the business domain. It's not always the right place for a fast, custom HTTP surface, a public integration endpoint, or async work talking to external systems. That's where a small **FastAPI** service earns its place, alongside Odoo.

We did consider doing everything inside Odoo controllers and skipping the extra service entirely — one less thing to deploy. What changed our minds was the first high-throughput webhook: forcing it through the ERP's request stack felt like the wrong tool, and a thin FastAPI service was simpler to reason about. Whether that holds for a smaller integration, we're honestly not sure — for a couple of endpoints the extra service might be overkill.

A boundary that worked for us:

- **Odoo owns the domain** — the data and the business rules. It's the source of truth.
- **FastAPI owns the edges** — custom or high-throughput endpoints, webhooks, and bridges to external software that don't belong in the ERP.
- They talk over a clear API (Odoo's, or one you expose), and each side stays in its lane.

Two concrete pieces ended up outside Odoo entirely:

- **The customer area** — where clients log in and handle their own stuff — became its own front-end layer, consuming FastAPI instead of living inside the ERP. Keeping it separate let us shape the client experience without bending Odoo's back-office UI to do a job it wasn't built for.
- **Identity** — we pulled identity and access management out too, into **Keycloak** as a standalone service reached over an API with JWT auth, rather than leaning on Odoo's login for everything that touches the system.

Add those up and the real shift becomes clear. We didn't just swap PHP for Odoo; we went from a single **monolithic PHP app** to an **API-first** architecture — Odoo as the domain core, FastAPI at the edges, a separate customer front-end, and Keycloak for identity, all talking over APIs. That reframing, more than the ERP itself, is what actually changed how we build.

The point isn't "microservices everywhere." It's: don't cram every integration into Odoo, and don't leak business rules out into the FastAPI layer. Keep the domain in one place.

## Lessons and gotchas

- **Customisations as modules, not core edits** — the difference between a smooth upgrade and a dreaded one.
- **Respect the ORM** — fighting it with raw SQL is usually a smell; when you do need it, isolate it.
- **Draw the Odoo ↔ FastAPI line deliberately** — re-litigating it per feature is where integrations rot.
- **Migrate incrementally** — move one process at a time from the old app; keep both running until each slice is proven.

## Takeaway

Adopting Odoo paid off not because it's magic, but because it let us stop maintaining the generic parts and concentrate on our actual business logic — expressed as proper modules — while FastAPI took the integration edges. The framework does the boring 80%; you own the 20% that's really yours.

Would we do it again? Yes — but check back after our first major version upgrade, which is the moment the "modules, not core edits" discipline gets its real exam. That's the bit we're quietly nervous about.
