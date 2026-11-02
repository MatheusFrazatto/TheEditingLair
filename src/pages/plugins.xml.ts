import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getUpdates } from '../lib/updates';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
  const updates = await getUpdates();
  return rss({
    title: 'The Editing Lair: Plugin updates',
    description: 'New DaVinci Resolve plugins and new versions of the ones on the shelf.',
    site: new URL(withBase(''), context.site).href,
    items: updates.map((u) => ({ title: u.title, description: u.notes, pubDate: u.date, link: u.link })),
  });
}
