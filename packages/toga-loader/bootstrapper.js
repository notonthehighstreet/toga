/* global togaComponentSource: true */
/* global togaComponentName: true */
/* global BUNDLE_LOCALE: true */
const bootstrap = require('toga-component').bootstrapReact;
const wrapComponent = require('toga-component').wrapComponent;
const TogaComponent = wrapComponent(togaComponentSource({locale:BUNDLE_LOCALE}), togaComponentName);

bootstrap({
  component: TogaComponent,
  componentName: togaComponentName
});
