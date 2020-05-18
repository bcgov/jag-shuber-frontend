import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import {
    User,
    UserMap,
} from '../../api/Api';

export type ErrorMap = { [key: string]: Error | string };

export interface UserModuleState {
    userMap?: RequestActionState<UserMap>;
    createUser?: RequestActionState<User>;
    updateUser?: RequestActionState<User>;
    selectedSection?: string;
    pluginSubmitErrors?: ErrorMap;
}

export const STATE_KEY: string = 'users';
