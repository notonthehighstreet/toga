const _  = require('lodash');

module.exports = (componentManifest) => {
  return _.uniq([componentManifest.name].concat(componentManifest.children));
};
