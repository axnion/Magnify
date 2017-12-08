import crypto from 'crypto';

import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/category';

function beginGetCategories() {
  return { type: types.GET_CATEGORIES };
}

function getCategoriesSuccess(payload) {
  return {
    type: types.GET_CATEGORIES_SUCCESS,
    payload,
  };
}

function getCategoriesError(payload) {
  return {
    type: types.GET_CATEGORIES_ERROR,
    payload,
  };
}

export function getCategories() {
  return (dispatch) => {
    dispatch(beginGetCategories());

    return apiRequest('get', {}, endpoint)
      .then((response) => {
        dispatch(getCategoriesSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getCategoriesError(response.message));
      });
  };
}

export function mockGetCategories() {
  return (dispatch) => {
    dispatch(beginGetCategories());

    return new Promise(resolve => (setTimeout(() => {
      const categories = [
        {
          _id: 'TestCat1id', name: 'TestCat1', parent: '', mainCategory: true,
        },
        {
          _id: 'TestCat2id', name: 'TestCat2', parent: '', mainCategory: true,
        },
        {
          _id: 'TestCat3id', name: 'TestCat3', parent: 'TestCat1id', mainCategory: false,
        },
        {
          _id: 'TestCat4id', name: 'TestCat4', parent: 'TestCat2id', mainCategory: false,
        },
        {
          _id: 'TestCat5id', name: 'TestCat5', parent: 'TestCat3id', mainCategory: false,
        },
        {
          _id: 'TestCat6id', name: 'TestCat6', parent: 'TestCat4id', mainCategory: false,
        },
      ];

      categories._id = crypto.randomBytes(16).toString('hex');

      return resolve(categories);
    }, 500)
    ))
      .then((response) => {
        // console.log(response);
        dispatch(getCategoriesSuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getCategoriesError(error));
      });
  };
}
