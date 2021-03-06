const html = require('../template/html');
const { getAssets, getHtml } = require('../utils');

const props = {
  'initialState': {
    'products': [
      {
        'image': 'http://localhost:3001/test-redux/assets/comic-book.jpg',
        'title': 'Superhero Comic Book',
        'price': {
          'currency': 'GBP',
          'amount': 1699
        },
        'code': 393327,
        'removed': false
      }
    ],
    'listId': '1'
  }
};

module.exports = function one(req, res) {
  let assets;
  return Promise.resolve()
    .then(() => getAssets(['test-redux']))
    .then(({ scripts, styles }) => {
      assets = { scripts, styles };
      return getHtml([`test-redux.raw.html?props=${JSON.stringify(props)}`]);
    })
    .then((htmlStrings) => {
      res.send(html({
        id: 'test-redux',
        body: htmlStrings.join('<hr/>'),
        scripts: assets.scripts,
        styles: assets.styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
