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
  const promise = new Promise((resolve, reject) => {
    fs.readdir('./components', (err, components) => {
      const promises = components.map((componentName) => {

        if (fs.statSync(`./components/${componentName}`).isDirectory()) {
          return getBundleComponent({componentName, locale: 'en'});
        }
      });
      Promise.all(promises).then(() => resolve(), (errors) => reject(errors));
    });
  });

  return promise;
}

function getBundleComponent({componentName, locale}) {
  const modulePath = `${componentsPath}/${componentName}/${bootstrapFileName}`;
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

  return new Promise((resolve, reject) => {
    stat(modulePath).then(() => {
      compiler.run((compileErr) => {
        if (compileErr) {
          return reject(compileErr);
        }
        mFSReadfile('/components.js', 'utf8').then((data)=> {
          componentBundles[bundleId] = data;
          resolve(data);
        }, (mFSerr)=> {
          return reject(mFSerr);
        });
        mFSReadfile(`/${vendorBundleFileName}`, 'utf8').then((data)=> {
          vendorBundles[modulePath] = data;
        }, () => {
          return;
        });
      });
    });
  });
}

function getBundleVendor({componentNames}) {
  const modulePaths = componentNames.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
  const bundleId = modulePaths.join('-');
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

  return new Promise((resolve, reject) => {
    Promise.all(promises).then(() => {
      compiler.run((compileErr) => {
        if (compileErr) {
          return reject(compileErr);
        }
        mFSReadfile(`/${vendorBundleFileName}`, 'utf8').then((data) => {
          vendorBundles[bundleId] = data;
          resolve(data);
        }, (err) => {
          return reject(err);
        });
      });
    }, (statErr) => reject(statErr));
  });
}
