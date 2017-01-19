const html = require('../template/html');
const { getAssets, getHtml } = require('../utils');

module.exports = function multipleNested(req, res) {
  let assets;
  return Promise.resolve()
    .then(() => getAssets(['test-nested', 'test-one']))
    .then(({ scripts, styles }) => {
      assets = { scripts, styles };
      return getHtml([
        'test-one.raw.html?props={"one":"toe"}',
        'test-nested.raw.html?props={"one":"head"}'
      ]);
    })
    .then((htmlStrings) => {
      res.send(html({
        id: 'multiple-nested',
        body: htmlStrings.join('<hr/>'),
        scripts: assets.scripts,
        styles: assets.styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
