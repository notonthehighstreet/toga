import React from 'react';
import App from './containers/App';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';

import './app.scss';

export default ({initialState}) => {
  const store = configureStore(initialState);

  return <Provider store={store}>
    <App />
  </Provider>;
};
