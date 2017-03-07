/* eslint-disable no-param-reassign */
module.exports = (deps) => {
  const {
    'react' : React,
    'react-dom/server' : ReactDOMServer,
    'react-redux': redux,
    'react-router-dom/matchPath': matchPath,
    'react-router-dom/StaticRouter': staticRouter,
  } = deps;
  const { Provider } = redux;
  const StaticRouter = staticRouter.default || staticRouter

  function getRouteData(routesArray, url, dispatch) {
    const needs = [];
    routesArray
      .filter((route) => route.Component.needs)
      .forEach((route) => {
        const match = matchPath.default(url, { path: route.path, exact: route.exact, strict: false }); // exact should be true
        console.log(match)
        if (match) {
          route.Component.needs.forEach((need) => {
            const result = need(match.params);
            needs.push(dispatch(result));
          });
        }
      });
    return Promise.all(needs);
  }

  const Markup = ({ url, store, context, makeRoutes }) => (
    <Provider store={store}>
      <StaticRouter location={url} context={ context } >
        {makeRoutes()}
      </StaticRouter>
    </Provider>
  );

  const renderComponentWithData = (url, componentPath) => {
    const needs = [];
    const context = {};
    let store;
    let makeRoutes;
    let routesArray;
    try {
      const configureStore = require(`${componentPath}/store/configure-store`);
      const routes = require(`${componentPath}/routes`);
      makeRoutes = routes.makeRoutes;
      routesArray = routes.getRoutesConfig();
      store = configureStore.default ? configureStore.default() : configureStore();
    }
    catch (e) {
      throw new Error(`Store does not exist for component with needs : ${componentPath}/store/configure-store.js`);
    }

    return getRouteData(routesArray, url, store.dispatch).then(() => {
      return ({
        initialState: store.getState(),
        Component: Markup({ url, store, context, makeRoutes })
      });
    });
  };

  const renderComponentWithProps = (Component, props) => {
    console.log('renderComponentWithProps', Component)
    return Promise.resolve({ Component: React.createElement(Component, props) })
      .catch((err) => {
        throw Error(err);
      });
  };

  return function getComponentWithData({ url, Component, props, componentPath }) {
    return (Component.childrenWtihNeeds)
      ? renderComponentWithData(url, componentPath)
      : renderComponentWithProps(Component, props);
    };
};
