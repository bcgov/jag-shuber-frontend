import { createSelector } from 'reselect';
import * as frontendScopePermissionRequests from '../requests/frontendScopePermissions';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';
import { MapType } from '../../../api';
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
}
