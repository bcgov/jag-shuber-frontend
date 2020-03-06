import { TokenPayload } from 'jag-shuber-api';
import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';
import { User } from '../../api';

export interface UserState {
    currentLocation: string;
    userToken?: RequestActionState<TokenPayload>;
    currentUser?: User;
}

export const STATE_KEY = 'user';
