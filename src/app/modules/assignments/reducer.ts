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
    let assignment = newMap[payload.assignmentId];
    
    // if null create array
    if(!assignment.sheriffIds){
      assignment.sheriffIds = [];
    }

    if(assignment.sheriffIds.indexOf(payload.badgeNumber)===-1){
      assignment.sheriffIds.push(payload.badgeNumber);
    }    
    return { map: newMap, ...rest };
  },
  ASSIGNMENT_UNLINK: (state, payload) => {
    const { map, ...rest } = state;
    let newMap = Object.assign({}, map);
    let assignment = newMap[payload.assignmentId];
    let index = assignment.sheriffIds.indexOf(payload.badgeNumber);
    if(index!==-1){
      assignment.sheriffIds.splice(index,1);
    }
    return { map: newMap, ...rest };
  },
  ASSIGNMENT_SWAP: (state,payload)=>{
    const { map, ...rest } = state;
    let newMap = Object.assign({}, map);
    let assignment = newMap[payload.assignmentId];
    
    // Remove old badge number if present
    let index = assignment.sheriffIds.indexOf(payload.oldBadgeNumber);    
    if(index!==-1){
      assignment.sheriffIds.splice(index,1);
    }

    // Add new badge number if missing 
    if(assignment.sheriffIds.indexOf(payload.newBadgeNumber)=== -1){
      assignment.sheriffIds.push(payload.newBadgeNumber);
    }    
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
