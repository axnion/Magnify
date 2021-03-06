import * as types from '../constants';

export default (state = {
  isWaiting: false,
  products: [],
  error: null,
  currentProduct: {
    materials: [],
    name: '',
    company: {
      name: '',
    },
  },
  waitingGetAnnotations: false,
  waitingUploadAnnotation: false,
  errorUploadAnnotation: null,
  annotations: [],
  errorPostRating: null,
  waitingPostRating: false,
}, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_PRODUCTS_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.GET_A_PRODUCT:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_A_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_A_PRODUCT_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.CREATE_PRODUCT:
      return {
        ...state,
        isWaiting: true,
      };
    case types.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        products: [...state.products, action.payload],
        error: null,
      };
    case types.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.POST_RATING:
      return {
        ...state,
        waitingPostRating: true,
      };
    case types.POST_RATING_SUCCESS:
      return {
        ...state,
        waitingPostRating: false,
        errorUploadAnnotation: null,
      };
    case types.POST_RATING_ERROR:
      return {
        ...state,
        waitingPostRating: false,
        errorPostRating: action.payload,
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
        waitingGetAnnotations: true,
      };
    case types.GET_ANNOTATIONS_SUCCESS:
      return {
        ...state,
        annotations: action.payload,
        waitingGetAnnotations: false,
        error: null,
      };
    case types.GET_ANNOTATIONS_ERROR:
      return {
        ...state,
        waitingGetAnnotations: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
