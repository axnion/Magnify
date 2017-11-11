import { combineReducers } from 'redux';
import example from './example';
import company from './company';
import account from './account';

export default combineReducers({
  example,
  company,
  account,
});