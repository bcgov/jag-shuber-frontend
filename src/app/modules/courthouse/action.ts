import * as courtroomRequests from './requests/courtrooms';
import * as runRequests from './requests/runs';
import * as jailRoleRequests from './requests/jailRoles';
import * as alternateAssignmentTypeRequests from './requests/alternateAssignmentTypes';
import * as courthouseRequests from './requests/courthouses';
import * as sherriffRankRequests from './requests/sheriffRankCodes';
import * as courtRoleRequest from './requests/courtRoles';

// Courtrooms
export const getCourtrooms = courtroomRequests.courtroomMapRequest.actionCreator;

// Runs
export const getRuns = runRequests.runMapRequest.actionCreator;

// Jail Roles
export const getJailRoles = jailRoleRequests.jailRoleMapRequest.actionCreator;

// Alternate Assign
export const getAlternateAssignmentTypes = 
    alternateAssignmentTypeRequests.alternateAssignmentTypeMapRequest.actionCreator;

// Courthouses
export const getCourthouses = courthouseRequests.courthouseMapRequest.actionCreator;

// Sheriff Rank Codes
export const getSheriffRankCodes = sherriffRankRequests.sheriffRankCodeMapRequest.actionCreator;

// Court Roles
export const getCourtRoles = courtRoleRequest.courtRoleMapRequest.actionCreator;