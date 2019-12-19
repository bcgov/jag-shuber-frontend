import * as userRequests from './requests';

import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { STATE_KEY, UserModuleState } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
  UserModuleState,
  STATE_KEY
} from './common';

const nestedReducer = new NestedReducer([
  userRequests.userMapRequest.reducer,
  userRequests.createUserRequest.reducer,
  userRequests.updateUserRequest.reducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
