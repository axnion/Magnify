import * as types from '../constants';

export default (state = {
  materials: [],
  error: null,
  isWaiting: false,
  productName: 'Name of product',
  productCompany: 'Name of product company'
}, action) => {
  switch(action.type) {
    default:
      return state;
  }
};