export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

export const osLabel = { windows: 'Windows', macos: 'macOS', linux: 'Linux' } as const;

export const categoryLabel = {
  curiosity: 'Curiosity',
  tool: 'Tool',
  tutorial: 'Tutorial',
  news: 'News',
} as const;

/** "18.6+" -> 18.6, used to find the oldest Resolve the shelf supports. */
export function resolveFloor(spec: string): number {
  const m = spec.match(/\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : NaN;
}

export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
