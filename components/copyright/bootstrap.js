const bootstrap = require('toga-component').bootstrapReact;

bootstrap({
  phrases: require('./i18n.json')[BUNDLE_LOCALE],
  component: require('./index'),
  scopeId: SCOPE_ID
});
