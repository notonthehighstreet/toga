import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import * as actions from '../actions';

export function data(state = {}, action) {
  switch (action.type) {
  case `${actions.FETCH_SWAPI_DATA}_PENDING`:
    return {
      ...state
    };
  case `${actions.FETCH_SWAPI_DATA}_FULFILLED`:
    return {
      ...state,
      list: action.payload.list,
      name: action.payload.name
    };
  default:
    return state;
  }
}

export default combineReducers({
  data,
  routing
});
