import {
  combineReducers,
} from 'redux';

import locationReducer from './locations/locations_reducer';
import mapPageReducer from './ui/map_page_reducer';

export default function reducers() {
  return combineReducers({
    locations: locationReducer,
    mapPage: mapPageReducer,
  });
}
