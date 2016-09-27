module.exports = (deps) => {
  return function createWebpackConfig(
    { isoPlugin, modulePaths, definitions, externals = [], minify, mapPath, componentFiles = []}
    ) {
    const {
      'extract-text-webpack-plugin': ExtractTextPlugin,
      autoprefixer,
      webpack
    } = deps;
    const componentsRegEx = componentFiles.map(file => new RegExp(`.*${file}$`));

    console.log(`componentsRegEx`, componentsRegEx)

    let config = {
      devtool: 'source-map',
      entry: {
        components: modulePaths
      },
      externals: externals,
      output: {
        filename: '[name].js',
        path: '/',
        sourceMapFilename: `${mapPath || ''}${minify ? '.min': ''}.[file].map`
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
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
              `css?sourceMap&-url${minify ? '&minimize' : ''}`,
              'postcss',
              'sass?outputStyle=expanded'].join('!'))
          },
          {
            test: componentsRegEx,
            loaders: ['toga']
          },
          { test: /\.svg$/, loader: 'svg-inline'},
          { test: /\.woff(2)?$/, loader: 'url?mimetype=application/font-woff' }
        ]
      },
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

    if (isoPlugin) {
      config.plugins.push(isoPlugin);
    }
    if (minify) {
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          drop_debugger: false // eslint-disable-line
        }
      }));
      config.plugins.push(new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      }));
    }
    if (definitions) {
      config.plugins.push(new webpack.DefinePlugin(definitions));
    }

    return config;
  };
};
