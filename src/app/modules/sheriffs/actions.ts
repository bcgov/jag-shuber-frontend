import * as sheriffRequests from './requests';
import { Action } from 'redux';
import { ErrorMap } from './common';

export const getSheriffList = sheriffRequests.sheriffMapRequest.actionCreator;
export const updateSheriff = sheriffRequests.updateSheriffRequest.actionCreator;
export const createSheriff = sheriffRequests.createSheriffRequest.actionCreator;
export const getSheriffRankCodes = sheriffRequests.sheriffRankCodeMapRequest.actionCreator;

type IActionMap = {
    'SHERIFF_PROFILE_SELECT_SECTION': string | undefined;
    'SHERIFF_PROFILE_SET_PLUGIN_SUBMIT_ERRORS': ErrorMap | undefined;
};

export type IActionType = keyof IActionMap;

export type IActionPayload<K extends IActionType> = IActionMap[K];

interface IActionObject<K extends IActionType> extends Action {
    type: K;
    payload: IActionPayload<K>;
}

export type IAction = {
    [P in IActionType]: IActionObject<P>
}[IActionType];

function actionCreator<Type extends IActionType>(type: Type) {
    return (payload: IActionPayload<Type>): IActionObject<Type> =>
        ({ type: type, payload: payload });
}

export const selectSheriffProfileSection = (sectionName?: string) => (
    actionCreator('SHERIFF_PROFILE_SELECT_SECTION')(sectionName)
);

export const setSheriffProfilePluginSubmitErrors = (errors?: ErrorMap) => (
    actionCreator('SHERIFF_PROFILE_SET_PLUGIN_SUBMIT_ERRORS')(errors)
);
