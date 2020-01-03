import * as roleRequests from './requests/roles';
import * as apiScopeRequests from './requests/apiScopes';
import * as frontendScopeRequests from './requests/frontendScopes';
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
  ADMIN_ROLES_SET_PLUGIN_SUBMIT_ERRORS: (state, pluginErrors) => {
    return { ...state, pluginSubmitErrors: pluginErrors };
  },
  ADMIN_ROLES_SET_PLUGIN_FILTERS: (state, filters) => {
    return { ...state, pluginFilters: filters };
  }
});

const nestedReducer = new NestedReducer([
  // Roles
  roleRequests.roleMapRequest.reducer,
  apiScopeRequests.apiScopeMapRequest.reducer,
  frontendScopeRequests.frontendScopeMapRequest.reducer,
  frontendScopePermissionRequests.frontendScopePermissionMapRequest.reducer,
  roleApiScopeRequests.roleApiScopeMapRequest.reducer,
  roleFrontendScopeRequests.roleFrontendScopeMapRequest.reducer,
  rolePermissionRequests.rolePermissionMapRequest.reducer,
  userRoleRequests.userRoleMapRequest.reducer,
  roleRequests.createOrUpdateRolesRequest.reducer,
  actionReducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
