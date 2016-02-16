const fs = require('fs');
const promisify = require('es6-promisify');
const stat = promisify(fs.stat);
const MemoryFS = require('memory-fs');
const webpack = require('webpack');
const createWebpackConfig = require('./createConfig');
const memoryFS = new MemoryFS();
const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
const vendorBundleFileName = 'vendor.bundle.js';
const componentBundleFileName = 'components.js';

module.exports = function runBundler({modulePaths, definitions}) {
  const promises = modulePaths.map((modulePath) => {
    return stat(modulePath);
  });
  return Promise.all(promises)
    .then(() => {
      const webpackConfig = createWebpackConfig({
        modulePaths: modulePaths,
        definitions,
        vendorBundleFileName
      });
      const compiler = webpack(webpackConfig);
      const run = promisify(compiler.run.bind(compiler));

      compiler.outputFileSystem = memoryFS;
      return run().then(() => {
        const readFilePromises = [];

        readFilePromises.push(mFSReadfile(`/${componentBundleFileName}`, 'utf8'));
        readFilePromises.push(mFSReadfile(`/${vendorBundleFileName}`, 'utf8'));

        return Promise.all(readFilePromises).then((data) => {
          return {
            component: data[0],
            vendor: data[1]
          };
        });
      });
    })
    .catch((statErr) => {
      throw statErr;
    });
};