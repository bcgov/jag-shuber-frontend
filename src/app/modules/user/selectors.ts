import { RootState } from '../../store';
import { createSelector } from 'reselect';
import { TokenPayload } from 'jag-shuber-api/dist/client';
import { userTokenRequest } from './requests';

export const currentCourthouse = (state: RootState): string => {
    const { user: { currentCourthouse: courthouse = '' } = {} } = state;
    return courthouse;
};

export const isCourthouseSet = createSelector(
    currentCourthouse,
    (courthouse) => {
        // tslint:disable-next-line:triple-equals
        return courthouse != undefined && courthouse !== '';
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