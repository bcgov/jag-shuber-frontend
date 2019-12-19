import { ThunkExtra } from '../../store';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    STATE_KEY,
    UserModuleState
} from './common';
import {
    User
} from '../../api';
import GetEntityMapRequest from '../../infrastructure/Requests/GetEntityMapRequest';
import CreateEntityRequest from '../../infrastructure/Requests/CreateEntityRequest';
import UpdateEntityRequest from '../../infrastructure/Requests/UpdateEntityRequest';
import toTitleCase from '../../infrastructure/toTitleCase';
import { SheriffRank as UserSheriffRank } from '../../api/Api';

// User Map
class UserMapRequest extends GetEntityMapRequest<void, User, UserModuleState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'userMap',
            toasts: {
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while retrieving list of users: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let users = await api.getUsers();
        return arrayToMap(users, t => t.id);
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
                        `${toTitleCase(s.displayName)} has been added`
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

// User Rank Codes
class UserSheriffRankCodeMapRequest extends GetEntityMapRequest<void, UserSheriffRank, UserModuleState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'userRankCodeMap' });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let rankCodes = await api.getSheriffRankCodes();
        return arrayToMap(rankCodes, r => r.code);
    }
}

export const userRankCodeMapRequest = new UserSheriffRankCodeMapRequest();
