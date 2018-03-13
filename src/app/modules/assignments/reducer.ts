import * as assignmentRequests from './requests/assignments'
import * as assignmentDutyRequests from './requests/assignmentDuties'
import NestedReducer from '../../infrastructure/NestedReducer';
import { ReducersMapObject } from 'redux';
import { STATE_KEY } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
  AssignmentModuleState,
  STATE_KEY
} from './common';

const nestedReducer = new NestedReducer([
  // Assignments
  assignmentRequests.assignmentMapRequest.reducer,
  assignmentRequests.createAssignmentRequest.reducer,
  assignmentRequests.updateAssignmentRequest.reducer,
  assignmentRequests.deleteAssignmentRequest.reducer,
  
  // Duties
  assignmentDutyRequests.assignmentDutyMapRequest.reducer,
  assignmentDutyRequests.createAssignmentDutyRequest.reducer,
  assignmentDutyRequests.updateAssignmentDutyRequest.reducer,
  assignmentDutyRequests.deleteAssignmentDutyRequest.reducer,

  // Templates
  // assignmentTemplateRequests.assignmentTemplateMapRequest.reducer,
  // assignmentTemplateRequests.createAssignmentTemplateRequest.reducer,
  // assignmentTemplateRequests.updateAssignmentTemplateRequest.reducer,
  // assignmentTemplateRequests.deleteAssignmentTemplateRequest.reducer,
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}