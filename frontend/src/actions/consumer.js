import crypto from 'crypto';
import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/consumer';

function beginCreateConsumer() {
  return { type: types.CREATE_CONSUMER };
}

function createConsumerSuccess(payload) {
  return {
    type: types.CREATE_CONSUMER_SUCCESS,
    payload,
  };
}

function createConsumerError(payload) {
  return {
    type: types.CREATE_CONSUMER_ERROR,
    payload,
  };
}

export function createConsumer(data) {
  return (dispatch) => {
    dispatch(beginCreateConsumer());

    return apiRequest('post', data, endpoint)
      .then((response) => {
        dispatch(createConsumerSuccess(response.data));
      })
      .catch((response) => {
        dispatch(createConsumerError(response.message));
      });
  };
}

export function mockCreateConsumer(data) {
  return (dispatch) => {
    dispatch(beginCreateConsumer());

    return new Promise((resolve, reject) => (setTimeout(() => {
      const {
        username,
        password,
      } = data;

      if (!username || !password) {
        return reject(new Error('Please enter all required data'));
      }

      const consumer = data;

      // eslint-disable-next-line no-underscore-dangle
      consumer._id = crypto.randomBytes(16).toString('hex');

      return resolve(consumer);
    }, 2000))
      .then((response) => {
        // console.log(response);
        dispatch(createConsumerSuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(createConsumerError(error));
      }));
  };
}
