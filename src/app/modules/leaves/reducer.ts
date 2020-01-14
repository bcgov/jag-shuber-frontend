import * as leaveRequests from './requests';
import { ReducersMapObject } from 'redux';
import NestedReducer from '../../infrastructure/NestedReducer';
import { STATE_KEY } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
  LeaveModuleState,
  STATE_KEY
} from './common';

const nestedReducer = new NestedReducer([
  // Leaves
  leaveRequests.leaveMapRequest.reducer,
  leaveRequests.leaveTypeMapRequest.reducer,
  leaveRequests.leaveCancelCodeMapRequest.reducer,
  leaveRequests.createOrUpdateLeavesRequest.reducer,
  leaveRequests.createOrUpdateLeaveSubCodesRequest.reducer,
  leaveRequests.deleteLeaveSubCodesRequest.reducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}
