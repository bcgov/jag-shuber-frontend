import * as moment from 'moment';
import {
    API,
    Sheriff,
    Assignment,
    // TrainingType,
    // Courthouse,
    Courtroom,
    // Region,
    AssignmentDuty,
    IdType,
    Shift,
    Leave,
    ShiftCopyOptions,
    Run,
    JailRole,
    AlternateAssignment,
    SheriffDuty,
    AssignmentDutyDetails,
    Courthouse,
    ShiftUpdates
} from '../Api';
import {
    sheriffList,
    assignments,
    // training,
    // courthouses,
    COURTROOMS,
    // courtrooms,
    // regions,
    assignmentDuties,
    RUNS,
    JAIL_ROLES,
    ALTERNATE_ASSIGNMENTS,
    sheriffShifts,
    sheriffLeaves,
    assignmentDutyDetails
} from './MockData';
import {
    isCourtAssignment,
    isJailAssignment,
    isEscortAssignment,
    isOtherAssignment
} from '../utils';
import { randomDelay } from '../PromiseExtensions';

// Helpers
function getAssignmentTitle(assignment: Partial<Assignment>): string {
    let assignmentTitle = 'Assignment Title';

    if (isCourtAssignment(assignment)) {
        assignmentTitle = COURTROOMS[assignment.courtroomId];
    } else if (isEscortAssignment(assignment)) {
        assignmentTitle = RUNS[assignment.runId];
    } else if (isJailAssignment(assignment)) {
        assignmentTitle = JAIL_ROLES[assignment.jailRoleId];
    } else if (isOtherAssignment(assignment)) {
        assignmentTitle = ALTERNATE_ASSIGNMENTS[assignment.otherAssignmentTypeId];
    }

    return assignmentTitle;
}

export default class MockClient implements API {
    getCourthouses(): Promise<Courthouse[]> {
        throw new Error("Method not implemented.");
    }
    async createAssignmentDutyDetails(dutyDetails: Partial<AssignmentDutyDetails>): Promise<AssignmentDutyDetails> {
        const newDutyDetails: AssignmentDutyDetails = {
            id: this.getId(),
            assignmentDutyId: dutyDetails.assignmentDutyId ? dutyDetails.assignmentDutyId : this.getId(),
            comments: dutyDetails.comments
        };
        assignmentDutyDetails.push(newDutyDetails);
        return newDutyDetails; 
    }
    
    async updateAssignmentDutyDetails(dutyDetails: Partial<AssignmentDutyDetails>): Promise<AssignmentDutyDetails> {
        const index = assignmentDutyDetails.findIndex(dd => dd.assignmentDutyId === dutyDetails.assignmentDutyId);
        await randomDelay();
        if (index > -1) {
            assignmentDutyDetails[index] = Object.assign({}, assignmentDutyDetails[index], dutyDetails);
            return assignmentDutyDetails[index];
        } else {
            const newDutyDetails: AssignmentDutyDetails = {
                id: this.getId(),
                assignmentDutyId: dutyDetails.assignmentDutyId ? dutyDetails.assignmentDutyId : this.getId(),
                comments: dutyDetails.comments
            };
            assignmentDutyDetails.push(newDutyDetails);
            return newDutyDetails; 
        }
    }
    async getAssignmentDutyDetails(): Promise<AssignmentDutyDetails[]> {
        return assignmentDutyDetails;
    }
    deleteDutyRecurrence(recurrenceId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
        throw new Error("Method not implemented.");
    }
    updateSheriffDuty(sheriffDuty: Partial<SheriffDuty>): Promise<SheriffDuty> {
        throw new Error("Method not implemented.");
    }
    deleteSheriffDuty(sheriffDutyId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private increasingId = 30;

    private getId(): IdType {
        return `0000-00000-${this.increasingId++}`;
    }

    private modifyShift(shiftToUpdate: Shift, updateDetails: ShiftUpdates): Shift {
        let updatedShift = shiftToUpdate;
        if (updateDetails) {
            const newSheriffId = updateDetails.sheriffId;
            const newWorkSectionId = updateDetails.workSectionId;
            if (newSheriffId !== 'varied') {
                updatedShift.sheriffId = updateDetails.sheriffId;
            }
            if (newWorkSectionId !== 'varied') {
                updatedShift.workSectionId = updateDetails.workSectionId;
            }
        }
        return updatedShift;
    }

    async init(): Promise<void> {
        await randomDelay();
    }

    async getSheriffs(): Promise<Sheriff[]> {
        return sheriffList;
    }
    async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
        await randomDelay();
        // This is a hack to throw in a profile picture
        if (!newSheriff.imageUrl) {
            newSheriff.imageUrl = '/img/avatar.png';
        }
        newSheriff.id = this.getId();
        sheriffList.push(newSheriff);
        return newSheriff;
    }
    async updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff> {
        const index = sheriffList.findIndex(s => s.badgeNo === sheriffToUpdate.badgeNo);
        await randomDelay();
        sheriffList[index] = Object.assign({}, sheriffList[index], sheriffToUpdate);
        return sheriffList[index];
    }
    async getAssignments(): Promise<Assignment[]> {
        return assignments;
    }
    async createAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        await randomDelay();

        let newAssignment = assignment as Assignment;
        newAssignment.id = this.getId();
        newAssignment.title = getAssignmentTitle(assignment);
        // todo: will eventually need to tie to the user and their facility - hard coded for now
        newAssignment.courthouseId = '1';
        assignments.push(newAssignment);

        return newAssignment;
    }

    async updateAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        await randomDelay();
        if (assignment.id == null) {
            throw Error('No Template Id Specified');
        }
        let assignmentToUpdate = assignment as Assignment;
        assignmentToUpdate.title = getAssignmentTitle(assignment);

        let index = assignments.findIndex(a => a.id === assignmentToUpdate.id);
        if (index < 0) {
            throw Error(`No assignment could be located for ${assignmentToUpdate.id}`);
        }

        assignments[index] = assignmentToUpdate;
        return assignmentToUpdate;
    }
    async deleteAssignment(assignmentId: IdType): Promise<void> {
        if (assignmentId == null) {
            throw new Error('No ID specified');
        }

        const assignmentIndex = assignments.findIndex((value) => value.id === assignmentId);
        if (assignmentIndex < 0) {
            throw Error(`No template could be located for ${assignmentId}`);
        }

        assignments.splice(assignmentIndex, 1);
    }
    async getAssignmentDuties(): Promise<AssignmentDuty[]> {
        let returnVal = assignmentDuties;
        return returnVal;
    }
    async createAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        let dutyToAdd = duty as AssignmentDuty;
        dutyToAdd.id = this.getId();
        if (duty.sheriffDuties) {
            dutyToAdd.sheriffDuties = duty.sheriffDuties.map((element: any) => ({
                ...element,
                id: this.getId(),
                dutyId: dutyToAdd.id
            }));
        }
        assignmentDuties.push(dutyToAdd);
        return dutyToAdd;
    }

    async updateAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        await randomDelay();
        if (duty.id == null) {
            throw Error('No Template Id Specified');
        }
        let dutyToUpdate = duty as AssignmentDuty;

        let index = assignmentDuties.findIndex(d => d.id === dutyToUpdate.id);
        if (index < 0) {
            throw Error(`No assignment could be located for ${dutyToUpdate.id}`);
        }
        if (duty.sheriffDuties) {
            dutyToUpdate.sheriffDuties = duty.sheriffDuties.map((sd: any) => ({
                ...sd,
                id: sd.id ? sd.id : this.getId(),
                dutyId: dutyToUpdate.id
            }));
        }
        assignmentDuties[index] = dutyToUpdate;
        return dutyToUpdate;
    }

    async deleteAssignmentDuty(dutyId: IdType): Promise<void> {
        await randomDelay();
        if (dutyId == null) {
            throw new Error('No ID specified');
        }

        const dutyIndex = assignments.findIndex((value) => value.id === dutyId);
        if (dutyIndex < 0) {
            throw Error(`No duty could be located for ${dutyId}`);
        }

        assignmentDuties.splice(dutyIndex, 1);
    }

    createDefaultDuties(date: moment.Moment): Promise<AssignmentDuty[]> {
        throw new Error("Method not implemented.");
    }

    async getShifts(): Promise<Shift[]> {
        return sheriffShifts;
    }

    async updateSelectedShifts(shiftIds: IdType[], shiftUpdates: ShiftUpdates): Promise<Shift[]> {
        await randomDelay();
        
        if (!shiftIds) {
            throw new Error('No ID specified');
        }

        let updatedShifts: Shift[] = [];

        shiftIds.forEach(shiftId => {
            const shiftIndex = sheriffShifts.findIndex((shift) => shift.id === shiftId);
            if (shiftIndex < 0) {
                throw Error(`No shift could be located for ${shiftId}`);
            }
            updatedShifts.push(this.modifyShift(sheriffShifts[shiftIndex], shiftUpdates));
        });

        return updatedShifts;
    }

    async updateShift(shiftToUpdate: Partial<Shift>): Promise<Shift> {
        await randomDelay();
        if (shiftToUpdate.id == null) {
            throw Error('No Shift Id Specified');
        }
        let updatedShift = shiftToUpdate as Shift;

        let index = sheriffShifts.findIndex(s => s.id === updatedShift.id);
        if (index < 0) {
            throw Error(`No Shift could be located for ${updatedShift.id}`);
        }

        // todo: Should probably do a merge (i.e. patch of the objects here)
        sheriffShifts[index] = updatedShift;
        return updatedShift;
    }


    async createShift(newShift: Partial<Shift>): Promise<Shift> {
        await randomDelay();
        const shiftToAdd = {
            ...newShift,
            id: this.getId(),
            courthouseId: '1'
        };

        sheriffShifts.push(shiftToAdd as Shift);

        return shiftToAdd as Shift;
    }

    async deleteShift(shiftIds: IdType[]): Promise<void> {
        await randomDelay();
        if (!shiftIds) {
            throw new Error('No ID specified');
        }

        shiftIds.forEach(shiftId => {
            const shiftIndex = sheriffShifts.findIndex((shift) => shift.id === shiftId);
            if (shiftIndex < 0) {
                throw Error(`No shift could be located for ${shiftId}`);
            }
            sheriffShifts.splice(shiftIndex, 1);
        });
    }

    async copyShifts(shiftCopyDetails: ShiftCopyOptions): Promise<Shift[]> {
        await randomDelay();
        const { startOfWeekSource, shouldIncludeSheriffs, startOfWeekDestination } = shiftCopyDetails;
        const shiftsToCopy = sheriffShifts
            .filter(s => moment(s.startDateTime).isSame(startOfWeekSource, 'week'))
            .map<Shift>(s =>
                ({
                    ...s,
                    id: this.getId(),
                    startDateTime: moment(s.startDateTime).week(moment(startOfWeekDestination).week()),
                    endDateTime: moment(s.endDateTime).week(moment(startOfWeekDestination).week()),
                    sheriffId: shouldIncludeSheriffs ? s.sheriffId : undefined
                })
            );

        shiftsToCopy.forEach(shift => sheriffShifts.push({ ...shift }));

        return shiftsToCopy;
    }

    async getLeaves(): Promise<Leave[]> {
        return sheriffLeaves;
    }

    getCourtrooms(): Promise<Courtroom[]> {
        throw new Error("Method not implemented.");
    }

    getRuns(): Promise<Run[]> {
        throw new Error("Method not implemented.");
    }

    getJailRoles(): Promise<JailRole[]> {
        throw new Error("Method not implemented.");
    }

    getAlternateAssignmentTypes(): Promise<AlternateAssignment[]> {
        throw new Error("Method not implemented.");
    }

}