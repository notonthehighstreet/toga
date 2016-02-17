const config = require('../../config/appConfig');
const apiVersionPrefix = `/v${config.apiVersion}`;

module.exports = ({componentDOM, componentName, locale, context}) => {
  return `
    <html>
    <head>
    <title>Toga Test - ${componentName}</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" >
    <link rel="stylesheet" type="text/css" href='${apiVersionPrefix}/toga.css'>
    <link rel="stylesheet" type="text/css" href='${apiVersionPrefix}/styles.css?components=["${componentName}"]'>
    </head>
    <body>
    <div toga="${componentName}" prop='${JSON.stringify(context)}'>${componentDOM}</div>
    <script src='${apiVersionPrefix}/components-vendor-bundle.js?components=["${componentName}"]'></script>
    <script src='${apiVersionPrefix}/components.js?components=[{"name": "${componentName}"}]&locale=${locale}'></script>
    </body>
    </html>
    `;
};
