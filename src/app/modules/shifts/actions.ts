import * as shiftRequests from './requests/shifts';
import * as leaveRequests from './requests/leaves';
import { getShift } from './selectors';
import { IdType } from '../../api';
import { ThunkAction } from '../../store';

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