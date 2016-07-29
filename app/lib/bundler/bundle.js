module.exports = (deps) => {
  return function bundle(component, { minify } = {}) {
    const {
      'es6-promisify': promisify,
      'memory-fs': MemoryFS,
      'webpack': webpack,
      '/lib/bundler/vendorFiles': vendorFiles,
      '/lib/webpack/createWebpackConfig': createWebpackConfig,
      'webpack-isomorphic-tools/plugin': IsomorphicToolsPlugin,
      '/lib/createIsoConfig': createIsoConfig,
      '/lib/bundler/createModulePaths': createModulePaths,
      debug
    } = deps;

    const log = debug('toga:bundle');
    log(`${component} ${minify ? 'min' : ''}`);

    const modulePaths = createModulePaths(component);
    const memoryFS = new MemoryFS();
    const isoPlugin = (!Array.isArray(component))
      ? new IsomorphicToolsPlugin(createIsoConfig(component))
      : null;
    const externals = component === 'vendor' ? [] : vendorFiles;
    const webpackConfig = createWebpackConfig({ isoPlugin, modulePaths, externals, minify });
    const compiler = webpack(webpackConfig);
    const runWebpack = promisify(compiler.run.bind(compiler));
    compiler.outputFileSystem = memoryFS;

    function outputWebpackErrors(webpackOutput) {
      if (!webpackOutput) {
        return;
      }
      if (webpackOutput.compilation && Array.isArray(webpackOutput.compilation.errors)) {
        webpackOutput.compilation.errors.forEach(error => log(error));
      }
      if (webpackOutput.compilation && Array.isArray(webpackOutput.compilation.warnings)) {
        webpackOutput.compilation.warnings.forEach(warning => log(warning));
      }
    }

    function getAssets() {
      const fileName = 'components';
      const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
      const cssExists = memoryFS.existsSync(`/${fileName}.css`);
      const readFilePromises = [];
      readFilePromises.push(mFSReadfile(`/${fileName}.js`, 'utf8'));
      if (cssExists) {
        readFilePromises.push(mFSReadfile(`/${fileName}.css`, 'utf8'));
      }
      return Promise.all(readFilePromises).then((data) => ({ js: data[0], css: data[1] }));
    }

    return runWebpack()
      .then((webpackOutput) => {
        outputWebpackErrors(webpackOutput);
        return getAssets();
      });
  };
};
