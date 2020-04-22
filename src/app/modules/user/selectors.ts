import { RootState } from '../../store';
import { createSelector } from 'reselect';
import { TokenPayload } from 'jag-shuber-api';
import { userTokenRequest, currentUserRequest } from './requests';

export const currentLocation = (state: RootState): string => {
    const { user: { currentLocation: location = '' } = {} } = state;
    return location;
};

export const isLocationSet = createSelector(
    currentLocation,
    (location) => {
        // tslint:disable-next-line:triple-equals
        return location !== undefined && location !== '';
    }
);

export const getCurrentUserToken = (state: RootState): TokenPayload | undefined => {
    return userTokenRequest.getData(state);
};

export const getCurrentUser = (state: RootState): TokenPayload | undefined => {
    return currentUserRequest.getData(state);
};

export const currentUserRoleScopes = (state: RootState): any => {
    const token = getCurrentUserToken(state);

    if (!token) return undefined;

    return {
        authScopes: token.scopes,
        appScopes: token.appScopes
    };
};

export const isLoadingToken = userTokenRequest.getIsBusy;
export const loadingTokenError = userTokenRequest.getError;

export const currentUserGuid = createSelector(
    getCurrentUserToken,
    (userToken) => {
        const { guid = undefined } = userToken || {};
        return guid;
    }
);

export const getCurrentUserDisplayName = createSelector(
    getCurrentUserToken,
    (userToken) => {
        const { displayName = '' } = userToken || {};
        return displayName;
    }
);

export const currentUserScopes = createSelector(
    getCurrentUserToken,
    (userToken) => {
        const { scopes = [] } = userToken || {};
        return scopes;
    }
);

export const isLoggedIn = createSelector(
    currentUserGuid,
    (guid) => guid !== undefined
);
