// import { RootState } from '../../store';
import { createSelector } from 'reselect';
import * as shiftRequests from './requests/shifts';
import {
    Shift,
    ShiftMap
} from '../../api/Api';

export const allShifts = createSelector(
    shiftRequests.shiftMapRequest.getData,
    (map: ShiftMap = {}): Shift[] => {
        const list: Shift[] = Object.keys(map).map((k, i) => map[k]);
        return list;
    }
);