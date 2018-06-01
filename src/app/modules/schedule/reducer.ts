import {
  IActionType,
  IActionPayload,
  IAction
} from './actions';
import { IdType } from '../../api/Api';

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

export interface ScheduleState {
  visibleTimeStart: any;
  visibleTimeEnd: any;
  selectedShiftIds: IdType[];
  deputyViewWeekStart: any;
  showWorkSections: boolean;
}

const reducer = createReducer<ScheduleState>({
  SCHEDULE_UPDATE_VISIBLETIME: (state, { visibleTimeStart, visibleTimeEnd }) => {
    return { ...state, visibleTimeStart, visibleTimeEnd };
  },
  SCHEDULE_SHIFT_SELECT: (state, shiftId) => {
    const { selectedShiftIds = [] } = state;
    if (!shiftId || selectedShiftIds.indexOf(shiftId) >= 0) {
      return { ...state };
    }

    let newSelectedShiftIds = selectedShiftIds.slice();
    newSelectedShiftIds.push(shiftId);

    return { ...state, selectedShiftIds: newSelectedShiftIds };
  },
  SCHEDULE_SHIFT_UNSELECT: (state, shiftId) => {
    const { selectedShiftIds = [] } = state;
    const shiftIdIndex = selectedShiftIds.indexOf(shiftId);

    if (shiftIdIndex >= 0) {
      let newSelectedShiftIds = selectedShiftIds.slice();
      newSelectedShiftIds.splice(shiftIdIndex, 1);

      return { ...state, selectedShiftIds: newSelectedShiftIds };
    }

    return { ...state };
  },
  SCHEDULE_SHIFT_CLEAR_SELECTED: (state) => {
    return { ...state, selectedShiftIds: [] };
  },
  SCHEDULE_DEPUTY_VIEW_UPDATE_WEEK_START: (state, deputyViewWeekStart) => {
    return { ...state, deputyViewWeekStart };
  },
  SCHEDULE_DEPUTY_VIEW_SHOW_WORKSECTION: (state, showWorkSections) => {
    return { ...state, showWorkSections };
  }
});

export default reducer;
