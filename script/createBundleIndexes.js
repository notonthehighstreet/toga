'use strict';

require('babel-core/register');
const breadboard = require('breadboard');
const debug = require('debug')('toga:createBundleIndexes');
const debugError = require('debug')('toga:createBundleIndexes:error');
const createBundleIndexes = (deps) => {
  return () => {
    return new Promise((resolve, reject) => {
      const glob = deps.glob;
      const webpack = deps.webpack;
      const path = deps.path;
      const createWebpackConfig = deps['/lib/jsBundler/webpack/createConfig'];
      const getLogger = deps['/logger'];
      const shell = deps['shelljs'];
      const webpackBundleIndexesRecordPath = deps['/constants'].webpackBundleIndexesRecordPath;
      const logger = getLogger();

      glob('./components/!**!/index.js', (err, files) => {
        let compiler;
        let webpackConfig;

        shell.rm(path.join(process.cwd(), webpackBundleIndexesRecordPath));
        webpackConfig = createWebpackConfig({
          modulePaths: files,
          vendorBundleFileName: 'dummy.js'
        });
        webpackConfig.output = {
          filename: '[name].js',
          path: './tmp'
        };
        webpackConfig.recordsOutputPath = webpackBundleIndexesRecordPath;
        compiler = webpack(webpackConfig);
        compiler.run((compilerErr) => {
          if (compilerErr) {
            logger.error(compilerErr);
            return reject(compilerErr);
          }
          shell.rm('-rf', './tmp');
          resolve();
        });
      });
    });
  };
};
const breadboardOptions = {
  entry: createBundleIndexes,
  containerRoot: 'app',
  blacklist: ['newrelic']
};

breadboard(breadboardOptions)
  .then(() => {
    debug('Bundle indexes created');
    process.exit(0);
  })
  .catch((err) => {
    debugError(err);
    process.exit(1);
  });
