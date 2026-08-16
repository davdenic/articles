import { getCollection } from 'astro:content';

// llms.txt — a plain-text index of the site for LLMs / AI search.
// Shipped as a low-cost GEO signal (see the ART-16 decision); not sold as
// "the reason" for AI visibility.
const SITE = 'https://davdenic.github.io';
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export async function GET() {
  const articles = (await getCollection('articles'))
    .filter((a) => !a.data.draft)
    .sort((a, b) => (b.data.published?.valueOf() ?? 0) - (a.data.published?.valueOf() ?? 0));

  const lines = [
    '# David Denicolò — Articles',
    '',
    '> Articles on AI-assisted software development, TYPO3, and web engineering. Author: David Denicolò, full-stack developer in Switzerland.',
    '',
    '## Articles',
    ...articles.map((a) => {
      const url = `${SITE}${base}/${a.id.replace(/^\d+-/, '')}/`;
      const desc = a.data.description ? `: ${a.data.description}` : '';
      return `- [${a.data.title}](${url})${desc}`;
    }),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
