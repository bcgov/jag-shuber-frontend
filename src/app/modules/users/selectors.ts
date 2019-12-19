import { createSelector } from 'reselect';
import * as requests from './requests';
import { RootState } from '../../store';
import {
    IdType, User
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';
import { currentLocation as currentLocationSelector } from '../user/selectors';
import arrayToMap from '../../infrastructure/arrayToMap';
import { ErrorMap } from './common';
import { CodeSelector } from '../../infrastructure/CodeSelector';
import { getLocationById } from '../system/selectors';

export const DEFAULT_USER_SORTER = createSelector(
    requests.userRankCodeMapRequest.getData,
    (rankMap) => {
        function getSortString(s: User) {
            // TODO: Fix sort string!
            return 'FAKE_SORT_STRING'; // `${rankMap[s.rankCode as string].order}${s.lastName}${s.firstName}`;
        }
        return (a: User, b: User) => getSortString(a).localeCompare(getSortString(b));
    });

export const users = createSelector(
    requests.userMapRequest.getData,
    DEFAULT_USER_SORTER,
    (map, sorter) => {
        return mapToArray(map).sort(sorter) || [];
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

export const getUser = (id?: IdType) => (state: RootState) => {
    if (state && id !== undefined) {
        const map = requests.userMapRequest.getData(state) || {};
        return map[id];
    }
    return undefined;
};

export const userListLoading = requests.userMapRequest.getIsBusy;
export const userListError = requests.userMapRequest.getError;
