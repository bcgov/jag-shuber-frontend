import { createSelector } from 'reselect';
import * as frontendScopePermissionRequests from '../requests/frontendScopePermissions';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

// import { func as selectorFunctions } from '../../common';

import { MapType, IdType } from '../../../api';
import { groupByKey } from './index';

const groupByFrontendScope = (arr: any[]) => groupByKey('frontendScopeId', arr);

export const getFrontendScopePermissions = createSelector(
    frontendScopePermissionRequests.frontendScopePermissionMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getFrontendScopePermissionsGrouped = createSelector(
    frontendScopePermissionRequests.frontendScopePermissionMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return groupByFrontendScope(result);
    }
);

export const getAllFrontendScopePermissions = (state: RootState) => {
    if (state) {
        return getFrontendScopePermissions(state);
    }
    return undefined;
};

export const getFrontendScopePermissionsGroupedByScopeId = (state: RootState) => {
    if (state) {
        return getFrontendScopePermissionsGrouped(state);
    }
    return undefined;
};

export const findAllFrontendScopePermissions = (filters: {} | undefined) => (state: RootState) => {
    if (state) {
        return getFrontendScopePermissions(state);
    }
    return undefined;
};

export const findFrontendScopePermissionsGroupedByScopeId = (filters: {} | undefined) => (state: RootState) => {
    if (state) {
        return getFrontendScopePermissionsGrouped(state);
    }
    return undefined;
};

export const getFrontendScopePermissionsByScopeId = (id: IdType) => (state: RootState) => {
    if (state) {
        const groupedPermissions = getFrontendScopePermissionsGrouped(state);
        return (groupedPermissions) ? groupedPermissions[id] || [] : [];
    }
    return undefined;
};
