import * as types from '../constants';
import { apiRequest } from './helpers';

function beginUploadMaterial() {
  return { type: types.UPLOAD_MATERIAL };
}

function uploadMaterialSuccess(payload) {
  return {
    type: types.UPLOAD_MATERIAL_SUCCESS,
    payload,
  };
}

function uploadMaterialError(payload) {
  return {
    type: types.UPLOAD_MATERIAL_ERROR,
    payload,
  };
}

function beginPostRating() {
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

export default function uploadMaterial(data, productId, token) {
  return (dispatch) => {
    dispatch(beginUploadMaterial());

    let formData = new FormData();
    formData.append('file', data.files[0]);
    formData.append('title', data.title);
    formData.append('description', data.description);

    return apiRequest('post', formData, `/product/${productId}/material`, token)
      .then((response) => {
        dispatch(uploadMaterialSuccess(response.data));
      })
      .catch((response) => {
        dispatch(uploadMaterialError(response.message));
      });
  };
}

export function makeRating(data, productId, materialId, token) {
  return (dispatch) => {
    dispatch(beginPostRating());

    return apiRequest('put', data, `/product/${productId}/material/${materialId}/rating`, token)
      .then((response) => {
        dispatch(postRatingSuccess(response.data));
      })
      .catch((response) => {
        dispatch(postRatingError(response.message));
      });
  };
}