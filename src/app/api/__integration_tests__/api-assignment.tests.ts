// /**
//  * @jest-environment node
//  */
// import {
//     API,
//     CourtAssignment,
//     OtherAssignment,
//     JailAssignment,
//     EscortAssignment,
//     RecurrenceInfo,
//     IdType,
//     Assignment
// } from '../Api';
// import APIClient from '../Client';
// import { courthouseCode } from '../index';
// import * as TestUtils from '../../infrastructure/TestUtils';

// const DutyRecurrenceShape: RecurrenceInfo = {
//     id: 'some string',
//     assignmentIdPath: 'some string',
//     daysBitmap: 31,
//     startTime: '11:00:00',
//     endTime: '12:00:00',
//     sheriffsRequired: 3
// }

// const CourtAssignmentShape: CourtAssignment = {
//     courthouseId: 'to replace',
//     workSectionId: 'COURTS',
//     courtroomId: 'courtrooms/someid',
//     id: 'someString',
//     title: 'Some title string',
//     dutyRecurrences: [
//         DutyRecurrenceShape
//     ]
// };

// const EscortAssignmentShape: EscortAssignment = {
//     workSectionId: 'ESCORTS',
//     id: 'some string',
//     courthouseId: 'some string',
//     title: 'Some escort title',
//     runId: 'some string',
//     dutyRecurrences: [
//         DutyRecurrenceShape
//     ]
// };

// const JailAssignmentShape: JailAssignment = {
//     workSectionId: 'JAIL',
//     id: 'some string',
//     courthouseId: 'some string',
//     title: 'Some escort title',
//     jailRoleId: ' some string',
//     dutyRecurrences: [
//         DutyRecurrenceShape
//     ]
// };

// const OtherAssignmentShape: OtherAssignment = {
//     workSectionId: 'OTHER',
//     id: 'some string',
//     courthouseId: 'some string',
//     title: 'Some escort title',
//     otherAssignmentTypeId: 'some string',
//     dutyRecurrences: [
//         DutyRecurrenceShape
//     ]
// };

// describe('Client Assignment API', () => {
//     let client: API;
//     let currentCourthousePath: string;

//     beforeEach(async (done) => {
//         client = new APIClient('http://api-test.192.168.99.100.nip.io/api', courthouseCode);
//         currentCourthousePath = await (client as APIClient).getCurrentCourtHousePath();
//         done();
//     });

//     async function deleteResources(idPaths: IdType[]): Promise<void> {
//         await Promise.all(
//             idPaths.filter(id => id !== undefined)
//                 .map(async (id) => {
//                     try {
//                         await (client as APIClient).deleteResource(id);
//                         console.log(`Deleted '${id}'`);
//                     } catch (e) {
//                         console.error(`Error deleting '${id}', ${e.message}`);
//                         throw e;
//                     }
//                 }
//                 )
//         );
//     }

//     describe('Get Assignments', () => {
//         it('Should return assignments', async () => {
//             let list = await client.getAssignments();
//             expect(list).toBeDefined();
//             expect(Array.isArray(list)).toBeTruthy();
//             let item = list[0];
//             expect(item).toMatchOneOf([
//                 CourtAssignmentShape,
//                 EscortAssignmentShape,
//                 JailAssignmentShape,
//                 OtherAssignmentShape
//             ]);
//         });
//     });

//     describe('Create & Delete Recurrence', () => {
//         it('Should create a duty recurrence', async () => {
//             const recurrencesToCreate = [
//                 {
//                     sheriffsRequired: 2,
//                     startTime: '11:00',
//                     endTime: '12:00',
//                     daysBitmap: 12
//                 }
//             ];
//             expect.assertions(1 + recurrencesToCreate.length);
//             let list = await client.getAssignments();
//             let assignment = list[0];

//             let createdRecurrences = await (client as APIClient)
//                 .createRecurrences(assignment.id, recurrencesToCreate) as RecurrenceInfo[];


//             expect(createdRecurrences[0]).toMatchShapeOf(DutyRecurrenceShape);
//             const idsToDelete = createdRecurrences.map(r => r.id as IdType)
//                 .filter(idPath => idPath !== undefined);

//             // expect to delete with no issue
//             await deleteResources(idsToDelete);
//             await Promise.all(idsToDelete.map(async (id) => await TestUtils.expectNoResource(client, id)));
//         });
//     });

//     describe('Create & Delete Assignment', () => {

//         const newDutyRecurrence: RecurrenceInfo = {
//             startTime: '10:00:00',
//             endTime: '12:00:00',
//             daysBitmap: 31,
//             sheriffsRequired: 2
//         };

//         let newCourtAssignment: Partial<CourtAssignment> = {
//             courthouseId: 'to replace',
//             courtroomId: 'to replace',
//             title: 'Some Court Assignment',
//             workSectionId: 'COURTS',
//             dutyRecurrences: [
//                 { ...newDutyRecurrence }
//             ]
//         };

//         let createdAssignment : Assignment;

//         beforeAll(async (done) => {
//             const courtrooms = await client.getCourtrooms();
//             newCourtAssignment.courtroomId = courtrooms[0].id;
//             done();
//         });

//         it('Should return created assignment with ids', async () => {
//             expect.assertions(3);
//             createdAssignment = await client.createAssignment(newCourtAssignment);
//             expect(createdAssignment).toBeDefined();
//             expect(createdAssignment).toMatchShapeOf(CourtAssignmentShape);
//             expect(createdAssignment.id).not.toBe(newCourtAssignment.id);            
//         });

//         it('Should delete an assigment and its duty recurrences', async () => {
//             // We have 1 for expecting no assignment + 1 for each duty recurrence check
//             expect.assertions(1 + newCourtAssignment.dutyRecurrences!.length);
//             // Test the delete from the API
//             await client.deleteAssignment(createdAssignment.id);
//             try{
//             // Check that all resources are no longer present
//             await TestUtils.expectNoResource(client, createdAssignment.id);
//             await Promise.all(
//                 createdAssignment.dutyRecurrences!
//                     .map(async r => await TestUtils.expectNoResource(client, r.id)));
//             }catch(exc){
//                 console.log(exc);
//             }
//         });
//     });

    
// });


