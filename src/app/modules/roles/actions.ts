import * as roleRequests from './requests';

export const getRoles = roleRequests.roleMapRequest.actionCreator;
export const createRole = roleRequests.createRoleRequest.actionCreator;
export const updateRole = roleRequests.updateRoleRequest.actionCreator;
export const createOrUpdateRoles = roleRequests.createOrUpdateRolesRequest.actionCreator;
