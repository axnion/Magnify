import * as types from '../constants';

export default (state = {
  isWaiting: false,
  threads: [],
  currentThread: {
    _id: '',
    title: '',
    body: '',
    posts: [],
    author: {
      username: '',
      role: '',
      company: '',
    },
    createdAt: '',
    updatedAt: '',
  },
  error: null,
}, action) => {
  switch (action.type) {
    case types.GET_THREADS:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_THREADS_SUCCESS:
      return {
        ...state,
        threads: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_THREADS_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.GET_A_THREAD:
      return {
        ...state,
        isWaiting: true,
      };
    case types.GET_A_THREAD_SUCCESS:
      return {
        ...state,
        threads: [...state.threads, action.payload],
        currentThread: action.payload,
        isWaiting: false,
        error: null,
      };
    case types.GET_A_THREAD_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.CREATE_THREAD:
      return {
        ...state,
        isWaiting: true,
      };
    case types.CREATE_THREAD_SUCCESS:
      return {
        ...state,
        isWaiting: false,
        threads: [...state.threads, action.payload],
        currentThread: action.payload,
        error: null,
      };
    case types.CREATE_THREAD_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
