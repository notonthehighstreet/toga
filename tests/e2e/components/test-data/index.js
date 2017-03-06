import React from 'react';
import { Provider } from 'react-redux';
import debug from 'debug';

import Swapi from './container/Swapi/Swapi';
import configureStore from './store/configure-store';

debug('base:Root');

// exported to be used in tests
const store = configureStore(typeof window !== 'undefined' ? window.__INITIAL_STATE__ : { data: {} }); // eslint-disable-line

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Swapi />
      </Provider>
    );
  }
}
