const logger = require('../../logger');
const webpack = require('webpack');
const {webpackBundleIndexesRecordPath} = require('../../../constants');

module.exports = function createWebpackConfig({modulePaths, definitions, vendorBundleFileName}) {
  logger.info('Creating webpack config');
  let config = {
    entry: {
      components: modulePaths,
      vendor: ['react', 'lodash']
    },
    recordsInputPath: webpackBundleIndexesRecordPath,
    output: {
      filename: '[name].js',
      path: '/'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          presets: ['es2015'],
          plugins: ['transform-react-jsx'],
          exclude: /node_modules/
        },
        {
          test: /\.json$/,
          loaders: ['json']
        },
        {
          test: /.*components\/.*\/index\.js$/,
          loaders: ['toga']
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new webpack.optimize.CommonsChunkPlugin(vendorBundleFileName, ['components', 'vendor']),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true)
    ]
  };

  if (definitions) {
    config.plugins.push(new webpack.DefinePlugin(definitions));
  }

  return config;
};
