import * as types from '../constants';

export default (state = {
  isWaiting: false,
  error: null,
}, action) => {
  switch (action.type) {
    case types.CREATE_POST:
      return {
        ...state,
        isWaiting: true,
      };
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        error: null,
      };
    case types.CREATE_POST_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
