module.exports = (deps) => {
  return function createStylesRouter() {
    const {
      'express': express,
      '/middleware/setComponentsContext': setComponentsContext,
      '/middleware/getComponentStyles': getComponentStyles
      } = deps;
    const router = express.Router();

    router.get(/^\/styles.css$/,
      setComponentsContext({paramName: 'components'}),
      getComponentStyles
    );

    return router;
  };
};
