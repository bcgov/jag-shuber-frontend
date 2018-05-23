import { RootState } from '../../store';
import * as courtroomRequests from './requests/courtrooms';
import * as runRequests from './requests/runs';
import * as jailRoleRequests from './requests/jailRoles';
import * as alternateAssignmentTypeRequests from './requests/alternateAssignmentTypes';
import * as courthouseRequests from './requests/courthouses';
import * as sheriffRankCodeRequests from './requests/sheriffRankCodes';
import { IdType } from '../../api/Api';

// Courtrooms
export const allCourtrooms = courtroomRequests.courtroomMapRequest.getData;

// Runs
export const allRuns = runRequests.runMapRequest.getData;

// Jail Roles
export const allJailRoles = jailRoleRequests.jailRoleMapRequest.getData;

// Alternate Assignment Types
export const allAlternateAssignmentTypes = alternateAssignmentTypeRequests.alternateAssignmentTypeMapRequest.getData;

// Courthouses
export const allCourthouses = courthouseRequests.courthouseMapRequest.getData;

export const selectedCourthouse = (id: IdType) => (state: RootState) => {
    const { courthouseMap } = state.courthouse;
    return courthouseMap ? courthouseMap[id] : '';
};

// Sheriff Rank Codes
export const allSheriffRankCodes = sheriffRankCodeRequests.sheriffRankCodeMapRequest.getData;