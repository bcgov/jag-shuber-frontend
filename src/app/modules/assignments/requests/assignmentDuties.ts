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
    IdType,
    DateRange, 
    DateType,
    AssignmentDutyDetailsMap, 
    AssignmentDutyDetails
} from '../../../api/Api';

// Get the Map
class AssignmentDutyMapRequest extends RequestAction<DateRange, AssignmentDutyMap, AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'assignmentDutyMap') {
        super(namespace, actionName);
    }
    public async doWork(request: DateRange = {}, { api }: ThunkExtra): Promise<AssignmentDutyMap> {
        const { startDate, endDate } = request;
        let templates = await api.getAssignmentDuties(startDate, endDate);
        return arrayToMap(templates, t => t.id);
    }
}

export const assignmentDutyMapRequest = new AssignmentDutyMapRequest();

// Assignment Duty Create
class CreateAssignmentDutyRequest extends
    RequestAction<Partial<AssignmentDuty>, AssignmentDuty, AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'createAssignmentDuty') {
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

// Assignment Duty Edit
class UpdateAssignmentDutyRequest extends CreateAssignmentDutyRequest {
    constructor(namespace: string = STATE_KEY, actionName: string = 'updateAssignmentDuty') {
        super(namespace, actionName);
    }

    public async doWork(assignment: Partial<AssignmentDuty>, { api }: ThunkExtra): Promise<AssignmentDuty> {
        let newAssignment = await api.updateAssignmentDuty(assignment);
        return newAssignment;
    }
}

export const updateAssignmentDutyRequest = new UpdateAssignmentDutyRequest();

// Assignment Duty Delete
class DeleteAssignmentDutyRequest extends RequestAction<IdType, IdType, AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'deleteAssignmentDuty') {
        super(namespace, actionName);
    }
    public async  doWork(request: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteAssignmentDuty(request);
        return request;
    }

    reduceSuccess(moduleState: AssignmentModuleState, action: { type: string, payload: IdType })
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
        delete newMap[action.payload];

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

export const deleteAssignmentDutyRequest = new DeleteAssignmentDutyRequest();

// Create assingment duties
class CreateDefaultDutiesRequest extends RequestAction<DateType, AssignmentDuty[], AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'createDefaultDuties') {
        super(namespace, actionName);
    }
    public async doWork(request: DateType, { api }: ThunkExtra): Promise<AssignmentDuty[]> {
        return await api.createDefaultDuties(request);
    }

    reduceSuccess(moduleState: AssignmentModuleState, action: { type: string, payload: AssignmentDuty[] })
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
        const newDuties = action.payload || []; 
        newDuties.forEach( nd => newMap[nd.id] = nd);

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

export const createDefaultDutiesRequest = new CreateDefaultDutiesRequest();

// Get the Map of Assingment Duty Details
class AssignmentDutyDetailsMapRequest extends RequestAction<void, AssignmentDutyDetailsMap, AssignmentModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'assignmentDutyDetailsMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<AssignmentDutyDetailsMap> {
        let dutyDetails = await api.getAssignmentDutyDetails();
        return arrayToMap(dutyDetails, t => t.id);
    }
}

export const assignmentDutyDetailsMapRequest = new AssignmentDutyDetailsMapRequest();

// Create Assignment Duty Details
class CreateAssignmentDutyDetailsRequest extends 
    RequestAction<Partial<AssignmentDutyDetails>, AssignmentDutyDetails, AssignmentModuleState> {
    
    constructor(
        namespace: string = STATE_KEY, 
        actionName: string = 'createAssignmentDutyDetails', 
        throwOnError: boolean = true) {
            super(namespace, actionName, throwOnError);
    }
    public async doWork(
        assignmentDutyDetails: Partial<AssignmentDutyDetails>, { api }: ThunkExtra): Promise<AssignmentDutyDetails> {
            let newAssignmentDutyDetails = await api.createAssignmentDutyDetails(assignmentDutyDetails);
            return newAssignmentDutyDetails;
    }

    reduceSuccess(
        moduleState: AssignmentModuleState, 
        action: { type: string, payload: AssignmentDutyDetails }): AssignmentModuleState {
        // Call the super's reduce success and pull out our state and
        // the assignmentMap state
        const {
            assignmentDutyDetailsMap: {
                data: currentMap = {},
            ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our assignment duty details to it
        const newMap = { ...currentMap };
        newMap[action.payload.id] = action.payload;

        // Merge the state back together with the original in a new object
        const newState: Partial<AssignmentModuleState> = {
            ...restState,
            assignmentDutyDetailsMap: {
                ...restMap,
                data: newMap
            }
        };
        return newState;
    }
}

export const createAssignmentDutyDetailsRequest = new CreateAssignmentDutyDetailsRequest();

// Assignment Duty Details Edit
class UpdateAssignmentDutyDetailsRequest extends CreateAssignmentDutyDetailsRequest {
    constructor(namespace: string = STATE_KEY, actionName: string = 'updateAssignmentDutyDetails') {
        super(namespace, actionName);
    }

    public async doWork(
        dutyDetails: Partial<AssignmentDutyDetails>, { api }: ThunkExtra): Promise<AssignmentDutyDetails> {
            let updatedDutyDetails = await api.updateAssignmentDutyDetails(dutyDetails);
            return updatedDutyDetails;
    }
}

export const updateAssignmentDutyDetialsRequest = new UpdateAssignmentDutyDetailsRequest();
