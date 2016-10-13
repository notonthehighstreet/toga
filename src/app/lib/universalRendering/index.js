module.exports = (deps) => {
  return function index() {

    const {
      'webpack-isomorphic-tools': IsomorphicTools,
      'webpack-isomorphic-tools/plugin': IsomorphicToolsPlugin,
      '/lib/universalRendering/createWebpackAssetsJson': createWebpackAssetsJson,
      '/lib/universalRendering/createIsoConfig': createIsoConfig,
      debug
    } = deps;

    const log = debug('toga:universalRendering'); // eslint-disable-line
    const assetsFilename = 'webpack-assets.json';

    function isoPlugin(componentPath) {
      return new IsomorphicToolsPlugin(createIsoConfig(componentPath, assetsFilename));
    }

    function server(path, repoPath) {
      const isoTools = new IsomorphicTools(createIsoConfig(repoPath, assetsFilename));
      return isoTools.server(path);
    }

    function createAssetsJson(componentsInfoArray, options) {
      return createWebpackAssetsJson(componentsInfoArray, assetsFilename, options);
    }

    return { isoPlugin, server, assetsFilename, createAssetsJson };
  };
};
