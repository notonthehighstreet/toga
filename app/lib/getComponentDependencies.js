module.exports = (deps) => {
  return function getComponentDependencies(componentManifest) {
    const {
      'lodash': _
      } = deps;

    return _.uniq([componentManifest.name].concat(componentManifest.children));
  };
};
