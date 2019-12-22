import { createSelector } from 'reselect';
import * as rolePermissionRequests from '../requests/rolePermissions';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';
import { IdType, RolePermission } from '../../../api';
import { groupByKey } from './index';
import * as frontendScopeSelectors from './frontendScopes';
import * as frontendScopePermissionSelectors from './frontendScopePermissions';
import * as roleFrontendScopeSelectors from './roleFrontendScopes';
import {
    FrontendScopePermission,
    RoleFrontendScopePermission
} from '../../../api/Api';

const groupByRole = (arr: {}[]) => groupByKey('roleId', arr);
const groupByRoleFrontendScope = (arr: {}[]) => groupByKey('roleFrontendScopeId', arr);
const groupByRoleApiScope = (arr: {}[]) => groupByKey('roleApiScopeId', arr);

export const getRolePermissions = createSelector(
    rolePermissionRequests.rolePermissionMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getRoleFrontendScopePermissions = createSelector(
    frontendScopeSelectors.getFrontendScopes,
    frontendScopePermissionSelectors.getFrontendScopePermissions,
    roleFrontendScopeSelectors.getRoleFrontendScopes,
    getRolePermissions,
    (scopes, scopePermissions, roleScopes, rolePermissions) => {
        // For every roleFrontendScope, we need to grab the associated permissions.
        // It's a multipart operation.
        const result = roleScopes.reduce((arr: RoleFrontendScopePermission[], currentRoleScope) => {
            // First we need to figure out what frontendScopes correlate to each roleFrontendScope.
            // This part is simple, the scopeId on a roleFrontendScope correlates to the id on a frontendScope.
            const currentScope = scopes.find(s => s.id === currentRoleScope.scopeId);

            if (!currentScope) throw 'Could not find a matching scope for the current role scope!';

            // Now we need to grab all the available permissions that belong to the scope
            const currentScopePermissions = scopePermissions.filter(sp => sp.frontendScopeId === currentScope.id);

            // Now get all the permissions that are assigned to the user for the scope, and map them into corresponding
            // RoleFrontendScopePermission shapes.
            const currentRoleScopePermissions = currentScopePermissions.map((i: FrontendScopePermission): RoleFrontendScopePermission  => {
                // RolePermission doesn't have a frontendScopeId or a scopeId reference directly on it.
                // This is by design.
                // We basically just apply a RolePermission - if it exists - on top of a RoleFrontendScopePermission,
                // which combines the FrontendScopePermission and RolePermission shapes, and which is also the actual
                // model used by the UI in redux-form FormArrays.
                let roleScopePermission = rolePermissions.find(
                    (p) => p.frontendScopePermissionId === i.id
                ) as RoleFrontendScopePermission;

                let hasPermission = false;
                if (roleScopePermission && roleScopePermission.id) {
                    hasPermission = true;
                } else {
                    roleScopePermission = {} as RoleFrontendScopePermission;
                }

                roleScopePermission.roleId = currentRoleScope.roleId;
                roleScopePermission.roleFrontendScopeId = currentRoleScope.id;
                roleScopePermission.frontendScopePermissionId = i.id;
                roleScopePermission.displayName = i.displayName;
                roleScopePermission.description = i.description;
                roleScopePermission.hasPermission = hasPermission;
                roleScopePermission.scope = currentScope;
                roleScopePermission.roleScope = currentRoleScope;
                roleScopePermission.scopePermission = i;

                return roleScopePermission;
            });

            return arr.concat(currentRoleScopePermissions);
        }, [] as RoleFrontendScopePermission[]);

        return result;
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

export const getRoleFrontendScopePermissionsGroupedByRole = createSelector(
   getRoleFrontendScopePermissions,
   (roleScopePermissions) => {
       const result = groupByRole(roleScopePermissions);
       return result;
   }
);

export const getRoleApiScopePermissionsGroupedByRole = createSelector(
   getRoleApiScopePermissions,
   (roleScopePermissions) => {
       const result = groupByRole(roleScopePermissions);
       return result;
   }
);

export const getRoleFrontendScopePermissionsGroupedByRoleScope = createSelector(
    getRoleFrontendScopePermissionsGroupedByRole,
    (roleScopePermissions) => {
        const result = Object.keys(roleScopePermissions)
            .reduce((acc, cur) => {
                const roleScopePermissionSet = acc[cur];
                acc[cur] = groupByRoleFrontendScope(roleScopePermissionSet);
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
                acc[cur] = permissions; // groupByRoleApiScope(permissions[cur]);
                return acc;
            },      roleScopePermissions);
        return result;
    }
);

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
