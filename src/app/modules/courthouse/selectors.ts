import { RootState } from '../../store';
import * as courtroomRequests from './requests/courtrooms';
import * as runRequests from './requests/runs';
import * as jailRoleRequests from './requests/jailRoles';
import * as alternateAssignmentTypeRequests from './requests/alternateAssignmentTypes';
import * as courthouseRequests from './requests/courthouses';
import * as sheriffRankCodeRequests from './requests/sheriffRankCodes';
import { IdType } from '../../api/Api';
import { createSelector } from 'reselect';
import mapToArray from '../../infrastructure/mapToArray';

// Courtrooms
export const allCourtrooms = createSelector(
    courtroomRequests.courtroomMapRequest.getData,
    (courtrooms) => mapToArray(courtrooms).sort((a, b) => a.name.localeCompare(b.name))
);

// Runs
export const allRuns = createSelector(
    runRequests.runMapRequest.getData,
    (runs) => mapToArray(runs).sort((a, b) => a.title.localeCompare(b.title))
);

// Jail Roles
export const allJailRoles = createSelector(
    jailRoleRequests.jailRoleMapRequest.getData,
    (jailRoles) => mapToArray(jailRoles).sort((a, b) => a.description.localeCompare(b.description))
);

// Alternate Assignment Types
export const allAlternateAssignmentTypes = createSelector(
    alternateAssignmentTypeRequests.alternateAssignmentTypeMapRequest.getData,
    (altAssignmentTypes) => mapToArray(altAssignmentTypes)
        .sort((a, b) => a.description.localeCompare(b.description))
);

// Courthouses
export const allCourthouses = createSelector(
    courthouseRequests.courthouseMapRequest.getData,
    (courthouses) => mapToArray(courthouses)
        .sort((a, b) => a.name.localeCompare(b.name))
);

export const courthouseById = (id: IdType) => (state: RootState) => {
    const map = courthouseRequests.courthouseMapRequest.getData(state);
    return id && map ? map[id] : undefined;
};

export const selectedCourthouse = (id: IdType) => (state: RootState) => {
    const { courthouseMap } = state.courthouse;
    return courthouseMap ? courthouseMap[id] : '';
};

// Sheriff Rank Codes
export const allSheriffRankCodes = createSelector(
    sheriffRankCodeRequests.sheriffRankCodeMapRequest.getData,
    (roles) => mapToArray(roles).sort((a, b) => a.description.localeCompare(b.description))
);

export const getSheriffRankByCode = (code: IdType) => (state: RootState) => {
    const map = sheriffRankCodeRequests.sheriffRankCodeMapRequest.getData(state);
    return map ? map[code] : undefined;
};