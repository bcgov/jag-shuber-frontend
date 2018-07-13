import * as runRequests from './requests/runs';
import * as jailRoleRequests from './requests/jailRoles';
import * as sherriffRankRequests from './requests/sheriffRankCodes';

// Runs
export const getRuns = runRequests.runMapRequest.actionCreator;

// Jail Roles
export const getJailRoles = jailRoleRequests.jailRoleMapRequest.actionCreator;

// Sheriff Rank Codes
export const getSheriffRankCodes = sherriffRankRequests.sheriffRankCodeMapRequest.actionCreator;