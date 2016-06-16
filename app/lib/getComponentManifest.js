module.exports = (deps) => {
  return function getComponentManifest(componentName, componentsPath) {
    const {
      '/lib/getAppConfig': getAppConfig,
      path
    } = deps;
    componentsPath = componentsPath || getAppConfig().componentsPath;
    const relativeComponentsPath = path.join('../../', componentsPath);
    const manifestFileName = 'manifest.json';
    const componentsManifestPath = `${relativeComponentsPath}/${componentName}/${manifestFileName}`;

    return require(componentsManifestPath);
  };
};
