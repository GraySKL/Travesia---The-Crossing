// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://travesia.example.org', // update once domain is set
  trailingSlash: 'never',
  // No i18n routing: the UI chrome is English (English-first players); Spanish
  // lives INSIDE the story content as the learning material, surfaced via gloss.
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      // Service worker is for OFFLINE CACHING ONLY. It must never call home.
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2,json}'],
        navigateFallback: '/offline',
        cleanupOutdatedCaches: true
      },
      manifest: false, // hand-written manifest in /public
      injectRegister: 'auto'
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true
    }
  }
});
