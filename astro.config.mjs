import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://rimba-maker.github.io',
  base: '/little-sprout-preschool',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
  ],
});
