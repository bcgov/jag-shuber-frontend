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
      return state || {};
    }
  };
}

const reducer = createReducer<UserState>({
  USER_UPDATE_CURRENT_COURTHOUSE: (state, currentCourthouse) => {
    (api as Client).setCurrentCourthouse(currentCourthouse);
    return { ...state, currentCourthouse };
  }
});

export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
