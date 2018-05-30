import { createSelector } from 'reselect';
import { RootState } from '../../store';
import * as assignmentRequests from './requests/assignments';
import * as assignmentDutyRequests from './requests/assignmentDuties';
import {
    Assignment,
    AssignmentDuty,
    IdType
} from '../../api/Api';
import {
    AssignmentDutyDetails
} from '../../api';
import {
    isCourtAssignment,
    isJailAssignment,
    isEscortAssignment,
    isOtherAssignment
} from '../../api/utils';
import { courtroomMapRequest } from '../courthouse/requests/courtrooms';
import { jailRoleMapRequest } from '../courthouse/requests/jailRoles';
import { runMapRequest } from '../courthouse/requests/runs';
import { alternateAssignmentTypeMapRequest } from '../courthouse/requests/alternateAssignmentTypes';
import mapToArray from '../../infrastructure/mapToArray';

// Assignments
export const allAssignments = createSelector(
    assignmentRequests.assignmentMapRequest.getData,
    courtroomMapRequest.getData,
    jailRoleMapRequest.getData,
    runMapRequest.getData,
    alternateAssignmentTypeMapRequest.getData,
    (map = {}, courtRooms = {}, jailRoles = {}, runs = {}, altAssignmentTypes = {}): Assignment[] => {
        return mapToArray(map)
            .map(a => {
                if (isCourtAssignment(a)) {
                    a.title = courtRooms[a.courtroomId] ? courtRooms[a.courtroomId].name : 'Courtroom Not Found';
                } else if (isJailAssignment(a)) {
                    a.title = jailRoles[a.jailRoleCode] ? jailRoles[a.jailRoleCode].description : 'Jail Role Not Found';
                } else if (isEscortAssignment(a)) {
                    a.title = runs[a.runId] ? runs[a.runId].title : 'Run Not Found';
                } else if (isOtherAssignment(a)) {
                    a.title = altAssignmentTypes[a.otherAssignCode]
                        ? altAssignmentTypes[a.otherAssignCode].description : 'Other Type Not Found';
                }
                return a;
            })
            .sort((a, b) => `${a.workSectionId}:${a.title}`.localeCompare(`${b.workSectionId}:${b.title}`));
    });
export const isLoadingAssignments = assignmentRequests.assignmentMapRequest.getIsBusy;
export const assignmentsError = assignmentRequests.assignmentMapRequest.getError;

export const getAssignment = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map = assignmentRequests.assignmentMapRequest.getData(state);
        return map[id];
    }
    return undefined;
};

// Assignment Duties
export const allAssignmentDuties = createSelector(
    assignmentDutyRequests.assignmentDutyMapRequest.getData,
    (map = {}): AssignmentDuty[] => {
        const list: AssignmentDuty[] = Object.keys(map).map((k, i) => map[k]);
        return list;
    });
export const isLoadingAssignmentDuties = assignmentDutyRequests.assignmentDutyMapRequest.getIsBusy;
export const assignmentDutiesError = assignmentDutyRequests.assignmentDutyMapRequest.getError;

export const getAssignmentDuty = (id?: IdType) => (state: RootState) => {
    if (state && id != null) {
        const map = assignmentDutyRequests.assignmentDutyMapRequest.getData(state);
        return map[id] as AssignmentDuty;
    }
    return undefined;
};

// Assignment Duty Details
export const allAssignmentDutyDetails = createSelector(
    assignmentDutyRequests.assignmentDutyDetailsMapRequest.getData,
    (map = {}): AssignmentDutyDetails[] => {
        const list = Object.keys(map).map((k, i) => map[k]);
        return list;
    });

export const getAssignmentDutyDetailsByDutyId = (assignmentDutyId?: IdType) => (state: RootState) => {
    if (state && assignmentDutyId != null) {
        const map = assignmentDutyRequests.assignmentDutyDetailsMapRequest.getData(state);
        const dutyDetails: AssignmentDutyDetails | undefined
            = Object.keys(map).map(k => map[k]).find(dd => dd.assignmentDutyId === assignmentDutyId);
        if (dutyDetails) {
            return map[dutyDetails.id];
        } else {
            return undefined;
        }
    }
    return undefined;
};