import * as types from '../constants';

export default (state = {
  isWaiting: false,
  materials: [],
  error: null,
}, action) => {
  switch (action.type) {
    case types.UPLOAD_MATERIAL:
      return {
        ...state,
        isWaiting: true,
      };
    case types.UPLOAD_MATERIAL_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        materials: [...state.materials, action.payload],
        error: null,
      };
    case types.UPLOAD_MATERIAL_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
