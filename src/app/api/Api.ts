import * as moment from 'moment';

export type DateType = Date | moment.Moment | string;
export type StringMap = { [key: string]: string };
export type IdType = number;
export type SheriffMap = { [key: number]: Sheriff }
export type SheriffAssignmentMap = { [key: number]: Assignment }

export enum DaysOfWeek {
    Mon = 1 << 0,
    Tue = 1 << 1,
    Wed = 1 << 2,
    Thu = 1 << 3,
    Fri = 1 << 4,
    Sat = 1 << 5,
    Sun = 1 << 6,
    Everyday = Mon | Tue | Wed | Thu | Fri | Sat | Sun,
    Weekdays = Mon | Tue | Wed | Thu | Fri
}

export const BLANK_SHERIFF_LOCATION: SheriffLocation = {
    courthouseId: "",
    regionId: ""
}

export const BLANK_SHERIFF: Sheriff = {
    firstName: "",
    lastName: "",
    badgeNumber: -1,
    imageUrl: "/img/avatar.png",
    training: [{
        trainingType: "",
        certificationDate: "",
        expiryDate: "",
    }],
    permanentLocation: BLANK_SHERIFF_LOCATION,
    currentLocation: BLANK_SHERIFF_LOCATION,
    onDuty: false
}

export const DEFAULT_RECURRENCE: RecurrenceInfo = {
    days: DaysOfWeek.Weekdays,
    startTime: moment().hour(9).minute(0),
    endTime: moment().hour(17).minute(0),
    sheriffsRequired: 1
}

export interface SheriffTraining {
    trainingType: string;
    certificationDate: string;
    expiryDate: string;
}

export interface SheriffLocation {
    courthouseId: string;
    regionId: string;
}

export interface Sheriff {
    firstName: string;
    lastName: string;
    badgeNumber: number;
    imageUrl?: string;
    training: SheriffTraining[];
    permanentLocation?: SheriffLocation;
    currentLocation?: SheriffLocation;
    onDuty: boolean;
}


export interface AssignmentLocation {
    courtroomId?: IdType;
}

export interface Assignment {
    id: IdType;
    title: string;
    workSectionId: string;
    location?: AssignmentLocation;
}

export interface AssignmentDutyDetails {
    notes?: string;    
}

export interface AssignmentDuty {
    id: IdType;
    assignmentId: IdType;
    startDateTime: DateType;
    endDateTime: DateType;
    sheriffIds: IdType[];
    sherrifsRequired: number;
    extraDetails?: AssignmentDutyDetails;
}

export interface RecurrenceInfo {
    startTime: DateType;
    endTime: DateType;
    days: DaysOfWeek;
    sheriffsRequired: number;
}

export interface AssignmentTemplate {
    id: IdType;
    assignmentId: IdType;
    recurrenceInfo: RecurrenceInfo[];
}

export interface TrainingType {
    id: number;
    title: string;
    abbreviation: string;
}

export interface Courthouse {
    id: number;
    name: string;
    regionId: number;
}

export interface Region {
    id: number;
    name: string;
}

export interface Courtroom {
    id: number;
    courthouseId: number;
    number: number;
    name: string;
}

export interface API {
    getSheriffs(): Promise<SheriffMap>;
    getSheriffAssignments(): Promise<SheriffAssignmentMap>;
    createSheriff(newSheriff: Sheriff): Promise<Sheriff>;
    updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff>;
    createAssignment(newAssignment: Assignment): Promise<Assignment>;
    getAssignmentTemplates(): Promise<AssignmentTemplate[]>;
    createAssignmentTemplate(newAssignmentTemplate: Partial<AssignmentTemplate>): Promise<AssignmentTemplate>;
    editAssignmentTemplate(updatedAssignmentTemplate: AssignmentTemplate): Promise<AssignmentTemplate>;
    deleteAssignmentTemplate(templateIdToBeDeleted: IdType): Promise<number>;
    getTrainingTypes(): Promise<TrainingType[]>;
    getAllCourthouses(): Promise<Courthouse[]>;
    getCourthousesByRegion(regionId: number): Promise<Courthouse[]>;
    getRegions(): Promise<Region[]>;
    getAllCourtrooms(): Promise<Courtroom[]>;
    getCourtroomsByCourthouse(courthouseId: number): Promise<Courtroom[]>;
}


