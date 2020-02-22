import { createSelector } from 'reselect';
import * as frontendScopeRequests from '../requests/frontendScopes';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';
import { func as selectorFunctions } from '../../common';

export const getFrontendScopes = createSelector(
    frontendScopeRequests.frontendScopeMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getAllFrontendScopes = (state: RootState) => {
    if (state) {
        return getFrontendScopes(state).sort((a: any, b: any) =>
            (a.scopeName < b.scopeName) ? -1 : (a.scopeName > b.scopeName) ? 1 : 0);
    }
    return undefined;
};

export const findAllFrontendScopes = (filters: any) => (state: RootState) => {
    if (state) {
        let scopes = getFrontendScopes(state);
        scopes = selectorFunctions.filterByKeys(scopes, filters);

        scopes.sort((a: any, b: any) =>
            (a.scopeName < b.scopeName) ? -1 : (a.scopeName > b.scopeName) ? 1 : 0);
        return scopes;
    }
    return undefined;
};
