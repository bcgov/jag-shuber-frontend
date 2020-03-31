import { ThunkExtra } from '../../store';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    UserModuleState
} from './common';

import {
    IdType,
    MapType,
    UserMap,
    User
} from '../../api';

import GetEntityMapRequest from '../../infrastructure/Requests/GetEntityMapRequest';
import RequestAction, { RequestConfig } from '../../infrastructure/Requests/RequestActionBase';
import CreateOrUpdateEntitiesRequest from '../../infrastructure/Requests/CreateOrUpdateEntitiesRequest';
import CreateEntityRequest from '../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../infrastructure/Requests/UpdateEntityRequest';
import toTitleCase from '../../infrastructure/toTitleCase';
import DeleteEntityRequest from '../../infrastructure/Requests/DeleteEntityRequest';

// User Map
class UserMapRequest extends GetEntityMapRequest<void, User, UserModuleState> {
    constructor(config?: RequestConfig<MapType<User>>) {
        super({
            namespace: STATE_KEY,
            actionName: 'userMap',
            ...config,
            toasts: {
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while retrieving list of users: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: void, { api }: ThunkExtra): Promise<UserMap> {
        let data = await api.getUsers();
        return arrayToMap(data, t => t.id);
    }
}

export const userMapRequest = new UserMapRequest();

// Create User
class CreateUserRequest extends CreateEntityRequest<User, UserModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createUser',
                toasts: {
                    success: (s) => (
                        `${toTitleCase(s.displayName)}'s profile has been created`
                    ),
                    error: (err) => (
                        `Problem encountered while adding new user: ${err ? err.toString() : 'Unknown Error'}`
                    )
                }
            },
            userMapRequest
        );
    }
    public async doWork(user: Partial<User>, { api }: ThunkExtra): Promise<User> {
        let newUser = await api.createUser(user as User);
        return newUser;
    }
}

export const createUserRequest = new CreateUserRequest();

// Upload User Image
class UploadUserImageRequest extends CreateEntityRequest<User, UserModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'uploadUserImage',
                toasts: {
                    success: (s) => (
                        `${toTitleCase(s.displayName)}'s profile image has been uploaded`
                    ),
                    error: (err) => (
                        `Problem encountered while adding new user profile image: ${err ? err.toString() : 'Unknown Error'}`
                    )
                }
            },
            userMapRequest
        );
    }
    public async doWork(userImage: Partial<any>, { api }: ThunkExtra): Promise<any> {
        let newUserImage = await api.uploadUserImage(userImage);
        return newUserImage;
    }
}

export const uploadUserImageRequest = new UploadUserImageRequest();

// User Edit
class UpdateUserRequest extends UpdateEntityRequest<User, UserModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'updateUser',
                toasts: {
                    success: (s) => `${toTitleCase(s.displayName)}'s profile has been updated`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while updating user profile: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            userMapRequest
        );
    }
    public async doWork(user: Partial<User>, { api }: ThunkExtra): Promise<User> {
        let newUser = await api.updateUser(user);
        return newUser;
    }
}

export const updateUserRequest = new UpdateUserRequest();

class DeleteUserRequest extends DeleteEntityRequest<User, UserModuleState> {
    constructor() {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'deleteUser',
                toasts: {
                    success: (s) => `Deleted user`,
                    // tslint:disable-next-line:max-line-length
                    error: (err) => `Problem encountered while deleting user: ${err ? err.toString() : 'Unknown Error'}`
                }
            },
            userMapRequest
        );
    }
    public async doWork(request: IdType, { api }: ThunkExtra): Promise<IdType> {
        await api.deleteUser(request);
        return request;
    }
}

export const deleteUserRequest = new DeleteUserRequest();

// TODO: UserModuleState or UsersModuleState?
class CreateOrUpdateUsersRequest extends CreateOrUpdateEntitiesRequest<User, UserModuleState> {
    createEntity(entity: Partial<User>, { api}: ThunkExtra): Promise<User> {
        return api.createUser(entity);
    }
    updateEntity(entity: User, { api }: ThunkExtra): Promise<User> {
        return api.updateUser(entity);
    }

    constructor(config?: RequestConfig<User[]>) {
        super(
            {
                namespace: STATE_KEY,
                actionName: 'createOrUpdateUsers',
                toasts: {
                    success: () => `Updated users`,
                    error: (err: any) => `Couldn't create/update users: ${err.message}`
                },
                ...config
            },
            userMapRequest
        );
    }
}

export const createOrUpdateUsersRequest = new CreateOrUpdateUsersRequest();

class DeleteUsersRequest extends RequestAction<IdType[], IdType[], UserModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'deleteUsers',
            toasts: {
                success: (ids) => `${ids.length} user(s) deleted`,
                error: (err) => `Problem encountered while deleting users: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: IdType[], { api }: ThunkExtra): Promise<IdType[]> {
        await api.deleteRoles(request);
        return request;
    }
}

export const deleteUsersRequest = new DeleteUsersRequest();
