#!/usr/bin/env node
const debug = require('debug');
const path = require('path');
const fs = require('fs');
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

const { components = {}, staticComponents, vendor, dev } = getConfig();

export const requireComponents = () => {
  const staticLocals = {};
  if (staticComponents) {
    staticComponents.forEach(componentName => {
      const requirePath = getComponentInfo(componentName)[0].requirePath;
      staticLocals[componentName] = require(requirePath);
    });
  }
  return staticLocals;
};

export const createComponentsRegEx = (components=[], bundles=[]) => {
  const componentsRegEx = [];
  components.forEach(component => {
    componentsRegEx.push(new RegExp(`.*${component.file.replace(component.base, '')}$`));
  });
  bundles
    .forEach((bundle) => {
      const bundleComponents = getComponentInfo(bundle.components);
      componentsRegEx.concat(bundleComponents.map(component => component.file.replace(component.base, '')));
    });
  return componentsRegEx;
};

export const createTogaLoaderRules = (components=[], bundles=[]) => {
  const componentsRegEx = createComponentsRegEx(components, bundles);
  return [{
    test: componentsRegEx,
    loaders: ['toga-loader']
  }];
};

export const createEntryPoints = (components=[], bundles=[]) => {
  const entry = {};
  components.forEach(component => {
    entry[component.name] = component.file;
  });

  bundles
    .forEach((bundle) => {
      const bundleComponents = getComponentInfo(bundle.components);
      entry[bundle.name] = bundleComponents.map(component => component.file);
    });
  return entry;
};

module.exports = Promise.resolve()
  .then(() => {
    const universalHelper = require('./ssr-helper');
    return universalHelper();
  })
  .then(() => {
    const staticLocals = (staticComponents) ? requireComponents(staticComponents) : { };
    const togaSrcRender = path.join(__dirname, '..', 'script', 'webpack', 'staticRender.js');
    return runWebpack({ entry:  { static: togaSrcRender }, staticComponents, staticLocals });
  })
  .then(() => {
    const rules = createTogaLoaderRules(getComponentInfo(), components.bundles);
    const entry = createEntryPoints(getComponentInfo(), components.bundles);
    return runWebpack({ minify: !dev, entry, rules, commonsChunkName: vendor.componentName, staticComponents  });
  })
  .then(() => {
    log('Bundling complete');
  })
  .catch(process.stderr.write);
