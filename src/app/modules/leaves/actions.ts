import * as leaveRequests from './requests';
import { Action } from 'redux';
import { ErrorMap } from '../sheriffs/common';

export const getLeaves = leaveRequests.leaveMapRequest.actionCreator;
export const createOrUpdateLeaves = leaveRequests.createOrUpdateLeavesRequest.actionCreator;
export const getLeaveSubCodes = leaveRequests.leaveTypeMapRequest.actionCreator;
export const getLeaveCancelCodes = leaveRequests.leaveCancelCodeMapRequest.actionCreator;
export const createOrUpdateLeaveSubCodes = leaveRequests.createOrUpdateLeaveSubCodesRequest.actionCreator;
export const deleteLeaveSubCodes = leaveRequests.deleteLeaveSubCodesRequest.actionCreator;

type IActionMap = {
    'ADMIN_LEAVE_TYPES_SELECT_SECTION': string | undefined;
    'ADMIN_LEAVE_TYPES_SET_PLUGIN_SUBMIT_ERRORS': ErrorMap | undefined;
    'ADMIN_LEAVE_TYPES_SET_PLUGIN_FILTERS': {} | undefined;
    'ADMIN_TRAINING_TYPES_SELECT_SECTION': string | undefined;
    'ADMIN_TRAINING_TYPES_SET_PLUGIN_SUBMIT_ERRORS': ErrorMap | undefined;
    'ADMIN_TRAINING_TYPES_SET_PLUGIN_FILTERS': {} | undefined;
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

export const setAdminLeaveTypesPluginFilters = (filters: {}) => (
    actionCreator('ADMIN_LEAVE_TYPES_SET_PLUGIN_FILTERS')(filters)
);

export const setAdminTrainingTypesPluginFilters = (filters: {}) => (
    actionCreator('ADMIN_TRAINING_TYPES_SET_PLUGIN_FILTERS')(filters)
);
