import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import example from './example';
import company from './company';
import account from './account';
import consumer from './consumer';
import product from './product';
import category from './category';
import auth from './auth';
import productView from './productView';
import material from './material';
import test from './test';

export default combineReducers({
  example,
  company,
  account,
  auth,
  consumer,
  product,
  category,
  productView,
  material,
  test,
  routing: routerReducer,
});
