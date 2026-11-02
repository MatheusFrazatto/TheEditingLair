/** The public repository; its Issues are where problems and requests go. */
export const repo = 'MatheusFrazatto/TheEditingLair';
export const repoUrl = `https://github.com/${repo}`;

/** Downloads served from this repository's Releases, which GitHub counts. */
export const isReleaseDownload = (url: string) => url.startsWith(`${repoUrl}/releases/download/`);

/** A new problem report, with the plugin and version filled in when known. */
export function reportUrl(plugin?: { title: string; version: string }): string {
  if (!plugin) return `${repoUrl}/issues/new/choose`;
  const params = new URLSearchParams({
    template: 'problem.yml',
    title: `[${plugin.title} ${plugin.version}] `,
    plugin: plugin.title,
    version: plugin.version,
  });
  return `${repoUrl}/issues/new?${params}`;
}
