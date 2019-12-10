import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    RoleModuleState
} from '../common';
import {
    RoleFrontendScopeMap,
    RoleFrontendScope,
    MapType
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
// import toTitleCase from '../../infrastructure/toTitleCase';

// Get the Map
class RoleFrontendScopeMapRequest extends GetEntityMapRequest<void, RoleFrontendScope, RoleModuleState> {
    constructor(config?: RequestConfig<MapType<RoleFrontendScope>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'roleMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<RoleFrontendScopeMap> {
        let data = await api.getRoleFrontendScopes();
        return arrayToMap(data, t => t.id);
    }
}

export const roleFrontendScopeMapRequest = new RoleFrontendScopeMapRequest();

// Create RoleFrontendScope
class CreateRoleFrontendScopeRequest extends CreateEntityRequest<RoleFrontendScope, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createRoleFrontendScope',
                toasts: {
                    success: (s) => (
                        `Success`
                    ),
                    error: (err) => (
                        `Problem encountered while adding new role: ${err ? err.toString() : 'Unknown Error'}`
                    )
                }
            },
            roleFrontendScopeMapRequest
        );
    }
    public async doWork(role: Partial<RoleFrontendScope>, { api }: ThunkExtra): Promise<RoleFrontendScope> {
        let newRoleFrontendScope = await api.createRoleFrontendScope(role as RoleFrontendScope);
        return newRoleFrontendScope;
    }
}

export const createRoleFrontendScopeRequest = new CreateRoleFrontendScopeRequest();

// RoleFrontendScope Edit
class UpdateRoleFrontendScopeRequest extends UpdateEntityRequest<RoleFrontendScope, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateRoleFrontendScope',
                toasts: {
                    success: (s) => `Success`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating role: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            roleFrontendScopeMapRequest
        );
    }
    public async doWork(role: Partial<RoleFrontendScope>, { api }: ThunkExtra): Promise<RoleFrontendScope> {
        let newRoleFrontendScope = await api.updateRoleFrontendScope(role as RoleFrontendScope);
        return newRoleFrontendScope;
    }
}

export const updateRoleFrontendScopeRequest = new UpdateRoleFrontendScopeRequest();

class CreateOrUpdateRoleFrontendScopeRequest extends CreateOrUpdateEntitiesRequest<RoleFrontendScope, RoleModuleState>{
    createEntity(entity: Partial<RoleFrontendScope>, { api }: ThunkExtra): Promise<RoleFrontendScope> {
        return api.createRoleFrontendScope(entity);
    }
    updateEntity(entity: Partial<RoleFrontendScope>, { api }: ThunkExtra): Promise<RoleFrontendScope> {
        return api.updateRoleFrontendScope(entity as RoleFrontendScope);
    }
    constructor(config?: RequestConfig<RoleFrontendScope[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateRoleFrontendScope',
                toasts: {
                    error: (err: any) => `Couldn't create/update roles: ${err.message}`
                },
                ...config
            },
            roleFrontendScopeMapRequest
        );
    }
}

export const createOrUpdateRoleFrontendScopeRequest = new CreateOrUpdateRoleFrontendScopeRequest();
