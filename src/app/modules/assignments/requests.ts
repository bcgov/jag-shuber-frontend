import {
    default as RequestAction,
    RequestActionState
} from "../../infrastructure/RequestAction";
import {
    AssignmentMap,
    AssignmentTemplateMap,
    AssignmentDutyMap,
    Assignment,
    AssignmentTemplate
} from "../../api";
import { ThunkExtra } from "../../store";
import arrayToMap from "../../infrastructure/arrayToMap";
import { IdType } from "../../api/Api";

export interface AssignmentModuleState {
    assignmentMap?: RequestActionState<AssignmentMap>;
    createAssignment?: RequestActionState<Assignment>;
    updateAssignment?: RequestActionState<Assignment>;
    templateMap?: RequestActionState<AssignmentTemplateMap>;
    createTemplate?: RequestActionState<AssignmentTemplate>;
    updateTemplate?: RequestActionState<AssignmentTemplate>;
    deleteTemplate?: RequestActionState<void>;
    dutyMap?: RequestActionState<AssignmentDutyMap>;
}
export const STATE_KEY: string = "assignments";

// Assignment Map Request
class AssignmentMapRequest extends RequestAction<void, AssignmentMap, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = "assignmentMap") {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<AssignmentMap> {
        let assignments = await api.getAssignments();
        return arrayToMap(assignments, a => a.id);
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
                data: assignmentMap = {},
                ...restAssignmentMap
            } = {},
            createAssignment: {
                isBusy = false,
                error = undefined
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our assignment to it
        const newMap = { ...assignmentMap };
        newMap[action.payload.id] = action.payload;

        // Merge the state back together with the original in a new object
        const newState: Partial<AssignmentModuleState> = {
            ...restState,
            assignmentMap: {
                ...restAssignmentMap,
                data: newMap
            },
            createAssignment: {
                isBusy,
                error
            }
        }

        return newState;
    }
}

export const createAssignmentRequest = new CreateAssignmentRequest();


// Assignment Update
class UpdateAssignmentRequest extends CreateAssignmentRequest {
    constructor() {
        super(STATE_KEY, "updateAssignment");
    }
}
export const updateAssignmentRequest = new UpdateAssignmentRequest();


// Assignment Link
// todo:



// Assignment Template Map

class AssignmentTemplateMapRequest extends RequestAction<void, AssignmentTemplateMap, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = "templateMap") {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<AssignmentTemplateMap> {
        let templates = await api.getAssignmentTemplates();
        return arrayToMap(templates, t => t.id);
    }
}

export const assignmentTemplateMapRequest = new AssignmentTemplateMapRequest();

// Assignment Template Create
class CreateAssignmentTemplateRequest extends RequestAction<Partial<AssignmentTemplate>, AssignmentTemplate, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = "createTemplate") {
        super(namespace, actionName);
    }
    public async doWork(assignment: Partial<AssignmentTemplate>, { api }: ThunkExtra): Promise<AssignmentTemplate> {
        let newAssignment = await api.createAssignmentTemplate(assignment);
        return newAssignment;
    }

    reduceSuccess(moduleState: AssignmentModuleState, action: { type: string, payload: AssignmentTemplate }): AssignmentModuleState {
        // Call the super's reduce success and pull out our state and
        // the assignmentMap state
        const {
            templateMap: {
                data: templateMap = {},
                ...restMap
            } = {},
            createTemplate: {
                isBusy = false,
                error = undefined
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our assignment to it
        const newMap = { ...templateMap };
        newMap[action.payload.id] = action.payload;

        // Merge the state back together with the original in a new object
        const newState: Partial<AssignmentModuleState> = {
            ...restState,
            templateMap: {
                ...restMap,
                data: newMap
            },
            createTemplate: {
                isBusy,
                error
            }
        }

        return newState;
    }
}

export const createAssignmentTemplateRequest = new CreateAssignmentTemplateRequest();

// Assignment Template Edit
class UpdateAssignmentTemplateRequest extends CreateAssignmentRequest {
    constructor() {
        super(STATE_KEY, "updateTemplate");
    }
}

export const updateAssignmentTemplateRequest = new UpdateAssignmentTemplateRequest();

// Assignment Template Delete
class DeleteAssignmentTemplateRequest extends RequestAction<IdType, void, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = "deleteTemplate") {
        super(namespace, actionName);
    }
    public async  doWork(request: number, {api}: ThunkExtra): Promise<void> {
        await api.deleteAssignmentTemplate(request);
    }
}

export const deleteAssignmentTemplateRequest = new DeleteAssignmentTemplateRequest();