import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    RoleModuleState
} from '../common';
import {
    ApiScopeMap,
    ApiScope,
    MapType
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
// import toTitleCase from '../../infrastructure/toTitleCase';

// Get the Map
class ApiScopeMapRequest extends GetEntityMapRequest<void, ApiScope, RoleModuleState> {
    constructor(config?: RequestConfig<MapType<ApiScope>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'roleMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<ApiScopeMap> {
        let data = await api.getApiScopes();
        return arrayToMap(data, t => t.id);
    }
}

export const apiScopeMapRequest = new ApiScopeMapRequest();

// Create ApiScope
class CreateApiScopeRequest extends CreateEntityRequest<ApiScope, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createApiScope',
                toasts: {
                    success: (s) => (
                        `Success`
                    ),
                    error: (err) => (
                        `Problem encountered while adding new role: ${err ? err.toString() : 'Unknown Error'}`
                    )
                }
            },
            apiScopeMapRequest
        );
    }
    public async doWork(role: Partial<ApiScope>, { api }: ThunkExtra): Promise<ApiScope> {
        let newApiScope = await api.createApiScope(role as ApiScope);
        return newApiScope;
    }
}

export const createApiScopeRequest = new CreateApiScopeRequest();

// ApiScope Edit
class UpdateApiScopeRequest extends UpdateEntityRequest<ApiScope, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateApiScope',
                toasts: {
                    success: (s) => `Success`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating role: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            apiScopeMapRequest
        );
    }
    public async doWork(role: Partial<ApiScope>, { api }: ThunkExtra): Promise<ApiScope> {
        let newApiScope = await api.updateApiScope(role as ApiScope);
        return newApiScope;
    }
}

export const updateApiScopeRequest = new UpdateApiScopeRequest();

class CreateOrUpdateApiScopeRequest extends CreateOrUpdateEntitiesRequest<ApiScope, RoleModuleState>{
    createEntity(entity: Partial<ApiScope>, { api }: ThunkExtra): Promise<ApiScope> {
        return api.createApiScope(entity);
    }
    updateEntity(entity: Partial<ApiScope>, { api }: ThunkExtra): Promise<ApiScope> {
        return api.updateApiScope(entity as ApiScope);
    }
    constructor(config?: RequestConfig<ApiScope[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateApiScope',
                toasts: {
                    error: (err: any) => `Couldn't create/update roles: ${err.message}`
                },
                ...config
            },
            apiScopeMapRequest
        );
    }
}

export const createOrUpdateApiScopeRequest = new CreateOrUpdateApiScopeRequest();
