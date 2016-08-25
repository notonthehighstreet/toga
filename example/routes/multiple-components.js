var html = require('../template/html');
var rp = require('request-promise');

module.exports = function multiple(req, res) {
  const scripts = [
    'http://localhost:3001/v1/components-vendor-bundle.min.js',
    'http://localhost:3001/v1/components.min.js?components=["test-one","test-multiple"]'
  ];
  const styles = [
    'http://localhost:3001/v1/core.css',
    'http://localhost:3001/v1/components.min.css?components=["test-one","test-multiple"]'
  ];
  Promise.all([
    rp('http://localhost:3001/v1/test-one.raw.html?props={"one":"toe"}'),
    rp('http://localhost:3001/v1/test-multiple.raw.html?props={"one":"head"}')
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'multiple',
        body: htmlStrings.join('<hr/>'),
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
