import crypto from 'crypto';
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
          createdAt: '2016-05-18T16:00:00Z',
          updatedAt: '2016-05-18T16:00:00Z',
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
          createdAt: '2016-05-18T16:00:00Z',
          updatedAt: '2016-05-18T16:00:00Z',
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
          createdAt: '2016-05-18T16:00:00Z',
          updatedAt: '2016-05-18T16:00:00Z',
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

function addCompanyToThread(companies, thread) {
  const companyObj = companies.find(c => c._id === thread.author.company);
  const { author } = thread;
  const newAuthor = companyObj !== undefined ? { ...author, company: companyObj } : author;
  const newThread = { ...thread, author: newAuthor };
  return newThread;
}


export function getAThread(id) {
  return (dispatch) => {
    dispatch(beginGetAThread());
    const companiesRequest = apiRequest('get', {}, '/company');
    const getThreadRequest = apiRequest('get', {}, `${endpoint}/${id}`);

    Promise.all([
      companiesRequest,
      getThreadRequest,
    ]).then((response) => {
      const companies = response[0].data;
      const thread = response[1].data;

      const newThread = addCompanyToThread(companies, thread);
      dispatch(getAThreadSuccess(newThread));
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
            createdAt: '2016-05-18T16:00:00Z',
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
            createdAt: '2016-05-23T16:00:00Z',
          },
          {
            _id: 'Post3id',
            body: 'Post3',
            author: {
              _id: 'TestUserId2',
              username: 'Testuser2',
              role: 'companyRep',
              company: {
                _id: 'TestCompany1',
                name: 'evilCorp',
              },
            },
            createdAt: '2016-05-23T16:00:00Z',
          },
          {
            _id: 'Post4id',
            body: 'Post4',
            author: {
              _id: 'TestUserId2',
              username: 'Testuser2',
              role: 'companyRep',
              company: {
                _id: 'TestCompany1',
                name: 'evilCorp',
              },
            },
            createdAt: '2016-05-23T16:00:00Z',
          },
          {
            _id: 'Post5id',
            body: 'Post5',
            author: {
              _id: 'TestUserId2',
              username: 'Testuser2',
              role: 'companyRep',
              company: {
                _id: 'TestCompany1',
                name: 'evilCorp',
              },
            },
            createdAt: '2016-05-23T16:00:00Z',
          },
          {
            _id: 'Post6id',
            body: 'Post6',
            author: {
              _id: 'TestUserId2',
              username: 'Testuser2',
              role: 'companyRep',
              company: {
                _id: 'TestCompany1',
                name: 'evilCorp',
              },
            },
            createdAt: '2016-05-23T16:00:00Z',
          },
          {
            _id: 'Post7id',
            body: 'Post8',
            author: {
              _id: 'TestUserId2',
              username: 'Testuser2',
              role: 'companyRep',
              company: {
                _id: 'TestCompany1',
                name: 'evilCorp',
              },
            },
            createdAt: '2016-05-23T16:00:00Z',
          },
        ],
        author: {
          _id: 'TestUserId1',
          username: 'Testuser1',
          role: 'consumer',
          company: null,
        },
        createdAt: '2016-05-18T16:00:00Z',
        updatedAt: '2016-05-18T16:00:00Z',
      };

      return resolve(threads);
    }, 500)
    ))
      .then((response) => {
        dispatch(getAThreadSuccess(response));
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
      thread.createdAt = new Date().toDateString();
      thread.updatedAt = new Date().toDateString();

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
