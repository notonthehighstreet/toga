module.exports = (deps) => {
  return function runWebpack({ isoPlugin, modulePaths, mapPath, externals, minify, outputFileSystem } = {}) {
    const {
      'es6-promisify': promisify,
      'webpack': webpack,
      '/lib/webpack/createWebpackConfig': createWebpackConfig,
      debug
    } = deps;

    const log = debug('toga:runWebpack');

    function outputWebpackErrors(webpackOutput) {
      if (!webpackOutput) {
        return;
      }
      if (webpackOutput.compilation && Array.isArray(webpackOutput.compilation.errors)) {
        webpackOutput.compilation.errors.forEach(error => log(error));
      }
      if (webpackOutput.compilation && Array.isArray(webpackOutput.compilation.warnings)) {
        webpackOutput.compilation.warnings.forEach(warning => log(warning));
      }
    }

    function run() {
      const webpackConfig = createWebpackConfig({ isoPlugin, modulePaths, mapPath, externals, minify });
      const compiler = webpack(webpackConfig);
      compiler.outputFileSystem = outputFileSystem;
      const runner = promisify(compiler.run.bind(compiler));
      return runner().then(outputWebpackErrors);
    }

    return run();
  };
};
