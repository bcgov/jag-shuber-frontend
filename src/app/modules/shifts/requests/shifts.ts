import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    ShiftModuleState
} from '../common';
import {
    Shift,
    IdType,
    ShiftMap
} from '../../../api/Api';

// Get the Map
class ShiftMapRequest extends RequestAction<void, ShiftMap, ShiftModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'shiftMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<ShiftMap> {
        let shifts = await api.getShifts();
        return arrayToMap(shifts, t => t.id);
    }
}

export const shiftMapRequest = new ShiftMapRequest();

// Assignment Template Create
class CreateShiftRequest extends RequestAction<Partial<Shift>, Shift, ShiftModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'createShift') {
        super(namespace, actionName);
    }
    public async doWork(assignment: Partial<Shift>, { api }: ThunkExtra): Promise<Shift> {
        let newAssignment = await api.createShift(assignment);
        return newAssignment;
    }

    reduceSuccess(moduleState: ShiftModuleState, action: { type: string, payload: Shift }): ShiftModuleState {
        // Call the super's reduce success and pull out our state and
        // the assignmentMap state
        const {
            shiftMap: {
                data: currentMap = {},
                ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our assignment to it
        const newMap = { ...currentMap };
        newMap[action.payload.id] = action.payload;

        // Merge the state back together with the original in a new object
        const newState: Partial<ShiftModuleState> = {
            ...restState,
            shiftMap: {
                ...restMap,
                data: newMap
            }
        };

        return newState;
    }
}

export const createShiftRequest = new CreateShiftRequest();

// Assignment Template Edit
class UpdateShiftRequest extends CreateShiftRequest {
    constructor(namespace: string = STATE_KEY, actionName: string = 'updateShift') {
        super(namespace, actionName);
    }

    public async doWork(assignment: Partial<Shift>, { api }: ThunkExtra): Promise<Shift> {
        let newAssignment = await api.updateShift(assignment);
        return newAssignment;
    }
}

export const updateShiftRequest = new UpdateShiftRequest();

// Assignment Template Delete
class DeleteShiftRequest extends RequestAction<IdType, void, ShiftModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'deleteShift') {
        super(namespace, actionName);
    }
    public async doWork(request: number, { api }: ThunkExtra): Promise<void> {
        await api.deleteShift(request);
    }
}

export const deleteShiftRequest = new DeleteShiftRequest();