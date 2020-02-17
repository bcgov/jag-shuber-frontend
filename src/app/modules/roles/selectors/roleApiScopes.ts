import { createSelector } from 'reselect';
import * as roleApiScopeRequests from '../requests/roleApiScopes';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';
import { IdType } from '../../../api';
import { groupByKey } from './index';

const groupByRole = (arr: any[]) => groupByKey('roleId', arr);

export const getRoleApiScopes = createSelector(
    roleApiScopeRequests.roleApiScopeMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getRoleApiScopesGrouped = createSelector(
    roleApiScopeRequests.roleApiScopeMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return groupByRole(result);
    }
);

export const getAllRoleApiScopes = (state: RootState) => {
    if (state) {
        const result = getRoleApiScopes(state);
        return result;
    }
    return undefined;
};

export const getRoleApiScopesById = (id?: IdType) => (state: RootState) => {
   if (state && id) {
       const result = getRoleApiScopes(state).filter((i: any) => i.id === id);
       return result;
   }
   return undefined;
};

export const getRoleApiScopesGroupedByRoleId = (state: RootState) => {
    if (state) {
        const result = getRoleApiScopesGrouped(state);
        return result;
    }
    return undefined;
};

export const findRoleApiScopesGroupedByRoleId = (filters: {} | undefined) => (state: RootState) => {
    if (state) {
        const result = getRoleApiScopesGrouped(state);
        return result;
    }
    return undefined;
};
