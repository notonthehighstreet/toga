module.exports = (deps) => {
  return function createStylesRouter() {
    const {
      'express': express,
      '/middleware/setComponentsContext': setComponentsContext,
      '/middleware/getVendorJs': getVendorJs,
      '/middleware/getComponentJs': getComponentJs
      } = deps;
    const router = express.Router();

    router.get(/^\/components-vendor-bundle\.js$/,
      setComponentsContext({paramName: 'components'}),
      getVendorJs
    );
    router.get(/^\/components\.js$/,
      setComponentsContext({paramName: 'components'}),
      getComponentJs
    );

    return router;
  };
};
