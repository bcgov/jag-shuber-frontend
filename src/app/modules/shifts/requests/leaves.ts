import RequestAction from '../../../infrastructure/RequestAction';
import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    ShiftModuleState
} from '../common';
import {
    LeaveMap
} from '../../../api/Api';

// Get the Map
class LeaveMapRequest extends RequestAction<void, LeaveMap, ShiftModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'leaveMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<LeaveMap> {
        let leaves = await api.getLeaves();
        return arrayToMap(leaves, t => t.id);
    }
}

export const leaveMapRequest = new LeaveMapRequest();