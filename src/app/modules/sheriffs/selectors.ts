import { createSelector } from 'reselect';
import * as requests from './requests';
import { RootState } from '../../store';
import {
    IdType, Sheriff
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';
import { currentLocation as currentLocationSelector } from '../user/selectors';
import arrayToMap from '../../infrastructure/arrayToMap';
import { ErrorMap } from './common';
import { CodeSelector } from '../../infrastructure/CodeSelector';

export const DEFAULT_SHERIFF_SORTER = createSelector(
    requests.sheriffRankCodeMapRequest.getData,
    (rankMap) => {
        function getSortString(s: Sheriff) {
            return `${rankMap[s.rankCode as string].order}${s.lastName}${s.firstName}`;
        }
        return (a: Sheriff, b: Sheriff) => getSortString(a).localeCompare(getSortString(b));
});

export const sheriffs = createSelector(
    requests.sheriffMapRequest.getData,
    DEFAULT_SHERIFF_SORTER,
    (map, sorter) => {
        return mapToArray(map).sort(sorter) || [];
    }
);

export const sheriffsForCurrentLocation = createSelector(
    sheriffs,
    currentLocationSelector,
    (sheriffList, location) => {
        return sheriffList.filter(s => s.homeLocationId === location || s.currentLocationId === location);
    }
);

export const getSheriff = (id?: IdType) => (state: RootState) => {
    // tslint:disable-next-line:triple-equals
    if (state && id != undefined) {
        const map = requests.sheriffMapRequest.getData(state) || {};
        return map[id];
    }
    return undefined;
};

export const sheriffListLoading = requests.sheriffMapRequest.getIsBusy;
export const sheriffListError = requests.sheriffMapRequest.getError;

export const sheriffLoanMap = createSelector(
    requests.sheriffMapRequest.getData,
    currentLocationSelector,
    (map = {}, currentLocation) => {
        const loanInOutArray = Object.keys(map).map(id => {
            const {
                homeLocationId: homeLocation,
                currentLocationId: currentLocation
            } = map[id];
            let isLoanedIn = false;
            let isLoanedOut = false;

            if (currentLocation !== homeLocation) {
                if (currentLocation && currentLocation === currentLocation) {
                    isLoanedIn = true;
                }
            }

            if (currentLocation === homeLocation) {
                if (currentLocation && currentLocation !== homeLocation) {
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

export const selectedSheriffProfileSection = (state: RootState) => {
    const { sheriffs: { selectedProfileSection = undefined } = {} } = state;
    return selectedProfileSection;
};

export const getSheriffProfilePluginErrors = (state: RootState) => {
    const { sheriffs: { pluginSubmitErrors = {} } = {} } = state;
    return pluginSubmitErrors as ErrorMap;
};

// Sheriff Rank Codes
const sheriffRankCodeSelector = new CodeSelector(
    requests.sheriffRankCodeMapRequest.getData,
    (a, b) => a.order - b.order
);

export const allSheriffRankCodes = sheriffRankCodeSelector.all;

export const allEffectiveSheriffRankCodes = sheriffRankCodeSelector.effective;

export const getSheriffRankByCode = (code: IdType) => (state: RootState) => {
    const map = requests.sheriffRankCodeMapRequest.getData(state);
    return map ? map[code] : undefined;
};