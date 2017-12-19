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
      company: null,
    },
    product: {
      name: '',
      _id: '',
      company: null,
    },
    createdAt: '',
    updatedAt: '',
  },
  error: null,
  postError: null,
  filterBy: '',
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
        // currentThread: action.payload,
        error: null,
      };
    case types.CREATE_THREAD_ERROR:
      return {
        ...state,
        isWaiting: false,
        error: action.payload,
      };
    case types.CREATE_POST:
      return {
        ...state,
        isWaiting: true,
      };
    case types.CREATE_POST_SUCCESS:
      return {
        ...state,
        currentThread: {
          ...state.currentThread,
          posts: [...state.currentThread.posts, action.payload],
        },
        isWaiting: false,
        postError: null,
      };
    case types.CREATE_POST_ERROR:
      return {
        ...state,
        isWaiting: false,
        postError: action.payload,
      };
    case types.RESET_CURRENT_THREAD:
      return {
        ...state,
        currentThread: null,
      };
    case types.SET_THREAD_FILTER:
      return {
        ...state,
        filterBy: action.payload,
      };
    case types.CLEAR_THREAD_FILTER:
      return {
        ...state,
        filterBy: '',
      };
    default:
      return state;
  }
};
