import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/account';

function beginCreateAccount() {
  return { type: types.CREATE_ACCOUNT };
}

function createAccountSuccess(payload) {
  return { 
    type: types.CREATE_ACCOUNT_SUCCESS,
    payload,
  }
}

function createAccountError(payload) {
  return {
    type: types.CREATE_ACCOUNT_ERROR,
    payload,
  }
}

export function createAccount(data) {
  return (dispatch) => {
    dispatch(beginCreateAccount());

    return apiRequest('post', data, endpoint)
      .then((response) => {
        dispatch(createAccountSuccess(response.data));
      })
      .catch((response) => {
        dispatch(createAccountError(response.message));
      });
  };
}