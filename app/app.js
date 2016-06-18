import 'babel-polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import configureStore from './store';

import LocationsMap from './containers/locations_map/locations_map';

const store = configureStore(undefined);

ReactDOM.render(
  <Provider store={store}>
    < LocationsMap />
  </Provider>,
  document.getElementById('app')
);
