import { Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import rootReducer from './reducers';
import { saveState, loadState } from './localStorage';
// import store from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const enhancers = [];

const history = createBrowserHistory();

const middleware = [
  thunk,
  routerMiddleware(history),
];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const persistedState = loadState();

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer,
  persistedState,
  composedEnhancers,
);

store.subscribe(throttle(() => {
  saveState({
    auth: {
      token: store.getState().auth.token,
      username: store.getState().auth.username,
      id: store.getState().auth.id,
      role: store.getState().auth.role,
      company: store.getState().auth.company,
    },
  });
}, 1000));

// eslint-disable-next-line function-paren-newline
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
