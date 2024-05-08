function myPlugin() {
  return {
    name: 'example1',
    transform(source, id) {
      if (id.endsWith('some-lib.js')) {
        return source.replace('Hello', 'Hello World');
      }
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
