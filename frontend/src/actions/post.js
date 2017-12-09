import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/post';

function beginCreatePost() {
  return { type: types.CREATE_POST };
}

function createPostSucccess(payload) {
  return {
    type: types.CREATE_POST_SUCCESS,
    payload,
  };
}

function createPostErrorr(payload) {
  return {
    type: types.CREATE_POST_ERROR,
    payload,
  };
}

export function createPost(data, token) {
  return (dispatch) => {
    dispatch(beginCreatePost());

    return apiRequest('post', data, endpoint, token)
      .then((response) => {
        dispatch(createPostSucccess(response.data));
      })
      .catch((response) => {
        dispatch(createPostErrorr(response.message));
      });
  };
}

export function mockCreatePost(data, token) {
  return (dispatch) => {
    dispatch(beginCreatePost());

    return new Promise((resolve, reject) => (setTimeout(() => {
      if (data.threadId === undefined || data.body === undefined || token === undefined) {
        return reject(new Error('Please enter all required data'));
      }

      const post = data;

      post.posts = [];
      post.author = {
        _id: 'User1Id',
      };
      post.createdAt = new Date().toDateString();

      post._id = crypto.randomBytes(16).toString('hex');

      return resolve(post);
    }, 500)
    ))
      .then((response) => {
        // console.log(response);
        dispatch(createPostSucccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(createPostErrorr(error));
      });
  };
}
