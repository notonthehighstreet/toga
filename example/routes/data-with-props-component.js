const html = require('../template/html');
const { getAssets, getHtml } = require('../utils');

module.exports = function data(req, res) {
  let assets;
  Promise.resolve()
    .then(() => getAssets(['test-data-with-props']))
    .then(({ scripts, styles }) => {
      assets = { scripts, styles };
      const props = JSON.stringify({ list: [1, 2, 3, 4], name: 'Joe' });
      return getHtml(['test-data-with-props.raw.html?props=' + props]);
    })
    .then((htmlStrings) => {
      res.send(html({
        id: 'data-with-props',
        body: htmlStrings.join('<hr/>'),
        scripts: assets.scripts,
        styles: assets.styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
