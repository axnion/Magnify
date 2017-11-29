import crypto from 'crypto';
import * as types from '../constants';
import { apiRequest } from './helpers';
import { setTimeout } from 'timers';

const endpoint = '/products';

export function setFilterByCompany(company) {
  return {
    type: types.FILTER_BY_COMPANY,
    filterByCompany: company,
  };
}

function beginGetProducts() {
  return { type: types.GET_PRODUCTS };
}

function getProductsSuccess(payload) {
  return {
    type: types.GET_PRODUCTS_SUCCESS,
    payload,
  };
}

function getProductsError(payload) {
  return {
    type: types.GET_PRODUCTS_ERROR,
    payload,
  };
}

function beginGetAProduct() {
  return { type: types.GET_A_PRODUCT };
}

function getAProductSuccess(payload) {
  return {
    type: types.GET_A_PRODUCT_SUCCESS,
    payload,
  };
}

function selectProduct(product) {
  return {
    type: types.SELECT_A_PRODUCT,
    product,
  };
}

function getAProductError(payload) {
  return {
    type: types.GET_A_PRODUCT_ERROR,
    payload,
  };
}

function beginCreateProduct() {
  return { type: types.CREATE_PRODUCT };
}

function createProductSuccess(payload) {
  return {
    type: types.CREATE_PRODUCT_SUCCESS,
    payload,
  };
}

function createProductError(payload) {
  return {
    type: types.CREATE_PRODUCT_ERROR,
    payload,
  };
}

export function getProducts() {
  return (dispatch) => {
    dispatch(beginGetProducts());

    return apiRequest('get', {}, endpoint)
      .then((response) => {
        dispatch(getProductsSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getProductsError(response.message));
      });
  };
}

export function getAProduct(id) {
  return (dispatch) => {
    dispatch(beginGetAProduct());

    return apiRequest('get', {}, `${endpoint}/${id}`)
      .then((response) => {
        dispatch(getAProductSuccess(response.data));
      })
      .catch((response) => {
        dispatch(getAProductError(response.message));
      });
  };
}

export function createProduct(data, token) {
  return (dispatch) => {
    dispatch(beginCreateProduct());

    return apiRequest('post', data, endpoint, token)
      .then((response) => {
        dispatch(createProductSuccess(response.data));
      })
      .catch((response) => {
        dispatch(createProductError(response.message));
      });
  };
}

export function mockGetProducts() {
  return (dispatch) => {
    dispatch(beginGetProducts());

    return new Promise(resolve => (setTimeout(() => {
      const products = [
        { name: 'TestName1', category: 'TestCat1', company: 'TestCompany1' },
        { name: 'TestName2', category: 'TestCat2', company: 'TestCompany2' },
        { name: 'TestName3', category: 'TestCat3', company: 'TestCompany3' },
      ];

      // eslint-disable-next-line no-underscore-dangle
      products._id = crypto.randomBytes(16).toString('hex');

      return resolve(products);
    }, 500)
    ))
      .then((response) => {
        // console.log(response);
        dispatch(getProductsSuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getProductsError(error));
      });
  };
}

export function mockSelectProduct() {
  return (dispatch) => {
    return new Promise(resolve => (setTimeout(() => {
      const product = { 
        name: 'TestView', 
        company: 'TestCompView', 
        material: [
          { title: 'Material1', url: 'http//:material1' },
          { title: 'Material2', url: 'http//:material2' }
        ]};
      return resolve(product);
      }))).then((response) => {
        dispatch(selectProduct(response));
      }).catch((error) => {
      })
  }
}

export function mockGetAProduct() {
  return (dispatch) => {
    dispatch(beginGetAProduct());

    return new Promise(resolve => (setTimeout(() => {
      const product = [
        { name: 'TestName1', category: 'TestCat1', company: 'TestCompany1' },
      ];

      // eslint-disable-next-line no-underscore-dangle
      product._id = crypto.randomBytes(16).toString('hex');

      return resolve(product);
    }, 500)
    ))
      .then((response) => {
        // console.log(response);
        dispatch(getAProductSuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(getAProductError(error));
      });
  };
}

export function mockCreateProduct(data, token) {
  return (dispatch) => {
    dispatch(beginCreateProduct());

    return new Promise((resolve, reject) => (setTimeout(() => {
      if (!data.name || !data.category || !token || !data.company) {
        return reject(new Error('Please enter all required data'));
      }

      const product = data;

      // eslint-disable-next-line no-underscore-dangle
      product._id = crypto.randomBytes(16).toString('hex');

      return resolve(product);
    }, 500)
    ))
      .then((response) => {
        // console.log(response);
        dispatch(createProductSuccess(response));
      })
      .catch((error) => {
        // console.log(error);
        dispatch(createProductError(error));
      });
  };
}
