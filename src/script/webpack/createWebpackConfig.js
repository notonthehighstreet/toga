/* eslint-disable camelcase */
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
const Visualizer = require('webpack-visualizer-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const assetUrl = require('./assetUrl');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const buildHashDeps = {
  'hash-files': require('hash-files'),
  '/config/index': require('../../app/config')()
};
const hash = require('../../app/lib/utils/buildHash')(buildHashDeps)();

const webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
  {
    assets: { images: { extensions: ['png', 'jpg', 'gif', 'ico'] } }
  }
);

module.exports = ({
  entry, minify, rules = [], commonsChunkName, staticComponents, staticLocals
}) => {
  let config = {
    cache: true,
    devtool: 'source-map',
    entry,
    output: {
      filename: `[name]-[chunkhash]${minify ? '.min' : ''}.js`,
      path: './dist/components',
      publicPath: assetUrl.cdn(),
      libraryTarget: (entry && entry.static && staticComponents) ? 'umd': 'var'
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
              `css-loader?-autoprefixer${minify ? '&minimize' : ''}`,
              'postcss-loader',
              'sass-loader'
            ]
          })
        },
        {test: /\.svg$/, loader: 'svg-inline-loader?removeSVGTagAttrs=false'},
        {test: /\.woff(2)?$/, loader: 'url-loader?mimetype=application/font-woff'},
        {
          test: /\.(jpe?g|png|gif)$/i,
          loaders: [
            'file-loader?name=[name]-[hash].[ext]'
          ]
        }
      ]
    },
    plugins: [
      webpack_isomorphic_tools_plugin,
      new ProgressBarPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new Visualizer({
        filename: '../webpack-components-stats.html'
      }),
      new ExtractTextPlugin({
        filename: `[name]-[contenthash]${minify ? '.min' : ''}.css`,
        allChunks: true
      }),
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
      new AssetsPlugin({
        filename: 'dist/components/asset-bundles.json', update: true,
        processOutput: function(assets) {
          Object.keys(assets)
            .forEach((bundle) => {
              const cdnUrl = assetUrl.cdn();
              const htmlUrl = assetUrl.s3() || assetUrl.cdn();
              if (assets[bundle].css && assets[bundle].css.indexOf(cdnUrl) < 0) {
                assets[bundle].css = cdnUrl + assets[bundle].css;
              }
              if (assets[bundle].js && assets[bundle].js.indexOf(cdnUrl) < 0) {
                assets[bundle].js = cdnUrl + assets[bundle].js;
              }
              if (assets[bundle] && staticComponents && staticComponents.includes(bundle)) {
                assets[bundle].html = `${htmlUrl}${bundle}-${hash}.html`;
              }
            });
          return JSON.stringify(assets);
        }
      })
    ]
  };

  if (commonsChunkName) {
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: commonsChunkName,
      filename: `[name]-[chunkhash]${minify ? '.min' : ''}.js`,
      minChunks: Infinity
    }));
  }

  if (entry && entry.static && staticComponents) {
    config.plugins.push(new StaticSiteGeneratorPlugin('static',
      staticComponents.map(componentName=>`${componentName}-${hash}.html`),
      staticLocals
    ));
  }

  if (minify) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        drop_debugger: false, // eslint-disable-line,
        screw_ie8: true
      },
      output: {
        comments: false,
      }
    }));
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }));
  }
  if (rules) {
    config.module.rules = config.module.rules.concat(rules);
  }

  return config;
};
