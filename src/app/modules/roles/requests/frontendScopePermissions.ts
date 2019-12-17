import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    RoleModuleState
} from '../common';
import {
    FrontendScopePermissionMap,
    FrontendScopePermission,
    MapType
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
// import toTitleCase from '../../infrastructure/toTitleCase';

// Get the Map
class FrontendScopePermissionMapRequest extends GetEntityMapRequest<void, FrontendScopePermission, RoleModuleState> {
    constructor(config?: RequestConfig<MapType<FrontendScopePermission>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'frontendScopePermissionMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<FrontendScopePermissionMap> {
        let data = await api.getFrontendScopePermissions();
        return arrayToMap(data, t => t.id);
    }
}

export const frontendScopePermissionMapRequest = new FrontendScopePermissionMapRequest();

// Create FrontendScopePermission
class CreateFrontendScopePermissionRequest extends CreateEntityRequest<FrontendScopePermission, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createFrontendScopePermission',
                toasts: {
                    success: (s) => (
                        `Success`
                    ),
                    error: (err) => (
                        `Problem encountered while adding new scope permissions: ${err ? err.toString() : 'Unknown Error'}`
                    )
                }
            },
            frontendScopePermissionMapRequest
        );
    }
    public async doWork(role: Partial<FrontendScopePermission>, { api }: ThunkExtra): Promise<FrontendScopePermission> {
        let newFrontendScopePermission = await api.createFrontendScopePermission(role as FrontendScopePermission);
        return newFrontendScopePermission;
    }
}

export const createFrontendScopePermissionRequest = new CreateFrontendScopePermissionRequest();

// FrontendScopePermission Edit
class UpdateFrontendScopePermissionRequest extends UpdateEntityRequest<FrontendScopePermission, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateFrontendScopePermission',
                toasts: {
                    success: (s) => `Success`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating scope permissions: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            frontendScopePermissionMapRequest
        );
    }
    public async doWork(role: Partial<FrontendScopePermission>, { api }: ThunkExtra): Promise<FrontendScopePermission> {
        let newFrontendScopePermission = await api.updateFrontendScopePermission(role as FrontendScopePermission);
        return newFrontendScopePermission;
    }
}

export const updateFrontendScopePermissionRequest = new UpdateFrontendScopePermissionRequest();

class CreateOrUpdateFrontendScopePermissionRequest extends CreateOrUpdateEntitiesRequest<FrontendScopePermission, RoleModuleState>{
    createEntity(entity: Partial<FrontendScopePermission>, { api }: ThunkExtra): Promise<FrontendScopePermission> {
        return api.createFrontendScopePermission(entity);
    }
    updateEntity(entity: Partial<FrontendScopePermission>, { api }: ThunkExtra): Promise<FrontendScopePermission> {
        return api.updateFrontendScopePermission(entity as FrontendScopePermission);
    }
    constructor(config?: RequestConfig<FrontendScopePermission[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateFrontendScopePermission',
                toasts: {
                    error: (err: any) => `Couldn't create/update scope permissions: ${err.message}`
                },
                ...config
            },
            frontendScopePermissionMapRequest
        );
    }
}

export const createOrUpdateFrontendScopePermissionRequest = new CreateOrUpdateFrontendScopePermissionRequest();
