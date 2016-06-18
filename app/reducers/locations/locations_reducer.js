import {
  LocationActions,
} from '../../reducers/locations/locations_actions';

const initialState = {
  entities: [],
};

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case LocationActions.FETCH_ALL_SUCCESS:
      return {
        ...state,
        entities: action.payload,
      };
      break;
    default:
      return state;
  }
}
