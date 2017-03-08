/* global window */
import React from 'react';
import { Provider } from 'react-redux';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router-dom/StaticRouter';

import configureStore from './store/configure-store';
import * as routes from './routes';

const Router = typeof window !== 'undefined' ? BrowserRouter : StaticRouter;
const store = configureStore(typeof window !== 'undefined' ? window.__INITIAL_STATE__ : undefined);

export default class Root extends React.Component {

  static store = store;
  static routes = routes;

  render() {
    return (
      <Provider store={ store }>
        <Router {...this.props} >
          {routes.makeRoutes()}
        </Router>
      </Provider>
    );
  }
}
