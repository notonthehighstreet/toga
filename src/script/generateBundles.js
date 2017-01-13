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
    '/lib/bundler/index': buildBundle,
    '/lib/getComponentInfo': getComponentInfo,
  }) => {
    const { components = {} } = getConfig();
    const bundles = components.bundles || [];

    // create bundle for each individual component
    const allComponents = getComponentInfo();
    allComponents.forEach(componentInfo => {
      bundles.push({
        name: componentInfo.name,
        components: [componentInfo.name]
      });
    } );

    const promises = [];
    bundles.forEach((bundle) => {
      promises.push(buildBundle(bundle, {minify: true}));
    });
    return Promise.all(promises);
  }
})
  .then(({deps:{'/logger': getLogger}}) => {
    const logger = getLogger();

    logger.info('Bundling complete');
  })
  .catch((e) => {
    process.stderr.write(e.stack);
  });
