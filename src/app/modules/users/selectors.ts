import { createSelector } from 'reselect';
import * as requests from './requests';
import { RootState } from '../../store';
import {
    IdType, MapType, User
} from '../../api';

import mapToArray from '../../infrastructure/mapToArray';
import { currentLocation as currentLocationSelector } from '../user/selectors';
import { getUserRoles } from '../roles/selectors';
import { EffectiveSelector } from '../../infrastructure/EffectiveSelector';

export const getUsers = createSelector(
    requests.userMapRequest.getData,
    (map) => {
        return mapToArray(map) || [];
    }
);

const userSelector = new EffectiveSelector<User>(
    requests.userMapRequest.getData,
    (u) => u.expiryDate
);

export const allUsers = userSelector.all;

export const allEffectiveUsers = userSelector.effective;

export const usersForCurrentLocation = createSelector(
    getUsers,
    currentLocationSelector,
    (userList, location) => {
        return userList; // .filter(s => s.homeLocationId === location || s.currentLocationId === location);
    }
);

export const getAllUsers = (state: RootState) => {
    if (state) {
        const users = allEffectiveUsers()(state);

        // Don't return ALL users, just a slice or we can blow up the DOM if we render too many elements
        let { min = 0, max = 10 } = { min: 0, max: 25 };
        if (users && users.length <= max ) {
            max = users.length;
        }

        return users.slice(min, max);
            /*.sort((a: any, b: any) =>
            (a.lastName < b.lastName) ? -1 : (a.lastName > b.lastName) ? 1 : 0);*/
    }
    return undefined;
};

export const getUserRolesByUserRoleId = (id?: IdType) => (state: RootState) => {
    if (state && id) {
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

export const findAllUsers = (filters: any) => (state: RootState) => {
    if (state) {
        let users = allUsers(state);

        // User contains a sheriff reference, break into two sets of filters
        // eg: user: { sheriff: {...} }
        if (filters.displayName) {
            users = users.filter(u => {
                return (u && u.displayName && u.displayName !== '')
                    ? u.displayName.toLowerCase().includes(`${filters.displayName.toLowerCase()}`)
                    : false;
            });
        }

        if (filters && filters.sheriff) {
            const sheriffFilters = filters.sheriff;
            Object.keys(sheriffFilters).forEach(key => {
                let filterValue = '';
                let exactMatch = false;

                if (filters.sheriff[key]) {
                    switch (typeof filters.sheriff[key]) {
                        case 'string':
                            filterValue = filters.sheriff[key];
                            break;
                        case 'number':
                            filterValue = filters.sheriff[key].toString();
                            break;
                        case 'object':
                            // TODO: We could ensure that these exist...
                            filterValue = filters.sheriff[key].value || '';
                            exactMatch = filters.sheriff[key].exact || false;
                            break;
                        default:
                            break;
                    }
                }

                let testMatchFn = (u: any) => true;
                if (filterValue && exactMatch) {
                    testMatchFn = (u: any) => u.sheriff[key].toLowerCase() === (`${filterValue.toLowerCase()}`);
                } else if (filterValue && !exactMatch) {
                    testMatchFn = (u: any) => u.sheriff[key].toLowerCase().includes(`${filterValue.toLowerCase()}`);
                }

                users = users.filter(u => {
                    return (u.sheriff && u.sheriff[key] && u.sheriff[key] !== '') ? testMatchFn(u) : false;
                });
            });
        }

        // Don't return ALL users, just a slice or we can blow up the DOM if we render too many elements
        let { min = 0, max = 10 } = { min: 0, max: 25 };
        if (users && users.length <= max ) {
            max = users.length;
        }

        users = users.slice(min, max);

        users = users.sort((a: any, b: any) => (a.displayName < b.displayName) ? -1 : (a.displayName > b.displayName) ? 1 : 0);
        return users;
    }
    return undefined;
};

export const findUserRolesGroupedByUserId = (filters: any) => (state: RootState) => {
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
        return allUsers(state).find((user: User) => user.id === id as string);
    }
    return undefined;
};

export const getUserByAuthId = (userAuthId?: IdType) => (state: RootState) => {
    if (state && userAuthId !== undefined) {
        const users = allUsers(state);
        return users.find((user: User) => user.userAuthId === userAuthId as string);
    }
    return undefined;
};

export const userListLoading = requests.userMapRequest.getIsBusy;
export const userListError = requests.userMapRequest.getError;
