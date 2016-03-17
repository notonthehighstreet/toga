module.exports = (deps) => {
  return function createStylesRouter() {
    const {
      'express': express,
      '/middleware/setComponentsContext': setComponentsContext,
      '/middleware/getVendorBundle': getVendorBundle,
      '/middleware/getComponentBundle': getComponentBundle,
      '/middleware/setComponentNames': setComponentNames
      } = deps;
    const router = express.Router();

    router.get(/^\/components-vendor-bundle\.js$/,
      setComponentNames,
      getVendorBundle
    );
    router.get(/^\/components\.js$/,
      setComponentsContext({paramName: 'components'}),
      getComponentBundle
    );

    return router;
  };
};
