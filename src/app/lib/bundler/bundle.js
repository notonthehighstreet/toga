module.exports = (deps) => {
  return function bundle(components, { isoPlugin, modulePaths, minify } = {}) {
    const {
      'es6-promisify': promisify,
      'memory-fs': MemoryFS,
      '/config/index': getConfig,
      '/lib/webpack/index': runWebpack,
      '/lib/utils/componentHelper': componentHelper,
      debug
    } = deps;
    const config = getConfig();

    const log = debug('toga:bundle');
    const { vendor } = config;
    const memoryFS = new MemoryFS();
    const mFSReadfile = promisify(memoryFS.readFile.bind(memoryFS));
    const mapPath = componentHelper.bundleId(components.map(component => component.name));
    const componentFiles = components.map(component => component.file.replace('./node_modules/', ''));
    const outputFileSystem = memoryFS;
    const externals = components.length === 1 && components[0].name === vendor.componentName ? [] : vendor.bundle;
// log(componentFiles)
    log(`${components.map(component => component.name).join('__')} ${minify ? 'min' : ''}`);

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

    return runWebpack({
      isoPlugin, externals, minify, modulePaths, mapPath, outputFileSystem, componentFiles
    })
      .then(getAssets);
  };
};
