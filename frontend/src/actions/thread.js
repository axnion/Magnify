import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/thread';

function beginGetThreads() {
  return { type: types.GET_THREADS };
}

function getThreadsSuccess(payload) {
  return {
    type: types.GET_THREADS_SUCCESS,
    payload,
  };
}

function getThreadsError(payload) {
  return {
    type: types.GET_THREADS_ERROR,
    payload,
  };
}

function beginGetAThread() {
  return { type: types.GET_A_THREAD };
}

function getAThreadSuccess(payload) {
  return {
    type: types.GET_A_THREAD_SUCCESS,
    payload,
  };
}

function getAThreadError(payload) {
  return {
    type: types.GET_A_THREAD_ERROR,
    payload,
  };
}

function beginCreateThread() {
  return { type: types.CREATE_THREAD };
}

function createThreadSucccess(payload) {
  return {
    type: types.CREATE_THREAD_SUCCESS,
    payload,
  };
}

function createThreadErrorr(payload) {
  return {
    type: types.CREATE_THREAD_ERROR,
    payload,
  };
}

export function getThreads() {
  return (dispatch) => {
    dispatch(beginGetThreads());

    return apiRequest('get', {}, endpoint)
      .then((response) => {
        dispatch(getThreadsSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getThreadsError(response.message));
      });
  };
}

export function mockGetThreads() {
  return (dispatch) => {
    dispatch(beginGetThreads());

    return new Promise(resolve => (setTimeout(() => {
      const threads = [
        {
          _id: 'TestThread1id',
          title: 'TestThread1Title',
          body: 'TestThread1Body',
          posts: [],
          author: {
            _id: 'TestUserId1',
            username: 'Testuser1',
            role: 'consumer',
            company: null,
          },
        },
        {
          _id: 'TestThread2id',
          title: 'TestThread2Title',
          body: 'TestThread2Body',
          posts: [],
          author: {
            _id: 'TestUserId2',
            username: 'Testuser2',
            role: 'consumer',
            company: null,
          },
        },
        {
          _id: 'TestThread3id',
          title: 'TestThread3Title',
          body: 'TestThread3Body',
          posts: [],
          author: {
            _id: 'TestUserId3',
            username: 'Testuser3',
            role: 'consumer',
            company: null,
          },
        },
      ];

      return resolve(threads);
    }, 500)
    ))
      .then((response) => {
        // console.log(response);
        dispatch(getThreadsSuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getThreadsError(error));
      });
  };
}

export function getAThread(id) {
  return (dispatch) => {
    dispatch(beginGetAThread());

    return apiRequest('get', {}, `${endpoint}/${id}`)
      .then((response) => {
        dispatch(getAThreadSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getAThreadError(response.message));
      });
  };
}

export function mockGetAThread(id) {
  return (dispatch) => {
    dispatch(beginGetAThread());

    return new Promise(resolve => (setTimeout(() => {
      const threads = {
        _id: id,
        title: 'TestThread1Title',
        body: 'TestThread1Body',
        posts: [
          {
            _id: 'Post1id',
            body: 'Post1',
            author: {
              _id: 'TestUserId1',
              username: 'Testuser1',
              role: 'consumer',
              company: null,
            },
          },
          {
            _id: 'Post2id',
            body: 'Post2',
            author: {
              _id: 'TestUserId2',
              username: 'Testuser2',
              role: 'companyRep',
              company: {
                _id: 'TestCompany1',
                name: 'evilCorp',
              },
            },
          },
        ],
        author: {
          _id: 'TestUserId1',
          username: 'Testuser1',
          role: 'consumer',
          company: null,
        },
      };

      return resolve(threads);
    }, 500)
    ))
      .then((response) => {
        dispatch(getAThreadSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getAThreadError(response.message));
      });
  };
}

export function createThread(data, token) {
  return (dispatch) => {
    dispatch(beginCreateThread());

    return apiRequest('post', data, endpoint, token)
      .then((response) => {
        dispatch(createThreadSucccess(response.data));
      })
      .catch((response) => {
        dispatch(createThreadErrorr(response.message));
      });
  };
}

export function mockCreateThread(data, token) {
  return (dispatch) => {
    dispatch(beginCreateThread());

    return new Promise((resolve, reject) => (setTimeout(() => {
      if (data.title === undefined || data.body === undefined || token === undefined) {
        return reject(new Error('Please enter all required data'));
      }

      const thread = data;

      thread.posts = [];
      thread.author = {
        username: 'username',
        role: 'role',
        company: 'company',
      };

      thread._id = crypto.randomBytes(16).toString('hex');

      return resolve(thread);
    }, 500)
    ))
      .then((response) => {
        // console.log(response);
        dispatch(createThreadSucccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(createThreadErrorr(error));
      });
  };
}
