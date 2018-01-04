import crypto from 'crypto';
import { push } from 'react-router-redux';
import * as types from '../constants';
import { apiRequest } from './helpers';
import { getACompany } from './company';
import { getAccount } from './account';


const endpoint = '/account/login';

function tryLogin() {
  return { type: types.LOG_IN };
}

function loginSuccess(payload) {
  return {
    type: types.LOG_IN_SUCCESS,
    payload,
  };
}

function loginError(payload) {
  return {
    type: types.LOG_IN_ERROR,
    payload,
  };
}

export function doLogout() {
  return {
    type: types.LOG_OUT,
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(doLogout());
    dispatch(push('/'));
  };
}

export function login(data) {
  return (dispatch) => {
    dispatch(tryLogin());

    return apiRequest('post', data, endpoint)
      .then((response) => {
        dispatch(getAccount(response.data.user.id));
        dispatch(loginSuccess(response.data));
        if (response.data.user.company) {
          dispatch(getACompany(response.data.user.company));
        }
      })
      .catch((response) => {
        dispatch(loginError(response.message));
      });
  };
}

export function mockTryLogin(data) {
  return (dispatch) => {
    dispatch(tryLogin());

    return new Promise((resolve, reject) => (setTimeout(() => {
      const {
        username,
        password,
      } = data;

      if (!username || !password) {
        return reject(new Error('Please enter all required data'));
      }

      const account = data;

      // eslint-disable-next-line no-underscore-dangle
      account._id = crypto.randomBytes(16).toString('hex');
      account.token = 'test token';

      return resolve(account);
    }, 2000))
      .then((response) => {
        // console.log(response);
        dispatch(loginSuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(loginError(error));
      }));
  };
}
