import {handleActions} from 'redux-actions';
import product from './product';

export default handleActions({

  PRODUCT_TOGGLED: (state, action) => {
    return state.map(t => {
      if (t.code === action.payload.productCode) {
        return product(t, action);
      }

      return t;
    });
  }

}, []);
