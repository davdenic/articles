---
title: Is Yann LeCun right about world models?
description: "LeCun says LLMs will never reach human-level intelligence and that we need world models instead. He left Meta and raised a billion dollars on that bet. I went through the claim, the evidence and the critics. Here is where I've landed for now."
draft: true
version: 1
updated: 2026-11-08
changelog:
  - "2026-11-08: new article"
---

Under a 2024 Reddit post about Yann LeCun, one comment got 277 upvotes: ["As per tradition, next week will probably be groundbreaking.....given Yan Le Cun just said something about the limits of LLMs."](https://www.reddit.com/r/singularity/comments/1gq9as6/comment/lwwg883/) It's a joke, and a pointed one. LeCun says LLMs can't do something, and soon after, one does.

LeCun has spent years saying LLMs won't reach human-level intelligence and that we need **world models** instead. In the [previous article](/articles/world-models/) I tried to work out what a world model even is, starting from GPT playing a city builder on YouTube. This one is about the bigger claim. Is he right?

He isn't a random contrarian. He won a Turing Award for his work on neural networks, ran AI research at Meta for over a decade, and in 2026 raised over a billion dollars to prove his point. I went through his arguments, the evidence, the critics and a lot of comment threads. Here is what I found.

## What LeCun actually claims

The clearest version I found is from his 2024 conversation with Lex Fridman. He lists four things he thinks intelligent systems need: understanding the physical world, persistent memory, reasoning and planning. Then about LLMs:

> "They don't really have persistent memory. They can't really reason and they certainly can't plan."

Three arguments come up again and again.

**1. Text is a thin slice of the world.** He does the maths in the same interview. Reading all the text an LLM is trained on would take a human about 170,000 years at eight hours a day. Sounds like a lot. Then he compares it with a four-year-old, who has been awake for about 16,000 hours, with the optic nerve carrying roughly 20 MB per second. His result: about 10^15 bytes of sensory data for the child against about 2 × 10^13 bytes of text for the LLM. The child wins by a factor of 50, without reading a single word.

I'm not sure how much weight that comparison can carry. Bytes from an optic nerve and bytes of text aren't the same currency. Still, it stuck with me.

**2. Token-by-token generation drifts.** An LLM writes one token at a time, and each token depends on the ones before. LeCun's argument is that "the probability that an answer would be nonsensical increases exponentially with the number of tokens." To be fair to him, he says himself that this assumes errors are independent from token to token. They probably aren't, and reasoning models that check and correct their own output are a direct attack on this point. More on that below.

**3. Cats know things LLMs don't.** "They don't have language and they understand the world much better than any LLM." He expects systems "as smart as a cat" before anything smarter.

His conclusion is blunt: "If you're really interested in human level AI, abandon the idea of generative AI."

In January 2026, two months after leaving Meta, he repeated it to MIT Technology Review:

> "They can't truly reason or plan, because they lack a model of the world."

And on scaling: "people have had this illusion, or delusion, that it is a matter of time until we can scale them up to having human-level intelligence, and that is simply false."

So the claim is strong, but narrower than the headlines make it. LLMs stay useful tools in his view. Scaling them up just won't reach human-level intelligence.

## His version of a world model

The short definition is in the [previous article](/articles/world-models/): a system that takes the current state of the world plus an action you're considering, and predicts what happens next. LeCun's own version is more specific.

His 2022 position paper, "A Path Towards Autonomous Machine Intelligence", opens with a question I like: "How could machines learn as efficiently as humans and animals?" Then it sketches an agent built from six modules:

| Module | What it does, in plain words |
| --- | --- |
| Perception | Looks at the world and estimates the current state |
| World model | Fills in what it can't see and predicts what happens next |
| Cost | A "discomfort" score. Part hard-wired, part learned |
| Actor | Proposes sequences of actions |
| Short-term memory | Keeps track of past, current and predicted states |
| Configurator | Executive control. Sets up the others for the task at hand |

The agent imagines several action plans with the world model, scores each one with the cost module, and picks the plan with the lowest discomfort. The paper calls the world model "the most complex piece of the architecture." No surprise there.

The key design choice: his world model predicts compressed, abstract states where "irrelevant details have been eliminated," never pixels or tokens. The architecture is called **JEPA**, and the paper is direct about it: JEPA "is not generative." That puts him at odds with DeepMind's Genie or NVIDIA's Cosmos, which generate the full picture.

## What JEPA has shown so far

A claim this big needs results. Here is what LeCun's line of work has published, most of it from Meta's FAIR lab:

- **I-JEPA (2023)**: learned image representations by predicting the abstract representation of hidden parts of an image. Meta reported training a 632M-parameter model on 16 GPUs in under 72 hours, with other methods needing 2 to 10 times more GPU-hours.
- **V-JEPA (2024)**: the same idea on video, predicting masked parts "in an abstract representation space."
- **V-JEPA 2 (June 2025)**: 1.2B parameters, pre-trained on over a million hours of video. Then a robot version, V-JEPA 2-AC, fine-tuned on about 62 hours of robot video and dropped onto robot arms in two labs it had never seen.

The robot numbers are the most concrete thing I found:

| Task (avg. of two labs) | V-JEPA 2-AC | Octo (baseline) |
| --- | --- | --- |
| Reach | 100% | 100% |
| Grasp cup | 65% | 15% |
| Grasp box | 25% | 0% |
| Pick-and-place cup | 80% | 15% |
| Pick-and-place box | 65% | 10% |

Against NVIDIA's Cosmos in one lab, planning took 16 seconds per action instead of 4 minutes. That's a real speed-up, though 16 seconds per move is still slow for anything outside a lab.

Since then: V-JEPA 2.1 (March 2026) reports a 20-point gain in real-robot grasping. A small paper called LeWorldModel claims a 15M-parameter JEPA that trains on a single GPU and plans up to 48 times faster than bigger world models. There are even JEPA versions for language (LLM-JEPA) and vision-language (VL-JEPA), which is a little ironic for a project that set out to leave language models behind.

One result cuts the other way, and Meta published it alongside V-JEPA 2. On IntPhys 2, a test of intuitive physics, humans score 85 to 95%. Current video models, V-JEPA 2 included, are "at or close to chance." So the physical-understanding gap isn't only an LLM problem. LeCun's own models haven't closed it either.

## The other side

Plenty of serious people think LeCun is wrong, or at least overconfident.

### "Prediction needs understanding"

Ilya Sutskever, OpenAI co-founder, in 2023: "Predicting the next token well means that you understand the underlying reality that led to the creation of that token." Geoffrey Hinton, who shared the Turing Award with LeCun, said on 60 Minutes: "To predict the next word you have to understand the sentences." Same award, opposite conclusions.

### Some LLMs do build internal models

A few studies point that way:

- **Othello-GPT (2022)**: a small model trained only on lists of Othello moves turned out to hold "an emergent nonlinear internal representation of the board state." Change that representation and the model's moves change too. A follow-up found the board representation can even be read off linearly.
- **Chess**: a similar model trained on chess games tracks the board and estimates the players' skill.
- **Space and time (2023)**: Gurnee and Tegmark found that Llama-2 has internal representations of where places are and when events happened. Their phrase: "basic ingredients of a world model."

### But those models are fragile

[Vafa and colleagues](https://arxiv.org/abs/2406.03689) trained a model on New York taxi rides. It gave near-perfect driving directions. When they pulled out the map it had learned, it was full of streets that don't exist. Close 1% of the real streets and accuracy dropped "from nearly 100 percent to just 67 percent." Good at the routes it had seen, lost the moment one changed.

### Reasoning models muddy everything

LeCun's errors-compound argument predates o1 and its successors, which spend extra compute thinking before they answer. In December 2024, OpenAI's o3 scored 75.7% on the ARC-AGI-1 puzzle benchmark, 87.5% with a huge compute budget. François Chollet, who created the benchmark and is no hype merchant, called it "a genuine breakthrough", while adding "I don't think o3 is AGI yet."

Then ARC-AGI-3 launched in March 2026, built specifically to be hard for these systems. The earliest frontier entries on the leaderboard scored under 1%. By September, the best standard-setup score I could find there was 62.7%. Six months. I don't know what to make of that yet. It's either strong evidence against "LLMs can't plan," or evidence that benchmarks get learned like everything else. Possibly both.

Apple's "The Illusion of Thinking" paper (2025) found reasoning models hit a "complete accuracy collapse beyond certain complexities." A rebuttal argued this mostly reflected "experimental design limitations", like token limits and puzzles that had no solution. A third paper landed somewhere in the middle. Reading all three left me less sure than before.

### Generative world models bet against him

Demis Hassabis at DeepMind argues the opposite of LeCun: "if you can generate it, then that's an expression of your system understanding those dynamics." DeepMind released Genie 4 as a research preview in October 2026, with real-time steering and scenes that stay consistent for about two minutes. That's a generative world model, exactly the kind LeCun says will fail.

### An unexpected ally

Gary Marcus, one of the most persistent critics of LLMs, agrees we need world models: "persistent, stable, updatable (and ideally up-to-date) internal representations." He just adds that he's "not clear how he defines the term." I had the same problem while writing this.

## Then the money arrived

The debate stopped being academic in late 2025.

- **November 2025**: LeCun announced he was leaving Meta after 12 years to start a company continuing his "Advanced Machine Intelligence research program". This came after Meta reorganised AI around a new superintelligence lab and cut around 600 roles in its AI unit, FAIR included.
- **March 2026**: AMI Labs, based in Paris, raised **$1.03 billion** at a $3.5 billion pre-money valuation. Nvidia, Samsung, Toyota Ventures and Bezos Expeditions were among the backers.
- **Same month**: OpenAI announced it was shutting down Sora, its video generator that had been pitched as a "world simulator".
- **February to September 2026**: World Labs raised $1 billion, then agreed to be bought by AMD for about $8.2 billion in stock.
- **Through 2026**: a wave of funding for world-model and robotics startups, several valued well above a billion.

My favourite line of the year comes from AMI's own CEO, Alexandre LeBrun: "In six months, every company will call itself a world model to raise funding." He said that in March. I'm now considering calling my to-do app a world model. It does predict the future state of my week. Mostly that it'll be on fire.

What hasn't arrived is a product. In July, LeCun said "We'll have prototypes within a year or so" (in an interview on the site of Nebius, which sells AMI its GPU compute). In October he told Fortune the first product would come "soon," aimed at industrial uses like anomaly detection: "It's AI for the physical world, so it's not language-related." In November, The Decoder reported LeBrun saying openly that a product could be years away. Those timelines don't quite fit together.

## What people online think

Research papers are one thing. I also wanted to know how people who build with this stuff react. So I read through the big Hacker News and Reddit threads: his exit from Meta (about 650 comments on Hacker News alone), the billion-dollar raise, the V-JEPA 2 release. Rough camps, from my own reading, not a measured count:

| Camp | In their words |
| --- | --- |
| He's right, text has a ceiling | ["language is a thing by itself... doesn't necessarily have any relation to reality"](https://news.ycombinator.com/item?id=45898374) |
| Moving goalposts | ["X can't do Y -> well, here they are doing Y -> well, not like that."](https://news.ycombinator.com/item?id=45898248) |
| They'll merge anyway | ["I bet LLMs and world models will merge."](https://news.ycombinator.com/item?id=47323638) |
| It's about the money | ["LLMs are not improving as fast as money asks for so we're moving to the next buzzword."](https://news.ycombinator.com/item?id=45924173) |
| Show me results | ["all of it is still theoretical."](https://news.ycombinator.com/item?id=47322982) |
| Good to have a second bet | ["It's nice not to have all our eggs in one basket"](https://news.ycombinator.com/item?id=45898740) |

The tone depends a lot on where you look. r/singularity treats him like a celebrity in a feud. One commenter there sighed that the sub had ["devolved into a tech celebrity gossip column."](https://www.reddit.com/r/singularity/comments/1gq9as6/comment/lwxfo4f/) r/MachineLearning argues about the papers. Hacker News mostly argues about Meta's management and venture capital. And the same joke showed up on both sites, about AMI hiring ["LeFunde as CFO and LeTune as head of post-training."](https://news.ycombinator.com/item?id=47322892) I'm a little jealous I didn't think of it.

What surprised me is how the mood changed over time:

- **2024**: mostly mockery. New model releases were often held up as proof he was wrong.
- **Late 2025**: when he left Meta, much of the anger went to Meta instead. A top comment: ["at least LeCun had a bold plan"](https://www.reddit.com/r/singularity/comments/1ou7kgy/comment/no9qetv/).
- **2026**: more people say he might be right about human-level intelligence, and the doubt moves to business: ["Raising $1Bn without an actual business is crazy"](https://www.reddit.com/r/OpenAI/comments/1rs6rd8/comment/oa5q7q5/). By July, one r/singularity commenter wrote: ["recently I think he's more right than I've given him credit for"](https://www.reddit.com/r/singularity/comments/1v1i657/comment/oyngpjn/).

One fair technical point from a Hacker News reader on the robot numbers: ["a minimum 20% failure rate sounds pretty bad"](https://news.ycombinator.com/item?id=44249032). Fair. It beats the older baseline by a lot, and it's still nothing you'd ship.

## Where I've landed (for now)

I started this expecting to pick a side. I haven't, really. Here is my current best guess, held loosely.

**What I think LeCun gets right:**

- Text is a small, filtered window on the world. A system that has only read about cups is missing something a toddler has.
- Predicting abstract states instead of every pixel makes a lot of sense to me. The V-JEPA 2 robot results show it can work outside a slide deck.
- Planning, imagining actions before taking them, is the piece today's chatbots seem weakest at. Anyone who has watched a coding agent confidently refactor the wrong file knows this. In [foundations of AI-assisted development](/articles/foundations-of-ai-assisted-software-development/) I argued that today's fix is the harness around the model: specs, context, tests. Looking back, that's mostly a workaround for this gap.
- The city-builder videos from the [previous article](/articles/world-models/) fit his story. If a model has to reload a save to find out a road was a bad idea, that isn't much planning.

**Where I'm not convinced:**

- "Never" is a big word. LLMs have repeatedly done things critics said they couldn't. The ARC-AGI-3 jump is the latest example.
- His strongest arguments, like errors compounding, were made before reasoning models. I couldn't find him engaging with o1 or o3 by name.
- His own models still score near chance on intuitive physics. The gap he describes is real, but nobody has closed it yet, him included.
- It might not be either/or. His own architecture needs something to talk to people. Maybe the future is a world model that plans, with a language model as the mouth. That's my guess, not his.

**Questions I still have:**

- How would we even know a model "understands" the world? Every test so far gets passed, learned around, or argued about.
- If an LLM with tools and enough thinking time can plan well in practice, does it matter that it does it the "wrong" way?
- Will JEPA-style models ever be useful for the work I do, building websites and software? Or is this a robotics story that never touches my desk? Maybe that matters less than I think. Compare [testing local LLMs](/articles/testing-local-llms/): the model that wins on paper isn't always the one that helps.
- What happens to the billions if AMI's first product is a very good anomaly detector for factories? That's useful. It's also a long way from a cat.

LeCun has been saying roughly the same thing for years while the industry went the other way. He might be early, or he might be wrong. Apparently AMI has "Jan. 2027" circled on a whiteboard. Nobody explained what it means. Ask me again then.

## Sources

**LeCun's claim**

- [Lex Fridman Podcast #416 transcript](https://lexfridman.com/yann-lecun-3-transcript/) (March 2024)
- [A Path Towards Autonomous Machine Intelligence](https://openreview.net/forum?id=BZ5a1r-kVsf) (LeCun, 2022)
- [MIT Technology Review: Yann LeCun's new venture](https://www.technologyreview.com/2026/01/22/1131661/yann-lecuns-new-venture-ami-labs/) (January 2026)
- [Brown University: LeCun lecture](https://www.brown.edu/news/2026-04-01/yann-lecun-artificial-intelligence-pioneer) (April 2026)

**JEPA and results**

- [I-JEPA](https://ai.meta.com/blog/yann-lecun-ai-model-i-jepa/) (Meta, 2023) · [V-JEPA](https://ai.meta.com/blog/v-jepa-yann-lecun-ai-model-video-joint-embedding-predictive-architecture/) (Meta, 2024)
- [V-JEPA 2 and IntPhys 2](https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/) (Meta, June 2025) · [V-JEPA 2 paper](https://arxiv.org/abs/2506.09985)
- [V-JEPA 2.1](https://arxiv.org/abs/2603.14482) · [LeWorldModel](https://arxiv.org/abs/2603.19312) · [LLM-JEPA](https://arxiv.org/abs/2509.14252) · [VL-JEPA](https://arxiv.org/abs/2512.10942)

**Other world models**

- [World Models](https://worldmodels.github.io/) (Ha & Schmidhuber, 2018) · [Dreamer 4](https://danijar.com/project/dreamer4/) (Hafner et al., 2025)
- [Genie 3](https://deepmind.google/discover/blog/genie-3-a-new-frontier-for-world-models/) (DeepMind, 2025) · [Genie 4 coverage](https://techcrunch.com/2026/10/27/googles-genie-4-world-model-adds-audio-more-realistic-worlds-and-real-time-steering/) (TechCrunch, October 2026)
- [NVIDIA Cosmos](https://nvidianews.nvidia.com/news/nvidia-launches-cosmos-world-foundation-model-platform-to-accelerate-physical-ai-development) · [World Labs Marble](https://www.worldlabs.ai/blog/marble-world-model)

**The other side**

- [Sutskever on Dwarkesh Podcast](https://www.dwarkesh.com/p/ilya-sutskever) (2023) · [Hinton on 60 Minutes](https://www.cbsnews.com/news/geoffrey-hinton-ai-dangers-60-minutes-transcript/) (2023)
- [Othello-GPT](https://arxiv.org/abs/2210.13382) · [Linear Othello representation](https://arxiv.org/abs/2309.00941) · [Chess model](https://arxiv.org/abs/2403.15498) · [Language Models Represent Space and Time](https://arxiv.org/abs/2310.02207)
- [Vafa et al.: incoherent world models](https://arxiv.org/abs/2406.03689) · [MIT News summary](https://news.mit.edu/2024/generative-ai-lacks-coherent-world-understanding-1105)
- [The Illusion of Thinking](https://machinelearning.apple.com/research/illusion-of-thinking) (Apple, 2025) · [Rebuttal](https://arxiv.org/abs/2506.09250)
- [o3 on ARC-AGI](https://arcprize.org/blog/oai-o3-pub-breakthrough) (ARC Prize, 2024) · [ARC Prize leaderboard](https://arcprize.org/leaderboard) (live, checked November 2026)
- [Hassabis at All-In Summit](https://singjupost.com/transcript-demis-hassabis-on-ai-creativity-and-a-golden-age-of-science-all-in-summit) (third-party transcript, 2025) · [Gary Marcus on world models](https://garymarcus.substack.com/p/generative-ais-crippling-and-widespread) (2025)

**The money**

- [LeCun leaving Meta](https://www.thestar.com.my/tech/tech-news/2025/11/20/meta-chief-ai-scientist-yann-lecun-leaving-for-startup) (AFP, November 2025) · [Meta AI cuts](https://www.rte.ie/news/business/2025/1022/1540026-meta-cutting-hundreds-of-roles-in-ai-unit) (October 2025)
- [AMI Labs raises $1.03B](https://techcrunch.com/2026/03/09/yann-lecuns-ami-labs-raises-1-03-billion-to-build-world-models/) (TechCrunch, March 2026)
- [OpenAI shuts down Sora](https://techcrunch.com/2026/03/24/openais-sora-was-the-creepiest-app-on-your-phone-now-its-shutting-down/) (TechCrunch, March 2026)
- [World Labs Series B](https://www.thesaasnews.com/news/world-labs-raises-1b-series-b) · [AMD to buy World Labs](https://www.cnbc.com/2026/09/28/amd-fei-fei-li-world-labs.html) (CNBC, September 2026)
- [Nebius: inside LeCun's lab](https://nebius.science/stories/meet-yann-lecuns-lab-and-the-ai-world-of-2030) (July 2026, published by an AMI supplier) · [Fortune interview](https://fortune.com/2026/10/01/ai-godfather-yann-lecun-has-zero-concerns-about-human-extinction-says-anthropic-ceo-dario-amodei-is-deuded/) (October 2026)
- [The Decoder: Frontier Radar #5](https://the-decoder.com/frontier-radar-5-if-agi-is-so-close-why-is-everyone-leaving-the-neolabs-and-their-bets/) (November 2026)

**Community threads**

- Hacker News: [LeCun to depart Meta](https://news.ycombinator.com/item?id=45897271) (November 2025) · [LeCun raises $1B](https://news.ycombinator.com/item?id=47320600) (March 2026) · [V-JEPA 2](https://news.ycombinator.com/item?id=44248165) (June 2025)
- Reddit: [r/singularity, "Yann LeCun 'I told you so'"](https://www.reddit.com/r/singularity/comments/1gq9as6/) (2024) · [r/singularity, LeCun plans to exit Meta](https://www.reddit.com/r/singularity/comments/1ou7kgy/) (2025) · [r/singularity, "Thoughts on JEPA vs LLMs?"](https://www.reddit.com/r/singularity/comments/1v1i657/) (2026) · [r/OpenAI, AMI raises $1bn](https://www.reddit.com/r/OpenAI/comments/1rs6rd8/) (2026)

*World models move fast. Numbers and funding reflect November 2026. Check current figures before quoting them.*
