/* global togaComponentSource: true */
/* global togaComponentName: true */
/* global BUNDLE_LOCALE: true */
const bootstrap = require('toga-component').bootstrapReact;

bootstrap({
  component: togaComponentSource({locale:BUNDLE_LOCALE}),
  componentName: togaComponentName
});
