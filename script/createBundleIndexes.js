'use strict';

require('babel-core/register');
const breadboard = require('breadboard');
const createBundleIndexes = (deps) => {
  return function() {
    return new Promise((resolve) => {
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
            return logger.error(compilerErr);
          }
          shell.rm('-rf', './tmp');
          logger.info('Created bundle indexes');
          // @TODO watch components and rebuild
          resolve(0);
        });
      });
    });
  };
};
const breadboardOptions = {
  entry: createBundleIndexes,
  containerRoot: 'lib/toga'
};

breadboard(breadboardOptions)
  .then(process.exit);
