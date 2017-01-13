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
    '/lib/webpack/index': runWebpack,
    '/lib/getComponentInfo': getComponentInfo,
  }) => {
    const { components = {}, vendor } = getConfig();
    const entry = {};
    const vendorEntry = {};
    const bundles = components.bundles || [];
    const componentsRegEx = [];

    // create entry point for each individual component
    const allComponents = getComponentInfo();
    allComponents.forEach(component => {
      componentsRegEx.push(new RegExp(`.*${component.file.replace(component.base, '')}$`));
      if (component.name === vendor.componentName) {
        vendorEntry[component.name] = component.file;
      }
      else {
        entry[component.name] = component.file;
      }
    });

    // create entry points for each bundle
    bundles
      .filter(component => component.name !== vendor.componentName)
      .forEach((bundle) => {
        const bundleComponents = getComponentInfo(bundle.components);
        componentsRegEx.concat(bundleComponents.map(component => component.file.replace(component.base, '')));
        entry[bundle.name] = bundleComponents.map(component => component.file);
      });

    const rules = [{
      test: componentsRegEx,
      loaders: ['toga-loader']
    }];
    const promises = [];
    promises.push(runWebpack({ externals: vendor.bundle, minify: true, entry, rules }));
    promises.push(runWebpack({ externals: [], minify: true, entry: vendorEntry, rules }));
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
