import { createSelector } from 'reselect';
import * as frontendScopeApiRequests from '../requests/frontendScopeApis';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

import { func as selectorFunctions } from '../../common';

import { MapType } from '../../../api';
import { groupByKey } from './index';

const groupByFrontendScope = (arr: any[]) => groupByKey('frontendScopeId', arr);

export const getFrontendScopeApis = createSelector(
    frontendScopeApiRequests.frontendScopeApiMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getFrontendScopeApisGrouped = createSelector(
    frontendScopeApiRequests.frontendScopeApiMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return groupByFrontendScope(result);
    }
);

export const getAllFrontendScopeApis = (state: RootState) => {
    if (state) {
        return getFrontendScopeApis(state);
    }
    return undefined;
};

export const getFrontendScopeApisGroupedByScopeId = (state: RootState) => {
    if (state) {
        return getFrontendScopeApisGrouped(state);
    }
    return undefined;
};

export const findAllFrontendScopeApis = (filters: {} | undefined) => (state: RootState) => {
    if (state) {
        return getFrontendScopeApis(state);
    }
    return undefined;
};

export const findFrontendScopeApisGroupedByScopeId = (filters: {} | undefined) => (state: RootState) => {
    if (state) {
        return getFrontendScopeApisGrouped(state);
    }
    return undefined;
};
