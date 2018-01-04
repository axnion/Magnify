import * as types from '../constants';

export default (state = {
  activeThreads: [],
  isWaiting: false,
  error: null,
  selectedProducts: [],
}, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT:
      return {
        ...state,
        isWaiting: true,
      };
    case types.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        error: null,
      };
    case types.CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.LOG_OUT:
      return {
        ...state,
        isWaiting: false,
        error: null,
        activeThreads: [],
        selectedProducts: [],
      };
    case types.GET_ACCOUNT:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        activeThreads: action.payload.activeThreads,
        isWaiting: false,
        error: null,
        selectedProducts: action.payload.selectedProducts,
      };
    case types.GET_ACCOUNT_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.ADD_TO_FAVORITES:
      return {
        ...state,
        isWaiting: true,
      };
    case types.ADD_TO_FAVORITES_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        selectedProducts: [...state.selectedProducts, action.payload],
      };
    case types.ADD_TO_FAVORITES_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
