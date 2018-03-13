import * as shiftRequests from './requests/shifts';

export const getShifts = shiftRequests.shiftMapRequest.actionCreator;
export const createShift = shiftRequests.createShiftRequest.actionCreator;
export const editShift = shiftRequests.updateShiftRequest.actionCreator;
export const deleteShift = shiftRequests.deleteShiftRequest.actionCreator;