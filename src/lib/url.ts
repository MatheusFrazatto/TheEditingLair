/**
 * Prefix an internal path with the site base (needed on GitHub Pages project
 * sites, where the site lives under /<repo>/). External URLs pass through.
 */
export function withBase(path: string): string {
  if (/^[a-z]+:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}
