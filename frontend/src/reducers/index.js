import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import company from './company';
import account from './account';
import consumer from './consumer';
import product from './product';
import category from './category';
import auth from './auth';
import material from './material';
import thread from './thread';
import snackbar from './snackbar';

export default combineReducers({
  company,
  account,
  auth,
  consumer,
  product,
  category,
  material,
  thread,
  snackbar,
  routing: routerReducer,
});
