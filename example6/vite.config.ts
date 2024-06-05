import fs from 'fs/promises';
import ts from 'typescript';
import { defineConfig } from 'vite';

const MACRO_MODULE_ID = '@macro';

type MacroFactories = Record<string, () => any | Promise<any>>;
type MacroOptions = { dts?: string };

function macro(factories: MacroFactories, options: MacroOptions = {}) {
  return {
    name: 'macro',
    resolveId(source: string) {
      if (source === MACRO_MODULE_ID) {
        return source;
      }
    },
    async load(id: string) {
      if (id === MACRO_MODULE_ID) {
        const ret: Record<string, any> = {};
        for (const key of Object.keys(factories)) {
          let result = factories[key]();
          if (result instanceof Promise) {
            result = await result;
          }
          ret[key] = result;
        }
        const code = Object.keys(ret)
          .map((key) => `export const ${key} = ${JSON.stringify(ret[key])}`)
          .join('\n\n');

        const dts = `
declare module "${MACRO_MODULE_ID}" {
${generateDts(code)
  .trim()
  .split('\n')
  .map((line: string) => `  ${line}`)
  .join('\n')}
}
`;
        await fs.writeFile(options.dts ?? 'macro.d.ts', dts);
        return code;
      }
    },
  };
}

function generateDts(code: string) {
  const FAKE_INPUT = 'fake.ts';
  const FAKE_OUTPUT = 'fake.d.ts';
  const options = {
    allowJs: true,
    declaration: true,
    emitDeclarationOnly: true,
  };
  const createdFiles: Record<string, string> = {};
  const host = ts.createCompilerHost(options, true);
  host.writeFile = (fileName, contents) => {
    return (createdFiles[fileName] = contents);
  };
  const backupReadFile = host.readFile.bind(host);
  host.readFile = (fileName) => {
    if (fileName === FAKE_INPUT) {
      return code;
    } else {
      return backupReadFile(fileName);
    }
  };

  const program = ts.createProgram([FAKE_INPUT], options, host);
  program.emit();

  return createdFiles[FAKE_OUTPUT];
}

export default defineConfig({
  build: { minify: false },
  plugins: [
    macro(
      {
        users: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                { id: 1, name: 'Alice' },
                { id: 2, name: 'Bob' },
              ]);
            }, 1000);
          });
        },
        timestamp: () => new Date().toISOString(),
      },
      // { dts: "macro.d.ts" }
    ),
  ],
});
