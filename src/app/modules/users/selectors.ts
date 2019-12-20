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

export const getUser = (id?: IdType) => (state: RootState) => {
    if (state && id !== undefined) {
        const map = requests.userMapRequest.getData(state) || {};
        return map[id];
    }
    return undefined;
};

export const userListLoading = requests.userMapRequest.getIsBusy;
export const userListError = requests.userMapRequest.getError;
