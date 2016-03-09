module.exports = (deps) => {
  return function createHtmlRouter() {
    const {
      'express': express,
      '/middleware/setComponentsContext': setComponentsContext,
      '/middleware/getComponentRawHtml': getComponentRawHtml,
      '/middleware/getComponentTestingHtml': getComponentTestingHtml
      } = deps;
    const router = express.Router();

    router.get(/.*\.raw\.html$/,
      setComponentsContext({paramName: 'context'}),
      getComponentRawHtml
    );
    router.get(/.*\.html$/,
      setComponentsContext({paramName: 'context'}),
      getComponentTestingHtml
    );

    return router;
  };
};
