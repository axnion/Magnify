import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import example from './example';
import company from './company';
import account from './account';
import consumer from './consumer';
import auth from './auth';

export default combineReducers({
  example,
  company,
  account,
  auth,
  consumer,
  routing: routerReducer,
});
