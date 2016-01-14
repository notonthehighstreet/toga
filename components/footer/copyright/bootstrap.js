const bootstrap = require('toga-component/bootstrap-react');

bootstrap({
  phrases: require('./i18n.json')[BUNDLE_LOCALE],
  component: require('./'),
  scopeId: SCOPE_ID
});
