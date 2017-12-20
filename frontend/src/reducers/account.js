import * as types from '../constants';

export default (state = {
  activeThreads: [],
  isWaiting: false,
  error: null,
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
      };
    case types.GET_ACCOUNT_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
