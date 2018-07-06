import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    Shift,
    ShiftMap
} from '../../api/Api';

export interface ShiftModuleState {
    shiftMap?: RequestActionState<ShiftMap>;
    createShift?: RequestActionState<Shift>;
    updateShift?: RequestActionState<Shift>;
    deleteShift?: RequestActionState<void>;
}

export const STATE_KEY: string = 'shifts';