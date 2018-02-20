import RequestAction from "../../../infrastructure/RequestAction";
import { ThunkExtra } from "../../../store";
import arrayToMap from "../../../infrastructure/arrayToMap";
import {
    STATE_KEY,
    AssignmentModuleState
} from "../common";
import {
    IdType,
    AssignmentMap,
    Assignment
} from "../../../api/index";

// Assignment Map

class AssignmentMapRequest extends RequestAction<void, AssignmentMap, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = "assignmentMap") {
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
    constructor(namespace = STATE_KEY, actionName = "createAssignment") {
        super(namespace, actionName);
    }
    public async doWork(assignment: Partial<Assignment>, { api }: ThunkExtra): Promise<Assignment> {
        let newAssignment = await api.createAssignment(assignment);
        return newAssignment;
    }

    reduceSuccess(moduleState: AssignmentModuleState, action: { type: string, payload: Assignment }): AssignmentModuleState {
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
        }
        return newState;
    }
}

export const createAssignmentRequest = new CreateAssignmentRequest();

// Assignment Edit
class UpdateAssignmentRequest extends CreateAssignmentRequest {
    constructor(namespace = STATE_KEY, actionName = "updateAssignment") {
        super(namespace, actionName);
    }
    public async doWork(assignment: Partial<Assignment>, { api }: ThunkExtra): Promise<Assignment> {
        let newAssignment = await api.updateAssignment(assignment);
        return newAssignment;
    }
}

export const updateAssignmentRequest = new UpdateAssignmentRequest();

// Assignment Delete
class DeleteAssignmentRequest extends RequestAction<IdType, IdType, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = "deleteAssignment") {
        super(namespace, actionName);
    }
    
    public async doWork(assignmentIdToDelete: number, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteAssignment(assignmentIdToDelete);
        return assignmentIdToDelete;
    }

    reduceSuccess(moduleState: AssignmentModuleState, action: { type: string, payload: IdType }): AssignmentModuleState {
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
        }
        return newState;
    }
}

export const deleteAssignmentRequest = new DeleteAssignmentRequest();



