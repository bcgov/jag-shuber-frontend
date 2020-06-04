import moment from 'moment';
import { createSelector } from 'reselect';
import * as requests from './requests';
import { RootState } from '../../store';

import {
    IdType, DateType, Sheriff, SheriffLocation, Location
} from '../../api';

import { ErrorMap } from './common';

import mapToArray from '../../infrastructure/mapToArray';
import arrayToMap from '../../infrastructure/arrayToMap';
import { CodeSelector } from '../../infrastructure/CodeSelector';

import { allLocations as allSheriffLocationsSelector } from '../sheriffLocations/selectors';
import { currentLocation as currentLocationSelector } from '../user/selectors';
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
        return sheriffs(state).sort((a: any, b: any) =>
            (a.lastName < b.lastName) ? -1 : (a.lastName > b.lastName) ? 1 : 0);
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
        return homeLocationId === undefined ? undefined : getLocationById(homeLocationId)(state);
    };
}

export function getSheriffCurrentLocation(sheriffId: IdType) {
    return (state: RootState) => {
        const sheriff = getSheriff(sheriffId)(state) as Sheriff;
        const { currentLocationId, homeLocationId } = sheriff;
        return currentLocationId === undefined ?
            getLocationById(homeLocationId)(state) :
            getLocationById(currentLocationId)(state);
    };
}

export const sheriffListLoading = requests.sheriffMapRequest.getIsBusy;
export const sheriffListError = requests.sheriffMapRequest.getError;

export interface SheriffLoanStatus {
    location?: Location;
    isLoanPendingOrActive: boolean;
    isLoanedOut: boolean;
    isLoanedIn: boolean;
    sheriffId: string;
    startDate?: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
}

export const sheriffLoanMap = createSelector(
    requests.sheriffMapRequest.getData,
    currentLocationSelector,
    allSheriffLocationsSelector,
    (map = {}, currentSystemLocation, sheriffLocations) => {
        const loanInOutArray = Object.keys(map).map(id => {
            const {
                homeLocationId,
                homeLocation,
                currentLocationId,
                currentLocation
            } = map[id];

            let loanInfo: SheriffLocation | undefined = undefined;
            let location: Location | undefined = undefined;
            let isLoanedIn = false;
            let isLoanedOut = false;

            if (currentLocationId && currentLocation) {
                // Location will be wrapped in a SheriffLoanStatus
                loanInfo = currentLocation as SheriffLocation;
                location = loanInfo.location;
            }

            if (location) {
                if (currentSystemLocation === homeLocationId) {
                    if (location.id !== homeLocationId) {
                        isLoanedOut = true;
                    }
                }

                if (currentSystemLocation !== homeLocationId) {
                    if (location.id === currentSystemLocation) {
                        isLoanedIn = true;
                    }
                }
            }

            return {
                sheriffId: id,
                location: (location) ? location : undefined,
                isLoanedIn: (location) ? isLoanedIn : false,
                isLoanedOut: (location) ? isLoanedOut : false,
                startDate: (loanInfo) ? moment(loanInfo.startDate).utc().format('YYYY-MM-DD') : undefined,
                endDate: (loanInfo) ? moment(loanInfo.endDate).utc().format('YYYY-MM-DD') : undefined,
                startTime: (loanInfo && loanInfo.startTime) ? moment(loanInfo.startTime, 'HH:mm:ss').format('HH:mm') : undefined,
                endTime: (loanInfo && loanInfo.endTime) ? moment(loanInfo.endTime, 'HH:mm:ss').format('HH:mm') : undefined
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
    const { sheriffs: { selectedSection = undefined } = {} } = state;
    return selectedSection;
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
