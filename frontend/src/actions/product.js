import crypto from 'crypto';
import { setTimeout } from 'timers';
import * as types from '../constants';
import { apiRequest } from './helpers';

const endpoint = '/product';

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

function getCompaniesObject(products, companies) {
  const newProducts = products.map((product) => {
    const companyObj = companies.find(c => c._id === product.company);
    const newProduct = companyObj !== undefined ? { ...product, company: companyObj } : product;
    return newProduct;
  });
  return newProducts;
}

function getCategoriesNames(products, categories) {
  const newProducts = products.map((product) => {
    const categoryObj = categories.find(c => c._id === product.category);
    const newProduct = categoryObj !== undefined ? { ...product, category: categoryObj } : product;
    return newProduct;
  });
  return newProducts;
}

function combineAllProductsData(product, categories, companies) {
  const p1 = getCategoriesNames(product, categories);
  return getCompaniesObject(p1, companies);
}

export function getProducts() {
  return (dispatch) => {
    dispatch(beginGetProducts());
    const productsRequest = apiRequest('get', {}, endpoint);
    const categoriesRequest = apiRequest('get', {}, '/category');
    const companiesRequest = apiRequest('get', {}, '/company');

    Promise.all([
      productsRequest,
      categoriesRequest,
      companiesRequest,
    ]).then((response) => {
      const products = response[0].data;
      const categories = response[1].data;
      const companies = response[2].data;

      const result = combineAllProductsData(products, categories, companies);
      dispatch(getProductsSuccess(result));
    })
      .catch((response) => {
        dispatch(getProductsError(response.message));
      });
  };
}

export function getAProduct(id, token) {
  return (dispatch) => {
    dispatch(beginGetAProduct());
    let product;
    return apiRequest('get', {}, `${endpoint}/${id}`, token)
      .then((response) => {
        product = response.data;
        return apiRequest('get', {}, `/company/${product.company}`);
      })
      .then((response) => {
        const newProduct = { ...product, company: response.data };
        dispatch(getAProductSuccess(newProduct));
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
        { _id: 'TestNameid1',
          name: 'TestName1',
          category: { _id: 'TestCat1id', name: 'TestCat1', parent: '', mainCategory: true },
          company: { _id: 'TestCompany1id', name: 'TestCompany1' } },
        { _id: 'TestNameid2',
          name: 'TestName2',
          category: { _id: 'TestCat3id', name: 'TestCat3', parent: 'TestCat1id', mainCategory: false },
          company: { _id: 'TestCompany1id', name: 'TestCompany1' } },
        { _id: 'TestNameid3',
          name: 'TestName3',
          category: { _id: 'TestCat4id', name: 'TestCat4', parent: 'TestCat2id', mainCategory: false },
          company: { _id: 'TestCompany2id', name: 'TestCompany2' } },
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
