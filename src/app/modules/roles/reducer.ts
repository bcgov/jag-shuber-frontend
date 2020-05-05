import * as roleRequests from './requests/roles';
import * as apiScopeRequests from './requests/apiScopes';
import * as frontendScopeRequests from './requests/frontendScopes';
import * as frontendScopeApiRequests from './requests/frontendScopeApis';
import * as frontendScopePermissionRequests from './requests/frontendScopePermissions';
import * as roleApiScopeRequests from './requests/roleApiScopes';
import * as roleFrontendScopeRequests from './requests/roleFrontendScopes';
import * as rolePermissionRequests from './requests/rolePermissions';
import * as userRoleRequests from './requests/userRoles';

import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { addReducerToMap } from '../../infrastructure/reduxUtils';
import {
  RoleModuleState,
  STATE_KEY
} from './common';
import {
  IActionType,
  IActionPayload,
  IAction
} from './actions';

export {
  RoleModuleState,
  STATE_KEY
} from './common';

export type ReducerResponse<State> = State;
export type ReducerCases<State> = {
  [T in IActionType]: (
    state: State,
    payload: IActionPayload<T>
  ) => State;
};

export function createReducer<State>(
  cases: Partial<ReducerCases<State>>
) {
  return function (state: State, action: IAction): ReducerResponse<State> {
    const fn = cases[action.type];
    if (fn) { // the "as any" part is a bit of a shame but ignore it
      return (fn as any)(state, action.payload, action);
    } else {
      return state || {} as State;
    }
  };
}

const actionReducer = createReducer<RoleModuleState>({
  ADMIN_ROLES_SELECT_SECTION: (state, sectionName) => {
    return { ...state, selectedProfileSection: sectionName };
  },
  ADMIN_ROLES_SET_SUBMIT_ERRORS: (state, pluginErrors) => {
    return { ...state, pluginSubmitErrors: pluginErrors };
  },
  ADMIN_ROLES_SET_FILTERS: (state, filters) => {
    return { ...state, pluginFilters: filters };
  }
});

const nestedReducer = new NestedReducer([
  // Api Scopes
  apiScopeRequests.apiScopeMapRequest.reducer,
  apiScopeRequests.createApiScopeRequest.reducer,
  apiScopeRequests.updateApiScopeRequest.reducer,
  apiScopeRequests.deleteApiScopesRequest.reducer,
  apiScopeRequests.createOrUpdateApiScopesRequest.reducer,
  // Frontend Scopes
  frontendScopeRequests.frontendScopeMapRequest.reducer,
  frontendScopeRequests.createFrontendScopeRequest.reducer,
  frontendScopeRequests.updateFrontendScopeRequest.reducer,
  frontendScopeRequests.deleteFrontendScopesRequest.reducer,
  frontendScopeRequests.createOrUpdateFrontendScopesRequest.reducer,
  // Frontend Scope Apis
  frontendScopeApiRequests.frontendScopeApiMapRequest.reducer,
  frontendScopeApiRequests.createFrontendScopeApiRequest.reducer,
  frontendScopeApiRequests.updateFrontendScopeApiRequest.reducer,
  frontendScopeApiRequests.deleteFrontendScopeApisRequest.reducer,
  frontendScopeApiRequests.createOrUpdateFrontendScopeApisRequest.reducer,
  // Frontend Scope Permissions
  frontendScopePermissionRequests.frontendScopePermissionMapRequest.reducer,
  frontendScopePermissionRequests.createFrontendScopePermissionRequest.reducer,
  frontendScopePermissionRequests.updateFrontendScopePermissionRequest.reducer,
  frontendScopePermissionRequests.deleteFrontendScopePermissionsRequest.reducer,
  frontendScopePermissionRequests.createOrUpdateFrontendScopePermissionsRequest.reducer,
  // Roles
  roleRequests.roleMapRequest.reducer,
  roleRequests.createRoleRequest.reducer,
  roleRequests.updateRoleRequest.reducer,
  roleRequests.deleteRoleRequest.reducer,
  roleRequests.deleteRolesRequest.reducer,
  roleRequests.createOrUpdateRolesRequest.reducer,
  // Role Api Scopes
  roleApiScopeRequests.roleApiScopeMapRequest.reducer,
  roleApiScopeRequests.createRoleApiScopeRequest.reducer,
  roleApiScopeRequests.updateRoleApiScopeRequest.reducer,
  roleApiScopeRequests.deleteRoleApiScopesRequest.reducer,
  roleApiScopeRequests.createOrUpdateRoleApiScopesRequest.reducer,
  // Role Frontend Scopes
  roleFrontendScopeRequests.roleFrontendScopeMapRequest.reducer,
  roleFrontendScopeRequests.createRoleFrontendScopeRequest.reducer,
  roleFrontendScopeRequests.updateRoleFrontendScopeRequest.reducer,
  roleFrontendScopeRequests.deleteRoleFrontendScopesRequest.reducer,
  roleFrontendScopeRequests.createOrUpdateRoleFrontendScopesRequest.reducer,
  // Role Permission Scopes
  rolePermissionRequests.rolePermissionMapRequest.reducer,
  rolePermissionRequests.createRolePermissionRequest.reducer,
  rolePermissionRequests.updateRolePermissionRequest.reducer,
  rolePermissionRequests.deleteRolePermissionsRequest.reducer,
  rolePermissionRequests.createOrUpdateRolePermissionsRequest.reducer,
  // User Roles
  userRoleRequests.userRoleMapRequest.reducer,
  userRoleRequests.createUserRoleRequest.reducer,
  userRoleRequests.updateUserRoleRequest.reducer,
  userRoleRequests.deleteUserRolesRequest.reducer,
  userRoleRequests.expireUserRolesRequest.reducer,
  userRoleRequests.createOrUpdateUserRolesRequest.reducer,
  actionReducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
