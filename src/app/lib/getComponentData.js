/* eslint-disable no-param-reassign */
module.exports = (deps) => {
  const {
    'react' : React,
    'react-redux': redux,
    'react-router-dom/matchPath': matchPath,
    'react-router-dom/StaticRouter': staticRouter
  } = deps;

  const { Provider } = redux;
  const StaticRouter = staticRouter.default || staticRouter;

  function getRouteData(routesArray, url, dispatch, props) {
    const needs = [];
    routesArray
      .filter((route) => route.Component.needs)
      .forEach((route) => {
        const match = matchPath.default(url, { path: route.path, exact: route.exact, strict: false }); // exact should be true
        if (match) {
          route.Component.needs.forEach((need) => {
            const params = Object.assign({}, match.params, props);
            const result = need(params);
            needs.push(dispatch(result));
          });
        }
      });

    return Promise.all(needs);
  }

  function setRouteData(routesArray, url, dispatch, initialState) {
    const needs = [];
    routesArray
      .filter((route) => route.Component.data)
      .forEach((route) => {
        const match = matchPath.default(url, { path: route.path, exact: route.exact, strict: false }); // exact should be true
        if (match) {
          route.Component.data.forEach((dataDispatch) => {
            const result = dataDispatch(initialState);
            needs.push(dispatch(result));
          });
        }
      });

    return Promise.all(needs);
  }

  const Markup = ({ url, store, context, makeRoutes }) => (
    <Provider store={store}>
      <StaticRouter location={url} context={ context }>
        {makeRoutes()}
      </StaticRouter>
    </Provider>
  );

  const renderComponentWithData = (url, componentPath, Component, props, componentInitialState) => {
    let initStore;
    const context = {};
    const store = Component.store;
    const makeRoutes = Component.routes.makeRoutes;
    const routesArray = Component.routes.getRoutesConfig();

    if (componentInitialState) {
      initStore = setRouteData(routesArray, url, store.dispatch, componentInitialState);
    }
    else {
      initStore = getRouteData(routesArray, url, store.dispatch, props);
    }

    return initStore.then(() => {
      return ({
        initialState: store.getState(),
        Component: Markup({ url, store, context, makeRoutes })
      });
    });
  };

  const renderComponentWithProps = (Component, props) => {
    return Promise.resolve({ Component: React.createElement(Component, props) })
      .catch((err) => {
        throw Error(err);
      });
  };

  return function getComponentWithData({ url, Component, props, componentPath, componentInitialState }) {
    return (Component.store)
      ? renderComponentWithData(url, componentPath, Component, props, componentInitialState)
      : renderComponentWithProps(Component, props);
  };
};
