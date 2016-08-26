import { combineReducers } from 'redux';
import products from './products';
import listId from './listId';

export default combineReducers({
  products, listId
});
