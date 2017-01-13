const { assetUrl } = require('../utils/assetUrl');

module.exports = (deps) => {
  return function createWebpackConfig({
    modulePaths, externals = [], minify, componentFiles = [], bundleName
  }) {
    const {
      'extract-text-webpack-plugin': ExtractTextPlugin,
      'assets-webpack-plugin': AssetsPlugin,
      autoprefixer,
      webpack,
    } = deps;

    const componentsRegEx = componentFiles.map(file => new RegExp(`.*${file}$`));

    let config = {
      devtool: 'source-map',
      entry: {
        [bundleName]: modulePaths
      },
      externals: externals,
      output: {
        filename: `[name]/[name]-[hash]${minify ? '.min' : ''}.js`,
        path: './dist/components'
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
              'file-loader?name=[name]/[name]-[hash].[ext]'
            ]
          }
        ]
      },
      plugins: [
        new ExtractTextPlugin({ filename: '[name]/[name]-[hash].css', allChunks: true }),
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
        }),
        new AssetsPlugin({ filename: 'dist/components/bundles.json', update: true,
          processOutput: function(assets) {
            Object.keys(assets)
              .forEach((bundle) => {
                const url = `${assetUrl()}/`;
                if (assets[bundle].css && assets[bundle].css.indexOf(url) < 0) {
                  assets[bundle].css = url + assets[bundle].css;
                }
                if (assets[bundle].js && assets[bundle].js.indexOf(url) < 0) {
                  assets[bundle].js = url + assets[bundle].js;
                }
              });
            return  JSON.stringify(assets);
          }})
      ]
    };

    if (minify) {
      config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
          drop_debugger: false // eslint-disable-line
        }
      }));
      config.plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }));
    }

    return config;
  };
};
