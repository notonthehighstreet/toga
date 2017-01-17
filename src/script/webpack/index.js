const debug = require('debug');
const webpack = require('webpack');
const createWebpackConfig = require('./createWebpackConfig');

const log = debug('toga:runWebpack');

function outputWebpackErrors(stats) {
  if (!stats) {
    return;
  }
  if (stats.compilation && Array.isArray(stats.compilation.errors)) {
    stats.compilation.errors.forEach(error => log(error));
  }
  if (stats.compilation && Array.isArray(stats.compilation.warnings)) {
    stats.compilation.warnings.forEach(warning => log(warning));
  }
  return stats;
}

module.exports = (webpackOptions) => {
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
