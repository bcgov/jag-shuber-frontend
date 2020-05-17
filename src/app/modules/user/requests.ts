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
        // console.log('Is there an existing getToken request underway? ' + getState().user.userToken.isBusy);
        // if (!(getState().user.userToken.isBusy)) {
        // console.log('If not, grab a new token from the API');

        // console.log('Ensuring token exists...');
        const { agent } = api;

        let smsessionCookie = retreiveCookieValue(SMSESSION_COOKIE_NAME, agent);
        // console.log('DUMP SMSESSION Cookie value');
        // console.log(smsessionCookie);

        if (!smsessionCookie) {
            let token = retreiveCookieValue(TOKEN_COOKIE_NAME, agent);

            // console.log('Token retrieved from cookie:');
            // console.log(decodeJwt(token));

            let tokenString = await api.getToken();
            return decodeJwt<TokenPayload>(tokenString);
        }

        return undefined;
    }

    async dispatchSuccess(dispatch: Dispatch<any>, response: TokenPayload | undefined, actionConfig: RequestActionConfig<TokenPayload | undefined> = {}) {
        // If a token has been retrieved, then initialize our application
        console.log('--------------------------------------------------------------');
        console.log('UserTokenRequest.dispatchSuccess');
        console.log('If a token has been retrieved, then initialize our application');
        console.log(response);

        console.log(actionConfig);

        if (response !== undefined) {
            await dispatch(initializeApplication());
            console.log('Success! Application initialized');

        }

        await super.dispatchSuccess(dispatch, response, actionConfig);
        console.log('--------------------------------------------------------------');
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
        await api.logout();
        // Clear the token
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
