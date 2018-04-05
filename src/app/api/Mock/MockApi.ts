import * as moment from 'moment';
import {
    API,
    SheriffMap,
    Sheriff,
    Assignment,
    TrainingType,
    Courthouse,
    Courtroom,
    Region,
    AssignmentDuty,
    IdType,
    Shift,
    Leave,
    ShiftCopyOptions
} from '../Api';
import arrayToMap from '../../infrastructure/arrayToMap';
import {
    sheriffList,
    assignments,
    training,
    courthouses,
    COURTROOMS,
    courtrooms,
    regions,
    assignmentDuties,
    RUNS,
    JAIL_ROLES,
    ALTERNATE_ASSIGNMENTS,
    sheriffShifts,
    sheriffLeaves
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
        assignmentTitle = ALTERNATE_ASSIGNMENTS[assignment.alternateAssignmentId];
    }

    return assignmentTitle;
}

export default class NewClient implements API {
    private increasingId = 30;

    private getId(): number {
        return this.increasingId++;
    }

    async getSheriffs(): Promise<SheriffMap> {
        return arrayToMap(sheriffList, (s) => s.id) as SheriffMap;
    }
    async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
        await randomDelay();
        // This is a hack to throw in a profile picture
        if (!newSheriff.imageUrl) {
            newSheriff.imageUrl = '/img/avatar.png';
        }
        newSheriff.id = this.getId();
        newSheriff.title = `${newSheriff.lastName}, ${newSheriff.firstName}`;
        sheriffList.push(newSheriff);
        return newSheriff;
    }
    async updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff> {
        const index = sheriffList.findIndex(s => s.badgeNumber === sheriffToUpdate.badgeNumber);
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
        newAssignment.facilityId = 1;
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
    async deleteAssignment(assignmentId: number): Promise<void> {
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
        // dutyToAdd.startDateTime = moment(duty.startDateTime);
        // dutyToAdd.endDateTime = moment(duty.endDateTime);
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
        assignmentDuties[index] = dutyToUpdate;
        return dutyToUpdate;
    }

    async deleteAssignmentDuty(dutyId: number): Promise<void> {
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
    async getTrainingTypes(): Promise<TrainingType[]> {
        return training;
    }
    async getAllCourthouses(): Promise<Courthouse[]> {
        return courthouses;
    }
    async getCourthousesByRegion(regionId: number): Promise<Courthouse[]> {
        throw new Error('Method not implemented.');
    }
    async getRegions(): Promise<Region[]> {
        return regions;
    }
    async getAllCourtrooms(): Promise<Courtroom[]> {
        return courtrooms;
    }
    async getCourtroomsByCourthouse(courthouseId: number): Promise<Courtroom[]> {
        throw new Error('Method not implemented.');
    }

    async getShifts(): Promise<Shift[]> {
        return sheriffShifts;
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
            courthouseId: 1
        };

        sheriffShifts.push(shiftToAdd as Shift);

        return shiftToAdd as Shift;
    }

    async deleteShift(shiftId: IdType): Promise<void> {
        await randomDelay();
        if (shiftId == null) {
            throw new Error('No ID specified');
        }

        const shiftIndex = sheriffShifts.findIndex((shift) => shift.id === shiftId);
        if (shiftIndex < 0) {
            throw Error(`No shift could be located for ${shiftId}`);
        }

        sheriffShifts.splice(shiftIndex, 1); 
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

        shiftsToCopy.forEach(shift => sheriffShifts.push({...shift}));

        return shiftsToCopy;
    }

    async getLeaves(): Promise<Leave[]> {
        return sheriffLeaves;
    }
}