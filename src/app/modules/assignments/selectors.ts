import { createSelector } from 'reselect';
import { RootState } from '../../store';

import { func as selectorFunctions } from '../common';

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
    if (state && id) {
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
    if (state && id) {
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

export const allEffectiveAlternateAssignmentTypes = altAssignmentTypesSelector.effective;

// Alternate / Other Assignment Types
export const getAllOtherTypes = (state: RootState) => {
    if (state) {
        return allAlternateAssignmentTypes(state);
    }
    return undefined;
};

export const getAllEffectiveOtherTypes = (state: RootState) => {
    if (state) {
        return allEffectiveAlternateAssignmentTypes()(state);
    }
    return undefined;
};

export const findAllOtherTypes = (filters: any) => (state: RootState) => {
    if (state) {
        let otherTypes = allAlternateAssignmentTypes(state);
        return selectorFunctions.filterByKeys(otherTypes, filters);
    }
    return undefined;
};

export const findAllEffectiveOtherTypes = (filters: any) => (state: RootState) => {
    if (state) {
        let otherTypes = allEffectiveAlternateAssignmentTypes()(state);
        return selectorFunctions.filterByKeys(otherTypes, filters);
    }
    return undefined;
};

// Court Roles
const courtRoleSelector = new CodeSelector(
    courtRoleRequests.courtRoleMapRequest.getData
);

export const allCourtRoles = courtRoleSelector.all;

export const allEffectiveCourtRoles = courtRoleSelector.effective;

export const getAllCourtRoles = (state: RootState) => {
    if (state) {
        return allCourtRoles(state);
    }
    return undefined;
};

export const getAllEffectiveCourtRoles = (state: RootState) => {
    if (state) {
        return allEffectiveCourtRoles()(state);
    }
    return undefined;
};

export const findAllCourtRoles = (filters: any) => (state: RootState) => {
    if (state) {
        let courtRoles = allCourtRoles(state);
        return selectorFunctions.filterByKeys(courtRoles, filters);
    }
    return undefined;
};

export const findAllEffectiveCourtRoles = (filters: any) => (state: RootState) => {
    if (state) {
        let courtRoles = allEffectiveCourtRoles()(state);
        return selectorFunctions.filterByKeys(courtRoles, filters);
    }
    return undefined;
};

// Courtrooms
const courtroomSelector = new CodeSelector(
    courtroomRequests.courtroomMapRequest.getData
);

export const allCourtrooms = courtroomSelector.all;

export const allEffectiveCourtrooms = courtroomSelector.effective;

export const getAllCourtrooms = (state: RootState) => {
    if (state) {
        return allCourtrooms(state);
            // .sort((a, b) => a.code.localeCompare(b.code));
    }
    return undefined;
};

export const getAllEffectiveCourtrooms = (state: RootState) => {
    if (state) {
        return allEffectiveCourtrooms()(state);
            // .sort((a, b) => a.code.localeCompare(b.code));
    }
    return undefined;
};

export const findAllCourtrooms = (filters: any) => (state: RootState) => {
    if (state) {
        let courtrooms = allCourtrooms(state);
            // .sort((a, b) => a.code.localeCompare(b.code));

        return selectorFunctions.filterByKeys(courtrooms, filters);

    }
    return undefined;
};

// Jail Roles
const jailRoleSelector = new CodeSelector(
    jailRoleRequests.jailRoleMapRequest.getData
);

export const allJailRoles = jailRoleSelector.all;

export const allEffectiveJailRoles = jailRoleSelector.effective;

export const getAllJailRoles = (state: RootState) => {
    if (state) {
        return allJailRoles(state);
    }
    return undefined;
};

export const getAllEffectiveJailRoles = (state: RootState) => {
    if (state) {
        return allEffectiveJailRoles()(state);
    }
    return undefined;
};

export const findAllJailRoles = (filters: any) => (state: RootState) => {
    if (state) {
        let jailRoles = allJailRoles(state);
        return selectorFunctions.filterByKeys(jailRoles, filters);
    }
    return undefined;
};

export const findAllEffectiveJailRoles = (filters: any) => (state: RootState) => {
    if (state) {
        let jailRoles = allEffectiveJailRoles()(state);
        return selectorFunctions.filterByKeys(jailRoles, filters);
    }
    return undefined;
};

// Runs
const allRunSelector = new CodeSelector(
    runRequests.runMapRequest.getData
);

export const allRuns = allRunSelector.all;

export const allEffectiveRuns = allRunSelector.effective;

export const getAllEscortRunTypes = (state: RootState) => {
    if (state) {
        return allRuns(state);
            // .sort((a, b) => a.title.localeCompare(b.title));
    }
    return undefined;
};

export const getAllEffectiveEscortRunTypes = (state: RootState) => {
    if (state) {
        return allEffectiveRuns()(state);
            // .sort((a, b) => a.title.localeCompare(b.title));
    }
    return undefined;
};

export const findAllEscortRunTypes = (filters: any) => (state: RootState) => {
    if (state) {
        let escortRunTypes = allRuns(state);
        return selectorFunctions.filterByKeys(escortRunTypes, filters);
    }
    return undefined;
};

export const findAllEffectiveEscortRunTypes = (filters: any) => (state: RootState) => {
    if (state) {
        let escortRunTypes = allRuns(state);
        return selectorFunctions.filterByKeys(escortRunTypes, filters);
    }
    return undefined;
};
