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
      return state || {} as State;
    }
  };
}

export interface AssignmentScheduleState {
  visibleTimeStart: any;
  visibleTimeEnd: any;
  selectedAssignmentIds: IdType[];
}

const reducer = createReducer<AssignmentScheduleState>({
  SCHEDULE_ASSIGNMENT_UPDATE_VISIBLETIME: (state, { visibleTimeStart, visibleTimeEnd }) => {
    return { ...state, visibleTimeStart, visibleTimeEnd };
  },
  SCHEDULE_ASSIGNMENT_SELECT: (state, assignmentId) => {
    const { selectedAssignmentIds = [] } = state;
    if (!assignmentId || selectedAssignmentIds.indexOf(assignmentId) >= 0) {
      return { ...state };
    }

    let newSelectedIds = selectedAssignmentIds.slice();
    newSelectedIds.push(assignmentId);

    return { ...state, selectedAssignmentIds: newSelectedIds };
  },
  SCHEDULE_ASSIGNMENT_UNSELECT: (state, assignmentId) => {
    const { selectedAssignmentIds = [] } = state;
    const assignmentIdIndex = selectedAssignmentIds.indexOf(assignmentId);

    if (assignmentIdIndex >= 0) {
      let newSelectedIds = selectedAssignmentIds.slice();
      newSelectedIds.splice(assignmentIdIndex, 1);

      return { ...state, selectedAssignmentIds: newSelectedIds };
    }

    return { ...state };
  },
  SCHEDULE_ASSIGNMENT_CLEAR_SELECTED: (state) => {
    return { ...state, selectedAssignmentIds: [] };
  },
  SCHEDULE_ASSIGNMENT_SELECT_MANY: (state, assignmentIds) => {
    const { selectedAssignmentIds = [] } = state;

    let newSelectedIds = selectedAssignmentIds.slice();
    assignmentIds.forEach(id => {
      if (selectedAssignmentIds.indexOf(id) < 0) {
        newSelectedIds.push(id);
      }
    });

    return { ...state, selectedAssignmentIds: newSelectedIds };
  }
});

export default reducer;
