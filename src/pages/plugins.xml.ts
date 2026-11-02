import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPlugins } from '../lib/content';
import { withBase } from '../lib/url';

// One item per release, newest first; each links to its changelog entry.
export async function GET(context: APIContext) {
  const plugins = await getPlugins();
  const items = plugins
    .flatMap((plugin) =>
      plugin.data.changelog.map((entry) => ({
        title: `${plugin.data.title} ${entry.version}`,
        description: entry.notes,
        pubDate: entry.date,
        link: withBase(`plugins/${plugin.id}/#v${entry.version}`),
      })),
    )
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'The Editing Lair: Plugin updates',
    description: 'New DaVinci Resolve plugins and new versions of the ones on the shelf.',
    site: new URL(withBase(''), context.site).href,
    items,
  });
}
