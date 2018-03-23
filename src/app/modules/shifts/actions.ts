// import * as moment from 'moment';
import * as shiftRequests from './requests/shifts';
import * as leaveRequests from './requests/leaves';
import { getShift } from './selectors';
import { 
    IdType, 
    // DateType, 
    // DaysOfWeek,
    // WorkSectionId,
    // Shift 
} from '../../api';
import { ThunkAction } from '../../store';
import { ShiftCreationPayload } from '../../api/utils';

export const getShifts = shiftRequests.shiftMapRequest.actionCreator;
export const createShift = shiftRequests.createShiftRequest.actionCreator;
export const editShift = shiftRequests.updateShiftRequest.actionCreator;
export const deleteShift = shiftRequests.deleteShiftRequest.actionCreator;

export const getLeaves = leaveRequests.leaveMapRequest.actionCreator;

type SheriffShiftLink = { sheriffId: IdType, shiftId: IdType };
export const linkShift: ThunkAction<SheriffShiftLink> =
    ({ sheriffId, shiftId }: SheriffShiftLink) => (dispatch, getState, extra) => {
        const shift = getShift(shiftId)(getState());
        if (shift == null) {
            return;
        }

        // todo: Warn if shift is already assigned?

        dispatch(editShift({ ...shift, sheriffId }));
    };

export const unlinkShift: ThunkAction<SheriffShiftLink> =
    ({ sheriffId, shiftId }: SheriffShiftLink) => (dispatch, getState, extra) => {
        const shift = getShift(shiftId)(getState());
        if (shift == null) {
            return;
        }

        // todo: Warn if shift is already assigned?

        dispatch(editShift({ ...shift, sheriffId: undefined }));
    };

export const createShifts: ThunkAction<ShiftCreationPayload> =
    ({ weekStart, workSectionId, startTime, endTime, days, repeatNumber }: ShiftCreationPayload) => 
        (dispatch, getState, extra) => {
            // let partialShifts: Partial<Shift>[]; 

            // const startMoment = moment(startTime);
            // const startHour = startMoment.hour();
            // const startMinute = startMoment.minute();
            
            // const endMoment = moment(endTime);
            // const endHour = endMoment.hour();
            // const endMinute = endMoment.minute();
           

        // const shift = getShift(shiftId)(getState());
        // if (shift == null) {
        //     return;
        // }

        
        // dispatch(editShift({ ...shift, sheriffId }));
    };