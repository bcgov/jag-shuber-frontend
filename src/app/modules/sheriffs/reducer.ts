import * as sheriffRequests from './requests';
import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { STATE_KEY } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
  SheriffModuleState,
  STATE_KEY
} from './common';

const nestedReducer = new NestedReducer([
  sheriffRequests.sheriffMapRequest.reducer,
  sheriffRequests.createSheriffRequest.reducer,
  sheriffRequests.updateSheriffRequest.reducer  
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}



// import {
//   IActionType,
//   IActionPayload,
//   IAction
// } from './actions'
// import { Sheriff } from '../../api/index';

// export type ReducerCases<State> = {
//   [T in IActionType]: (
//     state: State,
//     payload: IActionPayload<T>
//   ) => State;
// };

// export function createReducer<State>(
//   cases: Partial<ReducerCases<State>>
// ) {
//   return function (state: State, action: IAction): State {
//     const fn = cases[action.type];
//     if (fn) { // the "as any" part is a bit of a shame but ignore it
//       return (fn as any)(state, action.payload, action);
//     } else {
//       return state || {};
//     }
//   };
// }

// export interface SheriffState {
//   map?: {[id:number]:Sheriff};
//   loading?: boolean;
//   error?: string;
//   saving?: boolean;
//   updating?:boolean
//   successMessage?: string;
// }


// const reducer = createReducer<SheriffState>({
//   REQUEST_SHERIFF_LIST_BEGIN: (state, payload) => ({ loading: true }),
//   REQUEST_SHERIFF_LIST_FAIL: (state, payload) => ({ loading: false, error: payload }),
//   REQUEST_SHERIFF_LIST_SUCCESS: (state, payload) => ({ loading: false, map: payload }),
//   SHERIFF_BEGIN_CREATE: (state, payload) => (Object.assign({}, state, {saving: true })),
//   SHERIFF_CREATE_FAIL: (state, payload) => ({...state, loading:false, error:payload }),
//   SHERIFF_CREATE_SUCCESS: (state, payload) => {
//     const { map, ...rest } = state;
//     let newMap = Object.assign({}, map);
//     newMap[payload.badgeNumber] = payload;
//     return { map: newMap, ...rest, saving:false, loading:false, successMessage:'SAVED!'};
//   },
//   SHERIFF_UPDATE_SUCCESS: (state,payload)=>{
//     const newMap = Object.assign({},state.map);
//     newMap[payload.badgeNumber]=payload;
//     return {updating:false,map:newMap};
//   },
//   SHERIFF_UPDATE_FAIL: (state,payload)=>({updating:false,error:payload})
// });

// export default reducer;
