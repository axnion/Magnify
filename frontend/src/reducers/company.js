import * as types from '../constants';

export default (state = {
  isWaiting: false,
  companies: [],
  error: null,
  currentCompany: null,
}, action) => {
  switch (action.type) {
    case types.GET_COMPANIES:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_COMPANIES_SUCCESS:
      return {
        ...state,
        companies: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_COMPANIES_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.GET_A_COMPANY:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_A_COMPANY_SUCCESS:
      return {
        ...state,
        currentCompany: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_A_COMPANY_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.CREATE_COMPANY:
      return {
        ...state,
        isWaiting: true,
      };
    case types.CREATE_COMPANY_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        companies: [...state.companies, action.payload],
        error: null,
      };
    case types.CREATE_COMPANY_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
