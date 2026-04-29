import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cansutecimer.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
});
