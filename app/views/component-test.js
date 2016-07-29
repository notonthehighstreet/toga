module.exports = (deps) => {
  return ({componentDOM, componentName, context}) => {
    const config = deps['/lib/getAppConfig']();
    const apiVersionPrefix = `/v${config.apiVersion}`;

    return `
<!DOCTYPE html>
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
    <link rel="stylesheet" type="text/css" href='${apiVersionPrefix}/core.css'>
    <link rel="stylesheet" type="text/css" href='${apiVersionPrefix}/styles.css?components=["${componentName}"]'>
    </head>
    <body>
    <div toga="${componentName}" props='${JSON.stringify(context)}'>${componentDOM}</div>
    <script src='${apiVersionPrefix}/components-vendor-bundle.js?components=["${componentName}"]'></script>
    <script src='${apiVersionPrefix}/components.js?components=["${componentName}"]'></script>
    </body>
    </html>
    `;
  };
};
