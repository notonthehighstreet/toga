/* eslint-disable no-param-reassign */
module.exports = (deps) => {
  const {
    'react' : React,
    '/lib/components/markup': Markup,
    '/lib/components/route': RouteOperations
  } = deps;

  const renderComponentWithData = (url, Component, props) => {
    const context = {};
    const store = Component.store;
    const makeRoutes = Component.routes.makeRoutes;
    const routesArray = Component.routes.getRoutesConfig();

    return RouteOperations.getData(routesArray, url, store.dispatch, props).then(() => {
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

  return function getComponentWithData({ url, Component, props }) {
    return (Component.store)
      ? renderComponentWithData(url, Component, props)
      : renderComponentWithProps(Component, props);
  };
};
