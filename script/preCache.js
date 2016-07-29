#!/usr/bin/env node
const breadboard = require('breadboard');

breadboard({
  containerRoot: 'app',
  blacklist: ['newrelic'],
  entry: ({
    '/lib/bundler/index': bundle,
    '/lib/getComponentNames': getComponentNames
  }) => {
    const components = getComponentNames();
    const buildBundles = (component) => {
      return Promise.all([
        bundle(component, { minify: true }).getAsset('scripts'),
        bundle(component).getAsset('scripts')
      ]);
    };
    return Promise.all(components.map(buildBundles));
  }
})
  .then(({deps:{'/logger': getLogger}}) => {
    const logger = getLogger();

    logger.info('Precaching complete');
    process.exit(0);
  })
  .catch((e) => {
    process.stderr.write(e.stack);
    process.exit(1);
  });
