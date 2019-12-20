import { createSelector } from 'reselect';
import * as requests from './requests';
import { RootState } from '../../store';
import {
    IdType, MapType, User
} from '../../api/Api';

import mapToArray from '../../infrastructure/mapToArray';
import { currentLocation as currentLocationSelector } from '../user/selectors';
import { getUserRoles } from '../roles/selectors';
// TODO: Leaving these in here cause they could be useful
// import { ErrorMap } from './common';
// import { CodeSelector } from '../../infrastructure/CodeSelector';
// import { getLocationById } from '../system/selectors';

export const users = createSelector(
    requests.userMapRequest.getData,
    (map) => {
        return mapToArray(map) || [];
    }
);

export const usersForCurrentLocation = createSelector(
    users,
    currentLocationSelector,
    (userList, location) => {
        return userList; // .filter(s => s.homeLocationId === location || s.currentLocationId === location);
    }
);

export const getAllUsers = (state: RootState) => {
    if (state) {
        return users(state); /*.sort((a: any, b: any) =>
            (a.lastName < b.lastName) ? -1 : (a.lastName > b.lastName) ? 1 : 0);*/
    }
    return undefined;
};

export const getUserRolesByUserRoleId = (id?: IdType) => (state: RootState) => {
    if (state && id !== null) {
        return getUserRoles(state).filter(i => i.roleId === id);
    }
    return undefined;
};

export const getUserRolesGroupedByUserId = (state: RootState) => {
    if (state) {
        const map: MapType<any> = {};
        return getUserRoles(state).reduce((acc, cur, idx) => {
            if (cur && cur.userId) {
                if (acc[cur.userId] === undefined) {
                    acc[cur.userId] = [];
                }

                // @ts-ignore
                if (!(acc[cur.userId].find(i => i.id === cur.id))) {
                    acc[cur.userId].push(cur);
                }
            }

            return acc;
        }, map);
    }
    return undefined;
};

export const getUser = (id?: IdType) => (state: RootState) => {
    if (state && id !== undefined) {
        const map = requests.userMapRequest.getData(state) || {};
        return map[id];
    }
    return undefined;
};

export const userListLoading = requests.userMapRequest.getIsBusy;
export const userListError = requests.userMapRequest.getError;
