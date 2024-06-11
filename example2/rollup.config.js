import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

async function getCurrentGitBranch() {
  return (await execPromise('git rev-parse --abbrev-ref HEAD')).stdout.trim();
}

function myPlugin() {
  return {
    name: 'example2',
    resolveId(source) {},
    async load(id) {},
  };
}

export default {
  plugins: [myPlugin()],
  input: 'src/main.js',
  output: [
    {
      file: 'dist/output.js',
      format: 'es',
    },
  ],
};
