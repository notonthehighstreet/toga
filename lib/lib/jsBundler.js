const fs = require('fs');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const promisify = require('es6-promisify');
const getCache = require('../cache/get');
const setCache = require('../cache/set');
const createWebpackConfig = require('../helpers/createWebpackConfig');
const memoryFS = new MemoryFS();
const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const bootstrapFileName = 'bootstrap.js';
const componentsPath = './components';
const vendorBundleFileName = 'vendor.bundle.js';

module.exports = {
  getBundleComponent,
  preCacheComponentBundle,
  getBundleVendor
};

function preCacheComponentBundle() {
  return readdir('./components')
    .then((components) => {
      const promises = components
        .filter((componentName) => fs.statSync(`./components/${componentName}`).isDirectory())
        .map((componentName) => {
          return getBundleComponent({componentName, locale: 'en'});
        });

      return Promise.all(promises);
    });
}

function getBundleComponent({componentName, locale}) { // TODO add promise conventions to guidelines
  const modulePath = `${componentsPath}/${componentName}/${bootstrapFileName}`;
  const bundleId = `${modulePath}-${locale}`;
  const compile = () => {
    const webpackConfig = createWebpackConfig({
      modulePaths: [modulePath],
      definitions: {
        BUNDLE_LOCALE: `"${locale}"`
      },
      vendorBundleFileName
    });
    const compiler = webpack(webpackConfig);

    compiler.outputFileSystem = memoryFS;
    const run = promisify(compiler.run.bind(compiler));

    return run()
      .then(() => {
        mFSReadfile(`/${vendorBundleFileName}`, 'utf8')
          .then((data)=> {
            setCache(`vendor-${modulePath}`, data);
          });

        return mFSReadfile('/components.js', 'utf8')
          .then((data)=> {

            setCache(`comp-${bundleId}`, data);

            return data;
          })
          .catch((mFSerr)=> {
            throw mFSerr;
          });

      })
      .catch((compileErr) => {
        if (compileErr) {
          throw compileErr;
        }
      });
  };
  const bundle = () => {
    return stat(modulePath).then(compile);
  };

  return getCache('comp-' + bundleId)
    .then((cachedComponentBundle) => {
      return cachedComponentBundle;
    })
    .catch(bundle);
}

function getBundleVendor({componentNames}) {
  const modulePaths = componentNames.map((compPath) => `${componentsPath}/${compPath}/${bootstrapFileName}`);
  const bundleId = modulePaths.join('-');

  const bundle = () => {
    const promises = modulePaths.map((modulePath) => {
      return stat(modulePath);
    });
    const webpackConfig = createWebpackConfig({
      modulePaths,
      vendorBundleFileName
    });
    const compiler = webpack(webpackConfig);

    compiler.outputFileSystem = memoryFS;

    return Promise.all(promises)
      .then(() => {
        const run = promisify(compiler.run.bind(compiler));

        return run()
          .then(() => {
            return mFSReadfile(`/${vendorBundleFileName}`, 'utf8')
              .then((data) => {
                setCache(`vendor-${bundleId}`, data);

                return data;
              })
              .catch((readFileErr) => {
                throw readFileErr;
              });
          })
          .catch((compileErr) => {
            if (compileErr) {
              throw compileErr;
            }
          });
      })
      .catch((statErr) => {
        throw statErr;
      });
  };
  return getCache('vendor-' + bundleId)
    .then((cachedVendorBundle) => {
      return cachedVendorBundle;
    })
    .catch(bundle);
}
