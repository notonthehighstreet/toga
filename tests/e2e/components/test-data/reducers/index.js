import { combineReducers } from 'redux';

import * as actions from '../actions';

export function data(state = {}, action) {
  switch (action.type) {
  case `${actions.FETCH_SWAPI_DATA}_PENDING`:
    return {
      ...state,
      loading: true
    };
  case `${actions.FETCH_SWAPI_DATA}_FULFILLED`:
    return {
      ...state,
      loading: false,
      errors: action.payload.errors,
      swapi: action.payload.data,
      status: action.status
    };
  case `${actions.FETCH_SWAPI_DATA}_REJECTED`:
    return {
      ...state,
      loading: false,
      errors: [action.payload],
      status: action.status
    };
  default:
    return state;
  }
}

export default combineReducers({
  data
});
