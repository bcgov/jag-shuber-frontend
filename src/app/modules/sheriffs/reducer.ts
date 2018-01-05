import {
  IActionType,
  IActionPayload,
  IAction
} from './actions'
import { Sheriff } from '../../api/index';

export type ReducerCases<State> = {
  [T in IActionType]: (
    state: State,
    payload: IActionPayload<T>
  ) => State;
};

export function createReducer<State>(
  cases: Partial<ReducerCases<State>>
) {
  return function (state: State, action: IAction): State {
    const fn = cases[action.type];
    if (fn) { // the "as any" part is a bit of a shame but ignore it
      return (fn as any)(state, action.payload, action);
    } else {
      return state || {};
    }
  };
}

export interface SheriffState {
  map?: {[id:number]:Sheriff};
  loading?: boolean;
  error?: string;
  saving?: boolean;
  successMessage?: string;
}


const reducer = createReducer<SheriffState>({
  REQUEST_SHERIFF_LIST_BEGIN: (state, payload) => ({ loading: true }),
  REQUEST_SHERIFF_LIST_FAIL: (state, payload) => ({ loading: false, error: payload }),
  REQUEST_SHERIFF_LIST_SUCCESS: (state, payload) => ({ loading: false, map: payload }),
  SHERIFF_BEGIN_CREATE: (state, payload) => ({saving: true }),
  SHERIFF_CREATE_FAIL: (state, payload) => ({ saving:false, error:payload }),
  SHERIFF_CREATE_SUCCESS: (state, payload) => ({saving:false, successMessage:'SAVED!'})
});

export default reducer;
