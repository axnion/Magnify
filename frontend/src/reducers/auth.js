import * as types from '../constants';

export default (state = {
  isWaiting: false,
  error: null,
  token: null,
  username: null,
  id: null,
  role: null,
  company: null,
}, action) => {
  switch (action.type) {
    case types.LOG_IN:
      return {
        ...state,
        isWaiting: true,
        token: null,
        username: null,
        id: null,
        role: null,
        company: null,
      };
    case types.LOG_IN_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        error: null,
        token: action.payload.accessToken,
        username: action.payload.user.username,
        id: action.payload.user.id,
        role: action.payload.user.role,
        company: action.payload.user.company,
      };
    case types.LOG_IN_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
        token: null,
        username: null,
        id: null,
        role: null,
        company: null,
      };
    case types.LOG_OUT:
      return {
        ...state,
        isWaiting: false,
        error: null,
        token: null,
        username: null,
        id: null,
        role: null,
        company: null,
      };
    default:
      return state;
  }
};
