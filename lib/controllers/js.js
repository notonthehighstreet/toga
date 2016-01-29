const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const fs = require('fs');
const memoryFS = new MemoryFS();
const bootstrapFileName = 'bootstrap.js';
const componentsPath = './components';
const vendorBundleFileName = 'vendor.bundle.js';
const createWebpackConfig = require('../helpers/createWebpackConfig');
const componentBundles = {};
const vendorBundles = {};

module.exports = {
  bundle: (req, res, next) => {
    const modulePath = `${componentsPath}${req.componentPath}/${bootstrapFileName}`;
    const bundleId = `${modulePath}-comp-${req.mountNodeId}-${req.locale}`;
    let webpackConfig;
    let compiler;

    if (componentBundles[bundleId]) {
      res.set('Content-Type', 'application/javascript').send(componentBundles[bundleId]);
      return;
    }
    componentBundles[bundleId] = {};
    webpackConfig = createWebpackConfig({
      modulePaths: [modulePath],
      definitions: {
        MOUNT_NODE_ID: `"comp-${req.mountNodeId}"`,
        BUNDLE_LOCALE: `"${req.locale}"`
      },
      vendorBundleFileName
    });
    compiler = webpack(webpackConfig);

    compiler.outputFileSystem = memoryFS;
    fs.stat(modulePath, (statErr) => {
      if (statErr) {
        return next(statErr);
      }
      compiler.run((compileErr) => {
        if (compileErr) {
          next(compileErr);
        }
        memoryFS.readFile('/components.js', 'utf8', (err, data) => {
          if (err) {
            return next(err);
          }
          componentBundles[bundleId] = data;
          res.set('Content-Type', 'application/javascript').send(data);
        });
        memoryFS.readFile(`/${vendorBundleFileName}`, 'utf8', (err, data) => {
          if (err) {
            return next(err);
          }
          vendorBundles[modulePath] = data;
        });
      });
    });
  },
  vendorBundle: (req, res, next) => {
    const componentPaths = req.query.components || [];
    const modulePaths = componentPaths.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
    const bundleId = modulePaths.join('-');
    let webpackConfig;
    let compiler;

    if (vendorBundles[bundleId]) {
      res.set('Content-Type', 'application/javascript').send(vendorBundles[bundleId]);
      return;
    }
    vendorBundles[bundleId] = {};
    webpackConfig = createWebpackConfig({
      modulePaths,
      vendorBundleFileName
    });
    compiler = webpack(webpackConfig);
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
      memoryFS.readFile(`/${vendorBundleFileName}`, 'utf8', (err, data) => {
        if (err) {
          return next(err);
        }
        res.set('Content-Type', 'application/javascript').send(data);
        vendorBundles[bundleId] = data;
      });
    });
  }
};
