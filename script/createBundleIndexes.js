'use strict';

require('babel-core/register');
const glob = require('glob');
const webpack = require('webpack');
const createWebpackConfig = require('../lib/helpers/createWebpackConfig');
const debug = require('debug')('toga:bundleIndexes');
const error = require('debug')('toga:bundleIndexes:error');
const shell = require('shelljs');
const webpackBundleIndexesRecordPath = require('../lib/constants').webpackBundleIndexesRecordPath;

glob('./components/**/bootstrap.js', (err, files) => {
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
      return error(compilerErr);
    }
    shell.rm('-rf', './tmp');
    debug('Created bundle indexes');
    // @TODO watch components and rebuild
  });
});
