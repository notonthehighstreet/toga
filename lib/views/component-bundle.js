module.exports = ({scopeId, componentDOM, componentPath, locale}) => {
  return `
    <div id="comp-${scopeId}">
      ${componentDOM}
    </div>
    <link rel="stylesheet" type="text/css" href="${componentPath}.css?scopeid=${scopeId}" />
    <script src="components-vendor-bundle.js?components[]=${componentPath}"></script>
    <script src="${componentPath}.js?scopeid=${scopeId}&locale=${locale}"></script>
  `;
};
