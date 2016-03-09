module.exports = (deps) => {
  return function getComponentBundle({components, locale = 'en'}) {
    const {
      '/cache/get': getCache,
      '/cache/set': setCache,
      '/lib/jsBundler/webpack/runBundler': bundle
      } = deps;

    const bootstrapFileName = 'index.js';
    const componentsPath = './components';
    const definitions = {
      BUNDLE_LOCALE: `"${locale}"`
    };
    let modulePaths = [];

    components.forEach((component) => {
      modulePaths.push(`${componentsPath}/${component.name}/${bootstrapFileName}`);
    });

    const bundleId = `${modulePaths.join('-')}=${locale}`;

    return getCache(`component-${bundleId}`)
      .then((cachedComponentBundle) => {
        return cachedComponentBundle;
      })
      .catch(()=> {
        return bundle({modulePaths, definitions}).then((data) => {
          setCache(`component-${bundleId}`, data['component']);
          setCache(`vendor-${bundleId}`, data['vendor']);
          return data.component;
        });
      });
  };
};
