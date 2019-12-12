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
import { getLocationById } from '../system/selectors';

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

export const getAllSheriffs = (state: RootState) => {
  if (state) {
    return sheriffs(state);
  }
  return undefined;
};

export const getSheriff = (id?: IdType) => (state: RootState) => {
    if (state && id !== undefined) {
        const map = requests.sheriffMapRequest.getData(state) || {};
        return map[id];
    }
    return undefined;
};

export function getSheriffHomeLocation(sheriffId: IdType) {
    return (state: RootState) => {
        const { homeLocationId } = getSheriff(sheriffId)(state) as Sheriff;
        return homeLocationId == undefined ? undefined : getLocationById(homeLocationId)(state);
    };
}

export function getSheriffCurrentLocation(sheriffId: IdType) {
    return (state: RootState) => {
        const { currentLocationId, homeLocationId } = getSheriff(sheriffId)(state) as Sheriff;
        return currentLocationId == undefined ?
            getLocationById(homeLocationId)(state) :
            getLocationById(currentLocationId)(state);
    };
}

export const sheriffListLoading = requests.sheriffMapRequest.getIsBusy;
export const sheriffListError = requests.sheriffMapRequest.getError;

export interface SheriffLoanStatus {
    isLoanedOut: boolean;
    isLoanedIn: boolean;
    sheriffId: string;
}

export const sheriffLoanMap = createSelector(
    requests.sheriffMapRequest.getData,
    currentLocationSelector,
    (map = {}, currentSystemLocation) => {
        const loanInOutArray = Object.keys(map).map(id => {
            const {
                homeLocationId: homeLocation,
                currentLocationId: currentSheriffLocation
            } = map[id];
            let isLoanedIn = false;
            let isLoanedOut = false;

            if (currentSystemLocation !== homeLocation) {
                if (currentSheriffLocation && currentSheriffLocation === currentSystemLocation) {
                    isLoanedIn = true;
                }
            }

            if (currentSystemLocation === homeLocation) {
                if (currentSheriffLocation && currentSheriffLocation !== homeLocation) {
                    isLoanedOut = true;
                }
            }

            return {
                sheriffId: id,
                isLoanedIn: isLoanedIn,
                isLoanedOut: isLoanedOut
            } as SheriffLoanStatus;
        });
        return arrayToMap(loanInOutArray, (lio) => lio.sheriffId) as { [sheriffId: string]: SheriffLoanStatus };
    }
);

/**
 * Gets the Loan status of a given sheriff
 *
 * @param {string} sheriffId the sheriff Id to check
 * @returns
 */
export function getSheriffLoanStatus(sheriffId: string) {
    return (state: RootState) => {
        const status = sheriffLoanMap(state)[sheriffId] || {
            sheriffId,
            isLoanedIn: false,
            isLoanedOut: false
        };
        return status;
    };
}

/**
 * Selector returns whether or not the given sheriffId belongs to a sheriff who
 * is loaned out
 *
 * @param {string} sheriffId the sheriff Id to check
 * @returns
 */
export function isSheriffLoanedOut(sheriffId: string) {
    return (state: RootState) => {
        const { isLoanedOut = false } = getSheriffLoanStatus(sheriffId)(state);
        return isLoanedOut;
    };
}

/**
 * Selector returns whether or not the given sheriffId belongs to a sheriff who
 * is loaned In
 *
 * @param {string} sheriffId the sheriff Id to check
 * @returns
 */
export function isSheriffLoanedIn(sheriffId: string) {
    return (state: RootState) => {
        const { isLoanedIn = false } = getSheriffLoanStatus(sheriffId)(state);
        return isLoanedIn;
    };
}

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
