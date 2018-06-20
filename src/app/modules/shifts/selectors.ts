import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as shiftRequests from './requests/shifts';
import * as leaveRequests from './requests/leaves';
import {
    LeaveMap,
    Leave,
    IdType
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';

export const allShifts = createSelector(
    shiftRequests.shiftMapRequest.getData,
    (map) => {
        const returnVal = mapToArray(map)
        .sort((a, b) => `${a.workSectionId ? a.workSectionId : ''}:${a.startDateTime}`
            .localeCompare(`${b.workSectionId ? b.workSectionId : ''}:${b.startDateTime}`));
        return returnVal;}
);

export const shiftMap = shiftRequests.shiftMapRequest.getData;

export const getShift = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map = shiftRequests.shiftMapRequest.getData(state);
        return map[id];
    }
    return null;
};

export const getSheriffShifts = (sheriffId?: IdType) => (state: RootState) => {
    const shifts = allShifts(state);
    if (sheriffId != null) {
        return shifts.filter(s => s.sheriffId === sheriffId);
    }
    return shifts;
};

export const allLeaves = createSelector(
    leaveRequests.leaveMapRequest.getData,
    (map: LeaveMap = {}): Leave[] => {
        const list: Leave[] = Object.keys(map).map((k, i) => map[k]);
        return list;
    }
);

export const getLeave = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map: LeaveMap = leaveRequests.leaveMapRequest.getData(state);
        return map[id];
    }
    return null;
};

export const getSheriffLeaves = (sheriffId?: IdType) => (state: RootState) => {
    if (state && sheriffId != null) {
        return allLeaves(state).filter(l => l.sheriffId === sheriffId);
    }
    return [];
};