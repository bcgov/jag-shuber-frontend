import { createSelector } from 'reselect';
import * as apiScopeRequests from '../requests/apiScopes';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

import { func as selectorFunctions } from '../../common';

export const getApiScopes = createSelector(
    apiScopeRequests.apiScopeMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getAllApiScopes = (state: RootState) => {
    if (state) {
        return getApiScopes(state).sort((a: any, b: any) =>
            (a.scopeCode < b.scopeCode) ? -1 : (a.scopeCode > b.scopeCode) ? 1 : 0);
    }
    return undefined;
};

export const findAllApiScopes = (filters: any) => (state: RootState) => {
    if (state) {
        let scopes = getApiScopes(state);
        scopes = selectorFunctions.filterByKeys(scopes, filters);

        scopes.sort((a: any, b: any) =>
            (a.scopeName < b.scopeName) ? -1 : (a.scopeName > b.scopeName) ? 1 : 0);
        return scopes;
    }
    return undefined;
};
