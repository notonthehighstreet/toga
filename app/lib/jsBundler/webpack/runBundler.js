module.exports = (deps) => {
  return function runBundler({modulePaths, definitions}) {
    const {
      'fs': fs,
      'es6-promisify': promisify,
      'memory-fs': MemoryFS,
      'webpack': webpack,
      '/logger': getLogger,
      '/lib/jsBundler/webpack/createConfig': createWebpackConfig
    } = deps;
    const stat = promisify(fs.stat);
    const memoryFS = new MemoryFS();
    const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
    const vendorBundleFileName = 'vendor.bundle.js';
    const componentBundleFileName = 'components.js';
    const logger = getLogger();
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
        logger.error('Failed to create webpack bundle:', statErr);
        throw statErr;
      });
  };
};
