import { createSelector } from 'reselect';
import * as roleFrontendScopeRequests from '../requests/roleFrontendScopes';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

import { func as selectorFunctions } from '../../common';

import { IdType } from '../../../api';
import { groupByKey } from './index';

const groupByRole = (arr: any[]) => groupByKey('roleId', arr);

export const getRoleFrontendScopes = createSelector(
    roleFrontendScopeRequests.roleFrontendScopeMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    },
);

export const getRoleFrontendScopesGrouped = createSelector(
    roleFrontendScopeRequests.roleFrontendScopeMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return groupByRole(result);
    }
);

export const getAllRoleFrontendScopes = (state: RootState) => {
    if (state) {
        const result = getRoleFrontendScopes(state);
        return result;
    }
    return undefined;
};

export const getRoleFrontendScopesById = (id?: IdType) => (state: RootState) => {
    if (state && id) {
        const result = getRoleFrontendScopes(state).filter((i: any) => i.roleId === id);
        return result;
    }
    return undefined;
};

export const getRoleFrontendScopesGroupedByRoleId = (state: RootState) => {
    if (state) {
        const result = getRoleFrontendScopesGrouped(state);
        return result;
    }
    return undefined;
};

export const findRoleFrontendScopesGroupedByRoleId = (filters: {} | undefined) => (state: RootState) => {
    if (state) {
        const result = getRoleFrontendScopesGrouped(state);
        return result;
    }
    return undefined;
};
