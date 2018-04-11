import { createSelector } from 'reselect';
import * as requests from './requests';
import { RootState } from '../../store';
import {
    Sheriff,
    SheriffMap,
    IdType
} from '../../api/Api';

export const sheriffs = createSelector(
    requests.sheriffMapRequest.getData,
    (map: SheriffMap = {}): Sheriff[] => {
        const list: Sheriff[] = Object.keys(map).map((k, i) => map[k]);
        return list;
    }
);

export const getSheriff = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map = requests.sheriffMapRequest.getData(state);
        return map[id];
    }
    return null;
};

export const sheriffListLoading = requests.sheriffMapRequest.getIsBusy;
export const sheriffListError = requests.sheriffMapRequest.getError;
