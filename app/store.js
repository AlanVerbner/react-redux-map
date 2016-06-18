import {
  applyMiddleware,
  createStore,
} from 'redux';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import createReducers from './reducers/reducers';

export default function configureStore(initialState = {}) {
  const middlewares = applyMiddleware(thunk, createLogger());
  const reducers = createReducers();
  return createStore(reducers, initialState, middlewares);
}
