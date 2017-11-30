import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/material/upload';

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

export default function uploadMaterial(data, token) {
  return (dispatch) => {
    dispatch(beginUploadMaterial());

    return apiRequest('post', data, endpoint, token)
      .then((response) => {
        dispatch(uploadMaterialSuccess(response.data));
      })
      .catch((response) => {
        dispatch(uploadMaterialError(response.message));
      });
  };
}
