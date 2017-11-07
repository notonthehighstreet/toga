module.exports = (deps) => {
  const {
    'react' : React,
    'react-redux': redux,
    'react-router-dom/StaticRouter': staticRouter,
  } = deps;

  const { Provider } = redux;
  const StaticRouter = staticRouter.default || staticRouter;

  return function Markup({ url, store, context, makeRoutes }) {
    return (
      <Provider store={store}>
        <StaticRouter location={url} context={ context }>
          {makeRoutes()}
        </StaticRouter>
      </Provider>
    );
  };
};
