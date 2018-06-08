import * as leaveRequests from './requests';

export const getLeaves = leaveRequests.leaveMapRequest.actionCreator;
export const getLeaveTypes = leaveRequests.leaveTypeMapRequest.actionCreator;
export const getLeaveCancelCodes = leaveRequests.leaveCancelCodeMapRequest.actionCreator;