import {
  IActionType,
  IActionPayload,
  IAction
} from './actions';
import { IdType } from '../../api';

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

export interface DutyRosterState {
  visibleTimeStart: any;
  visibleTimeEnd: any;
  currentDraggingSheriff?: IdType;
}

const reducer = createReducer<DutyRosterState>({
  DUTYROSTER_UPDATE_VISIBLETIME: (state, { visibleTimeStart, visibleTimeEnd }) => {
    return { ...state, visibleTimeStart, visibleTimeEnd };
  },
  DUTYROSTER_UPDATE_DRAGGING_SHERIFF: (state, sheriffId) => {
    return {...state, currentDraggingSheriff: sheriffId};
  }
});

export default reducer;
