import {     
    API, 
    SheriffMap,
    SheriffAssignmentMap,
    SheriffAssignmentTemplate,
    Sheriff,
    Assignment,
    DEFAULT_RECURRENCE,
    RecurrenceInfo,
    TrainingType,
    Courthouse,
    Courtroom,
    Region
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
    regions
} from "./MockData";
import { randomDelay } from "../PromiseExtensions";


export default class Client implements API {
    private assignmentTemplateId = 10;

    async getSheriffs(): Promise<SheriffMap> {
        return arrayToMap(sheriffList, (s) => s.badgeNumber) as SheriffMap;
    }

    async getSheriffAssignments(): Promise<SheriffAssignmentMap> {
        // await randomDelay(200, 1000);
        const assignmentMap: SheriffAssignmentMap = arrayToMap(assignments, (t) => t.id);
        return Promise.resolve(assignmentMap);
    }

    async getAssignmentTemplates(): Promise<SheriffAssignmentTemplate[]> {
        return defaultAssignmentTemplates;
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

    async createAssignment(newAssignment: Assignment): Promise<Assignment> {
        await randomDelay();
        //This is a hack to create a unique id for a new assignment
        newAssignment.id = assignments.length;
        
        //set the assignment title
        newAssignment.title = this.getAssignmentTitle(newAssignment);
        
        assignments.push(newAssignment);

        return newAssignment;
    }

    private getAssignmentTitle(assignment: Partial<Assignment>): string {

        if (assignment.workSectionId) {
            if (WORK_SECTIONS[assignment.workSectionId] === WORK_SECTIONS.COURTS && assignment.courtroomId) {
                return COURTROOMS[assignment.courtroomId];
            }
            else {
                return WORK_SECTIONS[assignment.workSectionId];
            }
        }
        else {
            return "Assignment Title";
        }

    }

    private createFilledRecurrenceInfo(recurrenceInfo?:  RecurrenceInfo[]): RecurrenceInfo[] {
        if (!recurrenceInfo || recurrenceInfo.length === 0) {
            return [DEFAULT_RECURRENCE];
        }
        else {
            return recurrenceInfo.map(r=>Object.assign({}, DEFAULT_RECURRENCE, r));    
        }
    }

    async createAssignmentTemplate(newTemplate: Partial<SheriffAssignmentTemplate>): Promise<SheriffAssignmentTemplate> {
        await randomDelay();

        if (!newTemplate || !newTemplate.assignment) {
            throw new Error("Incomplete new assignment template.")
        }

        let assignment = newTemplate.assignment;

        //This is a hack to create a unique id for a new assignment template
        newTemplate.id = assignment.id = this.assignmentTemplateId++;        

        assignment.title = this.getAssignmentTitle(assignment);

        //add default recurrence value if nothing was selected or partial value was selected
        newTemplate.recurrenceInfo = this.createFilledRecurrenceInfo(newTemplate.recurrenceInfo);

        defaultAssignmentTemplates.push(newTemplate as SheriffAssignmentTemplate);
        return newTemplate as SheriffAssignmentTemplate;
    }

    async editAssignmentTemplate(updatedAssignmentTemplate: SheriffAssignmentTemplate): Promise<SheriffAssignmentTemplate> {
        await randomDelay();
        let assignment = updatedAssignmentTemplate.assignment;
        
        assignment.title =  this.getAssignmentTitle(assignment);
        
        //add default recurrence value if nothing was selected or partial value was selected
        updatedAssignmentTemplate.recurrenceInfo = this.createFilledRecurrenceInfo(updatedAssignmentTemplate.recurrenceInfo);
        
        defaultAssignmentTemplates[updatedAssignmentTemplate.id] = updatedAssignmentTemplate;
        return updatedAssignmentTemplate;
    }

    async deleteAssignmentTemplate(templateIdToBeDeleted: number): Promise<number> {
        const templateIndex = defaultAssignmentTemplates.findIndex((value) => value.id==templateIdToBeDeleted);
        defaultAssignmentTemplates.splice(templateIndex, 1);
        return templateIdToBeDeleted;
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