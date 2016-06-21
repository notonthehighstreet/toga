module.exports = (deps) => {
  return function runBundler({modulePaths, definitions, vendorFiles = [], minify}) {
    const {
      'fs': fs,
      'es6-promisify': promisify,
      'memory-fs': MemoryFS,
      'webpack': webpack,
      '/logger': getLogger,
      '/lib/jsBundler/webpack/createConfig': createWebpackConfig,
      debug
    } = deps;
    const log = debug('toga:runBundler');
    const stat = promisify(fs.stat);
    const memoryFS = new MemoryFS();
    const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
    const componentBundleFileName = 'components.js';
    const cssBundleFileName = 'components.css';
    const logger = getLogger();
    const promises = modulePaths.map((modulePath) => {
      return modulePath.indexOf('/')>-1 && stat(modulePath);
    });

    return Promise.all(promises)
      .then(() => {
        const webpackConfig = createWebpackConfig({
          modulePaths: modulePaths,
          definitions,
          externals: vendorFiles,
          minify
        });
        const compiler = webpack(webpackConfig);
        const run = promisify(compiler.run.bind(compiler));
        
        compiler.outputFileSystem = memoryFS;
        return run().then(() => {
          const cssExists = memoryFS.existsSync(`/${cssBundleFileName}`);
          const readFilePromises = [];
          readFilePromises.push(mFSReadfile(`/${componentBundleFileName}`, 'utf8'));

          if (cssExists) {
            readFilePromises.push(mFSReadfile(`/${cssBundleFileName}`, 'utf8'));
          } 

          return Promise.all(readFilePromises).then((data) => {
            return {
              component: data[0],
              styles: data[1]
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
