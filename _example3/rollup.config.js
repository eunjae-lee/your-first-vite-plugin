function myPlugin() {
  return {
    name: 'example3',
    transform(source, id) {
      if (id.endsWith('.whatever')) {
        return `export default {
          type: 'whatever',
          content: ${JSON.stringify(source)}
        }`;
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
