import * as moment from 'moment';
import { displayEnum } from '../infrastructure/EnumUtils';

export type DateType = Date | moment.Moment | string;
export type StringMap = { [key: string]: string };
export type IdType = number;
export type ShiftMap = { [key: number]: Shift };
export type SheriffMap = { [key: number]: Sheriff };
export type AssignmentMap = { [key: number]: Assignment };
export type AssignmentDutyMap = { [key: number]: AssignmentDuty };
export type WorkSectionId = 'COURTS' | 'JAIL' | 'ESCORTS' | 'OTHER';
export type Assignment = CourtAssignment | JailAssignment | EscortAssignment | OtherAssignment;

/* tslint:disable:no-bitwise */
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

/* tslint:enable:no-bitwise */

export namespace DaysOfWeek {

    export function getDisplayValues(value: DaysOfWeek): string[] {
        let dayDisplay = displayEnum(DaysOfWeek, value);

        const weekdaysIndex = dayDisplay.indexOf('Weekdays');
        const satIndex = dayDisplay.indexOf('Sat');
        const sunIndex = dayDisplay.indexOf('Sun');

        if (weekdaysIndex > -1) {
            if (satIndex > -1 || sunIndex > -1) {
                dayDisplay.splice(weekdaysIndex, 1);
            }
        }

        return dayDisplay;
    }
}

export const BLANK_SHERIFF_LOCATION: SheriffLocation = {
    courthouseId: '',
    regionId: ''
};

export const BLANK_SHERIFF: Sheriff = {
    id: -1,
    title: '',
    firstName: '',
    lastName: '',
    badgeNumber: -1,
    imageUrl: '/img/avatar.png',
    training: [{
        trainingType: '',
        certificationDate: '',
        expiryDate: '',
    }],
    permanentLocation: BLANK_SHERIFF_LOCATION,
    currentLocation: BLANK_SHERIFF_LOCATION,
    onDuty: false
};

export const BLANK_COURTHOUSE: Courthouse = {
    id: -1,
    name: '',
    regionId: -1
};

export const DEFAULT_RECURRENCE: RecurrenceInfo[] = [
    {
        days: DaysOfWeek.Weekdays,
        startTime: moment().hour(9).minute(0),
        endTime: moment().hour(12).minute(0),
        sheriffsRequired: 1
    },
    {
        days: DaysOfWeek.Weekdays,
        startTime: moment().hour(13).minute(0),
        endTime: moment().hour(17).minute(0),
        sheriffsRequired: 2
    }
];

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
    id: IdType;
    title: string;
    firstName: string;
    lastName: string;
    badgeNumber: number;
    imageUrl?: string;
    training: SheriffTraining[];
    permanentLocation?: SheriffLocation;
    currentLocation?: SheriffLocation;
    onDuty: boolean;
}

export interface BaseAssignment {
    id: IdType;
    title: string;
    facilityId: IdType;
    workSectionId: WorkSectionId;
    recurrenceInfo?: RecurrenceInfo[];
}

export interface CourtAssignment extends BaseAssignment {
    workSectionId: 'COURTS';
    courtroomId: IdType;
}

export interface JailAssignment extends BaseAssignment {
    workSectionId: 'JAIL';
    jailRoleId: IdType;
}

export interface EscortAssignment extends BaseAssignment {
    workSectionId: 'ESCORTS';
    runId: IdType;
}

export interface OtherAssignment extends BaseAssignment {
    alternateAssignmentId: IdType;
    workSectionId: 'OTHER';
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
    sheriffsRequired: number;
    extraDetails?: AssignmentDutyDetails;
}

export interface RecurrenceInfo {
    startTime: DateType;
    endTime: DateType;
    days: DaysOfWeek;
    sheriffsRequired: number;
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

export interface JailRole {
    id: IdType;
    title: string;
}

export interface Shift {
    id: IdType;
    sheriffId?: IdType;
    courthouseId: IdType;
    workSectionId?: WorkSectionId;
    startDateTime: DateType;
    endDateTime: DateType;
}

export interface Leave {
    id: IdType; 
    sheriffId: IdType;
    date: DateType;
}

export interface API {
    // Sheriffs
    getSheriffs(): Promise<SheriffMap>;
    createSheriff(newSheriff: Sheriff): Promise<Sheriff>;
    updateSheriff(sheriffToUpdate: Partial<Sheriff>): Promise<Sheriff>;

    // Assignments
    getAssignments(): Promise<Assignment[]>;
    createAssignment(assignment: Partial<Assignment>): Promise<Assignment>;
    updateAssignment(assignment: Partial<Assignment>): Promise<Assignment>;
    deleteAssignment(assignmentId: IdType): Promise<void>;

    // Assignment Duties
    getAssignmentDuties(): Promise<AssignmentDuty[]>;
    createAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty>;
    updateAssignmentDuty(duty: Partial<AssignmentDuty>): Promise<AssignmentDuty>;
    deleteAssignmentDuty(dutyId: IdType): Promise<void>;

    getTrainingTypes(): Promise<TrainingType[]>;
    getAllCourthouses(): Promise<Courthouse[]>;
    getCourthousesByRegion(regionId: number): Promise<Courthouse[]>;
    getRegions(): Promise<Region[]>;
    getAllCourtrooms(): Promise<Courtroom[]>;
    getCourtroomsByCourthouse(courthouseId: number): Promise<Courtroom[]>;

    // Sheriff Shifts
    getShifts(): Promise<Shift[]>;
    updateShift(shiftToUpdate: Partial<Shift>): Promise<Shift>;
    createShift(newShift: Partial<Shift>): Promise<Shift>;
    deleteShift(shiftId: IdType): Promise<void>;

    // Sheriff Leaves
    getSheriffLeaves(sheriffId: IdType): Promise<Leave []>;
}