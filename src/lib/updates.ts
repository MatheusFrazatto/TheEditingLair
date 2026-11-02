import { getPlugins } from './content';
import { withBase } from './url';

/** Every plugin release, newest first; each links to its changelog entry. */
export async function getUpdates() {
  const plugins = await getPlugins();
  return plugins
    .flatMap((plugin) =>
      plugin.data.changelog.map((entry) => ({
        title: `${plugin.data.title} ${entry.version}`,
        plugin: plugin.data.title,
        version: entry.version,
        notes: entry.notes,
        date: entry.date,
        link: withBase(`plugins/${plugin.id}/#v${entry.version}`),
      })),
    )
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}
