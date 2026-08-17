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

### At some point, software stops being the thing you develop and becomes the thing you maintain

Ours was a monolithic PHP application, built on **TYPO3** (a CMS with a solid, extensible framework). It held years of website logic. But there was no CRM or ERP behind it. So invoicing, contacts, workflows and access control were done by hand, or scattered across other tools. Every new requirement meant rebuilding something an ERP already does well.

Moving to **Odoo** (a Python/PostgreSQL ERP/CRM) wasn't really about the framework. It was a decision: stop doing the generic work by hand, and spend our energy on what's actually ours.

By the end, the monolith had also become tangled. Modules depended on each other in ways nobody fully tracked. A change in one corner would surface as a surprise in another. Updating anything, or adding a feature, meant tracing threads across half the codebase first.

Part of that was the domain itself. Our business logic is a web of entities: customer companies, their users, subscriptions, paid job postings (clients pay to list one), training ("formation") offers, the newsletter. They're all wired to each other. Post a job offer and it touches billing, the company, its users and their subscription at once. The monolith hard-coded those links. Pull on one entity and half a dozen others moved. That is what makes a system tangled.

The QA didn't help either. Coverage had gaps, so regressions slipped through.

There was a human cost too. Frontend and backend were knotted together. So the frontend developers and the marketing team waited on the backend developers, who were always busy on something else. A copy change or a new landing page could sit in a queue it never should have touched.

That mix, more than any missing feature, is what pushed us to rethink the whole shape.

The pain points, in one place:

| Pain point | What it actually meant |
| --- | --- |
| No CRM or ERP — just a website | The monolith only held the website-related business logic; invoicing, contacts, pipelines and the rest were done by hand or scattered outside any real system |
| Tangled, interdependent modules | Nobody fully held the dependencies in their head; one change rippled in surprising places |
| Slow, risky to change | Updating anything or adding a feature meant tracing threads across the codebase first |
| Weak QA & pipeline | Coverage gaps left room for regressions to slip through |
| Frontend and backend knotted together | Frontend devs and marketing were blocked on always-busy backend devs |
| One monolith, one deploy | No safe way to change a part without risking the whole |

None of this was sudden. It started about two years earlier, sketching the idea for my boss at the office kitchen table. (Yes, offices here in Switzerland tend to come with a proper kitchen.) The sketch turned into a plan, then into a team effort. So the "we" in this piece is real. It was never a one-person job, even if the first version fit on a napkin.

Something felt uncomfortable, too. I'd spent most of my career inside that CMS. *Was it bold to question the tool I knew best for a better product, or just overdue?* I still go back and forth.

So here's how we think about it now. One caveat first: we're one migration in. Enough to have opinions, not enough to be smug about them.

![The API-first architecture: a public website and a customer area talk to a FastAPI edge layer; Odoo is the domain core and source of truth; Keycloak handles identity over a dedicated API while the detailed access rights live in an Odoo module; Meilisearch indexes Odoo's data and powers the website's search.](./architecture.svg)

## Why Odoo, not another rewrite

Odoo isn't just an ERP you install. It's an application framework. It ships with a strong ORM, a data model, views, workflows and access rights. So the boring 80% comes for free: who can do what, how records relate, audit, the admin UI. A rewrite becomes an *incremental migration* instead of a big bang.

The trap is treating it like a product to configure. It's a **platform to build on**. We started out clicking through settings screens, expecting to be "done". That lasted about a week. Then it was obvious we were building software, not filling in a form.

One thing we're still turning over: where's the line between Odoo's opinion and your business? Configure too much and you fight the platform. Customise too much and every upgrade hurts. We don't have a clean rule yet.

## Put the business logic in custom modules

The single most important habit: **your domain logic lives in your own Odoo modules — never in patched core.**

- Model your entities as Odoo models; use computed fields, constraints and `onchange` for the rules.
- Encode real workflows (states, transitions, what triggers what) in the module, not in a pile of scripts around it.
- Lean on Odoo's access rights and record rules instead of reinventing permissions.
- Keep each concern a separate, installable module with clear dependencies — so it survives upgrades and can be reasoned about on its own.

Those same interlinked entities — companies, users, subscriptions, job postings, offers — are now Odoo models. The relationships are declared, not tangled. When the logic lives *inside* Odoo, the ERP's tooling works with your rules: views, reports, security, the ORM. Bolt it on outside and you fight the platform forever.

## Let FastAPI handle what Odoo shouldn't

Odoo is great at the business domain. It's not always the right place for a fast custom HTTP surface, a public integration endpoint, or async work talking to external systems. That's where a small **FastAPI** service earns its place, next to Odoo.

We did think about skipping it and doing everything in Odoo controllers. One less thing to deploy. The first high-throughput webhook changed our minds. Forcing it through the ERP's request stack felt wrong. A thin FastAPI service was simpler to reason about. Does that hold for a smaller integration? We're not sure. For a couple of endpoints, the extra service might be overkill.

A boundary that worked for us:

- **Odoo owns the domain** — the data and the business rules. It's the source of truth.
- **FastAPI owns the edges** — custom or high-throughput endpoints, webhooks, and bridges to external software that don't belong in the ERP.
- They talk over a clear API (Odoo's, or one you expose), and each side stays in its lane.

> Boundaries you can see are easier to live with than couplings you can't.

A few concrete pieces ended up outside Odoo entirely:

- **The public website** — the frontend used to be baked into the PHP CMS. Now it's its own thing, no longer tangled with the business logic. That was one of the clearer wins. It finally let the frontend and marketing folks ship without queuing behind the backend team.
- **Search** — the website's search runs on **Meilisearch**, not Odoo. Odoo stays the source of truth and pushes searchable data to Meilisearch. The website queries that fast index instead of hitting the ERP on every keystroke (Odoo → Meilisearch → website).
- **The customer area** — where clients log in and manage their own stuff — is its own front-end, consuming FastAPI instead of living inside the ERP. Keeping it separate let us shape the client experience, without bending Odoo's back-office UI into a job it wasn't built for.
- **Identity** — we pulled identity and access management out into **Keycloak**, reached over an API with JWT auth. No more leaning on Odoo's login for everything. But we split it on purpose. Keycloak answers *who you are*. The **detailed access rights** — what each client's users may actually do — live in a dedicated Odoo module. So clients manage their own users' permissions from the account area, and the fine-grained rules stay next to the domain. Keycloak and Odoo keep in sync over a dedicated API. We could have done it the other way. Keycloak can hold groups and attributes, so the access rights (and even the companies) could have lived there. For now, Odoo felt like the better home: permissions sit next to the entities they apply to. *Was that a good idea, or will we wish identity owned all of it one day?* Not sure yet. Authentication outside, domain authorization in Odoo — for now.

Add those up and the real shift is clear. We didn't just swap PHP for Odoo. We went from one **monolithic PHP app** (CMS website and all) to an **API-first** architecture. Odoo is the domain core. FastAPI sits at the edges. The public website, the customer front-end, Keycloak and Meilisearch are their own pieces. Everything talks over APIs. That reframing, more than the ERP itself, changed how we build.

I do keep asking myself one thing. *Have we just traded one kind of complexity, a tangled monolith, for another — more moving parts to keep in sync?* Honestly, a little. But I'll take boundaries I can see over couplings I can't. I won't know if it paid off until we've lived with it a while.

Laid side by side, the trade is pretty clear:

| | Old monolith | API-first core + edges |
| --- | --- | --- |
| Moving parts | Few, one deploy — simpler to run | Many services to run and keep in sync |
| Coupling | Tight — changes ripple, teams block | Loose — clear boundaries, teams ship on their own |

The monolith genuinely wins the first row — fewer parts, less to run, easier to hold in your head. We're betting we needed the boundaries more than we needed that simplicity. Ask me in a year whether that was true.

The point isn't "microservices everywhere." It's: don't cram every integration into Odoo, and don't leak business rules out into the FastAPI layer. Keep the domain in one place.

## So what do you even call this?

Honestly, I'm not sure it has one clean name. A few that fit, from most accurate to most hand-wavy:

- **Modular-monolith core + satellite services** — the most accurate, to me. Odoo is a *modular monolith* (one deployable, modules inside — a term [popularised by Simon Brown](https://simonbrown.je/modular-monolith/)); the website, customer area, FastAPI, Keycloak and Meilisearch are satellites around it.
- **The Citadel** — DHH's name for a "majestic monolith" kept at the centre and supported by a few *outposts*, each peeling off a slice of responsibility ([Signal v. Noise, 2020](https://signalvnoise.com/svn3/the-majestic-monolith-can-become-the-citadel/)). Almost exactly our shape, and a nice quotable label — though a purist would note a real Citadel has fewer, thinner outposts than ours.
- **Domain-centric / system-of-record** — Odoo owns the domain and the truth; everything else defers to it. "Domain-centric" echoes [Eric Evans' Domain-Driven Design](https://www.dddcommunity.org/book/evans_2003/); "system of record" is an older enterprise-IT term (the sense [Gartner still uses](https://www.gartner.com/en/documents/3745519) for the authoritative store). This is the property that matters most.
- **Headless + API-first** — captures the frontend split (the website and customer area are decoupled "heads", a framing from the [headless CMS/commerce](https://www.contentstack.com/blog/all-about-headless/content-management-systems-history-and-headless-cms) world of the mid-2010s) and the API glue — but it undersells the Odoo-as-core part.
- **Hub-and-spoke**, Odoo as the hub — fine informally, though the name is borrowed from logistics and only reached software through [enterprise integration patterns](https://www.enterpriseintegrationpatterns.com/ramblings/03_hubandspoke.html). A bit dated.

**What it's *not* is microservices** (the term [popularised by Fowler and Lewis in 2014](https://martinfowler.com/articles/microservices.html)). There's no domain carved into many independently-owned services — it's one core with edges. Two smaller patterns do show up inside it, though:

- **BFF (backend-for-frontend)** — FastAPI acting as the edge for the customer area. The term was [coined by Phil Calçado at SoundCloud and popularised by Sam Newman](https://samnewman.io/patterns/architectural/bff/).
- **CQRS-lite read model** — Odoo → Meilisearch is a read projection: search reads never touch the source of truth. "CQRS" was [coined by Greg Young](https://martinfowler.com/bliki/CQRS.html), building on Bertrand Meyer's command-query separation.

> "There are only two hard things in Computer Science: cache invalidation and naming things." — Phil Karlton

If I had to pick one, I'd call it a *modular-monolith core with API-first edges* — or, when I want to sound like I read blogs, an Odoo-centric Citadel. But naming architectures is half vibes, and I'd happily be told there's a better word for it.

## Lessons and gotchas

- **Customisations as modules, not core edits** — the difference between a smooth upgrade and a dreaded one.
- **Respect the ORM** — fighting it with raw SQL is usually a smell; when you do need it, isolate it.
- **Raise the testing bar on purpose** — the old monolith's QA never got there, and the gaps showed up as regressions. This time we set stricter test-coverage rules from the start. Same instinct I wrote about in [Foundations of AI-assisted software development](/articles/foundations-of-ai-assisted-software-development/): QA is the foundation, not an afterthought. At least for Odoo and FastAPI, my area. I can't vouch for every layer, but where I could set the bar, I set it higher.
- **Add eyes on production** — tests catch what you thought to check. Observability catches the rest. We added **Grafana** and **Loki**, so issues show up as signals we watch, not surprises a client reports back to us.
- **Draw the Odoo ↔ FastAPI line deliberately** — re-litigating it per feature is where integrations rot.
- **Migrate incrementally** — move one process at a time. Keep both systems running until each slice is proven. For us this was the interesting part. No big bang: we rolled out over **three major go-lives**, each deploying a different slice at a different moment. The rule throughout: everything not yet migrated had to keep working. Slower than a single cutover, far less terrifying.
- **Expect the integration glue to change under you** — at first the integrations ran through custom APIs in the old PHP monolith. As pieces moved over, we replaced those with **n8n** workflows on **Odoo's XML-RPC API**. That took a lot of bespoke glue off our hands. Transitional plumbing is temporary. Don't over-engineer it.

## Takeaway

Adopting Odoo paid off. Not because it's magic. Because it let us stop maintaining the generic parts and focus on our actual business logic, as proper modules, while FastAPI took the edges. The framework does the boring 80%. You own the 20% that's really yours.

Would we do it again? Yes. But check back after our first major version upgrade. That's when the "modules, not core edits" discipline gets its real exam. It's the bit we're quietly nervous about.

Was it worth it? I want to say yes — and mostly I mean it. But I'll be honest: somewhere in those two years, it cost me a burnout. The architecture came out better. The road there was heavy. Both are true, and I'm still working out how to weigh them.
