import {
    API,
    SheriffMap,
    AssignmentMap,
    AssignmentTemplate,
    Sheriff,
    Assignment,
    DEFAULT_RECURRENCE,
    RecurrenceInfo,
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
    defaultAssignmentTemplates,
    training,
    courthouses,
    WORK_SECTIONS,
    COURTROOMS,
    courtrooms,
    regions,
    assignmentDuties
} from "./MockData";
import { randomDelay } from "../PromiseExtensions";


class OldClient {
    private assignmentTemplateId = 10;

    // async getSheriffs(): Promise<SheriffMap> {
    //     return arrayToMap(sheriffList, (s) => s.badgeNumber) as SheriffMap;
    // }

    // async getAssignmentDuties()(): Promise<SheriffAssignmentMap> {
    //     // await randomDelay(200, 1000);
    //     const assignmentMap: SheriffAssignmentMap = arrayToMap(assignments, (t) => t.id);
    //     return Promise.resolve(assignmentMap);
    // }

    // async getAssignmentTemplates(): Promise<AssignmentTemplate[]> {
    //     return defaultAssignmentTemplates;
    // }

    // async createSheriff(newSheriff: Sheriff): Promise<Sheriff> {
    //     await randomDelay();

    //     //This is a hack to throw in a profile picture
    //     if (!newSheriff.imageUrl) {
    //         //let randomNumber = Math.floor(Math.random() * 86) + 11; 
    //         // newSheriff.imageUrl=`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;
    //         newSheriff.imageUrl = "/img/avatar.png"
    //     }

    //     sheriffList.push(newSheriff);
    //     return newSheriff;
    // }

    // async updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff> {
    //     const index = sheriffList.findIndex(s => s.badgeNumber === sheriffToUpdate.badgeNumber);
    //     await randomDelay();
    //     sheriffList[index] = Object.assign({}, sheriffList[index], sheriffToUpdate);
    //     return sheriffList[index];
    // }

    // async createAssignment(newAssignment: Assignment): Promise<Assignment> {
    //     await randomDelay();
    //     //This is a hack to create a unique id for a new assignment
    //     newAssignment.id = assignments.length;

    //     //set the assignment title
    //     newAssignment.title = this.getAssignmentTitle(newAssignment);

    //     assignments.push(newAssignment);

    //     return newAssignment;
    // }

    // private getAssignmentTitle(assignment: Partial<Assignment>): string {

    //     if (assignment.workSectionId) {
    //         if (WORK_SECTIONS[assignment.workSectionId] === WORK_SECTIONS.COURTS && assignment.location && assignment.location.courtroomId) {
    //             return COURTROOMS[assignment.location.courtroomId];
    //         }
    //         else {
    //             return WORK_SECTIONS[assignment.workSectionId];
    //         }
    //     }
    //     else {
    //         return "Assignment Title";
    //     }
    // }

    // private createFilledRecurrenceInfo(recurrenceInfo?: RecurrenceInfo[]): RecurrenceInfo[] {
    //     if (!recurrenceInfo || recurrenceInfo.length === 0) {
    //         return [DEFAULT_RECURRENCE];
    //     }
    //     else {
    //         return recurrenceInfo.map(r => Object.assign({}, DEFAULT_RECURRENCE, r));
    //     }
    // }

    // async createAssignmentTemplate(newTemplate: Partial<AssignmentTemplate>): Promise<AssignmentTemplate> {
    //     await randomDelay();

    //     if (!newTemplate || !newTemplate.assignmentId) {
    //         throw new Error("Incomplete new assignment template.")
    //     }

    //     let assignment = newTemplate.assignment;

    //     //This is a hack to create a unique id for a new assignment template
    //     newTemplate.id = assignment.id = this.assignmentTemplateId++;

    //     assignment.title = this.getAssignmentTitle(assignment);

    //     //add default recurrence value if nothing was selected or partial value was selected
    //     newTemplate.recurrenceInfo = this.createFilledRecurrenceInfo(newTemplate.recurrenceInfo);

    //     defaultAssignmentTemplates.push(newTemplate as AssignmentTemplate);
    //     return newTemplate as AssignmentTemplate;
    // }

    // async editAssignmentTemplate(updatedAssignmentTemplate: AssignmentTemplate): Promise<AssignmentTemplate> {
    //     await randomDelay();
    //     let assignment = updatedAssignmentTemplate.assignment;

    //     assignment.title = this.getAssignmentTitle(assignment);

    //     //add default recurrence value if nothing was selected or partial value was selected
    //     updatedAssignmentTemplate.recurrenceInfo = this.createFilledRecurrenceInfo(updatedAssignmentTemplate.recurrenceInfo);

    //     defaultAssignmentTemplates[updatedAssignmentTemplate.id] = updatedAssignmentTemplate;
    //     return updatedAssignmentTemplate;
    // }

    // async deleteAssignmentTemplate(templateIdToBeDeleted: number): Promise<number> {
    //     const templateIndex = defaultAssignmentTemplates.findIndex((value) => value.id == templateIdToBeDeleted);
    //     defaultAssignmentTemplates.splice(templateIndex, 1);
    //     return templateIdToBeDeleted;
    // }

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


// Helpers
function getAssignmentTitle(assignment: Partial<Assignment>): string {

    if (assignment.workSectionId) {
        if (WORK_SECTIONS[assignment.workSectionId] === WORK_SECTIONS.COURTS && assignment.location && assignment.location.courtroomId) {
            return COURTROOMS[assignment.location.courtroomId];
        }
        else {
            return WORK_SECTIONS[assignment.workSectionId];
        }
    }
    else {
        return "Assignment Title";
    }
}

function createFilledRecurrenceInfo(recurrenceInfo?: RecurrenceInfo[]): RecurrenceInfo[] {
    if (!recurrenceInfo || recurrenceInfo.length === 0) {
        return [DEFAULT_RECURRENCE];
    }
    else {
        return recurrenceInfo.map(r => Object.assign({}, DEFAULT_RECURRENCE, r));
    }
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
            //let randomNumber = Math.floor(Math.random() * 86) + 11; 
            // newSheriff.imageUrl=`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`;
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
        assignments.push(newAssignment);

        return newAssignment;
    }
    async updateAssignment(assignment: Partial<Assignment>): Promise<Assignment> {
        throw new Error("Method not implemented.");
    }
    async deleteAssignment(assignmentId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getAssignmentDuties(): Promise<AssignmentDuty[]> {
        return assignmentDuties;
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
    async getAssignmentTemplates(): Promise<AssignmentTemplate[]> {
        return defaultAssignmentTemplates;
    }
    async createAssignmentTemplate(newTemplate: Partial<AssignmentTemplate>): Promise<AssignmentTemplate> {
        await randomDelay();

        if (!newTemplate || !newTemplate.assignmentId) {
            throw new Error("Incomplete new assignment template.")
        }

        //This is a hack to create a unique id for a new assignment template
        newTemplate.id = this.getId();

        //add default recurrence value if nothing was selected or partial value was selected
        newTemplate.recurrenceInfo = createFilledRecurrenceInfo(newTemplate.recurrenceInfo);
        defaultAssignmentTemplates.push(newTemplate as AssignmentTemplate);
        return newTemplate as AssignmentTemplate;
    }
    async updateAssignmentTemplate(template: Partial<AssignmentTemplate>): Promise<AssignmentTemplate> {
        await randomDelay();
        if (!template.id) {
            throw Error("No Template Id Specified");
        }
        let templateToUpdate = template as AssignmentTemplate;
        //add default recurrence value if nothing was selected or partial value was selected
        templateToUpdate.recurrenceInfo = createFilledRecurrenceInfo(templateToUpdate.recurrenceInfo);

        let index = defaultAssignmentTemplates.findIndex(t => t.id == templateToUpdate.id);
        if (index < 0) {
            throw Error(`No template could be located for ${templateToUpdate.id}`)
        }

        defaultAssignmentTemplates[index] = templateToUpdate;
        return templateToUpdate;
    }
    async deleteAssignmentTemplate(templateId: number): Promise<void> {
        if (!templateId) {
            throw new Error("No id Specified");
        }

        const templateIndex = defaultAssignmentTemplates.findIndex((value) => value.id == templateId);
        if (templateIndex < 0) {
            throw Error(`No template could be located for ${templateId}`)
        }

        defaultAssignmentTemplates.splice(templateIndex, 1);
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