import * as types from '../constants';

export default (state = {
  isWaiting: false,
  error: null,
}, action) => {
  switch (action.type) {
    case types.CREATE_CONSUMER:
      return {
        ...state,
        isWaiting: true,
      };
    case types.CREATE_CONSUMER_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        error: null,
      };
    case types.CREATE_CONSUMER_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
