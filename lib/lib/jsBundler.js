const fs = require('fs');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const promisify = require('es6-promisify');
const cache = require('../cache');
const createWebpackConfig = require('../helpers/createWebpackConfig');
const memoryFS = new MemoryFS();
const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
const stat = promisify(fs.stat);
const bootstrapFileName = 'bootstrap.js';
const componentsPath = './components';
const vendorBundleFileName = 'vendor.bundle.js';

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
  return new Promise((resolve, reject) => {
    const modulePath = `${componentsPath}/${componentName}/${bootstrapFileName}`;
    const bundleId = `${modulePath}-${locale}`;

    cache.get('comp-' + bundleId).then((cachedComponentBundle) => {
      return resolve(cachedComponentBundle);
    }, () => {
      const webpackConfig = createWebpackConfig({
        modulePaths: [modulePath],
        definitions: {
          BUNDLE_LOCALE: `"${locale}"`
        },
        vendorBundleFileName
      });
      const compiler = webpack(webpackConfig);

      compiler.outputFileSystem = memoryFS;
      stat(modulePath).then(() => {
        compiler.run((compileErr) => {
          if (compileErr) {
            return reject(compileErr);
          }
          mFSReadfile('/components.js', 'utf8').then((data)=> {
            cache.set(`comp-${bundleId}`, data);
            resolve(data);
          }, (mFSerr)=> {
            return reject(mFSerr);
          });
          mFSReadfile(`/${vendorBundleFileName}`, 'utf8').then((data)=> {
            cache.set(`vendor-${modulePath}`, data);
          }, () => {
            return;
          });
        });
      });
    });
  });
}

function getBundleVendor({componentNames}) {
  return new Promise((resolve, reject) => {
    const modulePaths = componentNames.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
    const bundleId = modulePaths.join('-');

    cache.get('vendor-' + bundleId).then((cachedVendorBundle) => {
      return resolve(cachedVendorBundle);
    }, () => {
      const promises = modulePaths.map((modulePath) => {
        return stat(modulePath);
      });
      const webpackConfig = createWebpackConfig({
        modulePaths,
        vendorBundleFileName
      });
      const compiler = webpack(webpackConfig);

      compiler.outputFileSystem = memoryFS;
      Promise.all(promises).then(() => {
        compiler.run((compileErr) => {
          if (compileErr) {
            return reject(compileErr);
          }
          mFSReadfile(`/${vendorBundleFileName}`, 'utf8').then((data) => {
            cache.set(`vendor-${bundleId}`, data);
            resolve(data);
          }, (readFileErr) => {
            return reject(readFileErr);
          });
        });
      }, (statErr) => reject(statErr));
    });
  });
}
