/* eslint-disable no-param-reassign */
import React from 'react';
import { Provider } from 'react-redux';
import debug from 'debug';

const log = debug('toga:getComponentData');

export function fetchComponentData(dispatch, component, params) {
  const componentsWithNeeds = [];
  const wrapper = component.WrappedComponent;
  if (component.needs) {
    componentsWithNeeds.push(wrapper ? wrapper.name : component.name);
  }
  log('componentsWithNeeds', componentsWithNeeds);
  const promises = needs.map((need) => dispatch(need(params)));
  return Promise.all(promises);
}


export default ({ Component, props, componentPath}) => {

  console.log(componentPath)
  const configureStore = require(`${componentPath}/store/configure-store.js`);
  const store = configureStore();

  const Markup = (
    <Provider store={store}>
      <Component {...props } />
    </Provider>
  );

  const setContext = () => ({
    initialState : store.getState(),
    Markup : Markup
  });

  return fetchComponentData(store.dispatch, Component)
    .then(setContext)
    .catch((err) => {
      // todo: render error
      throw Error(err);
    });
};
