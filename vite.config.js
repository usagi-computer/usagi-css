import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssMinify: false,

    assetsInlineLimit: Infinity,

    lib: {
      entry: 'styles/kelinci.sass',
      formats: ['es'],
      name: 'kelinci',
    }
  }
});