import 'babel-polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import configureStore from './store';
import LocationsMap from './containers/locations_map/locations_map';

const store = configureStore(undefined);

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      < LocationsMap />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('app')
);
