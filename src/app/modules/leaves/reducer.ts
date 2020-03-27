import * as leaveRequests from './requests';
import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

import {
  LeaveModuleState,
  STATE_KEY
} from './common';
import {
  IActionType,
  IActionPayload,
  IAction
} from './actions';

export {
  LeaveModuleState,
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

const actionReducer = createReducer<LeaveModuleState>({
  ADMIN_LEAVE_TYPES_SELECT_SECTION: (state, sectionName) => {
    return {...state, selectedProfileSection: sectionName};
  },
  ADMIN_LEAVE_TYPES_SET_PLUGIN_SUBMIT_ERRORS: (state, pluginErrors) => {
    return {...state, pluginSubmitErrors: pluginErrors};
  },
  ADMIN_LEAVE_TYPES_SET_PLUGIN_FILTERS: (state, filters) => {
    return {...state, pluginFilters: filters};
  },
  ADMIN_TRAINING_TYPES_SELECT_SECTION: (state, sectionName) => {
    return {...state, selectedProfileSection: sectionName};
  },
  ADMIN_TRAINING_TYPES_SET_PLUGIN_SUBMIT_ERRORS: (state, pluginErrors) => {
    return {...state, pluginSubmitErrors: pluginErrors};
  },
  ADMIN_TRAINING_TYPES_SET_PLUGIN_FILTERS: (state, filters) => {
    return {...state, pluginFilters: filters};
  }
});

const nestedReducer = new NestedReducer([
  // Leaves
  leaveRequests.leaveMapRequest.reducer,
  leaveRequests.leaveTypeMapRequest.reducer,
  leaveRequests.leaveCancelCodeMapRequest.reducer,
  leaveRequests.createOrUpdateLeavesRequest.reducer,
  leaveRequests.createOrUpdateLeaveSubCodesRequest.reducer,
  leaveRequests.deleteLeaveSubCodesRequest.reducer,
  // Actions
  actionReducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
