import { defineConfig } from 'vite';

const MODULE_ID = 'my-build-time-library';

function buildTimeLibrary(factories) {
  return {
    name: 'build-time-library',
    resolveId(source) {
      if (source === MODULE_ID) {
        return source;
      }
    },
    async load(id) {
      if (id === MODULE_ID) {
        const mod = {};
        for (const key of Object.keys(factories)) {
          let result = factories[key]();
          if (result instanceof Promise) {
            result = await result;
          }
          mod[key] = result;
        }

        const code = Object.keys(mod)
          .map(
            (key) => `
          export const ${key} = ${JSON.stringify(mod[key])}
        `,
          )
          .join('\n\n');

        return code;
      }
    },
  };
}

export default defineConfig({
  plugins: [
    buildTimeLibrary({
      usernames: async () => {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );
        const json = await response.json();
        return json.map((user) => user.username);
      },
      builtAt: () => new Date().toISOString(),
    }),
  ],
  build: { minify: false },
});
