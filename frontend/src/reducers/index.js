import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import example from './example';
import company from './company';
import account from './account';
import consumer from './consumer';
import product from './product';
import category from './category';
import auth from './auth';

export default combineReducers({
  example,
  company,
  account,
  auth,
  consumer,
  product,
  category,
  routing: routerReducer,
});
