module.exports = (deps) => {
  return function buildBundle(bundle, opts = { }) {
    const {
      '/config/index': getConfig,
      '/lib/webpack/index': runWebpack,
      '/lib/getComponentInfo': getComponentInfo,
      '/lib/utils/errors': { BundleError },
      debug
      } = deps;

    const components = getComponentInfo(bundle.components);
    const minify = opts.minify || false;
    const log = debug('toga:bundle');
    const { vendor } = getConfig();

    log(bundle.name);

    const componentFiles = components.map(component => component.file.replace(component.base, ''));
    const externals = components.length === 1 && components[0].name === vendor.componentName ? [] : vendor.bundle;
    const modulePaths = components.map(component => component.file);

    return runWebpack({
      externals, minify, modulePaths, componentFiles, bundleName: bundle.name
    })
      .catch((err) => {
        throw new BundleError(err.message);
      });
  };
};
