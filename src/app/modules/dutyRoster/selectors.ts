import { RootState } from '../../store';
import { IdType } from '../../api/Api';
import { createSelector } from 'reselect';
import { allAssignmentDuties } from '../assignments/selectors';
import { DEFAULT_SHERIFF_SORTER, sheriffsForCurrentCourthouse } from '../sheriffs/selectors';
import { doesSheriffHaveShift } from '../shifts/selectors';

export const visibleTime = (state: RootState): { visibleTimeStart: any, visibleTimeEnd: any } => {
    const { visibleTimeStart, visibleTimeEnd } = state.dutyRoster;
    return { visibleTimeStart, visibleTimeEnd };
};

export const draggingSheriff = (state: RootState): IdType | undefined => {
    const { currentDraggingSheriff } = state.dutyRoster;
    return currentDraggingSheriff;
};

export const dutiesForDraggingSheriff = createSelector(
    draggingSheriff,
    allAssignmentDuties,
    (sheriffId, duties = []) => {
        if (sheriffId) {
            return duties.filter(d => d.sheriffDuties.some(sd => sd.sheriffId === sheriffId));
        }
        return [];
    }
);

export const sheriffsOnShift = (state: RootState) => {
    const sheriffs = sheriffsForCurrentCourthouse(state);
    const defaultSorter = DEFAULT_SHERIFF_SORTER(state);
    const { visibleTimeStart } = visibleTime(state);
    return sheriffs.filter(s => doesSheriffHaveShift(visibleTimeStart, s.id)(state))
        .sort(defaultSorter);
};

export const sheriffsOffShift = (state: RootState) => {
    const sheriffs = sheriffsForCurrentCourthouse(state);
    const defaultSorter = DEFAULT_SHERIFF_SORTER(state);
    const { visibleTimeStart } = visibleTime(state);
    return sheriffs.filter(s => !doesSheriffHaveShift(visibleTimeStart, s.id)(state))
        .sort(defaultSorter);
};

// export const dutyRosterSheriffsList = (state: RootState) => {
//     const sheriffs = sheriffsForCurrentCourthouse(state);
//     const defaultSorter = DEFAULT_SHERIFF_SORTER(state);
//     const { visibleTimeStart } = visibleTime(state);

//     const ordered = sheriffs.sort((a, b) => {
//         const aHasShift = doesSheriffHaveShift(visibleTimeStart, a.id)(state);
//         const bHasShift = doesSheriffHaveShift(visibleTimeStart, b.id)(state);
//         // Order sheriffs with shifts above all, but use the default sorting mechanism within each 'sub list'
//         const sortVal = aHasShift === bHasShift ? defaultSorter(a, b) : (aHasShift === true ? -1 : 1);
//         return sortVal;
//     });
//     console.log(ordered.map(s => s.alias));
//     return ordered;
// };
