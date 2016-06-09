/* global togaComponentSource: true */
/* global togaComponentName: true */
const bootstrap = require('toga-component').bootstrapReact;
const wrapComponent = require('toga-component').wrapComponent;
const TogaComponent = wrapComponent(togaComponentSource, togaComponentName);

bootstrap({
  component: TogaComponent,
  componentName: togaComponentName
});
