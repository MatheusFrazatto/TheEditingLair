import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/content';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'The Editing Lair: Notes',
    description: 'Editing curiosities, tools worth knowing and short DaVinci Resolve tutorials.',
    site: new URL(withBase(''), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.published,
      link: withBase(`notes/${post.id}/`),
    })),
  });
}
