import * as courtroomRequests from './requests/courtrooms';
import * as runRequests from './requests/runs';
import * as jailRoleRequests from './requests/jailRoles';
import * as alternateAssignmentTypeRequests from './requests/alternateAssignmentTypes';

// Courtrooms
export const getCourtrooms = courtroomRequests.courtroomMapRequest.actionCreator;

// Runs
export const getRuns = runRequests.runMapRequest.actionCreator;

// Jail Roles
export const getJailRoles = jailRoleRequests.jailRoleMapRequest.actionCreator;

// Alternate Assign
export const getAlternateAssignmentTypes = 
    alternateAssignmentTypeRequests.alternateAssignmentTypeMapRequest.actionCreator;