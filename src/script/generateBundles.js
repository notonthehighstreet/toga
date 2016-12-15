#!/usr/bin/env node
const breadboard = require('breadboard');

module.exports = breadboard({
  containerRoot: 'src/app',
  blacklist: ['newrelic'],
  substitutes: {
    'package.json': require('../../package.json')
  },
  entry: ({
    '/config/index': getConfig,
    '/lib/bundler/index': bundle,
    '/lib/getComponentInfo': getComponentInfo,
  }) => {
    const { components, vendor } = getConfig();
    const allComponents = getComponentInfo();
    const componentNames = allComponents.map(componentInfo => componentInfo.name );

    // deprecate `preCacheBundles` once consumers have moved toga.json to `bundles`
    const preCacheBundles = components && components.preCacheBundles ? components.preCacheBundles : [];

    const componentBundles = components && components.bundles ? components.bundles : [];
    const allComponentsBundle = [componentNames.filter((name) => name !== vendor.componentName)];
    const componentsAndBundles = componentNames.concat(allComponentsBundle).concat(componentBundles).concat(preCacheBundles);
    const promises = [];
    componentsAndBundles.forEach((componentName) => {
      promises.push(bundle(componentName, {minify: true}));
      promises.push(bundle(componentName));
    });
    return Promise.all(promises);
  }
})
  .then(({deps:{'/logger': getLogger}}) => {
    const logger = getLogger();

    logger.info('Precaching complete');
  })
  .catch((e) => {
    process.stderr.write(e.stack);
  });
