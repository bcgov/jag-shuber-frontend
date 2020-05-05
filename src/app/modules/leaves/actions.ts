import * as leaveRequests from './requests';
import { Action } from 'redux';
import { ErrorMap } from '../sheriffs/common';

export const getLeaves = leaveRequests.leaveMapRequest.actionCreator;
export const createOrUpdateLeaves = leaveRequests.createOrUpdateLeavesRequest.actionCreator;
export const getLeaveSubCodes = leaveRequests.leaveTypeMapRequest.actionCreator;
export const getLeaveCancelCodes = leaveRequests.leaveCancelCodeMapRequest.actionCreator;
export const createOrUpdateLeaveSubCodes = leaveRequests.createOrUpdateLeaveSubCodesRequest.actionCreator;
export const deleteLeaveSubCodes = leaveRequests.deleteLeaveSubCodesRequest.actionCreator;
export const expireLeaveSubCodes = leaveRequests.expireLeaveSubCodesRequest.actionCreator;
export const unexpireLeaveSubCodes = leaveRequests.unexpireLeaveSubCodesRequest.actionCreator;

type IActionMap = {
    'ADMIN_LEAVE_TYPES_SELECT_SECTION': string | undefined;
    'ADMIN_LEAVE_TYPES_SET_SUBMIT_ERRORS': ErrorMap | undefined;
    'ADMIN_LEAVE_TYPES_SET_FILTERS': {} | undefined;
    'ADMIN_TRAINING_TYPES_SELECT_SECTION': string | undefined;
    'ADMIN_TRAINING_TYPES_SET_SUBMIT_ERRORS': ErrorMap | undefined;
    'ADMIN_TRAINING_TYPES_SET_FILTERS': {} | undefined;
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

export const selectAdminLeaveTypesPluginSection = (sectionName?: string) => (
    actionCreator('ADMIN_LEAVE_TYPES_SELECT_SECTION')(sectionName)
);

export const setAdminLeaveTypesPluginSubmitErrors = (errors?: ErrorMap) => (
    actionCreator('ADMIN_LEAVE_TYPES_SET_SUBMIT_ERRORS')(errors)
);

export const setAdminLeaveTypesPluginFilters = (filters: {}) => (
    actionCreator('ADMIN_LEAVE_TYPES_SET_FILTERS')(filters)
);

export const selectAdminTrainingTypesPluginSection = (sectionName?: string) => (
    actionCreator('ADMIN_TRAINING_TYPES_SELECT_SECTION')(sectionName)
);

export const setAdminTrainingTypesPluginSubmitErrors = (errors?: ErrorMap) => (
    actionCreator('ADMIN_TRAINING_TYPES_SET_SUBMIT_ERRORS')(errors)
);

export const setAdminTrainingTypesPluginFilters = (filters: {}) => {
    return (
        actionCreator('ADMIN_TRAINING_TYPES_SET_FILTERS')(filters)
    );
}
