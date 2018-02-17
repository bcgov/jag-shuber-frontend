import { ThunkAction } from '../../store'
import {

} from "../../api/index";
import * as requests from './requests';
import {
  AssignmentTemplate,
  Assignment
} from '../../api/Api';


// Assignments
export const getAssignments: ThunkAction<void> = requests.assignmentMapRequest.actionCreator;
export const createAssignment: ThunkAction<Partial<Assignment>> = requests.createAssignmentRequest.actionCreator;
export const editAssignment: ThunkAction<Assignment> = requests.updateAssignmentRequest.actionCreator;


// Assignment Templates
export const getAssignmentTemplates: ThunkAction<void> = requests.assignmentTemplateMapRequest.actionCreator;
export const createAssignmentTemplate: ThunkAction<Partial<AssignmentTemplate>> = requests.createAssignmentTemplateRequest.actionCreator;
export const editAssignmentTemplate: ThunkAction<AssignmentTemplate> = requests.updateAssignmentTemplateRequest.actionCreator;
export const deleteAssignmentTemplate: ThunkAction<Number> = requests.deleteAssignmentTemplateRequest.actionCreator;


// todo: the following
// export const swapAssignment = (assignmentId: number, oldBadgeNumber: number, newBadgeNumber: number) => actionCreator("ASSIGNMENT_SWAP")({ assignmentId, oldBadgeNumber, newBadgeNumber })
// export const linkAssignment = (assignmentId: number, badgeNumber: number) => actionCreator("ASSIGNMENT_LINK")({ assignmentId, badgeNumber });
// export const unlinkAssignment = (assignmentId: number, badgeNumber: number) => actionCreator("ASSIGNMENT_UNLINK")({ assignmentId, badgeNumber });

