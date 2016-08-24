import {handleActions} from 'redux-actions';

export default handleActions({

  PRODUCT_TOGGLED: (state) => {
    return Object.assign({}, state, {
      removed: !state.removed,
      status: 'toggled'
    });
  }
});
