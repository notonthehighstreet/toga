module.exports = (deps) => {
  return function runWebpack({
    modulePaths, externals, minify, componentFiles, filename, bundleName
  } = {}) {
    const {
      'es6-promisify': promisify,
      'webpack': webpack,
      '/lib/webpack/queue': queue,
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
    }

    function run() {
      const webpackConfig = createWebpackConfig({
        modulePaths, externals, minify, componentFiles, filename, bundleName
      });
      log(webpackConfig);
      const compiler = webpack(webpackConfig);
      const runner = promisify(compiler.run.bind(compiler));
      return runner().then(outputWebpackErrors);
    }

    return queue(run);
  };
};
