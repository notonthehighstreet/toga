const togaComponent = require('toga-component');
const bootstrap = togaComponent.bootstrapReact;

bootstrap({
  component: require('./')({locale: BUNDLE_LOCALE}),
  componentName: 'copyright'
});
