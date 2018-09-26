import { Action } from 'redux';
import { ThunkAction } from '../../store';
import { getSheriffList } from '../sheriffs/actions';
import {
  getAssignments,
  getAssignmentDuties,
  getCourtrooms,
  getRuns
} from '../assignments/actions';
import { getShifts } from '../shifts/actions';
import { userTokenRequest } from './requests';
import { decodeJwt } from 'jag-shuber-api';

// The following gives us type-safe redux actions
// see https://medium.com/@dhruvrajvanshi/some-tips-on-type-safety-with-redux-98588a85604c
// Todo: Would be great to make this more generic and factor it out into infrastructure, leaving as is for now

type IActionMap = {
  'USER_UPDATE_CURRENT_LOCATION': string;
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

const _updateCurrentLocation = (currentLocation: string) => (
  actionCreator('USER_UPDATE_CURRENT_LOCATION')(currentLocation)
);

export const updateCurrentLocation: ThunkAction<string> =
  (locationId = '') => async (dispatch, getState, extra) => {
    dispatch(_updateCurrentLocation(locationId));

    await Promise.all([
      dispatch(getRuns()),
      dispatch(getCourtrooms()),
      dispatch(getSheriffList()),
      dispatch(getAssignments()),
      dispatch(getAssignmentDuties()),
      dispatch(getShifts())
    ]);
  };

export const updateUserToken: ThunkAction<string> = (token?: string) => async (dispatch, getState, extra) => {
  const payload = decodeJwt(token);
  userTokenRequest.dispatchSuccess(dispatch, payload);
};

export const requestUserToken = userTokenRequest.actionCreator;