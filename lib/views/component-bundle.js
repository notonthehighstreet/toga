module.exports = ({scopeId, componentDOM, componentPath, locale}) => {
  return `<div id="comp-${scopeId}">
  ${componentDOM}
</div>
<link rel="stylesheet" type="text/css" href="${componentPath}.css?scopeid=${scopeId}" />
<script src="${componentPath}.js?scopeid=${scopeId}&locale=${locale}"></script>`;
};
