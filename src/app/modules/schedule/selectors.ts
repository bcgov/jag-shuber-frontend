import { RootState } from '../../store';
import * as moment from 'moment';
import { IdType, ShiftMap, Shift } from '../../api/Api';
import { createSelector } from 'reselect';
import { shiftMap } from '../shifts/selectors';
import { 
    allSame, 
    anySame 
} from '../../infrastructure/arrayUtils';

export const publishViewVisibleWeek = (state: RootState): any => {
    const { publishViewWeekStart } = state.schedule;
    return publishViewWeekStart;
};

export const visibleTime = (state: RootState): { visibleTimeStart: any, visibleTimeEnd: any } => {
    const { visibleTimeStart, visibleTimeEnd } = state.schedule;
    return { visibleTimeStart, visibleTimeEnd };
};

export const isSelected = (shiftId: IdType) => (state: RootState): boolean => {
    const { selectedShiftIds = [] } = state.schedule;
    return selectedShiftIds.indexOf(shiftId) >= 0;
};

export const selectedShiftIds = (state: RootState): IdType[] => {
    const { selectedShiftIds = [] } = state.schedule;
    return selectedShiftIds;
};

export const selectedShifts = createSelector(
    selectedShiftIds,
    shiftMap,
    (selectedIds: IdType[] = [], shifts: ShiftMap = {}) => {
        const shiftList =  selectedIds.map(id => shifts[id]);
        return shiftList;
    }
);

export const anySelectedShiftsOnSameDay = createSelector(
    selectedShifts,
    (shifts: Shift[] = []) => {
        return shifts.length > 1 && anySame(
            shifts.map(shift => moment(shift.startDateTime)), 
            (currentMoment, compareMoment) => currentMoment.isSame(compareMoment, 'day')
        );
    }
);

export const selectedShiftsWorkSectionId = (variedValue: string = 'varied') => createSelector(
    selectedShifts,
    (shifts: Shift[] = []) => {
        const allSameWorkSections: boolean = allSame(
            shifts.map(shift => shift.workSectionId), 
            (compareWorkSectionId, currentWorkSectionId) => currentWorkSectionId === compareWorkSectionId
        );

        if (allSameWorkSections && shifts.length > 0) {
            return shifts[0].workSectionId;
        } else {
            return variedValue;
        }
        
    }
);

export const selectedShiftsAssignedSheriffs = (variedValue: string = 'varied') => createSelector(
    selectedShifts,
    (shifts: Shift[] = []) => {
        const allSameSheriffs: boolean = allSame(
            shifts.map(shift => shift.sheriffId), 
            (compareSheriffId, currentSheriffId) => currentSheriffId === compareSheriffId
        );

        if (allSameSheriffs && shifts.length > 0) {
            return shifts[0].sheriffId;
        } else {
            return variedValue;
        }
        
    }
);

export const selectedShiftsStartTimes = (variedValue: string | null = null) => createSelector(
    selectedShifts,
    (shifts: Shift[] = []) => {
        const allSameStartTimes: boolean = allSame(
            shifts.map(shift => moment(shift.startDateTime).format('HH:mm')), 
            (compareStartTime, currentStartTime) => currentStartTime === compareStartTime
        );

        if (allSameStartTimes && shifts.length > 0) {
            return moment(shifts[0].startDateTime).toISOString();
        } else {
            return variedValue;
        }
        
    }
);

export const selectedShiftsEndTimes = (variedValue: string | null = null) => createSelector(
    selectedShifts,
    (shifts: Shift[] = []) => {
        const allSameEndTimes: boolean = allSame(
            shifts.map(shift => moment(shift.endDateTime).format('HH:mm')), 
            (compareEndTime, currentEndTime) => currentEndTime === compareEndTime
        );

        if (allSameEndTimes && shifts.length > 0) {
            return moment(shifts[0].endDateTime).toISOString();
        } else {
            return variedValue;
        }
        
    }
);

export const isShowWorkSections = (state: RootState): boolean => {
    const { showWorkSections = true } = state.schedule;
    return showWorkSections;
};