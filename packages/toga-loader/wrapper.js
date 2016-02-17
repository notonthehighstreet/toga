/* global togaComponentSource: true */
/* global togaComponentName: true */
const wrapComponent = require('toga-component').wrapComponent;

module.exports = ({locale}) => {
  return wrapComponent(togaComponentSource({locale}), togaComponentName);
};
