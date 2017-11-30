import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/product';

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
