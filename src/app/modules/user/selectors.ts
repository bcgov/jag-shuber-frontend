import { RootState } from '../../store';
import { createSelector } from 'reselect';

export const currentCourthouse = (state: RootState): string => {
    const { user: { currentCourthouse: courthouse = '' } = {} } = state;
    return courthouse;
};

export const isCourthouseSet = createSelector(
    currentCourthouse,
    (courthouse: string) => {
        // tslint:disable-next-line:triple-equals
        return courthouse != undefined && courthouse !== '';
    }
);