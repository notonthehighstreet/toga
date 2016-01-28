module.exports = ({mountNodeId, componentDOM, componentPath, locale}) => {
  return `
    <div id="comp-${mountNodeId}">
      ${componentDOM}
    </div>
    <link rel="stylesheet" type="text/css" href="${componentPath}.css" />
    <script src="components-vendor-bundle.js?components[]=${componentPath}"></script>
    <script src="${componentPath}.js?mountNodeId=${mountNodeId}&locale=${locale}"></script>
  `;
};
