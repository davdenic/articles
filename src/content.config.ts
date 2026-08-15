import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each article is a folder: src/content/articles/NNNN-slug/index.md
// Images live beside index.md in the same folder (co-located).
const articles = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Sole author of the site; override per-article only if ever needed.
    author: z.string().default('David Denicolo'),
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
