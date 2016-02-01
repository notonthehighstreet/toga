const fs = require('fs');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const promisify = require('es6-promisify');
const createWebpackConfig = require('../helpers/createWebpackConfig');
const memoryFS = new MemoryFS();
const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
const stat = promisify(fs.stat);
const bootstrapFileName = 'bootstrap.js';
const componentsPath = './components';
const vendorBundleFileName = 'vendor.bundle.js';
const componentBundles = {};
const vendorBundles = {};

module.exports = {
  getBundleComponent,
  preCacheComponentBundle,
  getBundleVendor
};

function preCacheComponentBundle() {
  const compDefer = Promise.defer();

  fs.readdir('./components', (err, components) => {
    const promises = components.map((componentName) => {

      if (fs.statSync(`./components/${componentName}`).isDirectory()) {
        return getBundleComponent({componentName, locale: 'en'});
      }
    });
    Promise.all(promises).then(() => compDefer.resolve(), (errors) => compDefer.reject(errors));
  });
  return compDefer.promise;
}

function getBundleComponent({componentName, locale}) {
  const modulePath = `${componentsPath}/${componentName}/${bootstrapFileName}`;
  const deferred = Promise.defer();
  const bundleId = `${modulePath}-${locale}`;
  let webpackConfig;
  let compiler;

  if (componentBundles[bundleId]) {
    return Promise.resolve(componentBundles[bundleId]);
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

  stat(modulePath).then(()=> {
    compiler.run((compileErr) => {
      if (compileErr) {
        return deferred.reject(compileErr);
      }

      mFSReadfile('/components.js', 'utf8').then((data)=> {
        componentBundles[bundleId] = data;
        deferred.resolve(data);
      }, (mFSerr)=> {
        return deferred.reject(mFSerr);
      });

      mFSReadfile(`/${vendorBundleFileName}`, 'utf8').then((data)=> {
        vendorBundles[modulePath] = data;
      }, () => {
        return;
      });

    });
  });

  return deferred.promise;
}

function getBundleVendor({componentNames}) {
  const modulePaths = componentNames.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
  const bundleId = modulePaths.join('-');
  const deferred = Promise.defer();
  let webpackConfig;
  let compiler;

  if (vendorBundles[bundleId]) {
    return Promise.resolve(vendorBundles[bundleId]);
  }
  vendorBundles[bundleId] = {};
  webpackConfig = createWebpackConfig({
    modulePaths,
    vendorBundleFileName
  });
  compiler = webpack(webpackConfig);
  compiler.outputFileSystem = memoryFS;

  const promises = modulePaths.map((modulePath) => {
    return stat(modulePath);
  });

  Promise.all(promises).then(() => {
    compiler.run((compileErr) => {
      if (compileErr) {
        return deferred.reject(compileErr);
      }
      mFSReadfile(`/${vendorBundleFileName}`, 'utf8').then((data) => {
        vendorBundles[bundleId] = data;
        deferred.resolve(data);
      }, (err) => {
        return deferred.reject(err);
      });
    });
  }, (statErr) => deferred.reject(statErr));

  return deferred.promise;
}
