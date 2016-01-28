const getManifestByPath = (path) => {
  return require(path);
};

module.exports = (componentName) => {
  const componentsPath = '../../components';
  const manifestFileName = 'manifest.json';
  const componentsManifestPath = `${componentsPath}/${componentName}/${manifestFileName}`;

  return getManifestByPath(componentsManifestPath);
};
