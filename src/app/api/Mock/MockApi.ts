import {
    API,
    SheriffMap,
    Sheriff,
    Assignment,
    TrainingType,
    Courthouse,
    Courtroom,
    Region,
    AssignmentDuty
} from "../Api";
import arrayToMap from '../../infrastructure/arrayToMap'
import {
    sheriffList,
    assignments,
    training,
    courthouses,
    WORK_SECTIONS,
    COURTROOMS,
    courtrooms,
    regions,
    assignmentDuties,
    JAIL_ROLES
} from "./MockData";
import { randomDelay } from "../PromiseExtensions";


// Helpers
function getAssignmentTitle(assignment: Partial<Assignment>): string {
    let assignmentTitle = "Assignment Title";

    if (assignment.workSectionId) {
        assignmentTitle = WORK_SECTIONS[assignment.workSectionId];
        switch (WORK_SECTIONS[assignment.workSectionId]) {
            case WORK_SECTIONS.COURTS:
                if (assignment.location && assignment.location.courtroomId) {
                    assignmentTitle = COURTROOMS[assignment.location.courtroomId];
                }
                break;
            case WORK_SECTIONS.JAIL:
                if (assignment.extraDetails && assignment.extraDetails.jailRoleId) {
                    assignmentTitle = JAIL_ROLES[assignment.extraDetails.jailRoleId]
                }
                break;
        }
    }
    return assignmentTitle;
}


export default class NewClient implements API {
    private increasingId = 30;
    private getId(): number {
        return this.increasingId++;
    }
    async getSheriffs(): Promise<SheriffMap> {
        return arrayToMap(sheriffList, (s) => s.badgeNumber) as SheriffMap;
    }
    async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
        await randomDelay();

        //This is a hack to throw in a profile picture
        if (!newSheriff.imageUrl) {
            newSheriff.imageUrl = "/img/avatar.png"
        }

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
        newAssignment.facilityId = 1; //hard coded for now - will eventually need to tie to the user and their facility
        assignments.push(newAssignment);

        return newAssignment;
    }

    async updateAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        await randomDelay();
        if (assignment.id == null) {
            throw Error("No Template Id Specified");
        }
        let assignmentToUpdate = assignment as Assignment;

        let index = assignments.findIndex(a => a.id == assignmentToUpdate.id);
        if (index < 0) {
            throw Error(`No assignment could be located for ${assignmentToUpdate.id}`)
        }

        assignments[index] = assignmentToUpdate;
        return assignmentToUpdate;
    }
    async deleteAssignment(assignmentId: number): Promise<void> {
        if (assignmentId == null) {
            throw new Error("No ID specified");
        }

        const assignmentIndex = assignments.findIndex((value) => value.id == assignmentId);
        if (assignmentIndex < 0) {
            throw Error(`No template could be located for ${assignmentId}`)
        }

        assignments.splice(assignmentIndex, 1);
    }
    async getAssignmentDuties(): Promise<AssignmentDuty[]> {
        let returnVal = assignmentDuties;
        return returnVal;
    }
    async createAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        throw new Error("Method not implemented.");
    }
    async updateAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty> {
        throw new Error("Method not implemented.");
    }
    async deleteAssignmentDuty(dutyId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getTrainingTypes(): Promise<TrainingType[]> {
        return training;
    }
    async getAllCourthouses(): Promise<Courthouse[]> {
        return courthouses;
    }
    async getCourthousesByRegion(regionId: number): Promise<Courthouse[]> {
        throw new Error("Method not implemented.");
    }
    async getRegions(): Promise<Region[]> {
        return regions;
    }
    async getAllCourtrooms(): Promise<Courtroom[]> {
        return courtrooms;
    }
    async getCourtroomsByCourthouse(courthouseId: number): Promise<Courtroom[]> {
        throw new Error("Method not implemented.");
    }
}