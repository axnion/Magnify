import crypto from 'crypto';
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
  };
}

function createAccountError(payload) {
  return {
    type: types.CREATE_ACCOUNT_ERROR,
    payload,
  };
}

export function createAccount(data, token) {
  return (dispatch) => {
    dispatch(beginCreateAccount());

    return apiRequest('post', data, endpoint, token)
      .then((response) => {
        dispatch(createAccountSuccess(response.data));
      })
      .catch((response) => {
        dispatch(createAccountError(response.message));
      });
  };
}

function beginGetAccount() {
  return { type: types.GET_ACCOUNT };
}

function getAccountSuccess(payload) {
  return {
    type: types.GET_ACCOUNT_SUCCESS,
    payload,
  };
}

function getAccountError(payload) {
  return {
    type: types.GET_ACCOUNT_ERROR,
    payload,
  };
}

export function getAccount(id) {
  return (dispatch) => {
    dispatch(beginGetAccount());

    return apiRequest('get', {}, `${endpoint}/${id}`)
      .then((response) => {
        dispatch(getAccountSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getAccountError(response.message));
      });
  };
}

export function mockCreateAccount(data) {
  return (dispatch) => {
    dispatch(beginCreateAccount());

    return new Promise((resolve, reject) => (setTimeout(() => {
      const {
        username,
        password,
        admin,
        company,
      } = data;

      if (!username || !password || !admin || !company) {
        return reject(new Error('Please enter all required data'));
      }

      const account = data;

      // eslint-disable-next-line no-underscore-dangle
      account._id = crypto.randomBytes(16).toString('hex');

      return resolve(account);
    }, 2000))
      .then((response) => {
        // console.log(response);
        dispatch(createAccountSuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(createAccountError(error));
      }));
  };
}
