import * as types from '../constants';

export default (state = {
  error: null,
  isWaiting: false,
  product: null,
}, action) => {
  switch(action.type) {
    case types.SELECT_A_PRODUCT:
      return {
        ...state,
        product: action.product,
      };
    default:
      return state;
  }
};