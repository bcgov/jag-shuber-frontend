import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as roleRequests from './requests/roles';
import * as apiScopeRequests from './requests/apiScopes';
import * as frontendScopeRequests from './requests/frontendScopes';
import * as roleApiScopeRequests from './requests/roleApiScopes';
import * as roleFrontendScopeRequests from './requests/roleFrontendScopes';
import * as rolePermissionRequests from './requests/rolePermissions';
import * as userRoleRequests from './requests/userRoles';

import {
    MapType,
    RoleMap,
    IdType,
    LEAVE_CODE_PERSONAL,
    // LEAVE_CODE_TRAINING, // TODO: Remove this
    // DateType
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';
import { ErrorMap } from '../sheriffs/common';
// import arrayToMap from '../../infrastructure/arrayToMap';
// import moment from 'moment';
// import { CodeSelector } from '../../infrastructure/CodeSelector';

export const getRoles = createSelector(
    roleRequests.roleMapRequest.getData,
    (map) => {
        const dataMap = mapToArray(map);
        return dataMap;
    }
);

export const getAllRoles = (state: RootState) => {
    if (state) {
        return getRoles(state);
    }
    return undefined;
};

export const getRole = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map: RoleMap = roleRequests.roleMapRequest.getData(state);
        return map[id];
    }
    return undefined;
};

export const getFrontendScopes = createSelector(
    frontendScopeRequests.frontendScopeMapRequest.getData,
    (map) => {
        const dataMap = mapToArray(map);
        return dataMap;
    }
);

export const getAllFrontendScopes = (state: RootState) => {
    if (state) {
        return getFrontendScopes(state);
    }
    return undefined;
};

export const getApiScopes = createSelector(
    apiScopeRequests.apiScopeMapRequest.getData,
    (map) => {
        const dataMap = mapToArray(map);
        return dataMap;
    }
);

export const getAllApiScopes = (state: RootState) => {
    if (state) {
        return getApiScopes(state);
    }
    return undefined;
};

export const getRoleFrontendScopes = createSelector(
    roleFrontendScopeRequests.roleFrontendScopeMapRequest.getData,
    (map) => {
        const dataMap = mapToArray(map);
        return dataMap;
    }
);

export const getAllRoleFrontendScopes = (state: RootState) => {
    if (state) {
        return getRoleFrontendScopes(state);
    }
    return undefined;
};

export const getRoleFrontendScopesById = (id?: IdType) => (state: RootState) => {
    if (state && id !== null) {
        return getRoleFrontendScopes(state).filter(i => i.roleId === id);
    }
    return undefined;
};

export const getRoleFrontendScopesGroupedByRoleId = (state: RootState) => {
    if (state) {
        const map: MapType<any> = {};
        return getRoleFrontendScopes(state).reduce((acc, cur, idx) => {
            if (cur && cur.roleId) {
                if (acc[cur.roleId] === undefined) {
                    acc[cur.roleId] = [];
                }

                // @ts-ignore
                if (!(acc[cur.roleId].find(i => i.id === cur.id))) {
                    acc[cur.roleId].push(cur);
                }
            }

            return acc;
        }, map);
    }
    return undefined;
};

export const getRoleApiScopes = createSelector(
    roleApiScopeRequests.roleApiScopeMapRequest.getData,
    (map) => {
        const dataMap = mapToArray(map);
        return dataMap;
    }
);

export const getAllRoleApiScopes = (state: RootState) => {
    if (state) {
        return getRoleApiScopes(state);
    }
    return undefined;
};

export const getRoleApiScopesById = (id?: IdType) => (state: RootState) => {
   if (state && id !== null) {
       return getRoleApiScopes(state).filter(i => i.id === id);
   }
   return undefined;
};

export const getRoleApiScopesGroupedByRoleId = (state: RootState) => {
    if (state) {
        const map: MapType<any> = {};
        return getRoleApiScopes(state).reduce((acc, cur, idx) => {
            if (cur && cur.roleId) {
                if (acc[cur.roleId] === undefined) {
                    acc[cur.roleId] = [];
                }

                // @ts-ignore
                if (!(acc[cur.roleId].find(i => i.id === cur.id))) {
                    acc[cur.roleId].push(cur);
                }
            }

            return acc;
        }, map);
    }
    return undefined;
};

export const getRolePermissions = createSelector(
    rolePermissionRequests.rolePermissionMapRequest.getData,
    (map) => {
        const dataMap = mapToArray(map);
        return dataMap;
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

export const getRolePermissionsGroupedByRoleId = (state: RootState) => {
    if (state) {
        const map: MapType<any> = {};
        return getRolePermissions(state).reduce((acc, cur, idx) => {
            if (cur && cur.roleId) {
                if (acc[cur.roleId] === undefined) {
                    acc[cur.roleId] = [];
                }

                // @ts-ignore
                if (!(acc[cur.roleId].find(i => i.id === cur.id))) {
                    acc[cur.roleId].push(cur);
                }
            }

            return acc;
        }, map);
    }
    return undefined;
};

export const selectedAdminRolesSection = (state: RootState) => {
    const { roles: { selectedProfileSection = undefined } = {} } = state;
    return selectedProfileSection;
};

export const getAdminRolesPluginErrors = (state: RootState) => {
    const { roles: { pluginSubmitErrors = {} } = {} } = state;
    return pluginSubmitErrors as ErrorMap;
};
