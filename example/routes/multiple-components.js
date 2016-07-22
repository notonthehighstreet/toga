var html = require('../template/html');
var rp = require('request-promise');

module.exports = function multiple(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.js?components=["test-one","test-multiple"]',
    'http://localhost:8080/v1/components.js?components=["test-one","test-multiple"]'
  ];
  const styles = [
    'http://localhost:8080/v1/core.css',
    'http://localhost:8080/v1/styles.css?components=["test-one","test-multiple"]'
  ];
  Promise.all([
    rp('http://localhost:8080/v1/test-one.raw.html?context={"one":"toe"}'),
    rp('http://localhost:8080/v1/test-multiple.raw.html?context={"one":"head"}')
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
