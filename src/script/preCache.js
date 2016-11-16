#!/usr/bin/env node
const breadboard = require('breadboard');

module.exports = breadboard({
  containerRoot: 'dist/app',
  blacklist: ['newrelic'],
  substitutes: {
    'package.json': require('../../package.json')
  },
  entry: ({
    '/config/index': getConfig,
    '/lib/bundler/index': bundle,
    '/lib/getComponentInfo': getComponentInfo,
  }) => {
    const config = getConfig();
    const allComponents = getComponentInfo();
    const componentNames = allComponents.map(componentInfo => componentInfo.name );
    const preCacheComponentBundles = config.components && config.components.preCacheBundles ? config.components.preCacheBundles : [];
    const componentsAndBundles = componentNames.concat(preCacheComponentBundles);
    const promises = [];
    componentsAndBundles.forEach((componentName) => {
      promises.push(bundle(componentName, { minify: true }).getAsset('scripts'));
      promises.push(bundle(componentName).getAsset('scripts'));
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
