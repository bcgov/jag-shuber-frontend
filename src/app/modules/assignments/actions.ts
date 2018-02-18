import * as assignmentRequests from './requests/assignments'
import * as assignmentDutyRequests from './requests/assignmentDuties'
import * as assignmentTemplateRequests from './requests/assignmentTemplates'



// Assignments
export const getAssignments = assignmentRequests.assignmentMapRequest.actionCreator;
export const createAssignment= assignmentRequests.createAssignmentRequest.actionCreator;
export const editAssignment= assignmentRequests.updateAssignmentRequest.actionCreator;
export const deleteAssignment = assignmentRequests.deleteAssignmentRequest.actionCreator;

// Assignment Templates
export const getAssignmentTemplates = assignmentTemplateRequests.assignmentTemplateMapRequest.actionCreator;
export const createAssignmentTemplate = assignmentTemplateRequests.createAssignmentTemplateRequest.actionCreator;
export const editAssignmentTemplate  = assignmentTemplateRequests.updateAssignmentTemplateRequest.actionCreator;
export const deleteAssignmentTemplate = assignmentTemplateRequests.deleteAssignmentTemplateRequest.actionCreator;

// Assignment Duties
export const getAssignmentDuties = assignmentDutyRequests.assignmentDutyMapRequest.actionCreator;
export const createAssignmentDuty = assignmentDutyRequests.createAssignmentDutyRequest.actionCreator;
export const editAssignmentDuty = assignmentDutyRequests.updateAssignmentDutyRequest.actionCreator;
export const deleteAssignmentDuty = assignmentDutyRequests.deleteAssignmentDutyRequest.actionCreator;



// todo: the following
// export const swapAssignment = (assignmentId: number, oldBadgeNumber: number, newBadgeNumber: number) => actionCreator("ASSIGNMENT_SWAP")({ assignmentId, oldBadgeNumber, newBadgeNumber })
// export const linkAssignment = (assignmentId: number, badgeNumber: number) => actionCreator("ASSIGNMENT_LINK")({ assignmentId, badgeNumber });
// export const unlinkAssignment = (assignmentId: number, badgeNumber: number) => actionCreator("ASSIGNMENT_UNLINK")({ assignmentId, badgeNumber });

