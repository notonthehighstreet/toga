/* eslint-disable no-param-reassign */
import React from 'react';
import { Provider } from 'react-redux';

const Markup = (store, props) => (
  <Provider store={store}>
    <Component {...props } />
  </Provider>
);

async function getData({ Component, props, componentPath}) {
  const needs = [];
  if (Component.needs) {
    const configureStore = require(`${componentPath}/store/configure-store.js`);
    const store = configureStore();

    Component.needs.forEach((need) => {
      const result = need(props);
      needs.push(store.dispatch(result));
    });
    await Promise.all(needs);
    return {
      initialState : store.getState(),
      Component : Markup(store, props)
    };
  }
  return { Component };
}

function getComponentWithData({ Component, props, componentPath}) {

  return getData({ Component, props, componentPath})
    .catch((err) => {
      throw Error(err);
    });
}

export default getComponentWithData;
