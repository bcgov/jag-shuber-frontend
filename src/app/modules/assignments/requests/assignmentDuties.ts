import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    AssignmentDutyMap,
    AssignmentDuty,
    IdType
} from '../../../api/index';

// Get the Map
class AssignmentDutyMapRequest extends RequestAction<void, AssignmentDutyMap, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = 'assignmentDutyMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<AssignmentDutyMap> {
        let templates = await api.getAssignmentDuties();
        return arrayToMap(templates, t => t.id);
    }
}

export const assignmentDutyMapRequest = new AssignmentDutyMapRequest();

// Assignment Template Create
class CreateAssignmentDutyRequest extends
    RequestAction<Partial<AssignmentDuty>, AssignmentDuty, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = 'createAssignmentDuty') {
        super(namespace, actionName);
    }
    public async doWork(assignment: Partial<AssignmentDuty>, { api }: ThunkExtra): Promise<AssignmentDuty> {
        let newAssignment = await api.createAssignmentDuty(assignment);
        return newAssignment;
    }

    reduceSuccess(moduleState: AssignmentModuleState, action: { type: string, payload: AssignmentDuty })
        : AssignmentModuleState {
        // Call the super's reduce success and pull out our state and
        // the assignmentMap state
        const {
            assignmentDutyMap: {
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
            assignmentDutyMap: {
                ...restMap,
                data: newMap
            }
        };

        return newState;
    }
}

export const createAssignmentDutyRequest = new CreateAssignmentDutyRequest();

// Assignment Template Edit
class UpdateAssignmentDutyRequest extends CreateAssignmentDutyRequest {
    constructor(namespace = STATE_KEY, actionName = 'updateAssignmentDuty') {
        super(namespace, actionName);
    }

    public async doWork(assignment: Partial<AssignmentDuty>, { api }: ThunkExtra): Promise<AssignmentDuty> {
        let newAssignment = await api.updateAssignmentDuty(assignment);
        return newAssignment;
    }
}

export const updateAssignmentDutyRequest = new UpdateAssignmentDutyRequest();

// Assignment Template Delete
class DeleteAssignmentDutyRequest extends RequestAction<IdType, void, AssignmentModuleState> {
    constructor(namespace = STATE_KEY, actionName = 'deleteAssignmentDuty') {
        super(namespace, actionName);
    }
    public async  doWork(request: number, { api }: ThunkExtra): Promise<void> {
        await api.deleteAssignmentDuty(request);
    }
}

export const deleteAssignmentDutyRequest = new DeleteAssignmentDutyRequest();