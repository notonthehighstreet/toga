module.exports = (deps) => {
  return function bundle(componentInfo, { isoPlugin, minify } = {}) {
    const {
      'es6-promisify': promisify,
      'memory-fs': MemoryFS,
      '/config/index': config,
      '/lib/webpack/index': runWebpack,
      '/lib/utils/componentHelper': componentHelper,
      '/lib/bundler/vendorFiles': vendorFiles,
      debug
    } = deps;

    const log = debug('toga:bundle');
    const { vendorBundleComponent } = config;
    const memoryFS = new MemoryFS();
    const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
    //todo: handle multiple components
    const componentPath = componentInfo.path;
    const modulePaths = componentInfo.file;
    const mapPath = componentHelper.bundleId(componentInfo.name);
    const outputFileSystem = memoryFS;
    const externals = componentInfo.name === vendorBundleComponent ? [] : vendorFiles;

    log(`${componentInfo.name} ${minify ? 'min' : ''}`);

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

    return runWebpack(componentPath, { isoPlugin, externals, minify, modulePaths, mapPath, outputFileSystem })
      .then(getAssets);
  };
};
