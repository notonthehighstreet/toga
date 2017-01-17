module.exports = (deps) => {
  return ({ componentDOM, componentName, props, bundles }) => {
    const encode = deps['entities'].encodeHTML;
    const bundle = bundles[componentName];
    const vendorBundle = bundles['vendor'];

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
    ${ vendorBundle && vendorBundle.css ? `<link rel="stylesheet" type="text/css" href='${vendorBundle.css}'>` : '' }
    <link rel="stylesheet" type="text/css" href='${bundle.css}'>
    </head>
    <body>
    <div toga="${encode(componentName)}" props='${encode(JSON.stringify(props))}'>${componentDOM}</div>
    ${ vendorBundle ? `<script src='${vendorBundle.js}'></script>` : '' }
    <script src='${bundle.js}'></script>
    </body>
    </html>
    `;
  };
};
