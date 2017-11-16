import { combineReducers } from 'redux';
import example from './example';
import company from './company';
import account from './account';
import auth from './auth';

export default combineReducers({
  example,
  company,
  account,
  auth,
});