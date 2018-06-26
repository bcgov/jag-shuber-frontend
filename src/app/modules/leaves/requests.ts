import { ThunkExtra } from '../../store';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    LeaveModuleState
} from './common';
import {
    LeaveMap,
    LeaveTypeMap,
    LeaveCancelCodeMap,
    Leave,
    MapType,
    LeaveTypeCode,
    LeaveCancelCode
} from '../../api/Api';
import GetEntityMapRequest from '../../infrastructure/Requests/GetEntityMapRequest';
import { RequestConfig } from '../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';

// Get the Map
class LeaveMapRequest extends GetEntityMapRequest<void, Leave, LeaveModuleState> {
    constructor(config?: RequestConfig<MapType<Leave>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'leaveMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<LeaveMap> {
        let leaves = await api.getLeaves();
        return arrayToMap(leaves, t => t.id);
    }
}

export const leaveMapRequest = new LeaveMapRequest();

class CreateOrUpdateLeavesRequest extends CreateOrUpdateEntitiesRequest<Leave, LeaveModuleState>{
    createEntity(entity: Partial<Leave>, { api }: ThunkExtra): Promise<Leave> {
        return api.createLeave(entity);
    }
    updateEntity(entity: Partial<Leave>, { api }: ThunkExtra): Promise<Leave> {
        return api.updateLeave(entity as Leave);
    }
    constructor(config?: RequestConfig<Leave[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateLeaves',
                toasts: {
                    error: (err: any) => `Couldn't create/update leaves: ${err.message}`
                },
                ...config
            },
            leaveMapRequest
        );
    }
}

export const createOrUpdateLeavesRequest = new CreateOrUpdateLeavesRequest();

class LeaveTypeMapRequest extends GetEntityMapRequest<void, LeaveTypeCode, LeaveModuleState> {

    constructor(config?: RequestConfig<MapType<LeaveTypeCode>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'leaveTypeMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<LeaveTypeMap> {
        let leaveTypes = await api.getLeaveTypes();
        return arrayToMap(leaveTypes, l => l.code);
    }
}

export const leaveTypeMapRequest = new LeaveTypeMapRequest();

class LeaveCancelCodeMapRequest extends GetEntityMapRequest<void, LeaveCancelCode, LeaveModuleState> {

    constructor(config?: RequestConfig<MapType<LeaveCancelCode>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'leaveCancelCodeMap',
            ...config
        });
    }

    public async doWork(request: void, { api }: ThunkExtra): Promise<LeaveCancelCodeMap> {
        let leaveCancelCodes = await api.getLeaveCancelCodes();
        return arrayToMap(leaveCancelCodes, l => l.code);
    }
}

export const leaveCancelCodeMapRequest = new LeaveCancelCodeMapRequest();