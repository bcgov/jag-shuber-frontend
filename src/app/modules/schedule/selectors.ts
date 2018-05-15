import { RootState } from '../../store';
import { IdType } from '../../api/Api';

export const visibleTime = (state: RootState): { visibleTimeStart: any, visibleTimeEnd: any } => {
    const { visibleTimeStart, visibleTimeEnd } = state.schedule;
    return { visibleTimeStart, visibleTimeEnd };
};

export const isSelected = (shiftId: IdType) => (state: RootState): boolean => {
    const { selectedShiftIds = [] } = state.schedule;
    return selectedShiftIds.indexOf(shiftId) >= 0;
};

export const selectedShifts = (state: RootState): IdType[] => {
    const { selectedShiftIds = [] } = state.schedule;
    return selectedShiftIds;
};
