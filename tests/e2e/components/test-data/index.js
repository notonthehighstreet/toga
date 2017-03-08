import React from 'react';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';
import debug from 'debug';

import Swapi from './containers/Swapi/Swapi';
import configureStore from './store/configure-store';
import { makeRoutes } from './routes';

debug('base:Root');
export const Router = typeof window !== 'undefined' ? BrowserRouter : StaticRouter;

export default class Root extends React.Component {

  static childrenWtihNeeds = Swapi;

  render() {
    const store = configureStore(typeof window !== 'undefined' ? window.__INITIAL_STATE__ : undefined); // eslint-disable-line
    return (
      <Provider store={ store }>
        <Router {...this.props} >
          {makeRoutes()}
        </Router>
      </Provider>
    );
  }
}
