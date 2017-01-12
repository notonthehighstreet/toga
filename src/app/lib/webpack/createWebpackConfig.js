module.exports = (deps) => {
  return function createWebpackConfig({modulePaths, definitions, externals = [], minify, componentFiles = [], filename, bundleName}) {
    const {
      'extract-text-webpack-plugin': ExtractTextPlugin,
      autoprefixer,
      webpack
    } = deps;

    const componentsRegEx = componentFiles.map(file => new RegExp(`.*${file}$`));
    let config = {
      devtool: 'source-map',
      entry: {
        [filename]: modulePaths
      },
      externals: externals,
      output: {
        filename: '[name].js',
        path: `./dist/components/${bundleName}`
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.json$/,
            loaders: ['json-loader']
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: [
                'css-loader?-autoprefixer',
                'postcss-loader',
                'sass-loader'
              ]
            })
          },
          {
            test: componentsRegEx,
            loaders: ['toga-loader']
          },
          {test: /\.svg$/, loader: 'svg-inline-loader?removeSVGTagAttrs=false'},
          {test: /\.woff(2)?$/, loader: 'url-loader?mimetype=application/font-woff'},
          {
            test: /\.(jpe?g|png|gif)$/i,
            loaders: [
              'file-loader?name=[name].[hash].[ext]'
            ]
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
        new webpack.LoaderOptionsPlugin({
          options: {
            postcss: [autoprefixer({
              browsers: [
                'safari 9',
                'ie 10-11',
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'edge 13',
                'ios_saf >= 8',
                'ie_mob 11',
                'Android >= 4'
              ],
              cascade: false,
              add: true,
              remove: true
            }
          )]
          }
        })
      ]
    };

    if (minify) {
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          drop_debugger: false // eslint-disable-line
        }
      }));
      config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }));
    }
    if (definitions) {
      config.plugins.push(new webpack.DefinePlugin(definitions));
    }

    return config;
  };
};
