import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    RoleModuleState
} from '../common';
import {
    MapType, IdType,
    ApiScopeMap,
    ApiScope
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
// import toTitleCase from '../../infrastructure/toTitleCase';

// Get the Map
class ApiScopeMapRequest extends GetEntityMapRequest<void, ApiScope, RoleModuleState> {
    constructor(config?: RequestConfig<MapType<ApiScope>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'apiScopeMap',
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
                        `Problem encountered while adding new scope: ${err ? err.toString() : 'Unknown Error'}`
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
                    error: (err) => `Problem encountered while updating scope: ${err ? err.toString() : 'Unknown Error'}`
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
                    error: (err: any) => `Couldn't create/update scopes: ${err.message}`
                },
                ...config
            },
            apiScopeMapRequest
        );
    }
}

export const createOrUpdateApiScopeRequest = new CreateOrUpdateApiScopeRequest();

class DeleteApiScopesRequest extends RequestAction<IdType[], IdType[], RoleModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteApiScopes',
            toasts: {
                success: (ids) => `${ids.length} scopes(s) deleted`,
                error: (err) => `Problem encountered while deleting scopes: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteApiScopes(request);
        return request;
    }

    setRequestData(moduleState: RoleModuleState, courtroomIds: IdType[]) {
        const newMap = { ...apiScopeMapRequest.getRequestData(moduleState) };
        courtroomIds.forEach(id => delete newMap[id]);
        return apiScopeMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteApiScopesRequest = new DeleteApiScopesRequest();
