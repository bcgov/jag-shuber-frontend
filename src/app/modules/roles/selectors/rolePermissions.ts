import { createSelector } from 'reselect';
import * as rolePermissionRequests from '../requests/rolePermissions';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';
import { IdType, RolePermission } from '../../../api';
import { groupByKey } from './index';
import * as frontendScopePermissionSelectors from './frontendScopePermissions';
import {
    FrontendScopePermission,
    RoleFrontendScopePermission ,
    ApiScopePermission,
    RoleApiScopePermission
} from '../../../api/Api';

const groupByRole = (arr: any[]) => groupByKey('roleId', arr);
const groupByRoleFrontendScope = (arr: any[]) => groupByKey('roleFrontendScopeId', arr);
const groupByRoleApiScope = (arr: any[]) => groupByKey('roleApiScopeId', arr);

export const getRolePermissions = createSelector(
    rolePermissionRequests.rolePermissionMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getRoleFrontendPermissions = createSelector(
   getRolePermissions,
   (rolePermissions) => {
       return rolePermissions.filter((i: RolePermission) => !!i.roleFrontendScopeId);
   }
);

export const getRoleApiPermissions = createSelector(
   getRolePermissions,
   (rolePermissions) => {
       return rolePermissions.filter((i: RolePermission) => !!i.roleApiScopeId);
   }
);

export const getRoleFrontendScopePermissions = createSelector(
    frontendScopePermissionSelectors.getFrontendScopePermissions,
    getRolePermissions,
   (scopePermissions, rolePermissions) => {
       return scopePermissions
           .map((i: FrontendScopePermission): RoleFrontendScopePermission  => {
               let roleScopePermission = rolePermissions.find((p) => p.frontendScopePermissionId === i.id) as RoleFrontendScopePermission;
               let hasPermission = false;
               if (roleScopePermission) {
                   hasPermission = true;
               } else {
                   roleScopePermission = {} as RoleFrontendScopePermission;
               }

               roleScopePermission.displayName = i.displayName;
               roleScopePermission.description = i.description;
               roleScopePermission.scopePermission = i;
               roleScopePermission.hasPermission = hasPermission;

               return roleScopePermission;
           })
           .filter((i: RoleFrontendScopePermission) => !!i.roleFrontendScopeId);
   }
);

export const getRoleApiScopePermissions = createSelector(
   getRolePermissions,
   (rolePermissions) => {
       return rolePermissions
           .filter((i: RolePermission) => !!i.roleApiScopeId);
           // TODO: We may or may not have to implement RoleApiScopePermissions
           // .map((i: RolePermission) => i as RoleApiScopePermission);
   }
);

export const getRoleFrontendPermissionsGroupedByRole = createSelector(
   getRoleFrontendPermissions,
   (rolePermissions) => {
       return groupByRole(rolePermissions);
   }
);

export const getRoleApiPermissionsGroupedByRole = createSelector(
   getRoleApiPermissions,
   (rolePermissions) => {
       return groupByRole(rolePermissions);
   }
);

export const getRoleFrontendScopePermissionsGroupedByRole = createSelector(
   getRoleFrontendScopePermissions,
   (roleScopePermissions) => {
       return groupByRole(roleScopePermissions);
   }
);

export const getRoleApiScopePermissionsGroupedByRole = createSelector(
   getRoleApiScopePermissions,
   (roleScopePermissions) => {
       return groupByRole(roleScopePermissions);
   }
);

export const getRoleFrontendPermissionsGroupedByRoleScope = createSelector(
    getRoleFrontendScopePermissionsGroupedByRole,
    (rolePermissions) => {
        const result = Object.keys(rolePermissions)
            .reduce((acc, cur) => {
                const permissions = acc[cur];
                acc[cur] = groupByRoleFrontendScope(permissions);
                return acc;
            }, rolePermissions);
        return result;
    }
);

export const getRoleApiPermissionsGroupedByRoleScope = createSelector(
    getRoleApiPermissionsGroupedByRole,
    (rolePermissions) => {
        const result = Object.keys(rolePermissions)
            .reduce((acc, cur) => {
                const permissions = acc[cur];
                acc[cur] = groupByRoleApiScope(permissions);
                return acc;
            }, rolePermissions);
        return result;
    }
);

export const getRoleFrontendScopePermissionsGroupedByRoleScope = createSelector(
    getRoleFrontendScopePermissionsGroupedByRole,
    (roleScopePermissions) => {
        const result = Object.keys(roleScopePermissions)
            .reduce((acc, cur) => {
                const permissions = acc[cur];
                // TODO: Somehow this is already grouped - probably because we populated the permission object... double check that!
                acc[cur] = permissions; // groupByRoleFrontendScope(permissions[cur]);
                return acc;
            }, roleScopePermissions);
        return result;
    }
);

export const getRoleApiScopePermissionsGroupedByRoleScope = createSelector(
    getRoleApiScopePermissionsGroupedByRole,
    (roleScopePermissions) => {
        const result = Object.keys(roleScopePermissions)
            .reduce((acc, cur) => {
                const permissions = acc[cur];
                // TODO: Somehow this is already grouped - probably because we populated the permission object... double check that!
                acc[cur] = permissions; // groupByRoleApiScope(permissions[cur]);
                return acc;
            }, roleScopePermissions);
        return result;
    }
);

export const getAllRolePermissions = (state: RootState) => {
    if (state) {
        return getRolePermissions(state);
    }
    return undefined;
};

export const getRolePermissionsById = (id?: IdType) => (state: RootState) => {
    if (state) {
        return getRolePermissions(state).filter(item => item.id === id);
    }
    return undefined;
};

export const getRoleFrontendPermissionsGroupedByScopeId = (state: RootState) => {
    if (state) {
        return getRoleFrontendPermissionsGroupedByRoleScope(state);
    }
    return undefined;
};

export const getRoleApiPermissionsGroupedByScopeId = (state: RootState) => {
    if (state) {
        return getRoleApiPermissionsGroupedByRoleScope(state);
    }
    return undefined;
};

/**
 * Returns temporaal state used for permission assignment modal.
 * @param state
 */
export const getRoleFrontendScopePermissionsGroupedByScopeId = (state: RootState) => {
    if (state) {
        return getRoleFrontendScopePermissionsGroupedByRoleScope(state);
    }
    return undefined;
};

/**
 * Returns temporaal state used for permission assignment modal.
 * @param state
 */
export const getRoleApiScopePermissionsGroupedByScopeId = (state: RootState) => {
    if (state) {
        return getRoleApiScopePermissionsGroupedByRoleScope(state);
    }
    return undefined;
};
