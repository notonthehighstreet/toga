const bootstrap = require('toga-component').bootstrapReact;

bootstrap({
  component: require('./')({locale: BUNDLE_LOCALE}),
  componentName: 'newsletter-subscribe'
});