import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    AssignmentModuleState
} from '../common';
import {
    JailRole, IdType
} from '../../../api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';

class JailRoleMapRequest extends GetEntityMapRequest<void, JailRole, AssignmentModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'jailRoleMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let jailRoles = await api.getJailRoles();
        return arrayToMap(jailRoles, j => j.code);
    }
}

export const jailRoleMapRequest = new JailRoleMapRequest();

class CreateOrUpdateJailRolesRequest extends CreateOrUpdateEntitiesRequest<JailRole, AssignmentModuleState>{
    createEntity(entity: Partial<JailRole>, { api }: ThunkExtra): Promise<JailRole> {
        return api.createJailRole(entity);
    }

    updateEntity(entity: JailRole, { api }: ThunkExtra): Promise<JailRole> {
        return api.updateJailRole(entity);
    }

    constructor(config?: RequestConfig<JailRole[]>) {
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
