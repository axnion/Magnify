import * as types from '../constants';

export default (state = {
  isWaiting: false,
  error: null,
  token: null,
  username: null,
}, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return {
        ...state,
        isWaiting: true,
        token: null,
        username: null,
      };
    case types.LOG_IN_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        error: null,
        token: action.payload.payload,
        username: action.payload.username,
      };
    case types.LOG_IN_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
        token: null,
        username: null,
      };
    default:
      return state;
  }
};
