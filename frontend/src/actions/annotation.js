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
  return { type: types.GET_ANNOTATION };
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

export function mockGetAnnotation(materialId, token) {
  return (dispatch) => {
    dispatch(beginGetAnnotation());
  
    console.log('material ' + materialId + ' logged in token: '+ token);

    return new Promise(resolve => (setTimeout(() => {
      const annotation = 'testMockAnnotation';
         
      return resolve(annotation);
    }, 500)))
      .then((response) => {
        dispatch(getAnnotationSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getAnnotationError(response.message));
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
