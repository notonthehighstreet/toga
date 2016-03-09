module.exports = (deps) => {
  return function createStylesRouter() {
    const {
      'express': express,
      '/middleware/setComponentsContext': setComponentsContext,
      '/middleware/getComponentStyles': getComponentStyles,
      '/middleware/getTogaStyles': getTogaStyles
      } = deps;
    const router = express.Router();

    router.get(/^\/toga.css$/,
      getTogaStyles
    );
    router.get(/^\/styles.css$/,
      setComponentsContext({paramName: 'components'}),
      getComponentStyles
    );

    return router;
  };
};
