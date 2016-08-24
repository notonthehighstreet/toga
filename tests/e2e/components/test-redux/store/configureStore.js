import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import effects from 'redux-effects';
import fetch from 'redux-effects-fetch';
import multi from 'redux-multi';
import { polyfill } from 'es6-promise';
polyfill();

import rootReducer from '../reducers';

export default (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, multi, effects, fetch)
  );
};
