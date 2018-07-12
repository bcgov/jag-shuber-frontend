import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as shiftRequests from './requests';
import {
    IdType
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';

export const allShifts = createSelector(
    shiftRequests.shiftMapRequest.getData,
    (map) => mapToArray(map)
        .sort((a, b) => `${a.workSectionId ? a.workSectionId : ''}:${a.startDateTime}:${a.sheriffId}`
            .localeCompare(`${b.workSectionId ? b.workSectionId : ''}:${b.startDateTime}:${b.sheriffId}`)));

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
