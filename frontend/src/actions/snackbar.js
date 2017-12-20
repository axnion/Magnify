import * as types from '../constants';


export function resetSnackbar() {
  return {
    type: types.SNACKBAR_RESET,
  };
}

export function snackbarError(message) {
  return {
    type: types.SNACKBAR_ERROR,
    message,
  };
}

export function snackbarSuccess(message) {
  return {
    type: types.SNACKBAR_SUCCESS,
    message,
  };
}
