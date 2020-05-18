import * as sheriffRequests from './requests';

import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { STATE_KEY, SheriffModuleState } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';
import {
  IActionType,
  IActionPayload,
  IAction
} from './actions';

export {
  SheriffModuleState,
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
      return state || {} as State;
    }
  };
}

const actionReducer = createReducer<SheriffModuleState>({
  SHERIFF_PROFILE_SELECT_SECTION: (state, sectionName) => {
    return { ...state, selectedSection: sectionName };
  },
  SHERIFF_PROFILE_SET_SUBMIT_ERRORS: (state, pluginErrors) => {
    return { ...state, pluginSubmitErrors: pluginErrors };
  }
});

const nestedReducer = new NestedReducer([
  sheriffRequests.sheriffMapRequest.reducer,
  sheriffRequests.createSheriffRequest.reducer,
  sheriffRequests.updateSheriffRequest.reducer,
  sheriffRequests.sheriffRankCodeMapRequest.reducer,
  actionReducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
