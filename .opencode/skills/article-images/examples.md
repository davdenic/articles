# Article images: worked examples

Real prompts that produced images now on the site, with what worked and what had to change. Use them as starting points; keep the fixed style lines from `SKILL.md` word for word.

Two variants exist:

- **Scene:** a small illustrated moment. Uses the standard template in `SKILL.md`.
- **Diagram:** a workflow graph with boxes and arrows. Uses the diagram template below.

## Diagram template

Same fixed style block, adjusted for boxes and arrows. Attach `src/content/articles/0002-foundations-of-ai-assisted-software-development/redo-loop.png` as the style reference.

```text
Hand-drawn diagram in dark charcoal ink and colored pencil on white paper,
in the style of the attached reference image (flat pastel boxes, ink outlines,
hand-drawn arrows).
Confident, slightly wobbly ink outlines. Colored-pencil hatching with visible
strokes in light blue, green, orange and yellow, plus pastel purple and pink for
boxes. No gradients, no 3D, no shadows, no photorealism. Lots of white space.

Scene: [what the diagram shows, in one sentence].

[Graph 1] ([box colour]): [boxes and arrows, left to right, one sentence each].

[Graph 2, optional] ([box colour]): [boxes and arrows].

Elements: at most [N] boxes in total, keep it sparse.
Focal point: [the box or boxes that carry the point].
Emphasis: small yellow sparkle ticks around [focal box].
Text in the image (handwritten, exactly as written): [label under box A],
[label under box B]. No other text.

Landscape, wide format, about 1.9:1. No logos, no brand names, no watermark,
no extra text.
```

## Example 1: diagram, side-by-side comparison

Article: `0020-world-models`, file `next-word-vs-next-state.jpg`. Shows how an LLM predicts the next word and a world model predicts the next state.

```text
Hand-drawn diagram in dark charcoal ink and colored pencil on white paper,
in the style of the attached reference image (flat pastel boxes, ink outlines,
hand-drawn arrows).
Confident, slightly wobbly ink outlines. Colored-pencil hatching with visible
strokes in light blue, green, orange and yellow, plus pastel purple and pink for
boxes. No gradients, no 3D, no shadows, no photorealism. Lots of white space.

Scene: two small workflow graphs side by side, separated by a thin hand-drawn
vertical line.

Left graph (pastel blue boxes): a row of two small word boxes filled with
scribbled squiggle lines. An arrow leads into one rounded box with a tiny gear
icon. An arrow leads out to one new word box, also filled with squiggles and
highlighted in yellow. A thin curved arrow loops from the new word box back to
the start of the row.

Right graph (pastel green boxes): two input boxes stacked. The top one holds a
small abstract grid of 3x3 dots with two coloured shapes on it (an orange circle
and a blue square). The bottom one holds a single bold arrow. Both feed with
arrows into one rounded box with a tiny gear icon. From that box, three thin
dashed arrows fan out to three small grids: the same grid with the shapes moved
to different positions in each. Two of these grids are drawn faint and dashed,
like ghosts. One is drawn solid and highlighted in yellow. A thin curved arrow
loops from the solid grid back to the top input box.

Elements: at most 10 boxes in total, keep it sparse.
Focal point: the two highlighted outputs, the new word box on the left and the
solid grid on the right.
Emphasis: small yellow sparkle ticks around both highlighted outputs.
Text in the image (handwritten, exactly as written): "next word" under the left
highlighted box, "state" under the top right input, "action" under the bottom
right input, "next state" under the solid grid. No other text.

Landscape, wide format, about 1.9:1. No logos, no brand names, no watermark,
no extra text.
```

What we learned:

- **Abstract beats literal for concepts.** The first draft drew the article's running example (a cat pushing a glass) inside the diagram. David rejected it: the example was already used in three images. Abstract shapes on a grid carried the idea better.
- **Ghost outputs show "possible futures".** Faint dashed copies next to one solid, highlighted result read instantly as "tried several, picked one".
- **Loop arrows show repetition** (word after word, step after step) without extra text.
- **Count the boxes.** The first version had 11 boxes against a limit of 10; trim inputs, not outputs.
- **Generators drift on details.** The highlighted grid came out 2x3 instead of 3x3. Fix with "same image, the highlighted grid also 3x3 dots" rather than editing by hand.

## Example 2: scene with a running character and a film joke

Article: `0020-world-models`, file `terminator-cat.jpg`. The article's recurring orange tabby cat as a half-robot, nodding to the Terminator films.

```text
Hand-drawn illustration in dark charcoal ink and colored pencil on white paper,
in the style of the attached reference images.
Confident, slightly wobbly ink outlines. Colored-pencil hatching with visible
strokes in light blue, green, orange and yellow. No gradients, no 3D, no shadows,
no photorealism. Lots of white space, one clear focal point.

Scene: the same orange tabby cat sits on a wooden table next to a full glass of
water. Half of its face has no fur and shows a shiny grey metal robot skull,
and that eye glows red. A small hand-drawn list floats next to its head like a
robot's on-screen menu, with three options to choose from.
Elements (max 4): the half-robot cat, the glass of water near the table edge,
the floating options list, one raised metal paw.
Focal point: the cat's glowing red eye, slightly off-centre.
Emphasis: small yellow sparkle ticks around the raised paw, a dashed line from
the paw to the glass.
Text in the image (handwritten, exactly as written): "PUSH" "PUSH" "ALSO PUSH"

Landscape, wide format, about 1.9:1. No logos, no brand names, no watermark,
no extra text.
```

What we learned:

- **A recurring character ties an article together.** "The same orange tabby cat" keeps every image in one family. Attach an earlier image of the character as an extra reference.
- **Describe the trope, not the film.** "Metal robot skull, glowing red eye" gets the joke across without copying a character, actor or logo.
- **The joke lives in the text.** Three identical options ("PUSH", "PUSH", "ALSO PUSH") parody a robot's decision menu in four words.
- **One accent colour outside the palette is fine** (red for the eye) when it carries the point.

## Example 3: hero scene

Article: `0020-world-models`, file `hero.jpg` (shipped as JPEG; the prompt was written for `hero.png`). Introduces the running example and the recurring cat.

```text
Hand-drawn illustration in dark charcoal ink and colored pencil on white paper,
in the style of the attached reference images.
Confident, slightly wobbly ink outlines. Colored-pencil hatching with visible
strokes in light blue, green, orange and yellow. No gradients, no 3D, no shadows,
no photorealism. Lots of white space, one clear focal point.

Scene: an orange tabby cat sits on a wooden table and calmly pushes a glass of
water towards the edge with one paw, looking straight at the viewer.
Elements (max 4): cat, small wooden table, glass of water, dashed line.
Focal point: the paw touching the glass, slightly off-centre.
Emphasis: a light-blue dashed arc showing where the glass will fall, ending in a
small splash on the floor; small yellow sparkle ticks around the glass.
Text in the image (handwritten, exactly as written): none.

Landscape, wide format, about 1.9:1. No logos, no brand names, no watermark,
no extra text.
```

What we learned:

- **A dashed arc can carry the article's idea.** It shows a prediction ("where the glass will fall") without any text.
- **The hero defines the character.** Later prompts say "the same orange tabby cat" and attach this image.

## Example 4: follow-up in the same chat

Article: `0020-world-models`, file `two-pills.jpg`. Written as a follow-up message in the image tool's chat, right after the hero, so it refers to "the previous" image instead of attached references.

```text
now draw two pawns of the orange cat that are giving two pills one red and one blue.
like in the matrix movie

Hand-drawn illustration in dark charcoal ink and colored pencil on white paper,
in the style of the previous
Confident, slightly wobbly ink outlines. Colored-pencil hatching with visible
strokes in orange, light blue and red. No gradients, no 3D, no shadows,
no photorealism. Lots of white space, one clear focal point.

Scene: a classic "choose one of two pills" moment, seen from the viewer's point
of view. Two orange tabby cat paws reach towards the viewer from the top edge of
the frame, palms up like open hands, soft pink paw pads visible. The left paw
holds one small glossy blue pill, the right paw holds one small glossy red pill.
Only the paws and forearms are visible, no body, no face.
Elements (max 4): left paw, right paw, blue pill, red pill.
Focal point: the two pills, centred between the paws.
Emphasis: a few small yellow sparkle ticks around each pill.
Text in the image (handwritten, exactly as written): none.
```

What we learned:

- **Follow-ups in the same chat keep the style** even with "in the style of the previous" instead of attachments.
- **The palette can be narrowed per image** (orange, light blue, red here) when the colours carry the meaning.
- **Name the scene, not the film.** "A classic choose-one-of-two-pills moment" gets the reference across with no film imagery.
- **This prompt has no format line.** Add "Landscape, wide format, about 1.9:1. No logos, no brand names, no watermark, no extra text." so the crop to 1200 x 630 doesn't cut the paws.

## Post-processing notes from real files

| File | Source size | Steps |
| --- | --- | --- |
| `next-word-vs-next-state.jpg` | 1733 x 910 | inline image, no crop: `--resampleWidth 1200`, then JPEG at 82 |
| `terminator-cat.jpg` | 1424 x 752 (narrower than 1.9:1) | `--resampleWidth 1200` first, then crop to 1200 x 630, JPEG at 82 |
| `three-glasses.jpg` | 1733 x 908 (wider than 1.9:1) | `--resampleHeight 630`, then crop to 1200 x 630, JPEG at 82 |

Check the source ratio before choosing: scaling by height on a narrower image leaves it under 1200 wide.

## Rules of thumb

- Don't reuse the same visual example across more than two images in one article.
- When David corrects an idea, drop it everywhere and build on his version.
- Two to four variants per prompt, at most three rounds; then change the idea, not the wording.
- Record every new prompt that ships in this file, with what had to change.
