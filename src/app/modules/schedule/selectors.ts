import { RootState } from '../../store';

export const visibleTime = (state: RootState): { visibleTimeStart: any, visibleTimeEnd: any } => {
    const {visibleTimeStart, visibleTimeEnd} = state.schedule;
    return {visibleTimeStart, visibleTimeEnd};
};