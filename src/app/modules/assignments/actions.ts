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

// Assignment Duties
export const getAssignmentDuties = assignmentDutyRequests.assignmentDutyMapRequest.actionCreator;
export const createAssignmentDuty = assignmentDutyRequests.createAssignmentDutyRequest.actionCreator;
export const editAssignmentDuty = assignmentDutyRequests.updateAssignmentDutyRequest.actionCreator;
export const deleteAssignmentDuty = assignmentDutyRequests.deleteAssignmentDutyRequest.actionCreator;

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
        // const newSheriffIds = sheriffDuties.slice(0);
        // if (newSheriffIds.indexOf(sheriffId) === -1) {
        //     newSheriffIds.push(sheriffId);
        // }
        dispatch(editAssignmentDuty({ ...duty/*, sheriffDuties: newSheriffIds*/ }));
    };

export const unlinkAssignment: ThunkAction<SheriffDutyLink> =
    ({ sheriffId, dutyId }: SheriffDutyLink) => (dispatch, getState, extra) => {
        const duty = getAssignmentDuty(dutyId)(getState());
        if (duty == null) {
            return;
        }

        // const { sheriffDuties = [] } = duty;
        // const sheriffIndex = sheriffDuties.indexOf(sheriffId);
        // const newSheriffIds = sheriffDuties.slice(0);
        // // If not found, just return
        // if (sheriffIndex === -1) {
        //     return;
        // }

        // newSheriffIds.splice(sheriffIndex, 1);
        // dispatch(editAssignmentDuty({ ...duty, sheriffDuties: newSheriffIds }));
    };