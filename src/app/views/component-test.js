module.exports = (deps) => {
  return ({componentDOM, componentName, props, coreStyles}) => {
    const getConfig = deps['/config/index'];
    const { apiVersion, vendor = {} } = getConfig();
    const apiVersionPrefix = `/v${apiVersion}`;
    const encode = deps['entities'].encodeHTML;
    const bundleFilename = deps['/lib/utils/bundleFilename'];
    const filename = bundleFilename(componentName);
    const vendorFilename = bundleFilename('vendor');

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
    <link rel="stylesheet" type="text/css" href='${apiVersionPrefix}/${componentName}/${filename}.css'>
    </head>
    <body>
    <div toga="${encode(componentName)}" props='${encode(JSON.stringify(props))}'>${componentDOM}</div>
    <script src='${apiVersionPrefix}/${vendor.componentName}/${vendorFilename}.js'></script>
    <script src='${apiVersionPrefix}/${componentName}/${filename}.js'></script>
    </body>
    </html>
    `;
  };
};
