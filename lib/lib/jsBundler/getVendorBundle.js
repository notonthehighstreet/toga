const fs = require('fs');
const promisify = require('es6-promisify');
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const createWebpackConfig = require('../../helpers/createWebpackConfig');
const getCache = require('../../cache/get');
const setCache = require('../../cache/set');
const memoryFS = new MemoryFS();
const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
const stat = promisify(fs.stat);
const bootstrapFileName = 'bootstrap.js';
const componentsPath = './components';
const vendorBundleFileName = 'vendor.bundle.js';

module.exports = function getBundleVendor({componentNames}) {
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
};
