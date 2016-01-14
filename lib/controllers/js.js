const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const memoryFS = new MemoryFS();
const fs = require('fs');

module.exports = {
  bundle: (req, res, next) => {
    const fileName = 'bootstrap.js';
    const componentsPath = './components';
    const modulePath = `${componentsPath}${req.componentPath}/${fileName}`;
    let webpackConfig = { //TODO extract into AbstractWebpackConfigFactoryFacadeProxyDecorator
      entry: {
        'index': [modulePath]
      },
      output: {
        filename: fileName,
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
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          SCOPE_ID: `"comp-${req.scopeId}"`,
          BUNDLE_LOCALE: `"${req.locale}"`
        })
      ],
      devtool: 'inline-source-map'
    };
    const compiler = webpack(webpackConfig);

    compiler.outputFileSystem = memoryFS;
    fs.stat(modulePath, (statErr) => {
      if (statErr) {
        return next(statErr);
      }
      compiler.run((compileErr) => {
        if (compileErr) {
          next(compileErr);
        }
        res.set('Content-Type', 'application/javascript').send(memoryFS.readFileSync(`/${fileName}`));
      });
    });
  }
};
