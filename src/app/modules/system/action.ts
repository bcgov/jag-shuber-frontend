import moment from 'moment';
import { ThunkAction } from '../../store';
import * as TimeUtils from '../../infrastructure/TimeRangeUtils';
import * as genderCodeRequests from './requests/genders';
import * as locationRequests from './requests/locations';
import { getAlternateAssignmentTypes, getJailRoles, getCourtRoles } from '../assignments/actions';
import { getLeaves, getLeaveSubCodes, getLeaveCancelCodes } from '../leaves/actions';
import { getShifts } from '../shifts/actions';
import { getSheriffRankCodes } from '../sheriffs/actions';
import { updateVisibleTime as updateTimelineVisibleTime } from '../dutyRoster/actions';
import { updateVisibleTime as updateScheduleVisibleTime } from '../schedule/actions';
import { updateVisibleTime as updateAssignmentScheduleVisibleTime } from '../assignmentSchedule/actions';

// Gender Codes
export const getGenderCodes = genderCodeRequests.genderCodeMapRequest.actionCreator;

// Locations
export const getLocations = locationRequests.locationMapRequest.actionCreator;

const initialActions: any[] = [
    getAlternateAssignmentTypes,
    getJailRoles,
    getLocations,
    () => updateTimelineVisibleTime(TimeUtils.getDefaultStartTime(), TimeUtils.getDefaultEndTime()),
    () => updateScheduleVisibleTime(moment().startOf('week').add(1, 'day'), moment().endOf('week').subtract(1, 'day')),
    () => updateAssignmentScheduleVisibleTime(moment().startOf('week').add(1, 'day'), moment().endOf('week').subtract(1, 'day')),
    getSheriffRankCodes,
    getShifts,
    getLeaveCancelCodes,
    getLeaveSubCodes,
    getLeaves,
    getCourtRoles,
    getGenderCodes
];
export const initializeApplication: ThunkAction<void> = () => async (dispatch, getState, extra) => {
    initialActions.forEach(actionCreator => dispatch(actionCreator()));
};
