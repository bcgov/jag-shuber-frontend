import RequestAction from '../../infrastructure/RequestAction';
import { ThunkExtra } from '../../store';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    LeaveModuleState
} from './common';
import {
    LeaveMap,
    LeaveTypeMap,
    LeaveCancelCodeMap
} from '../../api/Api';

// Get the Map
class LeaveMapRequest extends RequestAction<void, LeaveMap, LeaveModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'leaveMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<LeaveMap> {
        let leaves = await api.getLeaves();
        return arrayToMap(leaves, t => t.id);
    }
}

export const leaveMapRequest = new LeaveMapRequest();

class LeaveTypeMapRequest extends RequestAction<void, LeaveTypeMap, LeaveModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'leaveTypeMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<LeaveTypeMap> {
        let leaveTypes = await api.getLeaveTypes();
        return arrayToMap(leaveTypes, l => l.code);
    }
}

export const leaveTypeMapRequest = new LeaveTypeMapRequest();

class LeaveCancelCodeMapRequest extends RequestAction<void, LeaveCancelCodeMap, LeaveModuleState> {
    constructor(namespace: string = STATE_KEY, actionName: string = 'leaveCancelCodeMap') {
        super(namespace, actionName);
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<LeaveCancelCodeMap> {
        let leaveCancelCodes = await api.getLeaveCancelCodes();
        return arrayToMap(leaveCancelCodes, l => l.code);
    }
}

export const leaveCancelCodeMapRequest = new LeaveCancelCodeMapRequest();