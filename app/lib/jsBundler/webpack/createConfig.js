module.exports = (deps) => {
  return function createWebpackConfig({modulePaths, definitions, vendorBundleFileName}) {
    const {
      '/constants': {webpackBundleIndexesRecordPath},
      '/lib/getAppConfig': getAppConfig,
      'extract-text-webpack-plugin':ExtractTextPlugin,
      autoprefixer,
      webpack
    } = deps;
    const { minify } = getAppConfig();

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
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract('style', [
              'css?-url&sourceMap',
              'postcss',
              'sass?sourceMap&outputStyle=expanded'].join('!'))
          },
          {
            test: /.*components\/.*\/index\.js$/,
            loaders: ['toga']
          }
        ]
      },
      devtool: 'source-map',
      plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin(vendorBundleFileName, ['components', 'vendor']),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true)
      ],
      postcss: [autoprefixer]
    };

    if (minify) {
      config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    }
    if (definitions) {
      config.plugins.push(new webpack.DefinePlugin(definitions));
    }

    return config;
  };
};
