import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    Leave,
    LeaveCancelCode,
    LeaveSubCode,
    MapType

} from '../../api/Api';
import { ErrorMap } from '../roles/common';

export interface LeaveModuleState {
    leaveMap?: RequestActionState<MapType<Leave>>;
    leaveSubCodeMap?: RequestActionState<MapType<LeaveSubCode>>;
    leaveCancelCodeMap?: RequestActionState<MapType<LeaveCancelCode>>;

    selectedSection?: string;
    pluginSubmitErrors?: ErrorMap;
    pluginFilters?: {}; // TODO: We could type this a bit better...
}

export const STATE_KEY: string = 'leaves';
