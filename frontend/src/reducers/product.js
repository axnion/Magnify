import * as types from '../constants';

export default (state = {
  isWaiting: false,
  products: [],
  error: null,
  filterByCompanyName: 'All',
}, action) => {
  switch (action.type) {
    case types.FILTER_BY_COMPANY:
      return {
        ...state,
        filterByCompanyName: action.filterByCompany,
      };
    case types.GET_PRODUCTS:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_PRODUCTS_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.GET_A_PRODUCT:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_A_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        isWaiting: false,
        error: null,
      };
    case types.GET_A_PRODUCT_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.CREATE_PRODUCT:
      return {
        ...state,
        isWaiting: true,
      };
    case types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        products: [...state.products, action.payload],
        error: null,
      };
    case types.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
