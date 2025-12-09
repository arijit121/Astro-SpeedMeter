// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  site: 'https://speedmeter.example.com',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()],

  adapter: node({
    mode: 'standalone'
  })
});