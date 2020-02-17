import RequestActionBase, { RequestActionConfig } from '../../infrastructure/Requests/RequestActionBase';
import { TokenPayload, decodeJwt } from 'jag-shuber-api';
import { UserState, STATE_KEY } from './common';
import { ThunkExtra } from '../../store';
import { Dispatch } from 'redux';
import { initializeApplication } from '../system/action';

class UserTokenRequest extends RequestActionBase<void, TokenPayload | undefined, UserState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'userToken', toasts: {} });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let tokenString = await api.getToken();
        return decodeJwt<TokenPayload>(tokenString);
    }

    dispatchSuccess(dispatch: Dispatch<any>, response: TokenPayload | undefined, actionConfig: RequestActionConfig<TokenPayload | undefined> = {}) {
        // if a token has been retrieved, then initialize our application
        if (response !== undefined) {
            dispatch(initializeApplication());
        }
        super.dispatchSuccess(dispatch, response, actionConfig);
    }

    get updateUserTokenActionCreator() {
        return this.getSuccessAction.bind(this);
    }
}

export const userTokenRequest = new UserTokenRequest();
