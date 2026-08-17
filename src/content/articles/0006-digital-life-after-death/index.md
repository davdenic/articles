---
title: What happens to our digital life when we die?
description: A personal reflection on digital inheritance — emails, messages, cloud photos, saved passwords — and why what happens to our digital traces after death is still so unclear.
draft: true
image: pacman-hero.svg
size: 2x1
version: 1
changelog: []
modified: 2026-08-17T10:35:54+02:00
---

![Pac-Man chasing a fleeing ghost across a row of dots — hand-drawn hero](./pacman-hero.svg)

I recently lost someone close.

After he passed away, I had to deal with his computer, phone, and online accounts — trying to figure out what to close, what to keep, and what to pass on.

I couldn’t get into his computer or unlock his phone, so even reaching his contacts came down to asking around.

I’m the only heir, so the physical stuff is straightforward. But it made me wonder:

Does that also mean I have the right to his digital life?

What about emails, WhatsApp, cloud photos, or saved passwords — and all the data that involves other people?

Unlike things like houses or cars, a digital life doesn’t really fit into inheritance rules in a clean way. At least not to my knowledge.

Then there’s GDPR. As far as I understand, it doesn’t really apply after someone dies, so it’s mostly up to national law.

But in practice, does inheritance actually give you access to emails, private messages, or cloud accounts — or are those still controlled by platform terms and privacy rules?

I honestly don’t know, and that’s kind of the point.

We’ve built these really complex digital lives, but what happens to them after death is still pretty unclear.

Some platforms do offer legacy tools, but they’re all over the place and not really connected.

Maybe what we need is something like a “digital will”:

Who gets access? What gets saved or deleted? Who takes care of the accounts?

And more broadly: what should actually happen to someone’s digital traces?

Death already leaves enough behind. Technology shouldn’t make it harder for the people who are left.

---

## What I found when I looked into it

A little digging confirmed the mess — but also turned up a few concrete things worth knowing.

A caveat before any of this: what follows is my own reading of public sources, not legal advice. For what I know it's roughly right, but I'm a developer poking at legal texts, not a lawyer, and I honestly can't claim it's accurate — treat it as a map I sketched, not the territory.

From what I can tell, GDPR really does stop at death. Recital 27 says the regulation "does not apply to the personal data of deceased persons," and leaves the question to each member state. ([Recital 27](https://gdpr-info.eu/recitals/no-27/)) So in Europe there seems to be no single answer — it is a patchwork, and it varies more than I expected:

- **Germany** — no special "digital death" law; it runs through ordinary inheritance. In 2018 the Federal Court of Justice ruled that a deceased person’s Facebook account passes to the heirs as part of the estate — and later, that this means real access to the account, not just a data export. ([Library of Congress](https://www.loc.gov/item/global-legal-monitor/2018-09-07/germany-federal-court-of-justice-rules-digital-social-media-accounts-inheritable/))
- **France** — you can leave directives about what happens to your data after you die, under the 2016 "République numérique" law (now art. 85 of the data-protection act); without them, heirs can still act to settle the estate. ([CNIL](https://www.cnil.fr/fr/mort-numerique-effacement-informations-personne-decedee))
- **Italy** — one of the more worked-out regimes. Heirs, someone acting on the person’s mandate, or family "for reasons worthy of protection" can exercise the deceased’s data rights (Codice Privacy art. 2-terdecies). You *can* bar this in advance — but only through a declaration that is written, specific, free and informed (revocable any time, and it can cover just some rights). Even then the bar can’t override heirs’ patrimonial inheritance rights or their right to defend their interests in court. ([Garante](https://www.garanteprivacy.it/temi/internet-e-nuove-tecnologie/eredita-digitale))
- **Spain** — relatives, partners, heirs or people the deceased designated can access, correct or erase their data (LOPDGDD art. 3), unless they had forbidden it. ([AEPD](https://www.aepd.es/preguntas-frecuentes/0-conceptos-basicos/FAQ-0011-sobre-datos-personales-de-personas-fallecidas))
- **Belgium** — no specific rule; access flows through ordinary succession law, so the accounts pass to the legal heirs (and only to them). ([ICT-recht](https://www.ictrechtswijzer.be/en/heirs-can-access-the-deceaseds-digital-accounts/))
- **Switzerland** (outside the GDPR) — the revised FADP, in force since September 2023, protects only the living, so there is no data-protection route at all; digital inheritance runs entirely through ordinary private law. ([DLA Piper](https://www.dlapiperdataprotection.com/?t=law&c=CH))

Again — my research, not gospel, and the details (even article numbers) shift over time. But the shape seems clear enough: some countries let you plan ahead, some lean on the heirs. My own case straddles two of them — I'm Italian, my relative died in Italy, and I live in Switzerland — so I dug into both.

Italy is the one that actually touched me, and on paper — for what I understand of it — it's one of the kinder regimes: as an heir I *may* exercise the deceased's data rights (art. 2-terdecies) without having planned anything in advance. And yet I still ended up standing in front of a locked phone. That's the gap that stuck with me — a law saying you *may* reach the data doesn't hand you the password, and the platform holding it doesn't much care what the Codice Privacy allows.

Switzerland, where I live, looks starker still — at least as far as I could work out. As I understand it there's no special digital-inheritance law, and no data-protection route either; it seems to run through universal succession (art. 560 ZGB), where an heir is said to step into the *whole* estate — cloud data included, in theory. In practice the wall isn't the law, it's the fine print. Data on a physical device you can usually reach — a forgotten password is the only real lock. Online accounts are another story: the platforms' own terms often forbid transferring an account and grant survivors no rights whatsoever (Apple says so outright). And because those contracts usually run under foreign law with a foreign court, enforcing an inheritance right against them is close to hopeless. So the theory says "you inherit everything," and the terms of service say "good luck with that." ([HSLU analysis](https://hub.hslu.ch/management-and-law/2023/05/25/der-digitale-nachlass-in-der-praxis-teil-i/))

![Donkey Kong arcade screen — the endless girders-and-ladders climb, dodging barrels the whole way up — as a picture of the bureaucracy.](./donkey-kong.png)

*Dodging bureaucracy, one rolling barrel at a time.*

Step outside Europe and the framing flips entirely. The UK's [Property (Digital Assets etc) Act 2025](https://www.legislation.gov.uk/ukpga/2025/29) treats things like crypto as inheritable *property* — a possessions question, not a privacy one. The US leans on a model law, [RUFADAA](https://www.nolo.com/legal-encyclopedia/ufadaa.html), adopted in most states, which gives an executor a path to digital assets — but with a twist that matters here: a platform's own legacy tool *wins over your will*. Set Google's Inactive Account Manager one way and your testament another, and the checkbox beats the lawyer. Which, as a developer, is either reassuring or slightly terrifying.

---

## The platforms each built their own tool — and they don't talk to each other

- **Google — Inactive Account Manager.** You set an inactivity deadline (e.g. 3 or 12 months); after it, Google can share chosen data with people you named, or delete the account.
- **Apple — Legacy Contact.** You generate an access key and give it to someone you trust; after you die they use that key plus a death certificate to request your data. Access then lasts three years before the account is deleted.
- **Facebook/Instagram — memorialization + Legacy Contact.** An account can be memorialized (preserved) or removed; a legacy contact can manage the memorialized profile within limits — but never log in, read messages, or edit past posts.
- **Password managers** — often the real key, since they hold everything else. But they differ more than you'd hope: **Bitwarden** has a proper *Emergency Access* feature (nominate a trusted contact who can request access after a wait you set), while **1Password** has *no* designed handoff at all — just an "Emergency Kit" printout you have to physically leave somewhere. Worth checking which camp yours is in before you rely on it.
- **GitHub — a designated *successor*.** As a developer this is the one I'd forgotten about: you can name a successor in advance to manage your repositories if you die; failing that, next of kin have to file a support request with ID and a death certificate. And that's the *good* case — most other dev tools (GitLab, npm, package registries, cloud consoles) seem to have nothing self-service at all, just a support ticket and paperwork, if that.

That's a lot of companies and a lot of different mechanisms, none of which know the others exist. As a developer I find it almost impressive — we can federate logins across half the internet, but "who gets my account when I die" is still a pile of separate opt-in checkboxes on separate settings pages.

![Four little arcade ghosts drifting in a row — the accounts that outlive us.](./account-ghosts.svg)

The catch: every one of these is **opt-in and must be set up in advance.** Do nothing, and your heirs are left where I was — locked out, asking around.

So the "digital will" isn't just a nice idea; it's the practical fix available today: turn on each platform's legacy feature now, write down who gets access to what, and keep it somewhere your people can actually reach. Is that a real fix or just the best of a bad set of options? I lean towards "best available" rather than "good" — but I'd rather do it than leave someone where I ended up.

![A single little ghost drifting off to the side, glancing back.](./lone-ghost.svg)

And here's the knot underneath all of it: most of us in Europe live our digital lives on **US products** — Gmail, iCloud, WhatsApp, Meta. So even where a European law grants an heir a right to the data, the account itself sits under a US company's terms of service and, often, foreign jurisdiction. Which one actually wins — my national inheritance right, or the platform's contract and the law it answers to? I genuinely don't know. It's an open conflict between regional rights and international platforms — and it's the part that unsettles me most.

Germany has at least tested it once: in that Facebook case, a US platform's terms lost to German inheritance law. But one national precedent isn't a global rule. There's a hint of something better coming — the [European Law Institute is drafting model rules](https://www.europeanlawinstitute.eu/projects-instruments/current-projects/current-projects/eli-succession-of-digital-assets-data-and-other-digital-remains/) for digital succession that would, pointedly, override a provider's terms of service. Whether that ever becomes law anywhere is another question. But at least someone is naming the conflict out loud — which is more than I could do when I was standing in front of a locked phone.

### Sources

- [GDPR — Recital 27 (data of deceased persons)](https://gdpr-info.eu/recitals/no-27/)
- Germany: [Library of Congress — BGH: social-media accounts are inheritable](https://www.loc.gov/item/global-legal-monitor/2018-09-07/germany-federal-court-of-justice-rules-digital-social-media-accounts-inheritable/)
- France: [CNIL — mort numérique](https://www.cnil.fr/fr/mort-numerique-effacement-informations-personne-decedee)
- Italy: [Garante — eredità digitale](https://www.garanteprivacy.it/temi/internet-e-nuove-tecnologie/eredita-digitale)
- Spain: [AEPD — datos de personas fallecidas](https://www.aepd.es/preguntas-frecuentes/0-conceptos-basicos/FAQ-0011-sobre-datos-personales-de-personas-fallecidas)
- Belgium: [ICT-recht — heirs can access the deceased’s digital accounts](https://www.ictrechtswijzer.be/en/heirs-can-access-the-deceaseds-digital-accounts/)
- Switzerland: [DLA Piper — data protection in Switzerland (revFADP)](https://www.dlapiperdataprotection.com/?t=law&c=CH) · [HSLU — der digitale Nachlass in der Praxis](https://hub.hslu.ch/management-and-law/2023/05/25/der-digitale-nachlass-in-der-praxis-teil-i/)
- UK: [Property (Digital Assets etc) Act 2025](https://www.legislation.gov.uk/ukpga/2025/29)
- US: [Nolo — RUFADAA (fiduciary access to digital assets)](https://www.nolo.com/legal-encyclopedia/ufadaa.html)
- EU (coming): [European Law Institute — Succession of Digital Assets, Data and other Digital Remains](https://www.europeanlawinstitute.eu/projects-instruments/current-projects/current-projects/eli-succession-of-digital-assets-data-and-other-digital-remains/)
- Platforms: [Google — Inactive Account Manager](https://support.google.com/accounts/answer/3036546) · [Apple — Digital Legacy](https://support.apple.com/en-us/102631) · [Facebook — memorialized accounts](https://www.facebook.com/help/1568013990080948) · [Bitwarden — Emergency Access](https://bitwarden.com/help/emergency-access/) · [1Password — Emergency Kit](https://support.1password.com/emergency-kit/) · [GitHub — deceased user policy](https://docs.github.com/en/site-policy/other-site-policies/github-deceased-user-policy)

![Ghosts 'n Goblins arcade screen — a lone knight facing an endless parade of ghosts.](./ghosts-and-goblins.avif)
