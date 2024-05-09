import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    transform(source, id) {
      if (id.endsWith('.user')) {
        const user = JSON.parse(source);
        return `
          export default () => (
            <div>
              <p>This is coming from .user file!</p>
              <p>${user.name}</p>
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
  esbuild: {
    loader: 'jsx',
    include: [/.*\.jsx$/, /.*\.user$/],
  },
  plugins: [react(), myPlugin(), myPlugin2()],
});
