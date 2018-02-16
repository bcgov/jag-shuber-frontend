import { Action } from 'redux'
import { ThunkAction } from '../../store'
import { SheriffAssignmentMap,
  Assignment,
  SheriffAssignmentTemplate 
} from "../../api/index";


// The following gives us type-safe redux actions
// see https://medium.com/@dhruvrajvanshi/some-tips-on-type-safety-with-redux-98588a85604c
// Todo: Would be great to make this more generic and factor it out into infrastructure, leaving as is for now

type IActionMap = {
  "ASSIGNMENT_LIST_BEGIN": null;
  "ASSIGNMENT_LIST_FAIL": string;
  "ASSIGNMENT_LIST_SUCCESS": SheriffAssignmentMap;
  "ASSIGNMENT_LINK": { assignmentId: number, badgeNumber: number };
  "ASSIGNMENT_UNLINK": { assignmentId: number, badgeNumber: number };
  "ASSIGNMENT_SWAP": { assignmentId: number, oldBadgeNumber: number, newBadgeNumber: number }; 
  "ASSIGNMENT_CREATE_BEGIN": null;
  "ASSIGNMENT_CREATE_SUCCESS": Assignment;
  "ASSIGNMENT_CREATE_FAIL": string;
  "ASSIGNMENT_TEMPLATE_LIST_BEGIN": null;
  "ASSIGNMENT_TEMPLATE_LIST_FAIL": string;
  "ASSIGNMENT_TEMPLATE_LIST_SUCCESS": SheriffAssignmentTemplate[];
  "ASSIGNMENT_TEMPLATE_CREATE_BEGIN": null;
  "ASSIGNMENT_TEMPLATE_CREATE_SUCCESS": SheriffAssignmentTemplate;
  "ASSIGNMENT_TEMPLATE_CREATE_FAIL": string;
  "ASSIGNMENT_TEMPLATE_EDIT_BEGIN": null;
  "ASSIGNMENT_TEMPLATE_EDIT_SUCCESS": SheriffAssignmentTemplate;
  "ASSIGNMENT_TEMPLATE_EDIT_FAIL": string;
  "ASSIGNMENT_TEMPLATE_DELETE_BEGIN": null;
  "ASSIGNMENT_TEMPLATE_DELETE_SUCCESS": number;
  "ASSIGNMENT_TEMPLATE_DELETE_FAIL": string;
}

export type IActionType = keyof IActionMap;

export type IActionPayload<K extends IActionType> = IActionMap[K];

interface IActionObject<K extends IActionType> extends Action {
  type: K,
  payload: IActionPayload<K>
}

export type IAction = {
  [P in IActionType]: IActionObject<P>
}[IActionType]

function actionCreator<Type extends IActionType>(type: Type) {
  return (payload: IActionPayload<Type>): IActionObject<Type> =>
    ({ type: type, payload: payload });
}

// Action creator for getting Assignemnt List
export const getAssignments: ThunkAction<void> = () => (async (dispatch, getState, { api }) => {
  dispatch(beginGetAssignments());
  try {
    let assignments = await api.getSheriffAssignments();
    dispatch(getAssignmentSuccess(assignments));
  } catch (error) {
    dispatch(getAssignmentFailed(`Error getting assignments: '${error}'`));
  }
});

export const swapAssignment = (assignmentId: number, oldBadgeNumber: number, newBadgeNumber: number) => actionCreator("ASSIGNMENT_SWAP")({ assignmentId, oldBadgeNumber, newBadgeNumber })
export const linkAssignment = (assignmentId: number, badgeNumber: number) => actionCreator("ASSIGNMENT_LINK")({ assignmentId, badgeNumber });
export const unlinkAssignment = (assignmentId: number, badgeNumber: number) => actionCreator("ASSIGNMENT_UNLINK")({ assignmentId, badgeNumber });
export const beginGetAssignments = () => actionCreator("ASSIGNMENT_LIST_BEGIN")(null);
export const getAssignmentFailed = actionCreator("ASSIGNMENT_LIST_FAIL");
export const getAssignmentSuccess = actionCreator("ASSIGNMENT_LIST_SUCCESS");

//Action creator for creating a new assignment
export const createAssignment: ThunkAction<Assignment> = (newAssignment: Assignment) => (async (dispatch, getState, { api }) => {
  dispatch(beginCreateAssignment());
  try {
    let assignment = await api.createAssignment(newAssignment);
    dispatch(createAssignmentSuccess(assignment));
  } catch (error) {
    dispatch(createAssignmentFailed(`Error creating assignment: '${error}'`));
  }
});

export const beginCreateAssignment = () => actionCreator("ASSIGNMENT_CREATE_BEGIN")(null);
export const createAssignmentSuccess = actionCreator("ASSIGNMENT_CREATE_SUCCESS");
export const createAssignmentFailed = actionCreator("ASSIGNMENT_CREATE_FAIL");

// Action creator for getting Assignemnt Template List
export const getAssignmentTemplates: ThunkAction<void> = () => (async (dispatch, getState, { api }) => {
  dispatch(beginGetAssignmentTemplates());
  try {
    let assignments = await api.getAssignmentTemplates();
    dispatch(getAssignmentTemplatesSuccess(assignments));
  } catch (error) {
    dispatch(getAssignmentTemplatesFailed(`Error getting assignments: '${error}'`));
  }
});

export const beginGetAssignmentTemplates = () => actionCreator("ASSIGNMENT_TEMPLATE_LIST_BEGIN")(null);
export const getAssignmentTemplatesFailed = actionCreator("ASSIGNMENT_TEMPLATE_LIST_FAIL");
export const getAssignmentTemplatesSuccess = actionCreator("ASSIGNMENT_TEMPLATE_LIST_SUCCESS"); 


//Action creator for creating a new assignment template
export const createAssignmentTemplate: ThunkAction<Partial<SheriffAssignmentTemplate>> = (newAssignmentTemplate: Partial<SheriffAssignmentTemplate>) => (async (dispatch, getState, { api }) => {
  dispatch(beginCreateAssignmentTemplate());
  try {
    let assignmentTemplate = await api.createAssignmentTemplate(newAssignmentTemplate);
    dispatch(createAssignmentTemplateSuccess(assignmentTemplate));
  } catch (error) {
    dispatch(createAssignmentTemplateFailed(`Error creating assignment template: '${error}'`));
  }
});

export const beginCreateAssignmentTemplate = () => actionCreator("ASSIGNMENT_TEMPLATE_CREATE_BEGIN")(null);
export const createAssignmentTemplateSuccess = actionCreator("ASSIGNMENT_TEMPLATE_CREATE_SUCCESS");
export const createAssignmentTemplateFailed = actionCreator("ASSIGNMENT_TEMPLATE_CREATE_FAIL");

//Action creator for editing an exisitng assignment template
export const editAssignmentTemplate: ThunkAction<SheriffAssignmentTemplate> = (updatedAssignmentTemplate: SheriffAssignmentTemplate) => (async (dispatch, getState, { api }) => {
  dispatch(beginCreateAssignmentTemplate());
  try {
    let assignmentTemplate = await api.editAssignmentTemplate(updatedAssignmentTemplate);
    dispatch(editAssignmentTemplateSuccess(assignmentTemplate));
  } catch (error) {
    dispatch(editAssignmentTemplateFailed(`Error saving updates assignment template: '${error}'`));
  }
});

export const beginEditAssignmentTemplate = () => actionCreator("ASSIGNMENT_TEMPLATE_EDIT_BEGIN")(null);
export const editAssignmentTemplateSuccess = actionCreator("ASSIGNMENT_TEMPLATE_EDIT_SUCCESS");
export const editAssignmentTemplateFailed = actionCreator("ASSIGNMENT_TEMPLATE_EDIT_FAIL");

//Action creator for deleting an exisitng assignment template
export const deleteAssignmentTemplate: ThunkAction<number> = (templateIdToDelete: number) => (async (dispatch, getState, { api }) => {
  dispatch(beginDeleteAssignmentTemplate());
  try {
    let assignmentTemplateId = await api.deleteAssignmentTemplate(templateIdToDelete);
    dispatch(deleteAssignmentTemplateSuccess(assignmentTemplateId));
  } catch (error) {
    dispatch(deleteAssignmentTemplateFailed(`Error deleting assignment template: '${error}'`));
  }
});

export const beginDeleteAssignmentTemplate = () => actionCreator("ASSIGNMENT_TEMPLATE_DELETE_BEGIN")(null);
export const deleteAssignmentTemplateSuccess = actionCreator("ASSIGNMENT_TEMPLATE_DELETE_SUCCESS");
export const deleteAssignmentTemplateFailed = actionCreator("ASSIGNMENT_TEMPLATE_DELETE_FAIL");