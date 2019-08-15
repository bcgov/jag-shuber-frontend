import { RootState } from '../../store';
import { IdType, AssignmentScheduleItem, DaysOfWeek, WorkSection } from '../../api/Api';
import * as assignmentRequests from '../assignments/requests/assignments';
import { createSelector } from 'reselect';
import mapToArray from '../../infrastructure/mapToArray';
import moment from 'moment';

function shiftCompareString(assignmentItem: AssignmentScheduleItem) {
    // We are just using the native string sorting algorithm, the hacky 'z' at the end of this
    // just pushes unassigned shifts below assigned ones
    return (
        `${WorkSection.getWorkSectionSortCode(assignmentItem.workSectionId)}:${assignmentItem.assignmentId}`
    );
}

export const visibleTime = (state: RootState): { visibleTimeStart: any, visibleTimeEnd: any } => {
    const { visibleTimeStart, visibleTimeEnd } = state.assignmentSchedule;
    return { visibleTimeStart, visibleTimeEnd };
};

// Assignments
export const allScheduledAssignments = createSelector(
    assignmentRequests.assignmentMapRequest.getData,
    visibleTime,
    (map = {}, visibleTime): AssignmentScheduleItem[] => {
        let assignmentList: AssignmentScheduleItem[] = [];
        mapToArray(map).filter(item =>
            moment(item.startDateTime).utc().diff(moment(visibleTime.visibleTimeStart).utc(), 'days') == 0  &&
            moment(item.endDateTime).utc().diff(moment(visibleTime.visibleTimeEnd).utc(), 'days') == 0            
        ).forEach((item, assignmentIndex) => {

            item.dutyRecurrences!.forEach(recurrence => {
                let startTime = moment(recurrence.startTime, 'HH:mm');
                let endTime = moment(recurrence.endTime, 'HH:mm');
                // Add multiple assignment records based on the weekdays selected for each assignment
                DaysOfWeek.getWeekdayNumbers(recurrence.daysBitmap).forEach((day, dayIndex) => {
                    for(let numSheriffs = 1; numSheriffs <= recurrence.sheriffsRequired; numSheriffs++) {
                        assignmentList.push({
                            assignmentId: item.id,
                            startDateTime: moment(visibleTime.visibleTimeStart).set("weekday", day).set('hour', startTime.get("hour")),
                            endDateTime: moment(visibleTime.visibleTimeStart).set("weekday", day).set('hour', endTime.get("hour")),
                            id: `${item.id}_${assignmentIndex}_${dayIndex}_${numSheriffs}`,
                            locationId: item.locationId,
                            workSectionId: item.workSectionId
                        });
                    }
                })
            })
        })
        return assignmentList.sort((a, b) => shiftCompareString(a).localeCompare(shiftCompareString(b)));
    });

export const isSelected = (id: IdType) => (state: RootState): boolean => {
    const { selectedAssignmentIds = [] } = state.assignmentSchedule;
    return selectedAssignmentIds.indexOf(id) >= 0;
};

export const selectedAssignmentIds = (state: RootState): IdType[] => {
    const { selectedAssignmentIds = [] } = state.assignmentSchedule;
    return selectedAssignmentIds;
};