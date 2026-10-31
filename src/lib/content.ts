import { getCollection } from 'astro:content';

// Drafts show up in `npm run dev` so you can preview them, and are left out of
// the production build that GitHub Pages serves.
const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

export async function getPlugins() {
  const items = await getCollection('plugins', visible);
  return items.sort((a, b) => b.data.released.valueOf() - a.data.released.valueOf());
}

export async function getPosts() {
  const items = await getCollection('posts', visible);
  return items.sort((a, b) => b.data.published.valueOf() - a.data.published.valueOf());
}
