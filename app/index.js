module.exports = (deps) => {
  return function startApp({port, host}) {
    const {
      '/createServer': createServer,
      '/lib/getComponentNames': getComponentNames,
      '/lib/createWebpackAssetsJson': createWebpackAssetsJson,
      '/lib/createIsoConfig': createIsoConfig,
      'webpack-isomorphic-tools': IsomorphicTools,
      debug,
      path
    } = deps;

    const log = debug('toga:startup');
    const components = getComponentNames();
    const isoTools = new IsomorphicTools(createIsoConfig('.'));

    log(`${components.length} components`);

    return createWebpackAssetsJson(components)
      .then(() => {
        return isoTools.server(path.join(__dirname, '..'));
      })
      .then(() => {
        return new Promise((resolve) => {
          const server = createServer().listen(port, host, () => {
            resolve(server);
          });
        });
      });
  };
};
