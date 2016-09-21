module.exports = (deps) => {
  return ({componentDOM, componentName, props, coreStyles}) => {
    const getConfig = deps['/config/index'];
    const config = getConfig();
    const apiVersionPrefix = `/v${config.apiVersion}`;
    const encode = deps['entities'].encodeHTML;

    return `<!DOCTYPE html>
  <html dir="ltr" lang="en">
  <head>
    <meta charset="UTF-8">
    <script>
      var dm = document.documentMode;
      document.documentElement.className += dm ? ' oldie ie' + dm : '';
    </script>
    <title>Toga Test - ${componentName}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    ${coreStyles ? `<link rel="stylesheet" type="text/css" href='${coreStyles}'>` : ''}
    <link rel="stylesheet" type="text/css" href='${apiVersionPrefix}/components.css?components=["${componentName}"]'>
    </head>
    <body>
    <div toga="${encode(componentName)}" props='${encode(JSON.stringify(props))}'>${componentDOM}</div>
    <script src='${apiVersionPrefix}/components-vendor-bundle.js?components=["${componentName}"]'></script>
    <script src='${apiVersionPrefix}/components.js?components=["${componentName}"]'></script>
    </body>
    </html>
    `;
  };
};
