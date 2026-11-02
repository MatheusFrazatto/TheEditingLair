import { getCollection, type CollectionEntry } from 'astro:content';

// Drafts show up in `npm run dev` so you can preview them, and are left out of
// the production build that GitHub Pages serves.
const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

/** Announced but not out yet: no download, version or release date. */
export const isSoon = (plugin: CollectionEntry<'plugins'>) => plugin.data.access.kind === 'soon';

/** Every plugin, newest release first, with the ones still to come at the end. */
export async function getPlugins() {
  const items = await getCollection('plugins', visible);
  return items.sort((a, b) => {
    if (isSoon(a) !== isSoon(b)) return isSoon(a) ? 1 : -1;
    return (b.data.released?.valueOf() ?? 0) - (a.data.released?.valueOf() ?? 0);
  });
}

/** Only what can be downloaded or bought today. */
export async function getReleased() {
  return (await getPlugins()).filter((p) => !isSoon(p));
}

export async function getPosts() {
  const items = await getCollection('posts', visible);
  return items.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}
