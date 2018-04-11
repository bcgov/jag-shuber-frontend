import { createSelector } from 'reselect';
import { RootState } from '../../store';
import * as assignmentRequests from './requests/assignments';
import * as assignmentDutyRequests from './requests/assignmentDuties';
import {
    Assignment,
    AssignmentDuty,
    IdType,
    AssignmentMap
} from '../../api/Api';
import { AssignmentDutyMap } from '../../api';

// Assignments
export const allAssignments = createSelector(
    assignmentRequests.assignmentMapRequest.getData,
    (map: AssignmentMap = {}): Assignment[] => { 
            const list: Assignment[] = Object.keys(map).map((k, i) => map[k]);
            return list;
        });
export const isLoadingAssignments = assignmentRequests.assignmentMapRequest.getIsBusy;
export const assignmentsError = assignmentRequests.assignmentMapRequest.getError;

export const getAssignment = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map = assignmentRequests.assignmentMapRequest.getData(state) as Assignment;
        return map[id];
    }
    return null;
};

// Assignment Duties
export const allAssignmentDuties = createSelector(
    assignmentDutyRequests.assignmentDutyMapRequest.getData,
    (map: AssignmentDutyMap = {}): AssignmentDuty[] => {
        const list: AssignmentDuty[] = Object.keys(map).map((k, i) => map[k]);
        return list;
    });
export const isLoadingAssignmentDuties = assignmentDutyRequests.assignmentDutyMapRequest.getIsBusy;
export const assignmentDutiesError = assignmentDutyRequests.assignmentDutyMapRequest.getError;

export const getAssignmentDuty = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map: AssignmentDutyMap = assignmentDutyRequests.assignmentDutyMapRequest.getData(state);
        return map[id] as AssignmentDuty;
    }
    return undefined;
};
