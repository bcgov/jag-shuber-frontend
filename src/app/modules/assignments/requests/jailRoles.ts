import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    JailRoleCode, IdType
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';

class JailRoleMapRequest extends GetEntityMapRequest<void, JailRoleCode, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'jailRoleMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let jailRoles = await api.getJailRoles();
        return arrayToMap(jailRoles, j => j.id);
    }
}

export const jailRoleMapRequest = new JailRoleMapRequest();

class CreateOrUpdateJailRolesRequest extends CreateOrUpdateEntitiesRequest<JailRoleCode, AssignmentModuleState>{
    createEntity(entity: Partial<JailRoleCode>, { api }: ThunkExtra): Promise<JailRoleCode> {
        return api.createJailRole(entity);
    }

    updateEntity(entity: JailRoleCode, { api }: ThunkExtra): Promise<JailRoleCode> {
        return api.updateJailRole(entity);
    }

    constructor(config?: RequestConfig<JailRoleCode[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateJailRoles',
                toasts: {
                    success: (s) => `Created/updated jail roles`,
                    error: (err: any) => `Couldn't create/update jail roles: ${err.message}`
                },
                ...config
            },
            jailRoleMapRequest
        );
    }
}

export const createOrUpdateJailRolesRequest = new CreateOrUpdateJailRolesRequest();

class ExpireJailRolesRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'expireJailRoles',
            toasts: {
                success: (ids) => `${ids.length} jail role(s) expired`,
                error: (err) => `Problem encountered while expiring jail roles: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.expireJailRoles(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, jailRoleIds: IdType[]) {
        const newMap = { ...jailRoleMapRequest.getRequestData(moduleState) };
        jailRoleIds.forEach(id => delete newMap[id]);
        return jailRoleMapRequest.setRequestData(moduleState, newMap);
    }
}

export const expireJailRolesRequest = new ExpireJailRolesRequest();

class DeleteJailRolesRequest extends RequestAction<IdType[], IdType[], AssignmentModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteJailRoles',
            toasts: {
                success: (ids) => `${ids.length} jail role(s) deleted`,
                error: (err) => `Problem encountered while deleting jail roles: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteJailRoles(request);
        return request;
    }

    setRequestData(moduleState: AssignmentModuleState, jailRoleIds: IdType[]) {
        const newMap = { ...jailRoleMapRequest.getRequestData(moduleState) };
        jailRoleIds.forEach(id => delete newMap[id]);
        return jailRoleMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteJailRolesRequest = new DeleteJailRolesRequest();
