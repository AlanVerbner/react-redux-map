import keyMirror from 'key-mirror';

import * as API from '../../api/fake_backend';

export const LocationActions = keyMirror({
  FETCH_ALL_START: null,
  FETCH_ALL_SUCCESS: null,
  FETCH_ALL_ERROR: null,

  DELETE_START: null,
  DELETE_SUCCESS: null,
  DELETE_ERROR: null,
});


export function fetchAsync() {
  return (dispatch) => {
    dispatch({
      type: LocationActions.FETCH_ALL_START,
    });

    API.fetchAsync()
      .then(locations => {
        dispatch({
          type: LocationActions.FETCH_ALL_SUCCESS,
          payload: locations,
        });
      });
  };
}

export function deleteAsync(id) {
  return (dispatch) => {
    dispatch({
      type: LocationActions.DELETE_START,
    });

    API.deleteAsync(id)
      .then(locations => {
        dispatch({
          type: LocationActions.DELETE_SUCCESS,
          payload: locations,
        });
      });
  };
}

