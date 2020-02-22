import { createSelector } from 'reselect';
import * as userRoleRequests from '../requests/userRoles';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

import { func as selectorFunctions } from '../../common';

export const getUserRoles = createSelector(
    userRoleRequests.userRoleMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getAllUserRoles = (state: RootState) => {
    if (state) {
        return getUserRoles(state);
    }
    return undefined;
};

export const findAllUserRoles = (filters: any) => (state: RootState) => {
    if (state) {
        return getUserRoles(state);
    }
    return undefined;
};
