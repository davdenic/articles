---
id: doc-2
title: Article writing style
type: other
created_date: '2026-08-16 16:35'
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

Diagrams carry the same personality as the prose: hand-drawn, unfussy, a bit
playful.

- **Comic / hand-drawn look.** Simple line art, few elements, slightly loose
  strokes. No gradients, no 3D, no stock-diagram polish.
- **White background.** Always. It reads fine on both light and dark themes, so
  no theme-specific variants are needed.
- **Handwriting font for any text in the image.** Never a system sans/serif for
  labels or captions inside a diagram — it must look handwritten. In an SVG the
  font has to be **embedded** as a base64 `@font-face` (page fonts don't reach a
  font used inside an `<img>`-loaded SVG), so pick an OFL handwriting/comic face
  (e.g. Caveat, Comic Neue) and inline a subset. Alternatively convert the text
  to paths.
- **Wide by default.** Author landscape at a wide aspect so the diagram fills the
  reading column — SVG `viewBox` width **≥ 1200** (raster ≥ 1200px wide).
- Co-locate beside `index.md` as `./name.svg`, reference relatively, and always
  write descriptive alt text.
- Format: prefer **SVG** (crisp, tiny, scalable). Keep each diagram to one idea.

## Scope

- Applies to **new articles and future edits** — prose and images alike.
- **Do not retrofit** the published articles `0001-hello-world` and
  `0002-foundations-of-ai-assisted-software-development` — they stay as they are.
