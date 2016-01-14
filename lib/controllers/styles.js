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
const buildSCSS = (scopeId, scssCode) => scopeId ? scopeSCSS(scopeId, scssCode) : scssCode;

module.exports = {
  scss: (req, res) => {
    const fileName = 'styles.scss';
    const componentsPath = './components';
    const scssPath = `${componentsPath}${buildPath(req.path)}${fileName}`;
    const scssFileContents = fs.readFileSync(scssPath, 'utf-8');
    const parsed = sass.renderSync({
      data: buildSCSS(req.scopeId, scssFileContents)
    });

    res.set('Content-Type', 'text/css').send(parsed.css);
  }
};
