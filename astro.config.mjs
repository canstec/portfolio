import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cansutecimer.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Kept out of the sitemap: the review deck (shared by direct link only) and the blank case-study template.
  integrations: [sitemap({ filter: (page) => !page.includes('/review/') && !page.includes('/portfolio/new-project/') })],
});