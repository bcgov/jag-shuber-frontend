import { createSelector } from 'reselect';
import * as requests from './requests';
import { RootState } from '../../store';
import {
    IdType
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';

export const sheriffs = createSelector(
    requests.sheriffMapRequest.getData,
    (map) => mapToArray(map).sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`)) 
);

export const getSheriff = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map = requests.sheriffMapRequest.getData(state) || {};
        return map[id];
    }
    return undefined;
};

export const sheriffListLoading = requests.sheriffMapRequest.getIsBusy;
export const sheriffListError = requests.sheriffMapRequest.getError;
