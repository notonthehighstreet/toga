module.exports = (deps) => {
  return function getComponentManifest(req, res, next) {
    const {
      'fs': fs
      } = deps;
    const manifestPath = `./components${req.componentPath}/manifest.json`;

    fs.readFile(manifestPath, 'utf8', (err, data) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type: application/json').send(data);
    });
  };
};
