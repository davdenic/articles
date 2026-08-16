import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export async function GET(context) {
  const articles = (await getCollection('articles'))
    .filter((a) => !a.data.draft)
    .sort((a, b) => (b.data.published?.valueOf() ?? 0) - (a.data.published?.valueOf() ?? 0));

  return rss({
    title: 'David Denicolò — Articles',
    description:
      'Articles on AI-assisted software development, TYPO3, and web engineering.',
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description ?? '',
      pubDate: a.data.published,
      link: `${base}/${a.id.replace(/^\d+-/, '')}/`,
    })),
  });
}
