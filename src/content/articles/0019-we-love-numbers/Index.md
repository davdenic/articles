---
title: We Love Numbers
description: ""
draft: true
image: "hero.png"
version: 1
changelog: []
---

# We Love Numbers

Recently, I was looking at some numbers from my old photos and noticed that one of my favourites, if not my favourite of all, had received very little attention in terms of likes and comments. Other photos I posted later received hundreds of reactions, sometimes much more.

The obvious conclusion would be that those photos simply worked better. More people liked them, more people commented on them, so apparently they connected with the audience more. And if one photo consistently gets much more appreciation than another, it is tempting to see that difference as a signal of quality.

Maybe what I considered one of my best photos simply wasn't as good as I thought.

But there was a problem with that conclusion. I posted that photo almost twenty years ago, when I had just opened my account. I had almost no followers, no established audience, and very little visibility.

Seen in that context, those few likes and comments suddenly meant something completely different.

**The number didn't change. Its meaning did.**

## We love numbers in tech

And we have plenty of them.

I've probably been through around a hundred Scrum sprints over the years, both as a developer and as a Scrum Master. You know the ritual: at the end of the sprint we look at what was planned, what was completed, what moved to the next sprint, and perhaps how velocity changed.

Useful information. But a sprint with everything completed isn't necessarily a successful sprint, and a lower velocity doesn't necessarily mean the team achieved less. The type of work changed, estimates changed, unexpected problems emerged, or perhaps the team spent time solving something that will make the next ten sprints easier.

Then there are the numbers we developers particularly like. Test coverage is an obvious one.

Going from 60% to 80% feels like progress, and it probably is. But 80% coverage doesn't tell us whether those tests give us confidence to change the system. We can have impressive coverage and poor tests, or lower coverage with very good tests around the parts of the system where mistakes actually matter.

And then there are all the numbers around our everyday development process: merge requests opened and closed, review time, build time, deployment frequency. Closing more merge requests might mean we're delivering more, or it might simply mean we're creating smaller merge requests. A faster pipeline is nice, but it tells us nothing about whether we're building the right thing.

You get the point. **We've all been there, haven't we?**

The numbers aren't wrong. The problem starts when we give them a meaning they don't actually contain.

## So what are we actually trying to measure?

Ultimately, I think the interesting question is **value**. And value becomes surprisingly difficult to define as soon as you ask: **value for whom?**

As a developer, I may value good architecture, meaningful tests, reliable pipelines and a codebase I can change with confidence.

A Project Lead may ask different questions: How easily can we add the next feature? How expensive will the next change request be? Can we plan with reasonable confidence?

The client may care about something else entirely: cost, time saved, fewer errors, better workflows, conversion, or even something much harder to quantify, like how the product reflects their brand.

Some of these things fit nicely into a spreadsheet. Others don't.

## And then there is gut feeling

There is also something much harder to put into a dashboard: **gut feeling**.

As developers, we sometimes finish a project and simply think: *I'm happy with how this turned out.* The architecture makes sense, the code feels coherent, changes don't make us nervous, and opening the project six months later doesn't immediately make us regret decisions made six months earlier.

And sometimes it's exactly the opposite. Nothing is catastrophically wrong: tests pass, the pipeline is green, performance is acceptable and tickets are being delivered. But every time you have to open that project, you think: *Oh no, not this one again.*

Users have their own version of this. A piece of software can tick all the measurable boxes and still make you feel uncomfortable every time you have to use it. Perhaps it is slightly confusing, slightly slow, inconsistent or unpredictable. No single problem is serious enough to explain the reaction, but together they create an experience that no individual metric quite captures.

Of course, gut feeling isn't a metric, and it shouldn't replace one. It can be biased, subjective and sometimes completely wrong. But it can also be the result of years of experience, or simply our brain combining dozens of small signals that we haven't measured individually.

Maybe that's why *“I'm happy with how this turned out”* and *“I hate using this thing”* are worth listening to. Not as answers, but as signals that there may be something worth understanding.

## Metrics are proxies

We don't really care about velocity itself. We care about our ability to deliver useful software sustainably and predictably.

And test coverage? Well, as a developer, I do care about test coverage. Quite a lot. 😉

But 80% is not valuable just because it's 80%. What I really want is confidence that I can change the software without unexpectedly breaking something.

The same goes for merge requests. The number itself matters much less than whether those changes improve the product and leave the codebase in a state where we can continue improving it.

Clients generally don't care about any of those metrics directly. They care about what the software allows their business, their employees or their customers to do.

Metrics are useful because the things we actually care about are often difficult to measure directly. The problem starts when the proxy quietly becomes the objective.

Then we optimize velocity, coverage, tickets, merge requests, deployments, clicks, and eventually we can end up with a beautiful dashboard describing a project that nobody actually wants.

## We love numbers

And we should.

Numbers help us challenge assumptions. They expose problems that intuition can miss. They allow us to compare, experiment and learn.

But numbers don't remove the need for judgement. They make judgement better informed.

Maybe the most useful question isn't **“What do the numbers say?”** but **“What are we actually trying to understand, and are these numbers really telling us that?”**

That old photo still has very little engagement. The number is correct. What changed was my understanding of what that number represented.

Software projects aren't that different.