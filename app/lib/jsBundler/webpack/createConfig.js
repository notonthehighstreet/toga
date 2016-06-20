module.exports = (deps) => {
  return function createWebpackConfig({modulePaths, definitions, minify}) {
    const {
      '/constants': {webpackBundleIndexesRecordPath},
      'extract-text-webpack-plugin':ExtractTextPlugin,
      autoprefixer,
      webpack
    } = deps;

    let config = {
      entry: {
        components: modulePaths
      },
      externals: ['react'],
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
              `css?-url&sourceMap${minify ? '&minimize' : ''}`,
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
