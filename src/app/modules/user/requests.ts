import RequestActionBase, { RequestActionConfig } from '../../infrastructure/Requests/RequestActionBase';
import {
    TokenPayload,
    retreiveCookieValue,
    decodeJwt,
    SMSESSION_COOKIE_NAME,
    TOKEN_COOKIE_NAME
} from 'jag-shuber-api';

import { UserState, STATE_KEY } from './common';
import store, { ThunkExtra } from '../../store';
import { Dispatch } from 'redux';
import { initializeApplication } from '../system/action';

class UserTokenRequest extends RequestActionBase<void, TokenPayload | undefined, UserState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'userToken', toasts: {} });
    }
    public async doWork(request: void, { api }: ThunkExtra, getState: any) {
        const { agent } = api;

        let smsessionCookie = retreiveCookieValue(SMSESSION_COOKIE_NAME, agent);
        if (!smsessionCookie) {
            let tokenString = await api.getToken();
            sessionStorage.setItem(TOKEN_COOKIE_NAME, tokenString);
            return decodeJwt<TokenPayload>(tokenString);
        }

        return undefined;
    }

    async dispatchSuccess(dispatch: Dispatch<any>, response: TokenPayload | undefined, actionConfig: RequestActionConfig<TokenPayload | undefined> = {}) {
        if (response !== undefined) {
            await dispatch(initializeApplication());
        }

        await super.dispatchSuccess(dispatch, response, actionConfig);
    }
    get updateUserTokenActionCreator() {
        return this.getSuccessAction.bind(this);
    }
}

export const userTokenRequest = new UserTokenRequest();

class LogoutRequest extends RequestActionBase<void, TokenPayload | undefined, UserState> {
    constructor() {
        super({ namespace: STATE_KEY, actionName: 'logout', toasts: {} });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        // Clear the token
        sessionStorage.clear();
        return undefined;
    }

    dispatchSuccess(dispatch: Dispatch<any>, response: TokenPayload | undefined, actionConfig: RequestActionConfig<TokenPayload | undefined> = {}) {
        if (window) {
            // Re-direct to logout page
            window.location.href = `https://logon.gov.bc.ca/clp-cgi/logoff.cgi?returl=${window.location.href}`;
        }
    }
}

export const logoutRequest = new LogoutRequest();

class CurrentUserRequest extends RequestActionBase<void, TokenPayload | undefined, UserState> {
    constructor() {
        super({
            namespace: STATE_KEY,
            actionName: 'currentUser',
            toasts: {
                // tslint:disable-next-line:max-line-length
                error: (err) => `Problem encountered while retrieving the current user: ${err ? err.toString() : 'Unknown Error'}`
            }
        });
    }
    public async doWork(request: void, { api }: ThunkExtra) {
        let data = await api.getCurrentUser();
        return data;
    }
}

export const currentUserRequest = new CurrentUserRequest();
