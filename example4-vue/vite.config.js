import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

function myPlugin() {
  return {
    name: 'example4-vue',
    transform(source, id) {
      if (id.endsWith('.def')) {
        return `<template>${source}</template>`;
      } else if (id.endsWith('.user')) {
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
      }
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
