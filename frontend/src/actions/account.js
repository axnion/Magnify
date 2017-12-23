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
        /*
        only used for showing selected products, remove after sprint 7
        const mockSelectedProducts = [
          {
            name: 'Moneymaker 2000',
            company: '5a1d2512e685f6080d54f59d',
            _id: '5a1d311b9904ce0b594b7aca',
            category: '5a2df2747faab131001a',
            materials: [
              {
                _id: '5a26cace02dd320df3460de8',
                title: 'Moneymaker specs',
                description: 'Manual 1',
                url: '/material/5a26cace02dd320df3460de8/download',
                file: {
                  id: '5a26cace02dd320df3460de6',
                  name: 'Moneymaker Specs.pdf',
                },
                avgRating: 4.5,
                numRatings: 2,
                userRating: null,
              },
              {
                _id: '5a26cba302dd320df3460deb',
                title: 'Moneymaker extras',
                description: 'Cool extras!',
                url: '/material/5a26cba302dd320df3460deb/download',
                file: {
                  id: '5a26cba302dd320df3460de9',
                  name: 'Moneymaker Extras.pdf',
                },
                avgRating: 3,
                numRatings: 1,
                userRating: 3,
              },
            ],
          },
        ];

        const dataWithMock = response.data;
        dataWithMock.selectedProducts = mockSelectedProducts;
        dispatch(getAccountSuccess(dataWithMock));
        */

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
