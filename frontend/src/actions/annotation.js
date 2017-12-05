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

function beginGetAnnotations() {
  return { type: types.GET_ANNOTATIONS };
}

function getAnnotationsSuccess(payload) {
  return {
    type: types.GET_ANNOTATIONS_SUCCESS,
    payload,
  };
}

function getAnnotationsError(payload) {
  return {
    type: types.GET_ANNOTATIONS_ERROR,
    payload,
  };
}

export function mockUploadAnnotation(text, materialId, token)
{
  return (dispatch) => {
    dispatch(beginUploadAnnotation());

    return new Promise((resolve, reject) => (setTimeout(() => {
      if (!text || !materialId || !token) {
        return reject(new Error('Please eneter all required data'))
      }
      const data = {
        annotation: text,
        material: materialId,
      };
      return resolve(data);
    }, 2000)))
      .then((response) => {
        dispatch(uploadAnnotationSuccess(response));
      })
      .catch((error) => {
        dispatch(uploadAnnotationError(error.message));
      });
  };
}

export function uploadAnnotation(text, materialId, token) {
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

export function getAnnotations(token) {
  return (dispatch) => {
    dispatch(beginGetAnnotations());

    return apiRequest('get', {}, '/annotation/', token)
      .then((response) => {
        dispatch(getAnnotationsSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getAnnotationsError(response.message));
      });
  };
}
