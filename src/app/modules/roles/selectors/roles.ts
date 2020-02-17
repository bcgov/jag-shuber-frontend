import { createSelector } from 'reselect';
import * as roleRequests from '../requests/roles';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';
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
        return getRoles(state).sort((a: any, b: any) =>
            (a.roleName < b.roleName) ? -1 : (a.roleName > b.roleName) ? 1 : 0);
    }
    return undefined;
};

export const findAllRoles = (filters: any) => (state: RootState) => {
    if (state) {
        // console.log('finding all roles (findAllRoles) using filters');
        // console.log(filters);
        let roles = getRoles(state);
        Object.keys(filters).forEach(key => {
            if (filters[key]) {
                roles = roles.filter(r => {
                    return (r[key] && r[key] !== '')
                        ? r[key].toLowerCase().includes(`${filters[key].toLowerCase()}`)
                        : false;
                });
            }
        });

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
