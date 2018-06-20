import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    ShiftModuleState
} from '../common';
import {
    Leave
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';

// Get the Map
class LeaveMapRequest extends GetEntityMapRequest<void, Leave, ShiftModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'leaveMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let leaves = await api.getLeaves();
        return arrayToMap(leaves, t => t.id);
    }
}

export const leaveMapRequest = new LeaveMapRequest();