import * as roleRequests from './requests';
import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { STATE_KEY } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
  RoleModuleState,
  STATE_KEY
} from './common';

const nestedReducer = new NestedReducer([
  // Roles
  roleRequests.roleMapRequest.reducer,
  roleRequests.roleTypeMapRequest.reducer,
  roleRequests.roleCancelCodeMapRequest.reducer,
  roleRequests.createOrUpdateRolesRequest.reducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
