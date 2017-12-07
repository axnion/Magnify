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
  };
}

function getCompaniesError(payload) {
  return {
    type: types.GET_COMPANIES_ERROR,
    payload,
  };
}

function beginGetACompany() {
  return { type: types.GET_A_COMPANY };
}

function getACompanySuccess(payload) {
  return {
    type: types.GET_A_COMPANY_SUCCESS,
    payload,
  };
}

function getACompanyError(payload) {
  return {
    type: types.GET_A_COMPANY_ERROR,
    payload,
  };
}
function beginCreateCompany() {
  return { type: types.CREATE_COMPANY };
}

function createCompanySuccess(payload) {
  return {
    type: types.CREATE_COMPANY_SUCCESS,
    payload,
  };
}

function createCompanyError(payload) {
  return {
    type: types.CREATE_COMPANY_ERROR,
    payload,
  };
}

export function getACompany(id) {
  return (dispatch) => {
    dispatch(beginGetACompany());

    return apiRequest('get', {}, `${endpoint}/${id}`)
      .then((response) => {
        dispatch(getACompanySuccess(response.data));
      })
      .catch((response) => {
        dispatch(getACompanyError(response.message));
      });
  };
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

export function mockGetCompanies() {
  return (dispatch) => {
    dispatch(beginGetCompanies());

    return new Promise(resolve => (setTimeout(() => {
      const companies = [
        { _id: 'TestCompany1id', name: 'TestCompany1' },
        { _id: 'TestCompany2id', name: 'TestCompany2' },
        { _id: 'TestCompany3id', name: 'TestCompany3' },
        { _id: 'TestCompany4id', name: 'TestCompany4' },
        { _id: 'TestCompany5id', name: 'TestCompany5' },
      ];


      // eslint-disable-next-line no-underscore-dangle
      companies._id = crypto.randomBytes(16).toString('hex');

      return resolve(companies);
    }, 500)
    ))
      .then((response) => {
        // console.log(response);
        dispatch(getCompaniesSuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getCompaniesError(error));
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

    return new Promise((resolve, reject) => (setTimeout(() => {
      if (data.name === undefined) {
        return reject(new Error('Please enter all required data'));
      }

      const company = data;

      // eslint-disable-next-line no-underscore-dangle
      company._id = crypto.randomBytes(16).toString('hex');

      return resolve(company);
    }, 500)
    ))
      .then((response) => {
        // console.log(response);
        dispatch(createCompanySuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(createCompanyError(error));
      });
  };
}
