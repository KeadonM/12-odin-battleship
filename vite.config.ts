/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root,
  base: '/12-odin-battleship',
  test: {
    globals: true,
  },
  build: {
    outDir,
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      output: {
        comments: false,
      },
    },
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
      },
    },
  },
});
