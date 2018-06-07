import { RequestActionState } from '../../infrastructure/RequestAction';
import {
    Leave,
    LeaveMap
} from '../../api/Api';

export interface LeaveModuleState {
    leaveMap?: RequestActionState<LeaveMap>;
    createLeave?: RequestActionState<Leave>;
    updateLeave?: RequestActionState<Leave>;
}

export const STATE_KEY: string = 'leaves';