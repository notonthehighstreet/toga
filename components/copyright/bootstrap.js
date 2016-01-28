const bootstrap = require('toga-component').bootstrapReact;

bootstrap({
  component: require('./')({locale: BUNDLE_LOCALE}),
  mountNodeId: MOUNT_NODE_ID
});
