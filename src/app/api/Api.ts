import * as moment from 'moment';

export type DateType = Date | moment.Moment | string;
export type StringMap = { [key: string]: string };
export type IdType = number;


export enum SheriffAbility {
    None = 0,
    CanTransfer = 1 << 0,
    CourtAppearance = 1 << 1,
    SignDocuments = 1 << 2,
    All = CanTransfer | CourtAppearance | SignDocuments
}

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
    abilities: SheriffAbility.None,
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
    endTime: moment().hour(17).minute(0)
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
    abilities?: SheriffAbility;
    training: SheriffTraining[];
    permanentLocation?: SheriffLocation;
    currentLocation?: SheriffLocation;
    onDuty: boolean;
}

export interface RecurrenceInfo {
    startTime: DateType;
    endTime: DateType;
    days: DaysOfWeek;
}

export interface SheriffAssignmentTemplate {
    id: IdType;
    assignmentId: IdType;
    sherrifsRequired: number;
    recurrenceInfo: RecurrenceInfo[];
}

export interface SheriffAssignment {
    id: IdType;
    title: string;
    workSectionId: string;
    //attributes for gate security assignments
    gateNumber?: IdType
    
    //attributes for escort security assignments
    pickupLocation?: string;
    dropoffLocation?: string;

    //attributes court security assignments 
    courtroomId?: IdType;
    assignmentCourt?: boolean;
}

export interface AssignmentDuty {
    id:IdType;
    assignmentId:IdType;    
    requiredAbilities?: SheriffAbility;
    startTime: DateType;
    endTime: DateType;
    sheriffIds: IdType[];
    sherrifsRequired: number;
    notes?: string;
}

export interface API {
    getSheriffs(): Promise<SheriffMap>;
    getSheriffAssignments(): Promise<SheriffAssignmentMap>;
    createSheriff(newSheriff: Sheriff): Promise<Sheriff>;
    updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff>;
    createAssignment(newAssignment: SheriffAssignment): Promise<SheriffAssignment>;
    getAssignmentTemplates(): Promise<SheriffAssignmentTemplate[]>;
    createAssignmentTemplate(newAssignmentTemplate: Partial<SheriffAssignmentTemplate>): Promise<SheriffAssignmentTemplate>;
    editAssignmentTemplate(updatedAssignmentTemplate: SheriffAssignmentTemplate): Promise<SheriffAssignmentTemplate>;
    deleteAssignmentTemplate(templateIdToBeDeleted: IdType): Promise<number>;
}

export type SheriffMap = { [key: number]: Sheriff }

export type SheriffAssignmentMap = { [key: number]: SheriffAssignment }
