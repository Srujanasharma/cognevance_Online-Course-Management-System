import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const githubPagesBase = '/cognevance_Online-Course-Management-System/';

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? githubPagesBase : '/',
  plugins: [
    react(),
    {
      name: 'github-pages-spa-fallback',
      closeBundle() {
        const outputDir = resolve(import.meta.dirname, 'dist');
        copyFileSync(resolve(outputDir, 'index.html'), resolve(outputDir, '404.html'));
      },
    },
  ],
});
