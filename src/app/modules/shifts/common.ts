import { RequestActionState } from '../../infrastructure/RequestAction';
import {
    Shift,
    ShiftMap, 
    LeaveMap
} from '../../api/Api';

export interface ShiftModuleState {
    // Shifts
    shiftMap?: RequestActionState<ShiftMap>;
    createShift?: RequestActionState<Shift>;
    updateShift?: RequestActionState<Shift>;
    deleteShift?: RequestActionState<void>;

    // Leaves
    leaveMap?: RequestActionState<LeaveMap>;
}

export const STATE_KEY: string = 'shifts';