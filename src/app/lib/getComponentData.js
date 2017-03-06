/* eslint-disable no-param-reassign */
module.exports = (deps) => {
  const {
    'react' : React,
    'react-redux': redux
  } = deps;
  const { Provider } = redux;

  const Markup = ({ Component, store, props }) => (
    <Provider store={store}>
      <Component {...props } />
    </Provider>
  );

  function getData({ Component, props, componentPath}) {
    const needs = [];
    let store;
    if (Component.needs) {
      try {
        const configureStore = require(`${componentPath}/store/configure-store.js`);
        store = configureStore.default ? configureStore.default() : configureStore();
      }
      catch (e) {
        throw new Error(`Store does not exist for component with needs : ${componentPath}/store/configure-store.js`);
      }

      Component.needs.forEach((need) => {
        const result = need(props);
        needs.push(store.dispatch(result));
      });
      return Promise.all(needs).then(() => {
        return ({
          initialState: store.getState(),
          Component: Markup({Component, store, props})
        });
      });
    }
    return Promise.resolve({ Component: React.createElement(Component, props) });
  }

  return function getComponentWithData({ Component, props, componentPath }) {
    return getData({ Component, props, componentPath })
      .catch((err) => {
        throw Error(err);
      });
  };
};
