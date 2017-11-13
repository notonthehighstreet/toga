module.exports = (deps) => {
  const {
    'react-router-dom/matchPath': matchPath,
    debug
  } = deps;
  const log = debug('toga:components:route');

  function getData(routesArray, url, dispatch, props) {
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

  function setData(routesArray, dispatch, props) {
    log('setData:start');
    const needs = [];
    routesArray
      .filter((route) => route.Component.data)
      .forEach((route) => {
        const result = route.Component.data(props);
        needs.push(dispatch(result));
      });
    log('setData: return promise');
    return Promise.all(needs);
  }

  return {
    getData, setData
  };
};
