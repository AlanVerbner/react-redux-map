import keyMirror from 'key-mirror';

export const LocationActions = keyMirror({
  SELECT_LOCATION: null,
  DESELECT_LOCATION: null,

  GET_NAVIGATOR_GEOLOCATION_START: null,
  GET_NAVIGATOR_GEOLOCATION_END: null,
  GET_NAVIGATOR_GEOLOCATION_FAIL: null,
});

export function selectLocation(location) {
  return {
    type: LocationActions.SELECT_LOCATION,
    payload: location,
  };
}

export function deselectLocation() {
  return {
    type: LocationActions.DESELECT_LOCATION,
  };
}

export function getNavigatorGeolocation() {
  return (dispatch) => {
    dispatch({
      type: LocationActions.GET_NAVIGATOR_GEOLOCATION_START,
    });
    navigator.geolocation.getCurrentPosition(
      position => dispatch({
        type: LocationActions.GET_NAVIGATOR_GEOLOCATION_END,
        payload: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      }),
      err => {
        // FIXME Do Somethign with this error
        console.log(err);
        dispatch({
          type: LocationActions.GET_NAVIGATOR_GEOLOCATION_FAIL,
        });
      },
    );
  };
}
