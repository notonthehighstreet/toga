module.exports = (deps) => {
  return function bundle(component, { minify } = {}) {
    const {
      'es6-promisify': promisify,
      'memory-fs': MemoryFS,
      '/lib/webpack/index': runWebpack,
      '/lib/utils/componentHelper': componentHelper,
      debug
    } = deps;

    const log = debug('toga:bundle');
    const memoryFS = new MemoryFS();
    const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
    const modulePaths = componentHelper.path(component);
    const mapPath = componentHelper.bundleId(component);
    const outputFileSystem = memoryFS;

    log(`${component} ${minify ? 'min' : ''}`);

    function getAssets() {
      const dir = '/';
      const files = memoryFS.readdirSync(dir);
      const jsIndex = files.findIndex((file) => file.endsWith('.js'));
      const cssIndex = files.findIndex((file) => file.endsWith('.css'));
      const cssMapIndex = files.findIndex((file) => file.endsWith('.css.map'));
      const jsMapIndex = files.findIndex((file) => file.endsWith('.js.map'));
      const readFilePromises = files.map(file => mFSReadfile(`${dir}${file}`, 'utf8'));
      return Promise.all(readFilePromises).then((data) => ({
        js: data[jsIndex],
        css: data[cssIndex],
        'js.map': data[jsMapIndex],
        'css.map': data[cssMapIndex]
      }));
    }

    return runWebpack(component, { minify, modulePaths, mapPath, outputFileSystem })
      .then(getAssets);
  };
};