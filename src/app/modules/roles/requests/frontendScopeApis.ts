import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    RoleModuleState
} from '../common';
import {
    FrontendScopeApiMap,
    FrontendScopeApi,
    MapType, IdType
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
// import toTitleCase from '../../infrastructure/toTitleCase';

// Get the Map
class FrontendScopeApiMapRequest extends GetEntityMapRequest<void, FrontendScopeApi, RoleModuleState> {
    constructor(config?: RequestConfig<MapType<FrontendScopeApi>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'frontendScopeApiMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<FrontendScopeApiMap> {
        let data = await api.getFrontendScopeApis();
        return arrayToMap(data, t => t.id);
    }
}

export const frontendScopeApiMapRequest = new FrontendScopeApiMapRequest();

// Create FrontendScopeApi
class CreateFrontendScopeApiRequest extends CreateEntityRequest<FrontendScopeApi, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createFrontendScopeApi',
                toasts: {
                    success: (s) => `Created a new ${s.frontendScopeCode} frontend scope api`,
                    error: (err) => (`Problem encountered while adding new scope apis: ${err ? err.toString() : 'Unknown Error'}`)
                }
            },
            frontendScopeApiMapRequest
        );
    }
    public async doWork(role: Partial<FrontendScopeApi>, { api }: ThunkExtra): Promise<FrontendScopeApi> {
        let newFrontendScopeApi = await api.createFrontendScopeApi(role as FrontendScopeApi);
        return newFrontendScopeApi;
    }
}

export const createFrontendScopeApiRequest = new CreateFrontendScopeApiRequest();

// FrontendScopeApi Edit
class UpdateFrontendScopeApiRequest extends UpdateEntityRequest<FrontendScopeApi, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateFrontendScopeApi',
                toasts: {
                    success: (s) => `Updated the ${s.frontendScopeCode} frontend scope api`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating scope apis: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            frontendScopeApiMapRequest
        );
    }
    public async doWork(role: Partial<FrontendScopeApi>, { api }: ThunkExtra): Promise<FrontendScopeApi> {
        let newFrontendScopeApi = await api.updateFrontendScopeApi(role as FrontendScopeApi);
        return newFrontendScopeApi;
    }
}

export const updateFrontendScopeApiRequest = new UpdateFrontendScopeApiRequest();

class CreateOrUpdateFrontendScopeApisRequest extends CreateOrUpdateEntitiesRequest<FrontendScopeApi, RoleModuleState>{
    createEntity(entity: Partial<FrontendScopeApi>, { api }: ThunkExtra): Promise<FrontendScopeApi> {
        return api.createFrontendScopeApi(entity);
    }
    updateEntity(entity: Partial<FrontendScopeApi>, { api }: ThunkExtra): Promise<FrontendScopeApi> {
        return api.updateFrontendScopeApi(entity as FrontendScopeApi);
    }
    constructor(config?: RequestConfig<FrontendScopeApi[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateFrontendScopeApi',
                toasts: {
                    success: (s) => `Created/updated frontend scope apis`,
                    error: (err: any) => `Couldn't create/update scope apis: ${err.message}`
                },
                ...config
            },
            frontendScopeApiMapRequest
        );
    }
}

export const createOrUpdateFrontendScopeApisRequest = new CreateOrUpdateFrontendScopeApisRequest();

class DeleteFrontendScopeApisRequest extends RequestAction<IdType[], IdType[], RoleModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteFrontendScopeApis',
            toasts: {
                success: (ids) => `${ids.length} api(s) deleted`,
                error: (err) => `Problem encountered while deleting apis: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteFrontendScopeApis(request);
        return request;
    }

    setRequestData(moduleState: RoleModuleState, apiIds: IdType[]) {
        const newMap = { ...frontendScopeApiMapRequest.getRequestData(moduleState) };
        apiIds.forEach(id => delete newMap[id]);
        return frontendScopeApiMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteFrontendScopeApisRequest = new DeleteFrontendScopeApisRequest();
