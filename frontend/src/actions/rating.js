import * as types from '../constants';
import { apiRequest } from './helpers';

function beginpostRating() {
  return { type: types.POST_RATING };
}

function postRatingSuccess(payload) {
  return {
    type: types.POST_RATING_SUCCESS,
    payload,
  };
}

function postRatingError(payload) {
  return {
    type: types.POST_RATING_ERROR,
    payload,
  };
}


export const POST_RATING = 'POST_RATING';
export const POST_RATING_SUCCESS = 'POST_RATING_SUCCESS';
export const POST_RATING_ERROR = 'POST_RATING_ERROR';

export default function postRating(rating, materialId, token) {
  return (dispatch) => {
    dispatch(beginpostRating());

    const data = {
      rating,
    };

    return apiRequest('put', data, '/material/' + materialId + '/rating', token)
      .then((response) => {
        dispatch(postRatingSuccess(response.data));
      })
      .catch((response) => {
        dispatch(postRatingError(response.message));
      });
  };
}
