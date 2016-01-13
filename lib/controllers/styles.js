const fs = require('fs');
const sass = require('node-sass');
const buildPath = (url) => {
  return url.replace(/styles\.css/, '');
};
const scopeSCSS = (scopeId, css) => {
  return `
    #comp-${scopeId} {
      ${css}
    }
  `;
};

module.exports = {
  scss: (req, res) => {
    const fileName = 'styles.scss';
    const componentsPath = './components';
    const scssPath = `${componentsPath}${buildPath(req.path)}${fileName}`;
    const scssFileContents = fs.readFileSync(scssPath, 'utf-8');
    const parsed = sass.renderSync({
      data: req.scopeId ? scopeSCSS(req.scopeId, scssFileContents) : scssFileContents
    });

    res.set('Content-Type', 'text/css').send(parsed.css); //TODO pipe css output into res
  }
};
