import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

async function getCurrentGitBranch() {
  return (await execPromise('git rev-parse --abbrev-ref HEAD')).stdout.trim();
}

function myPlugin() {
  return {
    name: 'example2',
    resolveId(source) {
      if (source === 'current-git-branch') {
        // let me handle this `current-git-branch` module by myself!
        return source;
      }
    },
    async load(id) {
      if (id === 'current-git-branch') {
        const branch = await getCurrentGitBranch();
        return `export default "${branch}"`;
      }
      return null;
    },
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
