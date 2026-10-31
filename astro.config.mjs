// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// On GitHub Pages the deploy workflow passes SITE_URL and BASE_PATH
// (e.g. https://user.github.io and /TheEditingLair). Locally both fall back
// to the root, so `npm run dev` works without any setup.
const site = process.env.SITE_URL || 'http://localhost:4321';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'css-variables' },
  },
});
