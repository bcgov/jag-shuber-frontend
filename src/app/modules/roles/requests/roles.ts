import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    RoleModuleState
} from '../common';
import {
    RoleMap,
    Role,
    MapType, IdType
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
import DeleteEntityRequest from '../../../infrastructure/Requests/DeleteEntityRequest';
import { roleFrontendScopeMapRequest } from './roleFrontendScopes';
// import toTitleCase from '../../infrastructure/toTitleCase';

// Get the Map
class RoleMapRequest extends GetEntityMapRequest<void, Role, RoleModuleState> {
    constructor(config?: RequestConfig<MapType<Role>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'roleMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<RoleMap> {
        let roles = await api.getRoles();
        return arrayToMap(roles, t => t.id);
    }
}

export const roleMapRequest = new RoleMapRequest();

// Create Role
class CreateRoleRequest extends CreateEntityRequest<Role, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createRole',
                toasts: {
                    success: (s) => (
                        `Success`
                    ),
                    error: (err) => (
                        `Problem encountered while adding new role: ${err ? err.toString() : 'Unknown Error'}`
                    )
                }
            },
            roleMapRequest
        );
    }
    public async doWork(role: Partial<Role>, { api }: ThunkExtra): Promise<Role> {
        let newRole = await api.createRole(role as Role);
        return newRole;
    }
}

export const createRoleRequest = new CreateRoleRequest();

// Role Edit
class UpdateRoleRequest extends UpdateEntityRequest<Role, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateRole',
                toasts: {
                    success: (s) => `Success`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating role: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            roleMapRequest
        );
    }
    public async doWork(role: Partial<Role>, { api }: ThunkExtra): Promise<Role> {
        let newRole = await api.updateRole(role as Role);
        return newRole;
    }
}

export const updateRoleRequest = new UpdateRoleRequest();

class DeleteRoleRequest extends DeleteEntityRequest<Role, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'deleteRole',
                toasts: {
                    success: (s) => `Success`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating role: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            roleMapRequest
        );
    }
    public async doWork(request: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteRole(request);
        return request;
    }
}

export const deleteRoleRequest = new DeleteRoleRequest();

class CreateOrUpdateRolesRequest extends CreateOrUpdateEntitiesRequest<Role, RoleModuleState>{
    createEntity(entity: Partial<Role>, { api }: ThunkExtra): Promise<Role> {
        return api.createRole(entity);
    }
    updateEntity(entity: Partial<Role>, { api }: ThunkExtra): Promise<Role> {
        return api.updateRole(entity as Role);
    }
    /*deleteEntity(entity: Partial<Role>, { api }: ThunkExtra): Promise<void> {
        return api.deleteRole(entity.id as string);
    }*/
    constructor(config?: RequestConfig<Role[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateRoles',
                toasts: {
                    error: (err: any) => `Couldn't create/update roles: ${err.message}`
                },
                ...config
            },
            roleMapRequest
        );
    }
}

export const createOrUpdateRolesRequest = new CreateOrUpdateRolesRequest();

class DeleteRolesRequest extends RequestAction<IdType[], IdType[], RoleModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteRoles',
            toasts: {
                success: (ids) => `${ids.length} role scopes(s) deleted`,
                error: (err) => `Problem encountered while deleting role scopes: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteRoles(request);
        return request;
    }

    // TODO: How does this all work?
    setRequestData(moduleState: RoleModuleState, roleScopeIds: IdType[]) {
        const newMap = { ...roleFrontendScopeMapRequest.getRequestData(moduleState) };
        roleScopeIds.forEach(id => delete newMap[id]);
        return roleFrontendScopeMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteRolesRequest = new DeleteRolesRequest();
