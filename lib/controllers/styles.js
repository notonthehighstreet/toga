const fs = require('fs');
const sass = require('node-sass');
const scopeSCSS = (scopeId, css) => {
  return `
    #comp-${scopeId} {
      ${css}
    }
  `;
};
const buildSCSS = (scopeId, scssCode) => scopeId ? scopeSCSS(scopeId, scssCode) : scssCode;
const getScopeId = (req) => {
  return req.query.scopeid;
};

module.exports = {
  scss: (req, res) => {
    const fileName = 'styles.scss';
    const componentsPath = './components';
    const scssPath = `${componentsPath}${req.componentPath}/${fileName}`;
    const scssFileContents = fs.readFileSync(scssPath, 'utf-8');
    const scopeId = getScopeId(req);
    const parsed = sass.renderSync({
      data: buildSCSS(scopeId, scssFileContents)
    });

    res.set('Content-Type', 'text/css').send(parsed.css);
  }
};
