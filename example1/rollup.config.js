function myPlugin() {
  return {
    name: 'example1',
    transform(source, id) {
      if (id.endsWith('main.js')) {
        return source.replaceAll(
          'process.env.NODE_ENV',
          JSON.stringify('production'),
        );
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
