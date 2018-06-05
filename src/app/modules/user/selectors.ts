import { RootState } from '../../store';
import api from '../../api/index';
import Client from '../../api/Client';

export const currentCourthouse = (state: RootState): string => {
    const { user: { currentCourthouse: courthouse = '' } = {} } = state;
    return courthouse;
};

export const isCourthouseSet = (): boolean => {
    return (api as Client).isCourthouseSet;
};