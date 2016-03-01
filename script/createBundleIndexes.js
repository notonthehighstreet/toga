'use strict';

require('babel-core/register');
const glob = require('glob');
const webpack = require('webpack');
const createWebpackConfig = require('../lib/lib/jsBundler/webpack/createConfig');
const logger = require('../lib/lib/logger');
const shell = require('shelljs');
const webpackBundleIndexesRecordPath = require('../lib/constants').webpackBundleIndexesRecordPath;

glob('./components/**/index.js', (err, files) => {
  let compiler;
  let webpackConfig;

  shell.rm(webpackBundleIndexesRecordPath);
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
  });
});
