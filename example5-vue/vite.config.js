import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const transformUserFile = (source) => {
  const user = JSON.parse(source);
  return `
          <template>
            <div>
              <p>name: ${user.name}</p>
              <ul>
                ${user.fruits
                  .map(
                    (fruit) => `
                  <li>${fruit}</li>
                `,
                  )
                  .join('')}
              </ul>
            </div>
          </template>
        `;
};

function myPlugin() {
  return {
    name: 'example4-vue',
    transform(source, id) {
      if (id.endsWith('.def')) {
        return `<template>${source}</template>`;
      } else if (id.endsWith('.user')) {
        return transformUserFile(source);
      }
    },
    async handleHotUpdate(ctx) {
      if (!ctx.file.endsWith('.user')) return;

      // implementation #1
      ctx.server.ws.send({ type: 'full-reload' });

      // or

      // implementation #2
      // const defaultRead = ctx.read;
      // ctx.read = async function (...args) {
      //   return transformUserFile(await defaultRead());
      // };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    myPlugin(),
    vue({
      include: [/\.vue$/, /\.abc$/, /\.def$/, /\.user$/],
    }),
  ],
  build: { minify: false },
});
