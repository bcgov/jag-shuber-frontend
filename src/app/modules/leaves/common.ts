import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
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