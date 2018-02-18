import RequestAction from "../../../infrastructure/RequestAction";
import { ThunkExtra } from "../../../store";
import arrayToMap from "../../../infrastructure/arrayToMap";
import {
    STATE_KEY,
    AssignmentModuleState
} from "../common";
import {
    IdType,
    AssignmentTemplateMap,
    AssignmentTemplate
} from "../../../api/index";

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
            }
        }
        return newState;
    }
}

export const createAssignmentTemplateRequest = new CreateAssignmentTemplateRequest();

// Assignment Template Edit
class UpdateAssignmentTemplateRequest extends CreateAssignmentTemplateRequest {
    constructor(namespace = STATE_KEY, actionName = "updateTemplate") {
        super(namespace, actionName);
    }
    public async doWork(assignment: Partial<AssignmentTemplate>, { api }: ThunkExtra): Promise<AssignmentTemplate> {
        let newAssignment = await api.updateAssignmentTemplate(assignment);
        return newAssignment;
    }
}

export const updateAssignmentTemplateRequest = new UpdateAssignmentTemplateRequest();

// Assignment Template Delete
class DeleteAssignmentTemplateRequest extends RequestAction<IdType, void, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = "deleteTemplate") {
        super(namespace, actionName);
    }
    public async  doWork(request: number, { api }: ThunkExtra): Promise<void> {
        await api.deleteAssignmentTemplate(request);
    }
}

export const deleteAssignmentTemplateRequest = new DeleteAssignmentTemplateRequest();



