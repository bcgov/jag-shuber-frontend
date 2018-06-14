import RequestAction from '../../../infrastructure/Requests/RequestActionBase';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    ShiftModuleState
} from '../common';
import {
    Shift,
    IdType,
    ShiftCopyOptions,
    ShiftUpdates
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';

// #################
// SHIFT MAP REQUEST
// #################
class ShiftMapRequest extends GetEntityMapRequest<void, Shift, ShiftModuleState> {
    constructor() {
        super(STATE_KEY, 'shiftMap');
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
        super(STATE_KEY, 'createShift', shiftMapRequest);
    }
    public async doWork(shift: Partial<Shift>, { api }: ThunkExtra) {
        let newShift = await api.createShift(shift);
        return newShift;
    }
}

export const createShiftRequest = new CreateShiftRequest();

// #################
// EDIT SHIFT
// #################
class UpdateShiftRequest extends UpdateEntityRequest<Shift, ShiftModuleState> {
    constructor() {
        super(STATE_KEY, 'updateShift', shiftMapRequest);
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
        super(STATE_KEY, 'copyShiftsFromPrevWeek');
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
        super(STATE_KEY, 'updateSelectedShifts');
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
        super(STATE_KEY, 'deleteShift');
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