#!/usr/bin/env node
const breadboard = require('breadboard');

breadboard({
  containerRoot: 'app',
  blacklist: ['newrelic'],
  entry: ({
    '/lib/preCacheComponentBundle': preCacheComponentBundle,
    '/lib/preCacheBundleCacheHash': preCacheBundleCacheHash,
    '/lib/getComponentNames': getComponentNames
  }) => {
    return Promise.all([preCacheComponentBundle(getComponentNames()), preCacheBundleCacheHash()]);
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
