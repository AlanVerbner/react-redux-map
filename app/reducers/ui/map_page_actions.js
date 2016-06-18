import keyMirror from 'key-mirror';

export const LocationActions = keyMirror({
  SELECT_LOCATION: null,
  DESELECT_LOCATION: null,
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
