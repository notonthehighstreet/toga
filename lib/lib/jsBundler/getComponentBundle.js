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

module.exports = function getBundleComponent({componentName, locale}) { // TODO add promise conventions to guidelines
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
};
