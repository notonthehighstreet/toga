module.exports = ({scopeId, componentDOM, componentPath, locale, bundleVendor}) => {
  const vendorBundleElement = bundleVendor ? `<script src="${componentPath}/vendor.js"></script>` : '';
  return `
    <div id="comp-${scopeId}">
      ${componentDOM}
    </div>
    <link rel="stylesheet" type="text/css" href="${componentPath}.css?scopeid=${scopeId}" />
    ${vendorBundleElement}
    <script src="${componentPath}.js?scopeid=${scopeId}&locale=${locale}"></script>
  `;
};
