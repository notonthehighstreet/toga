import getGtmDataLayer from '../../getGtmDataLayer';

export default () => {

  return next => action => {
    if (action.type === 'EFFECT_GTM') {
      getGtmDataLayer().push(action.payload);
    }

    return next(action);
  };
};
