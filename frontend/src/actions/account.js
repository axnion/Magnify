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

export function mockCreateAccount(data) {
  return (dispatch) => {
    dispatch(beginCreateAccount());

    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        const {username, password, admin, company} = data;

        if(username === undefined || password === undefined || admin === undefined || company === undefined) {
          return reject('Please enter all required data');
        }

        data._id = crypto.randomBytes(16).toString('hex');

        return resolve(data);
      }, 500);
    })
    .then((response) => {
      console.log(response);
      dispatch(createAccountSuccess(response));
    })
    .catch((error) => {
      console.log(error);
      dispatch(createAccountError(error));
    });
  };
}