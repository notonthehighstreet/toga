module.exports = (deps) => {
  return function index() {

    const {
      'webpack-isomorphic-tools': IsomorphicTools,
      'webpack-isomorphic-tools/plugin': IsomorphicToolsPlugin,
      '/lib/universalRendering/createWebpackAssetsJson': createWebpackAssetsJson,
      '/lib/universalRendering/createIsoConfig': createIsoConfig
    } = deps;

    const assetsFilename = 'webpack-assets.json';

    function isoPlugin(component) {
      return (!Array.isArray(component))
        ? new IsomorphicToolsPlugin(createIsoConfig(component, assetsFilename))
        : null;
    }

    function server(path) {
      const isoTools = new IsomorphicTools(createIsoConfig('.', assetsFilename));
      return isoTools.server(path);
    }

    function createAssetsJson(components) {
      return createWebpackAssetsJson(components, assetsFilename);
    }

    return { isoPlugin, server, assetsFilename, createAssetsJson };
  };
};
