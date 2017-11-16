/* eslint import/prefer-default-export: 0 */

import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/example';

function beginGetExamples() {
  return { type: types.GET_EXAMPLES };
}

function getExamplesSuccess(payload) {
  return {
    type: types.GET_EXAMPLES_SUCCESS,
    payload,
  };
}

function getExamplesError(payload) {
  return {
    type: types.GET_EXAMPLES_ERROR,
    payload,
  };
}

export function getExamples() {
  return (dispatch) => {
    dispatch(beginGetExamples());

    return apiRequest('get', {}, endpoint)
      .then((response) => {
        dispatch(getExamplesSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getExamplesError(response.message));
      });
  };
}
