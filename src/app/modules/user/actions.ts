import { Action } from 'redux';
import { ThunkAction } from '../../store';
import { getSheriffList } from '../sheriffs/actions';
import { getUsers } from '../users/actions';
import {
  getAssignments,
  getAssignmentDuties,
  getCourtrooms,
  getCourtRoles,
  getJailRoles,
  getAlternateAssignmentTypes,
  getRuns
} from '../assignments/actions';
import { getShifts } from '../shifts/actions';
import { userTokenRequest, currentUserRequest, logoutRequest } from './requests';
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
  console.log(`updating current location [${locationId}] ... reloading data`);
  dispatch(_updateCurrentLocation(locationId));
  // TODO: Use constant!
  if (locationId === '' || locationId === 'ALL_LOCATIONS') {
      await Promise.all([
        // dispatch(getRuns()),
        dispatch(getCourtrooms()), // TODO: Only fetch if we're a super admin, or master locations admin
        // Don't grab new data if we're set to ALL_LOCATIONS, it's heavy and not paged
        // ALL_LOCATIONS is basically only for admin pages like code types, courtrooms,
        // frontend scopes, api scopes, and roles...
        // dispatch(getSheriffList()),
        // dispatch(getUsers()),
        // dispatch(getAssignments()),
        // dispatch(getAssignmentDuties()),
        // dispatch(getShifts())
      ]);
  } else {
      await Promise.all([
          dispatch(getRuns()),
          dispatch(getCourtrooms()),
          dispatch(getCourtRoles()),
          dispatch(getJailRoles()),
          dispatch(getAlternateAssignmentTypes()),
          dispatch(getSheriffList()),
          dispatch(getUsers()),
          dispatch(getAssignments()),
          dispatch(getAssignmentDuties()),
          dispatch(getShifts())
      ]);
  }
};

export const updateUserToken: ThunkAction<string> = (token?: string) => async (dispatch, getState, extra) => {
    console.log('Update user token');
    const payload = decodeJwt(token);
    await userTokenRequest.dispatchSuccess(dispatch, payload);
};

export const getUserToken = userTokenRequest.actionCreator;
export const getCurrentUser = currentUserRequest.actionCreator;

export const doLogout = logoutRequest.actionCreator;
