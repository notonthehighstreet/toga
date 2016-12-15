module.exports = (deps) => {
  return function bundle(componentNames, { isoPlugin, minify = false } = {}) {
    const {
      '/config/index': getConfig,
      '/lib/webpack/index': runWebpack,
      '/lib/bundler/bundleFilename': bundleFilename,
      '/lib/getComponentInfo': getComponentInfo,
      debug
    } = deps;

    const components = getComponentInfo(componentNames);
    const log = debug('toga:bundle');
    log(`${components.map(component => component.name).join('__')} ${minify ? 'min' : ''}`);

    const { vendor } = getConfig();

    const filename = bundleFilename(componentNames, { minify });
    const componentFiles = components.map(component => component.file.replace(component.base, ''));
    const externals = components.length === 1 && components[0].name === vendor.componentName ? [] : vendor.bundle;
    const modulePaths = components.map(component => component.file);

    return runWebpack({
      isoPlugin, externals, minify, modulePaths, componentFiles, filename
    });
  };
};
