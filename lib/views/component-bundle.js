module.exports = ({componentDOM, componentPath, locale, context}) => {
  return `
    <div toga="${componentPath}" prop='${JSON.stringify(context)}'
    class="toga-${componentPath}">
      ${componentDOM}
    </div>
    <link rel="stylesheet" type="text/css" href="${componentPath}.css" />
    <script src='components-vendor-bundle.js?components=["${componentPath}"]'></script>
    <script src='components.js?components=[{"name": "${componentPath}"}]&locale=${locale}'></script>
    `;
};
