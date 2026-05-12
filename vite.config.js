import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssMinify: false,

    assetsInlineLimit: Infinity,

    lib: {
      entry: 'index.js',
      formats: ['es'],
      name: 'usagi',
      fileName: 'usagi',
      cssFileName: 'usagi',
    }
  }
});