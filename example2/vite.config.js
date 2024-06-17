import { defineConfig } from 'vite';

// https://jsonplaceholder.typicode.com/users

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
