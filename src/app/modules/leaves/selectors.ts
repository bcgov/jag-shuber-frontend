import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as leaveRequests from './requests';
import {
    LeaveMap,
    Leave,
    IdType
} from '../../api/Api';

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