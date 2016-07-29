module.exports = (deps) => {
  return function bundle(component, { minify } = {}) {
    const {
      'es6-promisify': promisify,
      'memory-fs': MemoryFS,
      '/lib/webpack/index': runWebpack,
      '/lib/utils/createModulePaths': createModulePaths,
      debug
    } = deps;

    const log = debug('toga:bundle');
    const memoryFS = new MemoryFS();
    const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
    const modulePaths = createModulePaths(component);
    const outputFileSystem = memoryFS;

    log(`${component} ${minify ? 'min' : ''}`);

    function getAssets() {
      const fileName = 'components';
      const cssExists = memoryFS.existsSync(`/${fileName}.css`);
      const readFilePromises = [];
      readFilePromises.push(mFSReadfile(`/${fileName}.js`, 'utf8'));
      if (cssExists) {
        readFilePromises.push(mFSReadfile(`/${fileName}.css`, 'utf8'));
      }
      return Promise.all(readFilePromises).then((data) => ({ js: data[0], css: data[1] }));
    }

    return runWebpack(component, { minify, modulePaths, outputFileSystem })
      .then(getAssets);
  };
};
