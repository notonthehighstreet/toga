module.exports = (deps) => {
  return ({componentDOM, componentName, props}) => {
    const getConfig = deps['/config/index'];
    const { vendor = {} } = getConfig();
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
    <link rel="stylesheet" type="text/css" href='/${vendor.componentName}/${vendorFilename}.min.css'>
    <link rel="stylesheet" type="text/css" href='/${componentName}/${filename}.min.css'>
    </head>
    <body>
    <div toga="${encode(componentName)}" props='${encode(JSON.stringify(props))}'>${componentDOM}</div>
    <script src='/${vendor.componentName}/${vendorFilename}.min.js'></script>
    <script src='/${componentName}/${filename}.min.js'></script>
    </body>
    </html>
    `;
  };
};
