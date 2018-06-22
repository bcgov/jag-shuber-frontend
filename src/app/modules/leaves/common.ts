import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    Leave,
    LeaveCancelCode,
    LeaveTypeCode,
    MapType

} from '../../api/Api';

export interface LeaveModuleState {
    leaveMap?: RequestActionState<MapType<Leave>>;
    leaveTypeMap?: RequestActionState<MapType<LeaveTypeCode>>;
    leaveCancelCodeMap?: RequestActionState<MapType<LeaveCancelCode>>;
}

export const STATE_KEY: string = 'leaves';