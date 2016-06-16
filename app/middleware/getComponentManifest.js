module.exports = (deps) => {
  return function getComponentManifest(req, res, next) {
    const {
      'fs': fs,
      '/lib/getAppConfig': getAppConfig
      } = deps;
    const { componentsPath } = getAppConfig();
    const manifestPath = `${componentsPath}${req.componentPath}/manifest.json`;

    fs.readFile(manifestPath, 'utf8', (err, data) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type: application/json').send(data);
    });
  };
};
