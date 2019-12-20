import { createSelector } from 'reselect';
import * as frontendScopeRequests from '../requests/frontendScopes';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

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
