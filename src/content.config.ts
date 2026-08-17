import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each article is a folder: src/content/articles/NNNN-slug/index.md
// Images live beside index.md in the same folder (co-located).
const articles = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Social/OG image: filename of a co-located image to use as the share
    // image. Optional — defaults to the first image in the article, then a
    // site default. See src/pages/[...slug].astro.
    image: z.string().optional(),
    // CSS object-position for the home mosaic card crop. Default anchors left;
    // set e.g. "center" or "50% 30%" when the subject sits elsewhere.
    imagePosition: z.string().optional(),
    // Home mosaic tile size as `WxH` grid spans (columns x rows), in 0.5
    // steps: e.g. "1x1" (default), "2x1" (wide), "1x2" (tall), "2x2" (big),
    // "1.5x1.5". The grid runs at 2x resolution so halves land on real
    // tracks. Over-wide spans are clamped to the grid on narrow screens.
    size: z
      .string()
      .regex(/^\d+(\.5)?x\d+(\.5)?$/, 'size must be like "2x1" or "1.5x1.5"')
      .optional(),
    // Sole author of the site; override per-article only if ever needed.
    author: z.string().default('David Denicolò'),
    // Publishing status: draft = hidden, absent/false = live.
    draft: z.boolean().default(false),
    // Metadata
    version: z.number().default(1),
    published: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    // Changelog: newest first, e.g. "2026-08-15: first publish"
    changelog: z.array(z.string()).default([]),
  }),
});

export const collections = { articles };
