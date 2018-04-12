import * as sheriffRequests from './requests';
import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { STATE_KEY } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
  SheriffModuleState,
  STATE_KEY
} from './common';

const nestedReducer = new NestedReducer([
  sheriffRequests.sheriffMapRequest.reducer,
  sheriffRequests.createSheriffRequest.reducer,
  sheriffRequests.updateSheriffRequest.reducer  
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
