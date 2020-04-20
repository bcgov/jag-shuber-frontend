import { createSelector } from 'reselect';
import * as roleRequests from '../requests/roles';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

import { func as selectorFunctions } from '../../common';

import { IdType } from '../../../api';
import { RoleMap } from '../../../api/Api';

export const getRoles = createSelector(
    roleRequests.roleMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getAllRoles = (state: RootState) => {
    if (state) {
        return getRoles(state)
            .filter((role) => {
                // TODO: Make this configurable so super admins can see system roles if necessary, not required for now
                return role.systemRoleInd !== 1;
            })
            .sort((a: any, b: any) =>
                (a.roleName < b.roleName) ? -1 : (a.roleName > b.roleName) ? 1 : 0);
    }
    return undefined;
};

export const findAllRoles = (filters: any) => (state: RootState) => {
    if (state) {
        // console.log('finding all roles (findAllRoles) using filters');
        // console.log(filters);
        let roles = getRoles(state);
        roles = selectorFunctions.filterByKeys(roles, filters);

        roles = roles.sort((a: any, b: any) => (a.roleName < b.roleName) ? -1 : (a.roleName > b.roleName) ? 1 : 0);
        return roles;
    }
    return undefined;
};

export const getRole = (id?: IdType) => (state: RootState) => {
    if (state && id) {
        const map: RoleMap = roleRequests.roleMapRequest.getData(state);
        return map[id];
    }
    return undefined;
};
