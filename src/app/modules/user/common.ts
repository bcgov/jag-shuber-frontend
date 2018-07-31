import { TokenPayload } from 'jag-shuber-api';
import { RequestActionState } from '../../infrastructure/Requests/RequestActionBase';

export interface UserState {
    currentCourthouse: string;
    userToken?: RequestActionState<TokenPayload>;
}

export const STATE_KEY = 'user';