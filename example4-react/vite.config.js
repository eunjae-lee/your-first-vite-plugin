import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs/promises';
import path from 'path';

function myPlugin() {
  return {
    name: 'example4-react',
    transform(source, id) {
      if (id.endsWith('.abc')) {
        return `export default () => ${JSON.stringify(source)}`;
      }
    },
  };
}

function myPlugin2() {
  return {
    name: 'example4-react-2',
    enforce: 'pre',
    resolveId(id) {
      if (id.endsWith('.user')) {
        return id + '.jsx';
      }
    },
    async load(id) {
      if (id.endsWith('.user.jsx')) {
        const filePath = path.resolve('./src', id.replace(/\.jsx$/, ''));
        return (await fs.readFile(filePath)).toString();
      }
    },
    transform(source, id) {
      if (id.endsWith('.user.jsx')) {
        const user = JSON.parse(source);
        return `
          export default () => (
            <div>
              <p>name: ${user.name}</p>
              <ul>
                ${user.fruits.map((fruit) => `<li>${fruit}</li>`).join('')}
              </ul>
            </div>
          )
        `;
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [myPlugin(), myPlugin2(), react()],
});
