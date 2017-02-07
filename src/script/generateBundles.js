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
  fs
};
const getComponentInfo = require('../app/lib/getComponentInfo')(getComponentInfoDeps);

const { components = {}, staticComponents, vendor, dev } = getConfig();

const requireComponents = (componentNames) => {
  const staticLocals = {};
  if (componentNames) {
    componentNames.forEach(componentName => {
      const componentInfo = getComponentInfo(componentName)[0];
      try {
        staticLocals[componentName] = require(componentInfo.requirePath);
      }
      catch (e) {
        throw `Could not find ${componentName} or ${componentInfo}`;
      }
    });
  }
  return staticLocals;
};

const createComponentsRegEx = (componentsInfo=[]) => {
  let componentsRegEx = [];
  componentsInfo.forEach(component => {
    componentsRegEx.push(new RegExp(`.*${component.file.replace(component.base, '')}$`));
  });
  return componentsRegEx;
};

const createTogaLoaderRules = (componentsInfo=[]) => {
  const componentsRegEx = createComponentsRegEx(componentsInfo);
  return [{
    test: componentsRegEx,
    loaders: ['toga-loader']
  }];
};

const createEntryPoints = (componentsInfo=[], bundles=[]) => {
  const entry = {};
  componentsInfo.forEach(component => {
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
    const rules = createTogaLoaderRules(getComponentInfo());
    const entry = createEntryPoints(getComponentInfo(), components.bundles);
    return runWebpack({ minify: !dev, entry, rules, commonsChunkName: vendor.componentName, staticComponents  });
  })
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
    log('Bundling complete');
  })
  .catch(process.stderr.write);

module.exports.createTogaLoaderRules = createTogaLoaderRules;
module.exports.createComponentsRegEx = createComponentsRegEx;
module.exports.createEntryPoints = createEntryPoints;
module.exports.requireComponents = requireComponents;
