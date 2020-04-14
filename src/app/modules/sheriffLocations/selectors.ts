import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as sheriffLocationRequests from './requests';
import {
    SheriffLocationMap,
    IdType,
    DateType
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';
import arrayToMap from '../../infrastructure/arrayToMap';
import moment from 'moment';

export const allLocations = createSelector(
    sheriffLocationRequests.sheriffLocationMapRequest.getData,
    (map) => {
        const sheriffLocationMap = mapToArray(map)
            .filter(l => moment(l.startDate).isSameOrAfter(moment().subtract(1, 'year'), 'day'));
        return sheriffLocationMap
            .sort((a, b) => `${moment(a.startDate).toISOString()}`
            .localeCompare(`${moment(b.startDate).toISOString()}`));
    }
);

export const getSheriffLocation = (id?: IdType) => (state: RootState) => {
    if (state && id) {
        const map: SheriffLocationMap = sheriffLocationRequests.sheriffLocationMapRequest.getData(state);
        return map[id];
    }
    return undefined;
};

export const getSheriffLocations = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId !== null) {
        return allLocations(state).filter(l => l.sheriffId === sheriffId);
    }
    return [];
};
