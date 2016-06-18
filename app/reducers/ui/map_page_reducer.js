import { LocationActions } from './map_page_actions';

export default function mapPageReducer(state = {}, action) {
  switch (action.type) {
    case LocationActions.SELECT_LOCATION:
      return {
        selected: action.payload.id,
      };
    case LocationActions.DESELECT_LOCATION:
      return {};
    default:
      return state;
  }
}
