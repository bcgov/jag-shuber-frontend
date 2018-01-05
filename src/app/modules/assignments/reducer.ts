import {
  IActionType,
  IActionPayload,
  IAction
} from './actions'
import { SheriffAssignmentMap } from '../../api/index';

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

export interface AssignmentState {
  map?: SheriffAssignmentMap;
  loading?: boolean;
  error?: string;
  saving?: boolean;
  successMessage?: string;
}


const reducer = createReducer<AssignmentState>({
  ASSIGNMENT_LIST_BEGIN: (state, payload) => ({ loading: true }),
  ASSIGNMENT_LIST_FAIL: (state, payload) => ({ loading: false, error: payload }),
  ASSIGNMENT_LIST_SUCCESS: (state, payload) => ({ loading: false, map: payload }),
  ASSIGNMENT_LINK: (state, payload) => {
    const { map, ...rest } = state;
    let newMap = Object.assign({}, map);
    newMap[payload.assignmentId].sheriffIds = [payload.badgeNumber];
    return { map: newMap, ...rest };
  },
  ASSIGNMENT_CREATE_BEGIN: (state, payload) => (Object.assign({}, state, {saving: true })),
  ASSIGNMENT_CREATE_FAIL: (state, payload) => ({ saving:false, error:payload }),
  ASSIGNMENT_CREATE_SUCCESS: (state, payload) => {
    const { map, ...rest } = state;
    let newMap = Object.assign({}, map);
    newMap[payload.id] = payload;
    return { map: newMap, ...rest, saving:false, successMessage:'SAVED!' };
  }
});

export default reducer;
