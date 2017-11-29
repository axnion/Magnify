import * as types from '../constants';

export default (state = {
  error: null,
  isWaiting: false,
  product: null,
}, action) => {
  switch(action.type) {
    case types.GET_A_PRODUCT:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_A_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_A_PRODUCT_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};