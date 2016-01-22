const fs = require('fs');

module.exports = {
  manifest(req, res, next) {
    const manifestPath = `./components${req.componentPath}/manifest.json`;

    fs.readFile(manifestPath, 'utf8', (err, data) => {
      if (err) {
        return next(err);
      }
      res.set('Content-Type: application/json').send(data);
    });
  }
};
