/* eslint-disable no-param-reassign */
module.exports = (deps) => {
  const {
    'react': React,
    'react-redux': redux,
    'react-router-dom/matchPath': matchPath,
    'react-router-dom/StaticRouter': staticRouter
  } = deps;

  const ACTION_REQUIRED_WITH_PROPS = 'needs';
  const ACTION_REQUIRED_WITH_DATA = 'data';

  const { Provider } = redux;
  const StaticRouter = staticRouter.default || staticRouter;

  function routerActionDispatcher(routesArray, url, actionsVariableName, actionDispatcherPerRoute) {
    const actionsToDispatch = [];
    routesArray
      .filter((route) => route.Component[actionsVariableName])
      .forEach((route) => {
        const match = matchPath.default(url, { path: route.path, exact: route.exact, strict: false }); // exact should be true
        if (match) {
          route.Component[actionsVariableName].forEach(actionDispatcherPerRoute(actionsToDispatch, match));
        }
      });

    return Promise.all(actionsToDispatch);
  }

  function getRouteData(routesArray, url, dispatch, props) {
    return routerActionDispatcher(routesArray, url, ACTION_REQUIRED_WITH_PROPS, (actionsToDispatch, match) => {
      return (actionToDispatch) => {
        const params = Object.assign({}, match.params, props);
        const result = actionToDispatch(params);
        actionsToDispatch.push(dispatch(result));
      };
    });
  }

  function setRouteData(routesArray, url, dispatch, data) {
    return routerActionDispatcher(routesArray, url, ACTION_REQUIRED_WITH_DATA, (actionsToDispatch) => {
      return (dataDispatch) => {
        const result = dataDispatch(data);
        actionsToDispatch.push(dispatch(result));
      };
    });
  }

  const Markup = ({ url, store, context, makeRoutes }) => (
    <Provider store={store}>
      <StaticRouter location={url} context={ context }>
        {makeRoutes()}
      </StaticRouter>
    </Provider>
  );

  const renderComponentWithData = (url, componentPath, Component, componentData) => {
    let initStore;
    const context = {};
    const store = Component.store;
    const makeRoutes = Component.routes.makeRoutes;
    const routesArray = Component.routes.getRoutesConfig();

    if (componentData.data) {
      initStore = setRouteData(routesArray, url, store.dispatch, componentData.data);
    }
    else {
      initStore = getRouteData(routesArray, url, store.dispatch, componentData.props);
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

  return function getComponentWithData({ url, Component, componentData, componentPath }) {
    return (Component.store)
      ? renderComponentWithData(url, componentPath, Component, componentData)
      : renderComponentWithProps(Component, componentData.props);
  };
};
