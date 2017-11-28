import * as types from '../constants';

export default (state = {
  isWaiting: false,
  categories: [],
  mainCategories: [],
  error: null,
}, action) => {
  switch (action.type) {
    case types.GET_CATEGORIES:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        mainCategories: action.payload.filter(cat => cat.mainCategory === true),
        isWaiting: false,
        error: null,
      };
    case types.GET_CATEGORIES_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
