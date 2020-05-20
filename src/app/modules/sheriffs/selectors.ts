import moment from 'moment';
import { createSelector } from 'reselect';
import * as requests from './requests';
import { RootState } from '../../store';

import {
    IdType, DateType, Sheriff, SheriffLocation
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

export function getSheriffCurrentLocationDuration(sheriffId: IdType) {
    return (state: RootState) => {
        const { currentLocationId, homeLocationId } = getSheriff(sheriffId)(state) as Sheriff;
        return currentLocationId === undefined ?
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
                homeLocationId: homeLocation,
                currentLocationId: currentSheriffLocation
            } = map[id];

            let sheriffLocation: SheriffLocation | undefined = undefined;
            let matchingLocations: SheriffLocation[] = [];
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

            if (isLoanedIn || isLoanedOut) {
                // Load up the start and end dates from the sheriffLocations module
                matchingLocations = sheriffLocations.filter((location) => {
                    const { startDate, endDate, startTime, endTime } = location as SheriffLocation;
                    const currentMoment = moment().startOf('day');
                    const startMoment = moment(startDate).startOf('day');
                    const endMoment = moment(endDate).startOf('day');
                    const startTimeMoment = moment(startTime, 'hh:mm:ss');
                    const endTimeMoment = moment(endTime, 'hh:mm:ss');

                    if (startTime) {
                        // console.log(`Time Range: [${startMoment.format('YYYY-MM-DD')}] ${startTimeMoment.format('hh:mm')} -> ${endTimeMoment.format('hh:mm')}`);
                    } else {
                        // console.log(`Date Range: [${startMoment.format('YYYY-MM-DD')} - ${endMoment.format('YYYY-MM-DD')}]`);
                    }

                    const startDateIsSameOrBeforeNow = startMoment.isSameOrBefore(currentMoment);
                    const endDateIsSameOrAfterNow = endMoment.isSameOrAfter(currentMoment);

                    return (startDateIsSameOrBeforeNow && endDateIsSameOrAfterNow);
                });
            }

            if (matchingLocations && matchingLocations[0]) {
                matchingLocations.sort((a: any, b: any) => b.isPartial - a.isPartial); // Prioritize partial days
                sheriffLocation = matchingLocations[0];
                // console.log(`${matchingLocations.length} matching locations:`);
                // console.log(matchingLocations);
                // console.log('sheriff is on loan to:');
                // console.log(sheriffLocation);
            }

            return {
                sheriffId: id,
                isLoanedIn: isLoanedIn,
                isLoanedOut: isLoanedOut,
                startDate: (sheriffLocation) ? moment(sheriffLocation.startDate).format('YYYY-MM-DD') : undefined,
                endDate: (sheriffLocation) ? moment(sheriffLocation.startDate).format('YYYY-MM-DD') : undefined,
                startTime: (sheriffLocation) ? moment(sheriffLocation.startTime, 'hh:mm:ss').format('hh:mm') : undefined,
                endTime: (sheriffLocation) ? moment(sheriffLocation.endTime, 'hh:mm:ss').format('hh:mm') : undefined
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
