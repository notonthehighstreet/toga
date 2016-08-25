var html = require('../template/html');
var rp = require('request-promise');

module.exports = function one(req, res) {
  const scripts = [
    'http://localhost:3001/v1/components-vendor-bundle.min.js',
    'http://localhost:3001/v1/test-one.min.js'
  ];
  const styles = [
    'http://localhost:3001/v1/core.css',
    'http://localhost:3001/v1/test-one.min.css'
  ];
  Promise.all([
    rp('http://localhost:3001/v1/test-one.raw.html?props={"one":"toe"}')
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'one',
        body: htmlStrings.join('<hr/>'),
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
