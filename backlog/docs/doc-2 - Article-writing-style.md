---
id: doc-2
title: Article writing style
type: other
created_date: '2026-08-16 16:35'
updated_date: '2026-11-08T08:06:00Z'
---
David's articles are personal essays, not documentation. They should read like a
curious engineer thinking out loud, occasionally cracking a joke. This doc is the
full spec; `CLAUDE.md` carries the short operative version.

## Voice: curious, not authoritative

The reader should come away thinking "here's someone genuinely working this out,"
not "here's an expert lecturing me." Concretely:

- **Ask real questions in the text.** Not rhetorical setups you immediately
  answer — open ones you're actually turning over. "Is that the right trade-off?
  I'm not sure yet." It's fine to leave some unanswered.
- **Show the thinking, not just the conclusion.** Include the doubt, the thing
  that changed your mind, the option you rejected and why.
- **Admit the limits.** Mark what's still open, what you'd want to test, where
  you might be wrong. Reuse the existing "not sure / to research" habit.
- **Be open to changing opinion.** Frame positions as current best guesses, not
  final verdicts. "Ask me again in a year" is a valid ending.
- **Don't teach down.** Explain jargon because it's polite, not to show mastery.
  No "as everyone knows," no "obviously."

The tone is a peer sharing notes from an investigation — deep thoughts, held
loosely.

## Humour: break the rhythm

- **1–2 light asides per article.** Scale to length: a short post gets one, a
  long one maybe two. Not more — this is seasoning, not the meal.
- **Purpose is pacing.** A well-placed quip resets the reader's attention after a
  dense stretch. Use it where the prose starts to feel heavy.
- **Keep it dry and self-aware.** A wink, an honest exaggeration, gentle
  self-deprecation. Then straight back to the point.
- **Never at the reader's or a named person's expense**, and never where it
  undercuts a genuinely serious point.

## Still applies (from before)

- Simple, short sentences. Bullets and tables over paragraphs. Headers to
  structure. Cross-link articles by number.

## Image style

Images carry the same personality as the prose: hand-drawn, unfussy, a bit
playful.

- **Ink + colored pencil on white paper.** Dark charcoal ink outlines, slightly
  wobbly. Colored-pencil hatching with visible strokes in light blue, green,
  orange and yellow (pastel purple and pink for diagram boxes). No gradients,
  no 3D, no shadows, no photorealism.
- **Few elements.** 3–6 elements, one clear focal point, lots of white space.
  Target density is the `0008-atomic-design` hero, not the busier `0019` hero.
- **Handwritten text only**, at most about 6 words, never repeating the title.
- **How they're made:** David generates illustrations and heroes in his own
  image tool from a prompt written with the `article-images` skill, attaching
  the reference images. No hand-drawn SVG illustrations (they never match the
  style) and no external image connectors.
- **SVG only for plain data charts.** Those embed the handwriting font as a
  base64 `@font-face`, use a `viewBox` width of at least 1200, and stay white.
- **Sizes:** hero 1200 × 630; inline images at least 1200 px wide, landscape.
  Keep files under about 500 KB (convert to JPEG if needed).
- Co-locate beside `index.md`, reference relatively, always write alt text
  that describes the scene.

## Scope

- Applies to **new articles and future edits** — prose and images alike.
- **Do not retrofit** the published articles `0001-hello-world` and
  `0002-foundations-of-ai-assisted-software-development` — they stay as they are.

