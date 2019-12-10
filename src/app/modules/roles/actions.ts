import * as roleRequests from './requests/roles';
import * as frontendScopeRequests from './requests/frontendScopes';
import * as apiScopeRequests from './requests/apiScopes';
import * as roleFrontendScopeRequests from './requests/roleFrontendScopes';
import * as roleApiScopeRequests from './requests/roleApiScopes';
import * as rolePermissionRequests from './requests/rolePermissions';
import * as userRoleRequests from './requests/userRoles';

export const getRoles = roleRequests.roleMapRequest.actionCreator;
export const createRole = roleRequests.createRoleRequest.actionCreator;
export const updateRole = roleRequests.updateRoleRequest.actionCreator;
export const createOrUpdateRoles = roleRequests.createOrUpdateRolesRequest.actionCreator;

export const getRoleFrontendScopes = roleFrontendScopeRequests.roleFrontendScopeMapRequest.actionCreator;
export const createRoleFrontendScope = roleFrontendScopeRequests.createRoleFrontendScopeRequest.actionCreator;
export const updateRoleFrontendScope = roleFrontendScopeRequests.updateRoleFrontendScopeRequest.actionCreator;
// export const deleteRoleFrontendScope = roleFrontendScopeRequests.deleteRoleFrontendScopeRequest.actionCreator;

export const getRoleApiScopes = roleApiScopeRequests.roleApiScopeMapRequest.actionCreator;
export const createRoleApiScope = roleApiScopeRequests.createRoleApiScopeRequest.actionCreator;
export const updateRoleApiScope = roleApiScopeRequests.updateRoleApiScopeRequest.actionCreator;
// export const deleteRoleApiScope = roleApiScopeRequests.deleteRoleApiScopeRequest.actionCreator;

export const getFrontendScopes = frontendScopeRequests.frontendScopeMapRequest.actionCreator;
export const createFrontendScope = frontendScopeRequests.createFrontendScopeRequest.actionCreator;
export const updateFrontendScope = frontendScopeRequests.updateFrontendScopeRequest.actionCreator;
// export const deleteFrontendScope = frontendScopeRequests.deleteFrontendScopeRequest.actionCreator;

export const getApiScopes = apiScopeRequests.apiScopeMapRequest.actionCreator;
export const createApiScope = apiScopeRequests.createApiScopeRequest.actionCreator;
export const updateApiScope = apiScopeRequests.updateApiScopeRequest.actionCreator;
// export const deleteApiScope = apiScopeRequests.deleteApiScopeRequest.actionCreator;

export const getRolePermissions = rolePermissionRequests.rolePermissionMapRequest.actionCreator;
export const createRolePermission = rolePermissionRequests.createRolePermissionRequest.actionCreator;
export const updateRolePermission = rolePermissionRequests.updateRolePermissionRequest.actionCreator;
// export const deleteRolePermission = rolePermissionRequests.deleteRolePermissionRequest.actionCreator;

export const getUserRoles = userRoleRequests.userRoleMapRequest.actionCreator;
export const createUserRole = userRoleRequests.createUserRoleRequest.actionCreator;
export const updateUserRole = userRoleRequests.updateUserRoleRequest.actionCreator;
export const createOrUpdateUserRoles = userRoleRequests.createOrUpdateUserRolesRequest.actionCreator;
