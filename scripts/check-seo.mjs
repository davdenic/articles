// QA: warn (do not fail) when an article is missing key SEO signals, so
// gaps are visible before publish. Consistent with the image-size warnings.
//
// Warns when an article has:
//   - no frontmatter `description` (a derived fallback will be used), or
//   - no resolvable share image (no `image` field and no local image in the
//     body → the site-default OG image will be used).

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ARTICLES_DIR = 'src/content/articles';

function findArticles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findArticles(full));
    else if (entry.name === 'index.md') out.push(full);
  }
  return out;
}

function splitFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : { fm: '', body: src };
}

const warnings = [];

for (const file of findArticles(ARTICLES_DIR)) {
  const { fm, body } = splitFrontmatter(readFileSync(file, 'utf8'));

  const hasDescription = /^description:\s*["']?\S/m.test(fm);
  if (!hasDescription) warnings.push(`${file}: no frontmatter "description" (a derived fallback will be used)`);

  const hasImageField = /^image:\s*["']?\S/m.test(fm);
  const hasLocalImage = /!\[[^\]]*\]\(\.\/[^)\s]+/.test(body);
  if (!hasImageField && !hasLocalImage) {
    warnings.push(`${file}: no share image (no "image" field, no local image in body → site default will be used)`);
  }
}

for (const w of warnings) console.warn(`warning: ${w}`);
console.log(`SEO check passed (${warnings.length} warning(s)).`);
