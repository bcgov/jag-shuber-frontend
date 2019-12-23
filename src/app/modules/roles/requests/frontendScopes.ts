import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    RoleModuleState
} from '../common';
import {
    FrontendScopeMap,
    FrontendScope,
    MapType, IdType
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';

// import toTitleCase from '../../infrastructure/toTitleCase';

// Get the Map
class FrontendScopeMapRequest extends GetEntityMapRequest<void, FrontendScope, RoleModuleState> {
    constructor(config?: RequestConfig<MapType<FrontendScope>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'frontendScopeMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<FrontendScopeMap> {
        let data = await api.getFrontendScopes();
        return arrayToMap(data, t => t.id);
    }
}

export const frontendScopeMapRequest = new FrontendScopeMapRequest();

// Create FrontendScope
class CreateFrontendScopeRequest extends CreateEntityRequest<FrontendScope, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createFrontendScope',
                toasts: {
                    success: (s) => `Successfully created the ${s.scopeName} frontend scope`,
                    error: (err) => (`Problem encountered while adding new frontend scope: ${err ? err.toString() : 'Unknown Error'}`)
                }
            },
            frontendScopeMapRequest
        );
    }
    public async doWork(role: Partial<FrontendScope>, { api }: ThunkExtra): Promise<FrontendScope> {
        let newFrontendScope = await api.createFrontendScope(role as FrontendScope);
        return newFrontendScope;
    }
}

export const createFrontendScopeRequest = new CreateFrontendScopeRequest();

// FrontendScope Edit
class UpdateFrontendScopeRequest extends UpdateEntityRequest<FrontendScope, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateFrontendScope',
                toasts: {
                    success: (s) => (`Successfully updated the ${s.scopeName} frontend scope`),
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating frontend scope: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            frontendScopeMapRequest
        );
    }
    public async doWork(role: Partial<FrontendScope>, { api }: ThunkExtra): Promise<FrontendScope> {
        let newFrontendScope = await api.updateFrontendScope(role as FrontendScope);
        return newFrontendScope;
    }
}

export const updateFrontendScopeRequest = new UpdateFrontendScopeRequest();

class CreateOrUpdateFrontendScopeRequest extends CreateOrUpdateEntitiesRequest<FrontendScope, RoleModuleState>{
    createEntity(entity: Partial<FrontendScope>, { api }: ThunkExtra): Promise<FrontendScope> {
        return api.createFrontendScope(entity);
    }
    updateEntity(entity: Partial<FrontendScope>, { api }: ThunkExtra): Promise<FrontendScope> {
        return api.updateFrontendScope(entity as FrontendScope);
    }
    constructor(config?: RequestConfig<FrontendScope[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateFrontendScope',
                toasts: {
                    success: (s) => `Successfully created/updated frontend scopes`,
                    error: (err: any) => `Couldn't create/update frontend scopes: ${err.message}`
                },
                ...config
            },
            frontendScopeMapRequest
        );
    }
}

export const createOrUpdateFrontendScopeRequest = new CreateOrUpdateFrontendScopeRequest();

class DeleteFrontendScopesRequest extends RequestAction<IdType[], IdType[], RoleModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteFrontendScopes',
            toasts: {
                success: (ids) => `${ids.length} frontend scopes(s) deleted`,
                error: (err) => `Problem encountered while deleting frontend scopes: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteFrontendScopes(request);
        return request;
    }

    // TODO: How does this all work?
    setRequestData(moduleState: RoleModuleState, frontendScopeIds: IdType[]) {
        const newMap = { ...frontendScopeMapRequest.getRequestData(moduleState) };
        frontendScopeIds.forEach(id => delete newMap[id]);
        return frontendScopeMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteFrontendScopesRequest = new DeleteFrontendScopesRequest();
