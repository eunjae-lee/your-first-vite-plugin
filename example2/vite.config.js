import { defineConfig } from 'vite';

function buildTimeLibrary() {
  return {
    name: 'example2',
    resolveId(source) {},
    async load(id) {},
  };
}

export default defineConfig({
  plugins: [buildTimeLibrary()],
  build: { minify: false },
});
