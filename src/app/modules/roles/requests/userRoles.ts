import { ThunkExtra } from '../../../store';
import arrayToMap from '../../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    RoleModuleState
} from '../common';
import {
    UserRoleMap,
    UserRole,
    MapType, IdType
} from '../../../api/Api';
import GetEntityMapRequest from '../../../infrastructure/Requests/GetEntityMapRequest';
import RequestAction, { RequestConfig } from '../../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import CreateEntityRequest from '../../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../../infrastructure/Requests/UpdateEntityRequest';
import { UserModuleState } from '../../users/common';
import { roleFrontendScopeMapRequest } from './roleFrontendScopes';
// import toTitleCase from '../../infrastructure/toTitleCase';

// Get the Map
class UserRoleMapRequest extends GetEntityMapRequest<void, UserRole, RoleModuleState> {
    constructor(config?: RequestConfig<MapType<UserRole>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'userRoleMap',
            ...config
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<UserRoleMap> {
        let data = await api.getUserRoles();
        return arrayToMap(data, t => t.id);
    }
}

export const userRoleMapRequest = new UserRoleMapRequest();

// Create UserRole
class CreateUserRoleRequest extends CreateEntityRequest<UserRole, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createUserRole',
                toasts: {
                    success: (s) => (
                        `Success`
                    ),
                    error: (err) => (
                        `Problem encountered while adding new user role: ${err ? err.toString() : 'Unknown Error'}`
                    )
                }
            },
            userRoleMapRequest
        );
    }
    public async doWork(role: Partial<UserRole>, { api }: ThunkExtra): Promise<UserRole> {
        let newUserRole = await api.createUserRole(role as UserRole);
        return newUserRole;
    }
}

export const createUserRoleRequest = new CreateUserRoleRequest();

// UserRole Edit
class UpdateUserRoleRequest extends UpdateEntityRequest<UserRole, RoleModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateUserRole',
                toasts: {
                    success: (s) => `Success`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating user roles: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            userRoleMapRequest
        );
    }
    public async doWork(role: Partial<UserRole>, { api }: ThunkExtra): Promise<UserRole> {
        let newUserRole = await api.updateUserRole(role as UserRole);
        return newUserRole;
    }
}

export const updateUserRoleRequest = new UpdateUserRoleRequest();

class CreateOrUpdateUserRolesRequest extends CreateOrUpdateEntitiesRequest<UserRole, RoleModuleState>{
    createEntity(entity: Partial<UserRole>, { api }: ThunkExtra): Promise<UserRole> {
        return api.createUserRole(entity);
    }
    updateEntity(entity: Partial<UserRole>, { api }: ThunkExtra): Promise<UserRole> {
        return api.updateUserRole(entity as UserRole);
    }
    constructor(config?: RequestConfig<UserRole[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateUserRoles',
                toasts: {
                    error: (err: any) => `Couldn't create/update user roles: ${err.message}`
                },
                ...config
            },
            userRoleMapRequest
        );
    }
}

export const createOrUpdateUserRolesRequest = new CreateOrUpdateUserRolesRequest();

class DeleteUserRolesRequest extends RequestAction<IdType[], IdType[], RoleModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteUserRoles',
            toasts: {
                success: (ids) => `${ids.length} user role(s) deleted`,
                error: (err) => `Problem encountered while deleting user roles: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteUserRoles(request);
        return request;
    }

    // TODO: How does this all work?
    setRequestData(moduleState: RoleModuleState, roleScopeIds: IdType[]) {
        const newMap = { ...userRoleMapRequest.getRequestData(moduleState) };
        roleScopeIds.forEach(id => delete newMap[id]);
        return userRoleMapRequest.setRequestData(moduleState, newMap);
    }
}

export const deleteUserRolesRequest = new DeleteUserRolesRequest();
