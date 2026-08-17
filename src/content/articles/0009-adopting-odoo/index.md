---
title: "Adopting Odoo — business logic in modules, integrations at the edge (FastAPI & friends)"
description: "What we learned moving from a monolithic PHP app to Odoo: put the business logic in custom modules, and let FastAPI handle the integrations Odoo shouldn't."
draft: true
image: "hero.png"
version: 1
changelog: []
modified: 2026-08-16T19:20:37+02:00
---

![We moved to Odoo — hand-drawn hero](./hero.png)

At some point a homegrown app stops being the thing you sell and becomes the thing you maintain. We had a monolithic PHP application — built on **TYPO3**, a CMS with a solid, extensible development framework — carrying years of website-related logic, but with no CRM or ERP behind it. So invoicing, contacts, workflows and access control were handled by hand or scattered outside any real system, and every new requirement meant re-inventing something an ERP already does well. Moving to **Odoo** (a Python/PostgreSQL ERP/CRM) was less about the framework and more about a decision: stop doing that generic work by hand, and put our energy into what's actually specific to us.

By the end, the monolith had also become genuinely tangled. Modules depended on each other in ways nobody fully held in their head. A change in one corner could surface as a surprise in another, and updating anything or adding a feature meant tracing threads across half the codebase first.

Part of that was the domain itself. Our business logic is a web of entities — customer companies, their users, subscriptions, paid job postings (clients pay to list one), training ("formation") offers, the newsletter — and they're all naturally wired to each other. Post a job offer and it touches billing, the company, its users and their subscription at once. The monolith encoded those links rigidly, so pulling on one entity tugged half a dozen others: exactly the kind of coupling that makes a system tangled. It didn't help that the QA and pipeline never quite reached a good level — coverage had gaps, so regressions had room to slip through. There was a human cost, too: frontend and backend were knotted together, so the frontend developers and the marketing team were effectively blocked on the backend developers — who were always busy on something else. A copy change or a new landing page could end up waiting on a queue it never should have touched. That combination, more than any single missing feature, is what pushed us to rethink the whole shape.

The pain points, in one place:

| Pain point | What it actually meant |
| --- | --- |
| No CRM or ERP — just a website | The monolith only held the website-related business logic; invoicing, contacts, pipelines and the rest were done by hand or scattered outside any real system |
| Tangled, interdependent modules | Nobody fully held the dependencies in their head; one change rippled in surprising places |
| Slow, risky to change | Updating anything or adding a feature meant tracing threads across the codebase first |
| Weak QA & pipeline | Coverage gaps left room for regressions to slip through |
| Frontend and backend knotted together | Frontend devs and marketing were blocked on always-busy backend devs |
| One monolith, one deploy | No safe way to change a part without risking the whole |

None of this was a sudden switch. It started about two years earlier, sketching the idea on paper for my boss at the office kitchen table. (Yes, offices here in Switzerland tend to come with a proper kitchen.) That drawing slowly turned into a plan, and then into a team effort — so the "we" in this piece is real. It was never a one-person job, even if the first version of it fit on a napkin.

There was something uncomfortable underneath it, too. I'd spent most of my career inside that CMS — *was it a bold move to question the tool I knew best for the sake of a better product, or just an overdue one?* I still catch myself going back and forth.

Here's how we think about it after doing it — with the honest caveat that we're one migration in: enough to have opinions, not enough to be smug about them.

![The API-first architecture: a public website and a customer area talk to a FastAPI edge layer; Odoo is the domain core and source of truth; Keycloak handles identity over a dedicated API while the detailed access rights live in an Odoo module; Meilisearch indexes Odoo's data and powers the website's search.](./architecture.svg)

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

Those same interlinked entities — companies, users, subscriptions, job postings, offers — are now Odoo models, with the relationships declared explicitly instead of tangled implicitly. When the business logic is *inside* Odoo, the ERP's tooling (views, reports, security, the ORM) works with your rules instead of against them. When it's bolted on outside, you fight the platform forever.

## Let FastAPI handle what Odoo shouldn't

Odoo is great at the business domain. It's not always the right place for a fast, custom HTTP surface, a public integration endpoint, or async work talking to external systems. That's where a small **FastAPI** service earns its place, alongside Odoo.

We did consider doing everything inside Odoo controllers and skipping the extra service entirely — one less thing to deploy. What changed our minds was the first high-throughput webhook: forcing it through the ERP's request stack felt like the wrong tool, and a thin FastAPI service was simpler to reason about. Whether that holds for a smaller integration, we're honestly not sure — for a couple of endpoints the extra service might be overkill.

A boundary that worked for us:

- **Odoo owns the domain** — the data and the business rules. It's the source of truth.
- **FastAPI owns the edges** — custom or high-throughput endpoints, webhooks, and bridges to external software that don't belong in the ERP.
- They talk over a clear API (Odoo's, or one you expose), and each side stays in its lane.

A few concrete pieces ended up outside Odoo entirely:

- **The public website** — the frontend that used to be baked into the monolithic PHP CMS became its own thing, no longer tangled up with the business logic behind it. Splitting the site from the system it talks to was one of the clearer wins — and it finally let the frontend and marketing folks ship without queuing behind the backend team.
- **Search** — the website's search runs on **Meilisearch**, not on Odoo directly. Odoo stays the source of truth and pushes the searchable data out to Meilisearch; the public website then queries that fast index (Odoo → Meilisearch → website) instead of hammering the ERP for every keystroke.
- **The customer area** — where clients log in and handle their own stuff — became its own front-end layer, consuming FastAPI instead of living inside the ERP. Keeping it separate let us shape the client experience without bending Odoo's back-office UI to do a job it wasn't built for.
- **Identity** — we pulled identity and access management out too, into **Keycloak** as a standalone service reached over an API with JWT auth, rather than leaning on Odoo's login for everything that touches the system. But we deliberately split it: Keycloak answers *who you are*, while the **detailed access rights** — what each client's users are actually allowed to do — live in a dedicated Odoo module. That way clients can administer their own users' permissions right from the account area, and the fine-grained rules stay where the domain already lives. Keycloak and Odoo stay in sync over a dedicated API between the two. We could have gone the other way — Keycloak can hold groups and attributes, so the user access rights, and even the customer companies, could have lived there instead. For now, keeping those specific rights in Odoo felt like the better fit: it puts permissions right next to the business entities they apply to. *But was that a good idea, or will we wish identity owned all of it one day?* I'm genuinely not sure yet. Authentication on the outside, domain-specific authorization in Odoo — for now.

Add those up and the real shift becomes clear. We didn't just swap PHP for Odoo; we went from a single **monolithic PHP app** (CMS website and all) to an **API-first** architecture — Odoo as the domain core, FastAPI at the edges, a standalone public website, a separate customer front-end, Keycloak for identity, and Meilisearch for search — all talking over APIs. That reframing, more than the ERP itself, is what actually changed how we build.

Though I do keep asking myself: *have we just traded one kind of complexity — a tangled monolith — for another, with more moving parts to keep in sync?* Honestly, a little. But here's the bet:

> Boundaries you can see are easier to live with than couplings you can't.

I won't really know if it paid off until we've lived with it a while.

Laid side by side, the trade is pretty clear:

| | Old monolith | API-first core + edges |
| --- | --- | --- |
| Moving parts | Few — one app, one deploy (**KISS**) | Many — several services to run and keep in sync |
| Simplicity | Simple to run and reason about locally | Distributed; you need observability just to see across it |
| Coupling | Tight — one change ripples everywhere | Loose — clear boundaries between pieces |
| Team flow | Frontend & marketing blocked on backend | Teams can ship independently |
| Reuse | Rebuild the generic 80% by hand | Odoo gives the 80% for free |
| Right tool per job | One stack for everything | Best fit per edge (Meilisearch, Keycloak, FastAPI) |
| Changing it | Risky, big-bang | Incremental, one piece at a time |

The monolith genuinely wins the top rows — fewer parts, less to run, easier to hold in your head. **KISS** is a real argument, and I don't want to pretend we didn't give something up. We're betting we needed the boundaries more than we needed the simplicity. Ask me in a year whether that was true.

The point isn't "microservices everywhere." It's: don't cram every integration into Odoo, and don't leak business rules out into the FastAPI layer. Keep the domain in one place.

## So what do you even call this?

> "There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton

Honestly, I'm not sure it has one clean name. A few that fit, from most accurate to most hand-wavy:

- **Modular-monolith core + satellite services** — the most accurate, to me. Odoo is a *modular monolith* (one deployable, modules inside — a term [popularised by Simon Brown](https://simonbrown.je/modular-monolith/)); the website, customer area, FastAPI, Keycloak and Meilisearch are satellites around it.
- **The Citadel** — DHH's name for a "majestic monolith" kept at the centre and supported by a few *outposts*, each peeling off a slice of responsibility ([Signal v. Noise, 2020](https://signalvnoise.com/svn3/the-majestic-monolith-can-become-the-citadel/)). Almost exactly our shape, and a nice quotable label — though a purist would note a real Citadel has fewer, thinner outposts than ours.
- **Domain-centric / system-of-record** — Odoo owns the domain and the truth; everything else defers to it. "Domain-centric" echoes [Eric Evans' Domain-Driven Design](https://www.dddcommunity.org/book/evans_2003/); "system of record" is an older enterprise-IT term (the sense [Gartner still uses](https://www.gartner.com/en/documents/3745519) for the authoritative store). This is the property that matters most.
- **Headless + API-first** — captures the frontend split (the website and customer area are decoupled "heads", a framing from the [headless CMS/commerce](https://www.contentstack.com/blog/all-about-headless/content-management-systems-history-and-headless-cms) world of the mid-2010s) and the API glue — but it undersells the Odoo-as-core part.
- **Hub-and-spoke**, Odoo as the hub — fine informally, though the name is borrowed from logistics and only reached software through [enterprise integration patterns](https://www.enterpriseintegrationpatterns.com/ramblings/03_hubandspoke.html). A bit dated.

**What it's *not* is microservices** (the term [popularised by Fowler and Lewis in 2014](https://martinfowler.com/articles/microservices.html)). There's no domain carved into many independently-owned services — it's one core with edges. Two smaller patterns do show up inside it, though:

- **BFF (backend-for-frontend)** — FastAPI acting as the edge for the customer area. The term was [coined by Phil Calçado at SoundCloud and popularised by Sam Newman](https://samnewman.io/patterns/architectural/bff/).
- **CQRS-lite read model** — Odoo → Meilisearch is a read projection: search reads never touch the source of truth. "CQRS" was [coined by Greg Young](https://martinfowler.com/bliki/CQRS.html), building on Bertrand Meyer's command-query separation.

If I had to pick one, I'd call it a *modular-monolith core with API-first edges* — or, when I want to sound like I read blogs, an Odoo-centric Citadel. But naming architectures is half vibes, and I'd happily be told there's a better word for it.

## Lessons and gotchas

- **Customisations as modules, not core edits** — the difference between a smooth upgrade and a dreaded one.
- **Respect the ORM** — fighting it with raw SQL is usually a smell; when you do need it, isolate it.
- **Raise the testing bar on purpose** — the old monolith's QA and pipeline never really got there, and the gaps showed up as regressions. This time we set stricter test-coverage rules from the start — the same "QA is the foundation, not an afterthought" instinct I wrote about in [Foundations of AI-assisted software development](/articles/foundations-of-ai-assisted-software-development/). At least for Odoo and FastAPI, which are my area of competence; I can't honestly vouch for every layer, but where I could set the bar, I set it higher.
- **Add eyes on production** — tests catch what you thought to check; observability catches the rest. We put an observability layer in place with **Grafana** and **Loki**, so issues show up as signals we can watch rather than surprises a client reports back to us.
- **Draw the Odoo ↔ FastAPI line deliberately** — re-litigating it per feature is where integrations rot.
- **Migrate incrementally** — move one process at a time from the old app; keep both running until each slice is proven. For us this was the genuinely interesting part: instead of a big bang, we rolled out over **three major go-lives**, each deploying a different slice of the system at a different moment — with the standing constraint that everything not yet migrated had to keep working across every step. Slower than a single cutover, far less terrifying.
- **Expect the integration glue to change under you** — during the migration the integrations first ran through custom APIs we'd built into the old PHP monolith. As pieces moved over, we replaced those with **n8n** workflows talking to **Odoo's XML-RPC API**, which took a lot of bespoke glue code out of our hands. The transitional plumbing is temporary by nature; don't over-engineer it.

## Takeaway

Adopting Odoo paid off not because it's magic, but because it let us stop maintaining the generic parts and concentrate on our actual business logic — expressed as proper modules — while FastAPI took the integration edges. The framework does the boring 80%; you own the 20% that's really yours.

Would we do it again? Yes — but check back after our first major version upgrade, which is the moment the "modules, not core edits" discipline gets its real exam. That's the bit we're quietly nervous about.
