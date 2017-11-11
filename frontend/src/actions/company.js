import crypto from 'crypto';
import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/company';

function beginGetCompanies() {
  return { type: types.GET_COMPANIES };
}

function getCompaniesSuccess(payload) {
  return { 
    type: types.GET_COMPANIES_SUCCESS,
    payload,
  }
}

function getCompaniesError(payload) {
  return {
    type: types.GET_COMPANIES_ERROR,
    payload,
  }
}

function beginCreateCompany() {
  return { type: types.CREATE_COMPANY };
}

function createCompanySuccess(payload) {
  return { 
    type: types.CREATE_COMPANY_SUCCESS,
    payload,
  }
}

function createCompanyError(payload) {
  return {
    type: types.CREATE_COMPANY_ERROR,
    payload,
  }
}

export function getCompanies() {
  return (dispatch) => {
    dispatch(beginGetCompanies());

    return apiRequest('get', {}, endpoint)
      .then((response) => {
        dispatch(getCompaniesSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getCompaniesError(response.message));
      });
  };
}

export function createCompany(data) {
  return (dispatch) => {
    dispatch(beginCreateCompany());

    return apiRequest('post', data, endpoint)
      .then((response) => {
        dispatch(createCompanySuccess(response.data));
      })
      .catch((response) => {
        dispatch(createCompanyError(response.message));
      });
  };
}

export function mockCreateCompany(data) {
  return (dispatch) => {
    dispatch(beginCreateCompany());

    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        if(data.name === undefined) {
          return reject('Please enter all required data');
        }

        data._id = crypto.randomBytes(16).toString('hex');

        return resolve(data);
      }, 500);
    })
    .then((response) => {
      console.log(response);
      dispatch(createCompanySuccess(response));
    })
    .catch((error) => {
      console.log(error);
      dispatch(createCompanyError(error));
    });
  };
}