const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const fs = require('fs');
const Q = require('q');
const memoryFS = new MemoryFS();
const bootstrapFileName = 'bootstrap.js';
const componentsPath = './components';
const vendorBundleFileName = 'vendor.bundle.js';
const createWebpackConfig = require('../helpers/createWebpackConfig');
const preStartCache = require('../preStartCache');
const componentBundles = {};
const vendorBundles = {};

function preCacheComponentBundle(cb) {
  fs.readdir('./components', (err, components) => {
    const promises = components.map((componentName) => {
      if (fs.statSync(`./components/${componentName}`).isDirectory()) {
        return getbundleComponent({componentName, locale: 'en'});
      }
    });

    Q.all(promises).then(()=>cb(null), (err)=>cb(err));
  });
}
preStartCache.add(preCacheComponentBundle);

function getbundleComponent({componentName, locale}) {
  const modulePath = `${componentsPath}/${componentName}/${bootstrapFileName}`;
  const deferred = Q.defer();
  const bundleId = `${modulePath}-${locale}`;
  let webpackConfig;
  let compiler;

  if (componentBundles[bundleId]) {
    return Q.resolve(componentBundles[bundleId]);
  }
  componentBundles[bundleId] = {};
  webpackConfig = createWebpackConfig({
    modulePaths: [modulePath],
    definitions: {
      BUNDLE_LOCALE: `"${locale}"`
    },
    vendorBundleFileName
  });
  compiler = webpack(webpackConfig);
  compiler.outputFileSystem = memoryFS;
  fs.stat(modulePath, (statErr) => {
    if (statErr) {
      return deferred.reject(statErr);
    }
    compiler.run((compileErr) => {
      if (compileErr) {
        return deferred.reject(compileErr);
      }
      memoryFS.readFile('/components.js', 'utf8', (err, data) => {
        if (err) {
          return deferred.reject(err);
        }
        componentBundles[bundleId] = data;
        deferred.resolve(data);
      });
      memoryFS.readFile(`/${vendorBundleFileName}`, 'utf8', (err, data) => {
        if (err) {
          return;
        }
        vendorBundles[modulePath] = data;
      });
    });
  });

  return deferred.promise;
}

module.exports = {
  bundle: (req, res, next) => {

    const options = {
      locale: req.locale,
      componentName: req.componentPath.slice(1)
    };

    getbundleComponent(options)
      .then(
        (success) => {
          res.set('Content-Type', 'application/javascript').send(success.replace('%%%#${mountNodeId}%%%', `#comp-${req.mountNodeId}`));
        },
        (error) => {
          next(error);
        }
      );
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
    catch (e) {
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
