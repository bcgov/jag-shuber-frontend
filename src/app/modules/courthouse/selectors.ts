import { RootState } from '../../store';
import * as courtroomRequests from './requests/courtrooms';
import * as runRequests from './requests/runs';
import * as jailRoleRequests from './requests/jailRoles';
import * as alternateAssignmentTypeRequests from './requests/alternateAssignmentTypes';
import * as courthouseRequests from './requests/courthouses';
import * as sheriffRankCodeRequests from './requests/sheriffRankCodes';
import * as courtRoleRequests from './requests/courtRoles';
import { IdType } from '../../api/Api';
import { createSelector } from 'reselect';
import mapToArray from '../../infrastructure/mapToArray';
import { CodeSelector } from '../../infrastructure/CodeSelector';

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
const jailRoleSelector = new CodeSelector(
    jailRoleRequests.jailRoleMapRequest.getData
);

export const allJailRoles = jailRoleSelector.all;

export const allEffectiveJailRoles = jailRoleSelector.effective;

// Alternate Assignment Types
const altAssignmentTypesSelector = new CodeSelector(
    alternateAssignmentTypeRequests.alternateAssignmentTypeMapRequest.getData
);

export const allAlternateAssignmentTypes = altAssignmentTypesSelector.all;

export const allEffectAlternateAssignmentTypes = altAssignmentTypesSelector.effective;

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
const sheriffRankCodeSelector = new CodeSelector(
    sheriffRankCodeRequests.sheriffRankCodeMapRequest.getData
);

export const allSheriffRankCodes = sheriffRankCodeSelector.all;

export const allEffectiveSheriffRankCodes = sheriffRankCodeSelector.effective;

export const getSheriffRankByCode = (code: IdType) => (state: RootState) => {
    const map = sheriffRankCodeRequests.sheriffRankCodeMapRequest.getData(state);
    return map ? map[code] : undefined;
};

// Court Roles
const courtRoleSelector = new CodeSelector(
    courtRoleRequests.courtRoleMapRequest.getData
);

export const allCourtRoles = courtRoleSelector.all;

export const allEffectiveCourtRoles = courtRoleSelector.effective;