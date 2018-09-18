import * as assignmentRequests from './requests/assignments';
import * as assignmentDutyRequests from './requests/assignmentDuties';
import * as alternateAssignmentTypeRequests from './requests/alternateAssignmentTypes';
import * as courtRoleRequest from './requests/courtRoles';
import * as courtroomRequests from './requests/courtrooms';
import * as jailRoleRequests from './requests/jailRoles';
import * as runRequests from './requests/runs';
import { IdType, AssignmentDuty } from '../../api';
import { ThunkAction } from '../../store';
import { getAssignmentDuty } from './selectors';

// Assignments
export const getAssignments = assignmentRequests.assignmentMapRequest.actionCreator;
export const createAssignment = assignmentRequests.createAssignmentRequest.actionCreator;
export const editAssignment = assignmentRequests.updateAssignmentRequest.actionCreator;
export const deleteAssignment = assignmentRequests.deleteAssignmentRequest.actionCreator;
export const deleteDutyRecurrence = assignmentRequests.deleteAssignmentDutyRecurrenceRequest.actionCreator;

export const getAlternateAssignmentTypes = 
    alternateAssignmentTypeRequests.alternateAssignmentTypeMapRequest.actionCreator;
export const getCourtRoles = courtRoleRequest.courtRoleMapRequest.actionCreator;
export const getCourtrooms = courtroomRequests.courtroomMapRequest.actionCreator;
export const getJailRoles = jailRoleRequests.jailRoleMapRequest.actionCreator;
export const getRuns = runRequests.runMapRequest.actionCreator;

// Assignment Duties
export const getAssignmentDuties = assignmentDutyRequests.assignmentDutyMapRequest.actionCreator;
export const createAssignmentDuty = assignmentDutyRequests.createAssignmentDutyRequest.actionCreator;
export const editAssignmentDuty = assignmentDutyRequests.updateAssignmentDutyRequest.actionCreator;
export const assignSheriffToDuty = assignmentDutyRequests.assignSheriffRequest.actionCreator;
export const deleteAssignmentDuty = assignmentDutyRequests.deleteAssignmentDutyRequest.actionCreator;
export const createDefaultDuties = assignmentDutyRequests.createDefaultDutiesRequest.actionCreator;

export const autoAssignSheriffDuties = assignmentDutyRequests.autoAssignSheriffDutiesRequest.actionCreator;

// Sheriff Duties
export const deleteSheriffDuty = assignmentDutyRequests.deleteSheriffDutyRequest.actionCreator;
export const reassignSheriffDuty = assignmentDutyRequests.reassignSheriffDutyRequest.actionCreator;

type SheriffDutyLink = { sheriffId: IdType, dutyId: IdType, sheriffDutyId: IdType };
export const linkAssignment: ThunkAction<SheriffDutyLink, AssignmentDuty | undefined> =
    ({ sheriffId, dutyId, sheriffDutyId }: SheriffDutyLink) => async (dispatch, getState, extra) => {
        const duty = getAssignmentDuty(dutyId)(getState());
        if (duty == null) {
            return;
        }
        const { sheriffDuties = [] } = duty;
        const indexOfSheriffDuty = sheriffDuties.findIndex(s => s.id === sheriffDutyId);
        if (indexOfSheriffDuty !== -1) {
            sheriffDuties[indexOfSheriffDuty].sheriffId = sheriffId;
        }
        return dispatch(assignSheriffToDuty({ ...duty }));
    };