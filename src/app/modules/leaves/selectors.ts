import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as leaveRequests from './requests';
import {
    LeaveMap,
    IdType,
    LEAVE_CODE_PERSONAL,
    LEAVE_CODE_TRAINING
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';
import arrayToMap from '../../infrastructure/arrayToMap';
import moment from 'moment';
import { CodeSelector } from '../../infrastructure/CodeSelector';

export const cancelReasonCodesMap = leaveRequests.leaveCancelCodeMapRequest.getData;

export const allLeaves = createSelector(
    leaveRequests.leaveMapRequest.getData,
    (map) => {
        const leaveMap = mapToArray(map)
            .filter(l => moment(l.startDate).isSameOrAfter(moment().subtract(1, 'year'), 'day'));
        return leaveMap
            .sort((a, b) => `${moment(a.startDate).toISOString()}`
            .localeCompare(`${moment(b.startDate).toISOString()}`));
    }
);

export const getAllPersonaLeaves = (state: RootState) => {
    if (state) {
        return allLeaves(state).filter(l => l.leaveCode === LEAVE_CODE_PERSONAL);
    }
    return undefined;
};

export const getAllTrainingLeaves = (state: RootState) => {
    if (state) {
        return allLeaves(state).filter(l => l.leaveCode === LEAVE_CODE_TRAINING);
    }
    return undefined;
};

export const getLeave = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map: LeaveMap = leaveRequests.leaveMapRequest.getData(state);
        return map[id];
    }
    return undefined;
};

export const getSheriffLeaves = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId != null) {
        return allLeaves(state).filter(l => l.sheriffId === sheriffId);
    }
    return [];
};

export const getPartialDayLeaves = (state: RootState) => {
    if (state != null) {
        return allLeaves(state).filter(l => l.isPartial);
    }
    return [];
};

export const getFullDayLeaves = (state: RootState) => {
    if (state != null) {
        return allLeaves(state).filter(l => !l.isPartial);
    }
    return [];
};

export const getAllSheriffPartialLeaves = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId != null) {
        return getPartialDayLeaves(state).filter(l => l.sheriffId === sheriffId);
    }
    return [];
};

export const getAllSheriffFullDayLeaves = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId != null) {
        return getFullDayLeaves(state).filter(l => l.sheriffId === sheriffId);
    }
    return [];
};

export const getSheriffPartialPersonalLeaves = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId != null) {
        return getPartialDayLeaves(state)
            .filter(l => l.sheriffId === sheriffId)
            .filter(sl => sl.leaveCode === LEAVE_CODE_PERSONAL);
    }
    return [];
};

export const getSheriffFullDayPersonalLeaves = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId != null) {
        return getFullDayLeaves(state)
            .filter(l => l.sheriffId === sheriffId)
            .filter(sl => sl.leaveCode === LEAVE_CODE_PERSONAL);
    }
    return [];
};

export const getSheriffPartialTrainingLeaves = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId != null) {
        return getPartialDayLeaves(state)
            .filter(l => l.sheriffId === sheriffId)
            .filter(sl => sl.leaveCode === LEAVE_CODE_TRAINING);
    }
    return [];
};

export const getSheriffFullDayTrainingLeaves = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId != null) {
        return getFullDayLeaves(state)
            .filter(l => l.sheriffId === sheriffId)
            .filter(sl => sl.leaveCode === LEAVE_CODE_TRAINING);
    }
    return [];
};

export const getActiveSheriffPartialLeaves = (sheriffId?: IdType) => (state: RootState) => {
    return getAllSheriffPartialLeaves(sheriffId)(state).filter(l => l.cancelDate == undefined);
};

export const getActiveSheriffFullDayLeaves = (sheriffId?: IdType) => (state: RootState) => {
    return getAllSheriffFullDayLeaves(sheriffId)(state).filter(l => l.cancelDate == undefined);
};

// Leave Cancel Reason Codes
const leaveCancelCodeSelector = new CodeSelector(
    leaveRequests.leaveCancelCodeMapRequest.getData
);

export const allLeaveCancelCodes = leaveCancelCodeSelector.all;

export const allEffectiveLeaveCancelCodes = leaveCancelCodeSelector.effective;

// Leave Sub Codes
export const allLeavesSubCodeMap = createSelector(
    leaveRequests.leaveTypeMapRequest.getData,
    (leaveTypes) => {
        const allSubCodes = leaveTypes[LEAVE_CODE_PERSONAL].concat(leaveTypes[LEAVE_CODE_TRAINING]);
        return arrayToMap(allSubCodes, lt => lt.subCode);
    }
);

export const getAllPersonalLeaveSubCodes = createSelector(
    leaveRequests.leaveTypeMapRequest.getData,
    (leaveTypes) => {
        return leaveTypes[LEAVE_CODE_PERSONAL].sort((a, b) => `${a.description}`
            .localeCompare(`${b.description}`)) || [];
    }
);

export const getAllTrainingLeaveSubCodes = createSelector(
    leaveRequests.leaveTypeMapRequest.getData,
    (leaveTypes) => {
        return leaveTypes[LEAVE_CODE_TRAINING].sort((a, b) => `${a.description}`
            .localeCompare(`${b.description}`)) || [];
    }
);