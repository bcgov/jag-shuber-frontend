// import moment from 'moment';
// import {
//     API,
//     Sheriff,
//     Assignment,
//     Courtroom,
//     AssignmentDuty,
//     IdType,
//     Shift,
//     ShiftCopyOptions,
//     EscortRun,
//     JailRole,
//     AlternateAssignment,
//     SheriffDuty,
//     Location,
//     ShiftUpdates,
//     SheriffRank,
//     Leave,
//     LeaveSubCode,
//     LeaveCancelCode,
//     CourtRole,
//     GenderCode,
//     SheriffDutyReassignmentDetails
// } from '../Api';
// import {
//     sheriffList,
//     assignments,
//     // training,
//     // courthouses,
//     COURTROOMS,
//     // courtrooms,
//     // regions,
//     assignmentDuties,
//     RUNS,
//     JAIL_ROLES,
//     ALTERNATE_ASSIGNMENTS,
//     sheriffShifts,
//     sheriffLeaves,
//     // sheriffLeaves,
// } from './MockData';
// import {
//     isCourtAssignment,
//     isJailAssignment,
//     isEscortAssignment,
//     isOtherAssignment
// } from '../utils';
// import { randomDelay } from '../PromiseExtensions';
// import avatarImg from '../../assets/images/avatar.png';

// // Helpers
// function getAssignmentTitle(assignment: Partial<Assignment>): string {
//     let assignmentTitle = 'Assignment Title';

//     if (isCourtAssignment(assignment)) {
//         assignmentTitle = assignment.courtroomId ? COURTROOMS[assignment.courtroomId] : 'Title not found';
//     } else if (isEscortAssignment(assignment)) {
//         assignmentTitle = RUNS[assignment.escortRunId];
//     } else if (isJailAssignment(assignment)) {
//         assignmentTitle = JAIL_ROLES[assignment.jailRoleCode];
//     } else if (isOtherAssignment(assignment)) {
//         assignmentTitle = ALTERNATE_ASSIGNMENTS[assignment.otherAssignCode];
//     }

//     return assignmentTitle;
// }

// export default class MockClient implements API {
//     autoAssignSheriffDuties(date?: string | moment.Moment | Date | undefined): Promise<SheriffDuty[]> {
//         throw new Error('Method not implemented.');
//     }
//     reassignSheriffDuty(reassignmentDetails: SheriffDutyReassignmentDetails): Promise<SheriffDuty[]> {
//         throw new Error("Method not implemented.");
//     }
//     getToken(): Promise<string> {
//         throw new Error('Method not implemented.');
//     }
//     logout(): Promise<void> {
//         throw new Error('Method not implemented.');
//     }
//     getGenderCodes(): Promise<GenderCode[]> {
//         throw new Error("Method not implemented.");
//     }
    
//     getCourtRoles(): Promise<CourtRole[]> {
//         throw new Error("Method not implemented.");
//     }

//     getLeaveSubCodes(): Promise<LeaveSubCode[]> {
//         throw new Error("Method not implemented.");
//     }
//     getLeaveCancelCodes(): Promise<LeaveCancelCode[]> {
//         throw new Error("Method not implemented.");
//     }
//     getSheriffRankCodes(): Promise<SheriffRank[]> {
//         throw new Error("Method not implemented.");
//     }
//     getLocations(): Promise<Location[]> {
//         throw new Error("Method not implemented.");
//     }
//     deleteDutyRecurrence(recurrenceId: string): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
//     createSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
//         throw new Error("Method not implemented.");
//     }
//     updateSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
//         throw new Error("Method not implemented.");
//     }
//     deleteSheriffDuty(sheriffDutyId: string): Promise<void> {
//         throw new Error("Method not implemented.");
//     }

//     private increasingId = 30;

//     private getId(): IdType {
//         return `0000-00000-${this.increasingId++}`;
//     }

//     private modifyShift(shiftToUpdate: Shift, updateDetails: ShiftUpdates): Shift {
//         let updatedShift = shiftToUpdate;
//         if (updateDetails) {
//             const newSheriffId = updateDetails.sheriffId;
//             const newWorkSectionId = updateDetails.workSectionId;
//             const newStartTime = updateDetails.startTime;
//             const newEndTime = updateDetails.endTime;
//             if (newSheriffId !== 'varied') {
//                 updatedShift.sheriffId = newSheriffId;
//             }
//             if (newWorkSectionId !== 'varied') {
//                 updatedShift.workSectionId = newWorkSectionId;
//             }
//             if (newStartTime) {
//                 const newHours = moment(newStartTime).hour();
//                 const newMinutes = moment(newStartTime).minute();

//                 updatedShift.startDateTime = moment(updatedShift.startDateTime).hour(newHours).minute(newMinutes);
//             }
//             if (newEndTime) {
//                 const newHours = moment(newEndTime).hour();
//                 const newMinutes = moment(newEndTime).minute();

//                 updatedShift.endDateTime = moment(updatedShift.endDateTime).hour(newHours).minute(newMinutes);
//             }
//         }
//         return updatedShift;
//     }

//     async init(): Promise<void> {
//         await randomDelay();
//     }

//     async getSheriffs(): Promise<Sheriff[]> {
//         return sheriffList;
//     }
//     async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
//         await randomDelay();
//         // This is a hack to throw in a profile picture
//         if (!newSheriff.imageUrl) {
//             newSheriff.imageUrl = avatarImg;
//         }
//         newSheriff.id = this.getId();
//         sheriffList.push(newSheriff);
//         return newSheriff;
//     }
//     async updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff> {
//         const index = sheriffList.findIndex(s => s.badgeNo === sheriffToUpdate.badgeNo);
//         await randomDelay();
//         sheriffList[index] = Object.assign({}, sheriffList[index], sheriffToUpdate);
//         return sheriffList[index];
//     }
//     async getAssignments(): Promise<Assignment[]> {
//         return assignments;
//     }
//     async createAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
//         await randomDelay();

//         let newAssignment = assignment as Assignment;
//         newAssignment.id = this.getId();
//         newAssignment.title = getAssignmentTitle(assignment);
//         // todo: will eventually need to tie to the user and their facility - hard coded for now
//         newAssignment.locationId = '1';
//         assignments.push(newAssignment);

//         return newAssignment;
//     }

//     async updateAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
//         await randomDelay();
//         if (assignment.id == null) {
//             throw Error('No Template Id Specified');
//         }
//         let assignmentToUpdate = assignment as Assignment;
//         assignmentToUpdate.title = getAssignmentTitle(assignment);

//         let index = assignments.findIndex(a => a.id === assignmentToUpdate.id);
//         if (index < 0) {
//             throw Error(`No assignment could be located for ${assignmentToUpdate.id}`);
//         }

//         assignments[index] = assignmentToUpdate;
//         return assignmentToUpdate;
//     }
//     async deleteAssignment(assignmentId: IdType): Promise<void> {
//         if (assignmentId == null) {
//             throw new Error('No ID specified');
//         }

//         const assignmentIndex = assignments.findIndex((value) => value.id === assignmentId);
//         if (assignmentIndex < 0) {
//             throw Error(`No template could be located for ${assignmentId}`);
//         }

//         assignments.splice(assignmentIndex, 1);
//     }
//     async getAssignmentDuties(): Promise<AssignmentDuty[]> {
//         let returnVal = assignmentDuties;
//         return returnVal;
//     }
//     async createAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
//         let dutyToAdd = duty as AssignmentDuty;
//         dutyToAdd.id = this.getId();
//         if (duty.sheriffDuties) {
//             dutyToAdd.sheriffDuties = duty.sheriffDuties.map((element: any) => ({
//                 ...element,
//                 id: this.getId(),
//                 dutyId: dutyToAdd.id
//             }));
//         }
//         assignmentDuties.push(dutyToAdd);
//         return dutyToAdd;
//     }

//     async updateAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
//         await randomDelay();
//         if (duty.id == null) {
//             throw Error('No Template Id Specified');
//         }
//         let dutyToUpdate = duty as AssignmentDuty;

//         let index = assignmentDuties.findIndex(d => d.id === dutyToUpdate.id);
//         if (index < 0) {
//             throw Error(`No assignment could be located for ${dutyToUpdate.id}`);
//         }
//         if (duty.sheriffDuties) {
//             dutyToUpdate.sheriffDuties = duty.sheriffDuties.map((sd: any) => ({
//                 ...sd,
//                 id: sd.id ? sd.id : this.getId(),
//                 dutyId: dutyToUpdate.id
//             }));
//         }
//         assignmentDuties[index] = dutyToUpdate;
//         return dutyToUpdate;
//     }

//     async deleteAssignmentDuty(dutyId: IdType): Promise<void> {
//         await randomDelay();
//         if (dutyId == null) {
//             throw new Error('No ID specified');
//         }

//         const dutyIndex = assignments.findIndex((value) => value.id === dutyId);
//         if (dutyIndex < 0) {
//             throw Error(`No duty could be located for ${dutyId}`);
//         }

//         assignmentDuties.splice(dutyIndex, 1);
//     }

//     createDefaultDuties(date: moment.Moment): Promise<AssignmentDuty[]> {
//         throw new Error("Method not implemented.");
//     }

//     async getShifts(): Promise<Shift[]> {
//         return sheriffShifts;
//     }

//     async updateMultipleShifts(shiftIds: IdType[], shiftUpdates: ShiftUpdates): Promise<Shift[]> {
//         await randomDelay();

//         if (!shiftIds) {
//             throw new Error('No ID specified');
//         }

//         let updatedShifts: Shift[] = [];

//         shiftIds.forEach(shiftId => {
//             const shiftIndex = sheriffShifts.findIndex((shift) => shift.id === shiftId);
//             if (shiftIndex < 0) {
//                 throw Error(`No shift could be located for ${shiftId}`);
//             }
//             updatedShifts.push(this.modifyShift(sheriffShifts[shiftIndex], shiftUpdates));
//         });

//         return updatedShifts;
//     }

//     async updateShift(shiftToUpdate: Partial<Shift>): Promise<Shift> {
//         await randomDelay();
//         if (shiftToUpdate.id == null) {
//             throw Error('No Shift Id Specified');
//         }
//         let updatedShift = shiftToUpdate as Shift;

//         let index = sheriffShifts.findIndex(s => s.id === updatedShift.id);
//         if (index < 0) {
//             throw Error(`No Shift could be located for ${updatedShift.id}`);
//         }

//         // todo: Should probably do a merge (i.e. patch of the objects here)
//         sheriffShifts[index] = updatedShift;
//         return updatedShift;
//     }


//     async createShift(newShift: Partial<Shift>): Promise<Shift> {
//         await randomDelay();
//         const shiftToAdd = {
//             ...newShift,
//             id: this.getId(),
//             courthouseId: '1'
//         };

//         sheriffShifts.push(shiftToAdd as Shift);

//         return shiftToAdd as Shift;
//     }

//     async deleteShift(shiftIds: IdType[] = []): Promise<void> {
//         await randomDelay();
//         if (!shiftIds || shiftIds.length < 1) {
//             throw new Error('No ID specified');
//         }

//         shiftIds.forEach(shiftId => {
//             const shiftIndex = sheriffShifts.findIndex((shift) => shift.id === shiftId);
//             if (shiftIndex < 0) {
//                 throw Error(`No shift could be located for ${shiftId}`);
//             }
//             sheriffShifts.splice(shiftIndex, 1);
//         });
//     }

//     async copyShifts(shiftCopyDetails: ShiftCopyOptions): Promise<Shift[]> {
//         await randomDelay();
//         const { startOfWeekSource, shouldIncludeSheriffs, startOfWeekDestination } = shiftCopyDetails;
//         const shiftsToCopy = sheriffShifts
//             .filter(s => moment(s.startDateTime).isSame(startOfWeekSource, 'week'))
//             .map<Shift>(s =>
//                 ({
//                     ...s,
//                     id: this.getId(),
//                     startDateTime: moment(s.startDateTime).week(moment(startOfWeekDestination).week()),
//                     endDateTime: moment(s.endDateTime).week(moment(startOfWeekDestination).week()),
//                     sheriffId: shouldIncludeSheriffs ? s.sheriffId : undefined
//                 })
//             );

//         shiftsToCopy.forEach(shift => sheriffShifts.push({ ...shift }));

//         return shiftsToCopy;
//     }

//     async getLeaves(): Promise<Leave[]> {
//         return Object.keys(sheriffLeaves).map(k => sheriffLeaves[k]);
//     }

//     createLeave(newLeave: Partial<Leave>): Promise<Leave> {
//         const id = this.getId();
//         const leave = { ...newLeave, id } as Leave;
//         sheriffLeaves[id] = leave;
//         return Promise.resolve({ ...leave });
//     }
//     updateLeave(updatedLeave: Leave): Promise<Leave> {
//         if (updatedLeave.id) {
//             sheriffLeaves[updatedLeave.id] = { ...updatedLeave };
//             return Promise.resolve({ ...updatedLeave });
//         } else {
//             return Promise.reject("No leave id provided");
//         }
//     }
//     getCourtrooms(): Promise<Courtroom[]> {
//         throw new Error("Method not implemented.");
//     }

//     getEscortRuns(): Promise<EscortRun[]> {
//         throw new Error("Method not implemented.");
//     }

//     getJailRoles(): Promise<JailRole[]> {
//         throw new Error("Method not implemented.");
//     }

//     getAlternateAssignmentTypes(): Promise<AlternateAssignment[]> {
//         throw new Error("Method not implemented.");
//     }

// }