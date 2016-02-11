module.exports = ({componentDOM, componentPath, locale, context}) => {
  return `
    <html>
    <head>
    <title>Toga Test - ${componentPath}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css" >
    <link rel="stylesheet" type="text/css" href='toga.css'>
    <link rel="stylesheet" type="text/css" href='styles.css?components=["${componentPath}"]'>
    </head>
    <body>
    <div toga="${componentPath}" props='${JSON.stringify(context)}'
    class="toga-component toga-${componentPath}">
      ${componentDOM}
    </div>
    <script src='components-vendor-bundle.js?components=["${componentPath}"]'></script>
    <script src='components.js?components=[{"name": "${componentPath}"}]&locale=${locale}'></script>
    </body>
    </html>
    `;
};
