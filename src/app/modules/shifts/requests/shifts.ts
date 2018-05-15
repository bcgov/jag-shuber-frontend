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
    ShiftMap,
    ShiftCopyOptions
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
    public async doWork(shift: Partial<Shift>, { api }: ThunkExtra): Promise<Shift> {
        let newShift = await api.createShift(shift);
        return newShift;
    }

    reduceSuccess(moduleState: ShiftModuleState, action: { type: string, payload: Shift }): ShiftModuleState {
        // Call the super's reduce success and pull out our state and
        // the shiftMap state
        const {
            shiftMap: {
                data: currentMap = {},
                ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our shift to it
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

class CopyShiftsRequest extends RequestAction<ShiftCopyOptions, Shift[], ShiftModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'copyShiftsFromPrevWeek') {
        super(namespace, actionName);
    }
    public async doWork(copyInstructions: ShiftCopyOptions, { api }: ThunkExtra): Promise<Shift[]> {
        let copiedShifts = await api.copyShifts(copyInstructions);
        return copiedShifts;
    }

    reduceSuccess(moduleState: ShiftModuleState, action: { type: string, payload: Shift[] }): ShiftModuleState {
        // Call the super's reduce success and pull out our state and
        // the shiftMap state
        const {
            shiftMap: {
                data: currentMap = {},
                ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);

        // Create a new map and add our new shifts to it
        const newMap = { ...currentMap };
        action.payload.forEach(shift => {
            newMap[shift.id] = shift;
        });
        
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

export const copyShiftsFromPrevWeek = new CopyShiftsRequest();

// Shift Edit
class UpdateShiftRequest extends CreateShiftRequest {
    constructor(namespace: string = STATE_KEY, actionName: string = 'updateShift') {
        super(namespace, actionName);
    }

    public async doWork(shift: Partial<Shift>, { api }: ThunkExtra): Promise<Shift> {
        let newShift = await api.updateShift(shift);
        return newShift;
    }
}

export const updateShiftRequest = new UpdateShiftRequest();

// Shift Delete
class DeleteShiftRequest extends RequestAction<IdType[], IdType[], ShiftModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'deleteShift') {
        super(namespace, actionName);
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteShift(request);
        return request;
    }

    reduceSuccess(moduleState: ShiftModuleState, action: { type: string, payload: IdType[] }): ShiftModuleState {
        // Call the super's reduce success and pull out our state and
        // the shiftMap state
        const {
            shiftMap: {
                data: currentMap = {},
                ...restMap
            } = {},
            ...restState
        } = super.reduceSuccess(moduleState, action);
 
        // Create a new map and remove the assignment from it
        const newMap = { ...currentMap };
        action.payload.forEach(shiftId => {
            delete newMap[shiftId];
        });
        
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

export const deleteShiftRequest = new DeleteShiftRequest();