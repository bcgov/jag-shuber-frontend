import * as assignmentRequests from './requests/assignments';
import * as assignmentDutyRequests from './requests/assignmentDuties';
import { IdType } from '../../api';
import { ThunkAction } from '../../store';
import { getAssignmentDuty } from './selectors';

// Assignments
export const getAssignments = assignmentRequests.assignmentMapRequest.actionCreator;
export const createAssignment = assignmentRequests.createAssignmentRequest.actionCreator;
export const editAssignment = assignmentRequests.updateAssignmentRequest.actionCreator;
export const deleteAssignment = assignmentRequests.deleteAssignmentRequest.actionCreator;
export const deleteDutyRecurrence = assignmentRequests.deleteAssignmentDutyRecurrenceRequest.actionCreator;

// Assignment Duties
export const getAssignmentDuties = assignmentDutyRequests.assignmentDutyMapRequest.actionCreator;
export const createAssignmentDuty = assignmentDutyRequests.createAssignmentDutyRequest.actionCreator;
export const editAssignmentDuty = assignmentDutyRequests.updateAssignmentDutyRequest.actionCreator;
export const deleteAssignmentDuty = assignmentDutyRequests.deleteAssignmentDutyRequest.actionCreator;
export const createDefaultDuties = assignmentDutyRequests.createDefaultDutiesRequest.actionCreator;
export const getAssignmentDutyDetails = assignmentDutyRequests.assignmentDutyDetailsMapRequest.actionCreator;
export const createAssignmentDutyDetails = assignmentDutyRequests.createAssignmentDutyDetailsRequest.actionCreator;
export const updateAssignmentDutyDetails = assignmentDutyRequests.updateAssignmentDutyDetailsRequest.actionCreator;

// Sheriff Duties
export const deleteSheriffDuty = assignmentDutyRequests.deleteSheriffDutyRequest.actionCreator;

type SheriffDutyLink = { sheriffId: IdType, dutyId: IdType, sheriffDutyId: IdType };
export const linkAssignment: ThunkAction<SheriffDutyLink> =
    ({ sheriffId, dutyId, sheriffDutyId }: SheriffDutyLink) => (dispatch, getState, extra) => {
        const duty = getAssignmentDuty(dutyId)(getState());
        if (duty == null) {
            return;
        }
        const { sheriffDuties = [] } = duty;
        const indexOfSheriffDuty = sheriffDuties.findIndex(s => s.id === sheriffDutyId);
        if (indexOfSheriffDuty !== -1) {
            sheriffDuties[indexOfSheriffDuty].sheriffId = sheriffId;
        }
        dispatch(editAssignmentDuty({ ...duty}));
    };