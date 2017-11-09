import * as types from '../constants';

export default (state = {
  isWaiting: false,
  examples: [],
  error: null,
}, action) => {
  switch (action.type) {
    case types.GET_EXAMPLES:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_EXAMPLES_SUCCESS:
      return {
        ...state,
        examples: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_EXAMPLES_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
