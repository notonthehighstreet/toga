const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const fs = require('fs');
const memoryFS = new MemoryFS();
const bootstrapFileName = 'bootstrap.js';
const componentsPath = './components';
const vendorBundleFileName = 'vendor.bundle.js';
const createWebpackConfig = require('../helpers/createWebpackConfig');

module.exports = {
  bundle: (req, res, next) => {
    const modulePath = `${componentsPath}${req.componentPath}/${bootstrapFileName}`;
    const webpackConfig = createWebpackConfig({
      modulePaths: [modulePath],
      definitions: {
        SCOPE_ID: `"comp-${req.scopeId}"`,
        BUNDLE_LOCALE: `"${req.locale}"`
      },
      vendorBundleFileName
    });
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
        res.set('Content-Type', 'application/javascript').send(memoryFS.readFileSync(`/components.js`));
      });
    });
  },
  vendorBundle: (req, res, next) => {
    const componentPaths = req.query.components || [];
    const modulePaths = componentPaths.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
    const webpackConfig = createWebpackConfig({
      modulePaths,
      vendorBundleFileName
    });
    const compiler = webpack(webpackConfig);

    compiler.outputFileSystem = memoryFS;
    try {
      modulePaths.forEach(fs.statSync);
    }
    catch(e) {
      return next(e);
    }
    compiler.run((compileErr) => {
      if (compileErr) {
        next(compileErr);
      }
      res.set('Content-Type', 'application/javascript').send(memoryFS.readFileSync(`/${vendorBundleFileName}`));
    });
  }
};
