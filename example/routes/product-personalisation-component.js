var html = require('../template/html');
var rp = require('request-promise');

module.exports = function one(req, res) {
  const scripts = [
    'http://localhost:8080/v1/components-vendor-bundle.js?components=["product-personalisation"]',
    'http://localhost:8080/v1/components.js?components=["product-personalisation"]'
  ];
  const styles = ['http://localhost:8080/v1/styles.css?components=["product-personalisation"]'];
  const context = {
    'title':'Personalise',
    'formFields':[
      {'type':'select', 'name':'colour', 'label': 'Colour', 'mandatory':'true', 'options':[ 'blue', 'green' ]},
      {'type':'select', 'name':'wrap', 'label': 'Gift Wrap Options', 'mandatory':'true', 'options':[
        { label: 'silver', value: 'expensive'}, { label: 'white', value: 'cheap'}
      ]},
      {'type':'text', 'name': 'front', 'label':'Front Personalisation', 'placeholder': '15 letters'}
    ],
    'qty':'1'
  };
  Promise.all([
    rp(`http://localhost:8080/v1/product-personalisation.html?context=${JSON.stringify(context)}`)
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
