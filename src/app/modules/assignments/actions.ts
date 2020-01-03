import * as assignmentRequests from './requests/assignments';
import * as assignmentDutyRequests from './requests/assignmentDuties';
import * as alternateAssignmentTypeRequests from './requests/alternateAssignmentTypes';
import * as courtRoleRequest from './requests/courtRoles';
import * as courtroomRequests from './requests/courtrooms';
import * as jailRoleRequests from './requests/jailRoles';
import * as runRequests from './requests/runs';
import { IdType, AssignmentDuty, SheriffDuty, Shift } from '../../api';
import { ThunkAction } from '../../store';
import { getAssignmentDuty } from './selectors';
import { getSheriffShiftsForDate } from '../shifts/selectors';
import { TimeRange, isTimeWithin } from 'jag-shuber-api';
import { ErrorMap } from '../sheriffs/common';
import { Action } from 'redux';
//import { doTimeRangesOverlap } from 'jag-shuber-api';
//import moment from 'moment';

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
export const createOrUpdateCourtrooms = courtroomRequests.createOrUpdateCourtroomsRequest.actionCreator;
export const deleteCourtrooms = courtroomRequests.deleteCourtroomsRequest.actionCreator;

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

export type SheriffDutyLink = { sheriffId: IdType, dutyId: IdType, sheriffDutyId: IdType };
export const linkAssignment: ThunkAction<SheriffDutyLink, AssignmentDuty | undefined> = ({ sheriffId, dutyId, sheriffDutyId }: SheriffDutyLink) => async (dispatch, getState, extra) =>
{
    const state = getState();
    const duty = getAssignmentDuty(dutyId)(state);
    if (duty == null) {
        return;
    }
    const { sheriffDuties = [] } = duty;
    const indexOfSheriffDuty = sheriffDuties.findIndex(s => s.id === sheriffDutyId);
    if (indexOfSheriffDuty === -1) {
        return
    }
    const sheriffDuty = sheriffDuties[indexOfSheriffDuty];
    sheriffDuty.sheriffId = sheriffId;

    const shifts = getSheriffShiftsForDate(duty.startDateTime, sheriffId)(state);

    setAssignmentBasedOnShift(shifts, sheriffDuty, duty);

    return dispatch(assignSheriffToDuty({ ...duty }));
};

const setAssignmentBasedOnShift = (sheriffShifts: Shift[], sheriffDuty: SheriffDuty, duty: AssignmentDuty, originalDuty?: AssignmentDuty) => {
    if (originalDuty)
    {
        const originalSheriffDuty = originalDuty.sheriffDuties.find(sd => sd.id == sheriffDuty.id);
        if (originalSheriffDuty && originalSheriffDuty.sheriffId == sheriffDuty.sheriffId)
        {
            return;
        }
    }
    // TODO: how to properly filter the filter we should select?
    const shift = sheriffShifts[0];
    if (shift)
    {
        const shiftRange = { startTime: shift.startDateTime, endTime: shift.endDateTime } as TimeRange;
        const dutyRange = { startTime: sheriffDuty.startDateTime, endTime: sheriffDuty.endDateTime } as TimeRange;
        if (isTimeWithin(shiftRange.startTime, dutyRange) || isTimeWithin(shiftRange.endTime, dutyRange))
        {
            // if shift begins after the duty then create an assignment for the remaining time
            if (shift.startDateTime > duty.startDateTime)
            {
                // Check if the minimum required amount of sheriffs is match
                // const sheriffDuties = duty.sheriffDuties.filter(sd =>
                //     sd.id != sheriffDuty.id &&
                //     doTimeRangesOverlap({ startTime: moment(sd.startDateTime), endTime: moment(sd.endDateTime)},
                //         { startTime: moment(sheriffDuty.startDateTime), endTime: moment(shift.endDateTime) }));
                // if (sheriffDuties.length < (duty.sheriffsRequired | 1))
                // {
                duty.sheriffDuties.push(<any>{ dutyId: duty.id, startDateTime: sheriffDuty.startDateTime, endDateTime: shift.startDateTime });
                //}
                sheriffDuty.startDateTime = shift.startDateTime;
            }

            // if shift ends before the duty then create an assignment for the remaining time
            if (shift.endDateTime < duty.endDateTime)
            {
                // const sheriffDuties = duty.sheriffDuties.filter(sd =>
                //     sd.id != sheriffDuty.id &&
                //     doTimeRangesOverlap({ startTime: moment(sd.startDateTime), endTime: moment(sd.endDateTime)},
                //         { startTime: moment(shift.endDateTime), endTime: moment(sheriffDuty.endDateTime) }));
                // if (sheriffDuties.length < (duty.sheriffsRequired | 1))
                // {
                duty.sheriffDuties.push(<any>{ dutyId: duty.id, startDateTime: shift.endDateTime, endDateTime: sheriffDuty.endDateTime });
                // }
                sheriffDuty.endDateTime = shift.endDateTime;
            }
        }
    }

    return;
};

export const linkSheriff: ThunkAction<AssignmentDuty, void> = (duty: AssignmentDuty) => async (dispatch, getState, extra) => {
    const state = getState();
    const { sheriffDuties = [] } = duty;
    const originalDuty = getAssignmentDuty(duty.id)(state);
    sheriffDuties.forEach((sheriffDuty) => {
        if (sheriffDuty.sheriffId == undefined) {
            return;
        }
        const shifts = getSheriffShiftsForDate(duty.startDateTime, sheriffDuty.sheriffId)(state);
        if (shifts.length == 0) {
            return;
        }
        setAssignmentBasedOnShift(shifts, sheriffDuty, duty, originalDuty);
    });
    return;
};

type IActionMap = {
    'ADMIN_COURTROOMS_SELECT_SECTION': string | undefined;
    'ADMIN_COURTROOMS_SET_PLUGIN_SUBMIT_ERRORS': ErrorMap | undefined;
    'ADMIN_COURTROOMS_SET_PLUGIN_FILTERS': {} | undefined;
};

export type IActionType = keyof IActionMap;

export type IActionPayload<K extends IActionType> = IActionMap[K];

interface IActionObject<K extends IActionType> extends Action {
    type: K;
    payload: IActionPayload<K>;
}

export type IAction = {
    [P in IActionType]: IActionObject<P>
}[IActionType];

function actionCreator<Type extends IActionType>(type: Type) {
    return (payload: IActionPayload<Type>): IActionObject<Type> =>
        ({ type: type, payload: payload });
}

export const selectAdminCourtroomsPluginSection = (sectionName?: string) => (
    actionCreator('ADMIN_COURTROOMS_SELECT_SECTION')(sectionName)
);

export const setAdminCourtroomsPluginSubmitErrors = (errors?: ErrorMap) => (
    actionCreator('ADMIN_COURTROOMS_SET_PLUGIN_SUBMIT_ERRORS')(errors)
);

export const setAdminCourtroomsPluginFilters = (filters: {}) => (
    actionCreator('ADMIN_COURTROOMS_SET_PLUGIN_FILTERS')(filters)
);
