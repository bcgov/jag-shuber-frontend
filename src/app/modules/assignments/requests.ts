// import {
//     default as RequestAction,
//     RequestActionState
// } from "../../infrastructure/RequestAction";
// import {
//     AssignmentMap,
//     AssignmentMap,
//     AssignmentDutyMap,
//     Assignment,
//     Assignment
// } from "../../api";
// import { ThunkExtra } from "../../store";
// import arrayToMap from "../../infrastructure/arrayToMap";
// import { IdType } from "../../api/Api";



// // Assignment Map Request
// class AssignmentMapRequest extends RequestAction<void, AssignmentMap, AssignmentModuleState> {
//     constructor(namespace = STATE_KEY, actionName = "assignmentMap") {
//         super(namespace, actionName);
//     }
//     public async doWork(request: void, { api }: ThunkExtra): Promise<AssignmentMap> {
//         let assignments = await api.getAssignments();
//         return arrayToMap(assignments, a => a.id);
//     }
// }

// export const assignmentMapRequest = new AssignmentMapRequest();

// // Assignment Create
// class CreateAssignmentRequest extends RequestAction<Partial<Assignment>, Assignment, AssignmentModuleState> {
//     constructor(namespace = STATE_KEY, actionName = "createAssignment") {
//         super(namespace, actionName);
//     }
//     public async doWork(assignment: Partial<Assignment>, { api }: ThunkExtra): Promise<Assignment> {
//         let newAssignment = await api.createAssignment(assignment);
//         return newAssignment;
//     }

//     reduceSuccess(moduleState: AssignmentModuleState, action: { type: string, payload: Assignment }): AssignmentModuleState {
//         // Call the super's reduce success and pull out our state and
//         // the assignmentMap state
//         const {
//             assignmentMap: {
//                 data: assignmentMap = {},
//                 ...restAssignmentMap
//             } = {},
//             ...restState
//         } = super.reduceSuccess(moduleState, action);

//         // Create a new map and add our assignment to it
//         const newMap = { ...assignmentMap };
//         newMap[action.payload.id] = action.payload;

//         // Merge the state back together with the original in a new object
//         const newState: Partial<AssignmentModuleState> = {
//             ...restState,
//             assignmentMap: {
//                 ...restAssignmentMap,
//                 data: newMap
//             }
//         }
//         return newState;
//     }
// }

// export const createAssignmentRequest = new CreateAssignmentRequest();


// // Assignment Update
// class UpdateAssignmentRequest extends RequestAction<Partial<Assignment>, Assignment, AssignmentModuleState> {
//     constructor(namespace = STATE_KEY, actionName = "updateAssignment") {
//         super(namespace, actionName);
//     }
//     public async doWork(assignment: Partial<Assignment>, { api }: ThunkExtra): Promise<Assignment> {
//         let newAssignment = await api.updateAssignment(assignment);
//         return newAssignment;
//     }

//     reduceSuccess(moduleState: AssignmentModuleState, action: { type: string, payload: Assignment }): AssignmentModuleState {
//         // Call the super's reduce success and pull out our state and
//         // the assignmentMap state
//         const {
//             assignmentMap: {
//                 data: assignmentMap = {},
//                 ...restAssignmentMap
//             } = {},
//             ...restState
//         } = super.reduceSuccess(moduleState, action);

//         // Create a new map and add our assignment to it
//         const newMap = { ...assignmentMap };
//         newMap[action.payload.id] = action.payload;

//         // Merge the state back together with the original in a new object
//         const newState: Partial<AssignmentModuleState> = {
//             ...restState,
//             assignmentMap: {
//                 ...restAssignmentMap,
//                 data: newMap
//             }
//         }
//         return newState;
//     }
// }
// export const updateAssignmentRequest = new UpdateAssignmentRequest();


// Assignment Link
// todo:




