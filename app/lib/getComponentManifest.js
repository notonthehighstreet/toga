module.exports = () => {
  return function getComponentManifest(componentName, componentsPath = '../../components') {
    const manifestFileName = 'manifest.json';
    const componentsManifestPath = `${componentsPath}/${componentName}/${manifestFileName}`;

    return require(componentsManifestPath);
  };
};
