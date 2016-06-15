var html = require('../template/html');
var rp = require('request-promise');

module.exports = function multiple(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.js?components=["footer","test"]',
    'http://localhost:8080/v1/components.js?components=[{"name":"footer"},{"name":"test"}]'
  ];
  const styles = ['http://localhost:8080/v1/styles.css?components=["footer","test"]'];
  Promise.all([
    rp('http://localhost:8080/v1/footer.raw.html?context={"one":"toe"}&locale=de'),
    rp('http://localhost:8080/v1/test.raw.html?context={%22one%22:%22toe%22}&locale=de')
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'multiple',
        footer: htmlStrings[0],
        test: htmlStrings[1],
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
