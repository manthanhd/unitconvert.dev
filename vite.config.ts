import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [preact()],
  base: process.env.GITHUB_ACTIONS ? '/unitconvert.dev/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
