import { RootState } from '../../store';
import { createSelector } from 'reselect';
import { TokenPayload } from 'jag-shuber-api';
import { userTokenRequest } from './requests';

export const currentLocation = (state: RootState): string => {
    const { user: { currentLocation: location = '' } = {} } = state;
    return location;
};

export const isLocationSet = createSelector(
    currentLocation,
    (location) => {
        // tslint:disable-next-line:triple-equals
        return location != undefined && location !== '';
    }
);

const currentUserToken = (state: RootState): TokenPayload | undefined => {
    return userTokenRequest.getData(state);
};

export const isLoadingToken = userTokenRequest.getIsBusy;
export const loadingTokenError = userTokenRequest.getError;

export const currentUserGuid = createSelector(
    currentUserToken,
    (userToken) => {
        const { guid = undefined } = userToken || {};
        return guid;
    }
);

export const currentUserDisplayName = createSelector(
    currentUserToken,
    (userToken) => {
        const { displayName = '' } = userToken || {};
        return displayName;
    }
);

export const currentUserScopes = createSelector(
    currentUserToken,
    (userToken) => {
        const { scopes = [] } = userToken || {};
        return scopes;
    }
);

export const isLoggedIn = createSelector(
    currentUserGuid,
    (guid) => guid != undefined
);