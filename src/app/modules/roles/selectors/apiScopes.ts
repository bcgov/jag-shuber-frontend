import { createSelector } from 'reselect';
import * as apiScopeRequests from '../requests/apiScopes';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

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
            (a.scopeName < b.scopeName) ? -1 : (a.scopeName > b.scopeName) ? 1 : 0);
    }
    return undefined;
};

export const findAllApiScopes = (filters: {} | undefined) => (state: RootState) => {
    if (state) {
        return getApiScopes(state).sort((a: any, b: any) =>
            (a.scopeName < b.scopeName) ? -1 : (a.scopeName > b.scopeName) ? 1 : 0);
    }
    return undefined;
};
