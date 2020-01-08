import * as roleRequests from './requests/roles';
import * as frontendScopeRequests from './requests/frontendScopes';
import * as frontendScopePermissionRequests from './requests/frontendScopePermissions';
import * as apiScopeRequests from './requests/apiScopes';
import * as roleFrontendScopeRequests from './requests/roleFrontendScopes';
import * as roleApiScopeRequests from './requests/roleApiScopes';
import * as rolePermissionRequests from './requests/rolePermissions';
import * as userRoleRequests from './requests/userRoles';
import { ErrorMap } from '../sheriffs/common';
import { Action } from 'redux';

export const getRoles = roleRequests.roleMapRequest.actionCreator;
export const createRole = roleRequests.createRoleRequest.actionCreator;
export const updateRole = roleRequests.updateRoleRequest.actionCreator;
export const deleteRole = roleRequests.deleteRoleRequest.actionCreator;
export const createOrUpdateRoles = roleRequests.createOrUpdateRolesRequest.actionCreator;
export const deleteRoles = roleRequests.deleteRolesRequest.actionCreator;

export const getRoleFrontendScopes = roleFrontendScopeRequests.roleFrontendScopeMapRequest.actionCreator;
export const createRoleFrontendScope = roleFrontendScopeRequests.createRoleFrontendScopeRequest.actionCreator;
export const updateRoleFrontendScope = roleFrontendScopeRequests.updateRoleFrontendScopeRequest.actionCreator;
export const createOrUpdateRoleFrontendScopes = roleFrontendScopeRequests.createOrUpdateRoleFrontendScopeRequest.actionCreator;
// export const deleteRoleFrontendScope = roleFrontendScopeRequests.deleteRoleFrontendScopeRequest.actionCreator;
export const deleteRoleFrontendScopes = roleFrontendScopeRequests.deleteRoleFrontendScopesRequest.actionCreator;

export const getRoleApiScopes = roleApiScopeRequests.roleApiScopeMapRequest.actionCreator;
export const createRoleApiScope = roleApiScopeRequests.createRoleApiScopeRequest.actionCreator;
export const updateRoleApiScope = roleApiScopeRequests.updateRoleApiScopeRequest.actionCreator;
export const createOrUpdateRoleApiScopes = roleApiScopeRequests.createOrUpdateRoleApiScopeRequest.actionCreator;
// export const deleteRoleApiScope = roleApiScopeRequests.deleteRoleApiScopeRequest.actionCreator;
export const deleteRoleApiScopes = roleApiScopeRequests.deleteRoleApiScopesRequest.actionCreator;

export const getFrontendScopes = frontendScopeRequests.frontendScopeMapRequest.actionCreator;
export const createFrontendScope = frontendScopeRequests.createFrontendScopeRequest.actionCreator;
export const updateFrontendScope = frontendScopeRequests.updateFrontendScopeRequest.actionCreator;
export const createOrUpdateFrontendScopes = frontendScopeRequests.createOrUpdateFrontendScopeRequest.actionCreator;
// export const deleteFrontendScope = frontendScopeRequests.deleteFrontendScopeRequest.actionCreator;
export const deleteFrontendScopes = frontendScopeRequests.deleteFrontendScopesRequest.actionCreator;

export const getFrontendScopePermissions = frontendScopePermissionRequests.frontendScopePermissionMapRequest.actionCreator;
export const createFrontendScopePermission = frontendScopePermissionRequests.createFrontendScopePermissionRequest.actionCreator;
export const updateFrontendScopePermission = frontendScopePermissionRequests.updateFrontendScopePermissionRequest.actionCreator;
export const createOrUpdateFrontendScopePermissions = frontendScopePermissionRequests.createOrUpdateFrontendScopePermissionRequest.actionCreator;
// export const deleteFrontendScopePermission = frontendScopePermissionRequests.deleteFrontendScopePermissionRequest.actionCreator;
export const deleteFrontendScopePermissions = frontendScopePermissionRequests.deleteFrontendScopePermissionsRequest.actionCreator;

export const getApiScopes = apiScopeRequests.apiScopeMapRequest.actionCreator;
export const createApiScope = apiScopeRequests.createApiScopeRequest.actionCreator;
export const updateApiScope = apiScopeRequests.updateApiScopeRequest.actionCreator;
export const createOrUpdateApiScopes = apiScopeRequests.createOrUpdateApiScopeRequest.actionCreator;
// export const deleteApiScope = apiScopeRequests.deleteApiScopeRequest.actionCreator;
export const deleteApiScopes = apiScopeRequests.deleteApiScopesRequest.actionCreator;

export const getRolePermissions = rolePermissionRequests.rolePermissionMapRequest.actionCreator;
export const createRolePermission = rolePermissionRequests.createRolePermissionRequest.actionCreator;
export const updateRolePermission = rolePermissionRequests.updateRolePermissionRequest.actionCreator;
export const createOrUpdateRolePermissions = rolePermissionRequests.createOrUpdateRolePermissionsRequest.actionCreator;
// export const deleteRolePermission = rolePermissionRequests.deleteRolePermissionRequest.actionCreator;
export const deleteRolePermissions = rolePermissionRequests.deleteRolePermissionsRequest.actionCreator;

export const getUserRoles = userRoleRequests.userRoleMapRequest.actionCreator;
export const createUserRole = userRoleRequests.createUserRoleRequest.actionCreator;
export const updateUserRole = userRoleRequests.updateUserRoleRequest.actionCreator;
export const createOrUpdateUserRoles = userRoleRequests.createOrUpdateUserRolesRequest.actionCreator;
export const deleteUserRoles = userRoleRequests.deleteUserRolesRequest.actionCreator;
export const expireUserRoles = userRoleRequests.expireUserRolesRequest.actionCreator;

type IActionMap = {
    'ADMIN_ROLES_SELECT_SECTION': string | undefined;
    'ADMIN_ROLES_SET_PLUGIN_SUBMIT_ERRORS': ErrorMap | undefined;
    'ADMIN_ROLES_SET_PLUGIN_FILTERS': {} | undefined;
};

export type IActionType = keyof IActionMap;

export type IActionPayload<K extends IActionType> = IActionMap[K];

interface IActionObject<K extends IActionType> extends Action {
    type: K;
    payload: IActionPayload<K>;
}

export type IAction = {
    [P in IActionType]: IActionObject<P>
}[IActionType];

function actionCreator<Type extends IActionType>(type: Type) {
    return (payload: IActionPayload<Type>): IActionObject<Type> =>
        ({ type: type, payload: payload });
}

export const selectAdminRolesPluginSection = (sectionName?: string) => (
    actionCreator('ADMIN_ROLES_SELECT_SECTION')(sectionName)
);

export const setAdminRolesPluginSubmitErrors = (errors?: ErrorMap) => (
    actionCreator('ADMIN_ROLES_SET_PLUGIN_SUBMIT_ERRORS')(errors)
);

export const setAdminRolesPluginFilters = (filters: {}) => (
    actionCreator('ADMIN_ROLES_SET_PLUGIN_FILTERS')(filters)
);
