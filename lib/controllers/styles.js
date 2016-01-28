const fs = require('fs');
const sass = require('node-sass');
const async = require('async');
const getComponentManifest = require('../lib/getComponentManifest');
const getComponentDependencies = require('../lib/getComponentDependencies');
const loadSCSS = (componentName, cb) => {
  fs.readFile(`./components/${componentName}/styles.scss`, 'utf-8', cb);
};
const scopeSCSS = (scopeId, scss) => {
  return `#comp-${scopeId} {
    ${scss}
  }`;
};

module.exports = {
  scss: (req, res) => {
    const manifest = getComponentManifest(req.componentPath.replace(/\//g, ''));
    const components = getComponentDependencies(manifest);

    async.map(components, loadSCSS, (err, results) => {
      const allSCSS = results.join('\n');
      const scopedSCSS = scopeSCSS(req.mountNodeId, allSCSS);
      const parsed = sass.renderSync({
        data: scopedSCSS
      });

      res.set('Content-Type', 'text/css').send(parsed.css);
    });
  }
};
