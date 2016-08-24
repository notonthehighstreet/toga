var html = require('../template/html');
var rp = require('request-promise');

const props = {
  'initialState': {
    'products': [
      {
        'image': 'http://localhost:3001/v1/test-redux/assets/comic-book.jpg',
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
  const scripts = [
    'http://localhost:3001/v1/components-vendor-bundle.min.js',
    'http://localhost:3001/v1/test-redux.min.js'
  ];
  const styles = [
    'http://localhost:3001/v1/core.css',
    'http://localhost:3001/v1/test-redux.min.css'
  ];
  Promise.all([
    rp(`http://localhost:3001/v1/test-redux.raw.html?props=${JSON.stringify(props)}`)
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'test-redux',
        body: htmlStrings.join('<hr/>'),
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
