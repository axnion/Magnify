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
        { name: 'TestCat1', parent: '', mainCategory: true },
        { name: 'TestCat2', parent: '', mainCategory: true },
        { name: 'TestCat3', parent: 'TestCat1', mainCategory: false },
        { name: 'TestCat4', parent: 'TestCat2', mainCategory: false },
        { name: 'TestCat5', parent: 'TestCat3', mainCategory: false },
        { name: 'TestCat6', parent: 'TestCat4', mainCategory: false },
      ];

      // eslint-disable-next-line no-underscore-dangle
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
