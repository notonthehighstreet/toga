module.exports = (deps) => {
  return function index() {

    const {
      'webpack-isomorphic-tools': IsomorphicTools,
      'webpack-isomorphic-tools/plugin': IsomorphicToolsPlugin,
      '/lib/universalRendering/createWebpackAssetsJson': createWebpackAssetsJson,
      '/lib/universalRendering/createIsoConfig': createIsoConfig
    } = deps;

    const assetsFilename = 'webpack-assets.json';

    function isoPlugin(componentPath) {
      return (!Array.isArray(componentPath))
        ? new IsomorphicToolsPlugin(createIsoConfig(componentPath, assetsFilename))
        : null;
    }

    function server(path, repoPath) {
      const isoTools = new IsomorphicTools(createIsoConfig(repoPath, assetsFilename));
      return isoTools.server(path);
    }

    function createAssetsJson(componentsInfoArray) {
      return createWebpackAssetsJson(componentsInfoArray, assetsFilename);
    }

    return { isoPlugin, server, assetsFilename, createAssetsJson };
  };
};
