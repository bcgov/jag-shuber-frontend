import { ThunkExtra } from '../../store';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    LeaveModuleState
} from './common';

import {
    MapType,
    Leave,
    LeaveMap,
    LeaveSubCode,
    LeaveSubCodeMap,
    LeaveCancelCode,
    LeaveCancelCodeMap, IdType,
} from '../../api/Api';

import GetEntityMapRequest from '../../infrastructure/Requests/GetEntityMapRequest';
import RequestAction, { RequestConfig } from '../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import { RoleModuleState } from '../roles/common';
import { roleMapRequest } from '../roles/requests/roles';

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
                    success: (s) => `Created/updated leaves`,
                    error: (err: any) => `Couldn't create/update leaves: ${err.message}`
                },
                ...config
            },
            leaveMapRequest
        );
    }
}

export const createOrUpdateLeavesRequest = new CreateOrUpdateLeavesRequest();

class LeaveTypeMapRequest extends GetEntityMapRequest<void, LeaveSubCode[], LeaveModuleState> {

    constructor(config?: RequestConfig<MapType<LeaveSubCode[]>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'leaveTypeMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<MapType<LeaveSubCode[]>> {
        let leaveTypes = await api.getLeaveSubCodes();
        const leaveTypeMap = leaveTypes.reduce((map, type) => {
            if (!map[type.code]) {
                map[type.code] = [];
            }
            map[type.code].push(type);
            return map;
        }, {} as MapType<LeaveSubCode[]>);

        return leaveTypeMap;
    }
}

export const leaveTypeMapRequest = new LeaveTypeMapRequest();

class LeaveSubCodeMapRequest extends GetEntityMapRequest<void, LeaveSubCode, LeaveModuleState> {
    constructor(config?: RequestConfig<MapType<LeaveSubCode>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'leaveTypeMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<LeaveSubCodeMap> {
        let leaveSubCodes = await api.getLeaveSubCodes();
        return arrayToMap(leaveSubCodes, t => t.subCode);
    }
}

export const leaveSubCodeMapRequest = new LeaveSubCodeMapRequest();

class CreateOrUpdateLeaveSubCodesRequest extends CreateOrUpdateEntitiesRequest<LeaveSubCode, LeaveModuleState>{
    createEntity(entity: Partial<LeaveSubCode>, { api }: ThunkExtra): Promise<LeaveSubCode> {
        return api.createLeaveSubCode(entity);
    }
    updateEntity(entity: Partial<LeaveSubCode>, { api }: ThunkExtra): Promise<LeaveSubCode> {
        return api.updateLeaveSubCode(entity as LeaveSubCode);
    }
    constructor(config?: RequestConfig<LeaveSubCode[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateLeaveSubCodes',
                toasts: {
                    success: (s) => `Created/updated leave sub codes`,
                    error: (err: any) => `Couldn't create/update leave sub codes: ${err.message}`
                },
                ...config
            },
            leaveSubCodeMapRequest
        );
    }
    setRequestData(moduleState: LeaveModuleState, data: LeaveSubCode[]) {
        const newMap = { ...this.mapRequest.getRequestData(moduleState) };
        data.forEach(d => {
            newMap[d.subCode] = { ...d, id: d.subCode };
        });
        return this.mapRequest.setRequestData(moduleState, newMap);
    }
}

export const createOrUpdateLeaveSubCodesRequest = new CreateOrUpdateLeaveSubCodesRequest();

class DeleteLeaveSubCodesRequest extends RequestAction<IdType[], IdType[], LeaveModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteLeaveSubCodes',
            toasts: {
                success: (ids) => `${ids.length} leave sub code(s) deleted`,
                error: (err) => `Problem encountered while deleting sub codes: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteLeaveSubCodes(request);
        return request;
    }

    setRequestData(moduleState: LeaveModuleState, leaveSubCodeIds: IdType[]) {
        const newMap = { ...leaveTypeMapRequest.getRequestData(moduleState) };
        leaveSubCodeIds.forEach(id => delete newMap[id]);
        return leaveTypeMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteLeaveSubCodesRequest = new DeleteLeaveSubCodesRequest();

class ExpireLeaveSubCodesRequest extends RequestAction<IdType[], IdType[], LeaveModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'expireLeaveSubCodes',
            toasts: {
                success: (ids) => `${ids.length} leave sub code(s) expired`,
                error: (err) => `Problem encountered while expiring sub codes: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.expireLeaveSubCodes(request);
        return request;
    }

    setRequestData(moduleState: LeaveModuleState, leaveSubCodeIds: IdType[]) {
        const newMap = { ...leaveSubCodeMapRequest.getRequestData(moduleState) };
        leaveSubCodeIds.forEach(id => newMap[id]);
        return  leaveSubCodeMapRequest.setRequestData(moduleState, newMap);
    }
}

export const expireLeaveSubCodesRequest = new ExpireLeaveSubCodesRequest();

class UnexpireLeaveSubCodesRequest extends RequestAction<IdType[], IdType[], LeaveModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'unexpireLeaveSubCodes',
            toasts: {
                success: (ids) => `${ids.length} leave sub code(s) un-expired`,
                error: (err) => `Problem encountered while un-expiring sub codes: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.unexpireLeaveSubCodes(request);
        return request;
    }

    setRequestData(moduleState: LeaveModuleState, leaveSubCodeIds: IdType[]) {
        const newMap = { ...leaveSubCodeMapRequest.getRequestData(moduleState) };
        leaveSubCodeIds.forEach(id => newMap[id]);
        return  leaveSubCodeMapRequest.setRequestData(moduleState, newMap);
    }
}

export const unexpireLeaveSubCodesRequest = new UnexpireLeaveSubCodesRequest();

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
