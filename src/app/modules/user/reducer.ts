import {
  IActionType,
  IActionPayload,
  IAction
} from './actions';
import api from '../../api';
import Client from '../../api/Client';
import { ReducersMapObject } from 'redux';
import { addReducerToMap } from '../../infrastructure/reduxUtils';
import { UserState, STATE_KEY } from './common';
import NestedReducer from '../../infrastructure/NestedReducer';
import { userTokenRequest, currentUserRequest } from './requests';

export {
  UserState,
  STATE_KEY
} from './common';

export type ReducerResponse<State> = State;
export type ReducerCases<State> = {
  [T in IActionType]: (
    state: State,
    payload: IActionPayload<T>
  ) => State;
};

export function createReducer<State>(
  cases: Partial<ReducerCases<State>>
) {
  return function (state: State, action: IAction): ReducerResponse<State> {
    const fn = cases[action.type];
    if (fn) { // the "as any" part is a bit of a shame but ignore it
      return (fn as any)(state, action.payload, action);
    } else {
      // TODO: What is this state type?
      return state || {} as State;
    }
  };
}

const nestedReducer = new NestedReducer([
  createReducer<UserState>({
    USER_UPDATE_CURRENT_LOCATION: (state, currentLocation) => {
      (api as Client).setCurrentLocation(currentLocation);
      return { ...state, currentLocation };
    }
  }),
  userTokenRequest.reducer,
  currentUserRequest.reducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
