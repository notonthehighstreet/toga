module.exports = (deps) => {
  const {
    '/lib/components/markup': Markup,
    '/lib/components/route': RouteOperations
  } = deps;

  function renderComponentWithData({ url, Component, props }) {
    const context = {};
    const store = Component.store;
    const makeRoutes = Component.routes.makeRoutes;
    const routesArray = Component.routes.getRoutesConfig();

    return RouteOperations.setData(routesArray, store.dispatch, props).then(() => {
      return ({
        initialState: store.getState(),
        Component: Markup({ url, store, context, makeRoutes })
      });
    });
  }

  return renderComponentWithData;
};
