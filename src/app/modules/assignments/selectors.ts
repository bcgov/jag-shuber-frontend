import { createSelector } from 'reselect'
import { RootState } from '../../store';
import * as requests from './requests'
import {
    Assignment,
    AssignmentTemplate
} from '../../api/Api';

// Assignments
export const allAssignments = (state: RootState): Assignment[] => {
    const map = requests.assignmentMapRequest.getData(state) || {};
    const list: Assignment[] = Object.keys(map).map((k, i) => map[k]);
    return list;
}
export const isLoadingAssignments = requests.assignmentMapRequest.getIsBusy;
export const assignmentsError = requests.assignmentMapRequest.getError;


// Assignment Template
export const allAssignmentTemplates = (state: RootState): AssignmentTemplate[] => {
    const map = requests.assignmentTemplateMapRequest.getData(state) || {};
    const list: AssignmentTemplate[] = Object.keys(map).map((k, i) => map[k]);
    return list;
}
export const isLoadingAssignmentTemplates = requests.assignmentTemplateMapRequest.getIsBusy;
export const templatesError = requests.assignmentTemplateMapRequest.getError;

export const getAssignmentTemplate = (id?: number) => (state: RootState) => {
    if (state && id != null) {
        const assignmentTemplates = allAssignmentTemplates(state);
        if (assignmentTemplates) {
            return assignmentTemplates.find((value) => value.id == id);
        }
    }
    return null;
}


// Not Memoized since not sure which id is getting passed in
export const linkedAssignments = (id?: number) => (state: RootState) => {
    // if (id == null) {
    //     return [];
    // }
    // return allAssignments(state).filter(t => t.sheriffIds.indexOf(id) >= 0);
    return [];
}

export const unlinkedAssignments = createSelector(allAssignments,
    assignments => {
        // let ts = assignments ? assignments.filter(t => {
        //     return !t.sheriffIds || t.sheriffIds.length == 0
        // }) : []
        // return ts;
        return [];
    }
)

