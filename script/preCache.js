#!/usr/bin/env node
require('babel-core/register');
const breadboard = require('breadboard');

module.exports = breadboard({
  containerRoot: 'app',
  blacklist: ['newrelic'],
  substitutes: {
    'package.json': require('../package.json')
  },
  entry: ({
    '/config/index': config,
    '/lib/bundler/index': bundle,
    '/lib/getComponentInfo': getComponentInfo
  }) => {
    const components = getComponentInfo().map(componentInfo => componentInfo.name );
    const preCacheComponentBundles = config.components.preCacheBundles ? config.components.preCacheBundles : [];
    const componentsAndBundles = components.concat(preCacheComponentBundles);
    const buildBundles = (component) => {
      return Promise.all([
        bundle(component, { minify: true }).getAsset('scripts'),
        bundle(component).getAsset('scripts')
      ]);
    };
    return Promise.all(componentsAndBundles.map(buildBundles));
  }
})
  .then(({deps:{'/logger': getLogger}}) => {
    const logger = getLogger();

    logger.info('Precaching complete');
  })
  .catch((e) => {
    process.stderr.write(e.stack);
  });
