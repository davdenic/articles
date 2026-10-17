---
name: Humanize
description: Audits and rewrites article prose to strip AI writing tells (em-dash overuse, binary contrasts, faux-insight setups, inflated vocabulary, weasel attribution, formatting tics) so it reads like a person wrote it. Use when drafting or revising article body text for David's site.
---

# Humanize

Use this when writing or revising article prose for David's site. The goal is text that sounds like a specific person thinking out loud about something they actually built or broke, rather than a model performing thoughtfulness.

This skill covers technical-but-personal blog posts, not academic papers or marketing copy. David's base voice rules live in `AGENTS.md`; this skill is how you enforce them.

## Step 1 — Audit the draft

Read the whole draft first. Then scan it against this catalog and list every tell you find. Don't fix yet. Naming the problem before rewriting keeps you from sanding the whole thing into mush.

### Structural tells

| Tell | What it looks like |
| --- | --- |
| Em-dash overuse | "The build failed — again — which meant the cache — already warm — was useless." One per article is fine. Four is a tic. |
| Binary contrast | "It's not a build tool. It's a philosophy." Also "not just X, but Y". |
| Faux-insight setup | "What nobody tells you about Vite…", "The part everyone misses:", "Here's what most people get wrong." |
| Colon reveal | "The best part: it learns." The colon does the drama the sentence should earn. |
| Dramatic fragment | "That's it. That's the whole thing." / "Every. Single. Time." |
| Tricolon padding | "Fast, flexible, and powerful." Three adjectives because three sounds complete, not because all three are true. |
| Balanced parallelism | Every sentence has the same shape: setup, comma, payoff. Setup, comma, payoff. |
| Uniform sentence length | Every sentence lands at 18–22 words. Real writing swings between 4 and 40. |
| Bullet-point soup | Six bullets where two sentences would read better, or a bulleted list with one item per bullet because the model ran out of things to say. |

Rule of thumb: if a construction exists mainly to make the point *feel* important, it's a tell.

### Language tells

| Tell | Instead |
| --- | --- |
| delve, tapestry, realm, landscape, journey | "look at", "mess", "area", or just name the thing |
| leverage, utilize, harness | "use" |
| seamless, robust, powerful, cutting-edge | delete, or say what actually happened ("it didn't crash under load") |
| foster, illuminate, underscore, showcase | "help", "show", "show" |
| pivotal, testament to, game-changer, paradigm shift | delete. Say the actual consequence. |
| serves as, represents a, functions as | "is" |
| marks a pivotal moment, highlighting the commitment to | say what changed and who noticed |
| unnecessary adjectives and adverbs | "very", "significantly", "incredibly", "fundamentally", "truly". Cut on sight |

Two specific habits to hunt:

- **Copula avoidance.** Models avoid "is" because plain "is" feels too flat. "The config file serves as the entry point" is worse than "The config file is the entry point." Prefer the boring verb.
- **Significance inflation.** "This marks a pivotal moment in the project" when the actual fact is "this fixed the bug." State the fact. Let the reader decide if it's pivotal.

### Attribution and hedging tells

- **Weasel attribution.** "Experts agree", "studies show", "it's widely considered", with no source. Either cite it or drop the claim. Don't launder an opinion as consensus.
- **Throat-clearing openers.** "Here's the thing", "Let me be clear", "It's worth noting that", "At the end of the day". Start at the point.
- **Excessive hedging.** "It could potentially be argued that this might perhaps…" One hedge is honesty, four is cowardice.
- **Empty transitions.** "Moreover", "Furthermore", "That said" used as connective tissue with nothing to connect. Cut, or use the transition to say something real ("But this broke on Windows").

### Formatting tells

- Curly quotes and apostrophes (`"` `'` `–` `…`) in a repo that writes straight ASCII. Match the file you're editing.
- Emoji sprinkled for energy. One, at most, and only if David used one already.
- Bold lead-ins on every bullet: `- **Speed:** it's fast.` Real bullets don't all need a header.
- Headers that restate the previous sentence instead of advancing.

## Step 2 — Rewrite

Apply the fixes. Human writing, concretely:

- **Vary sentence length on purpose (burstiness).** Follow a long, clause-heavy sentence with a short one. Then maybe a fragment. It reads like breathing. This is the single biggest difference between human and model prose.
- **Use contractions.** "It's", "doesn't", "won't". Unless the surrounding voice is formal. Then match it.
- **Be concrete.** Not "performance improved significantly" but "the build dropped from 40 seconds to 6."
- **React instead of reporting.** Don't neutrally list facts; have a response. "I expected this to be slow. It wasn't." Neutral listing is what a wiki does.
- **Admit uncertainty in plain words.** "I'm not sure why this works", "need to test this on CI". Not "further investigation may be warranted."
- **Use first person where it's natural.** "I hit this on a Friday", "we tried X". The site is one person's notes.
- **Let one idea breathe per sentence.** If you used "and" three times in a sentence, split it.
- **Keep David's voice rules.** Short sentences, bullets and tables over paragraphs, curious not authoritative, 1–2 light humorous asides per article (sparing), cross-link by number, no "tbd", no AI attribution, no employer mentions.

The house style already leans short-and-bulleted. Humanizing doesn't mean making it longer or chattier. It means the sentences that *are* prose should sound written, not assembled.

## Step 3 — Re-read the rewrite

Revision can overshoot. Before you call it done, check:

- **Did I make something falsely definite?** "Experiments suggest" became "this is how it works" is a lie. Keep the hedge if the evidence is thin.
- **Did I strip needed nuance or evidence?** Cutting "significantly" is good. Cutting the number that backed it up is not.
- **Did I invent a concrete detail?** Don't replace "performance improved" with made-up timings. If the draft lacks the number, leave a marker or ask — never fabricate specifics to sound human.
- **Did I break the author's voice rules?** An article that now reads like a chatty newsletter is also wrong.
- **Read it aloud in your head.** Where you stumble, a reader stumbles.

## Quick self-check before returning prose

- Sentence lengths vary. There's at least one short one.
- No "not X, but Y" construction survives.
- No faux-insight opener.
- Em dash count is low (roughly one per article section, not one per paragraph).
- Every abstract word either got concrete or got cut.
- Every cited claim has a source, or got downgraded to a plain opinion.
- Straight quotes, per the file.
