import * as types from '../constants';

export default (state = {
  error: null,
  isWaiting: false,
  product: null,
  waitingUploadAnnotation: false,
  errorUploadAnnotation: null,
}, action) => {
  switch (action.type) {
    case types.GET_A_PRODUCT:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_A_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_A_PRODUCT_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.UPLOAD_ANNOTATION:
      return {
        ...state,
        waitingUploadAnnotation: true,
      };
    case types.UPLOAD_ANNOTATION_SUCCESS:
      return {
        ...state,
        waitingUploadAnnotation: false,
        error: null,
      };
    case types.UPLOAD_ANNOTATION_ERROR:
      return {
        ...state,
        waitingUploadAnnotation: false,
        error: action.payload,
      };
    case types.GET_ANNOTATION:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_ANNOTATION_SUCCESS:
      return {
        ...state,
        currentAnnotation: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_ANNOTATION_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
