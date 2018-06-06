import { createSelector } from 'reselect';
import * as requests from './requests';
import { RootState } from '../../store';
import {
    IdType
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';
import { currentCourthouse as currentCourthouseSelector } from '../user/selectors';
import arrayToMap from '../../infrastructure/arrayToMap';

export const sheriffs = createSelector(
    requests.sheriffMapRequest.getData,
    (map) => mapToArray(map)
        .sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`))
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

export const sheriffLoanMap = createSelector(
    requests.sheriffMapRequest.getData,
    currentCourthouseSelector,
    (map = {}, currentCourthouse) => {
        const loanInOutArray = Object.keys(map).map(id => {
            const {
                homeCourthouseId: homeLocation, 
                currentCourthouseId: currentLocation
            } = map[id];
            let isLoanedIn = false;
            let isLoanedOut = false;
            
            if (currentCourthouse != homeLocation) {
                if (currentLocation && currentLocation == currentCourthouse) {
                   isLoanedIn = true;
                }
            }

            if (currentCourthouse == homeLocation) {
                if (currentLocation && currentLocation != homeLocation) {
                   isLoanedOut = true;
                }
            }

            return {
                sheriffId: id,
                isLoanedIn: isLoanedIn,
                isLoanedOut: isLoanedOut
            };
    });
        return arrayToMap(loanInOutArray, (lio) => lio.sheriffId);
    }
);
