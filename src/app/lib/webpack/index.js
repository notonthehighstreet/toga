module.exports = (deps) => {
  return function runWebpack(webpackOptions) {
    const {
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

    const webpackConfig = createWebpackConfig(webpackOptions);
    log(webpackConfig);
    const runner = () => new Promise((resolve, reject) => {
      webpack(webpackConfig).run((err, stats) => {
        return err
          ? reject(err)
          : resolve(stats);
      });
    });

    return runner().then(outputWebpackErrors);
  };
};
