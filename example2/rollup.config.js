function myPlugin() {
  return {
    name: 'example2',
    resolveId(source) {
      if (source === 'my-random-virtual-module') {
        // let me handle this `my-random-virtual-module` module by myself!
        return source;
      }
    },
    load(id) {
      if (id === 'my-random-virtual-module') {
        return 'export default "This is a virtual module!"';
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
