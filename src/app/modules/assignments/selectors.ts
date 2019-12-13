import { createSelector } from 'reselect';
import { RootState } from '../../store';
import * as assignmentRequests from './requests/assignments';
import * as assignmentDutyRequests from './requests/assignmentDuties';
import * as alternateAssignmentTypeRequests from './requests/alternateAssignmentTypes';
import * as courtRoleRequests from './requests/courtRoles';
import {
    Assignment,
    AssignmentDuty,
    IdType,
    WorkSection
} from '../../api/Api';
import {
    isCourtAssignment,
    isJailAssignment,
    isEscortAssignment,
    isOtherAssignment
} from '../../api/utils';
import * as courtroomRequests from './requests/courtrooms';
import * as jailRoleRequests from './requests/jailRoles';
import * as runRequests from './requests/runs';
import mapToArray from '../../infrastructure/mapToArray';
import { CodeSelector } from '../../infrastructure/CodeSelector';

function assignmentCompareString(assignment: Assignment) {
    // We are just using the native string sorting algorithm, the hacky 'z' at the end of this
    // just pushes unassigned shifts below assigned ones
    return (
        `${WorkSection.getWorkSectionSortCode(assignment.workSectionId)}:${assignment.title}`
    );
}

// Assignments
export const allAssignments = createSelector(
    assignmentRequests.assignmentMapRequest.getData,
    courtroomRequests.courtroomMapRequest.getData,
    jailRoleRequests.jailRoleMapRequest.getData,
    runRequests.runMapRequest.getData,
    alternateAssignmentTypeRequests.alternateAssignmentTypeMapRequest.getData,
    courtRoleRequests.courtRoleMapRequest.getData,
    (map = {}, courtRooms = {}, jailRoles = {}, runs = {}, altAssignmentTypes = {}, courtRoles = {}): Assignment[] => {
        return mapToArray(map)
            .map(a => {
                if (isCourtAssignment(a)) {
                    a.title = a.courtroomId
                        ? (courtRooms[a.courtroomId] ? courtRooms[a.courtroomId].code : 'Courtroom Not Found')
                        : (a.courtRoleId && courtRoles[a.courtRoleId] ? courtRoles[a.courtRoleId].description : 'Court Role Not Found');
                } else if (isJailAssignment(a)) {
                    a.title = jailRoles[a.jailRoleCode] ? jailRoles[a.jailRoleCode].description : 'Jail Role Not Found';
                } else if (isEscortAssignment(a)) {
                    a.title = runs[a.escortRunId] ? runs[a.escortRunId].title : 'Run Not Found';
                } else if (isOtherAssignment(a)) {
                    a.title = altAssignmentTypes[a.otherAssignCode]
                        ? altAssignmentTypes[a.otherAssignCode].description : 'Other Type Not Found';
                }
                return a;
            })
            .sort((a, b) => assignmentCompareString(a).localeCompare(assignmentCompareString(b)));
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

// Alternate Assignment Types
const altAssignmentTypesSelector = new CodeSelector(
    alternateAssignmentTypeRequests.alternateAssignmentTypeMapRequest.getData
);

export const allAlternateAssignmentTypes = altAssignmentTypesSelector.all;

export const allEffectAlternateAssignmentTypes = altAssignmentTypesSelector.effective;

// Court Roles
const courtRoleSelector = new CodeSelector(
    courtRoleRequests.courtRoleMapRequest.getData
);

export const allCourtRoles = courtRoleSelector.all;

export const allEffectiveCourtRoles = courtRoleSelector.effective;

// Courtrooms
export const allCourtrooms = createSelector(
    courtroomRequests.courtroomMapRequest.getData,
    (courtrooms) => mapToArray(courtrooms).sort((a, b) => a.code.localeCompare(b.code))
);

export const getAllCourtrooms = (state: RootState) => {
    if (state) {
        return allCourtrooms(state);
    }
    return undefined;
};

// Jail Roles
const jailRoleSelector = new CodeSelector(
    jailRoleRequests.jailRoleMapRequest.getData
);

export const allJailRoles = jailRoleSelector.all;

export const allEffectiveJailRoles = jailRoleSelector.effective;

// Runs
export const allRuns = createSelector(
    runRequests.runMapRequest.getData,
    (runs) => mapToArray(runs).sort((a, b) => a.title.localeCompare(b.title))
);
