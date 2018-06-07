import RequestAction from '../../../infrastructure/Requests/RequestActionBase';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    ShiftModuleState
} from './common';
import {
    Shift,
    IdType,
    ShiftCopyOptions,
    ShiftUpdates
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
import toTitleCase from '../../../infrastructure/toTitleCase';
import { ShiftCreationPayload, ShiftFactory } from '../../../api/utils';

// #################
// SHIFT MAP REQUEST
// #################
class ShiftMapRequest extends GetEntityMapRequest<void, Shift, ShiftModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'shiftMap',
            toasts: {
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while retrieving list of shifts: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let shifts = await api.getShifts();
        return arrayToMap(shifts, t => t.id);
    }
}

export const shiftMapRequest = new ShiftMapRequest();

// #################
// CREATE SHIFT
// #################
class CreateShiftRequest extends CreateEntityRequest<Shift, ShiftModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'createShift',
            toasts: {
                success: (s) => `${toTitleCase(s.workSectionId)} shift(s) created`,
                error: (err) => `Problem encountered while editing shifts: ${err ? err.toString() : 'Unknown Error'}`
            }
        }, shiftMapRequest);
    }
    public async doWork(shift: Partial<Shift>, { api }: ThunkExtra) {
        let newShift = await api.createShift(shift);
        return newShift;
    }
}

export const createShiftRequest = new CreateShiftRequest();

class CreateShiftsRequest extends RequestAction<ShiftCreationPayload, Shift[], ShiftModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'createShifts',
            toasts: {
                // tslint:disable-next-line:max-line-length
                success: (shifts) => `${shifts.length} ${shifts.length === 1 ? 'shift' : 'shifts'} created`,
                error: (err) => `Problem encountered while creating shifts: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: ShiftCreationPayload, { api }: ThunkExtra): Promise<Shift[]> {
        const shiftsToCreate = ShiftFactory.createShifts(request);
        return await Promise.all(shiftsToCreate.map(s => api.createShift(s)));
    }

    setRequestData(moduleState: ShiftModuleState, newShifts: Shift[] = []) {
        const newMap = { ...shiftMapRequest.getRequestData(moduleState) };
        newShifts.forEach(ns => newMap[ns.id] = ns);
        return shiftMapRequest.setRequestData(moduleState, newMap);
    }
}

export const createShiftsRequest = new CreateShiftsRequest();

// #################
// EDIT SHIFT
// #################
class UpdateShiftRequest extends UpdateEntityRequest<Shift, ShiftModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'updateShift',
            toasts: {
                success: undefined,
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered when assigning sheriff to the shift: ${err ? err.toString() : 'Unknown Error'}`
            }
        }, shiftMapRequest);
    }

    public async doWork(shift: Partial<Shift>, { api }: ThunkExtra): Promise<Shift> {
        let newShift = await api.updateShift(shift);
        return newShift;
    }
}

export const updateShiftRequest = new UpdateShiftRequest();

// #################
// COPY SHIFT
// #################
class CopyShiftsRequest extends RequestAction<ShiftCopyOptions, Shift[], ShiftModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'copyShiftsFromPrevWeek',
            toasts: {
                success: 'Shifts Copied',
                error: (err) => `Problem encountered while copying shifts: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(copyInstructions: ShiftCopyOptions, { api }: ThunkExtra): Promise<Shift[]> {
        let copiedShifts = await api.copyShifts(copyInstructions);
        return copiedShifts;
    }

    setRequestData(moduleState: ShiftModuleState, shifts: Shift[]) {
        const newMap = { ...shiftMapRequest.getRequestData(moduleState) };
        shifts.forEach(s => newMap[s.id] = s);
        return shiftMapRequest.setRequestData(moduleState, newMap);
    }
}

export const copyShiftsFromPrevWeek = new CopyShiftsRequest();

// #################
// EDIT MULTIPLE SHIFTS
// #################
type ShiftUpdateOptions = { shiftIds: IdType[], updateDetails: ShiftUpdates };
class UpdateMultipleShiftsRequest extends RequestAction<ShiftUpdateOptions, Shift[], ShiftModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'updateSelectedShifts',
            toasts: {
                success: (s) => `${s.length} shift(s) updated`,
                error: (err) => `Problem encountered while editing shifts: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }

    public async doWork(shiftUpdateDetails: ShiftUpdateOptions, { api }: ThunkExtra): Promise<Shift[]> {
        let updatedShifts =
            await api.updateMultipleShifts(shiftUpdateDetails.shiftIds, shiftUpdateDetails.updateDetails);
        return updatedShifts;
    }

    setRequestData(moduleState: ShiftModuleState, shifts: Shift[]) {
        const newMap = { ...shiftMapRequest.getRequestData(moduleState) };
        shifts.forEach(s => newMap[s.id] = s);
        return shiftMapRequest.setRequestData(moduleState, newMap);
    }
}

export const updateMultipleShiftsRequest = new UpdateMultipleShiftsRequest();

// #################
// DELETE SHIFTS
// #################
class DeleteShiftRequest extends RequestAction<IdType[], IdType[], ShiftModuleState> {

    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteShift',
            toasts: {
                success: (ids) => `${ids.length} shift(s) deleted`,
                error: (err) => `Problem encountered while deleting shifts: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteShift(request);
        return request;
    }

    setRequestData(moduleState: ShiftModuleState, shiftIds: IdType[]) {
        const newMap = { ...shiftMapRequest.getRequestData(moduleState) };
        shiftIds.forEach(id => delete newMap[id]);
        return shiftMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteShiftRequest = new DeleteShiftRequest();