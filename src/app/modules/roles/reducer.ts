import * as roleRequests from './requests/roles';
import * as apiScopeRequests from './requests/apiScopes';
import * as frontendScopeRequests from './requests/frontendScopes';
import * as roleApiScopeRequests from './requests/roleApiScopes';
import * as roleFrontendScopeRequests from './requests/roleFrontendScopes';
import * as rolePermissionRequests from './requests/rolePermissions';
import * as userRoleRequests from './requests/userRoles';

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
  apiScopeRequests.apiScopeMapRequest.reducer,
  frontendScopeRequests.frontendScopeMapRequest.reducer,
  roleApiScopeRequests.roleApiScopeMapRequest.reducer,
  roleFrontendScopeRequests.roleFrontendScopeMapRequest.reducer,
  rolePermissionRequests.rolePermissionMapRequest.reducer,
  userRoleRequests.userRoleMapRequest.reducer,
  roleRequests.createOrUpdateRolesRequest.reducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
