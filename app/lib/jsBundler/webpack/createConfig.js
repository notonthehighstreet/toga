module.exports = (deps) => {
  return function createWebpackConfig({modulePaths, definitions, externals = [], minify}) {
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
      externals: externals,
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
      postcss: [autoprefixer({
        browsers: [
          'safari 9',
          'ie 10-11',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'edge 13',
          'ios_saf 9.0-9.2',
          'ie_mob 11',
          'Android >= 4'
        ],
        cascade: false,
        add: true,
        remove: true
      }
      )]
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
