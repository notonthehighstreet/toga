var html = require('../template/html');
var rp = require('request-promise');

module.exports = function one(req, res) {
  const scripts = [
    `http://localhost:8080/v1/components-vendor-bundle.js?components=["test-one"]&locale=${req.query.locale || ''}`,
    `http://localhost:8080/v1/components.js?components=[{"name":"test-one"}]&locale=${req.query.locale || ''}`
  ];
  const styles = [`http://localhost:8080/v1/styles.css?components=["test-one"]&locale=${req.query.locale || ''}`];
  Promise.all([
    rp(`http://localhost:8080/v1/test-one.raw.html?context={"one":"toe"}&locale=${req.query.locale || ''}`)
  ])
    .then(function(htmlStrings) {
      res.send(html({
        id: 'locale',
        body: htmlStrings.join('<hr/>'),
        scripts: scripts,
        styles: styles
      }));
    })
    .catch(function(err) {
      res.send(err);
    });
};
