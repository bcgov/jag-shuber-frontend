import moment from 'moment';
import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as shiftRequests from './requests';
import {
    IdType, Shift, DateType
} from '../../api/Api';
import mapToArray from '../../infrastructure/mapToArray';
import arrayToMap from '../../infrastructure/arrayToMap';

function shiftCompareString(shift: Shift) {
    // We are just using the native string sorting algorithm, the hacky 'z' at the end of this
    // just pushes unassigned shifts below assigned ones
    return (
        `${shift.workSectionId}:${shift.assignmentId}:${shift.startDateTime}${shift.sheriffId ? '' : 'z'}`
    );
}

export const allShifts = createSelector(
    shiftRequests.shiftMapRequest.getData,
    (map) => mapToArray(map)
        .sort((a, b) => shiftCompareString(a).localeCompare(shiftCompareString(b)))
);

export const shiftMap = shiftRequests.shiftMapRequest.getData;

export const getShift = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map = shiftRequests.shiftMapRequest.getData(state);
        return map[id];
    }
    return null;
};

export const UNASSIGNED_SHIFT = 'UNASSIGNED';
export const getSheriffShiftMap = createSelector(
    allShifts,
    (shifts) =>
        arrayToMap(shifts, s => s.sheriffId ? s.sheriffId : UNASSIGNED_SHIFT, true) as { [key: string]: Shift[] }
);

export const getSheriffShifts = (sheriffId?: IdType) => createSelector(
    getSheriffShiftMap,
    (sheriffShiftMap) => sheriffShiftMap[sheriffId ? sheriffId : UNASSIGNED_SHIFT] || []
);

export const getSheriffShiftsForDate = (date: DateType, sheriffId: IdType) => (state: RootState) => {
    const shifts = getSheriffShifts(sheriffId)(state) || [];
    return shifts.filter(s => moment(date).isSame(s.startDateTime, 'day'));
};

export const doesSheriffHaveShift = (date: DateType, sheriffId: IdType) => (state: RootState) => {
    return getSheriffShiftsForDate(date, sheriffId)(state).length > 0;
};
