module.exports = (deps) => {
  return function runWebpack(webpackOptions) {
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
      if (webpackOutput.compilation && Array.isArray(webpackOutput.compilation.warnings)) {
        webpackOutput.compilation.warnings.forEach(warning => log(warning));
      }
    }

    function run() {
      const webpackConfig = createWebpackConfig(webpackOptions);
      log(webpackConfig);
      const compiler = webpack(webpackConfig);
      const runner = promisify(compiler.run.bind(compiler));
      return runner().then(outputWebpackErrors);
    }

    return queue(run);
  };
};
