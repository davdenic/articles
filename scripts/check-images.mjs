// QA: verify every image referenced in an article exists on disk,
// and warn on oversized images. Runs against source markdown so it
// catches problems in drafts too (before they flip to live).
//
// Fails (exit 1) when a referenced local image is missing.
// Warns (no failure) when an image exceeds WARN_BYTES.

import { readFileSync, statSync, existsSync } from 'node:fs';
import { readdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';

const ARTICLES_DIR = 'src/content/articles';
const WARN_BYTES = 500 * 1024; // 500 KB

// Matches ![alt](path) and, for safety, HTML <img src="path">.
const MD_IMG = /!\[[^\]]*\]\(([^)]+)\)/g;
const HTML_IMG = /<img[^>]*\ssrc=["']([^"']+)["']/g;

/** Recursively collect all index.md files under the articles dir. */
function findArticles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...findArticles(full));
    else if (entry.name === 'index.md') out.push(full);
  }
  return out;
}

/** Remove fenced code blocks and inline code spans — image syntax
 *  inside them is documentation, not a real embed. */
function stripCode(src) {
  return src
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '');
}

/** Pull local image references out of a markdown source string. */
function extractLocalImages(rawSrc) {
  const src = stripCode(rawSrc);
  const refs = [];
  for (const re of [MD_IMG, HTML_IMG]) {
    let m;
    while ((m = re.exec(src)) !== null) {
      let ref = m[1].trim().split(/\s+/)[0]; // drop optional "title"
      if (/^https?:\/\//i.test(ref) || ref.startsWith('data:')) continue;
      refs.push(ref);
    }
  }
  return refs;
}

const errors = [];
const warnings = [];

for (const file of findArticles(ARTICLES_DIR)) {
  const src = readFileSync(file, 'utf8');
  const base = dirname(file);
  for (const ref of extractLocalImages(src)) {
    const target = resolve(base, ref);
    if (!existsSync(target)) {
      errors.push(`${file}: missing image "${ref}"`);
      continue;
    }
    const bytes = statSync(target).size;
    if (bytes > WARN_BYTES) {
      warnings.push(`${file}: "${ref}" is ${Math.round(bytes / 1024)} KB (> 500 KB)`);
    }
  }
}

for (const w of warnings) console.warn(`warning: ${w}`);

if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`);
  console.error(`\nImage check failed: ${errors.length} missing image(s).`);
  process.exit(1);
}

console.log(`Image check passed (${warnings.length} warning(s)).`);
