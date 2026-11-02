import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Plugin types. Add a new value here when a new kind of tool ships;
 * labels live in src/lib/plugin-types.ts.
 */
export const pluginTypes = [
  'fusion-macro',
  'fusion-template',
  'script',
  'dctl',
  'lut',
  'powergrade',
] as const;

// Free items download directly. Paid items never host the file here:
// they point to an external storefront that handles payment and delivery.
const access = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('free'),
    /** Path under /public (e.g. "downloads/glow-kit/GlowKit.setting") or a full URL (e.g. a GitHub Release asset). */
    download: z.string(),
    fileName: z.string().optional(),
    fileSize: z.string().optional(),
  }),
  z.object({
    kind: z.literal('paid'),
    price: z.string(),
    storeUrl: z.url(),
    storeName: z.string().optional(),
  }),
]);

const plugins = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/plugins' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(160),
      type: z.enum(pluginTypes),
      version: z.string(),
      released: z.coerce.date(),
      updated: z.coerce.date().optional(),
      compatibility: z.object({
        resolve: z.string(),
        edition: z.enum(['free', 'studio']).default('free'),
        os: z.array(z.enum(['windows', 'macos', 'linux'])).default(['windows', 'macos', 'linux']),
      }),
      access,
      /** Exposed controls and their defaults; drawn as the annotated figure on the home sheet. */
      controls: z.array(z.object({ name: z.string(), default: z.string() })).default([]),
      cover: image().optional(),
      /** The same frame without the effect; turns the cover on the plugin page into a before/after comparison. */
      coverOriginal: image().optional(),
      coverAlt: z.string().optional(),
      /** Brightness of the black-and-white cover at rest; raise it for dark images (e.g. 2 for a red-on-black frame). */
      coverBrightness: z.number().min(0.5).max(3).default(1),
      /** A short silent loop of the effect: video path under /public, its first frame as the poster, and where the footage comes from. */
      preview: z
        .object({ video: z.string(), poster: image(), credit: z.string().optional() })
        .optional(),
      video: z.url().optional(),
      tags: z.array(z.string()).default([]),
      changelog: z
        .array(z.object({ version: z.string(), date: z.coerce.date(), notes: z.string() }))
        .default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200),
      published: z.coerce.date(),
      updated: z.coerce.date().optional(),
      category: z.enum(['curiosity', 'tool', 'tutorial', 'news']),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      relatedPlugins: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { plugins, posts };
