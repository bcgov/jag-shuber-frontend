import * as shiftRequests from './requests/shifts';
import * as leaveRequests from './requests/leaves';
import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { STATE_KEY } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
  ShiftModuleState,
  STATE_KEY
} from './common';

const nestedReducer = new NestedReducer([
  // Shifts
  shiftRequests.shiftMapRequest.reducer,
  shiftRequests.createShiftRequest.reducer,
  shiftRequests.updateMultipleShiftsRequest.reducer,
  shiftRequests.deleteShiftRequest.reducer,
  shiftRequests.copyShiftsFromPrevWeek.reducer,
  shiftRequests.updateShiftRequest.reducer,
  shiftRequests.createShiftsRequest.reducer,

  // Leaves
  leaveRequests.leaveMapRequest.reducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}