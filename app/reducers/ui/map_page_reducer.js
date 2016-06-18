import { LocationActions } from './map_page_actions';
import _ from 'lodash';

export default function mapPageReducer(state = {}, action) {
  switch (action.type) {
    case LocationActions.SELECT_LOCATION:
      return {
        ...state,
        selected: action.payload.id,
      };
    case LocationActions.DESELECT_LOCATION:
      return _.omit('selected');
    case LocationActions.GET_NAVIGATOR_GEOLOCATION_END:
      return {
        ...state,
        userLocation: action.payload,
      };
    default:
      return state;
  }
}
