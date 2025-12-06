import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

// TODO: Configure prerendering for SEO - requires prerender entry script setup
// See: https://github.com/preactjs/preset-vite#prerendering

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
