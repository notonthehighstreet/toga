#!/usr/bin/env node
const debug = require('debug');
const fs = require('fs');
const SvgLoader = require('svg-inline-loader');
const IsomorphicTools = require('webpack-isomorphic-tools');
const hook = require('node-hook');

hook.hook('.scss', () => {});
hook.hook('.svg', (source) => {
  const markup = SvgLoader.getExtractedSVG(source, { removeSVGTagAttrs: false });
  return 'module.exports = ' + JSON.stringify(markup);
});
const isoConfig = {
  assets: { images: { extensions: ['png', 'jpg', 'gif', 'ico'] } }
};
const isoTools = new IsomorphicTools(isoConfig);

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

const requireComponents = () => {
  const staticLocals = {};
  if (staticComponents) {
    staticComponents.forEach(componentName => {
      const requirePath = getComponentInfo(componentName)[0].requirePath;
      staticLocals[componentName] = require(requirePath);
    });
  }
  return staticLocals;
};

module.exports = Promise.resolve()
  .then(() => {
    return isoTools.server(process.cwd());
  })
  .then(() => {
    const staticLocals = requireComponents(staticComponents);
    const promises = [];
    promises.push(runWebpack({ minify: !dev, entry, rules, commonsChunkName: vendor.componentName, staticComponents, staticLocals  }));
    if (staticComponents) {
      promises.push(runWebpack({ entry:  { static: './src/script/webpack/staticRender.js' }, staticComponents, staticLocals }));
    }
    return Promise.all(promises);
  })
  .then(([ assetsBundlingStats ]) => {
    const stats = assetsBundlingStats;
    fs.writeFile(process.cwd() + '/dist/webpack-components-stats.json', JSON.stringify(stats.toJson({chunkModules: true})), function(err) {
      if(err) {
        return log(err);
      }
    });
    log('Bundling complete');
  })
  .catch(process.stderr.write);
