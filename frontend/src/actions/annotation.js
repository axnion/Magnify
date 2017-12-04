import * as types from '../constants';
import { apiRequest } from './helpers';

function beginUploadAnnotation() {
  return { type: types.UPLOAD_ANNOTATION };
}

function uploadAnnotationSuccess(payload) {
  return {
    type: types.UPLOAD_ANNOTATION_SUCCESS,
    payload,
  };
}

function uploadAnnotationError(payload) {
  return {
    type: types.UPLOAD_ANNOTATION_ERROR,
    payload,
  };
}

function beginGetAnnotation() {
  return { type: types.GET.UPLOAD_ANNOTATION };
}

function getAnnotationSuccess(payload) {
  return {
    type: types.GET_ANNOTATION_SUCCESS,
    payload,
  };
}

function getAnnotationError(payload) {
  return {
    type: types.GET_ANNOTATION_ERROR,
    payload,
  };
}

export default function uploadAnnotation(text, materialId, token) {
  return (dispatch) => {
    dispatch(beginUploadAnnotation());

    const data = {
      material: materialId,
      annotation: text,
    };

    return apiRequest('put', data, '/annotation', token)
      .then((response) => {
        dispatch(uploadAnnotationSuccess(response.data));
      })
      .catch((response) => {
        dispatch(uploadAnnotationError(response.message));
      });
  };
}

export function getAnnotation(materialId, token) {
  return (dispatch) => {
    dispatch(beginGetAnnotation());


    return apiRequest('get', {}, `/annotation/${materialId}`, token)
      .then((response) => {
        dispatch(getAnnotationSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getAnnotationError(response.message));
      });
  };
}
