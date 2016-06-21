module.exports = (deps) => {
  return function runBundler({modulePaths, definitions, externals = [], minify}) {
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
    const jsBundleFileName = 'components.js';
    const cssBundleFileName = 'components.css';
    const logger = getLogger();
    const promises = modulePaths.map((modulePath) => {
      return stat(modulePath);
    });

    return Promise.all(promises)
      .then(() => {
        const webpackConfig = createWebpackConfig({
          modulePaths: modulePaths,
          definitions,
          externals,
          minify
        });
        const compiler = webpack(webpackConfig);
        const run = promisify(compiler.run.bind(compiler));

        compiler.outputFileSystem = memoryFS;
        return run().then(() => {
          const cssExists = memoryFS.existsSync(`/${cssBundleFileName}`);
          const readFilePromises = [];
          readFilePromises.push(mFSReadfile(`/${jsBundleFileName}`, 'utf8'));

          if (cssExists) {
            readFilePromises.push(mFSReadfile(`/${cssBundleFileName}`, 'utf8'));
          }

          return Promise.all(readFilePromises).then((data) => {
            return {
              scripts: data[0],
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
