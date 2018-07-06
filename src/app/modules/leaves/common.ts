import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    Leave,
    LeaveCancelCode,
    LeaveSubCode,
    MapType

} from '../../api/Api';

export interface LeaveModuleState {
    leaveMap?: RequestActionState<MapType<Leave>>;
    leaveSubCodeMap?: RequestActionState<MapType<LeaveSubCode>>;
    leaveCancelCodeMap?: RequestActionState<MapType<LeaveCancelCode>>;
}

export const STATE_KEY: string = 'leaves';