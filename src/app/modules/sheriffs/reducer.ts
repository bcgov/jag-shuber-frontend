import {
  IActionType,
  IActionPayload,
  IAction
} from './actions'
import { ThunkAction } from '../../store'
import { Sheriff } from '../../api/index';

export type ReducerResponse<State> = State | ThunkAction<State, State> | any
export type ReducerCases<State> = {
  [T in IActionType]: (
    state: State,
    payload: IActionPayload<T>
  ) => ReducerResponse<State>;
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

export interface SheriffState {
  list?: Sheriff[];
  loading?: boolean;
  error?: string;
}


const reducer = createReducer<SheriffState>({
  REQUEST_SHERIFF_LIST_BEGIN: (state, payload) => ({ loading: true }),
  REQUEST_SHERIFF_LIST_FAIL: (state, payload) => ({ loading: false, error: payload }),
  REQUEST_SHERIFF_LIST_SUCCESS: (state, payload) => ({ loading: false, list: payload })  
});

export default reducer;
