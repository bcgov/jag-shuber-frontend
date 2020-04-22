import { createSelector } from 'reselect';
import * as userRoleRequests from '../requests/userRoles';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

import { EffectiveSelector } from '../../../infrastructure/EffectiveSelector';
import { UserRole } from '../../../api';

export const getUserRoles = createSelector(
    userRoleRequests.userRoleMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

const userRoleSelector = new EffectiveSelector<UserRole>(
    userRoleRequests.userRoleMapRequest.getData,
    (ur) => ur.expiryDate
);

export const allUserRoles = userRoleSelector.all;

export const allEffectiveUserRoles = userRoleSelector.effective;

export const getAllUserRoles = (state: RootState) => {
    if (state) {
        return allUserRoles(state);
    }
    return undefined;
};

export const findAllUserRoles = (filters: any) => (state: RootState) => {
    if (state) {
        return allUserRoles(state);
    }
    return undefined;
};
