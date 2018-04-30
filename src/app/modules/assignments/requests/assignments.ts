import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    IdType,
    AssignmentMap,
    Assignment
} from '../../../api/index';

// Assignment Map
class AssignmentMapRequest extends RequestAction<void, AssignmentMap, AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'assignmentMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<AssignmentMap> {
        let templates = await api.getAssignments();
        return arrayToMap(templates, t => t.id);
    }
}

export const assignmentMapRequest = new AssignmentMapRequest();

// Assignment Create
class CreateAssignmentRequest extends RequestAction<Partial<Assignment>, Assignment, AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'createAssignment', throwOnError: boolean = true) {
        super(namespace, actionName, throwOnError);
    }
    public async doWork(assignment: Partial<Assignment>, { api }: ThunkExtra): Promise<Assignment> {
        let newAssignment = await api.createAssignment(assignment);
        return newAssignment;
    }

    reduceSuccess(
        moduleState: AssignmentModuleState, 
        action: { type: string, payload: Assignment }): AssignmentModuleState {
        // Call the super's reduce success and pull out our state and
        // the assignmentMap state
        const {
            assignmentMap: {
                data: currentMap = {},
            ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our assignment to it
        const newMap = { ...currentMap };
        newMap[action.payload.id] = action.payload;

        // Merge the state back together with the original in a new object
        const newState: Partial<AssignmentModuleState> = {
            ...restState,
            assignmentMap: {
                ...restMap,
                data: newMap
            }
        };
        return newState;
    }
}

export const createAssignmentRequest = new CreateAssignmentRequest();

// Assignment Edit
class UpdateAssignmentRequest extends CreateAssignmentRequest {
    constructor(namespace: string = STATE_KEY, actionName: string = 'updateAssignment') {
        super(namespace, actionName);
    }
    public async doWork(assignment: Partial<Assignment>, { api }: ThunkExtra): Promise<Assignment> {
        let newAssignment = await api.updateAssignment(assignment);
        return newAssignment;
    }

    reduceSuccess(
        moduleState: AssignmentModuleState, 
        action: { type: string, payload: Assignment }): AssignmentModuleState {
        // Call the super's reduce success and pull out our state and
        // the assignmentMap state
        const {
            assignmentMap: {
                data: currentMap = {},
            ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our assignment to it
        const newMap = { ...currentMap };
        newMap[action.payload.id] = action.payload;

        // Merge the state back together with the original in a new object
        const newState: Partial<AssignmentModuleState> = {
            ...restState,
            assignmentMap: {
                ...restMap,
                data: newMap
            }
        };
        return newState;
    }
}

export const updateAssignmentRequest = new UpdateAssignmentRequest();

// Assignment Delete
class DeleteAssignmentRequest extends RequestAction<IdType, IdType, AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'deleteAssignment') {
        super(namespace, actionName);
    }

    public async doWork(assignmentIdToDelete: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteAssignment(assignmentIdToDelete);
        return assignmentIdToDelete;
    }

    reduceSuccess(
        moduleState: AssignmentModuleState, 
        action: { type: string, payload: IdType }): AssignmentModuleState {
        // Call the super's reduce success and pull out our state and
        // the assignmentMap state
        const {
            assignmentMap: {
                data: currentMap = {},
            ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and remove the assignment from it
        const newMap = { ...currentMap };
        delete newMap[action.payload];

        // Merge the state back together with the original in a new object
        const newState: Partial<AssignmentModuleState> = {
            ...restState,
            assignmentMap: {
                ...restMap,
                data: newMap
            }
        };
        return newState;
    }
}

export const deleteAssignmentRequest = new DeleteAssignmentRequest();

class DeleteAssignmentDutyRecurrenceRequest extends RequestAction<IdType, IdType, AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'deleteAssignmentDutyRecurrence') {
        super(namespace, actionName, true);
    }

    public async doWork(request: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteDutyRecurrence(request);
        return request;
    }

    reduceSuccess(
        moduleState: AssignmentModuleState, 
        action: { type: string, payload: IdType }): AssignmentModuleState {
        // Call the super's reduce success and pull out our state and
        // the assignmentMap state
        const {
            assignmentMap: {
                data: currentMap = {},
            ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and remove the assignment duty recurrence from it
        const newMap: AssignmentMap = { ...currentMap };
        let dutyRecurrenceParent: Assignment | undefined  = 
            Object.keys(newMap).map((key) => newMap[key] as Assignment)
            .find(
                a => {
                    if(a.dutyRecurrences) {
                        return a.dutyRecurrences.some(dr => dr.id === action.payload);
                    } else {
                        return false;
                    }
                });
        
        if (dutyRecurrenceParent && dutyRecurrenceParent.dutyRecurrences) {
            const recurrenceIndex = dutyRecurrenceParent.dutyRecurrences.findIndex(dr => dr.id === action.payload);
            dutyRecurrenceParent.dutyRecurrences.splice(recurrenceIndex, 1);

            newMap[dutyRecurrenceParent.id] = dutyRecurrenceParent;
        }
        delete newMap[action.payload];

        // Merge the state back together with the original in a new object
        const newState: Partial<AssignmentModuleState> = {
            ...restState,
            assignmentMap: {
                ...restMap,
                data: newMap
            }
        };
        return newState;
    }
}

export const deleteAssignmentDutyRecurrenceRequest = new DeleteAssignmentDutyRecurrenceRequest();