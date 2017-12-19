import * as types from '../constants';

export default (state = {
  success: false,
  error: false,
  message: '',
}, action) => {
  switch (action.type) {
    case types.SNACKBAR_SUCCESS:
      return {
        ...state,
        success: true,
        message: action.message,
      };
    case types.SNACKBAR_ERROR:
      return {
        ...state,
        success: false,
        error: true,
        message: action.message,
      };
    case types.SNACKBAR_RESET:
      return {
        ...state,
        success: false,
        error: false,
        message: '',
      }; 
    default:
      return state;
  }
};
