import * as types from '../constants';

export default (state = {
  error: null,
  isWaiting: false,
  product: null,
  waitingUploadAnnotation: false,
  errorUploadAnnotation: null,
  annotations: [],
  errorPostRating: null,
  waitingPostRating: false,
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
    case types.POST_RATING:
      return {
        ...state,
        waitingUploadAnnotation: true,
      };
    case types.POST_RATING_SUCCESS:
      return {
        ...state,
        waitingUploadAnnotation: false,
        errorUploadAnnotation: null,
      };
    case types.POST_RATING_ERROR:
      return {
        ...state,
        waitingUploadAnnotation: false,
        errorUploadAnnotation: action.payload,
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
        errorUploadAnnotation: null,
      };
    case types.UPLOAD_ANNOTATION_ERROR:
      return {
        ...state,
        waitingUploadAnnotation: false,
        errorUploadAnnotation: action.payload,
      };
    case types.GET_ANNOTATIONS:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_ANNOTATIONS_SUCCESS:
      return {
        ...state,
        annotations: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_ANNOTATIONS_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
