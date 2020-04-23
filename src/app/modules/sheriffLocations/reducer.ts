import * as sheriffLocationRequests from './requests';
import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { STATE_KEY } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
  SheriffLocationModuleState,
  STATE_KEY
} from './common';

const nestedReducer = new NestedReducer([
  // Leaves
  sheriffLocationRequests.sheriffLocationMapRequest.reducer,
  sheriffLocationRequests.createOrUpdateSheriffLocationRequest.reducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
