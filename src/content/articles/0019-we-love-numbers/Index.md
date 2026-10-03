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

But there was a problem with that conclusion.

I posted that photo almost twenty years ago, when I had just opened my account. I had almost no followers, no established audience, and very little visibility.

Seen in that context, those few likes and comments suddenly meant something completely different.

**The number didn't change. Its meaning did.**

# We love numbers

And in tech, we really love them.

I've probably been through around a hundred Scrum sprints over the years, both as a developer and as a Scrum Master.

And Scrum gives us plenty of numbers to look at.

Story points. Velocity. Burndown charts. Completed tickets. Sprint goals. Carry-over. Bugs. Cycle time.

After a while, it becomes very tempting to look at those numbers and feel that we know how a project is doing.

Velocity went from 45 to 60.

Good sprint.

We completed 90% of the planned stories.

Good sprint.

Three stories moved to the next sprint.

Bad sprint.

But is it really that simple?

A team can increase its velocity without becoming more productive. Estimates may have changed. Stories may have become smaller. The type of work may have changed. A difficult architectural problem solved during one sprint might unlock months of future development while contributing surprisingly little to the numbers we normally celebrate.

And the opposite can happen too.

A sprint can look fantastic on a burndown chart while producing very little that actually matters.

The numbers can be perfectly correct.

Our interpretation of them can still be wrong.

## But what are we actually trying to measure?

This is where I think the question becomes more interesting.

Because ultimately, what we want to measure is **value**.

And value becomes surprisingly difficult to define once you ask: value for whom?

As a developer, I might see enormous value in improving the architecture of a system.

Reducing coupling. Cleaning up technical debt. Increasing test coverage. Building reliable CI/CD pipelines. Making deployments boring. Making the codebase easier to understand six months from now.

A Project Lead may look at the same project differently.

For them, value might mean being able to accommodate a new feature without turning a two-day change request into a three-week refactoring exercise. It might mean predictability, easier planning, fewer surprises and the ability to respond when requirements inevitably change.

And then there is the client.

The client may care about all of those things indirectly, but their definition of value can be completely different.

Cost matters, of course.

But perhaps a feature removes twenty minutes of manual work from a workflow performed fifty times every day.

Perhaps an integration eliminates a source of recurring errors.

Perhaps a redesign doesn't directly generate a measurable conversion but strengthens the brand.

Perhaps better performance makes a service feel more trustworthy.

Perhaps a small UX improvement removes a frustration customers have experienced for years.

The interesting thing is that some of these things are relatively easy to turn into numbers.

Others aren't.

## Not everything valuable fits nicely into a dashboard

If an automation saves 20 minutes and is used 50 times per day, we can calculate something.

If a new checkout increases conversion from 2.1% to 2.6%, we can calculate something.

If infrastructure changes reduce hosting costs by 30%, we can calculate something.

That's the comfortable part.

But what is the numerical value of a codebase that developers aren't afraid to change?

What is the value of an architecture that makes the next five feature requests easier to implement?

How much is a consistent brand worth?

What number represents a client trusting the development team enough to discuss a problem instead of arriving with a predefined solution?

How do we quantify a project that simply *feels healthy*?

We can try.

We can create proxies. Developer satisfaction surveys. Lead time. Change failure rate. Customer satisfaction. Retention. Conversion. Support requests. Time spent implementing change requests.

And those metrics can be extremely useful.

But eventually we have to acknowledge that the model is not the thing itself.

## Sometimes you have all the numbers and still have a feeling

This is something I've found increasingly interesting after many years of building software.

Sometimes all the numbers look fine and something feels wrong.

The sprint is on schedule.

Velocity is stable.

Tests are green.

The pipeline is green.

The backlog is moving.

And yet you can feel that every change is becoming slightly harder. Discussions take longer. Developers are increasingly reluctant to touch certain areas. Small requests produce unexpected side effects. The architecture is slowly losing coherence.

There may not be a single metric telling you that the project is becoming unhealthy.

Not yet.

And sometimes the opposite happens.

A sprint looks terrible.

Velocity drops. Stories aren't completed. A feature takes much longer than expected.

But perhaps the team finally stopped and fixed an architectural problem that had been slowing everyone down for months.

The dashboard says productivity decreased.

The developers know the project just became healthier.

That doesn't mean we should replace metrics with feelings.

Experience can be wrong too. Intuition is full of biases. The loudest person in the room is not necessarily seeing something everyone else has missed.

But I also don't think we should dismiss a persistent feeling simply because we cannot immediately attach a number to it.

Sometimes that feeling is just the human brain noticing many weak signals before we have found a good way to measure them.

## Metrics are proxies

Maybe that's the important distinction.

We don't really care about velocity.

We care about our ability to deliver useful software sustainably and predictably.

We don't really care about test coverage.

We care about being able to change software with confidence.

We don't really care about deployment frequency.

We care about getting useful changes safely into production when they are needed.

And clients usually don't care about any of these metrics directly.

They care about what the software allows their business to do.

Metrics are useful because the things we actually care about are often difficult to measure directly.

Problems begin when the proxy quietly becomes the objective.

Then people start optimizing the metric.

More story points.

More tickets.

More coverage.

More deployments.

More clicks.

And dashboards become greener while the thing we originally wanted to improve may not be improving at all.

## We love numbers

And we should.

Numbers help us challenge assumptions. They expose problems that intuition can miss. They allow us to compare, experiment and learn.

But numbers don't remove the need for judgement.

They make judgement better informed.

Maybe the most useful question isn't:

**“What do the numbers say?”**

but:

**“What are we actually trying to understand, and are these numbers really telling us that?”**

That old photo still has very few likes.

The number is correct.

What changed was my understanding of what that number represented.

Software projects aren't that different.