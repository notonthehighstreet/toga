#!/usr/bin/env node
const debug = require('debug');
const log = debug('toga:generateBundles');
const getConfig = require('../app/config')();
const runWebpack = require('./webpack');
const { NotFoundError } = require('../app/lib/utils/errors')({
  '/logger': () => ({ error: log })
});
const getComponentInfoDeps = {
  '/config/index': getConfig,
  '/lib/utils/errors': { NotFoundError },
  fs: require('fs')
};
const getComponentInfo = require('../app/lib/getComponentInfo')(getComponentInfoDeps);

const { components = {}, vendor } = getConfig();
const entry = {};
const bundles = components.bundles || [];
const componentsRegEx = [];

// create entry point for each individual component
const allComponents = getComponentInfo();
allComponents.forEach(component => {
  componentsRegEx.push(new RegExp(`.*${component.file.replace(component.base, '')}$`));
  entry[component.name] = component.file;
});

// create entry points for each bundle
bundles
  .forEach((bundle) => {
    const bundleComponents = getComponentInfo(bundle.components);
    componentsRegEx.concat(bundleComponents.map(component => component.file.replace(component.base, '')));
    entry[bundle.name] = bundleComponents.map(component => component.file);
  });

const rules = [{
  test: componentsRegEx,
  loaders: ['toga-loader']
}];

module.exports = runWebpack({ minify: true, entry, rules, commonsChunkName: vendor.componentName })
  .then(() => {
    log('Bundling complete');
  })
  .catch(process.stderr.write);
